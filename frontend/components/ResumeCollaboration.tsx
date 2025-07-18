'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { 
  UserGroupIcon, 
  ChatBubbleLeftIcon, 
  ArrowUpTrayIcon,
  EyeIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: string
  section: string
  resolved: boolean
}

interface Collaborator {
  id: string
  name: string
  email: string
  role: 'viewer' | 'editor' | 'admin'
  avatar: string
  lastActive: string
}

interface ResumeCollaborationProps {
  resumeId: string
  currentUser: {
    id: string
    name: string
    email: string
  }
}

export default function ResumeCollaboration({ resumeId, currentUser }: ResumeCollaborationProps) {
  const { t } = useTranslation()
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [selectedSection, setSelectedSection] = useState('general')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor'>('viewer')
  const [isLoading, setIsLoading] = useState(false)

  const sections = [
    { id: 'general', name: '总体评价' },
    { id: 'personal', name: '个人信息' },
    { id: 'experience', name: '工作经验' },
    { id: 'education', name: '教育背景' },
    { id: 'skills', name: '技能专长' },
    { id: 'projects', name: '项目经历' }
  ]

  useEffect(() => {
    fetchCollaborators()
    fetchComments()
  }, [resumeId])

  const fetchCollaborators = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/collaborators`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setCollaborators(data)
      }
    } catch (error) {
      console.error('Failed to fetch collaborators')
    }
  }

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Failed to fetch comments')
    }
  }

  const addComment = async () => {
    if (!newComment.trim()) return

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newComment,
          section: selectedSection
        })
      })

      if (response.ok) {
        const comment = await response.json()
        setComments([...comments, comment])
        setNewComment('')
        toast.success('评论已添加')
      } else {
        toast.error('添加评论失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
  }

  const resolveComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/comments/${commentId}/resolve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, resolved: true } : comment
        ))
        toast.success('评论已解决')
      }
    } catch (error) {
      toast.error('操作失败')
    }
  }

  const inviteCollaborator = async () => {
    if (!inviteEmail.trim()) return

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole
        })
      })

      if (response.ok) {
        toast.success('邀请已发送')
        setShowInviteModal(false)
        setInviteEmail('')
        fetchCollaborators()
      } else {
        toast.error('邀请失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
  }

  const removeCollaborator = async (collaboratorId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${resumeId}/collaborators/${collaboratorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setCollaborators(collaborators.filter(c => c.id !== collaboratorId))
        toast.success('协作者已移除')
      }
    } catch (error) {
      toast.error('操作失败')
    }
  }

  const filteredComments = comments.filter(comment => 
    selectedSection === 'general' || comment.section === selectedSection
  )

  return (
    <div className="space-y-6">
      {/* Collaboration Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">协作编辑</h2>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            <span>邀请协作者</span>
          </button>
        </div>
        
        <p className="text-gray-600">
          邀请同事或朋友一起编辑和评论您的简历
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaborators */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">协作者 ({collaborators.length})</h3>
            <div className="space-y-3">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {collaborator.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{collaborator.name}</p>
                      <p className="text-xs text-gray-500">{collaborator.email}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        collaborator.role === 'admin' ? 'bg-red-100 text-red-800' :
                        collaborator.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {collaborator.role === 'admin' ? '管理员' :
                         collaborator.role === 'editor' ? '编辑者' : '查看者'}
                      </span>
                    </div>
                  </div>
                  {currentUser.id !== collaborator.id && (
                    <button
                      onClick={() => removeCollaborator(collaborator.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">评论 ({filteredComments.length})</h3>
              <div className="flex space-x-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      selectedSection === section.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="添加评论..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  选择部分: {sections.find(s => s.id === selectedSection)?.name}
                </span>
                <button
                  onClick={addComment}
                  disabled={isLoading || !newComment.trim()}
                  className="btn-primary text-sm"
                >
                  {isLoading ? '添加中...' : '添加评论'}
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div key={comment.id} className={`p-4 rounded-lg border ${
                  comment.resolved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {comment.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{comment.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {comment.resolved && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          已解决
                        </span>
                      )}
                      {!comment.resolved && comment.userId === currentUser.id && (
                        <button
                          onClick={() => resolveComment(comment.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {sections.find(s => s.id === comment.section)?.name}
                    </span>
                  </div>
                </div>
              ))}

              {filteredComments.length === 0 && (
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">暂无评论</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请协作者</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱地址
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="输入邮箱地址"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  权限级别
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'viewer' | 'editor')}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="viewer">查看者 - 只能查看和评论</option>
                  <option value="editor">编辑者 - 可以编辑和评论</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 btn-secondary"
              >
                取消
              </button>
              <button
                onClick={inviteCollaborator}
                disabled={isLoading || !inviteEmail.trim()}
                className="flex-1 btn-primary"
              >
                {isLoading ? '发送中...' : '发送邀请'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 