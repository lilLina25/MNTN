'use strict';
//Header
let header_menu = document.querySelector('.menu-header__menu');
let header_btn = document.querySelector('.menu-header__icon');
let header_links = document.querySelectorAll('.menu-header__link');

header_btn.addEventListener('click',function(){
	header_btn.classList.toggle('active');
	header_menu.classList.toggle('active');
	document.body.classList.toggle('overflow');
});

for(let link of header_links){
	link.addEventListener('click',function(){
		header_btn.classList.remove('active');
		header_menu.classList.remove('active');
		document.body.classList.remove('overflow');
	});
}

//Slider

var items = ['#item-4','#item-3','#item-2','#item-1'];
let slides = document.querySelectorAll('.slider__item');
var options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};
var callback = function (entries, observer) {
	entries.forEach((entry) => {
		for(let i=0;i<4;i++){
			if(entry.target.id === "item-"+Number(i+1)){
				slides[i].classList.add('active');
			}else{
				slides[i].classList.remove('active');
			}
		}
	});
};

var observer = new IntersectionObserver(callback, options);
for(let item of items){
	observer.observe(document.querySelector(item));
}

 //Parallax
window.onload = function() {
	const parallax = document.querySelector('.preview');
	if(parallax) {
		const content = document.querySelector('.preview__container');
		const clouds = document.querySelector('.images-parallax__item1');
		const mountains = document.querySelector('.images-parallax__item2');
		const human = document.querySelector('.images-parallax__item3');
		
		//Коэффициенты
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;
		
		//Скорость анимации
		const speed = 0.05;
		
		//Переменные
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove",function(e) {
			//Ширина и высота блока для адаптива
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			//Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxWidth / 2;

			//Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});
	}
};