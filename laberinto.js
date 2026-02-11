// ===== LABERINTO ANGELO ❤️ DANIELY =====

function iniciarLaberinto() {

    const container = document.createElement("div");
    container.id = "laberintoContainer";
    container.innerHTML = `
        <h2>💘 Llega al corazón 💘</h2>
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

        // Angelo 🧑🏻
        ctx.font = "30px Arial";
        ctx.fillText("🧑🏻", player.x*tileSize+5, player.y*tileSize+32);

        // Daniely ❤️
        ctx.fillText("❤️", goal.x*tileSize+5, goal.y*tileSize+32);
    }

    window.mover = function(direction){
        let newX = player.x;
        let newY = player.y;

        if(direction === "up") newY--;
        if(direction === "down") newY++;
        if(direction === "left") newX--;
        if(direction === "right") newX++;

        if(maze[newY][newX] === 1){
            navigator.vibrate(200);
            document.getElementById("mensajeMaze").innerText =
                "Ey… así no llegas a mi corazón 😏";
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
        document.getElementById("mensajeMaze").innerHTML = `
            💖 Lo lograste 💖<br><br>
            No importa cuántas vueltas dé el mundo...<br>
            siempre termino contigo ♾️
        `;
        canvas.style.boxShadow = "0 0 25px pink";
    }

    draw();
}
