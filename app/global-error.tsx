"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen px-4 text-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Something went wrong</h1>
          <p className="text-gray-300 mb-6">{error.message || 'An unexpected error occurred.'}</p>
          <button onClick={() => reset()} className="btn-primary">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}