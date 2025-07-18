'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface ResumeAnalysisProps {
  resumeData: any
  onAnalysisComplete?: (analysis: any) => void
}

interface AnalysisResult {
  score: number
  analysis: string
  recommendations: string[]
  strengths: string[]
  weaknesses: string[]
}

export default function ResumeAnalysis({ resumeData, onAnalysisComplete }: ResumeAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: resumeData
        })
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysis(data)
        onAnalysisComplete?.(data)
        toast.success('简历分析完成！')
      } else {
        toast.error('简历分析失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    return '需要改进'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">AI 简历分析</h3>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="btn-primary"
        >
          {isAnalyzing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              分析中...
            </div>
          ) : (
            '开始分析'
          )}
        </button>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* 评分 */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold mb-2">
              <span className={getScoreColor(analysis.score)}>
                {analysis.score}
              </span>
              <span className="text-gray-400 text-2xl">/100</span>
            </div>
            <p className={`text-lg font-medium ${getScoreColor(analysis.score)}`}>
              {getScoreLabel(analysis.score)}
            </p>
          </div>

          {/* 优势 */}
          {analysis.strengths && analysis.strengths.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                简历优势
              </h4>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 需要改进 */}
          {analysis.weaknesses && analysis.weaknesses.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                需要改进
              </h4>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 建议 */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                AI 建议
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 详细分析 */}
          {analysis.analysis && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">详细分析</h4>
              <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {analysis.analysis}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 分析说明 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 分析说明</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• AI 会从内容完整性、专业性、成就突出度等方面评分</li>
          <li>• 建议根据分析结果优化简历内容</li>
          <li>• 可以多次分析，跟踪改进效果</li>
        </ul>
      </div>
    </div>
  )
} 