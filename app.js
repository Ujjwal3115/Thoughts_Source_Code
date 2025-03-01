const parallax_el = document.querySelectorAll('.parallax');

let xValue = 0;
let yValue = 0;
let roatateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.getAttribute('data-speedx');
        let speedy = el.getAttribute('data-speedy');
        let speedz = el.getAttribute('data-speedxz');
        let rotateY = el.getAttribute('data-rotation');

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${roatateDegree * rotateY}deg)`;
        
        // Check if element is the text and update its color based on position
        if (el.classList.contains('text')) {
            const loginBox = document.querySelector('.login-box');
            const textRect = el.getBoundingClientRect();
            const loginBoxRect = loginBox.getBoundingClientRect();

            // Change text color if text is above login box
            if (textRect.bottom < loginBoxRect.top) {
                el.style.color = '#000000';
            } else {
                el.style.color = '#e3ff73';
            }
        }
    });
}

update(0); 

window.addEventListener('mousemove', (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    roatateDegree = (xValue / (window.innerWidth/2)) * 20;

    update(e.clientX);
    
});

// Add touch support
window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        xValue = e.touches[0].clientX - window.innerWidth / 2;
        yValue = e.touches[0].clientY - window.innerHeight / 2;

        roatateDegree = (xValue / (window.innerWidth/2)) * 20;

        update(e.touches[0].clientX);
    }
});

// Reset position on touch end
window.addEventListener('touchend', () => {
    xValue = 0;
    yValue = 0;
    roatateDegree = 0;
    update(window.innerWidth / 2);
});

// Add resize handler
window.addEventListener('resize', () => {
    update(window.innerWidth / 2);
});

// aniamtion

// let timeline = gsap.timeline();

// timeline.from(".bg-img",{ 
//     top: `${document.querySelector('.bg-img').offsetHeight / 2 - 200}px`,
//     duration: 3.5,
// }, 
// "1",
// );