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

        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1 ;
        console.log(zValue);

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${roatateDegree * rotateY }deg)`;
        
    });
}

update(0); 

window.addEventListener('mousemove', (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    roatateDegree = (xValue / (window.innerWidth/2)) * 20;

    update(e.clientX);
    
});

// aniamtion

// let timeline = gsap.timeline();

// timeline.from(".bg-img",{ 
//     top: `${document.querySelector('.bg-img').offsetHeight / 2 - 200}px`,
//     duration: 3.5,
// }, 
// "1",
// );