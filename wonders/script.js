const toggleBtn = document.getElementById("toggleBtn");
if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("no-animation");
    });
}


document.getElementById("startGameBtn").addEventListener("click", function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    canvas.width = 400;
    canvas.height = 400;

    const snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y === 0) direction = { x: 0, y: -20 };
                break;
            case "ArrowDown":
                if (direction.y === 0) direction = { x: 0, y: 20 };
                break;
            case "ArrowLeft":
                if (direction.x === 0) direction = { x: -20, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x === 0) direction = { x: 20, y: 0 };
                break;
        }
    });

    function gameLoop() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            alert("Game Over");
            snake.length = 1;
            snake[0] = { x: 200, y: 200 };
            direction = { x: 0, y: 0 };
            food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
        } else {
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
            } else {
                snake.pop();
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green";
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, 20, 20);

        setTimeout(gameLoop, 100);
    }

    gameLoop();
});
