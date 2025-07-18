'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface ResumeAnalysis {
  score: number
  overall: string
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywords: string[]
  industryMatch: number
  completeness: number
  readability: number
  impact: number
}

interface ResumeAnalyzerProps {
  resumeData: any
  jobTitle?: string
  industry?: string
}

export default function ResumeAnalyzer({ resumeData, jobTitle, industry }: ResumeAnalyzerProps) {
  const { t } = useTranslation()
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
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
          content: resumeData,
          jobTitle,
          industry
        })
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysis(data)
        toast.success('简历分析完成！')
      } else {
        toast.error('分析失败')
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

  const getScoreLevel = (score: number) => {
    if (score >= 90) return '优秀'
    if (score >= 80) return '良好'
    if (score >= 70) return '一般'
    if (score >= 60) return '需要改进'
    return '需要大幅改进'
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">简历分析</h2>
          </div>
          <button
            onClick={analyzeResume}
            disabled={isAnalyzing}
            className="btn-primary flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>分析中...</span>
              </>
            ) : (
              <>
                <LightBulbIcon className="w-4 h-4" />
                <span>开始分析</span>
              </>
            )}
          </button>
        </div>
        
        <p className="text-gray-600">
          使用AI技术分析您的简历，提供专业的改进建议和评分
        </p>
      </div>

      {analysis && (
        <>
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">总体评分</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}/100
                </div>
                <div className="text-lg text-gray-600 mt-2">{getScoreLevel(analysis.score)}</div>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-6 h-6 ${
                        index < Math.floor(analysis.score / 20)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">完整性</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${analysis.completeness}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analysis.completeness}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">可读性</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${analysis.readability}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analysis.readability}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">影响力</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${analysis.impact}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analysis.impact}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">行业匹配度</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${analysis.industryMatch}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analysis.industryMatch}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">优势</h3>
              </div>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">需要改进</h3>
              </div>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <LightBulbIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">改进建议</h3>
            </div>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">关键词分析</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              这些关键词在您的目标行业中很重要，建议在简历中适当使用
            </p>
          </div>

          {/* Overall Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">总体评估</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{analysis.overall}</p>
            </div>
          </div>
        </>
      )}

      {/* Analysis Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">分析说明</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 完整性：检查简历是否包含所有必要信息</li>
          <li>• 可读性：评估简历的清晰度和易读性</li>
          <li>• 影响力：衡量简历对招聘者的吸引力</li>
          <li>• 行业匹配度：与目标行业的契合程度</li>
        </ul>
      </div>
    </div>
  )
} 