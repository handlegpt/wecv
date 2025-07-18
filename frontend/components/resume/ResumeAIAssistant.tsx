'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Sparkles, 
  Lightbulb, 
  Wand2, 
  MessageSquare,
  Send,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ResumeAIAssistantProps {
  resumeId: string;
  currentContent: any;
}

interface AIResponse {
  type: 'suggestion' | 'generation' | 'improvement';
  content: string;
  confidence: number;
  category: string;
}

export default function ResumeAIAssistant({ resumeId, currentContent }: ResumeAIAssistantProps) {
  const t = useTranslations('ResumeAIAssistant');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIResponse[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: 'all', name: t('allCategories') },
    { id: 'summary', name: t('summary') },
    { id: 'experience', name: t('experience') },
    { id: 'skills', name: t('skills') },
    { id: 'education', name: t('education') },
    { id: 'projects', name: t('projects') },
  ];

  const aiFeatures = [
    {
      id: 'improve-summary',
      name: t('improveSummary'),
      description: t('improveSummaryDesc'),
      icon: <Sparkles className="w-5 h-5" />,
      color: 'bg-blue-500',
    },
    {
      id: 'generate-experience',
      name: t('generateExperience'),
      description: t('generateExperienceDesc'),
      icon: <Wand2 className="w-5 h-5" />,
      color: 'bg-green-500',
    },
    {
      id: 'suggest-skills',
      name: t('suggestSkills'),
      description: t('suggestSkillsDesc'),
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-purple-500',
    },
    {
      id: 'optimize-content',
      name: t('optimizeContent'),
      description: t('optimizeContentDesc'),
      icon: <Bot className="w-5 h-5" />,
      color: 'bg-orange-500',
    },
  ];

  useEffect(() => {
    generateInitialSuggestions();
  }, [resumeId]);

  const generateInitialSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/ai/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: currentContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIFeature = async (featureId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/ai/${featureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: currentContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Failed to use AI feature:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          content: currentContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(prev => [...prev, data]);
        setUserInput('');
      }
    } catch (error) {
      console.error('Failed to send chat message:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <Button onClick={() => setShowChat(!showChat)}>
          <MessageSquare className="w-4 h-4 mr-2" />
          {showChat ? t('hideChat') : t('showChat')}
        </Button>
      </div>

      {/* AI Chat */}
      {showChat && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>{t('aiChat')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t('chatPlaceholder')}
                  className="flex-1"
                  rows={3}
                />
                <Button 
                  onClick={handleChatSubmit}
                  disabled={loading || !userInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle>{t('aiFeatures')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiFeatures.map((feature) => (
              <div
                key={feature.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAIFeature(feature.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{feature.name}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{t('filterSuggestions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('aiSuggestions')}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={generateInitialSuggestions}
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {t('refresh')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{suggestion.category}</Badge>
                    <Badge variant="secondary">
                      {Math.round(suggestion.confidence * 100)}% {t('confidence')}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(suggestion.content)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {t('copy')}
                  </Button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm whitespace-pre-wrap">{suggestion.content}</p>
                </div>
              </div>
            ))}

            {filteredSuggestions.length === 0 && !loading && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('noSuggestions')}</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-500">{t('generatingSuggestions')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 