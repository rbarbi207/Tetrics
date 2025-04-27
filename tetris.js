const clickSound = new Audio("sounds/game-over-arcade-6435.mp3");
clickSound.volume = 1; 

class Tetromino {
    constructor(type, shape, color) {
        this.type = type;
        this.shape = shape;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
    
    rotate() {
        const newShape = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
        this.shape = newShape;
    }
}

class TetrisGame {
    constructor(canvas, isMulti, playerNumber) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = 30;
        this.rows = canvas.height / this.gridSize;
        this.columns = canvas.width / this.gridSize;
        this.board = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
        this.score = 0;
        this.currentTetromino = null;
        this.isRunning = false;
        this.isMulti = isMulti;
        this.playerNumber = playerNumber;
        
        this.tetrominoes = {
            I: [[1, 1, 1, 1]],
            J: [[0, 0, 1], [1, 1, 1]],
            L: [[1, 0, 0], [1, 1, 1]],
            O: [[1, 1], [1, 1]],
            S: [[0, 1, 1], [1, 1, 0]],
            T: [[0, 1, 0], [1, 1, 1]],
            Z: [[1, 1, 0], [0, 1, 1]]
        };
        
        this.colors = {
            I: "blue",
            J: "pink",
            L: "orange",
            O: "yellow",
            S: "red",
            T: "purple",
            Z: "green"
        };

        this.sounds = {
            land: new Audio("sounds/trung-gach-a-96162.mp3"),
            line: new Audio("sounds/mixkit-video-game-retro-click-237.wav")
        };
        
        this.drawGrid();
        this.setupControls();
    }
    
    drawGrid() {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 2]);
        for (let i = 0; i < this.rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, this.gridSize * i);
            ctx.lineTo(this.canvas.width, this.gridSize * i);
            ctx.stroke();
        }
        for (let i = 0; i < this.columns; i++) {
            ctx.beginPath();
            ctx.moveTo(this.gridSize * i, 0);
            ctx.lineTo(this.gridSize * i, this.canvas.height);
            ctx.stroke();
        }
    }
    
    setupControls() {
        document.addEventListener("keydown", (e) => {
            if (this.playerNumber === 3) {
                if (e.key === "ArrowLeft" || e.key === "a") this.moveTetromino(-1, 0);
                if (e.key === "ArrowRight" || e.key === "d") this.moveTetromino(1, 0);
                if (e.key === "ArrowDown" || e.key === "s") this.moveTetromino(0, 1);
                if (e.key === "ArrowUp" || e.key === "w") this.rotateTetromino();
            }
            if (this.isMulti) {
                if (this.playerNumber === 2) {
                    if (e.key === "ArrowLeft") this.moveTetromino(-1, 0);
                    if (e.key === "ArrowRight") this.moveTetromino(1, 0);
                    if (e.key === "ArrowDown") this.moveTetromino(0, 1);
                    if (e.key === "ArrowUp") this.rotateTetromino();
                } else if (this.playerNumber === 1) {
                    if (e.key === "a" || e.key === "A") this.moveTetromino(-1, 0);
                    if (e.key === "d" || e.key === "D") this.moveTetromino(1, 0);
                    if (e.key === "s" || e.key === "S") this.moveTetromino(0, 1);
                    if (e.key === "w" || e.key === "W") this.rotateTetromino();
                }
            }
            if (e.key === " " && !this.isRunning) {
                this.startGame();
            }
        });
    }
    
    moveTetromino(dx, dy) {
        if (!this.collision(this.currentTetromino.shape, this.currentTetromino.x + dx, this.currentTetromino.y + dy)) {
            this.currentTetromino.x += dx;
            this.currentTetromino.y += dy;
            this.draw();
        }
    }
    
    rotateTetromino() {
        const rotated = this.rotateMatrix(this.currentTetromino.shape);
        if (!this.collision(rotated, this.currentTetromino.x, this.currentTetromino.y)) {
            this.currentTetromino.shape = rotated;
            this.draw();
        }
    }
    
    startGame() {
        this.isRunning = true;
        if (this.isMulti) {
            document.querySelector(".GameOverlay-Multi1").style.display = "none";
            document.querySelector(".GameOverlay-Multi2").style.display = "none";
        } else {
            document.querySelector(".GameOverlay").style.display = "none";
        }
        this.spawnTetromino();
        this.timerId = setInterval(() => this.gameLoop(), 500);
    }
    
    spawnTetromino() {
        const types = Object.keys(this.tetrominoes);
        const type = types[Math.floor(Math.random() * types.length)];
        const shape = this.tetrominoes[type];
        const color = this.colors[type];
        this.currentTetromino = new Tetromino(type, shape, color);
        this.currentTetromino.x = Math.floor(this.columns / 2) - Math.floor(shape[0].length / 2);
    }

    gameLoop() {
        if (!this.isRunning) return;
        
        if (!this.collision(this.currentTetromino.shape, this.currentTetromino.x, this.currentTetromino.y + 1)) {
            this.currentTetromino.y++;
        } else {
            this.mergeTetromino();
            this.sounds.land.play();
            this.spawnTetromino();
            if (this.collision(this.currentTetromino.shape, this.currentTetromino.x, this.currentTetromino.y)) {
                clearInterval(this.timerId);
                this.isRunning = false;
                if (this.canvas != document.querySelector("#canvas1") && this.canvas != document.querySelector("#canvas2")){
                    document.querySelector(".Loser").style.opacity = "1";
                    clickSound.play();
                }
            }
        }
        this.draw();
    }
    
    drawSquare(x, y, color) {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
    }
    
    drawBoard() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.board[y][x]) {
                    this.drawSquare(x, y, this.board[y][x]);
                }
            }
        }
        this.drawGrid();
    }
    
    drawTetromino() {
        const { shape, x, y, type } = this.currentTetromino;
        shape.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (value) this.drawSquare(colIndex + x, rowIndex + y, this.colors[type]);
            });
        });
    }
    
    draw() {
        if (this.isRunning) {
            this.drawBoard();
            this.drawTetromino();
        }
    }
    
    rotateMatrix(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
    }
    
    collision(shape, offX, offY) {
        return shape.some((row, y) => row.some((cell, x) => cell && (
            offX + x < 0 ||
            offX + x >= this.columns ||
            offY + y >= this.rows ||
            this.board[offY + y]?.[offX + x]
        )));
    }
    
    mergeTetromino() {
        this.currentTetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.board[y + this.currentTetromino.y][x + this.currentTetromino.x] = this.colors[this.currentTetromino.type];
                }
            });
        });
        this.checkLines();
    }
    
    checkLines() {
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell)) {
                this.sounds.line.currentTime = 0;
                this.sounds.line.play();
                this.board.splice(y, 1);
                this.board.unshift(Array(this.columns).fill(0));
                this.score += 100;
                this.updateScore();
                y++;
            }
        }
    }
    
    updateScore() {
        const scoreEl = this.canvas.closest(".Single")?.querySelector("#scoreSingle") ||
        this.canvas.closest(".Position1, .Position2")?.querySelector("span");
        if (scoreEl) scoreEl.textContent = this.score;
    }
}

