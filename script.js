"use strict";

const inputBillAmount = document.querySelector("#bill");
const inputPeopleCount = document.querySelector("#peopleCount");
const btnsTips = document.querySelectorAll(".btnTip");
const btnCustom = document.querySelector("#btnCustom");
const btnReset = document.querySelector(".btnReset");
const elTipAmount = document.querySelector("#tipAmount");
const elTotalAmount = document.querySelector("#totalAmount");
const errorMessage = document.querySelector("#errorMessage");

let bill, tip;

// Functions
const calcTip = (bill, tip) => bill * tip;
const updateDisplay = (el, val) => (el.textContent = val);
const unselectTipBtn = () => document.querySelector(".selected")?.classList.remove("selected");

// Event Listeners
btnsTips.forEach(btn => {
  btn.addEventListener("click", function () {
    bill = +inputBillAmount.value;
    if (btn.id !== "btnCustom" && bill) {
      unselectTipBtn();
      btnCustom.value = "";
      btn.classList.add("selected");
      tip = calcTip(bill, Number.parseInt(btn.value) / 100);
    }
  });
});

btnCustom.addEventListener("blur", function () {
  if (bill) {
    const customTip = Number(btnCustom.value) / 100;
    tip = customTip > 0 ? calcTip(bill, customTip) : 0;
  }
  unselectTipBtn();
});

btnReset.addEventListener("click", function () {
  bill = 0;
  tip = 0;
  inputBillAmount.value = "";
  inputPeopleCount.value = "";
  btnCustom.value = "";
  unselectTipBtn();
  elTipAmount.textContent = "$0.00";
  elTotalAmount.textContent = "$0.00";
  inputPeopleCount.classList.remove("error");
  errorMessage.classList.add("hidden");
});

inputPeopleCount.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (bill) {
      const numOfPeople = +inputPeopleCount.value;
      if (numOfPeople <= 0) {
        inputPeopleCount.classList.add("error");
        errorMessage.classList.remove("hidden");
        inputPeopleCount.blur();
      } else {
        inputPeopleCount.classList.remove("error");
        errorMessage.classList.add("hidden");
        elTipAmount.textContent = `$${
          numOfPeople > 0 ? (tip / numOfPeople).toFixed(2) : tip.toFixed(2)
        }`;
        elTotalAmount.textContent = `$${((bill + tip) / numOfPeople).toFixed(2)}`;
        inputPeopleCount.blur();
      }
    }
  }
});
