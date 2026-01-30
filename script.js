const card = document.getElementById("card");
const cardInner = document.getElementById("card-inner");
const music = document.getElementById("music");
const petalsContainer = document.getElementById("petals-container");

// Open card like a letter
cardInner.addEventListener("click", () => {
    cardInner.classList.add("fade-out");

    setTimeout(() => {
        card.style.display = "none";
        document.body.style.overflowY = "auto"; // allow scrolling
        document.getElementById('content').style.opacity = '1';
        music.play();
        setInterval(createPetal, 500);
        setInterval(createHeart, 1200);
    }, 1000);
});

// Fade Sections & items
function fadeInOnScroll(){
    const triggerBottom = window.innerHeight / 5 * 4;
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom && !section.classList.contains('visible')){
            section.classList.add('visible');
            const items = section.querySelectorAll('.fade-item');
            items.forEach((item, i) => {
                setTimeout(() => { item.classList.add('visible'); }, i * 150);
            });
        }
    });
}
window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();

// Petals
function createPetal(){
    const petal = document.createElement("div");
    petal.classList.add("petal");
    const size = 12 + Math.random()*12;
    petal.style.width = size+"px";
    petal.style.height = size+"px";
    petal.style.left = Math.random()*100+"vw";
    petal.style.animationDuration = 6 + Math.random()*4 + "s";
    petalsContainer.appendChild(petal);
    setTimeout(()=>petal.remove(), 12000);
}

// Hearts
function createHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random()*100+"vw";
    heart.style.animationDuration = 3 + Math.random()*2 + "s";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),5000);
}

// Countdown
const countdownDate = new Date("September 9, 2026 17:30:00").getTime();
function updateCountdown(){
    const now = new Date().getTime();
    const distance = countdownDate - now;
    if(distance<0){
        document.getElementById("countdown").innerHTML="We’re Married! 💍🎉";
        clearInterval(countdownInterval);
        return;
    }
    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds = Math.floor((distance%(1000*60))/1000);
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP
const rsvpForm = document.getElementById("rsvp-form");
const confirmation = document.getElementById("confirmation");
rsvpForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(rsvpForm);
    fetch(rsvpForm.action, { method: "POST", body: data, mode: 'no-cors' })
    .then(() => {
        rsvpForm.style.display = "none";
        confirmation.innerText = `Thank you 💚 Your RSVP is confirmed!`;
    })
    .catch(err => {
        confirmation.innerText = "Oops! Something went wrong.";
        console.error(err);
    });
});

// Phone input restriction
const phoneInput = document.querySelector('input[name="entry.144725706"]');
phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
});
