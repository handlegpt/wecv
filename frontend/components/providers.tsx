'use client'

import { Toaster } from 'react-hot-toast'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </I18nextProvider>
  )
} 