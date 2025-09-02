import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-8">
          <Card className="bg-[#1e293b]/50 border-[#ef4444]/20 max-w-md w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#ef4444]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ef4444] text-[24px]">⚠️</span>
              </div>
              <CardTitle className="text-[#f8fafc]">Oops! Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-[#cbd5e1] text-[14px]">
                We encountered an unexpected error. Don't worry - your progress is saved.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3 text-left">
                  <p className="text-[#ef4444] text-[12px] font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  onClick={this.handleRetry}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex-1"
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white flex-1"
                >
                  Reload Page
                </Button>
              </div>
              
              <p className="text-[#64748b] text-[12px]">
                If the problem persists, please refresh the page or contact support.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}