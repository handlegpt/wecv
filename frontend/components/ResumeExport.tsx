'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface ResumeExportProps {
  resumeId: string
  resumeData: any
}

export default function ResumeExport({ resumeId, resumeData }: ResumeExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'html'>('pdf')

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          format: exportFormat,
          data: resumeData
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${resumeData.title || 'resume'}.${exportFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('导出成功！')
      } else {
        toast.error('导出失败')
      }
    } catch (error) {
      toast.error('导出过程中出现错误')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const { shareUrl } = await response.json()
        await navigator.clipboard.writeText(shareUrl)
        toast.success('分享链接已复制到剪贴板！')
      } else {
        toast.error('生成分享链接失败')
      }
    } catch (error) {
      toast.error('分享过程中出现错误')
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-4">导出和分享</h3>
      
      <div className="space-y-4">
        {/* 导出格式选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            导出格式
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={exportFormat === 'pdf'}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="mr-2"
              />
              <span className="text-sm">PDF</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="word"
                checked={exportFormat === 'word'}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="mr-2"
              />
              <span className="text-sm">Word</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="html"
                checked={exportFormat === 'html'}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="mr-2"
              />
              <span className="text-sm">HTML</span>
            </label>
          </div>
        </div>

        {/* 导出按钮 */}
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary flex-1"
          >
            {isExporting ? '导出中...' : `导出为 ${exportFormat.toUpperCase()}`}
          </button>
          
          <button
            onClick={handleShare}
            className="btn-secondary"
          >
            生成分享链接
          </button>
        </div>

        {/* 导出说明 */}
        <div className="text-sm text-gray-600">
          <p><strong>PDF格式：</strong>适合打印和正式场合使用</p>
          <p><strong>Word格式：</strong>便于进一步编辑和修改</p>
          <p><strong>HTML格式：</strong>适合在线展示和网页嵌入</p>
        </div>
      </div>
    </div>
  )
} 