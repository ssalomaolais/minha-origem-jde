document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initHeaderAndBackToTop();
    console.log("Página de apresentação do projeto 'Minha Origem JDE' carregada com interatividade.");
});

function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initHeaderAndBackToTop() {
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');
    if (!header || !backToTopButton) return;
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            backToTopButton.classList.add('visible');
        } else {
            header.classList.remove('header-scrolled');
            backToTopButton.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}