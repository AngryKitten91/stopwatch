timerNames = [];


const addBtn = document.getElementById('js-addBtn');
addBtn.addEventListener('click', function () {
    let msgBox = document.querySelector('.c-box__msg');

    let inputValue = this.parentElement.children[0].value;
    let isNameUsed = timerNames.some(elem => elem === inputValue);
    if (!isNameUsed && inputValue) {
        timerNames.push(inputValue);
        msgBox.children[0].classList.add('u-fadeIn');
        msgBox.children[0].innerText = 'Timer added successfully :)';
        setTimeout(() => {
            msgBox.children[0].classList.remove('u-fadeIn');
            msgBox.children[0].classList.add('u-fadeOut');
        }, 2000);
        return new Timer(inputValue);
    } else if (!inputValue) {
        msgBox.children[1].classList.add('u-fadeIn');
        msgBox.children[1].innerText = 'Please enter timer name.';
        setTimeout(() => {
            msgBox.children[1].classList.remove('u-fadeIn');
            msgBox.children[1].classList.add('u-fadeOut');
        }, 2000);
    } else {
        msgBox.children[1].classList.add('u-fadeIn');
        msgBox.children[1].innerText = 'Name already exists, please enter different name.';
        setTimeout(() => {
            msgBox.children[1].classList.remove('u-fadeIn');
            msgBox.children[1].classList.add('u-fadeOut');
        }, 2000);
    }
});




function Timer(name) {
    this.name = name;
    this.nameId = this.name.replace(' ', '_')
    this.time = 0;
    this.interval = false;
    this.buttonNames = ['Start', 'Stop', 'Reset'];
    this.prepareDOM();
};

Timer.prototype.prepareDOM = function () {
    const stoperContent = document.querySelector('.js-timer');
    let stoperWrapper = createElementAddClasses('div', 'c-timer');


    let stoperTop = createElementAddClasses('div', 'o-flex', 'o-flex--spaceBetween');
    let stoperName = createElementAddClasses('div', 'c-timer__name', 'o-flex__item');
    stoperName.innerText = this.name;
    let stoperShut = createElementAddClasses('div', 'c-button', 'o-flex__item', 'c-timer__buttons', 'c-button--close');
    stoperShut.innerText = 'X';
    stoperShut.addEventListener('click', (event) => {
        this.stop();
        let timerNameIndex = timerNames.indexOf(this.name);
        timerNames.splice(timerNameIndex, 1);
        let toDelete = event.target.parentElement.parentElement;
        toDelete.parentElement.removeChild(toDelete);
    });
    stoperTop.append(stoperName, stoperShut)


    let stoperValue = createElementAddClasses('div', 'c-timer__value');
    stoperValue.id = this.nameId;
    stoperValue.innerText = countTime(this.time);

    let stoperButtons = createElementAddClasses('div', 'o-flex', 'c-timer__buttons', 'o-flex--center');
    this.buttonNames.forEach((buttonName) => {
        let elem = createElementAddClasses('div', 'c-button', 'o-flex__item');
        elem.innerText = buttonName;
        if (buttonName === 'Start') {
            elem.addEventListener('click', (event) => {
                if (this.interval === false) {
                    this.start();
                };
            });
        } else if (buttonName === 'Stop') {
            elem.addEventListener('click', (event) => {
                this.stop();
            });
        } else if (buttonName === 'Reset') {
            elem.addEventListener('click', (event) => {
                this.reset();
            });
        }

        stoperButtons.append(elem);

    });
    stoperWrapper.append(stoperTop, stoperValue, stoperButtons);
    stoperContent.append(stoperWrapper);
};

Timer.prototype.render = function (resetValue) {
    if (resetValue !== 'reset' && resetValue === undefined) {
        this.time++
    }
    let time = countTime(this.time);
    let timerValue = document.getElementById(this.nameId);
    timerValue.innerText = time;
};

Timer.prototype.start = function () {
    this.interval = setInterval(this.render.bind(this), 1000);
};

Timer.prototype.stop = function () {
    clearInterval(this.interval);
    this.interval = false;
};

Timer.prototype.reset = function () {
    clearInterval(this.interval);
    this.interval = false;
    this.time = 0;
    this.render('reset');
};


function countTime(time) {
    const hourseconds = 60 * 60;
    const minuteSeconds = 60;
    let hours = Math.floor(time / hourseconds);
    let minutes = Math.floor(time % hourseconds / minuteSeconds);
    let sec = Math.floor(time % hourseconds % minuteSeconds);

    return `${addZeroOrNot(hours)}:${addZeroOrNot(minutes)}:${addZeroOrNot(sec)}`;
}


function addZeroOrNot(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

function createElementAddClasses(element, ...classes) {
    let elem = document.createElement(element);
    elem.classList.add(...classes);
    return elem;
}