import Script from "next/script";
import siteMetadata from "@/data/metadata";

const isProduction = process.env.NODE_ENV === "production";

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.googleAnalyticsId && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
          />

          <Script strategy="lazyOnload" id="ga-script">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
          </Script>
        </>
      )}
    </>
  );
};

export default Analytics;

declare global {
  interface Window {
    gtag: any;
  }
}

export const logEvent = (
  action: any,
  category: any,
  label: any,
  value: any
) => {
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
