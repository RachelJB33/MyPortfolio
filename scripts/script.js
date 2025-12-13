document.addEventListener('DOMContentLoaded', () => {
  // Floating Background animations after macbook-img's
  const macbook = document.querySelector('.macbook-img-1');
  const floatingBg = document.querySelector('.floating-bg');
  if (macbook && floatingBg) {
    macbook.addEventListener('transitionend', () => {
      floatingBg.classList.add('animate-bg');
    }, { once: true });
  }

  document.querySelectorAll('.mini-navbar-link').forEach(link => {
  link.addEventListener('mouseleave', () => {
    document.querySelectorAll('.mini-navbar-link i').forEach(icon => {
      icon.style.animation = 'none'; // reset animation
      void icon.offsetWidth; // trigger reflow
      icon.style.animation = 'blinkWhiteToPrimary 2s ease-in-out infinite'; // restart animation
    });
  });
});

  // Navbar shows ONLY after hero section is scrolled completely past
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('#hero-section');

  if (navbar && heroSection) {
    let ticking = false;

    function updateNavbar() {
      const heroRect = heroSection.getBoundingClientRect();

      if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.visibility = 'hidden';
      } else {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
        navbar.style.visibility = 'visible';
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });

    updateNavbar(); // Initial state
  }

  // Hamburger Menu Movement
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      document.querySelector(".container")?.classList.toggle("change");
      document.querySelector(".sidebar")?.classList.toggle("change");
    });
  }

  // Sidebar menu navbar toggle
  const menu = document.querySelector('.menu');
  if (menu && navbar) {
    menu.addEventListener('click', () => {
      navbar.classList.toggle('change');
      menu.classList.toggle('change');
    });
  }

  // Navbar active link highlighting
  const navLinks = document.querySelectorAll('.navbar-link');
  const sections = document.querySelectorAll('section');

  function getNavbarHeight() {
    return navbar?.offsetHeight || 0;
  }

  function getCurrentSection() {
    const scrollPosition = window.scrollY + getNavbarHeight();
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (scrollPosition >= section.offsetTop) {
        return section.id;
      }
    }
    return sections[0]?.id || '';
  }

  function updateActiveLink() {
    const currentSection = getCurrentSection();
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initial call
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);

  // Intersection Observer for precise detection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveLink();
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  // Section 2 image + description one-time animation on scroll direction
  let lastScrollTop = 0;
  let section2Animated = false;
  const element1 = document.querySelector('.section-2-top-img');
  const element2 = document.querySelector('.section-2-desc');

  if (element1 && element2) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (!section2Animated && scrollTop > lastScrollTop) {
        element1.classList.add('slide-in-from-right');
        element2.classList.add('slide-in-from-left');
        section2Animated = true;
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // About-card: animate when it actually reaches the viewport
  const aboutCard = document.querySelector('.about-card');
  let aboutCardAnimated = false;

  function handleAboutCardScroll() {
    if (!aboutCard || aboutCardAnimated) return;

    const rect = aboutCard.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Fire when top of card is within lower 75% of viewport
    if (rect.top < windowHeight * 0.75) {
      aboutCard.classList.add('slide-in-from-left');
      aboutCardAnimated = true;
      window.removeEventListener('scroll', handleAboutCardScroll);
    }
  }

  window.addEventListener('scroll', handleAboutCardScroll);
  handleAboutCardScroll(); // in case it's already in view on load

  // Footer scroll to top
  const scrollTopBtn = document.querySelector('.footer-scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Macbook Loading Animation (runs on page load)
window.addEventListener('load', () => {
  const heroSectionContent = document.querySelector('.hero-section-content');
  if (heroSectionContent) {
    heroSectionContent.classList.add('change');
  }
});

// Section 3 project cards + heading + more-btn: staggered animation when section enters viewport
const section3 = document.querySelector('.section-3');
const section3Heading = document.querySelector('.section-3-heading');
const moreBtn = document.querySelector('.more-btn');
const projectCards = document.querySelectorAll('.project-card');
let section3Animated = false;

function handleSection3Scroll() {
  if (!section3 || section3Animated) return;

  const rect = section3.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < windowHeight * 0.8) {
    if (section3Heading) section3Heading.classList.add('animate-in');
    if (moreBtn) moreBtn.classList.add('animate-in');
    projectCards.forEach(card => card.classList.add('animate-in'));
    section3Animated = true;
    window.removeEventListener('scroll', handleSection3Scroll);
  }
}

window.addEventListener('scroll', handleSection3Scroll);
handleSection3Scroll(); // in case already in view



