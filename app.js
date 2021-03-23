// general comment: you should try and seperate some of this stuff into different files,
// heres no need for looking at this to involve so much scrolling


const numOfFloors = 4;
let leftLiftPos = 0;
let rightLiftPos = -1;
let leftLiftControls = 0;
let rightLiftControls = -1;
let currentPos;

const building = document.querySelector('.building');
const functionality = document.querySelector('.functionality');
const controlPanel = document.querySelector('.control-panel');

window.addEventListener('DOMContentLoaded', () => {
  displayBuilding();
  displayCallButtons();
  displayLiftFloorButtons(0, 'left', true);
  displayLiftFloorButtons(-1, 'right', true);
});

// put in its own file
// so considerations for that, you could import `data` to do that...
// OR you could also paramterize the amount of floors (excluding the basement floor) in order to make it a bit more dynamic

const displayBuilding = () => {
  let floorHTML = '';
  for (let index = numOfFloors; index >= 0; index--) {
    floorHTML += `
      <div class="floor">
        <div class="entry entry--left">
          <div class="door door--left"></div>
        </div>
        <div class="floor-num">${index}</div>
        <div class="entry entry--right">
          <div class="door door--left"></div>
        </div>
      </div>
    `;
  }
  building.innerHTML = `
    <div class="building-text-cont">
      <h2>Building</h2>
      <div class="side-cont side-cont--building">
        <p id="side-left--building">Left</p>
        <p id="side-right--building">Right</p>
      </div>
    </div>
    <div class="lift lift--left">
      <div class="door door--left"></div>
    </div>
    <div class="lift lift--right">
      <div class="door door--right"></div>
    </div>
    ${floorHTML}
    <div class="floor">
      <div class="floor-num">-1</div>
      <div class="entry entry--right">
        <div class="door door--right"></div>
      </div>
    </div>
  `;

  // return the html as a string instead and then do the building.innerHTML stuff in the main file
};

const displayCallButtons = () => {

  let displayAllButtonsHTML = '';
  for (let index = numOfFloors; index >= -1; index--) {
    displayAllButtonsHTML += `
      <div class="floor__buttons">
        <div class="call-button-cont">
          <button class="call-button call-button--${index}">CALL</button>
        </div>
        <div class="lift-buttons lift-buttons--left lift-buttons--${index}--left"></div>
        <div class="lift-buttons lift-buttons--right lift-buttons--${index}--right"></div>
      </div>
    `;
  }
  controlPanel.innerHTML = displayAllButtonsHTML;
};

let leftControlsTimer;
let rightControlsTimer;
const displayLiftFloorButtons = (floor, side, onload) => {
  let floorButtonsDiv = document.querySelector(`.lift-buttons--${floor}--${side}`);
  let floorButtonsInnerHTML = `
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--3">3</button>
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--4">4</button>
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--1">1</button>
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--2">2</button>
    <button class="lift-floor-button--${side}" id=${side === 'left' ? '' : "lift-floor-button-right---1"}>${side === 'left' ? '' : '-1'}</button>
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--0">0</button>
  `;
  if (onload) {
    floorButtonsDiv.innerHTML = floorButtonsInnerHTML;
  } else {
    if (side === 'left') {
      leftControlsTimer = setTimeout(() => {
        floorButtonsDiv.innerHTML = floorButtonsInnerHTML; // can you explain this bit to me
      }, 1000);
      leftLiftControls = floor;
    } else if (side === 'right') {
      rightControlsTimer = setTimeout(() => {
        floorButtonsDiv.innerHTML = floorButtonsInnerHTML;
      }, 1000);
      rightLiftControls = floor;
    }
  }
};

const clearLiftButtons = (side) => {
  const liftButtons = document.querySelectorAll(`.lift-floor-button--${side}`);
  liftButtons.forEach((liftButton) => liftButton.remove());
};

let leftOpacFade;
let rightOpacFade;
const moveLift = (floor, side) => {
  let lift = document.querySelector(`.lift--${side}`);
  lift.style.opacity = '0.4';

  if (side === 'left') {
    lift.style.transform = `translateY(${floor * -100}px)`;
    leftOpacFade = setTimeout(() => {
      lift.style.opacity = '1';
    }, 1000);
    leftLiftPos = floor;

  } else if (side === 'right') {
    if (floor === 0) {
      lift.style.transform = 'translateY(-100px)';
      rightOpacFade = setTimeout(() => {
        lift.style.opacity = '1';
      }, 1000);
    } else {
      lift.style.transform = `translateY(${(floor * -100) - 100}px)`;
      rightOpacFade = setTimeout(() => {
        lift.style.opacity = '1';
      }, 1000);
    }
    rightLiftPos = floor;
  }
};

const clearOpacTimer = (side) => {
  clearTimeout(side);
};

const clearControlsTimer = (side) => {
  clearTimeout(side);
};

const alertForLifts = () => {
  alert('There is already a lift available on this floor.');
};



functionality.addEventListener('click', (e) => {
  // this callback can be a named function which can be imported from another file
  for (let index = numOfFloors; index >= -1; index--) {
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

      if (distanceFromRightLift <= distanceFromLeftLift || currentPos === -1) {
        clearOpacTimer(rightOpacFade);
        clearControlsTimer(rightControlsTimer);
        clearLiftButtons('right');
        displayLiftFloorButtons(index, 'right', false);
        moveLift(index, 'right');
      } else {
        clearOpacTimer(leftOpacFade);
        clearControlsTimer(leftControlsTimer);
        clearLiftButtons('left');
        displayLiftFloorButtons(index, 'left', false);
        moveLift(index, 'left');
      }
    }

    switch (e.target.id) {
      case `lift-floor-button-left--${index}`:
        currentPos = index;
        if (leftLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        clearOpacTimer(leftOpacFade);
        clearControlsTimer(leftControlsTimer);
        clearLiftButtons('left');
        displayLiftFloorButtons(index, 'left', false);
        moveLift(index, 'left');
        break;

      case `lift-floor-button-right--${index}`:
        currentPos = index;
        if (rightLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        clearOpacTimer(rightOpacFade);
        clearControlsTimer(rightControlsTimer);
        clearLiftButtons('right');
        displayLiftFloorButtons(index, 'right', false);
        moveLift(index, 'right');
        break;
    }
  }

});
