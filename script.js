document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    // Set initial state
    let currentIndex = 0;
    let autoPlayInterval;
    const slideWidth = carousel.clientWidth;
    
    // Initialize carousel
    initializeCarousel();
    
    // Functions
    function initializeCarousel() {
        // Set slide width based on carousel width
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        
        // Create indicators
        createIndicators();
        
        // Set up event listeners
        setUpEventListeners();
        
        // Start autoplay
        startAutoPlay();
        
        // Set initial position
        moveToSlide(currentIndex);
    }
    
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.dataset.index = index;
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    function setUpEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', moveToPrevSlide);
        nextBtn.addEventListener('click', moveToNextSlide);
        
        // Indicator clicks
        indicatorsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.dataset.index);
                moveToSlide(index);
            }
        });
        
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                moveToNextSlide();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                moveToPrevSlide();
            }
        }
    }
    
    function handleResize() {
        // Update slide width on window resize
        const newSlideWidth = carousel.clientWidth;
        slides.forEach(slide => {
            slide.style.width = `${newSlideWidth}px`;
        });
        
        // Update position
        moveToSlide(currentIndex);
    }
    
    function moveToSlide(index) {
        // Update current index
        currentIndex = index;
        
        // Ensure index is within bounds
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        // Move track to position
        track.style.transform = `translateX(-${currentIndex * carousel.clientWidth}px)`;
        
        // Update indicators
        updateIndicators();
    }
    
    function moveToPrevSlide() {
        moveToSlide(currentIndex - 1);
    }
    
    function moveToNextSlide() {
        moveToSlide(currentIndex + 1);
    }
    
    function updateIndicators() {
        const indicators = Array.from(document.querySelectorAll('.indicator'));
        
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    function startAutoPlay() {
        // Auto-advance slides every 5 seconds
        stopAutoPlay(); // Clear any existing interval
        autoPlayInterval = setInterval(() => {
            moveToNextSlide();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
}); 