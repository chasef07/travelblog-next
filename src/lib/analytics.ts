// Simple Web Vitals tracking for performance monitoring

export function trackWebVitals(metric: { name: string; value: number; rating: string; delta: number; id: string }) {
  // Only track in production
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  // Simple console logging for now - can be replaced with analytics service
  console.log(`[Performance] ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });

  // Optional: Send to analytics service
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' }
  // });
}

// Track page load performance
export function trackPageLoad(pageName: string) {
  if (typeof window === 'undefined') return;

  // Use performance.mark for timing
  performance.mark(`${pageName}-start`);
  
  // Track when page is interactive
  if (document.readyState === 'complete') {
    performance.mark(`${pageName}-complete`);
    performance.measure(
      `${pageName}-load-time`, 
      `${pageName}-start`, 
      `${pageName}-complete`
    );
  } else {
    window.addEventListener('load', () => {
      performance.mark(`${pageName}-complete`);
      performance.measure(
        `${pageName}-load-time`, 
        `${pageName}-start`, 
        `${pageName}-complete`
      );
    });
  }
}