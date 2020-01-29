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
    this.x += 6;
  }
  moveLeft() {
    this.x -= 6;
  }
  moveUp() {
    this.y -= 2;
  }
  moveDown() {
    this.y += 1;
  }
}
