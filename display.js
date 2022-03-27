import { Rectangle } from "./rectangle.js";

export class Display {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.rectArr = [];
    this.maxHeight = parseInt(getComputedStyle(this.containerElement).height);

    this.createRectArr(75);
    this.showRectArr();
  }

  createRectArr = length => {
    this.rectArr.splice(0, this.rectArr.length);
    for (let i = 0; i < length; i++) {
      const height = Math.floor(Math.random() * (this.maxHeight - 20)) + 20;
      this.rectArr.push(new Rectangle(height));
    }
  };

  showRectArr = () => {
    this.containerElement.innerHTML = "";
    this.rectArr.forEach(rect => {
      this.containerElement.appendChild(rect.div);
    });
  };
}
