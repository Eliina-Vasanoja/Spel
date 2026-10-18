const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lastTime = 0;
let background = new Image();
background.src = "mylene2401-water-8183918.jpg";
let gameOver = false;
let success = false;
let failure = false;
let timer = 0;
let lives = 3;

let player = {
    x: 50,
    y: 420,
    width: 50,
    height: 40,
    speed: 90
}


function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(127, 185, 80)";
    ctx.moveTo(canvas.width, 20);
    ctx.lineTo(700, 30);
    ctx.lineTo(610, 90);
    ctx.lineTo(602, 125);
    ctx.lineTo(600, 170);
    ctx.lineTo(607, 194);
    ctx.lineTo(654, 220);
    ctx.lineTo(680, 245);
    ctx.lineTo(764, 267);
    ctx.lineTo(canvas.width, 270);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "rgb(255, 208, 0)";
    ctx.fillRect(660, 70, 100, 70);
    ctx.closePath();
    ctx.fillStyle = "brown";
    ctx.beginPath()
    ctx.moveTo(640, 70);
    ctx.lineTo(780, 70);
    ctx.lineTo(760, 40);
    ctx.lineTo(670, 40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "brown";
    ctx.fillRect(670, 90, 30, 50);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(677, 120, 4, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();

}
const water = [
    { x: 0, y: 0, width: 360, height: 360 },
    { x: 0, y: 470, width: canvas.width, height: canvas.height },
    { x: 360, y: 0, width: canvas.width, height: 60 },
    { x: 445, y: 170, width: canvas.width, height: canvas.height }
]
const house = {
    x: 640,
    y: 100,
    height: 70,
    width: canvas.width
}
let fish = {
    x: 310,
    y: 210,
    width: 50,
    height: 20,
    vx: 200
}
fish.active = true;


function drawFish() {
    ctx.fillStyle = "rgb(255, 123, 0)";

    ctx.beginPath()
    ctx.moveTo(fish.x, fish.y + 5);
    ctx.lineTo(fish.x, fish.y + 15);
    ctx.lineTo(fish.x + 15, fish.y + fish.height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(fish.x + 15, fish.y + fish.height / 2)
    ctx.lineTo(fish.x + 30, fish.y);
    ctx.lineTo(fish.x + fish.width, fish.y + fish.height / 2);
    ctx.lineTo(fish.x + 30, fish.y + fish.height);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(fish.x + 37, fish.y + fish.height - 12, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}


function drawBridge() {
    ctx.fillStyle = "rgb(116, 68, 36)";
    ctx.fillRect(0, 400, 400, 70);
    ctx.fillRect(370, 100, 70, 370);
    ctx.fillRect(440, 100, 200, 70);
}

function drawPlayer() {
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, player.width + 20, player.height - 15);

    ctx.beginPath();
    ctx.moveTo(player.x + 60, player.y);
    ctx.lineTo(player.x + 75, player.y - 16);
    ctx.lineTo(player.x + 78, player.y - 5);
    ctx.lineTo(player.x + 67, player.y + 10);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(player.x + 75, player.y - 17, 25, 15)
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(player.x + 75, player.y - 17)
    ctx.lineTo(player.x + 85, player.y - 28);
    ctx.lineTo(player.x + 85, player.y - 17);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(player.x, player.y + player.height - 25, 10, 30);
    ctx.fillRect(player.x + player.width + 5, player.y + player.height - 25, 10, 30);
    ctx.beginPath()
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x - 30, player.y - 3);
    ctx.lineTo(player.x - 14, player.y + 8);
    ctx.lineTo(player.x, player.y + 7);
    ctx.fill();
    ctx.closePath();
}


function drawFailure() {
    ctx.fillStyle = "orange";
    ctx.font = "70px arial";
    ctx.fillText("Extra lives left:" + lives, canvas.width / 6, canvas.height / 2);
    ctx.font = "50px arial";
    ctx.fillText("Press Enter to start over", canvas.width / 7, canvas.height / 1.5)
}
function drawGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "100px arial";
    ctx.fillText("GAME OVER", canvas.width / 8, canvas.height / 2);
    ctx.font = "50px arial";
    ctx.fillText("Press Enter to start over", canvas.width / 6, canvas.height / 1.5)
}
function drawSuccess() {
    ctx.fillStyle = "yellow";
    ctx.font = "100px arial";
    ctx.fillText("SUCCESS!", canvas.width / 5, canvas.height / 2);
    ctx.font = "50px arial";
    ctx.fillText("Press Enter to start over", canvas.width / 6, canvas.height / 1.5)
}
function drawHUD() {
    ctx.fillStyle = "rgba(241, 241, 241, 0.5)"
    ctx.fillRect(50, 35, 200, 55);
    ctx.fillStyle = "black";
    ctx.font = "30px arial";
    ctx.fillText("Extra lives: " + lives, 60, 70);
    ctx.fill();
}
function draw() {
    drawBackground();
    drawBridge();
    drawPlayer();
    drawHUD();
}
function draw2() {
    drawBackground();
    drawBridge();
    drawGameOver();
    drawHUD();
}
function draw3() {
    drawBackground();
    drawBridge();
    drawSuccess();
    drawHUD();
}
function draw4() {
    drawBackground();
    drawBridge();
    drawFailure();
    drawHUD();
}


