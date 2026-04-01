

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (url: string) => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackCTAClick = (ctaName: string, location: string) => {
  event({
    action: 'click',
    category: 'CTA',
    label: `${ctaName} - ${location}`,
  });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  event({
    action: success ? 'submit_success' : 'submit_error',
    category: 'Form',
    label: formName,
  });
};

export const trackOutboundLink = (url: string, linkName: string) => {
  event({
    action: 'click',
    category: 'Outbound Link',
    label: `${linkName} - ${url}`,
  });
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params || {});
    }
    if (process.env.NODE_ENV === 'development') {
      console.info(`[Analytics] ${eventName}`, params);
    }
  } catch (error) {
    console.warn("Analytics tracking failed", error);
  }
};
