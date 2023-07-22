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

// // notification toast variables
// const notificationToast = document.querySelector("[data-toast]");
// const toastCloseBtn = document.querySelector("[data-toast-close]");

// // notification toast eventListener
// toastCloseBtn.addEventListener("click", function () {
//     notificationToast.classList.add("closed");
// });

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
const discount = {
    day: 360,
    hours: 24,
    min: 60,
    sec: 60,
};

function countDown({ day, hours, min, sec }) {
    let appendDay = document.querySelector("#day");
    let appendHours = document.querySelector("#hours");
    let appendMin = document.querySelector("#min");
    let appendSec = document.querySelector("#sec");

    const endDate = new Date().getTime() + day * hours * min * sec * 1000;

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = endDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        appendDay.innerText = days;
        appendHours.innerText = hours;
        appendMin.innerText = minutes;
        appendSec.innerText = seconds;

        if (timeRemaining < 0) {
            clearInterval(updateTimer);
            appendDay.innerText = "0";
            appendHours.innerText = "0";
            appendMin.innerText = "0";
            appendSec.innerText = "0";
        }
    }, 1000);
}

countDown({ ...discount });

// Lặp qua các khối mã HTML và gọi hàm countDown cho từng khối
const countdownBlocks = document.querySelectorAll(".countdown-block");
countdownBlocks.forEach((block) => {
    countDown(block, { ...discount });
});

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
