"use client";

/**
 * Google Tag Manager component. When a GTM ID is provided via
 * `NEXT_PUBLIC_GTM_ID`, this component injects the GTM bootstrap script
 * and noscript fallback into the document. Without an ID the component
 * renders nothing.
 */
export default function GTM() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  return (
    <>
      <script
        id="gtm-init"
        dangerouslySetInnerHTML={{
          __html: `(() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            const f = document.getElementsByTagName('script')[0];
            const j = document.createElement('script');
            const dl = 'dataLayer' !== 'dataLayer' ? '&l=dataLayer' : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=${id}' + dl;
            f.parentNode?.insertBefore(j, f);
          })();`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}