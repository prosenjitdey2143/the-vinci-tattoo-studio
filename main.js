// --- PARTICLE SYSTEM ---
function initParticles() {
    const containers = document.querySelectorAll('.particles-container');
    
    containers.forEach(container => {
        const particleCount = 20; // Subtle amount
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size, position, and duration
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            container.appendChild(particle);
            
            // GSAP Floating Animation
            gsap.to(particle, {
                x: `random(-100, 100)`,
                y: `random(-100, 100)`,
                opacity: Math.random() * 0.5 + 0.1,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay
            });
        }
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initParticles();
    initAnimeInteractions();
    initTestimonials();
});
gsap.registerPlugin(ScrollTrigger);

// --- ANIME.JS POWERED INTERACTIONS ---
function initAnimeInteractions() {
    // 1. Navigation Links Stagger
    anime({
        targets: '.nav-links a',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutExpo',
        duration: 1200
    });

    // 2. Hero Icon Floating (Continuous)
    anime({
        targets: '.icon-item',
        translateY: [-10, 10],
        direction: 'alternate',
        loop: true,
        delay: anime.stagger(200),
        duration: 3000,
        easing: 'easeInOutQuad'
    });

    // 3. Button Hover Effects (Dynamic)
    const btns = document.querySelectorAll('.btn-explore, .read-more-arrow, .insta-follow-btn');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    });
}

// --- LENIS BUTTERY SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    infinite: false,
});

// Synchronize ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

// Use GSAP's ticker for the RAF for better sync
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- GSAP ENTRANCE ANIMATION ---
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

window.addEventListener('load', () => {
    // 1. Initial State Hidden
    gsap.set(".hero-bg", { scale: 1.2, opacity: 0 });
    gsap.set(".vinci-statue", { y: 100, opacity: 0, scale: 0.9 });
    gsap.set(".large-word", { y: 50, opacity: 0 });
    gsap.set(".small-word, .ampersand, .vertical-index span", { opacity: 0 });
    gsap.set(".glass-card", { y: 30, opacity: 0 });
    gsap.set(".icon-item", { y: 20, opacity: 0 });
    gsap.set(".hero-footer", { opacity: 0 });

    // 2. Reveal Sequence
    tl.to(".hero-bg", { opacity: 0.4, scale: 1, duration: 2.5 })
      .to(".vinci-statue", { opacity: 1, y: 0, scale: 1, duration: 2 }, "-=2")
      .to(".large-word", { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 }, "-=1.5")
      .to(".small-word, .ampersand, .vertical-index span", { opacity: 1, duration: 1, stagger: 0.1 }, "-=1")
      .to(".glass-card", { opacity: 1, y: 0, duration: 1, stagger: 0.3 }, "-=1")
      .to(".icon-item", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
      .to(".hero-footer", { opacity: 1, duration: 1 }, "-=0.5");
});

// --- ANIME.JS MICRO-ANIMATIONS ---

// Flicker effect for telemetry
gsap.to(".telemetry-data", {
    opacity: 0.2,
    duration: 0.1,
    repeat: -1,
    yoyo: true,
    repeatDelay: 2,
    ease: "power2.inOut"
});

// Smooth, non-glitchy floating for the right card
gsap.to(".right-card", {
    y: "-=15",
    rotation: 1,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Enhanced Cinematic Zoom-in/Zoom-out for the statue
anime({
    targets: '.vinci-statue',
    scale: [1, 1.08], // More pronounced zoom
    duration: 8000,   // Slower, more majestic
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
});

// Scroll-triggered zoom for depth
gsap.to(".vinci-statue", {
    scale: 1.15,
    y: -30,
    scrollTrigger: {
        trigger: ".hero-scene",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// Hover effect for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, color: "#D4AF37", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, color: "#FFFFFF", duration: 0.3 });
    });
});

// --- ABOUT SECTION ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
    }
});

// Initial states for about section elements
gsap.set(".about-main-img", { scale: 1.2, filter: "brightness(0)" });
gsap.set(".about-label", { y: 20, opacity: 0 });
gsap.set(".about-heading", { y: 40, opacity: 0 });
gsap.set(".about-description p", { y: 30, opacity: 0 });
gsap.set(".about-signature, .about-cta", { y: 20, opacity: 0 });
gsap.set(".about-panel .panel-inner > *", { scale: 0.8, opacity: 0 });

