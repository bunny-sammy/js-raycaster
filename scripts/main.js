import { map, drawMinimap, drawPlayer } from "./map.js";
import { updatePlayer } from "./player.js";

const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

function gameLoop () {
    updatePlayer(map);

    drawMinimap(minimapCtx);
    drawPlayer(minimapCtx);

    requestAnimationFrame(gameLoop)
}

gameLoop();