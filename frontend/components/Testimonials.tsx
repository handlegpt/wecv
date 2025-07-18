'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BuyMeACoffee } from './BuyMeACoffee';

export function Testimonials() {
  const { t } = useTranslation();

  // Get testimonials from translation
  const testimonials = t('testimonials.users', { returnObjects: true }) as Array<{
    name: string;
    title: string;
    content: string;
  }>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-400" />
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div>
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonial.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating Badge */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-4 bg-white rounded-full shadow-lg px-8 py-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {t('testimonials.rating')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Buy Me a Coffee Section */}
      <BuyMeACoffee />
    </section>
  );
} 