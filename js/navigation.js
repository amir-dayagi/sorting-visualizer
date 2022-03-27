const status = {
  UNSORTED: "unsorted",
  SORTING: "sorting",
  SORTED: "sorted"
};

export class Navigation {
  constructor(
    resetBtn,
    sortBtn,
    sliderContainer,
    sliderElement,
    typeContainer,
    typeElement,
    callbacks
  ) {
    this.resetBtn = resetBtn;
    this.sortBtn = sortBtn;
    this.sliderContainer = sliderContainer;
    this.sliderElement = sliderElement;
    this.typeContainer = typeContainer;
    this.typeElement = typeElement;
    this.callbacks = callbacks;
    this.status = status.UNSORTED;

    resetBtn.addEventListener("click", () => {
      this.status = status.UNSORTED;
      callbacks.onReset(this.length);
    });

    sortBtn.addEventListener("click", async () => {
      this.status = status.SORTING;
      await callbacks.onSort(this.type);
      this.status = status.SORTED;
    });

    sliderElement.addEventListener("input", () => {
      this.status = status.UNSORTED;
      callbacks.onReset(this.length);
    });
  }

  get length() {
    return parseInt(this.sliderElement.value);
  }

  get type() {
    return this.typeElement.value;
  }

  /**@param {String} newStatus*/
  set status(newStatus) {
    function enable(element) {
      element.classList.remove("disabled");
      element.classList.add("enabled");
      if (element.disabled !== undefined) element.disabled = false;
    }

    function disable(element) {
      element.classList.remove("enabled");
      element.classList.add("disabled");
      if (element.disabled !== undefined) element.disabled = true;
    }

    switch (newStatus) {
      case status.UNSORTED:
        enable(this.resetBtn);
        enable(this.sortBtn);
        enable(this.sliderContainer);
        enable(this.sliderElement);
        enable(this.typeContainer);
        enable(this.typeElement);
        break;
      case status.SORTING:
        disable(this.resetBtn);
        disable(this.sortBtn);
        disable(this.sliderContainer);
        disable(this.sliderElement);
        disable(this.typeContainer);
        disable(this.typeElement);
        break;
      case status.SORTED:
        enable(this.resetBtn);
        disable(this.sortBtn);
        enable(this.sliderContainer);
        enable(this.sliderElement);
        enable(this.typeContainer);
        enable(this.typeElement);
        break;
      default:
        throw `illegal status: ${newStatus}`;
    }
  }
}
