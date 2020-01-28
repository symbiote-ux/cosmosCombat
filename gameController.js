const draw = (component, ctx) => {
  const {x, y, type, width, height} = component;
  ctx.fillStyle = type;
  ctx.fillRect(x, y, width, height);
};

const drawGame = (status, ctx) => {
  const {player1, alienShip, weapon} = status;
  draw(player1, ctx);
  draw(alienShip, ctx);
  draw(weapon, ctx);
};

const main = () => {
  const canvas = document.querySelector('#screen');
  canvas.height = 770;
  canvas.width = 1420;
  const ctx = canvas.getContext('2d');
  const player1 = new Component(5, 720, 'black', 100, 100);
  const alien = new Component(700, 0, 'red', 120, 120);
  const weapon = new Component(5, 610, 'yellow', 50, 50);
  const game = new Game(player1, alien, weapon);
  drawGame(game.status(), ctx);
};

window.onload = main;
