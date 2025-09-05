// ADSEARNS Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Add click event listeners to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('.action-label').textContent;
            console.log(`Action clicked: ${action}`);
            // Add your action logic here
        });
    });

    // Add click event listeners to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navAction = this.querySelector('.nav-label').textContent;
            console.log(`Navigation clicked: ${navAction}`);
            // Add your navigation logic here
        });
    });

    // Add click event listener to switch button
    const switchBtn = document.querySelector('.switch-btn');
    if (switchBtn) {
        switchBtn.addEventListener('click', function() {
            console.log('Switch to advertise clicked');
            // Add your switch logic here
        });
    }

    // Add click event listeners to side features
    const sideFeatures = document.querySelectorAll('.side-feature');
    sideFeatures.forEach(feature => {
        feature.addEventListener('click', function() {
            const featureName = this.querySelector('.feature-label').textContent;
            console.log(`Feature clicked: ${featureName}`);
            // Add your feature logic here
        });
    });

    // Add click event listeners to banner cards
    const bannerCards = document.querySelectorAll('.banner-card');
    bannerCards.forEach((card, idx) => {
        card.addEventListener('click', function() {
            console.log(`ShowBanner ads ${idx + 1} clicked`);
            // Add your banner logic here
        });
    });

    // Add click event listener to balance card
    const balanceCard = document.querySelector('.balance-card');
    if (balanceCard) {
        balanceCard.addEventListener('click', function() {
            console.log('Balance card clicked');
            // Add your balance logic here
        });
    }

    // Optional: Add loading animation
    function showLoading() {
        const container = document.querySelector('.container');
        container.style.opacity = '0.8';
        // Add your loading logic here
    }

    function hideLoading() {
        const container = document.querySelector('.container');
        container.style.opacity = '1';
        // Remove loading state
    }

    // Optional: Add smooth scrolling for better UX
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Optional: Add touch feedback for mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.action-btn, .nav-item, .side-feature, .banner-card, .balance-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Auto-rotating banner carousel (horizontal, overflow hidden)
    const carousel = document.querySelector('.banner-carousel');
    if (carousel) {
        const track = carousel.querySelector('.banner-track');
        const slides = carousel.querySelectorAll('.banner-card');
        let index = 0;

        function applySlideWidth() {
            const gap = 12; // must match CSS .banner-track gap
            const viewport = carousel.clientWidth;
            const totalGapFor3 = gap * 2;
            // If we can fit all three fully with gaps, do so
            if (viewport >= (3 * 300 + totalGapFor3)) {
                // Show all 3 fully (300px each default height baseline) – use equal thirds
                const slideWidth = (viewport - totalGapFor3) / 3;
                slides.forEach(s => s.style.setProperty('--slide-width', `${slideWidth}px`));
            } else {
                // Show peeking neighbors around a centered slide (~80% viewport)
                const slideWidth = Math.max(220, Math.min(0.8 * viewport, viewport - 60));
                slides.forEach(s => s.style.setProperty('--slide-width', `${slideWidth}px`));
            }
        }

        function updatePosition() {
            const slide = slides[0];
            const slideWidth = slide.getBoundingClientRect().width;
            const gap = 12; // must match CSS .banner-track gap
            const viewport = carousel.clientWidth;
            // Center the active slide so neighbors peek
            const offset = index * (slideWidth + gap);
            const centerShift = (viewport - slideWidth) / 2;
            track.style.transform = `translateX(${centerShift - offset}px)`;
        }

        const intervalMs = 3000; // 3 seconds
        const timer = setInterval(() => {
            index = (index + 1) % slides.length;
            updatePosition();
        }, intervalMs);

        window.addEventListener('resize', () => {
            applySlideWidth();
            updatePosition();
        });

        applySlideWidth();
        updatePosition();
    }

    // Align the small account number with the full name's vertical position
    function positionAccountNumber() {
        const card = document.querySelector('.balance-card');
        if (!card) return;
        const fullName = card.querySelector('.full-name');
        const acct = card.querySelector('.account-number');
        if (!fullName || !acct) return;
        // Make it really small and keep in one line
        acct.style.fontSize = '9px';
        acct.style.whiteSpace = 'nowrap';
        // Compute vertical alignment to match full name
        const cardRect = card.getBoundingClientRect();
        const fullNameRect = fullName.getBoundingClientRect();
        const acctRect = acct.getBoundingClientRect();
        const top = fullNameRect.top - cardRect.top + (fullNameRect.height - acctRect.height) / 2;
        acct.style.top = `${Math.max(0, Math.round(top))}px`;
    }

    positionAccountNumber();
    window.addEventListener('resize', positionAccountNumber);
    window.addEventListener('load', positionAccountNumber);

    console.log('ADSEARNS Dashboard loaded successfully!');
});
