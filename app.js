const broadcast = new BroadcastChannel('my-channel');

document.addEventListener('DOMContentLoaded', () => {
    ShowCounter(GetCounter());
    document.getElementById('increase').addEventListener('click', Increase);
    document.getElementById('decrease').addEventListener('click', Decrease);

});

function Increase() {
    let counter = GetCounter();
    counter++;
    SetCounter(counter);
    ShowCounter(counter);
    broadcast.postMessage('increase');
}
function Decrease() {
    let counter = GetCounter();
    counter--;
    SetCounter(counter);
    ShowCounter(counter);
    broadcast.postMessage('decrease');
}

function GetCounter() {
    let counter = window.localStorage.getItem('counter');

    if (counter == null) {
        return 0;
    }
    return parseInt(counter);
}
function SetCounter(value) {
    window.localStorage.setItem('counter', value);
}
function ShowCounter(counter) {
    document.getElementById('counter').innerText = counter;
}

broadcast.addEventListener('message', () => {
    let counter = GetCounter();
    ShowCounter(counter);
});