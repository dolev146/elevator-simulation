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
  building.innerHTML = `
    <div class="lift--left"></div>
    <div class="lift--right"></div>
    <div class="floor">
      <div class="entry--left"></div>
      <div class="entry--right"></div>
    </div>
    <div class="floor">
      <div class="entry--left"></div>
      <div class="entry--right"></div>
    </div>
    <div class="floor">
      <div class="entry--left"></div>
      <div class="entry--right"></div>
    </div>
    <div class="floor">
      <div class="entry--left"></div>
      <div class="entry--right"></div>
    </div>
    <div class="floor">
      <div class="entry--left"></div>
      <div class="entry--right"></div>
    </div>
    <div class="floor">
      <div class="entry--right"></div>
    </div>
  `
}

const displayCallButtons = () => {
  let displayAllButtons = data.map(function (item) {
    return `
      <div class="floor__buttons">
        <div class="call-button-cont">
          <button class="call-button call-button--${item.level}">CALL</button>
        </div>
        <div class="lift-buttons lift-buttons--${item.level}"></div>
      </div>
    `
  })
  displayAllButtons = displayAllButtons.join('');
  functionality.innerHTML = displayAllButtons;

}

let leftTimer;

const displayLeftLiftButtons = (floor, initial) => {

  if (initial === false) {
    leftTimer = setTimeout(() => {
      let groundFloorDiv = document.querySelector(`.lift-buttons--${floor}`);
      let groundFloorButtons = `
        <button class="lift-floor-button--left" id="lift-floor-button-left--4">3</button>
        <button class="lift-floor-button--left" id="lift-floor-button-left--5">4</button>
        <button class="lift-floor-button--left" id="lift-floor-button-left--2">1</button>
        <button class="lift-floor-button--left" id="lift-floor-button-left--3">2</button>
        <button class="lift-floor-button--left"></button>
        <button class="lift-floor-button--left" id="lift-floor-button-left--1">0</button>
      `
      groundFloorDiv.innerHTML = groundFloorButtons;
      leftLiftControls = floor;
    }, 1100)

  } else {
    let groundFloorDiv = document.querySelector(`.lift-buttons--${floor}`);
    let groundFloorButtons = `
      <button class="lift-floor-button--left" id="lift-floor-button-left--4">3</button>
      <button class="lift-floor-button--left" id="lift-floor-button-left--5">4</button>
      <button class="lift-floor-button--left" id="lift-floor-button-left--2">1</button>
      <button class="lift-floor-button--left" id="lift-floor-button-left--3">2</button>
      <button class="lift-floor-button--left"></button>
      <button class="lift-floor-button--left" id="lift-floor-button-left--1">0</button>
    `
    groundFloorDiv.innerHTML = groundFloorButtons;
    leftLiftControls = floor;
  }


}

const clearLeftLiftButtons = () => {
  const leftLiftButtons = document.querySelectorAll('.lift-floor-button--left');
  leftLiftButtons.forEach((leftLiftButton) => {
    leftLiftButton.remove()
  })
}

let rightTimer;

const displayRightLiftButtons = (floor, initial) => {

  if (initial === false) {
    rightTimer = setTimeout(() => {
      let minusFloorDiv = document.querySelector(`.lift-buttons--${floor}`);
      let minusFloorButtons = `
        <button class="lift-floor-button--right" id="lift-floor-button-right--4">3</button>
        <button class="lift-floor-button--right" id="lift-floor-button-right--5">4</button>
        <button class="lift-floor-button--right" id="lift-floor-button-right--2">1</button>
        <button class="lift-floor-button--right" id="lift-floor-button-right--3">2</button>
        <button class="lift-floor-button--right" id="lift-floor-button-right--0">-1</button>
        <button class="lift-floor-button--right" id="lift-floor-button-right--1">0</button>
      `
      minusFloorDiv.innerHTML = minusFloorButtons;
      rightLiftControls = floor;
    }, 1100)

  } else {
    let minusFloorDiv = document.querySelector(`.lift-buttons--${floor}`);
    let minusFloorButtons = `
      <button class="lift-floor-button--right" id="lift-floor-button-right--4">3</button>
      <button class="lift-floor-button--right" id="lift-floor-button-right--5">4</button>
      <button class="lift-floor-button--right" id="lift-floor-button-right--2">1</button>
      <button class="lift-floor-button--right" id="lift-floor-button-right--3">2</button>
      <button class="lift-floor-button--right" id="lift-floor-button-right--0">-1</button>
      <button class="lift-floor-button--right" id="lift-floor-button-right--1">0</button>
    `
    minusFloorDiv.innerHTML = minusFloorButtons;
    rightLiftControls = floor;
  }

}

const clearRightLiftButtons = () => {
  const rightLiftButtons = document.querySelectorAll('.lift-floor-button--right');
  rightLiftButtons.forEach((rightLiftButton) => {
    rightLiftButton.remove()
  })
}

const clearTimer = (side) => {
  clearTimeout(side)
}



functionality.addEventListener('click', (e) => {

  const moveLeftLift = (floor) => {
    let lefty = document.querySelector('.lift--left');
    lefty.style.transform = `translateY(${floor * -100 + 100}px)`;
    leftLiftPos = floor;
  }

  const moveRightLift = (floor) => {
    let righty = document.querySelector('.lift--right');
    righty.style.transform = `translateY(${floor * -100}px)`;
    rightLiftPos = floor;
  }

  for (let index = data[0].level; index >= 1; index--) {

    if (e.target.classList.contains(`call-button--${index}`)) {

      currentPos = index;
      let distanceFromLeftLift = currentPos - leftLiftPos;
      if (distanceFromLeftLift < 0) {
        distanceFromLeftLift = distanceFromLeftLift * -1;
      }
      let distanceFromRightLift = currentPos - rightLiftPos;
      if (distanceFromRightLift < 0) {
        distanceFromRightLift = distanceFromRightLift * -1;
      }

      if (distanceFromLeftLift <= distanceFromRightLift) {
        clearTimer(leftTimer)
        clearLeftLiftButtons();
        displayLeftLiftButtons(index, false);
        moveLeftLift(index)
      } else {
        clearTimer(rightTimer);
        clearRightLiftButtons();
        displayRightLiftButtons(index, false)
        moveRightLift(index)
      }
    }

    switch (e.target.id) {
      case `lift-floor-button-left--${index}`:
        clearTimer(leftTimer);
        clearLeftLiftButtons();
        displayLeftLiftButtons(index, false);
        moveLeftLift(index);
        break;
      case `lift-floor-button-right--${index}`:
        clearTimer(rightTimer);
        clearRightLiftButtons();
        displayRightLiftButtons(index, false);
        moveRightLift(index);
        break;
    }

  }

  if (e.target.classList.contains(`call-button--0`) || (e.target.id === 'lift-floor-button-right--0')) {
    clearTimer(rightTimer);
    clearRightLiftButtons();
    displayRightLiftButtons(0, false);
    moveRightLift(0)
  }

})
















