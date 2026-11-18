
// SECTION SCROLL ANIMATION

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// WEDDING COUNTDOWN

function updateCountdown() {

    const target = new Date(2026, 11, 10, 10, 0, 0).getTime();

    const now = Date.now();

    let diff = Math.max(0, target - now);

    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;

    const days = Math.floor(diff / day);

    diff = diff % day;

    const hours = Math.floor(diff / hour);

    diff = diff % hour;

    const minutes = Math.floor(diff / minute);

    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown, 1000);


// BACKGROUND MUSIC

const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;

async function startMusic(event) {

    if (musicStarted) return;

    if (event.target.closest("#musicToggle")) return;

    try {
        await music.play();
        musicStarted = true;
        musicToggle.textContent = "♫ Music On";
    } catch (error) {
        console.log("Music could not start:", error);
    }
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic, { once: true });


musicToggle.addEventListener("click", async function(event) {

    event.stopPropagation();

    if (music.paused) {
        try {
            await music.play();
            musicStarted = true;
            musicToggle.textContent = "♫ Music On";
        } catch (error) {
            musicToggle.textContent = "♫ Play Music";
        }
    } else {
        music.pause();
        musicToggle.textContent = "♫ Play Music";
    }
});

/* =========================================
   FINAL CURTAIN → GURU JI → WEBSITE
========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const intro = document.getElementById("weddingIntro");

    if (!intro) return;

    const guruImage = intro.querySelector(".guru-reveal img");
    const leftCurtain = intro.querySelector(".intro-left");

    document.body.style.overflow = "hidden";

    // Wait for image to load before starting
    if (guruImage && !guruImage.complete) {
        await new Promise(resolve => {
            guruImage.addEventListener("load", resolve, { once: true });
            guruImage.addEventListener("error", resolve, { once: true });
        });
    }

    // Wait for image decoding
    if (guruImage && guruImage.decode) {
        try {
            await guruImage.decode();
        } catch (e) {}
    }

    // Read actual curtain duration from CSS
    const durationValue = getComputedStyle(leftCurtain).transitionDuration;
    const durationParts = durationValue.split(",")[0].trim();

    const curtainDuration = durationParts.endsWith("ms")
        ? parseFloat(durationParts)
        : parseFloat(durationParts) * 1000;

    // Curtain open hone se pehle 3 second wait
await new Promise(resolve => setTimeout(resolve, 1000));

    // Start opening
    intro.classList.add("open");
    intro.classList.add("show-guru");

    // Wait for curtains to fully open + 2 sec darshan
    setTimeout(() => {

        intro.classList.add("hide-guru");

        // Wait for Guru Ji fade-out
        setTimeout(() => {

            intro.remove();
            document.body.style.overflow = "";

        }, 800);

    }, curtainDuration + 400);

});

