document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CÓDIGO DEL CARRUSEL
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length > 0) {

        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {

            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[currentSlide].classList.add('active');

            if (dots.length > 0) {
                dots[currentSlide].classList.add('active');
            }
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startAutoPlay() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoPlay() {
            clearInterval(slideInterval);
            startAutoPlay();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                resetAutoPlay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoPlay();
            });
        });

        startAutoPlay();
    }



    // ==========================================
    // 2. GRID INTERACTIVA DEL FONDO
    // ==========================================
    const grid = document.querySelector(".grid-background");

    if (grid) {

        const cellSize = 30;
        let cells = [];

        function createGrid() {

            grid.innerHTML = "";
            cells = [];

            const rows = Math.ceil(window.innerHeight / cellSize);
            const cols = Math.ceil(window.innerWidth / cellSize);

            for (let i = 0; i < rows * cols; i++) {

                const cell = document.createElement("div");
                cell.classList.add("grid-cell");

                cell.addEventListener("mouseenter", () => {

                    cell.classList.add("active");

                    setTimeout(() => {
                        cell.classList.remove("active");
                    }, 600);

                });

                grid.appendChild(cell);
                cells.push(cell);
            }
        }

        function randomAnimation() {

            if (cells.length === 0) return;

            activateRandomCells("active", 10);
            activateRandomCells("active-2", 10);

        }

        function activateRandomCells(className, count) {

            const selectedCells = [];

            for (let i = 0; i < count; i++) {

                const cell = cells[Math.floor(Math.random() * cells.length)];

                cell.classList.add(className);
                selectedCells.push(cell);

            }

            setTimeout(() => {

                selectedCells.forEach(cell => {
                    cell.classList.remove(className);
                });

            }, 1300);

        }

        setInterval(randomAnimation, 200);

        window.addEventListener("resize", () => {
            createGrid();
        });

        createGrid();
    }


    document.addEventListener("mousemove", (e) => {

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${e.clientX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${e.clientY}px`
        );

    });

});


// ==========================================
    // 3. GALERÍA INTERACTIVA DE PROYECTOS
    // ==========================================
    
    // Aquí defines la información de todos tus proyectos
    const portfolioData = [
        {
            title: "Diagnóstico COVID-19: Ensamble en Subespacios",
            description: "Investigación y desarrollo de modelos de Machine Learning integrando datasets de metabolómica de múltiples estudios para mejorar la precisión diagnóstica. (Sometido a evaluación en revista científica).",
            tags: ["Machine Learning", "Ensemble Methods", "Python", "Metabolomics"],
            image: "assets/proyecto2.jpg", // ¡Cambia esta ruta por tu imagen real!
            link: "https://github.com/tu-usuario/repo-covid"
        },
        {
            title: "Data Extraction & Proxy Pipeline",
            description: "Sistema escalable y automatizado para la recolección de datos masivos. Implementa técnicas de web scraping avanzado, rotación dinámica de proxies y consumo de APIs RESTful.",
            tags: ["Web Scraping", "APIs", "Data Engineering", "Proxies"],
            image: "assets/proyecto3.jpg",
            link: "https://github.com/tu-usuario/repo-scraping"
        },
        {
            title: "Análisis de Datos con NumPy",
            description: "Desarrollo de material estructurado y visualizaciones interactivas enfocadas en enseñar las bases y aplicaciones avanzadas de manipulación de arrays para la ciencia de datos.",
            tags: ["NumPy", "Data Analysis", "Education", "Jupyter"],
            image: "assets/proyecto1.jpg",
            link: "https://github.com/tu-usuario/repo-numpy"
        },
        {
            title: "Dashboard Predictivo",
            description: "Desarrollo de material estructurado y visualizaciones interactivas enfocadas en enseñar las bases y aplicaciones avanzadas de manipulación de arrays para la ciencia de datos.",
            tags: ["NumPy", "Data Analysis", "Education", "Jupyter"],
            image: "assets/proyecto1.jpg",
            link: "https://github.com/tu-usuario/repo-numpy"
        }
    ];

    const featuredView = document.getElementById('featured-view');
    const featuredImg = document.getElementById('featured-img');
    const featuredTitle = document.getElementById('featured-title');
    const featuredDesc = document.getElementById('featured-desc');
    const featuredTags = document.getElementById('featured-tags');
    const featuredLink = document.getElementById('featured-link');
    const thumbnails = document.querySelectorAll('.thumb-card');
    
    if (featuredView && thumbnails.length > 0) {
        let currentProjectIndex = 0;
        let projectInterval;

        // Función para inyectar los datos en el HTML
        function updateFeaturedProject(index) {
            const project = portfolioData[index];
            
            // Efecto suave de desvanecimiento
            featuredView.classList.add('fade-out');
            
            setTimeout(() => {
                // Actualizar el contenido
                featuredImg.src = project.image;
                featuredTitle.textContent = project.title;
                featuredDesc.textContent = project.description;
                featuredLink.href = project.link;
                
                // Actualizar las etiquetas (tags)
                featuredTags.innerHTML = '';
                project.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    featuredTags.appendChild(span);
                });

                // Actualizar los bordes activos en las miniaturas de abajo
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnails[index].classList.add('active');

                // Regresar la opacidad
                featuredView.classList.remove('fade-out');
            }, 200); // 200ms de transición
        }

        // Función para cambiar automáticamente (AutoPlay)
        function nextProject() {
            currentProjectIndex = (currentProjectIndex + 1) % portfolioData.length;
            updateFeaturedProject(currentProjectIndex);
        }

        function startProjectAutoPlay() {
            projectInterval = setInterval(nextProject, 12000); // Cambia cada 6 segundos
        }

        function resetProjectAutoPlay() {
            clearInterval(projectInterval);
            startProjectAutoPlay();
        }

        // Evento Hover/Click en la cinta de abajo
        thumbnails.forEach((thumb) => {
            // Se activa al pasar el ratón (hover)
            thumb.addEventListener('mouseenter', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (index !== currentProjectIndex) {
                    currentProjectIndex = index;
                    updateFeaturedProject(currentProjectIndex);
                    resetProjectAutoPlay();
                }
            });
        });

        // Inicializar la galería con el primer proyecto
        updateFeaturedProject(0);
        startProjectAutoPlay();
        
        // Pausar si el usuario pone el ratón sobre la tarjeta grande para leer
        featuredView.addEventListener('mouseenter', () => clearInterval(projectInterval));
        featuredView.addEventListener('mouseleave', startProjectAutoPlay);
    }