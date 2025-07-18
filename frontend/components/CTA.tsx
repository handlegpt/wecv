'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300 mr-2" />
            <span className="text-yellow-300 font-semibold">
              AI-Powered Resume Builder
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who have already created stunning resumes 
            with WeCV AI. Start building your professional future today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              View Templates
            </Button>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm">
            <p>✓ No credit card required</p>
            <p>✓ Free forever plan available</p>
            <p>✓ 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
} 