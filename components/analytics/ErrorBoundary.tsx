'use client'

import React, { ReactNode, ReactElement } from 'react'
import { trackError } from '@/lib/ga4'

interface Props {
  children: ReactNode
  fallback?: ReactElement
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    trackError(error.message, error.name, errorInfo.componentStack)
    console.error('[ErrorBoundary] Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred. Please refresh the page and try again.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 p-4 bg-destructive/10 border border-destructive rounded-lg">
                <summary className="cursor-pointer font-mono text-sm">Error Details</summary>
                <pre className="mt-2 text-xs whitespace-pre-wrap overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        )
      )
    }

    return this.props.children
  }
}