aboutTl
    .to(".about-main-img", { scale: 1, filter: "brightness(0.8) contrast(1.1) sepia(0.2)", duration: 2, ease: "power3.out" })
    .to(".about-label", { y: 0, opacity: 1, duration: 1 }, "-=1.5")
    .to(".about-heading", { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=1.2")
    .to(".about-description p", { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.8")
    .to(".about-signature, .about-cta", { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, "-=0.5")
    .to(".about-panel .panel-inner > *", { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2 }, "-=0.8");

// Subtle parallax for the main image
gsap.to(".about-main-img", {
    y: -50,
    ease: "none",
    scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// --- DYNAMIC PARTICLE SYSTEM ---
function createParticles() {
    const heroContainer = document.querySelector('.hero-scene .particles-container');
    const aboutContainer = document.querySelector('.about-section .particles-container');
    const motionContainer = document.querySelector('.art-in-motion-section .particles-container');
    
    const generate = (container, count) => {
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 20;
            const duration = Math.random() * 20 + 10;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `-${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            container.appendChild(particle);
        }
    };

    generate(heroContainer, 150); // High density for hero
    generate(aboutContainer, 40); // Medium density for about
    generate(motionContainer, 60); // Cinematic density for motion
}

window.addEventListener('load', createParticles);

// Navbar Scroll State
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- MOBILE MENU TOGGLE ---
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.menu-close');
const body = document.body;

function toggleMenu(state) {
    if (!mobileMenu) return;
    const isActive = state !== undefined ? state : !mobileMenu.classList.contains('active');
    
    hamburger.classList.toggle('active', isActive);
    mobileMenu.classList.toggle('active', isActive);
    
    if (isActive) {
        body.style.overflow = 'hidden';
        lenis.stop();
    } else {
        body.style.overflow = '';
        lenis.start();
    }
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => toggleMenu());
    if (menuClose) {
        menuClose.addEventListener('click', () => toggleMenu(false));
    }
}

// Global Smooth Scroll & Mobile Menu Closer
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        // If it's a mobile link, close the menu first
        if (this.closest('.mobile-menu')) {
            toggleMenu(false);
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Wait for the next tick to ensure lenis.start() has fired
            requestAnimationFrame(() => {
                lenis.scrollTo(targetElement, {
                    offset: -20,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            });
        }
    });
});

// --- VIDEO PLAYER LOGIC ---
const video = document.getElementById('studioVideo');
const videoContainer = document.querySelector('.video-player-container');
const playPauseBtn = document.querySelector('.play-pause');
const centerPlayBtn = document.querySelector('.center-play-btn');
const progress = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const volumeSlider = document.querySelector('.volume-slider');
const muteToggle = document.querySelector('.mute-toggle');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const loader = document.querySelector('.video-loader');

function togglePlay() {
    if (video.paused) {
        video.play();
        centerPlayBtn.style.opacity = '0';
        centerPlayBtn.style.pointerEvents = 'none';
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" class="icon-small"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    } else {
        video.pause();
        centerPlayBtn.style.opacity = '1';
        centerPlayBtn.style.pointerEvents = 'auto';
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" class="icon-small"><path d="M8 5v14l11-7z"/></svg>';
    }
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function handleVolume() {
    video.volume = volumeSlider.value;
    video.muted = video.volume === 0;
}

function toggleMute() {
    video.muted = !video.muted;
    volumeSlider.value = video.muted ? 0 : video.volume;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Event Listeners
if (video) {
    video.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(video.duration);
    });
    video.addEventListener('waiting', () => loader.style.opacity = '1');
    video.addEventListener('playing', () => loader.style.opacity = '0');

    playPauseBtn.addEventListener('click', togglePlay);
    centerPlayBtn.addEventListener('click', togglePlay);
    progress.addEventListener('click', scrub);
    volumeSlider.addEventListener('input', handleVolume);
    muteToggle.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Auto-hide controls when playing and not hovering
    let timeout;
    videoContainer.addEventListener('mousemove', () => {
        document.querySelector('.video-controls-overlay').style.opacity = '1';
        clearTimeout(timeout);
        if (!video.paused) {
            timeout = setTimeout(() => {
                document.querySelector('.video-controls-overlay').style.opacity = '0';
            }, 3000);
        }
    });
}

// --- ART IN MOTION SCROLL ANIMATIONS ---
gsap.from(".motion-heading", {
    scrollTrigger: {
        trigger: ".art-in-motion-section",
        start: "top 70%",
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

gsap.from(".motion-description p", {
    scrollTrigger: {
        trigger: ".art-in-motion-section",
        start: "top 60%",
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power3.out"
});

gsap.from(".video-player-container", {
    scrollTrigger: {
        trigger: ".art-in-motion-section",
        start: "top 50%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 1.8,
    ease: "expo.out"
});

// --- MASTERPIECES SLIDER INITIALIZATION ---
const masterpiecesSwiper = new Swiper('.masterpieces-slider', {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    loopedSlides: 3,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 1500,
    grabCursor: true,
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 80,
        }
    },
    navigation: {
        nextEl: '.masterpieces-slider .swiper-button-next',
        prevEl: '.masterpieces-slider .swiper-button-prev',
    },
});

// --- MASTERPIECES SCROLL ANIMATIONS ---
gsap.from(".section-title", {
    scrollTrigger: {
        trigger: ".masterpieces-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

gsap.from(".collage-item", {
    scrollTrigger: {
        trigger: ".masterpieces-bottom",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power3.out"
});

gsap.from(".editorial-card", {
    scrollTrigger: {
        trigger: ".masterpieces-bottom",
        start: "top 70%",
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});


// --- INK MASTERS ANIMATIONS (CLEAN) ---
gsap.from(".masters-header > *", {
    scrollTrigger: {
        trigger: ".ink-masters-section",
        start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from(".artist-card", {
    scrollTrigger: {
        trigger: ".masters-grid",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power2.out"
});


// --- INSTAGRAM GRID ANIMATIONS ---
gsap.from(".instagram-slider", {
    scrollTrigger: {
        trigger: ".instagram-section",
        start: "top 70%",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".insta-header > *", {
    scrollTrigger: {
        trigger: ".instagram-section",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
});

// --- INSTAGRAM SWIPER INITIALIZATION ---
const instagramSwiper = new Swiper('.instagram-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    loopedSlides: 8,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    pagination: {
        el: '.insta-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.insta-next',
        prevEl: '.insta-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1400: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1800: {
            slidesPerView: 6,
            spaceBetween: 30,
        }
    }
});

// --- INSTAGRAM VIDEO CONTROLS ---
document.querySelector('.instagram-slider').addEventListener('click', (e) => {
    const playBtn = e.target.closest('.insta-play-btn');
    const instaItem = e.target.closest('.insta-item');
    const muteBtn = e.target.closest('.insta-mute-btn');
    
    if (muteBtn) {
        const video = instaItem.querySelector('.insta-video');
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? 
            '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z"/></svg>' : 
            '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
        return;
    }

    if (instaItem) {
        const video = instaItem.querySelector('.insta-video');
        const btn = instaItem.querySelector('.insta-play-btn');
        
        if (video.paused) {
            // Pause all other videos in the slider first
            document.querySelectorAll('.insta-video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    const otherBtn = v.closest('.insta-item').querySelector('.insta-play-btn');
                    if (otherBtn) {
                        otherBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                        otherBtn.style.opacity = '1';
                    }
                }
            });

            video.play();
            if (btn) {
                btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                btn.style.opacity = '0';
            }
        } else {
            video.pause();
            if (btn) {
                btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                btn.style.opacity = '1';
            }
        }
    }
});

// Progress Tracking
document.querySelectorAll('.insta-item').forEach(item => {
    const video = item.querySelector('.insta-video');
    const progressBar = item.querySelector('.insta-progress-bar');

    video.addEventListener('timeupdate', () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percentage}%`;
    });

    // Ensure button is visible if video ends
    video.addEventListener('ended', () => {
        const btn = item.querySelector('.insta-play-btn');
        if (btn) {
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
            btn.style.opacity = '1';
        }
    });
});

// --- CONTACT & FOOTER LOGIC ---
function initContactAnimations() {
    gsap.from('.contact-left', {
        opacity: 0,
        x: -50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-container',
            start: "top 70%"
        }
    });

    gsap.from('.contact-right', {
        opacity: 0,
        x: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-container',
            start: "top 70%"
        }
    });

    gsap.fromTo('.footer-logo, .footer-nav a, .footer-right', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.main-footer',
                start: "top 95%",
                toggleActions: "play none none none"
            }
        }
    );

    // Pulse rings animation
    gsap.to('.ring', {
        scale: 1.1,
        opacity: 0.3,
        duration: 3,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// --- CONTACT FORM WHATSAPP REDIRECT ---
function initContactForm() {
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const subject = document.getElementById('userSubject').value;
            const message = document.getElementById('userMessage').value;
            
            const whatsappNumber = '8337028023'; 
            const encodedMessage = encodeURIComponent(
                `*NEW INQUIRY: THE VINCI STUDIO*\n\n` +
                `*Full Name:* ${name}\n` +
                `*Email Address:* ${email}\n` +
                `*Subject:* ${subject}\n\n` +
                `*Message:* \n${message}`
            );
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Optional: reset form after redirect
            form.reset();
        });
    }
}

// Ensure all initializations are called
document.addEventListener('DOMContentLoaded', () => {
    initContactAnimations();
    initContactForm();
});

