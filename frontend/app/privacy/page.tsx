'use client';

import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye, Database, Users, FileText, Globe, Clock } from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useTranslation();

  const privacyFeatures = [
    {
      icon: Shield,
      title: t('privacy.dataProtection.title'),
      description: t('privacy.dataProtection.description')
    },
    {
      icon: Lock,
      title: t('privacy.encryption.title'),
      description: t('privacy.encryption.description')
    },
    {
      icon: Eye,
      title: t('privacy.transparency.title'),
      description: t('privacy.transparency.description')
    },
    {
      icon: Database,
      title: t('privacy.storage.title'),
      description: t('privacy.storage.description')
    },
    {
      icon: Users,
      title: t('privacy.accessControl.title'),
      description: t('privacy.accessControl.description')
    },
    {
      icon: FileText,
      title: t('privacy.compliance.title'),
      description: t('privacy.compliance.description')
    }
  ];

  const securityMeasures = [
    {
      icon: Globe,
      title: t('privacy.security.ssl.title'),
      description: t('privacy.security.ssl.description')
    },
    {
      icon: Clock,
      title: t('privacy.security.backup.title'),
      description: t('privacy.security.backup.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('privacy.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('privacy.features.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privacyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Measures */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('privacy.security.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {securityMeasures.map((measure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <measure.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">
                    {measure.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {measure.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Collection */}
        <section className="mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('privacy.dataCollection.title')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('privacy.dataCollection.whatWeCollect.title')}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>{t('privacy.dataCollection.whatWeCollect.item1')}</li>
                  <li>{t('privacy.dataCollection.whatWeCollect.item2')}</li>
                  <li>{t('privacy.dataCollection.whatWeCollect.item3')}</li>
                  <li>{t('privacy.dataCollection.whatWeCollect.item4')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('privacy.dataCollection.howWeUse.title')}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>{t('privacy.dataCollection.howWeUse.item1')}</li>
                  <li>{t('privacy.dataCollection.howWeUse.item2')}</li>
                  <li>{t('privacy.dataCollection.howWeUse.item3')}</li>
                  <li>{t('privacy.dataCollection.howWeUse.item4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className="mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('privacy.userRights.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('privacy.userRights.access.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('privacy.userRights.access.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('privacy.userRights.control.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('privacy.userRights.control.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('privacy.userRights.deletion.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('privacy.userRights.deletion.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('privacy.userRights.portability.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('privacy.userRights.portability.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">
              {t('privacy.contact.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t('privacy.contact.privacy.title')}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {t('privacy.contact.privacy.description')}
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@wecv.ai
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t('privacy.contact.security.title')}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {t('privacy.contact.security.description')}
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> security@wecv.ai
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-gray-500">
          <p>{t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
} 