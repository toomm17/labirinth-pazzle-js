const WALL_THICKNESS_PX = 10;
const BALL_RADIUS_PX = 12;
const FREE_THICKNESS_PX = 35.5;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 764;
canvas.height = 764;

const ball = {
    x: BALL_RADIUS_PX + 5,
    y: FREE_THICKNESS_PX + WALL_THICKNESS_PX + 14,
    radius: BALL_RADIUS_PX
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'orange';
    context.fill();
    context.closePath()
};

animate({
    clear() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    },
    update() {
        console.log('update')
    },
    render() {
        drawBall();
        drawWalls();
    }
})

const walls = [
    {x: 0, y: FREE_THICKNESS_PX, width: 47, height: WALL_THICKNESS_PX},
    {x: 47 + FREE_THICKNESS_PX, y: FREE_THICKNESS_PX, width: 70, height: WALL_THICKNESS_PX}
]

function drawWalls() {
    for (const wall of walls) {
        context.beginPath();
        context.rect(wall.x, wall.y, wall.width, wall.height);
        context.fillStyle = '#272727';
        context.fill();
        context.closePath();
    }
}



window.addEventListener('keydown', (event) => {
    console.log(event.key)
    if (event.key == 'ArrowRight') {
        ball.x += 1.5
        console.log('ArrowRight if')
    }

    if (event.key == 'ArrowLeft') {
        ball.x -= 1.5
        console.log('ArrowLeft if')

    }

    if (event.key == 'ArrowDown') {
        ball.y += 1.5
        console.log('ArrowDown if')

    }

    if (event.key == 'ArrowUp') {
        ball.y -= 1.5
        console.log('ArrowUp if')

    }
})

function animate(obj) {
    const { clear, update, render } = obj;
    let pTimestamp = 0;

    requestAnimationFrame(tick);

    function tick(timestamp) {
        requestAnimationFrame(tick);

        const diff = timestamp - pTimestamp;
        pTimestamp = timestamp;
        const fps = 1000 / diff;
        const secondPart = diff / 1000;

        const params = {
            timestamp,
            pTimestamp,
            diff,
            fps,
            secondPart
        }

        update(params);
        clear();
        render(params);
    }
}