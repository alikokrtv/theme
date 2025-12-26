(function() {
  function initChristmasVideo() {
    const posterIds = ['4f374aec7fa64006abed3e3a32119823', '995eede906094a83b1441666fb8f0e76'];
    const videos = [];

    posterIds.forEach(posterId => {
      const found = document.querySelectorAll(`video[poster*="${posterId}"]`);
      found.forEach(video => videos.push(video));
    });

    if (videos.length === 0) return;

    videos.forEach(specialVideo => {
      const videoMedia = specialVideo.closest('video-media');
      const clickTarget = videoMedia || specialVideo;

      if (clickTarget.dataset.christmasInit === 'true') return;
      clickTarget.dataset.christmasInit = 'true';

      // Desktop: hover to play
      if (window.matchMedia('(hover: hover)').matches) {
        specialVideo.addEventListener('mouseenter', () => {
          specialVideo.play().catch(() => {});
        });
      }

      // Redirect fonksiyonu
      const redirect = () => {
        window.location.href = '/collections/christmas-sale';
      };

      // Desktop / normal click
      clickTarget.addEventListener('click', function(e) {
        // Normal tıklama -> yönlendir
        redirect();
      });

      // Mobil: kaydırma ile tıklamayı ayır
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      clickTarget.addEventListener('touchstart', function(e) {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartTime = Date.now();
      }, { passive: true });

      clickTarget.addEventListener('touchend', function(e) {
        const t = e.changedTouches[0];
        const dx = Math.abs(t.clientX - touchStartX);
        const dy = Math.abs(t.clientY - touchStartY);
        const dt = Date.now() - touchStartTime;

        // küçük hareket + kısa süre = gerçek "tap"
        const isTap = dx < 10 && dy < 10 && dt < 300;

        if (isTap) {
          e.preventDefault();
          e.stopPropagation();
          redirect();
        }
        // değilse (scroll ise) hiçbir şey yapma, sayfa kaymaya devam etsin
      }, { passive: false });

      if (clickTarget.style) {
        clickTarget.style.cursor = 'pointer';
        clickTarget.style.userSelect = 'none';
        clickTarget.style.webkitTapHighlightColor = 'transparent';
      }

      if (specialVideo.style) {
        specialVideo.style.cursor = 'pointer';
        specialVideo.style.pointerEvents = 'auto';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChristmasVideo);
  } else {
    initChristmasVideo();
  }

  setTimeout(initChristmasVideo, 1000);
  setTimeout(initChristmasVideo, 3000);
})();
