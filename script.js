const card = document.getElementById("card");
const content = document.getElementById("content");
const music = document.getElementById("music");
const petalsContainer = document.getElementById("petals-container");
const sections = document.querySelectorAll('.section, .hero');

window.onbeforeunload = function () { window.scrollTo(0,0); };

// Open card
card.addEventListener("click", () => {
    card.style.opacity = "0";
    content.style.opacity = "1";
    music.play();
    setInterval(createPetal, 500);
    setInterval(createHeart, 1500);
    setTimeout(()=>{card.style.display="none";}, 1200);
});

// Fade-in on scroll
function fadeInOnScroll(){
    const triggerBottom = window.innerHeight/5*4;
    sections.forEach(section=>{
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) section.style.animation='fadeInUp 1s forwards';
    });
}
window.addEventListener('scroll', fadeInOnScroll);

// Petals
function createPetal(){
    const petal=document.createElement("div");
    petal.classList.add("petal");
    const size=12+Math.random()*12;
    petal.style.width=size+"px"; petal.style.height=size+"px";
    petal.style.left=Math.random()*100+"vw";
    petal.style.animationDuration=8+Math.random()*5+"s";
    petalsContainer.appendChild(petal);
    setTimeout(()=>petal.remove(),15000);
}

// Hearts
function createHeart(){
    const heart=document.createElement("div");
    heart.classList.add("heart");
    heart.style.left=Math.random()*100+"vw";
    heart.style.animationDuration=4+Math.random()*3+"s";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),7000);
}

// Countdown
const countdownDate = new Date("September 9, 2026 17:30:00").getTime();
function updateCountdown(){
    const now = new Date().getTime();
    const distance = countdownDate - now;
    if(distance<0){ document.getElementById("countdown").innerHTML="We’re Married! 💍🎉"; clearInterval(countdownInterval); return; }
    const days=Math.floor(distance/(1000*60*60*24));
    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds=Math.floor((distance%(1000*60))/1000);
    document.getElementById("days").innerText=days;
    document.getElementById("hours").innerText=hours;
    document.getElementById("minutes").innerText=minutes;
    document.getElementById("seconds").innerText=seconds;
}
const countdownInterval=setInterval(updateCountdown,1000);
updateCountdown();

// ---- RSVP Form submission via Google Apps Script ----
const rsvpForm = document.getElementById("rsvp-form");
const confirmation = document.getElementById("confirmation");

rsvpForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(rsvpForm);
fetch("https://script.google.com/macros/s/AKfycbxK_VZW6V1_e13mmyrJL9KgHm03ePovcLtgkhLab2Ci0rZ7hzhKJqrtl4LyAB5Pm7lExw/exec", { 
      method: "POST",
      body: data
  })
  .then(res => res.json())
  .then(result => {
      if(result.status === "success"){
          confirmation.innerText = `Thank you, ${data.get("fullName")}! Your RSVP is confirmed 💚`;
          rsvpForm.reset();
      } else {
          confirmation.innerText = "Oops! Something went wrong: " + result.message;
      }
  })
  .catch(err => {
      confirmation.innerText = "Oops! Something went wrong.";
      console.error(err);
  });
});

