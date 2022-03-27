export const state = {
  NORMAL: "normal",
  COMPARING: "comparing",
  FINAL: "final"
};

export class Rectangle {
  constructor(height) {
    this.height = height;
    this.div = document.createElement("div");
    this.div.style.minHeight = `${height}px`;
    this.div.classList.add("rect");
    this.state = state.NORMAL;
  }

  /** @param {String} newState*/
  set state(newState) {
    switch (newState) {
      case state.NORMAL:
        this.div.classList.remove("comparing");
        this.div.classList.remove("finalPos");
        break;
      case state.COMPARING:
        this.div.classList.add("comparing");
        break;
      case state.FINAL:
        this.div.classList.add("finalPos");
        break;
      default:
        throw `illegal state: ${newState}`;
    }
  }
}