function animateFish(deltaTime) {
    if (!fish.active) return;

    fish.x += fish.vx * deltaTime;

    if (fish.x >= 450) {
        fish.x = 450;
        fish.active = false;
    }


}

function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    )

}


function checkSuccess(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    )

}


function startGame() {
    player.x = 50;
    player.y = 420;

    fish.x = 310;
    fish.active = true;

    gameOver = false;
    success = false;
    failure = false;
    timer = 0;
}
const keys = {};

window.addEventListener("keydown", function (event) {

    keys[event.code] = true;

    if (event.code === "Enter" && (gameOver || success || failure)) {
        startGame();
    }
});

window.addEventListener("keyup", function (event) {
    keys[event.code] = false;
});

function update(deltaTime) {
    timer += deltaTime;

    if (fish.active) {
        animateFish(deltaTime);
    }

    if (timer >= 2) {
        timer -= 2;

        // Starta om fisken
        fish.x = 310;
        fish.active = true;

    }
    if (gameOver || success || failure) return;
    const oldX = player.x;
    const oldY = player.y;
    if (keys["KeyW"]) {
        player.y -= player.speed * deltaTime;
    }
    if (keys["KeyS"]) {
        player.y += player.speed * deltaTime;
    }
    if (keys["KeyA"]) {
        player.x -= player.speed * deltaTime;
    }
    if (keys["KeyD"]) {
        player.x += player.speed * deltaTime;
    }


    let hitWater = water.some(drop => checkCollision(player, drop));
    let hitFish = fish.active && checkCollision(player, fish);

    if (hitWater || hitFish) {
        player.x = oldX;
        player.y = oldY;

        lives--;

        if (lives <= 0) {
            failure = false;
            gameOver = true;
            lives = 3;
        } else {
            failure = true;
        }
    }
    if (checkSuccess(player, house)) {
        player.x = oldX;
        player.y = oldY;
        success = true;
    }

}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", reject);

        image.src = src;
    });
}

async function loadResources() {
    [background] = await Promise.all([
        loadImage(background.src)

    ]);
}
function gameLoop(timeStamp) {
    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    update(deltaTime);

    if (failure) {
        draw4()
    }

    else if (success) {
        draw3();
    }
    else if (gameOver) {
        draw2();
    }
    else {
        draw();

        if (fish.active) {
            drawFish();
        }
    }
    requestAnimationFrame(gameLoop);
}
async function start() {
    await loadResources();
    requestAnimationFrame(gameLoop);
}

start();
