'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp',
    content: 'WeCV AI helped me create a professional resume that landed me my dream job. The AI suggestions were incredibly helpful!',
    rating: 5,
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateLab',
    content: 'The multi-language support is fantastic. I can easily create resumes in different languages for international opportunities.',
    rating: 5,
    avatar: '/avatars/michael.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'DesignStudio',
    content: 'The analytics feature helped me understand what areas of my resume needed improvement. Highly recommended!',
    rating: 5,
    avatar: '/avatars/emily.jpg'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Data Scientist',
    company: 'DataFlow',
    content: 'The AI assistant is amazing. It provided great suggestions that made my resume much more compelling.',
    rating: 5,
    avatar: '/avatars/david.jpg'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Marketing Manager',
    company: 'GrowthCo',
    content: 'The export features are excellent. I can easily share my resume in different formats with potential employers.',
    rating: 5,
    avatar: '/avatars/lisa.jpg'
  },
  {
    id: 6,
    name: 'James Thompson',
    role: 'DevOps Engineer',
    company: 'CloudTech',
    content: 'The version control feature is a lifesaver. I can track changes and revert if needed. Great tool!',
    rating: 5,
    avatar: '/avatars/james.jpg'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with WeCV AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-gray-300 mb-2" />
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              4.9/5 from 2,500+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 