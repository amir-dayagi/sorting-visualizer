export class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.length = end - start + 1;
  }

  splitInHalf() {
    if (this.length < 2) throw `can't split a range with length smaller than 2`;
    const mid = Math.floor((this.start + this.end) / 2);
    return {
      left: new Range(this.start, mid),
      right: new Range(mid + 1, this.end)
    };
  }
}
