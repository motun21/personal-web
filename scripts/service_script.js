var app = (function() {
    let pages = [];
    let links = [];

    document.addEventListener("DOMContentLoaded", function() {
        pages = document.querySelectorAll('[data-page]');
        links = document.querySelectorAll('[data-role="link"]');
        [].forEach.call(links, function(link) {
            link.addEventListener("click", navigate);
        });

        // Initialize sliding cards
        initializeSliders();

        // Initialize bouncing element in Experience section
        moveBounceElement();
    });

    function navigate(ev) {
        ev.preventDefault();
        let id = ev.currentTarget.href.split("#")[1];
        [].forEach.call(pages, function(page) {
            if (page.id === id) {
                page.classList.add('active');
                // Check if the active page is the Resume section
                if (page.id === 'Resume') {
                    activateIframe(true);
                } else {
                    activateIframe(false);
                }
            } else {
                page.classList.remove('active');
            }
        });
        return false;
    }

    function initializeSliders() {
        const sliders = document.querySelectorAll('.slider-container');

        sliders.forEach(slider => {
            let currentSlide = 0;
            const slides = slider.querySelectorAll('.slide');
            const leftArrow = slider.querySelector('.left-arrow');
            const rightArrow = slider.querySelector('.right-arrow');

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }

            showSlide(currentSlide);

            if (leftArrow && rightArrow) {
                leftArrow.addEventListener('click', prevSlide);
                rightArrow.addEventListener('click', nextSlide);
            }
        });
    }

    function activateIframe(isActive) {
        const iframeContainer = document.querySelector('#Resume .iframe-container iframe');
        if (iframeContainer) {
            iframeContainer.style.display = isActive ? 'block' : 'none';
        }
    }

    return {
        pages,
        links,
        xhr: ajax
    };
})();