import { map } from "./map.js";

// Calcula a distância do raio até colidir com uma parede
export function castRay (x, y, angle) {
    const maxDistance = 10;
    const increment = 0.05;

    let distance = 0;
    let hit = false;
    let hitX = 0;
    let hitY = 0;

    while (!hit && distance < maxDistance) {
        distance += increment;

        const rayX = x + Math.cos(angle) * distance;
        const rayY = y + Math.sin(angle) * distance;

        const mapX = Math.floor(rayX);
        const mapY = Math.floor(rayY);

        if (map[mapY]?.[mapX] > 0) {
            hit = true;
            hitX = rayX;
            hitY = rayY;
        }
    }

    return { distance, hitX, hitY };
}