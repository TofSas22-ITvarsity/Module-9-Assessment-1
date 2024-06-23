//Needs to find current time 
//and set an end time (current + time = end time)
//app must refresh every 1000ms so see seconds shifting

document.getElementById("start").addEventListener('click', startTimer);
document.getElementById("cancel").addEventListener('click', cancelTimer);

let startTime;
let endTime;
let origTimePeriod;
let newTimePeriod;
let timer;
let cancelled = false;

function startTimer() {
    cancelled = false;
    startTime = new Date();
    endTime = getEndTime();

    origTimePeriod = endTime.getTime() - startTime.getTime();
    newTimePeriod = origTimePeriod;
    timer = setInterval(displayCountdown, 1000);
}

function cancelTimer() {
    cancelled = true;
}

function displayCountdown() {
    let timeLeft = msToTime(newTimePeriod);

    document.getElementById("clock").innerHTML = `<p>${timeLeft["hour"]}h ${timeLeft["mins"]}m ${timeLeft["secs"]}s</p>`;

    let newHeight = Math.floor(newTimePeriod / origTimePeriod * 100) * 3;
    document.getElementById("progressBar").setAttribute("height", newHeight);

    newTimePeriod -= 1000;

    if (newTimePeriod < 0 || cancelled) {
        clearInterval(timer);
        document.getElementById("clock").innerHTML = "<p>Complete!</p>";
    }
}

function msToTime(milliseconds) {
    let mHour = 1000 * 60 * 60;
    let mMins = 1000 * 60;
    let mSecs = 1000;

    let hour = Math.floor(milliseconds / mHour);
    let mins = Math.floor((milliseconds % mHour) / mMins);
    let secs = Math.floor((milliseconds % mMins) / mSecs);

    let time = [];
    time["hour"] = hour;
    time["mins"] = mins;
    time["secs"] = secs;

    return time;
}

function getEndTime() {
    let dT = new Date();

    let hours = parseInt(document.getElementById("hours").value);
    let minutes = parseInt(document.getElementById("minutes").value);
    let seconds = parseInt(document.getElementById("seconds").value);

    dT.setHours(dT.getHours() + hours);
    dT.setMinutes(dT.getMinutes() + minutes);
    dT.setSeconds(dT.getSeconds() + seconds);
    return dT;
};