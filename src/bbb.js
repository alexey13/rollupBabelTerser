const els = document.querySelectorAll('.sliders__slider, .menu__item');
els.forEach(el => charming(el))

function animateMenu(index) {
	//MenuIn index 12
	//MenuOut index 13
	const {content, currentDressSlider} = animeStore;

	const sliderTargets = document.querySelector(`.sliders__slider:nth-child(${currentDressSlider})`);
	const contentTargets = document.querySelector(`.content__section:nth-child(${currentDressSlider})`)

	switch(index) {
		case 12:
			if(!content) {
				fadeOut({targets: sliderTargets})
			} else {
				hideContent({targets: contentTargets})
			}
			showMenu()
			break;
		case 13:
			if(!content) {
				fadeIn({targets: sliderTargets, delay: 1200})
			} else {
				showContent(contentTargets)
			}
			hideMenu()
			break;
	}
}

function animateContent(index) {
	//ContentIn animations index 6, 8, 10
	//ContentOut animations index 7, 9, 11
	const elementIndex = 
		index === 6 || index === 7 ? 1 :
		index === 8 || index === 9 ? 2 : 3;

	const sliderTargets = document.querySelector(`.sliders__slider:nth-child(${elementIndex})`);
	const contentTargets = document.querySelector(`.content__section:nth-child(${elementIndex})`);

	switch(index) {
		case 6:
		case 8:
		case 10:
			fadeOut({targets: sliderTargets})
			showContent(contentTargets)
			break;
		case 7:
		case 9:
		case 11:
			fadeIn({targets: sliderTargets, delay: 300})
			hideContent({targets: contentTargets})
			break;
	}
}

function animateSlider(index, direction) {
	let elIndex;

	if (direction === 'next') {
		elIndex = index === 0 || index === 1 ? 1 :
										index === 2 || index === 3 ? 2 : 
										index === 3 || index === 4 ? 3 :
										index === 5 ? 3 : '';
	} else {
		elIndex = index === 0 ? 1 :
										index === 1 || index === 2 ? 2 : 
										index === 3 || index === 4 ? 3 : '';	
	}

	const targets = document.querySelector(`.sliders__slider:nth-child(${elIndex})`);

	switch(index) {
		  case 0:
		    fadeIn({targets})
		    break;
		  case 1:  
		  	fadeOut({targets})
		    break;
		  case 2:  
		  	fadeIn({targets})
		    break;
		  case 3:  
		  	fadeOut({targets})
		    break;
		  case 4:  
		  	fadeIn({targets})
		    break;
		  case 5:  
		  	fadeOut({targets})
		    break;
		}
	
}

function animateFirstSlider() {
	const targets = document.querySelector('.sliders__slider:first-child');
	anime({
		targets: targets,
		duration: 400,
		opacity: 0,
		easing: 'easeInQuint',
		complete: function() {
			targets.remove()
			const newTargets = document.querySelector(`.sliders__slider:first-child`);
			fadeIn({
				targets: newTargets,
				onComplete: function() {
					animeStore.scroll = true;
				}
			})
		}
	})
	anime({
		targets: '.button-sound, .burger, .logo',
		duration: 400,
		delay: 3800,
		opacity: 1,
		easing: 'easeInOutExpo',
	})
}

function fadeOut({targets, onBegin = false, onComplete = false} = {}) {
	const title = targets.querySelectorAll('.sliders__title span');
	const countButton = targets.querySelectorAll('.sliders__count, button');
	const scroll = document.querySelector('.scroll');
	anime({
		targets: title,
		duration: 600,
		delay: 0,
		easing: 'easeInOutExpo',
		opacity: [1,0],
		begin: function() {
			targets.style.opacity = '1';
			onBegin && onBegin()
		},
		complete: function() {
			targets.classList.remove('active');
			onComplete && onComplete()
		}
	})
	anime({
		targets: [countButton, scroll],
		duration: 600,
		delay: 0,
		easing: 'easeInOutExpo',
		opacity: [1,0],
	})
}

function fadeIn({targets, delay = 2200, onBegin = false, onComplete = false} = {}) {
	const title = targets.querySelectorAll('.sliders__title span');
	const countButton = targets.querySelectorAll('.sliders__count, button');
	const scroll = document.querySelector('.scroll');
	anime({
		targets: title,
		duration: 700,
		delay: function(el, index) { return delay+index*50; },
		easing: 'easeOutCirc',
		opacity: [0,1],
		translateX: function(el, index) {
			return [(50+index*10),0]
		},
		begin: function() {
			targets.style.opacity = '1';
			onBegin && onBegin()
		},
		complete: function() {
			targets.classList.add('active');
			animeStore.scroll = true;
			animeStore.content = false;
			onComplete && onComplete()
		}
	})
	anime({
		targets: [countButton, scroll],
		duration: 400,
		delay: delay + 1200,
		easing: 'easeInOutExpo',
		opacity: [0,1],
	})
}


function showContent(targets) {
	const container = document.querySelector('.content')
	anime({
		targets: targets,
		opacity: [0,1],
		delay: 600,
		duration: 1600,
		//translateY: [20, 0],
		easing: 'easeInExpo',
		begin: function() {
			container.style.visibility = 'visible';
			targets.style.display = 'block';
		},
		complete: function() {
			targets.classList.add('active');
			animeStore.scroll = false;
			animeStore.content = true;
		}
	})
}

function hideContent({targets, onComplete = false} = {}) {
	const container = document.querySelector('.content')
	anime({
		targets: targets,
		opacity: [1,0],
		duration: 600,
		easing: 'easeOutExpo',
		complete: function() {
			container.style.visibility = 'hidden';
			targets.style.display = 'none';
			targets.classList.remove('active');
			onComplete && onComplete()
		}
	})
}

function showMenu() {
	const targets = document.querySelectorAll('.menu__item span');
	const container = document.querySelector('.menu')
	anime({
		targets: targets,
		opacity: [0,1],
		delay: 800,
		duration: 1600,
		easing: 'easeInExpo',
		begin: function() {
			container.style.visibility = 'visible';
			container.style.display = 'flex';
		},
		complete: function() {
			animeStore.scroll = false;
			animeStore.menu = true;
		}
	})
}

function hideMenu() {
	const targets = document.querySelectorAll('.menu__item span');
	const container = document.querySelector('.menu')
	anime({
		targets: targets,
		opacity: [1,0],
		delay: 0,
		duration: 1600,
		easing: 'easeOutExpo',
		complete: function() {
			container.style.visibility = 'hidden';
			container.style.display = 'none';
			animeStore.menu = false;
		}
	})
}