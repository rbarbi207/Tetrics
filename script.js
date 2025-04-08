// ---------------- EFFEKT ELTÜNTETÉS ----------------
function hideChoice() {
    let choiceDiv = document.querySelector(".Choice");
    let blurDiv = document.querySelector(".Blur");
    choiceDiv.classList.add("hidden");
    blurDiv.classList.add("hidden");
    setTimeout(() => {
        choiceDiv.style.display = "none";
    }, 500);
}

// ---------------- EGYJÁTÉKOS TETRIS -------------------------
function startSingle() {
    hideChoice();
    document.querySelector(".Single").style.display = "block";
    
    setTimeout(() => {
        document.querySelector('.Single').classList.add('active');
    }, 100);
    
    drawCanvas(".Single canvas");
}

//----------------- KÉTJÁTÉKOS TETRIS ----------------------------
function startMulti() {
    hideChoice();
    document.querySelector(".Multi").style.display = "flex";
    
    setTimeout(() => {
        document.querySelector('.Position1').classList.add('active');
        document.querySelector('.Position2').classList.add('active');
    }, 100);
    
    drawCanvas(".Multi canvas");
}

//-------------- CANVAS RAJZOLÁS ----------------------------
let isGameRunning = false;

function drawCanvas(selector) {
    const canvases = document.querySelectorAll(selector);
    canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 2]);
        
// ------------- RÁCS VONALAK ----------------
        for (let i = 0; i < 19; i++) {
            ctx.beginPath();
            ctx.moveTo(0, height/20 + i * height/20);
            ctx.lineTo(300, height/20 + i * height/20);
            ctx.stroke();
        }  
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.moveTo(width/10 + i * width/10, 0);
            ctx.lineTo(width/10 + i * width/10, 600);
            ctx.stroke();
        }   
        
// ------------- ÜZENET MEGJELENÍTÉSE ------------------
        

        document.addEventListener("keydown", (e) => {
            if ((e.key == " " || e.code == "Space" || e.keyCode == "32") && !isGameRunning){
                isGameRunning = true;
                document.querySelector(".GameOverlay").style.display = "none";
                document.querySelector(".GameOverlay-Multi1").style.display = "none";
                document.querySelector(".GameOverlay-Multi2").style.display = "none";
                newTetromino();

                drawTetromino(currentTetromino.shape, currentTetromino.x, currentTetromino.y);
            }
        })

        let score = 0;

        
//------------------ TETRIS BLOKKOK -------------------
        const tetrominoes = {
            I: [
                [1, 1, 1, 1]
            ],
            J: [
                [0, 0, 1],
                [1, 1, 1]
            ],
            L: [
                [1, 0, 0], 
                [1, 1, 1]
            ],
            O: [
                [1, 1], 
                [1, 1]
            ],
            S: [
                [0, 1, 1], 
                [1, 1, 0]
            ],
            T: [
                [0, 1, 0],
                [1, 1, 1]
            ],
            Z: [
                [1, 1, 1], 
                [0, 1, 1]
            ]
        };
        
        const colors = {
            I : "blue",
            J : "pink",
            L : "orange",
            O : "yellow",
            S : "red",
            T : "purple",
            Z : "green",
        };

        const grid = 30;
        const rows = canvas.height/grid;
        const columns = canvas.width / grid;

        const board = Array.from({length:rows}, ()=>Array(columns).fill(0));
        
// -------------- GAME KEZDÉS ------------------
        let timerId;

        function newTetromino() {
            const types = Object.keys(tetrominoes);
            const type = types[Math.floor(Math.random() * types.length)];
            
            currentTetromino = {
                shape: tetrominoes[type],
                x: Math.floor(columns / 2) - Math.floor(tetrominoes[type][0].length / 2),
                y: 0,
                type, 
            };
        }

        function drawSquare(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * grid, y * grid, grid, grid);
            ctx.strokeStyle = "#333";
            ctx.strokeRect(x * grid, y * grid, grid, grid);
        }

        function drawTetromino(tetromino, offSetX, offSetY){
            tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        drawSquare(x + offSetX, y + offSetY, colors[tetromino[type]]);
                    }
                });
            });
        }
    });
}


