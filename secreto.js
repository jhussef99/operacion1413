// ===========================
// COFRE SECRETO (SE ACTIVA DESDE explosionAmor)
// ===========================

function activarCofreSecreto() {

    const cofre = document.createElement("div");
    cofre.id = "cofreSecreto";
    cofre.innerHTML = "🎁";
    document.body.appendChild(cofre);

    setTimeout(() => {
        cofre.classList.add("mostrar");
    }, 100);

    sonarMagico();

    setTimeout(() => {
        cofre.classList.add("abrir");
    }, 1500);

    setTimeout(() => {
        abrirPantallaSecreta();
        cofre.remove();
    }, 2500);
}


// ===========================
// SONIDO MÁGICO
// ===========================

function sonarMagico() {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.6);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.6);
}

// ===========================
// CAMBIO DE PANTALLA
// ===========================

function abrirPantallaSecreta() {

    document.querySelectorAll(".screen").forEach(s => 
        s.classList.remove("active")
    );

    document.getElementById("pantallaSecreta")
        .classList.add("active");

    iniciarScratch();
    iniciarMusicaSecreta();
}

// ===========================
// SCRATCH INTERACTIVO
// ===========================

function iniciarScratch() {

    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "collage-pixel.jpg";

    const baseImg = document.querySelector(".imagen-base");

    canvas.width = baseImg.clientWidth;
    canvas.height = baseImg.clientHeight;

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    let dibujando = false;

    function raspar(x, y) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    // PC
    canvas.addEventListener("mousedown", () => dibujando = true);
    canvas.addEventListener("mouseup", () => dibujando = false);

    canvas.addEventListener("mousemove", (e) => {
        if (!dibujando) return;
        const rect = canvas.getBoundingClientRect();
        raspar(e.clientX - rect.left, e.clientY - rect.top);
        verificarRevelado();
    });

    // MÓVIL
    canvas.addEventListener("touchstart", () => dibujando = true);
    canvas.addEventListener("touchend", () => dibujando = false);

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        raspar(touch.clientX - rect.left, touch.clientY - rect.top);
        verificarRevelado();
    }, { passive: false });

    function verificarRevelado() {

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentes = 0;

        for (let i = 3; i < pixels.data.length; i += 4) {
            if (pixels.data[i] === 0) transparentes++;
        }

        const porcentaje = transparentes / (canvas.width * canvas.height);

        if (porcentaje > 0.6) {

    document.getElementById("instruccionRaspa").style.display = "none";

    mostrarMensajeFinal();
}
    }
}

// ===========================
// MENSAJE FINAL + CORAZONES
// ===========================

function mostrarMensajeFinal() {

    const mensaje = document.getElementById("mensajeFinal");
    mensaje.classList.add("visible");

    let cantidad = 0;

    const intervalo = setInterval(() => {

        const corazon = document.createElement("div");
        corazon.className = "corazon";
        corazon.innerHTML = "💖";
        corazon.style.left = Math.random() * window.innerWidth + "px";
        corazon.style.bottom = "0px";

        document.body.appendChild(corazon);

        setTimeout(() => corazon.remove(), 4000);

        cantidad++;

        if (cantidad > 25) {
            clearInterval(intervalo);
        }

    }, 200);
}

// ===========================
// MÚSICA SECRETA
// ===========================

function iniciarMusicaSecreta() {

    const musicaAnterior = document.getElementById("missionMusic");
    if (musicaAnterior) musicaAnterior.pause();

    const audio = new Audio("musica_secreta.mp3");
    audio.loop = true;
    audio.play();
}
