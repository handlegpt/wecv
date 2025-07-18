'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300 mr-2" />
            <span className="text-yellow-300 font-semibold">
              {t('hero.title')}
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/builder">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                {t('cta.primary')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <Link href="/templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                {t('cta.secondary')}
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm">
            {(t('cta.features', { returnObjects: true }) as string[]).map((feature, index) => (
              <p key={index}>✓ {feature}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 