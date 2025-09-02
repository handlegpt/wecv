'use client'

import { useState, useRef } from 'react'
import { X, Maximize2, Minimize2, Download, Printer, Share2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OptimizedTemplateRenderer } from './optimized-template-renderer'
import { TemplateStyle } from '@/lib/templates/template-config'
import { ResumeData } from '@/components/types/resume'
import { sanitizeHtml, safeErrorHandler } from '@/lib/security/security-utils'

interface TemplatePreviewProps {
  template: TemplateStyle
  data: ResumeData
  isOpen: boolean
  onClose: () => void
  onSelect?: (templateId: string) => void
  className?: string
}

export function TemplatePreview({
  template,
  data,
  isOpen,
  onClose,
  onSelect,
  className = ''
}: TemplatePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showData, setShowData] = useState(true)
  const previewRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handlePrint = () => {
    if (previewRef.current) {
      try {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          // 安全地获取内容，避免XSS
          const safeContent = previewRef.current.textContent || ''
          const safeTemplateName = sanitizeHtml(template.name)
          
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${safeTemplateName} - Resume Preview</title>
                <meta charset="utf-8">
                <meta http-equiv="X-Content-Type-Options" content="nosniff">
                <meta http-equiv="X-Frame-Options" content="DENY">
                <style>
                  body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                  .resume-container { max-width: 800px; margin: 0 auto; }
                  @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                  }
                </style>
              </head>
              <body>
                <div class="resume-container">
                  ${safeContent}
                </div>
                <script>
                  // 安全地执行打印
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
        safeErrorHandler(error, 'Template Preview Print')
      }
    }
  }

  const handleExport = () => {
    try {
      console.log('Exporting template:', template.id)
    } catch (error) {
      safeErrorHandler(error, 'Template Preview Export')
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: sanitizeHtml(template.name),
          text: `Check out this ${sanitizeHtml(template.name)} resume template!`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      safeErrorHandler(error, 'Template Preview Share')
    }
  }

  const previewContent = (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800">
              {template.category}
            </Badge>
            <Badge className={
              template.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }>
              {template.difficulty}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowData(!showData)}
          className="flex items-center space-x-2"
        >
          {showData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{showData ? 'Hide Sample Data' : 'Show Sample Data'}</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      <div 
        ref={previewRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        <OptimizedTemplateRenderer
          templateId={template.id}
          data={showData ? data : createEmptyResumeData()}
          showPreview={false}
          className="p-6"
        />
      </div>

      {onSelect && (
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onClose} className="px-8">
            Cancel
          </Button>
          <Button onClick={() => onSelect(template.id)} className="px-8">
            Use This Template
          </Button>
        </div>
      )}
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {template.name} - Fullscreen Preview
            </h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Minimize2 className="h-4 w-4 mr-1" />
                Exit Fullscreen
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
        
        <div className="h-full overflow-auto p-6">
          {previewContent}
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Template Preview: {template.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Maximize2 className="h-4 w-4 mr-1" />
                Fullscreen
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {previewContent}
        </div>
      </div>
    </div>
  )
}

function createEmptyResumeData(): ResumeData {
  return {
    id: 'preview',
    title: 'Preview Resume',
    language: 'en',
    template: 'modern',
    personal: {
      name: 'Your Name',
      title: 'Your Title',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'City, State',
      linkedin: 'linkedin.com/in/yourprofile',
      website: 'yourwebsite.com'
    },
    summary: 'Professional summary will appear here.',
    experience: [
      {
        id: 'preview-exp-1',
        title: 'Job Title',
        company: 'Company Name',
        period: '2020 - Present',
        location: 'City, State',
        description: 'Job description will appear here.',
        achievements: [
          'Key achievement or responsibility will appear here',
          'Another important accomplishment or duty'
        ]
      }
    ],
    education: [
      {
        id: 'preview-edu-1',
        degree: 'Degree Name',
        school: 'University Name',
        period: '2016 - 2020',
        description: 'Degree description will appear here.',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      { name: 'Skill 1', level: 'advanced', category: 'technical' },
      { name: 'Skill 2', level: 'intermediate', category: 'soft' },
      { name: 'Skill 3', level: 'beginner', category: 'technical' }
    ],
    projects: [],
    certifications: [],
    sections: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      lastModified: new Date().toISOString()
    }
  }
}

export function InlineTemplatePreview({
  template,
  data,
  className = ''
}: {
  template: TemplateStyle
  data: ResumeData
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{template.name}</h3>
          <Badge className={
            template.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            {template.difficulty}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2 truncate">{template.description}</p>
        <div className="text-xs">
          <span className="font-medium text-gray-700">Features:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {template.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
