'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after a brief moment
    const timer = setTimeout(() => {
      router.push('/');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you back to the homepage</p>
      </div>
    </div>
  );
}
