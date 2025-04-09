let score = 0;
let isGameRunning = false;
let timerId;
let currentTetromino;

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
function drawCanvas(selector) {
    const canvases = document.querySelectorAll(selector);
    canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 2]);
        drawGrid();
        
// ------------- ÜZENET MEGJELENÍTÉSE ------------------
        document.addEventListener("keydown", (e) => {
            if ((e.key == " " || e.code == "Space" || e.keyCode == "32") && !isGameRunning){
                isGameRunning = true;
                document.querySelector(".GameOverlay").style.display = "none";
                document.querySelector(".GameOverlay-Multi1").style.display = "none";
                document.querySelector(".GameOverlay-Multi2").style.display = "none";
                newTetromino();
                timerId = setInterval(gameLoop, 500)
            }

            if (isGameRunning && selector == ".Single canvas") {
                if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x - 1, currentTetromino.y)){
                        currentTetromino.x--;
                        draw();
                    }
                }
                else if (e.key == "ArrowRight" || e.key == "D" || e.key == "d"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x + 1, currentTetromino.y)){
                        currentTetromino.x++;
                        draw();
                    }
                }
                else if (e.key == "ArrowDown" || e.key == "S" || e.key == "s"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y + 1)){
                        currentTetromino.y++;
                        draw();
                    }
                }
                else if (e.key == "ArrowUp" || e.key == "W" || e.key == "w"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                        const tempShape = currentTetromino.shape;
                        currentTetromino.shape = rotateMatrix(tempShape)

                        if(collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                            currentTetromino.shape = tempShape;
                            draw();
                        }
                    }
                }
            }
            if (isGameRunning && selector == ".Multi canvas") {
                if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x - 1, currentTetromino.y)){
                        currentTetromino.x--;
                        draw();
                    }
                }
                else if (e.key == "ArrowRight" || e.key == "D" || e.key == "d"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x + 1, currentTetromino.y)){
                        currentTetromino.x++;
                        draw();
                    }
                }
                else if (e.key == "ArrowDown" || e.key == "S" || e.key == "s"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y + 1)){
                        currentTetromino.y++;
                        draw();
                    }
                }
                else if (e.key == "ArrowUp" || e.key == "W" || e.key == "w"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                        const tempShape = currentTetromino.shape;
                        currentTetromino.shape = rotateMatrix(tempShape)

                        if(collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                            currentTetromino.shape = tempShape;
                            draw();
                        }
                    }
                }
            }
            if (isGameRunning && selector == ".Single canvas") {
                if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x - 1, currentTetromino.y)){
                        currentTetromino.x--;
                        draw();
                    }
                }
                else if (e.key == "ArrowRight" || e.key == "D" || e.key == "d"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x + 1, currentTetromino.y)){
                        currentTetromino.x++;
                        draw();
                    }
                }
                else if (e.key == "ArrowDown" || e.key == "S" || e.key == "s"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y + 1)){
                        currentTetromino.y++;
                        draw();
                    }
                }
                else if (e.key == "ArrowUp" || e.key == "W" || e.key == "w"){
                    if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                        const tempShape = currentTetromino.shape;
                        currentTetromino.shape = rotateMatrix(tempShape)

                        if(collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)){
                            currentTetromino.shape = tempShape;
                            draw();
                        }
                    }
                }
            }
        })
        
        // ------------- RÁCS VONALAK ----------------
        function drawGrid() {
            ctx.strokeStyle = 'rgb(0, 0, 0, 0.7)';
            for (let i = 0; i < 19; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height / 20 + i * height / 20);
                ctx.lineTo(300, height / 20 + i * height / 20);
                ctx.stroke();
            }  
            for (let i = 0; i < 9; i++) {
                ctx.beginPath();
                ctx.moveTo(width / 10 + i * width / 10, 0);
                ctx.lineTo(width / 10 + i * width / 10, 600);
                ctx.stroke();
            }   
        }
        
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
                [1, 1, 0], 
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
        
        function gameLoop(){
            if (!isGameRunning) return;
            
            if (!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y + 1)){
                currentTetromino.y++;
            }
            else {
                mergeTetromino();
                newTetromino();

                if (collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y)) {
                    clearInterval(timerId);
                    isGameRunning = false;
                    document.querySelector(".Loser").style.opacity = "1";
                }
            }
            draw();
        }
        
        function drawSquare(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * grid, y * grid, grid, grid);
            ctx.strokeStyle = "#333";
            ctx.strokeRect(x * grid, y * grid, grid, grid);
        }

        function draw() {
            if (isGameRunning) {
                drawBoard();
                drawTetromino(currentTetromino.shape, currentTetromino.x, currentTetromino.y);
            }
        }

        function drawBoard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < rows; y++){
                for (let x = 0; x < columns; x++){
                    if (board[y][x]){
                        drawSquare(x, y, board[y][x]);
                    }
                }
            }
            drawGrid();
        }

        function drawTetromino(tetromino, offSetX, offSetY){
            tetromino.forEach((row, y) => {
                console.log(row);
                row.forEach((value, x) => {
                    if (value) {
                        drawSquare(x + offSetX, y + offSetY, colors[currentTetromino.type]);
                    }
                })
            })
        }

        function rotateMatrix(matrix) {
            return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
        }

        function collisionDetection(tetromino, offSetX, offSetY) {
            return tetromino.some((row, y) => {
                return row.some((value, x) => {
                    if (value) {
                        const newX = x + offSetX;
                        const newY = y + offSetY;
                        return(newX < 0 || newX >= columns || newY >= rows || board[newY][newX])
                    }
                    return false;
                })
            })
        }

        function mergeTetromino() {
            console.log("Block merged!");
            currentTetromino.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value){
                        board[y + currentTetromino.y][x + currentTetromino.x] = colors[currentTetromino.type]
                    }
                })
            }) 
            checkLines();
        }

        function checkLines() {
            for (let y = rows - 1; y >= 0; y--){
                if (board[y].every((cell) =>cell)){
                    board.splice(y, 1);
                    board.unshift(Array(columns).fill(0));
                    score += 100;
                    updateScore();
                }
            }
        }

        function updateScore() {
            document.getElementById("scoreSingle").textContent = score;
        }
    })
}


