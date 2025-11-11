// Espera a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a los elementos del DOM ---
    const bigHeart = document.getElementById('big-heart');
    const clickCountSpan = document.getElementById('click-count');
    const clickSection = document.getElementById('click-section');
    const loveMessage = document.getElementById('love-message');
    const kidsSection = document.getElementById('kids-section');
    const girlNameInput = document.getElementById('girl-name-input');
    const girlNameBtn = document.getElementById('girl-name-btn');
    const girlNameMessage = document.getElementById('girl-name-message');
    const rainContainer = document.getElementById('rain-container');

    // --- Variables del contador ---
    let clickCount = 0;
    const clicksToReveal = 137;

    // --- Lluvia de Corazones y "Te amo" ---
    function createFallingElement() {
        const element = document.createElement('span');
        element.classList.add('falling-element');

        // Elige aleatoriamente entre un corazón y "Te amo"
        if (Math.random() > 0.3) {
            element.innerHTML = '💖'; // Corazón rosa
            element.style.fontSize = (Math.random() * 15 + 15) + 'px'; // Tamaño aleatorio
        } else {
            element.innerHTML = 'Te amo';
            element.style.fontSize = (Math.random() * 10 + 12) + 'px'; // Tamaño aleatorio
            element.style.fontFamily = "'Dancing Script', cursive";
            element.style.color = '#d81b60';
            element.style.fontWeight = 'bold';
        }

        // Posición horizontal aleatoria
        element.style.left = Math.random() * 100 + 'vw';
        
        // Duración de caída aleatoria (entre 5 y 10 segundos)
        const duration = (Math.random() * 5) + 5;
        element.style.animationDuration = duration + 's';
        
        // Opacidad aleatoria
        element.style.opacity = Math.random() * 0.5 + 0.3; // Más sutil

        rainContainer.appendChild(element);

        // Elimina el elemento del DOM después de que termine la animación
        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }

    // Crea un nuevo elemento de lluvia cada 300ms
    setInterval(createFallingElement, 300);

    // --- Lógica del Contador de Clics ---
    bigHeart.addEventListener('click', () => {
        // Solo cuenta si no hemos llegado al límite
        if (clickCount < clicksToReveal) {
            clickCount++;
            clickCountSpan.textContent = clickCount;

            // Efecto de "pop" en el número
            clickCountSpan.style.transform = 'scale(1.3)';
            setTimeout(() => {
                clickCountSpan.style.transform = 'scale(1)';
            }, 100);

            // ¡El gran momento!
            if (clickCount === clicksToReveal) {
                revealSecret();
            }
        }
    });

    // --- Función para Revelar el Secreto ---
    function revealSecret() {
        // 1. Ocultar la sección del corazón y el contador con un fundido
        clickSection.style.transition = 'opacity 0.5s ease-out';
        clickSection.style.opacity = '0';
        
        // 2. Esperar a que termine el fundido para quitarlo y mostrar los mensajes
        setTimeout(() => {
            clickSection.style.display = 'none';
            
            // 3. Mostrar el mensaje de amor y la sección de hijos
            loveMessage.classList.remove('hidden');
            kidsSection.classList.remove('hidden');

            // 4. (Opcional) Hacer un pequeño "confeti" de corazones
            triggerHeartExplosion();

        }, 500); // 500ms (medio segundo)
    }

    // --- Función de la Broma del Nombre ---
    function showNameMessage() {
        girlNameMessage.textContent = 'NO BEBE, LAUTY ELIGE LOS NOMBRES OK?';
        girlNameInput.value = ''; // Limpia el campo

        // Efecto de "shake" o "vibración"
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

    // Escuchar tanto el clic en el botón como la tecla "Enter"
    girlNameBtn.addEventListener('click', showNameMessage);
    girlNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita que el formulario se envíe
            showNameMessage();
        }
    });

    // --- (Bonus) Explosión de Corazones al llegar a 137 ---
    function triggerHeartExplosion() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.zIndex = '100';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            // Posicionar la explosión donde estaba el corazón
            heart.style.left = '50vw'; 
            heart.style.top = '25vh'; 
            heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            
            // Calcular trayectoria
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 200 + 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            // Aplicar transformación inicial (para la animación)
            heart.style.transform = 'translate(-50%, -50%) scale(0)';
            heart.style.opacity = '1';

            document.body.appendChild(heart);
            
            // Animar hacia afuera
            setTimeout(() => {
                heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
                heart.style.opacity = '0';
            }, 10);

            // Limpiar del DOM
            setTimeout(() => {
                heart.remove();
            }, 1010); // 10ms + 1000ms de animación
        }
    }
});
