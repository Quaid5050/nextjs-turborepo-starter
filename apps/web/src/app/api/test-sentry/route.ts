import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  try {
    if (type === 'error') {
      // Simulate an API error
      throw new Error('Test API route error - This is a test error for Sentry monitoring');
    }

    if (type === 'server-error') {
      // Simulate a server-side error with more context
      Sentry.setContext('test-context', {
        testType: 'server-error',
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent'),
      });

      Sentry.setTag('error-source', 'api-route');
      Sentry.setTag('test-scenario', 'server-error');

      throw new Error(
        'Test server-side error with context - This error includes additional context and tags'
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'API route working correctly',
      type: type || 'none',
    });
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Error captured and sent to Sentry',
      },
      { status: 500 }
    );
  }
}
