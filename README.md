# JS Raycaster
![Demo gif](assets/demo.gif)
Uma engine simples de pseudo-3D via raycast para browser construída em Javascript.

Essa é minha tentativa de começar a aprender mais sobre computação gráfica me aprimoro na área que já estou acostumado (desenvolvimento web). A ideia foi replicar esse efeito de jogos como Doom en um browser e que a demo fosse acessível em qualquer dispositivo.

O funcionamento por trás dos panos é relativamente simples. O mapa é uma matriz onde 1 representa paredes e 0 representa o piso. O jogador está sempre em uma posição dentro da matriz e virado para um ângulo. Vários raios são disparados a partir da posição do jogador até o ponto onde colidirem com uma parede. A distância até a colisão determina a altura da parede na visão 3D. Esses raios ficam visíveis no minimapa, inclusive.

Foi bem divertido fazer isso funcionar e foi uma ótima oportunidade pra aprender a usar canvas. De quebra também foi a primeira vez que apliquei seno e coseno na vida real!

## Links
- [Demonstração](https://bunny-sammy.github.io/js-raycaster)
- [Tutorial que me ajudou muito](https://www.youtube.com/watch?v=gYRrGTC7GtA)