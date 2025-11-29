'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SentryTestPage() {
  const [status, setStatus] = useState<Record<string, string>>({});

  const updateStatus = (key: string, message: string) => {
    setStatus((prev) => ({ ...prev, [key]: message }));
    setTimeout(() => {
      setStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[key];
        return newStatus;
      });
    }, 5000);
  };

  // Test 1: Client-side error
  const triggerClientError = () => {
    try {
      updateStatus('client', '✅ Error sent to Sentry!');
      // @ts-expect-error - Intentionally throwing error
      undefinedFunction();
    } catch (error) {
      Sentry.captureException(error);
      console.error('Client error captured:', error);
    }
  };

  // Test 2: Unhandled promise rejection
  const triggerUnhandledRejection = () => {
    updateStatus('rejection', '✅ Unhandled rejection sent to Sentry!');
    Promise.reject(new Error('Test unhandled promise rejection'));
  };

  // Test 3: Console error
  const triggerConsoleError = () => {
    updateStatus('console', '✅ Console error sent to Sentry!');
    console.error('Test console error for Sentry');
    Sentry.captureMessage('Test console error message', 'error');
  };

  // Test 4: API route error
  const triggerApiError = async () => {
    try {
      updateStatus('api', '⏳ Sending request...');
      const response = await fetch('/api/test-sentry?type=error');
      if (!response.ok) {
        throw new Error('API error occurred');
      }
      const data = await response.json();
      updateStatus('api', `✅ ${data.message}`);
    } catch (error) {
      updateStatus('api', '✅ API error sent to Sentry!');
      Sentry.captureException(error);
      console.error('API error captured:', error);
    }
  };

  // Test 5: Server component error (via API)
  const triggerServerError = async () => {
    try {
      updateStatus('server', '⏳ Sending request...');
      const response = await fetch('/api/test-sentry?type=server-error');
      if (!response.ok) {
        throw new Error('Server error occurred');
      }
      const data = await response.json();
      updateStatus('server', `✅ ${data.message}`);
    } catch (error) {
      updateStatus('server', '✅ Server error sent to Sentry!');
      Sentry.captureException(error);
      console.error('Server error captured:', error);
    }
  };

  // Test 6: Custom message
  const sendCustomMessage = () => {
    updateStatus('message', '✅ Custom message sent to Sentry!');
    Sentry.captureMessage('This is a test message from Sentry test page', 'info');
  };

  // Test 7: Breadcrumb
  const addBreadcrumb = () => {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked breadcrumb test button',
      level: 'info',
    });
    updateStatus('breadcrumb', '✅ Breadcrumb added! Click another error to see it in context.');
  };

  // Test 8: User context
  const setUserContext = () => {
    Sentry.setUser({
      id: 'test-user-123',
      username: 'test-user',
      email: 'test@example.com',
    });
    updateStatus('user', '✅ User context set! Next error will include this user info.');
  };

  // Test 9: Tags
  const addTags = () => {
    Sentry.setTag('test-page', 'sentry-debug');
    Sentry.setTag('test-type', 'manual');
    updateStatus('tags', '✅ Tags added! Next error will include these tags.');
  };

  // Test 10: Performance transaction
  const testPerformance = () => {
    Sentry.startSpan(
      {
        name: 'test-operation',
        op: 'test',
      },
      () => {
        // Simulate some work
        for (let i = 0; i < 1000000; i++) {
          Math.random();
        }
        return 'completed';
      }
    );
    updateStatus('performance', '✅ Performance transaction sent to Sentry!');
  };

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Sentry Error Monitoring Test</h1>
        <p className="text-gray-600">
          Use these buttons to test different types of errors and verify Sentry is working
          correctly.
        </p>
        <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Make sure you have{' '}
            <code className="rounded bg-yellow-100 px-1">NEXT_PUBLIC_SENTRY_DSN</code> set in your
            environment variables. Check your Sentry dashboard to see the errors.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Client-side Errors */}
        <section className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Client-Side Errors</h2>
          <div className="space-y-3">
            <div>
              <Button onClick={triggerClientError} variant="destructive">
                Trigger Client Error
              </Button>
              {status.client && (
                <span className="ml-3 text-sm text-green-600">{status.client}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Throws a JavaScript error that should be caught by Sentry
              </p>
            </div>

            <div>
              <Button onClick={triggerUnhandledRejection} variant="destructive">
                Trigger Unhandled Rejection
              </Button>
              {status.rejection && (
                <span className="ml-3 text-sm text-green-600">{status.rejection}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">Creates an unhandled promise rejection</p>
            </div>

            <div>
              <Button onClick={triggerConsoleError} variant="destructive">
                Trigger Console Error
              </Button>
              {status.console && (
                <span className="ml-3 text-sm text-green-600">{status.console}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">Sends a console error message to Sentry</p>
            </div>
          </div>
        </section>

        {/* Server-side Errors */}
        <section className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Server-Side Errors</h2>
          <div className="space-y-3">
            <div>
              <Button onClick={triggerApiError} variant="destructive">
                Trigger API Route Error
              </Button>
              {status.api && <span className="ml-3 text-sm text-green-600">{status.api}</span>}
              <p className="mt-1 text-sm text-gray-500">
                Triggers an error in an API route handler
              </p>
            </div>

            <div>
              <Button onClick={triggerServerError} variant="destructive">
                Trigger Server Error
              </Button>
              {status.server && (
                <span className="ml-3 text-sm text-green-600">{status.server}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Triggers a server-side error with stack trace
              </p>
            </div>
          </div>
        </section>

        {/* Custom Messages & Context */}
        <section className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Custom Messages & Context</h2>
          <div className="space-y-3">
            <div>
              <Button onClick={sendCustomMessage} variant="outline">
                Send Custom Message
              </Button>
              {status.message && (
                <span className="ml-3 text-sm text-green-600">{status.message}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">Sends a custom message to Sentry</p>
            </div>

            <div>
              <Button onClick={addBreadcrumb} variant="outline">
                Add Breadcrumb
              </Button>
              {status.breadcrumb && (
                <span className="ml-3 text-sm text-green-600">{status.breadcrumb}</span>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Adds a breadcrumb that will appear in the next error
              </p>
            </div>

            <div>
              <Button onClick={setUserContext} variant="outline">
                Set User Context
              </Button>
              {status.user && <span className="ml-3 text-sm text-green-600">{status.user}</span>}
              <p className="mt-1 text-sm text-gray-500">Sets user information for error context</p>
            </div>

            <div>
              <Button onClick={addTags} variant="outline">
                Add Tags
              </Button>
              {status.tags && <span className="ml-3 text-sm text-green-600">{status.tags}</span>}
              <p className="mt-1 text-sm text-gray-500">Adds custom tags to errors</p>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Performance Monitoring</h2>
          <div>
            <Button onClick={testPerformance} variant="outline">
              Test Performance Transaction
            </Button>
            {status.performance && (
              <span className="ml-3 text-sm text-green-600">{status.performance}</span>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Creates a performance transaction to test APM
            </p>
          </div>
        </section>

        {/* Status Info */}
        <section className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-blue-900">How to Verify</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm text-blue-800">
            <li>Click any of the error buttons above</li>
            <li>
              Open your Sentry dashboard at{' '}
              <code className="rounded bg-blue-100 px-1">https://sentry.io</code>
            </li>
            <li>Navigate to your project&apos;s Issues page</li>
            <li>You should see the errors appear within a few seconds</li>
            <li>Click on an error to see detailed information, stack traces, and context</li>
          </ol>
          <div className="mt-4 rounded bg-blue-100 p-3">
            <p className="text-sm font-semibold text-blue-900">Development Mode:</p>
            <p className="text-sm text-blue-800">
              In development, Sentry Spotlight is enabled. Check your browser console for Spotlight
              connection status.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
