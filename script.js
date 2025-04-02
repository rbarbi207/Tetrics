const canvas = document.getElementById('canvas');

function startSingle() {
    hideChoice();
    document.querySelector(".Single").style.display = "block";
    drawCanvas(".Single canvas")
}


function startMulti() {
    hideChoice();
    document.querySelector(".Multi").style.display = "block";
    drawCanvas(".Multi canvas");
}

function drawCanvas(selector) {
    const canvases = document.querySelectorAll(selector);
    canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 2]);
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
    })
}

function hideChoice() {
    let choiceDiv = document.querySelector(".Choice");
    let blurDiv = document.querySelector(".Blur");
    choiceDiv.classList.add("hidden");
    blurDiv.classList.add("hidden");
    setTimeout(() => {
        choiceDiv.style.display = "none";
    }, 500);
}