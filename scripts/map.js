import { player } from "./player.js";
import { castRay } from "./raycaster.js";
import { mapString, colors } from "./utils.js"

// Separa a string acima em uma matriz de inteiros
export const map = mapString.trim().split("\n").map(row => row.split(",").map(Number));

export let tileSize = 48;

// Recebe o contexto de um canvas para desenhar o minimapa
export function drawMinimap (ctx) {
    clearCanvas(ctx);
    // Calcula tamanho dos tiles baseado no tamanho do canvas
    tileSize = ctx.canvas.height / map.length;

    // Preenche cada tile de acordo com a matriz
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 0) {
                ctx.fillStyle = colors.foreground;
            } else {
                ctx.fillStyle = colors.background;
            }

            ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
}

// Desenha o circulo que representa o jogador
export function drawPlayer (ctx) {
    const px = (player.x * tileSize);
    const py = (player.y * tileSize);

    ctx.fillStyle = colors.player;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
}

// Traça os raios que compõem o campo de visão do jogador
export function drawRays (ctx2d, ctx3d) {
    clearCanvas(ctx3d);

    const px = (player.x * tileSize);
    const py = (player.y * tileSize);
    const fov = Math.PI / 3;
    const rayCount = 60;

    // Dentro do campo de visão (60°) são traçados 60 raios
    for (let i = 0; i < rayCount; i++) {
        const angle = player.angle - (fov / 2) + (i / (rayCount)) * fov * fov;

        const ray = castRay(player.x, player.y, angle);
        drawRay2D(ctx2d, px, py, ray, angle);
        drawRay3D(ctx3d, i, ray, angle, rayCount);
    }
    
}

// Desenha um raio no minimapa
function drawRay2D (ctx, px, py, ray, angle) {
    ctx.strokeStyle = colors.player + colors.rayAlpha;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(
        px + Math.cos(angle) * (ray.distance * tileSize),
        py + Math.sin(angle) * (ray.distance * tileSize)
    );
    ctx.stroke();
}

// Desenha um raio na visão 3D
function drawRay3D (ctx, i, ray, rayAngle, rayCount) {
    // Corrige a distância para evitar distorção (olho de peixe)
    const distance = ray.distance * Math.cos(rayAngle - player.angle);
    const increment = ctx.canvas.width / rayCount;
    const maxHeight = ctx.canvas.height;
    const lineHeight = Math.min(maxHeight / distance, maxHeight);

    // Escurece linhas mais distantes
    const shade = Math.max(0, 255 - distance * 25);
    ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade+25})`;
    ctx.fillRect(
        i * increment,
        (maxHeight / 2) - (lineHeight / 2),
        increment,
        lineHeight
    );
}

function clearCanvas (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}