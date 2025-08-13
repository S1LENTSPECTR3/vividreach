const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

/**
 * Conditionally build a Content-Security-Policy header if analytics are enabled.
 * When GTM or GA is configured via environment variables, we allow their domains and
 * inline scripts so the snippets can execute. Otherwise we omit the header.
 */
function buildCsp() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gtm && !ga) {
    return null;
  }
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'vercel-insights.com',
  ];
  const connectSrc = ["'self'", 'https:'];
  const imgSrc = ["'self'", 'data:', 'https:'];
  return [
    {
      key: 'Content-Security-Policy',
      value: `script-src ${scriptSrc.join(' ')}; img-src ${imgSrc.join(' ')}; connect-src ${connectSrc.join(' ')};`,
    },
  ];
}

module.exports = {
  reactStrictMode: true,
  async headers() {
    const csp = buildCsp();
    return [
      {
        source: '/(.*)',
        headers: csp ? [...securityHeaders, ...csp] : securityHeaders,
      },
    ];
  },
};