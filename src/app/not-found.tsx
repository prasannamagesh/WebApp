import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <p className="text-slate-600">Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
