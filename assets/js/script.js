"use strict";

// modal variables
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

// modal function
const modalCloseFunc = function () {
    modal.classList.add("closed");
};

// modal eventListener
modalCloseOverlay.addEventListener("click", modalCloseFunc);
modalCloseBtn.addEventListener("click", modalCloseFunc);

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll(
    "[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
    "[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    // mobile menu function
    const mobileMenuCloseFunc = function () {
        mobileMenu[i].classList.remove("active");
        overlay.classList.remove("active");
    };

    mobileMenuOpenBtn[i].addEventListener("click", function () {
        mobileMenu[i].classList.add("active");
        overlay.classList.add("active");
    });

    mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
    overlay.addEventListener("click", mobileMenuCloseFunc);
}

// accordion variables
const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");

for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function () {
        const clickedBtn = this.nextElementSibling.classList.contains("active");

        for (let i = 0; i < accordion.length; i++) {
            if (clickedBtn) break;

            if (accordion[i].classList.contains("active")) {
                accordion[i].classList.remove("active");
                accordionBtn[i].classList.remove("active");
            }
        }

        this.nextElementSibling.classList.toggle("active");
        this.classList.toggle("active");
    });
}

// Count down
function updateCountdown(countdownElement, targetDate) {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        // If the target date has passed, display 0 for all countdown elements
        countdownElement
            .querySelectorAll(".display-number")
            .forEach((element) => {
                element.textContent = "0";
            });
        return;
    }

    // Calculate the days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the countdown elements with the calculated values
    countdownElement.querySelector(".day.display-number").textContent = days;
    countdownElement.querySelector(".hours.display-number").textContent = hours;
    countdownElement.querySelector(".min.display-number").textContent = minutes;
    countdownElement.querySelector(".sec.display-number").textContent = seconds;
}

// Set the target date for each countdown (change these to your desired dates)
const countdownElements = document.querySelectorAll(".countdown");
const targetDates = [
    new Date("2023-08-01 00:00:00").getTime(),
    new Date("2023-09-15 12:00:00").getTime(),
    new Date("2023-12-31 23:59:59").getTime(),
];

// Function to update all countdowns
function updateAllCountdowns() {
    for (let i = 0; i < countdownElements.length; i++) {
        updateCountdown(countdownElements[i], targetDates[i]);
    }
}

// Initial update
updateAllCountdowns();

// Update all countdowns every second (1000 milliseconds)
setInterval(updateAllCountdowns, 1000);

//open Modal

const modalLogin = document.getElementById("myModal");
const btnOpenModal = document.getElementById("openModalBtn");

btnOpenModal.onclick = function () {
    modalLogin.style.display = "block";
    modalLogin.classList.add("fade-in");
};

window.onclick = function (event) {
    if (
        event.target === modalLogin ||
        event.target.classList.contains("modal-close")
    ) {
        modalLogin.style.display = "none";
    }
};

document.onkeydown = function (event) {
    if (event.key === "Escape") {
        modalLogin.style.display = "none";
    }
};

// Clear value input search
const clear = document.querySelector(".clear");
const inputSearch = document.querySelector(".search-field");

const handleClearInput = () => {
    inputSearch.value = "";
    inputSearch.focus();
};

// setInterval(() => {
//     if (inputSearch.value.trim() === "") {
//         clear.style.display = "none";
//     } else {
//         clear.style.display = "inline-block";
//     }
// }, 10);

// Handle clear toast
clear.addEventListener("click", handleClearInput);

const toasts = document.querySelectorAll(".notification-toast");

const closeButtons = document.querySelectorAll("[data-toast-close]");

closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const parentToast = this.closest(".notification-toast");
        parentToast.classList.add("closed");
    });
});

let currentToastIndex = 0;

function showNextToast() {
    toasts.forEach((toast) => {
        toast.classList.add("closed");
    });

    toasts[currentToastIndex].classList.remove("closed");
    currentToastIndex = (currentToastIndex + 1) % toasts.length;
}

showNextToast();

function showNextToastDelayed() {
    showNextToast();
    setTimeout(showNextToastDelayed, 10000);
}

showNextToastDelayed();
