"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import toast from 'react-hot-toast'

export default function ResumeBuilderById() {
  const params = useParams();
  const id = params?.id as string;
  const { t } = useTranslation();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setResume(data);
        } else {
          toast.error(t('messages.error', '加载简历失败'));
        }
      } catch (e) {
        toast.error(t('messages.networkError', '网络错误'));
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchResume();
  }, [id, t]);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto py-8">
        {loading ? (
          <div>{t('messages.loading', '加载中...')}</div>
        ) : resume ? (
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">{JSON.stringify(resume, null, 2)}</pre>
        ) : (
          <div>{t('messages.noData', '未找到简历')}</div>
        )}
      </div>
    </div>
  );
} 