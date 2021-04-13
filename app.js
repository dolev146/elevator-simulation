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
  building.innerHTML = displayBuilding(numOfFloors);
  displayCallButtons();
  displayLiftFloorButtons(0, 'left', true);
  displayLiftFloorButtons(-1, 'right', true);
});


const displayBuilding = (numOfFloors) => {
  let floorHTML = '';
  for (let index = numOfFloors; index >= 0; index--) {
    floorHTML += `
      <div class="floor">
        <div class="entry entry--left">
          <div class="door door--left"></div>
        </div>
        <div class="floor-num-cont">
          <div class="floor-num">${index}</div>
        </div>
        <div class="entry entry--right">
          <div class="door door--left"></div>
        </div>
      </div>
    `;
  }
  return `
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
      <div class="floor-num-cont">
        <div class="floor-num">-1</div>
      </div>
      <div class="entry entry--right">
        <div class="door door--right"></div>
      </div>
    </div>
  `;
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
    <button class="lift-floor-button--${side}" ${side === 'left' ? '' : 'id="lift-floor-button-right---1"'}>${side === 'left' ? '' : '-1'}</button>
    <button class="lift-floor-button--${side}" id="lift-floor-button-${side}--0">0</button>
  `;
  if (onload) {
    floorButtonsDiv.innerHTML = floorButtonsInnerHTML;
  } else {
    if (side === 'left') {
      leftControlsTimer = setTimeout(() => {
        floorButtonsDiv.innerHTML = floorButtonsInnerHTML;
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

const alertForLifts = () => {
  alert('There is already a lift available on this floor.');
};

const moveLiftWithControls = (index, side) => {
  if (side === 'left') {
    clearTimeout(leftControlsTimer);
    clearTimeout(leftOpacFade);
  } else {
    clearTimeout(rightControlsTimer);
    clearTimeout(rightOpacFade);
  }
  moveLift(index, `${side}`);
  displayLiftFloorButtons(index, `${side}`, false);
  clearLiftButtons(`${side}`);
}


const functionalityHandler = (e) => {
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
        moveLiftWithControls(index, 'right');
      } else {
        moveLiftWithControls(index, 'left');
      }
    }

    switch (e.target.id) {
      case `lift-floor-button-left--${index}`:
        currentPos = index;
        if (leftLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        moveLiftWithControls(index, 'left');
        break;

      case `lift-floor-button-right--${index}`:
        currentPos = index;
        if (rightLiftPos === currentPos) {
          alertForLifts();
          return;
        }
        moveLiftWithControls(index, 'right');
        break;
    }
  }
}

functionality.addEventListener('click', functionalityHandler);

// ------------------- modal ---------------------

let modal = document.querySelector('.modal');
let infoBtn = document.querySelector('.info-btn');
let closeBtn = document.querySelector('.close');

const showModal = () => {
  modal.style.display = 'block';
}

const closeModal = () => {
  modal.style.display = 'none';
}

infoBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
})





