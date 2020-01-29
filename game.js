'use strict';

class Game {
  constructor(player, alienShip, weapon) {
    this.player = player;
    this.alienShip = alienShip;
    this.weapons = [weapon];
  }
  status() {
    this.update();
    return {
      player: this.player.details(),
      alienShip: this.alienShip.details(),
      weapons: this.weapons.map(weapon => {
        return weapon.details();
      })
    };
  }
  update() {
    this.weapons.forEach(weapon => weapon.moveUp());
    this.alienShip.moveDown();
  }
  playerCord() {
    let {x, y} = this.player.details();
    return {x, y};
  }
  fireWeapon() {
    const {x, y} = this.playerCord();
    this.weapons.push(new Component(x + 33, y, 70, 90));
  }

  shipMoveLeft() {
    this.player.moveLeft();
  }
  shipMoveRight() {
    this.player.moveRight();
  }
}
