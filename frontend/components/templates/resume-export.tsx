'use client'

import { useState, useRef } from 'react'
import { Download, Printer, FileText, Image, Share2, Settings, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { OptimizedTemplateRenderer } from './optimized-template-renderer'
import { ResumeData } from '@/components/types/resume'
import { sanitizeHtml, sanitizeFileName, safeErrorHandler } from '@/lib/security/security-utils'

// 数据验证函数
const validateData = (data: ResumeData): boolean => {
  // 基本数据验证
  if (!data.personal?.name || data.personal.name.length > 200) return false
  if (data.experience && data.experience.length > 50) return false
  if (data.education && data.education.length > 20) return false
  if (data.skills && data.skills.length > 100) return false
  return true
}

interface ResumeExportProps {
  templateId: string
  data: ResumeData
  className?: string
}

export function ResumeExport({
  templateId,
  data,
  className = ''
}: ResumeExportProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'html' | 'txt'>('pdf')
  const [printSettings, setPrintSettings] = useState({
    showHeader: true,
    showFooter: true,
    pageNumbers: true,
    margins: 'normal' as 'narrow' | 'normal' | 'wide',
    orientation: 'portrait' as 'portrait' | 'landscape'
  })
  const [isExporting, setIsExporting] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    // 数据验证
    if (!validateData(data)) {
      alert('Invalid data detected. Please check your resume information.')
      return
    }

    setIsExporting(true)
    try {
      switch (exportFormat) {
        case 'pdf':
          await exportToPDF()
          break
        case 'docx':
          await exportToDOCX()
          break
        case 'html':
          exportToHTML()
          break
        case 'txt':
          exportToTXT()
          break
      }
    } catch (error) {
      safeErrorHandler(error, 'Resume Export')
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToPDF = async () => {
    if (!resumeRef.current) return

    try {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        // 安全地获取内容
        const safeContent = resumeRef.current.textContent || ''
        const safeName = sanitizeHtml(data.personal.name)
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${safeName} - Resume</title>
              <meta charset="utf-8">
              <meta http-equiv="X-Content-Type-Options" content="nosniff">
              <meta http-equiv="X-Frame-Options" content="DENY">
              <style>
                @media print {
                  @page {
                    margin: ${printSettings.margins === 'narrow' ? '0.5in' : 
                             printSettings.margins === 'wide' ? '1in' : '0.75in'};
                    size: A4 ${printSettings.orientation};
                  }
                  body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: Arial, sans-serif; 
                    line-height: 1.4;
                  }
                  .resume-container { 
                    max-width: none; 
                    margin: 0; 
                  }
                  .no-print { display: none; }
                  ${printSettings.pageNumbers ? `
                    @page { @bottom-center { content: counter(page); } }
                  ` : ''}
                }
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: Arial, sans-serif; 
                  line-height: 1.4;
                }
                .resume-container { 
                  max-width: 800px; 
                  margin: 0 auto; 
                }
                .print-header {
                  text-align: center;
                  margin-bottom: 20px;
                  padding-bottom: 10px;
                  border-bottom: 2px solid #333;
                }
                .print-footer {
                  text-align: center;
                  margin-top: 20px;
                  padding-top: 10px;
                  border-top: 1px solid #ccc;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              ${printSettings.showHeader ? `
                <div class="print-header">
                  <h1>${safeName} - Resume</h1>
                  <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
              ` : ''}
              
              <div class="resume-container">
                ${safeContent}
              </div>
              
              ${printSettings.showFooter ? `
                <div class="print-footer">
                  <p>Generated by WeCV AI - Professional Resume Builder</p>
                </div>
              ` : ''}
              
              <script>
                setTimeout(() => {
                  try {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                  } catch (e) {
                    console.error('Print failed');
                  }
                }, 500);
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    } catch (error) {
      safeErrorHandler(error, 'PDF Export')
      throw error
    }
  }

  const exportToDOCX = async () => {
    alert('DOCX export feature coming soon!')
  }

  const exportToHTML = () => {
    if (!resumeRef.current) return

    try {
      const safeContent = resumeRef.current.textContent || ''
      const safeName = sanitizeHtml(data.personal.name)
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${safeName} - Resume</title>
            <meta charset="utf-8">
            <meta http-equiv="X-Content-Type-Options" content="nosniff">
            <meta http-equiv="X-Frame-Options" content="DENY">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                margin: 0; 
                padding: 20px; 
                background: #f5f5f5;
              }
              .resume-container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                padding: 40px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .export-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #333;
              }
              .export-footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ccc;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="resume-container">
              <div class="export-header">
                <h1>${safeName} - Resume</h1>
                <p>Exported on ${new Date().toLocaleDateString()}</p>
              </div>
              
              ${safeContent}
              
              <div class="export-footer">
                <p>Generated by WeCV AI - Professional Resume Builder</p>
              </div>
            </div>
          </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${sanitizeFileName(data.personal.name)}_resume.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      safeErrorHandler(error, 'HTML Export')
      throw error
    }
  }

  const exportToTXT = () => {
    if (!resumeRef.current) return

    try {
      // 安全地提取纯文本内容
      const textContent = resumeRef.current.textContent || ''
      
      const exportText = `
${data.personal.name.toUpperCase()}
${data.personal.title}
${data.personal.email} | ${data.personal.phone} | ${data.personal.location}

${data.summary || ''}

EXPERIENCE
${data.experience.map(exp => `
${exp.title} at ${exp.company}
${exp.period} | ${exp.location}
${exp.achievements?.map(achievement => `• ${achievement}`).join('\n') || ''}
`).join('\n')}

EDUCATION
${data.education?.map(edu => `
${edu.degree}
${edu.school}
${edu.period}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
`).join('\n') || ''}

SKILLS
${data.skills?.map(skill => `${skill.name}${skill.level ? ` (${skill.level})` : ''}`).join(', ') || ''}

Generated by WeCV AI on ${new Date().toLocaleDateString()}
      `.trim()

      const blob = new Blob([exportText], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${sanitizeFileName(data.personal.name)}_resume.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      safeErrorHandler(error, 'TXT Export')
      throw error
    }
  }

  const handlePrint = () => {
    if (!resumeRef.current) return

    try {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        const safeContent = resumeRef.current.textContent || ''
        const safeName = sanitizeHtml(data.personal.name)
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${safeName} - Resume</title>
              <meta charset="utf-8">
              <meta http-equiv="X-Content-Type-Options" content="nosniff">
              <meta http-equiv="X-Frame-Options" content="DENY">
              <style>
                @media print {
                  @page {
                    margin: ${printSettings.margins === 'narrow' ? '0.5in' : 
                             printSettings.margins === 'wide' ? '1in' : '0.75in'};
                    size: A4 ${printSettings.orientation};
                  }
                  body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: Arial, sans-serif; 
                    line-height: 1.4;
                  }
                  .resume-container { 
                    max-width: none; 
                    margin: 0; 
                  }
                  .no-print { display: none; }
                  ${printSettings.pageNumbers ? `
                    @page { @bottom-center { content: counter(page); } }
                  ` : ''}
                }
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: Arial, sans-serif; 
                  line-height: 1.4;
                }
                .resume-container { 
                  max-width: 800px; 
                  margin: 0 auto; 
                }
                .print-header {
                  text-align: center;
                  margin-bottom: 20px;
                  padding-bottom: 10px;
                  border-bottom: 2px solid #333;
                }
                .print-footer {
                  text-align: center;
                  margin-top: 20px;
                  padding-top: 10px;
                  border-top: 1px solid #ccc;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              ${printSettings.showHeader ? `
                <div class="print-header">
                  <h1>${safeName} - Resume</h1>
                  <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
              ` : ''}
              
              <div class="resume-container">
                ${safeContent}
              </div>
              
              ${printSettings.showFooter ? `
                <div class="print-footer">
                  <p>Generated by WeCV AI - Professional Resume Builder</p>
                </div>
              ` : ''}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
      }
    } catch (error) {
      safeErrorHandler(error, 'Print Operation')
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.personal.name} - Resume`,
          text: `Check out my professional resume!`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      safeErrorHandler(error, 'Share Operation')
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 导出选项 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export & Print Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 格式选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'pdf', label: 'PDF', icon: FileText },
                { value: 'docx', label: 'Word', icon: FileText },
                { value: 'html', label: 'HTML', icon: FileText },
                { value: 'txt', label: 'Text', icon: FileText }
              ].map((format) => {
                const Icon = format.icon
                return (
                  <button
                    key={format.value}
                    onClick={() => setExportFormat(format.value as any)}
                    className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      exportFormat === format.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 打印设置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Print Settings
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={printSettings.showHeader}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, showHeader: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm">Show header</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={printSettings.showFooter}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, showFooter: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm">Show footer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={printSettings.pageNumbers}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, pageNumbers: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm">Page numbers</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Layout
              </label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Margins</label>
                  <select
                    value={printSettings.margins}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, margins: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="narrow">Narrow</option>
                    <option value="normal">Normal</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Orientation</label>
                  <select
                    value={printSettings.orientation}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, orientation: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 简历预览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Resume Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={resumeRef}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <OptimizedTemplateRenderer
              templateId={templateId}
              data={data}
              showPreview={false}
              className="p-6"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
