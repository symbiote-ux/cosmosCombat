'use strict';

const randNum = () => Math.ceil(Math.random() * 1400);

class Game {
  constructor(player, alienShip, weapon, bullet) {
    this.player = player;
    this.alienShips = [alienShip];
    this.weapons = [weapon];
    this.bullets = [bullet];
  }
  status() {
    this.update();
    return {
      player: this.player.details(),
      alienShips: this.alienStatus(),
      weapons: this.weaponStatus(),
      bullets: this.bulletStatus()
    };
  }
  alienStatus() {
    return this.alienShips.map(alien => {
      return alien.details();
    });
  }
  weaponStatus() {
    return this.weapons.map(weapon => {
      return weapon.details();
    });
  }
  bulletStatus() {
    return this.bullets.map(bullet => {
      return bullet.details();
    });
  }
  update() {
    this.weapons.forEach(weapon => weapon.moveUp());
    this.alienShips.forEach(alien => alien.moveDown());
    this.bullets.forEach(bullet => bullet.shoot());
    this.eraseAlienAndWeapon();
  }
  playerCord() {
    const {x, y} = this.player.details();
    return {x, y};
  }
  fireBullet() {
    const aliens = this.alienStatus();
    aliens.forEach(alien => {
      const {x, y} = alien;
      this.bullets.push(new Component(x + 30, y + 45, 40, 40));
    });
  }
  fireWeapon() {
    const {x, y} = this.playerCord();
    this.weapons.push(new Component(x + 33, y, 60, 80));
  }
  insertAlienShip() {
    this.alienShips.push(new Component(randNum(), 0, 90, 90));
  }
  shipMoveLeft() {
    this.player.moveLeft();
  }
  shipMoveRight() {
    this.player.moveRight();
  }
  hasCollide(alien, weapon) {
    const {x: a, y: b, width: w, height: h} = alien.details();
    const {x, y, width, height} = weapon.details();
    const isXinRange = isInRange(a, a + w, x) || isInRange(a, a + w, x + width);
    const isYinRange = y <= b + h;
    return isXinRange && isYinRange;
  }
  eraseAlienAndWeapon() {
    this.alienShips.forEach((alien, index1) => {
      this.weapons.forEach((weapon, index2) => {
        if (this.hasCollide(alien, weapon)) {
          this.alienShips.splice(index1, 1);
          this.weapons.splice(index2, 1);
        }
        if (weapon.y <= 1) this.weapons.splice(index2, 1);
      });
    });
  }
}

const isInRange = (minLimit, maxLimit, num) => {
  return num >= minLimit && num <= maxLimit;
};
