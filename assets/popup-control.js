document.addEventListener('DOMContentLoaded', () => {
  const customer = window.Shopify && window.Shopify.customer ? window.Shopify.customer : null;
  const isSubscribed = customer && customer.tags && customer.tags.includes('subscribed');

  if (isSubscribed) {
    console.log('Abone kullanıcı, popup gösterilmiyor.');
    return;
  }

  const popupDelay = 10000; // 10 saniye sonra göster
  const repeatDelay = 600000; // 10 dakika aralık
  const lastShown = localStorage.getItem('popupLastShown');
  const now = Date.now();

  if (!lastShown || now - lastShown > repeatDelay) {
    setTimeout(() => {
      showSubscriptionPopup();
      localStorage.setItem('popupLastShown', now);
    }, popupDelay);
  }

  function showSubscriptionPopup() {
    const popup = document.querySelector('.subscription-popup');
    if (popup) popup.classList.add('is-active');
    console.log('Popup tetiklendi');
  }
});
