// ---------------- EGYJÁTÉKOS TETRIS -------------------------
function startSingle() {
    hideChoice();
    document.querySelector(".Single").style.display = "block";
    document.querySelector(".Single").style.opacity = 1;
    drawCanvas(".Single canvas");
}

//----------------- KÉTJÁTÉKOS TETRIS ----------------------------
function startMulti() {
    hideChoice();
    document.querySelector(".Multi").style.display = "block";
    document.querySelector(".Multi").style.opacity = 1;
    drawCanvas(".Multi canvas");
}

//-------------- CANVAS RAJZOLÁS ----------------------------
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
        /*const displayMessage = (param) => {
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.75;
            ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60)
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = "White";
            ctx.font = "36px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(param, canvas.width / 2, canvas.height / 2);
        }
        displayMessage("START GAME!")*/
        
//------------------ TETRIS BLOKKOK
        /*const tetrominoes = {
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
        }*/
        
// -------------- GAME KEZDÉS ------------------
        /*let isGameRunning = false;
        let timerId;
        let score = 0;
        
        window.addEventListener("keydown", (e) => {
            if ((e.key == " " || e.code == "Space" || e.keyCode == "32") && !isGameRunning){
                isGameRunning = true;
                newTetromino();
                ctx.clearRect(0, canvas.height / 2 -30, canvas.width, 60);
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                drawCanvas(selector)
            }
        });
        
        const grid = 30;
        const rows = canvas.height/grid;
        const columns = canvas.width / grid;
        
        function newTetromino() {
            const types = Object.keys(tetrominoes);
            const type = types[Math.floor(Math.random() * types.length)];
            
            currentTetromino = {
                shape: tetrominoes[type],
                x: Math.floor(columns / 2) - Math.floor(tetrominoes[type][0].length / 2),
                y: 0,
                type, 
            };
            
        }*/
    })
}


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
