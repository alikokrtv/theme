/**
 * Christmas Video Redirect Logic
 * Moves inline script from theme.liquid to external asset
 */
(function() {
  function initChristmasVideo() {
    // Find videos by poster ID (both desktop and mobile versions)
    const posterIds = ['4f374aec7fa64006abed3e3a32119823', '995eede906094a83b1441666fb8f0e76'];
    const videos = [];
    
    // Find all videos matching Christmas poster IDs
    posterIds.forEach(posterId => {
      const found = document.querySelectorAll(`video[poster*="${posterId}"]`);
      found.forEach(video => videos.push(video));
    });
    
    if (videos.length === 0) return;
    
    // Process each video (mobile and desktop)
    videos.forEach(specialVideo => {
      // Find parent video-media element if exists
      const videoMedia = specialVideo.closest('video-media');
      const clickTarget = videoMedia || specialVideo;
      
      // Skip if already initialized
      if (clickTarget.dataset.christmasInit === 'true') return;
      clickTarget.dataset.christmasInit = 'true';
      
      // Desktop: hover to play
      if (window.matchMedia('(hover: hover)').matches) {
        specialVideo.addEventListener('mouseenter', () => {
          specialVideo.play().catch(() => {}); // Suppress autoplay errors
        });
      }
      
      // Both mobile and desktop: click/touch to redirect
      const handleRedirect = (e) => {
        // Only redirect if it's a direct interaction, not scrolling
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/collections/christmas-sale';
      };
      
      clickTarget.addEventListener('click', handleRedirect);
      clickTarget.addEventListener('touchend', handleRedirect, { passive: false });
      
      // Make clickable
      if (clickTarget.style) {
        clickTarget.style.cursor = 'pointer';
        clickTarget.style.userSelect = 'none';
        clickTarget.style.webkitTapHighlightColor = 'transparent';
      }
      
      // Also make the video element itself clickable
      if (specialVideo.style) {
        specialVideo.style.cursor = 'pointer';
        specialVideo.style.pointerEvents = 'auto';
      }
    });
  }

  // Optimize initialization using IntersectionObserver or simply DOMContentLoaded + gentle retry
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChristmasVideo);
  } else {
    initChristmasVideo();
  }
  
  // Minimal retry for dynamically loaded content - better than aggressive polling
  // Using a single observer for the body to catch dynamically added video elements would be better long term
  // but for now we reduce the polling overhead.
  setTimeout(initChristmasVideo, 1000);
  setTimeout(initChristmasVideo, 3000);
})();
