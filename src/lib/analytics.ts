declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }

export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID;
  if (!id || id === 'G-XXXXXXXXXX') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

export function track(name: string, params: Record<string, string | number | boolean> = {}) {
  window.gtag?.('event', name, params);
}
