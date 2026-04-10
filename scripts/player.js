// Inicializa o objeto do jogador
export const player = {
    x: 1.5, y: 1.5,
    angle: Math.PI / 2
}

// Guarda as teclas pressionadas
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

export function updatePlayer(map) {
  const moveSpeed = 0.03;
  const rotationSpeed = 0.03;

  // Rotação
  if (keys["a"] || keys["ArrowLeft"]) player.angle -= rotationSpeed;
  if (keys["d"] || keys["ArrowRight"]) player.angle += rotationSpeed;


  // Movimento (frente e trás)
  let moveX = 0;
  let moveY = 0;

  if (keys["w"] || keys["ArrowUp"]) {
    moveX += Math.cos(player.angle) * moveSpeed;
    moveY += Math.sin(player.angle) * moveSpeed;
  }

  if (keys["s"] || keys["ArrowDown"]) {
    moveX -= Math.cos(player.angle) * moveSpeed;
    moveY -= Math.sin(player.angle) * moveSpeed;
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