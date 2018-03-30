'use strict';
(function() {
  const task = document.querySelector('.task');
  const firstInput = document.querySelector('.answer-a');
  const secondInput = document.querySelector('.answer-b');
  const firstNum = document.querySelector('.first-number');
  const secondNum = document.querySelector('.second-number');
  const question = document.querySelector('.question');
  const thirdInput = document.querySelector('.answer-summ');

  const a = getRandomInRange(6, 9);
  const summ = getRandomInRange(11, 14);
  const b = summ - a;
  const sm = 39;
  const length1 = a * sm;
  const length2 = b * sm;
  let offset = 0;

  function drawArrow(length) {

    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const bottomY = 200;
      const contolY = 150 - length / 4;
      const controlX = offset + length / 2;
      const endX = offset + length;
      const arrowRightY = 185;
      const arrowLeftY = 194;
      const arrowRightX = endX - 5;
      const arrowLeftX = endX - 15;

      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(offset, bottomY);
      ctx.quadraticCurveTo(controlX, contolY, endX, bottomY);
      ctx.moveTo(endX, bottomY);
      ctx.lineTo(arrowRightX, arrowRightY)
      ctx.moveTo(endX, bottomY);
      ctx.lineTo(arrowLeftX, arrowLeftY)
      ctx.strokeStyle = '#e01414';

      ctx.stroke();
    }
    offset += length;
  }

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function displayTask(a, b) {
    firstNum.textContent = a;
    secondNum.textContent = b;
    task.style.display = 'block';
  }

  function onError(input, span) {
    input.style.color = 'red';
    if (span) {
      span.style.background = '#ffd600';
    }
  }

  function onSucsess(input, span, nextInput, length) {
    input.disabled = true;
    input.style.color = '#000';

    if (span) {
      span.style.background = 'transparent';
    }

    if (nextInput) {
      activateInput(nextInput, length)
    }
  }

  function onFirstInputChange() {
    if (this.value === a.toString()) {
      onSucsess(this, firstNum, secondInput, length2);
      drawArrow(length2);
      return
    }
    onError(this, firstNum);
  }

  function onSecondInputChange() {

    if (this.value === b.toString()) {
      onSucsess(this, secondNum, thirdInput);
      task.removeChild(question);
      return
    }
    onError(this, secondNum);
  }

  function onThirdInputChange() {
    if (this.value === summ.toString()) {
      onSucsess(this);
      return
    }
    onError(this);
  }

  function activateInput(input, length) {
    input.style.display = 'inline-block';
    input.focus();
    if (getComputedStyle(input).position === 'absolute') {
      input.style.top = -length / 4 - input.offsetHeight + 'px';
      input.style.left = (35 + offset + length / 2) - (input.offsetWidth / 2) + 'px';
    }
  }

  displayTask(a, b);
  setTimeout(function() {
    activateInput(firstInput, length1);
    drawArrow(length1);
  }, 1000);

  firstInput.addEventListener('change', onFirstInputChange);
  secondInput.addEventListener('change', onSecondInputChange);
  thirdInput.addEventListener('change', onThirdInputChange);
})();
