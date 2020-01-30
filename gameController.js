const draw = (component, ctx, id) => {
  const {x, y, width, height} = component;
  const img = document.querySelector(id);
  ctx.drawImage(img, x, y, width, height);
};

const drawAlien = (alien, ctx) => {
  const {x, y, width, height, img} = alien;
  ctx.drawImage(img, x, y, width, height);
};

const clearScreen = () => {
  const canvas = document.querySelector('#screen');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawGame = (status, ctx) => {
  const ids = ['#missile', '#ship', '.alien', '#bullet'];
  const {player, alienShips, weapons, bullets} = status;
  clearScreen();
  weapons.forEach(weapon => {
    draw(weapon, ctx, ids[0]);
  });
  draw(player, ctx, ids[1]);
  bullets.forEach(bullet => {
    draw(bullet, ctx, ids[3]);
  });
  alienShips.forEach(alien => {
    drawAlien(alien, ctx);
  });
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
  const img = document.querySelector('.alien');
  const ctx = canvas.getContext('2d');
  const player = new Component(80, 640, 130, 130);
  const alien = new Alien(700, 0, 90, 90, img);
  const weapon = new Component(0, 0, 60, 80);
  const bullet = new Component(730, 45, 40, 40);
  const game = new Game(player, alien, weapon, bullet);
  attachEventListeners(game);

  setInterval(() => {
    drawGame(game.status(), ctx);
  }, 30);
  setInterval(() => {
    game.insertAlienShip();
  }, 2000);
  setInterval(() => {
    game.fireBullet();
  }, 8000);
};

window.onload = main;
