// Espera a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a los elementos del DOM ---
    const bigHeart = document.getElementById('big-heart');
    const clickCountSpan = document.getElementById('click-count');
    const clickSection = document.getElementById('click-section');
    const finalReveal = document.getElementById('final-reveal'); // Nuevo mensaje
    const loveMessage = document.getElementById('love-message');
    const kidsSection = document.getElementById('kids-section');
    const girlNameInput = document.getElementById('girl-name-input');
    const girlNameBtn = document.getElementById('girl-name-btn');
    const girlNameMessage = document.getElementById('girl-name-message');
    const rainContainer = document.getElementById('rain-container');

    // --- Variables del contador ---
    let clickCount = 0;
    const clicksToReveal = 137;

    // --- Lluvia de Corazones y "Te amo" (sin cambios) ---
    function createFallingElement() {
        const element = document.createElement('span');
        element.classList.add('falling-element');
        if (Math.random() > 0.3) {
            element.innerHTML = '💖';
            element.style.fontSize = (Math.random() * 15 + 15) + 'px';
        } else {
            element.innerHTML = 'Te amo';
            element.style.fontSize = (Math.random() * 10 + 12) + 'px';
            element.style.fontFamily = "'Dancing Script', cursive";
            element.style.color = '#d81b60';
            element.style.fontWeight = 'bold';
        }
        element.style.left = Math.random() * 100 + 'vw';
        const duration = (Math.random() * 5) + 5;
        element.style.animationDuration = duration + 's';
        element.style.opacity = Math.random() * 0.5 + 0.3;
        rainContainer.appendChild(element);
        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }
    setInterval(createFallingElement, 300);

    // --- (NUEVO) Función para crear partículas en el clic ---
    function createClickParticle(e) {
        // 'e' es el objeto del evento de clic
        const particle = document.createElement('span');
        particle.innerHTML = '💖'; // O '❤️'
        particle.classList.add('click-particle');
        
        // Posiciona la partícula donde el usuario hizo clic
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;

        document.body.appendChild(particle);

        // Se autodestruye después de la animación (0.8s en CSS)
        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    // --- Lógica del Contador de Clics (Mejorada) ---
    bigHeart.addEventListener('click', (e) => { // 'e' es el evento de clic
        // Solo cuenta si no hemos llegado al límite
        if (clickCount < clicksToReveal) {
            clickCount++;
            clickCountSpan.textContent = clickCount;

            // --- Efecto en cada clic ---
            // 1. Partículas de corazón
            createClickParticle(e);

            // 2. Efecto "pop" mejorado en el número
            clickCountSpan.style.transform = 'scale(1.4)'; // Más grande
            clickCountSpan.style.color = '#d81b60';
            setTimeout(() => {
                clickCountSpan.style.transform = 'scale(1)';
                clickCountSpan.style.color = '#e91e63'; // Vuelve al color
            }, 150); // 150ms

            // ¡El gran momento!
            if (clickCount === clicksToReveal) {
                revealSecret();
            }
        }
    });

    // --- (NUEVO) Función para Revelar el Secreto (Actualizada) ---
    function revealSecret() {
        // 1. Ocultar la sección del corazón y el contador
        clickSection.style.transition = 'opacity 0.5s ease-out';
        clickSection.style.opacity = '0';
        setTimeout(() => {
            clickSection.style.display = 'none';
        }, 500);

        // 2. MOSTRAR EL MENSAJE GIGANTE "CULOROSA"
        setTimeout(() => {
            finalReveal.classList.remove('hidden');
            finalReveal.classList.add('zoom-in'); // Activa la animación de entrada
        }, 500); // Aparece justo después de que el contador se oculta

        // 3. Esperar 3 segundos, luego ocultar el mensaje gigante
        setTimeout(() => {
            finalReveal.classList.remove('zoom-in');
            finalReveal.classList.add('fade-out'); // Activa la animación de salida

            // 4. Esperar a que termine el fade-out (1s en CSS)
            setTimeout(() => {
                finalReveal.style.display = 'none'; // Oculta el mensaje gigante

                // 5. Mostrar el contenido final (el mensaje de amor y los hijos)
                loveMessage.classList.remove('hidden');
                kidsSection.classList.remove('hidden');
                triggerHeartExplosion(); // La explosión de corazones original
            }, 1000); // 1000ms (1s)

        }, 3500); // 3000ms (3s) para leer el mensaje + 500ms de espera
    }

    // --- Función de la Broma del Nombre (sin cambios) ---
    function showNameMessage() {
        girlNameMessage.textContent = 'NO BEBE, LAUTY ELIGE LOS NOMBRES OK?';
        girlNameInput.value = '';
        girlNameMessage.style.transition = 'transform 0.1s';
        let i = 0;
        const interval = setInterval(() => {
            girlNameMessage.style.transform = `translateX(${(i % 2 === 0 ? 5 : -5)}px)`;
            i++;
            if (i > 6) {
                clearInterval(interval);
                girlNameMessage.style.transform = 'none';
            }
        }, 50);
    }
    girlNameBtn.addEventListener('click', showNameMessage);
    girlNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            showNameMessage();
        }
    });

    // --- (Bonus) Explosión de Corazones (sin cambios) ---
    function triggerHeartExplosion() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.zIndex = '100';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.left = '50vw'; 
            heart.style.top = '25vh'; 
            heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 200 + 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            heart.style.transform = 'translate(-50%, -50%) scale(0)';
            heart.style.opacity = '1';
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
                heart.style.opacity = '0';
            }, 10);
            setTimeout(() => {
                heart.remove();
            }, 1010);
        }
    }
});
