const stopGame = (drawInterval, alienInterval, bulletInterval) => {
  const msgBox = document.querySelector('#msg');
  msgBox.style = 'display:block';
  clearInterval(bulletInterval);
  clearInterval(alienInterval);
  clearInterval(drawInterval);
};

const drawScore = score => {
  const scoreBox = document.getElementById('scoreBox');
  scoreBox.innerText = `Score : ${score}`;
};

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
  canvas.width = canvas.width;
};

const drawGame = (status, ctx) => {
  const ids = ['#missile', '#bullet', '#ship'];
  const {player, alienShips, weapons, bullets, score} = status;
  clearScreen();
  weapons.forEach(weapon => {
    draw(weapon, ctx, ids[0]);
  });
  bullets.forEach(bullet => {
    draw(bullet, ctx, ids[1]);
  });
  draw(player, ctx, ids[2]);
  alienShips.forEach(alien => {
    drawAlien(alien, ctx);
  });
  drawScore(score);
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

const animateGame = function(game, ctx) {
  const drawInterval = setInterval(() => {
    if (game.isOver()) {
      stopGame(drawInterval, alienInterval, bulletInterval);
    }
    drawGame(game.status(), ctx);
  }, 30);
  const alienInterval = setInterval(() => {
    game.insertAlienShip();
  }, 2000);
  const bulletInterval = setInterval(() => {
    game.fireBullet();
  }, 5000);
};

const gameInit = function(img) {
  const player = new Component(80, 560, 130, 130);
  const alien = new Alien(700, 0, 90, 90, img);
  const weapon = new Component(-50, -50, 60, 80);
  const bullet = new Component(720, 45, 40, 40);
  return new Game(player, alien, weapon, bullet);
};

const main = function() {
  const canvas = document.querySelector('#screen');
  canvas.height = 700;
  canvas.width = 1400;
  const img = document.querySelector('.alien');
  const ctx = canvas.getContext('2d');
  const game = gameInit(img);
  attachEventListeners(game);
  animateGame(game, ctx);
};

window.onload = main;
