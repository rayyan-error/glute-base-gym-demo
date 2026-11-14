/**
 * GLUTE BASE GYM & FUEL BASE NUTRITION KITCHEN — INTERACTIVE ENGINE (main.js)
 * Pure Vanilla JavaScript (ES6+)
 * - Mobile Hamburger Menu Drawer
 * - Dual-Brand iOS Pill Toggle with Blur Dissolve (filter: blur(8px); opacity: 0;)
 *   Strictly scoped ONLY to Hero (index.html) or Gallery Grid (gallery.html)
 * - Mobile Notice Board Accordion ("View all" toggle)
 * - Real-Time Menu Search Filter (menu.html)
 * - Swiggy / Zomato "Service coming soon" Modal (menu.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. MOBILE HAMBURGER MENU
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const siteNav = document.getElementById('site-nav');

  if (hamburgerBtn && siteNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      siteNav.classList.toggle('is-open', !isExpanded);
    });

    // Close menu when clicking a nav link on mobile
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. DUAL-BRAND PILL TOGGLE (BLUR DISSOLVE ENGINE)
        Strictly updates ONLY the scoped section (#hero-brand-scope or #gallery-brand-scope)
     -------------------------------------------------------------------------- */
  const pillSwitches = document.querySelectorAll('[data-brand-switch]');

  pillSwitches.forEach((switchEl) => {
    const scopeId = switchEl.getAttribute('data-brand-switch');
    const scopeZone = document.getElementById(scopeId);
    if (!scopeZone) return;

    const dissolveTarget = scopeZone.querySelector('.blur-dissolve-target');
    const pillButtons = switchEl.querySelectorAll('.pill-option');
    const glutePane = scopeZone.querySelector('[data-brand-pane="glute"]');
    const fuelPane = scopeZone.querySelector('[data-brand-pane="fuel"]');

    let activeBrand = 'glute';
    let isTransitioning = false;

    pillButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedBrand = btn.getAttribute('data-brand');
        if (!selectedBrand || selectedBrand === activeBrand || isTransitioning) return;

        isTransitioning = true;
        activeBrand = selectedBrand;

        // Update active state on iOS pill buttons
        pillButtons.forEach((b) => {
          const isMatch = b.getAttribute('data-brand') === selectedBrand;
          b.classList.toggle('is-active', isMatch);
          b.setAttribute('aria-selected', String(isMatch));
        });

        // Step 1: Trigger Blur Dissolve out (filter: blur(8px); opacity: 0;)
        if (dissolveTarget) {
          dissolveTarget.classList.add('is-dissolving');
        }

        setTimeout(() => {
          // Step 2: Swap scoped theme class (Charcoal vs Off-White) ONLY on the scoped section
          if (selectedBrand === 'fuel') {
            scopeZone.classList.remove('theme-glute');
            scopeZone.classList.add('theme-fuel');
            if (glutePane) glutePane.hidden = true;
            if (fuelPane) fuelPane.hidden = false;
          } else {
            scopeZone.classList.remove('theme-fuel');
            scopeZone.classList.add('theme-glute');
            if (fuelPane) fuelPane.hidden = true;
            if (glutePane) glutePane.hidden = false;
          }

          // Step 3: Dissolve back in clearly
          requestAnimationFrame(() => {
            if (dissolveTarget) {
              dissolveTarget.classList.remove('is-dissolving');
            }
            setTimeout(() => {
              isTransitioning = false;
            }, 280);
          });
        }, 260);
      });
    });
  });

  /* --------------------------------------------------------------------------
     3. MOBILE ANNOUNCEMENTS ACCORDION (index.html)
        Shows Main Announcement + 1 previous notice by default, toggles the rest
     -------------------------------------------------------------------------- */
  const noticeToggleBtn = document.getElementById('notice-accordion-toggle');
  const prevNoticesList = document.getElementById('prev-notices-list');

  if (noticeToggleBtn && prevNoticesList) {
    noticeToggleBtn.addEventListener('click', () => {
      const isExpanded = prevNoticesList.classList.toggle('is-expanded');
      noticeToggleBtn.setAttribute('aria-expanded', String(isExpanded));
      const labelSpan = noticeToggleBtn.querySelector('[data-toggle-label]');
      if (labelSpan) {
        labelSpan.textContent = isExpanded
          ? 'Show fewer notices ↑'
          : 'View all notices (2 more) ↓';
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. REAL-TIME MENU SEARCH FILTER (menu.html)
     -------------------------------------------------------------------------- */
  const menuSearchInput = document.getElementById('menu-search-input');
  const menuItems = document.querySelectorAll('[data-menu-item]');
  const menuCategories = document.querySelectorAll('[data-menu-category]');
  const menuEmptyState = document.getElementById('menu-empty-state');

  if (menuSearchInput && menuItems.length > 0) {
    menuSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      let totalVisible = 0;

      menuItems.forEach((item) => {
        const searchContent = (item.getAttribute('data-search-text') || item.textContent || '').toLowerCase();
        const matches = !query || searchContent.includes(query);
        item.style.display = matches ? '' : 'none';
        if (matches) totalVisible++;
      });

      // Hide category headers that have 0 matching items
      menuCategories.forEach((cat) => {
        const catItems = cat.querySelectorAll('[data-menu-item]');
        const hasVisible = Array.from(catItems).some((el) => el.style.display !== 'none');
        cat.style.display = hasVisible ? '' : 'none';
      });

      if (menuEmptyState) {
        menuEmptyState.style.display = totalVisible === 0 ? 'block' : 'none';
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. SWIGGY / ZOMATO DELIVERY MODAL POPUP (menu.html)
     -------------------------------------------------------------------------- */
  const deliveryTriggers = document.querySelectorAll('[data-delivery-modal]');
  const deliveryModal = document.getElementById('delivery-coming-soon-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPlatformSpan = document.getElementById('modal-platform-name');

  if (deliveryModal && deliveryTriggers.length > 0) {
    const openModal = (platformName) => {
      if (modalPlatformSpan && platformName) {
        modalPlatformSpan.textContent = platformName;
      }
      deliveryModal.classList.add('is-open');
      deliveryModal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      deliveryModal.classList.remove('is-open');
      deliveryModal.setAttribute('aria-hidden', 'true');
    };

    deliveryTriggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-delivery-modal') || 'Delivery';
        openModal(platform);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    deliveryModal.addEventListener('click', (e) => {
      if (e.target === deliveryModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && deliveryModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
});
