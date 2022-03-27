import { state, Rectangle } from "./rectangle.js";
import { Range } from "./range.js";

class Sorter {
  constructor(display) {
    this.display = display;
    this.arr = display.rectArr;
  }

  sleep = async ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  finalize = async () => {
    for (let rect of this.display.rectArr) {
      rect.state = state.FINAL;
      await this.sleep(1);
    }
  };

  /**
   * Implementation required
   */
  sort = async () => {
    throw new Error("Must Implement Sort");
  };
}

export class bubbleSorter extends Sorter {
  constructor(display) {
    super(display);
  }

  sort = async () => {
    const mod = Math.ceil(this.arr.length / 20);
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        this.arr[j].state = state.COMPARING;
        this.arr[j + 1].state = state.COMPARING;
        if (j % mod === 0) await this.sleep(1);
        if (this.arr[j].height > this.arr[j + 1].height) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          this.display.showRectArr();
        }
        this.arr[j].state = state.NORMAL;
        this.arr[j + 1].state = state.NORMAL;
      }
      this.arr[this.arr.length - 1 - i].state = state.FINAL;
    }
  };
}

export class mergeSorter extends Sorter {
  constructor(display) {
    super(display);
  }

  deepCopy = (arr, range) => {
    const copy = [];
    for (let i = range.start; i <= range.end; i++) {
      copy.push(new Rectangle(arr[i].height));
    }
    // console.log(copy);
    return copy;
  };

  merge = async (lRange, rRange) => {
    const l = this.deepCopy(this.arr, lRange);
    const r = this.deepCopy(this.arr, rRange);
    let i = 0;
    let j = 0;
    let k = lRange.start;
    while (i < l.length && j < r.length) {
      this.arr[lRange.start + i].state = state.COMPARING;
      this.arr[rRange.start + j].state = state.COMPARING;
      await this.sleep(2);
      this.arr[lRange.start + i].state = state.NORMAL;
      this.arr[rRange.start + j].state = state.NORMAL;
      if (l[i].height < r[j].height) {
        this.arr[k] = l[i];
        i++;
      } else {
        this.arr[k] = r[j];
        j++;
      }
      k++;
      this.display.showRectArr();
    }
    while (i < l.length) {
      this.arr[k] = l[i];
      i++;
      k++;
      this.display.showRectArr();
    }
    while (j < r.length) {
      this.arr[k] = r[j];
      j++;
      k++;
      this.display.showRectArr();
    }
  };

  sort = async (range = new Range(0, this.arr.length - 1)) => {
    if (range.length > 1) {
      const split = range.splitInHalf();
      const lRange = split.left;
      const rRange = split.right;
      await this.sort(lRange);
      await this.sort(rRange);
      await this.merge(lRange, rRange);
    }
  };
}

export class quickSorter extends Sorter {
  constructor(display) {
    super(display);
  }

  partition = async range => {
    const { start, end } = range;
    const pivot = this.arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      this.arr[j].state = state.COMPARING;
      pivot.state = state.COMPARING;
      await this.sleep(1);
      if (this.arr[j].height < pivot.height) {
        i++;
        this.arr[i].state = state.COMPARING;
        if (j % 2 == 0) await this.sleep(1);
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
        this.arr[i].state = state.NORMAL;
        this.display.showRectArr();
      }
      pivot.state = state.NORMAL;
      this.arr[j].state = state.NORMAL;
    }
    this.arr[i + 1].state = state.COMPARING;
    this.arr[end].state = state.COMPARING;
    await this.sleep(1);
    [this.arr[i + 1], this.arr[end]] = [this.arr[end], this.arr[i + 1]];
    this.display.showRectArr();
    this.arr[i + 1].state = state.NORMAL;
    this.arr[end].state = state.NORMAL;
    return i + 1;
  };

  sort = async (range = new Range(0, this.arr.length - 1)) => {
    const { start, end } = range;
    if (start < end) {
      const pivotIdx = await this.partition(range);
      await this.sort(new Range(start, pivotIdx - 1));
      await this.sort(new Range(pivotIdx + 1, end));
    }
  };
}
