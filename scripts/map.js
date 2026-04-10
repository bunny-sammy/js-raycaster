import { player } from "./player.js";
import { castRay } from './raycaster.js';

const mapString = `
1,1,1,1,1,1,1,1,1,1
1,0,1,0,0,0,0,0,0,1
1,0,1,0,0,0,0,0,0,1
1,0,1,1,1,0,0,1,0,1
1,0,0,0,0,0,0,0,0,1
1,1,1,1,0,1,0,0,0,1
1,0,0,0,0,1,0,0,0,1
1,0,1,0,0,1,0,0,0,1
1,0,1,0,0,1,0,0,0,1
1,1,1,1,1,1,1,1,1,1
`;

// Separa a string acima em uma matriz de inteiros
export const map = mapString.trim().split("\n").map(row => row.split(",").map(Number));

export let tileSize = 48;

// Recebe o contexto de um canvas para desenhar o minimapa
export function drawMinimap (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Calcula tamanho dos tiles baseado no tamanho do canvas
    tileSize = ctx.canvas.height / map.length;

    // Preenche cada tile de acordo com a matriz
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 0) {
                ctx.fillStyle = "#FFF";
            } else {
                ctx.fillStyle = "#000";
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

export function drawPlayer (ctx) {
    const px = (player.x * tileSize);
    const py = (player.y * tileSize);

    // Desenha o circulo que representa o jogador
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
}

export function drawRays (ctx) {
    const px = (player.x * tileSize);
    const py = (player.y * tileSize);
    const rayAngle = player.angle;
    
    const ray = castRay(player.x, player.y, rayAngle);

    // Desenha o raio
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(
        px + Math.cos(rayAngle) * (ray.distance * tileSize),
        py + Math.sin(rayAngle) * (ray.distance * tileSize)
    );
    ctx.stroke();
}