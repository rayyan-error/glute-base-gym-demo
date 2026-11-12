/**
 * Glute Base Gym - Vanilla JS Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current year dynamically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Header shadow & border elevation on scroll
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.style.borderBottomColor = 'rgba(0, 210, 255, 0.2)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
      } else {
        header.style.borderBottomColor = 'rgba(242, 244, 248, 0.08)';
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. WhatsApp Widget subtle entrance animation
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.style.opacity = '0';
    whatsappBtn.style.transform = 'scale(0.8) translateY(20px)';
    
    setTimeout(() => {
      whatsappBtn.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'scale(1) translateY(0)';
    }, 400);
  }

  // 4. Subtle mouse movement ambient glow enhancement on desktop
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const glowBlue = document.querySelector('.glow-blue');
    const glowPink = document.querySelector('.glow-pink');

    if (glowBlue && glowPink) {
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 30;
        const yOffset = (clientY / window.innerHeight - 0.5) * 30;

        glowBlue.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        glowPink.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;
      }, { passive: true });
    }
  }
});
