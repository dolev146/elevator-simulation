const data = [
  {
    id: 1,
    level: 4
  },
  {
    id: 2,
    level: 3
  },
  {
    id: 3,
    level: 2
  },
  {
    id: 4,
    level: 1
  },
  {
    id: 5,
    level: 0
  },
  {
    id: 6,
    level: -1
  }

]

const building = document.querySelector('.building');
const functionality = document.querySelector('.functionality');

window.addEventListener('DOMContentLoaded', () => {
  displayBuilding();
  displayCallButtons();
  displayGroundFloorButtons()
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

const displayGroundFloorButtons = () => {
  let groundFloorDiv = document.querySelector('.lift-buttons--0');
  let groundFloorButtons = `
    <button class="lift-floor-button" id="level-0--3">3</button>
    <button class="lift-floor-button" id="level-0--4">4</button>
    <button class="lift-floor-button" id="level-0--1">1</button>
    <button class="lift-floor-button" id="level-0--2">2</button>
    <button class="lift-floor-button" id="level-0---1">-1</button>
    <button class="lift-floor-button" id="level-0--0">0</button>
  `
  groundFloorDiv.innerHTML = groundFloorButtons;
}

const clearLiftButtons = () => {
  const buttonControls = document.querySelectorAll('.lift-floor-button');
  buttonControls.forEach((buttonControl) => {

    buttonControl.remove();
  })
}

let timer;

const displaysLiftButtons = (floor) => {
  timer = setTimeout(() => {
    let currentFloorLiftButtonDiv = document.querySelector(`.lift-buttons--${floor}`)
    currentFloorLiftButtonDiv.innerHTML = `
    <button class="lift-floor-button" id="level-${floor}--3">3</button>
    <button class="lift-floor-button" id="level-${floor}--4">4</button>
    <button class="lift-floor-button" id="level-${floor}--1">1</button>
    <button class="lift-floor-button" id="level-${floor}--2">2</button>
    <button class="lift-floor-button" id="level-${floor}---1">-1</button>
    <button class="lift-floor-button" id="level-${floor}--0">0</button>
  `
  }, 1100)
}

const clearTimer = () => {
  clearTimeout(timer)
}



functionality.addEventListener('click', (e) => {

  const sendLeftLift = (floorRequest) => {
    let lefty = e.target.parentNode.parentNode.parentNode.previousElementSibling.children[0];
    lefty.style.transform = `translateY(${floorRequest * -100}px)`;
  }

  const moveLiftControls = (floor) => {

    const liftButtonz = document.querySelector(`.lift-buttons--${floor}`);
    if (liftButtonz.children.length === data.length) {
      alert(`lift is already on this level (${floor})`)
    } else {
      clearLiftButtons();
      clearTimer();
      displaysLiftButtons(floor);
    }
  }

  for (let index = data[0].level; index >= data[data.length - 1].level; index--) {
    if (e.target.classList.contains(`call-button--${index}`)) {
      moveLiftControls(index);
      sendLeftLift(index);
    }

    switch (e.target.id) {
      case `level-${index}--4`:
        sendLeftLift(4);
        moveLiftControls(4);
        break;
      case `level-${index}--3`:
        sendLeftLift(3);
        moveLiftControls(3);
        break;
      case `level-${index}--2`:
        sendLeftLift(2);
        moveLiftControls(2);
        break;
      case `level-${index}--1`:
        sendLeftLift(1);
        moveLiftControls(1)
        break;
      case `level-${index}--0`:
        sendLeftLift(0);
        moveLiftControls(0);
        break;
      case `level-${index}---1`:
        sendLeftLift(-1);
        moveLiftControls(-1);
        break;
    }
  }

})













