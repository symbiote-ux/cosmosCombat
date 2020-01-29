const draw = (component, ctx, id) => {
  const {x, y, width, height} = component;
  const img = document.querySelector(id);
  ctx.drawImage(img, x, y, width, height);
};

const clearScreen = () => {
  const canvas = document.querySelector('#screen');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawGame = (status, ctx) => {
  const ids = ['#missile', '#ship', '#alien'];
  const {player, alienShip, weapons} = status;
  clearScreen();
  weapons.forEach(weapon => {
    draw(weapon, ctx, ids[0]);
  });
  draw(player, ctx, ids[1]);
  draw(alienShip, ctx, ids[2]);
};

const handleKeyDown = game => {
  switch (event.keyCode) {
    case 37:
      game.shipMoveLeft();
      break;
    case 38:
      game.fireWeapon();
      break;
    case 39:
      game.shipMoveRight();
      break;
  }
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyDown.bind(null, game);
};

const main = () => {
  const canvas = document.querySelector('#screen');
  canvas.height = 770;
  canvas.width = 1420;
  const ctx = canvas.getContext('2d');
  const player = new Component(80, 640, 130, 130);
  const alien = new Component(700, 0, 120, 120);
  const weapon = new Component(112, 645, 70, 90);
  const game = new Game(player, alien, weapon);
  attachEventListeners(game);

  const gameInterval = setInterval(() => {
    drawGame(game.status(), ctx);
  }, 50);
};

window.onload = main;
