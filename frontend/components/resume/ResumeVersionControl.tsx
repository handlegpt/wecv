'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  GitBranch, 
  RotateCcw, 
  Eye, 
  Download,
  Trash2,
  Plus
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ResumeVersionControlProps {
  resumeId: string;
}

interface Version {
  id: string;
  version: string;
  name: string;
  description: string;
  createdAt: string;
  changes: string[];
  isCurrent: boolean;
}

export default function ResumeVersionControl({ resumeId }: ResumeVersionControlProps) {
  const t = useTranslations('ResumeVersionControl');
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');

  useEffect(() => {
    fetchVersions();
  }, [resumeId]);

  const fetchVersions = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions`);
      const data = await response.json();
      setVersions(data);
    } catch (error) {
      console.error('Failed to fetch versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createVersion = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newVersionName,
          description: newVersionDescription,
        }),
      });

      if (response.ok) {
        setNewVersionName('');
        setNewVersionDescription('');
        setShowCreateVersion(false);
        fetchVersions();
      }
    } catch (error) {
      console.error('Failed to create version:', error);
    }
  };

  const restoreVersion = async (versionId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions/${versionId}/restore`, {
        method: 'POST',
      });

      if (response.ok) {
        fetchVersions();
      }
    } catch (error) {
      console.error('Failed to restore version:', error);
    }
  };

  const deleteVersion = async (versionId: string) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions/${versionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchVersions();
      }
    } catch (error) {
      console.error('Failed to delete version:', error);
    }
  };

  const downloadVersion = async (versionId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions/${versionId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-version-${versionId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download version:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <Button onClick={() => setShowCreateVersion(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('createVersion')}
        </Button>
      </div>

      {/* Create Version Modal */}
      {showCreateVersion && (
        <Card>
          <CardHeader>
            <CardTitle>{t('createNewVersion')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('versionName')}
                </label>
                <input
                  type="text"
                  value={newVersionName}
                  onChange={(e) => setNewVersionName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder={t('versionNamePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('versionDescription')}
                </label>
                <textarea
                  value={newVersionDescription}
                  onChange={(e) => setNewVersionDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder={t('versionDescriptionPlaceholder')}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={createVersion} disabled={!newVersionName}>
                  {t('create')}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateVersion(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>{t('versionHistory')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className={`border rounded-lg p-4 ${
                  version.isCurrent ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <GitBranch className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-semibold">{version.name}</h3>
                      <p className="text-sm text-gray-600">{version.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {version.isCurrent && (
                      <Badge variant="default">{t('current')}</Badge>
                    )}
                    <Badge variant="outline">{version.version}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{new Date(version.createdAt).toLocaleString()}</span>
                  <span>{version.changes.length} {t('changes')}</span>
                </div>

                {version.changes.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">{t('changes')}:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {version.changes.map((change, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedVersion(version.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('view')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadVersion(version.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {t('download')}
                  </Button>
                  {!version.isCurrent && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => restoreVersion(version.id)}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      {t('restore')}
                    </Button>
                  )}
                  {!version.isCurrent && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteVersion(version.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {t('delete')}
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {versions.length === 0 && (
              <div className="text-center py-8">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('noVersions')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Version Comparison */}
      {selectedVersion && (
        <Card>
          <CardHeader>
            <CardTitle>{t('versionComparison')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">{t('currentVersion')}</h4>
                <div className="border rounded p-4 bg-gray-50">
                  {/* Current version content */}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('selectedVersion')}</h4>
                <div className="border rounded p-4 bg-blue-50">
                  {/* Selected version content */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 