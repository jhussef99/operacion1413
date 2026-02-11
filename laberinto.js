// ===== LABERINTO ANGELO ❤️ DANIELY =====

function iniciarLaberinto() {

    const container = document.createElement("div");
    container.id = "laberintoContainer";
    container.style.textAlign = "center";
    container.style.fontFamily = "'Press Start 2P', cursive";
    container.style.color = "white";
    container.style.paddingTop = "40px";

    container.innerHTML = `
        <h2>🏡 Encuentra nuestro hogar 🏡</h2>
        <canvas id="mazeCanvas" width="280" height="280" style="background:#111;border-radius:15px;"></canvas>

        <div style="margin-top:20px;">
            <button onclick="mover('up')">⬆️</button><br>
            <button onclick="mover('left')">⬅️</button>
            <button onclick="mover('down')">⬇️</button>
            <button onclick="mover('right')">➡️</button>
        </div>

        <p id="mensajeMaze" style="margin-top:20px;"></p>
    `;

    document.body.innerHTML = "";
    document.body.style.background = "linear-gradient(180deg,#1e0033,#000)";
    document.body.appendChild(container);

    // 🎵 Música misión
    const missionMusic = new Audio("musica_mision.mp3");
    missionMusic.loop = true;
    missionMusic.volume = 0.6;
    missionMusic.play();

    const canvas = document.getElementById("mazeCanvas");
    const ctx = canvas.getContext("2d");

    const tileSize = 40;

    const maze = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
        [1,0,1,0,1,0,1],
        [1,0,0,0,1,0,1],
        [1,1,1,0,0,0,1],
        [1,1,1,1,1,1,1]
    ];

    let player = { x:1, y:1 };
    const goal = { x:5, y:5 };

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for(let y=0;y<maze.length;y++){
            for(let x=0;x<maze[y].length;x++){
                if(maze[y][x] === 1){
                    ctx.fillStyle = "#333";
                    ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
                }
            }
        }

        ctx.font = "28px Arial";

        // Jugadores 👫🏻
        ctx.fillText("👫🏻", player.x*tileSize+4, player.y*tileSize+32);

        // Meta 🏡
        ctx.fillText("🏡", goal.x*tileSize+4, goal.y*tileSize+32);
    }

    window.mover = function(direction){
        let newX = player.x;
        let newY = player.y;

        if(direction === "up") newY--;
        if(direction === "down") newY++;
        if(direction === "left") newX--;
        if(direction === "right") newX++;

        if(maze[newY][newX] === 1){
            if(navigator.vibrate) navigator.vibrate(150);
            document.getElementById("mensajeMaze").innerText =
                "Hmm… por ahí no es nuestro camino 😏";
            player.x = 1;
            player.y = 1;

            setTimeout(()=>{
                document.getElementById("mensajeMaze").innerText="";
            },1000);

        } else {
            player.x = newX;
            player.y = newY;

            if(player.x === goal.x && player.y === goal.y){
                ganar();
            }
        }

        draw();
    }

    // 🎮 Teclado
    document.addEventListener("keydown", function(e){
        if(e.key === "ArrowUp") mover("up");
        if(e.key === "ArrowDown") mover("down");
        if(e.key === "ArrowLeft") mover("left");
        if(e.key === "ArrowRight") mover("right");
    });

    function ganar(){

        missionMusic.pause();

        document.getElementById("mensajeMaze").innerHTML = `
            💖 Lo lograste 💖<br><br>
            No importa cuántas vueltas dé el mundo...<br>
            siempre terminamos en casa 🏡♾️
        `;

        canvas.style.boxShadow = "0 0 40px #ff2e9f";

        // 🎆 Confetti simple
        for(let i=0;i<30;i++){
            let part = document.createElement("div");
            part.innerHTML = "💖";
            part.style.position = "fixed";
            part.style.left = Math.random()*100+"%";
            part.style.top = "-20px";
            part.style.fontSize = "20px";
            part.style.animation = "caer 3s linear forwards";
            document.body.appendChild(part);

            setTimeout(()=>part.remove(),3000);
        }
    }

    // Animación caída
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes caer {
            to { transform: translateY(110vh); opacity:0; }
        }
    `;
    document.head.appendChild(style);

    draw();
}
