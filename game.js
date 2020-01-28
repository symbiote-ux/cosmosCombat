'use strict';

class Game {
  constructor(player1, alienShip, weapon) {
    this.player1 = player1;
    this.alienShip = alienShip;
    this.weapon = weapon;
  }
  status() {
    return {
      player1: this.player1.details(),
      alienShip: this.alienShip.details(),
      weapon: this.weapon.details()
    };
  }
}
