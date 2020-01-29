'use strict';

class Component {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  details() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
  moveRight() {
    this.x += 30;
  }
  moveLeft() {
    this.x -= 30;
  }
  moveUp() {
    this.y -= 25;
  }
  moveDown() {
    this.y += 1;
  }
}
