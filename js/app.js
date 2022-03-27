import { bubbleSorter, mergeSorter, quickSorter } from "./sorter.js";
import { Display } from "./display.js";
import { Navigation } from "./navigation.js";

const containerElement = document.querySelector("#container");
const display = new Display(containerElement);

const resetBtn = document.querySelector("#resetBtn");
const sortBtn = document.querySelector("#sortBtn");
const sliderContainer = document.querySelector(".sliderContainer");
const sliderElement = sliderContainer.querySelector("#lengthSlider");
const typeContainer = document.querySelector(".select");
const typeElement = document.querySelector("#typeCombo");
const callbacks = {
  onReset: function(length) {
    display.createRectArr(length);
    display.showRectArr();
  },

  onSort: async function(type) {
    switch (type.toLowerCase()) {
      case "bubble":
        const bSorter = new bubbleSorter(display);
        await bSorter.sort();
        break;
      case "merge":
        const mSorter = new mergeSorter(display);
        await mSorter.sort();
        await mSorter.finalize();
        break;
      case "quick":
        const qSorter = new quickSorter(display);
        await qSorter.sort();
        await qSorter.finalize();
        break;
      default:
        throw `illegal sorting type: ${type}`;
    }
  }
};

const navigation = new Navigation(
  resetBtn,
  sortBtn,
  sliderContainer,
  sliderElement,
  typeContainer,
  typeElement,
  callbacks
);
