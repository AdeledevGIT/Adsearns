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

    // Add click event listener to banner card
    const bannerCard = document.querySelector('.banner-card');
    if (bannerCard) {
        bannerCard.addEventListener('click', function() {
            console.log('ShowBanner ads clicked');
            // Add your banner logic here
        });
    }

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

    console.log('ADSEARNS Dashboard loaded successfully!');
});
