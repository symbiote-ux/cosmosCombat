'use strict';

class Alien {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
  }
  details() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      img: this.img
    };
  }
  moveDown() {
    this.y += 1;
  }
}
