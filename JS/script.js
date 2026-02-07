document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HIGHLIGHT ACTIVE PAGE NAV
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    
    document.querySelectorAll('nav a').forEach(link => {
        if(link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });

    // 2. SCROLL ANIMATION (Zoom Effect)
    // We now target the .carousel-wrapper instead of .feature-img
    const wrappers = document.querySelectorAll('.carousel-wrapper');
    
    if (wrappers.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', 
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-view');
                } else {
                    entry.target.classList.remove('active-view');
                }
            });
        }, observerOptions);

        wrappers.forEach(wrap => observer.observe(wrap));
    }

    // 3. IMAGE ROTATION CAROUSEL (5 Second Timer)
    // Select all carousel wrappers
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        let currentIndex = 0;

        // Only start timer if there is more than 1 image
        if (images.length > 1) {
            setInterval(() => {
                // 1. Remove active class from current image
                images[currentIndex].classList.remove('active');
                
                // 2. Calculate next index (loop back to 0 if at end)
                currentIndex = (currentIndex + 1) % images.length;
                
                // 3. Add active class to new image
                images[currentIndex].classList.add('active');
            }, 5000); // 5000ms = 5 Seconds
        }
    });
});