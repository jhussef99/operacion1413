// ===== LABERINTO ANGELO ❤️ DANIELY =====

function iniciarLaberinto() {

    const container = document.createElement("div");
    container.id = "laberintoContainer";
    container.innerHTML = `
        <h2>🏠 Guía a Daniely hasta nuestro hogar 🏠</h2>
        <canvas id="mazeCanvas" width="280" height="280"></canvas>
        <div style="margin-top:15px;">
            <button onclick="mover('up')">⬆️</button><br>
            <button onclick="mover('left')">⬅️</button>
            <button onclick="mover('down')">⬇️</button>
            <button onclick="mover('right')">➡️</button>
        </div>
        <p id="mensajeMaze"></p>
    `;

    document.body.innerHTML = "";
    document.body.appendChild(container);

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
                    ctx.fillStyle = "#444";
                    ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
                }
            }
        }

        // Daniely 👫🏻
        ctx.font = "30px Arial";
        ctx.fillText("👫🏻", player.x*tileSize+5, player.y*tileSize+32);

        // Casa 🏡
        ctx.fillText("🏡", goal.x*tileSize+5, goal.y*tileSize+32);
    }

    window.mover = function(direction){
        let newX = player.x;
        let newY = player.y;

        if(direction === "up") newY--;
        if(direction === "down") newY++;
        if(direction === "left") newX--;
        if(direction === "right") newX++;

        if(maze[newY][newX] === 1){
            navigator.vibrate?.(200);
            document.getElementById("mensajeMaze").innerText =
                "Ey… ese no es el camino a casa 😏";
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

    function ganar(){
        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                background:linear-gradient(180deg,#ff8ecf,#b784f7);
                color:white;
                text-align:center;
                font-family:'Press Start 2P', cursive;
                padding:30px;
                animation:fadeIn 1.5s ease;
            ">
                <div style="font-size:70px; animation:pop 1s infinite alternate;">
                    🏡💖
                </div>

                <p style="margin-top:40px; font-size:12px; line-height:1.8;">
                    Lo logramos...<br><br>
                    No importa cuántos caminos haya,<br>
                    siempre terminamos en el mismo lugar.<br><br>
                    Juntos. ♾️💘
                </p>

                <div style="margin-top:40px; font-size:40px;">
                    ✨ THE END ✨
                </div>
            </div>

            <style>
                @keyframes fadeIn{
                    from{opacity:0;}
                    to{opacity:1;}
                }
                @keyframes pop{
                    from{transform:scale(1);}
                    to{transform:scale(1.2);}
                }
            </style>
        `;
    }

    draw();
}
