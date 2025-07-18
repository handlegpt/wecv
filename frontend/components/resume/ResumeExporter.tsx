'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  FileCode, 
  FileImage, 
  Printer,
  Share2,
  Mail
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ResumeExporterProps {
  resumeId: string;
  resumeData: any;
}

interface ExportFormat {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: 'pdf',
    name: 'PDF',
    icon: <FileText className="w-5 h-5" />,
    description: 'Professional PDF format, perfect for printing and sharing',
    color: 'bg-red-500',
  },
  {
    id: 'docx',
    name: 'Word Document',
    icon: <FileText className="w-5 h-5" />,
    description: 'Editable Word document format',
    color: 'bg-blue-500',
  },
  {
    id: 'html',
    name: 'HTML',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Web-ready HTML format',
    color: 'bg-orange-500',
  },
  {
    id: 'json',
    name: 'JSON Data',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Raw data in JSON format',
    color: 'bg-green-500',
  },
];

const SHARE_OPTIONS = [
  {
    id: 'email',
    name: 'Email',
    icon: <Mail className="w-4 h-4" />,
    description: 'Send via email',
  },
  {
    id: 'link',
    name: 'Share Link',
    icon: <Share2 className="w-4 h-4" />,
    description: 'Generate shareable link',
  },
  {
    id: 'print',
    name: 'Print',
    icon: <Printer className="w-4 h-4" />,
    description: 'Print directly',
  },
];

export default function ResumeExporter({ resumeId, resumeData }: ResumeExporterProps) {
  const t = useTranslations('ResumeExporter');
  const [exporting, setExporting] = useState<string | null>(null);
  const [sharing, setSharing] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    setExporting(format);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          data: resumeData,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-${resumeId}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(t('exportError'));
    } finally {
      setExporting(null);
    }
  };

  const handleShare = async (method: string) => {
    setSharing(method);
    try {
      switch (method) {
        case 'email':
          window.location.href = `mailto:?subject=${encodeURIComponent(t('resumeSubject'))}&body=${encodeURIComponent(t('resumeBody'))}`;
          break;
        case 'link':
          const shareUrl = `${window.location.origin}/resume/${resumeId}/share`;
          await navigator.clipboard.writeText(shareUrl);
          alert(t('linkCopied'));
          break;
        case 'print':
          window.print();
          break;
      }
    } catch (error) {
      console.error('Share error:', error);
      alert(t('shareError'));
    } finally {
      setSharing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <Badge variant="outline">{t('exportOptions')}</Badge>
      </div>

      {/* Export Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>{t('exportFormats')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPORT_FORMATS.map((format) => (
              <div
                key={format.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleExport(format.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${format.color} text-white`}>
                    {format.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{format.name}</h3>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </div>
                  {exporting === format.id && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>{t('shareOptions')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SHARE_OPTIONS.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => handleShare(option.id)}
                disabled={sharing === option.id}
              >
                {option.icon}
                <div className="text-center">
                  <div className="font-medium">{option.name}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
                {sharing === option.id && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('exportSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('includeHeader')}</h4>
                <p className="text-sm text-gray-500">{t('includeHeaderDesc')}</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('includeFooter')}</h4>
                <p className="text-sm text-gray-500">{t('includeFooterDesc')}</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('pageNumbers')}</h4>
                <p className="text-sm text-gray-500">{t('pageNumbersDesc')}</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentExports')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{t('noRecentExports')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 