document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Mobile Responsivo
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });

    // 2. Carrossel Hero Automático (5 segundos)
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const progressFill = document.getElementById("progressFill");
    const SLIDE_DURATION = 5000; // 5 segundos
    let currentSlide = 0;
    let slideInterval;

    function animateProgressBar() {
        progressFill.style.transition = "none";
        progressFill.style.width = "0%";
        setTimeout(() => {
            progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
            progressFill.style.width = "100%";
        }, 30);
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
        currentSlide = index;
        animateProgressBar();
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlider() {
        animateProgressBar();
        slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"), 10);
            showSlide(index);
            resetSlider();
        });
    });

    startSlider();

    // 3. Filtro de Categorias de Cursos
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseCards = document.querySelectorAll(".course-category-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            courseCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. Formulaire de Contact (Simulation pour site statique GitHub Pages)
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("fullName").value.trim();
        const course = document.getElementById("selectedCourse").value;

        formFeedback.textContent = `Merci ${name} ! Votre demande concernant le domaine "${course}" a bien été enregistrée. Notre équipe vous contactera très prochainement.`;
        contactForm.reset();
    });
});