function startSingle() {
    hideChoice();
    document.querySelector(".Single").style.display = "block";
    setTimeout(() => document.querySelector('.Single').classList.add('active'), 100);
    new TetrisGame(document.querySelector("#canvas"), false, 3);
}

function startMulti() {
    hideChoice();
    document.querySelector(".Multi").style.display = "flex";
    setTimeout(() => {
        document.querySelector('.Position1').classList.add('active');
        document.querySelector('.Position2').classList.add('active');
    }, 100);
    new TetrisGame(document.querySelector("#canvas1"), true, 1);
    new TetrisGame(document.querySelector("#canvas2"), true, 2);
}

function hideChoice() {
    document.querySelector(".HomeScreen").classList.add("hidden");
    document.querySelector(".Blur").classList.add("hidden");
    setTimeout(() => document.querySelector(".Choice").style.display = "none", 500);
}

document.addEventListener("DOMContentLoaded", function () {
    var audio = document.getElementById("bg-audio");
    var audioIcon = document.getElementById("audio-icon");
    var volumeSlider = document.getElementById("volume-slider");

    var previousVolume = volumeSlider.value;
    audio.volume = 0.15;

    audioIcon.addEventListener("click", function () {
        if (audio.muted || audio.volume === 0) {
            audio.muted = false;
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume;
            audioIcon.classList.remove("fa-volume-mute");
            audioIcon.classList.add("fa-volume-up");
        } else {
            previousVolume = audio.volume;
            audio.muted = true;
            audio.volume = 0;
            volumeSlider.value = 0;
            audioIcon.classList.remove("fa-volume-up");
            audioIcon.classList.add("fa-volume-mute");
        }
    });

    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value;
        audio.muted = audio.volume === 0;

        if (audio.volume == 0) {
            audioIcon.classList.remove("fa-volume-up");
            audioIcon.classList.add("fa-volume-mute");
        } else {
            previousVolume = volumeSlider.value;
            audioIcon.classList.remove("fa-volume-mute");
            audioIcon.classList.add("fa-volume-up");
        }
    });
});