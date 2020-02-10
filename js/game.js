const randNum = () => Math.ceil(Math.random() * 1400);

class Game {
  constructor(player, alienShip, weapon, bullet) {
    this.player = player;
    this.alienShips = [alienShip];
    this.weapons = [weapon];
    this.bullets = [bullet];
    this.score = new Score();
  }
  alienDetails() {
    return this.alienShips.map(alien => alien.details());
  }
  weaponDetails() {
    return this.weapons.map(weapon => weapon.details());
  }
  bulletDetails() {
    return this.bullets.map(bullet => bullet.details());
  }
  status() {
    this.update();
    return {
      player: this.player.details(),
      alienShips: this.alienDetails(),
      weapons: this.weaponDetails(),
      bullets: this.bulletDetails(),
      score: this.score.currentScore()
    };
  }
  update() {
    this.weapons.forEach(weapon => weapon.moveUp());
    this.alienShips.forEach(alien => alien.moveDown());
    this.bullets.forEach(bullet => bullet.shoot());
    this.eraseAlienAndWeapon();
    this.deleteBullet();
  }
  playerCord() {
    const {x, y} = this.player.details();
    return {x, y};
  }
  fireBullet() {
    const aliens = this.alienDetails();
    aliens.forEach(alien => {
      const {x, y} = alien;
      this.bullets.push(new Component(x + 20, y + 45, 40, 40));
    });
  }
  fireWeapon() {
    const {x, y} = this.playerCord();
    this.weapons.push(new Component(x + 33, y, 60, 80));
  }
  insertAlienShip() {
    const images = document.querySelectorAll('.alien');
    const img = images[Math.floor(Math.random() * images.length)];
    this.alienShips.push(new Alien(randNum(), 0, 90, 90, img));
  }
  shipMoveLeft() {
    this.player.moveLeft();
  }
  shipMoveRight() {
    this.player.moveRight();
  }
  eraseAlienAndWeapon() {
    this.alienShips.forEach((alien, indexA) => {
      this.weapons.forEach((weapon, indexW) => {
        if (hasCollide(alien, weapon, 'up')) {
          this.alienShips.splice(indexA, 1);
          this.weapons.splice(indexW, 1);
          this.score.count(1);
        }
        if (weapon.y <= 5) {
          this.weapons.splice(indexW, 1);
        }
      });
    });
  }
  deleteBullet() {
    this.bullets.forEach((bullet, indexB) => {
      this.weapons.forEach((weapon, indexW) => {
        if (hasCollide(bullet, weapon, 'up')) {
          this.bullets.splice(indexB, 1);
          this.weapons.splice(indexW, 1);
        }
      });
      if (bullet.y >= 670) {
        this.bullets.splice(indexB, 1);
      }
    });
  }
  isOver() {
    return this.bullets.some(bullet => hasCollide(this.player, bullet, 'down'));
  }
}
