import { map, drawMinimap, drawPlayer, drawRays } from "./map.js";
import { updatePlayer } from "./player.js";

const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

function gameLoop () {
    updatePlayer(map);

    drawMinimap(minimapCtx);
    drawRays(minimapCtx);
    drawPlayer(minimapCtx);

    requestAnimationFrame(gameLoop)
}

gameLoop();