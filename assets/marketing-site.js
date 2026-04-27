window.MARKETING_SITE_CONFIG = Object.freeze({
  gtmContainerId: 'GTM-PTG5FV86',
});

(function () {
  const config = window.MARKETING_SITE_CONFIG || {};
  const containerId = typeof config.gtmContainerId === 'string' ? config.gtmContainerId.trim() : '';

  function createGtmHeadScript() {
    const script = document.createElement('script');
    script.dataset.marketingGtmTarget = 'head';
    script.text =
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
      'new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],' +
      "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
      "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
      "})(window,document,'script','dataLayer','" +
      containerId +
      "');";
    return script;
  }

  function createGtmBodyNoscript() {
    const noscript = document.createElement('noscript');
    noscript.dataset.marketingGtmTarget = 'body';

    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + encodeURIComponent(containerId);
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';

    noscript.appendChild(iframe);
    return noscript;
  }

  window.installMarketingSiteGoogleTagManager = function installMarketingSiteGoogleTagManager(target) {
    if (!containerId) {
      return;
    }

    const parent = target === 'head' ? document.head : document.body;
    if (!parent) {
      return;
    }

    if (parent.querySelector('[data-marketing-gtm-target="' + target + '"]')) {
      return;
    }

    parent.appendChild(target === 'head' ? createGtmHeadScript() : createGtmBodyNoscript());
  };
})();

window.installMarketingSiteGoogleTagManager?.('head');

function initMarketingSiteDom() {
  window.installMarketingSiteGoogleTagManager?.('body');
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarketingSiteDom, { once: true });
} else {
  initMarketingSiteDom();
}
