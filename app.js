const data = [
  {
    id: 1,
    level: 5
  },
  {
    id: 2,
    level: 4
  },
  {
    id: 3,
    level: 3
  },
  {
    id: 4,
    level: 2
  },
  {
    id: 5,
    level: 1
  },
  {
    id: 6,
    level: 0
  }
]

let leftLiftPos = 1;
let rightLiftPos = 0;
let leftLiftControls = 1;
let rightLiftControls = 0
let currentPos;

const building = document.querySelector('.building');
const functionality = document.querySelector('.functionality');

window.addEventListener('DOMContentLoaded', () => {
  displayBuilding();
  displayCallButtons();
  displayLeftLiftButtons(1, true);
  displayRightLiftButtons(0, true);
})

const displayBuilding = () => {

  let floorHTML = ''
  for (let index = 0; index < data.length - 1; index++) {
    floorHTML += `
      <div class="floor">
        <div class="entry--left"></div>
        <div class="entry--right"></div>
      </div>
    `;
  }
  building.innerHTML = `
    <div class="lift--left"></div>
    <div class="lift--right"></div>
    ${floorHTML}
    <div class="floor">
      <div class="entry--right"></div>
    </div>
  `;
}

const displayCallButtons = () => {
  let displayAllButtons = data.map(function (item) {
    return `
      <div class="floor__buttons">
        <div class="call-button-cont">
          <button class="call-button call-button--${item.level}">CALL</button>
        </div>
        <div class="lift-buttons lift-buttons--left lift-buttons--${item.level}--left"></div>
        <div class="lift-buttons lift-buttons--right lift-buttons--${item.level}--right"></div>
      </div>
    `;
  })
  displayAllButtons = displayAllButtons.join('');
  functionality.innerHTML = displayAllButtons;
}

let leftTimer;

const displayLeftLiftButtons = (floor, onload) => {

  let groundFloorDiv = document.querySelector(`.lift-buttons--${floor}--left`);
  let groundFloorButtonsHTML = `
    <button class="lift-floor-button--left" id="lift-floor-button-left--4">3</button>
    <button class="lift-floor-button--left" id="lift-floor-button-left--5">4</button>
    <button class="lift-floor-button--left" id="lift-floor-button-left--2">1</button>
    <button class="lift-floor-button--left" id="lift-floor-button-left--3">2</button>
    <button class="lift-floor-button--left"></button>
    <button class="lift-floor-button--left" id="lift-floor-button-left--1">0</button>
  `;

  if (onload) {
    groundFloorDiv.innerHTML = groundFloorButtonsHTML;
  } else {
    leftTimer = setTimeout(() => {
      groundFloorDiv.innerHTML = groundFloorButtonsHTML;
    }, 1100)
  }

  leftLiftControls = floor;
}

let rightTimer;

const displayRightLiftButtons = (floor, onload) => {

  let minusFloorDiv = document.querySelector(`.lift-buttons--${floor}--right`);
  let minusFloorButtonsHTML = `
    <button class="lift-floor-button--right" id="lift-floor-button-right--4">3</button>
    <button class="lift-floor-button--right" id="lift-floor-button-right--5">4</button>
    <button class="lift-floor-button--right" id="lift-floor-button-right--2">1</button>
    <button class="lift-floor-button--right" id="lift-floor-button-right--3">2</button>
    <button class="lift-floor-button--right" id="lift-floor-button-right--0">-1</button>
    <button class="lift-floor-button--right" id="lift-floor-button-right--1">0</button>
  `;

  if (onload) {
    minusFloorDiv.innerHTML = minusFloorButtonsHTML;
  } else {
    rightTimer = setTimeout(() => {
      minusFloorDiv.innerHTML = minusFloorButtonsHTML;
    }, 1100)
  }

  rightLiftControls = floor;
}

const clearLiftButtons = (side) => {
  const liftButtons = document.querySelectorAll(`.lift-floor-button--${side}`);
  liftButtons.forEach((liftButton) => liftButton.remove())
}

const moveLift = (floor, side) => {
  let lift = document.querySelector(`.lift--${side}`);
  if (side === 'left') {
    lift.style.transform = `translateY(${floor * -100 + 100}px)`;
    leftLiftPos = floor;
  } else if (side === 'right') {
    lift.style.transform = `translateY(${floor * -100}px)`;
    rightLiftPos = floor;
  }
}

const clearTimer = (side) => {
  clearTimeout(side)
}

const alertForLifts = () => {
  alert('lift is already on this level')
}




functionality.addEventListener('click', (e) => {

  for (let index = data[0].level; index >= 1; index--) {

    if (e.target.classList.contains(`call-button--${index}`)) {

      currentPos = index;
      if (leftLiftPos === currentPos || rightLiftPos === currentPos) {
        alertForLifts();
        return;
      }

      let distanceFromLeftLift = currentPos - leftLiftPos;
      if (distanceFromLeftLift < 0) {
        distanceFromLeftLift = distanceFromLeftLift * -1;
      }
      let distanceFromRightLift = currentPos - rightLiftPos;
      if (distanceFromRightLift < 0) {
        distanceFromRightLift = distanceFromRightLift * -1;
      }

      if (distanceFromRightLift <= distanceFromLeftLift) {
        clearTimer(rightTimer)
        clearLiftButtons('right');
        displayRightLiftButtons(index, false);
        moveLift(index, 'right')
      } else {
        clearTimer(leftTimer);
        clearLiftButtons('left');
        displayLeftLiftButtons(index, false)
        moveLift(index, 'left')
      }
    }

    switch (e.target.id) {
      case `lift-floor-button-left--${index}`:
        currentPos = index;
        if (leftLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        if (currentPos === rightLiftPos) {
          clearTimer(leftTimer);
          clearLiftButtons('left');
          displayLeftLiftButtons(index, false);
          moveLift(index, 'left');
          return;
        }
        clearTimer(leftTimer);
        clearLiftButtons('left');
        displayLeftLiftButtons(index, false);
        moveLift(index, 'left');
        break;

      case `lift-floor-button-right--${index}`:
        currentPos = index;
        if (rightLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        if (currentPos === leftLiftPos) {
          clearTimer(rightTimer);
          clearLiftButtons('right');
          displayRightLiftButtons(index, false);
          moveLift(index, 'right');
          return;
        }
        clearTimer(rightTimer);
        clearLiftButtons('right');
        displayRightLiftButtons(index, false);
        moveLift(index, 'right');
        break;
    }

  }

  if (e.target.classList.contains(`call-button--0`) || (e.target.id === 'lift-floor-button-right--0')) {

    currentPos = 0;
    if (rightLiftPos === currentPos) {
      alertForLifts();
      return;
    }

    clearTimer(rightTimer);
    clearLiftButtons('right');
    displayRightLiftButtons(0, false);
    moveLift(0, 'right')
  }
})
















