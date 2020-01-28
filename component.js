'use strict';

class Component {
  constructor(x, y, type, width, height) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  details() {
    return {
      x: this.x,
      y: this.y,
      type: this.type,
      width: this.width,
      height: this.height
    };
  }
}
