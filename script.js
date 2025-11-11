// Espera a que todo el contenido de la página (HTML) se cargue
document.addEventListener('DOMContentLoaded', () => {

    // --- Selectores de Elementos ---
    const heart = document.getElementById('main-heart');
    const counterDisplay = document.getElementById('click-counter');
    const clickerSection = document.getElementById('clicker-section');
    const messageSection = document.getElementById('message-section');
    const namesSection = document.getElementById('names-section');
    
    const girlForm = document.getElementById('girls-form');
    const girlInput = document.getElementById('girl-name-input');
    const girlResult = document.getElementById('girl-name-result');
    
    const rainContainer = document.getElementById('heart-rain-container');

    // --- Estado Inicial ---
    let clickCount = 137;
    counterDisplay.textContent = clickCount;

    // --- Lógica de la Lluvia de Corazones ---
    function createHeartRain() {
        const heartEl = document.createElement('div');
        heartEl.classList.add('heart-rain');
        heartEl.innerHTML = '💖'; // Puedes cambiarlo por '❤' o '💕'
        
        // Posición horizontal aleatoria
        heartEl.style.left = `${Math.random() * 100}vw`;
        
        // Duración de caída aleatoria (entre 3 y 6 segundos)
        heartEl.style.animationDuration = `${Math.random() * 3 + 3}s`;
        
        // Opacidad aleatoria
        heartEl.style.opacity = Math.random() * 0.5 + 0.3; // Entre 0.3 y 0.8
        
        // Tamaño aleatorio
        heartEl.style.fontSize = `${Math.random() * 1 + 0.8}rem`; // Entre 0.8rem y 1.8rem

        rainContainer.appendChild(heartEl);

        // Limpia el corazón del DOM después de que termine la animación
        setTimeout(() => {
            heartEl.remove();
        }, 6000); // Un poco más que la duración máxima de la animación
    }

    // Crea un nuevo corazón cada 300ms
    setInterval(createHeartRain, 300);

    // --- Lógica del Contador de Clics ---
    heart.addEventListener('click', () => {
        if (clickCount > 0) {
            // Resta un clic
            clickCount--;
            counterDisplay.textContent = clickCount;

            // --- Efecto de clic en el corazón ---
            heart.classList.add('heart-clicked');
            
            // Crea una pequeña explosión de corazones al hacer clic
            createClickEffect(heart.getBoundingClientRect());

            // Quita la clase de animación después de un momento
            setTimeout(() => {
                heart.classList.remove('heart-clicked');
            }, 200);

            // --- ¡Se completó el contador! ---
            if (clickCount === 0) {
                triggerFinalEffect();
            }
        }
    });

    // Función para el efecto final
    function triggerFinalEffect() {
        // 1. Aplica el "Efecto" de desaparición a la sección del clicker
        clickerSection.classList.add('fadeOut');

        // 2. Espera a que termine la animación de fadeOut (0.5s)
        setTimeout(() => {
            // 3. Oculta la sección del clicker permanentemente
            clickerSection.style.display = 'none';

            // 4. Muestra las secciones ocultas (el CSS se encarga de la animación 'fadeIn')
            messageSection.style.display = 'block';
            namesSection.style.display = 'block';

            // Opcional: Intensificar la lluvia de corazones
            // (Podríamos llamar a createHeartRain() más rápido)
            
        }, 500); // 500ms = 0.5s (la duración de la animación fadeOut)
    }

    // --- Lógica del Formulario de Niñas ---
    girlForm.addEventListener('submit', (event) => {
        // Previene que la página se recargue al presionar "Enter"
        event.preventDefault(); 
        
        // Muestra el mensaje personalizado
        girlResult.textContent = 'NO BEBE, LAUTY ELIGE LOS NOMBRES OK?';
        
        // Añade la animación "shake"
        girlResult.classList.add('shake');

        // Limpia el input
        girlInput.value = '';

        // Quita la animación "shake" después de que termine
        setTimeout(() => {
            girlResult.classList.remove('shake');
        }, 500); // 500ms = 0.5s (duración de la animación)
    });

    // --- Función Extra: Explosión de corazones al hacer clic ---
    function createClickEffect(rect) {
        for (let i = 0; i < 10; i++) { // Lanza 10 corazones
            const miniHeart = document.createElement('div');
            miniHeart.innerHTML = '💕';
            miniHeart.style.position = 'absolute';
            // Posiciona los corazones en el centro del corazón grande
            miniHeart.style.left = `${rect.left + rect.width / 2}px`;
            miniHeart.style.top = `${rect.top + rect.height / 2}px`;
            miniHeart.style.zIndex = '100';
            miniHeart.style.pointerEvents = 'none';
            miniHeart.style.transition = 'all 0.5s ease-out';
            
            document.body.appendChild(miniHeart);

            // Movimiento aleatorio hacia afuera
            const x = (Math.random() - 0.5) * 200; // -100px a +100px
            const y = (Math.random() - 0.5) * 200; // -100px a +100px

            // Aplica la animación
            setTimeout(() => {
                miniHeart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                miniHeart.style.opacity = '0';
            }, 10);
            
            // Limpia el DOM
            setTimeout(() => {
                miniHeart.remove();
            }, 600);
        }
    }

});