
initializeCounter();

function initializeCounter() {
    document.querySelector('.counter-value').textContent = '0';
}

function incrementCounter () {
    let value = getValue();
    setValue(++value);
}

function decrementCounter () {
    let value = getValue();
    setValue(value === 0 ? 0 : --value);
}

function resetCounter () {
    setValue(0);
}

function getValue() {
    return Number(document.querySelector('.counter-value').textContent);
}

function setValue(value) {
    document.querySelector('.counter-value').textContent =value;
}

