import { map, drawMinimap, drawPlayer, drawRays } from "./map.js";
import { updatePlayer } from "./player.js";

const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

const povCanvas = document.getElementById("pov");
const povCtx = povCanvas.getContext("2d");

function gameLoop () {
    updatePlayer(map);

    drawMinimap(minimapCtx);
    drawRays(minimapCtx, povCtx);
    drawPlayer(minimapCtx);

    requestAnimationFrame(gameLoop)
}

gameLoop();