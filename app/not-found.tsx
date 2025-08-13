export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen text-center px-4">
      <div>
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Sorry, we couldn’t find that page.</p>
        <a href="/" className="btn-primary">Go back home</a>
      </div>
    </main>
  );
}