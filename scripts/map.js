import { player } from "./player.js";

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

let tileHeight = 48;
let tileWidth = 48;

// Recebe o contexto de um canvas para desenhar o minimapa
export function drawMinimap (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Calcula tamanho dos tiles baseado no tamanho do canvas
    tileHeight = ctx.canvas.height / map.length;
    tileWidth = ctx.canvas.width / map[0].length;

    // Preenche cada tile de acordo com a matriz
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > 0) {
                ctx.fillStyle = "#FFF";
            } else {
                ctx.fillStyle = "#000";
            }

            ctx.fillRect(
                x * tileWidth,
                y * tileHeight,
                tileWidth,
                tileHeight
            );
        }
    }
}

export function drawPlayer (ctx) {
    const px = (player.x * tileWidth);
    const py = (player.y * tileHeight);

    // Desenha o circulo que representa o jogador
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();

    // Desenha os raycasts (provisório)
    const rayMargin = .75;
    const rayIncrement = .25;
    
    for (let i = player.angle - rayMargin; i <= player.angle + rayMargin; i+=rayIncrement) {
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
            px + Math.cos(i) * 50,
            py + Math.sin(i) * 50
        );
        ctx.stroke();
    }
}