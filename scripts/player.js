// Inicializa o objeto do jogador
export const player = {
    x: 8.8, y: 9.8,
    angle: (5 * Math.PI) / 3
}

// Guarda as teclas pressionadas
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

export function updatePlayer(map) {
  const moveSpeed = 0.03;
  const rotationSpeed = 0.02;

  // Rotação
  if (keys["a"] || keys["ArrowLeft"]) player.angle -= rotationSpeed;
  if (keys["d"] || keys["ArrowRight"]) player.angle += rotationSpeed;

  // Movimento (frente e trás)
  let moveX = 0;
  let moveY = 0;

  if (keys["w"] || keys["ArrowUp"]) {
    moveX += Math.cos(player.angle) * moveSpeed;
    moveY += Math.sin(player.angle) * moveSpeed;
    console.log(player);
  }

  if (keys["s"] || keys["ArrowDown"]) {
    moveX -= Math.cos(player.angle) * moveSpeed;
    moveY -= Math.sin(player.angle) * moveSpeed;
    console.log(player);
  }

  const newX = player.x + moveX;
  const newY = player.y + moveY;

  // Checagens de colisão
  if (map[Math.floor(player.y)][Math.floor(newX)] <= 0) {
    player.x = newX;
  }

  if (map[Math.floor(newY)][Math.floor(player.x)] <= 0) {
    player.y = newY;
  }
}

// Permite se mover sem usar o teclado
window.addEventListener("touchstart", handleTouch);
window.addEventListener("touchmove", handleTouch);
window.addEventListener("touchend", clearTouch);

function handleTouch (e) {
    e.preventDefault();

    const width = window.innerWidth;
    keys["a"] = false;
    keys["d"] = false;
    keys["w"] = false;

    for (let touch of e.touches) {
        const x = touch.clientX;

        if (x < width * 0.33) {
            keys["a"] = true;
        } else if (x > width * 0.66) {
            keys["d"] = true;
        } else {
            keys["w"] = true;
        }
    }
}

function clearTouch (e) {
    keys["a"] = false;
    keys["d"] = false;
    keys["w"] = false;
}