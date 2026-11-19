document.addEventListener("DOMContentLoaded", () => {
    const WHATSAPP_NUMBER = "554999227869"; // +55 49 9922-7869

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
    const SLIDE_DURATION = 5000;
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

    // 4. Formulaire Fonctionnel -> Redirection directe vers WhatsApp
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const userWhatsapp = document.getElementById("whatsapp").value.trim();
        const selectedCourse = document.getElementById("selectedCourse").value;
        const message = document.getElementById("message").value.trim();

        const whatsappText = 
`Bonjour *Horizons Brésil (AeroClick Travel)*, je souhaite garantir ma place pour étudier à Chapecó.

*Nom complet :* ${fullName}
*E-mail :* ${email}
*Mon WhatsApp :* ${userWhatsapp}
*Domaine souhaité :* ${selectedCourse}
*Message / Cours précis :* ${message || "Je souhaite recevoir les informations complètes d'inscription."}`;

        const encodedMessage = encodeURIComponent(whatsappText);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        formFeedback.textContent = "Redirection vers WhatsApp en cours pour transmettre votre dossier...";
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
});