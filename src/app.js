function setSoundVolume() {
	music.volume = 0.1;
	soundin.volume = 1;
	soundout.volume = 1;
}
function setSoundIcon() {
	const isPaused = music.paused;
	if(!isPaused) {
		const soundButton = document.querySelector('.button-sound');
		soundButton.dataset.mute = 'false';
	}
}
setSoundIcon()
setSoundVolume()	
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
//First
const PointLight = new THREE.PointLight( 0xffffff, 0.14 );
PointLight.position.set(-7, 3, 2);

//Second
const PointLight2 = new THREE.PointLight( 0xffffff, 0.12 );
PointLight2.position.set(3.1, 1.867, -1.282);

//Third
const PointLight3 = new THREE.PointLight( 0xffffff, 0.14 );
PointLight3.position.set(-4.116, -0.967, 2.631);
//Material
const material = new THREE.MeshPhysicalMaterial({
	color: new THREE.Color('#f3b0c2'),
	emissive: new THREE.Color('#f3b0c2'),
	emissiveIntensity: 0.35,
	metalness: 0.35,
	morphTargets: true,
	roughness: 0.5,
	clearcoat: 0,
	clearcoatRoughness: 0.1,
	reflectivity: 1,
	side: THREE.DoubleSide,
});
const container = document.querySelector('.app');
let camera, scene, renderer, settings, controls;
let light, directionalLight;
let clock = new THREE.Clock();
let mouseX = 0, mouseY = 0;
let isAnimeOneCompleted = false;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const flyMode = {
	cameraX: -0.134952,
	cameraY: 3.965744,
	targetX: 0,
	targetY: 0,
	ease: .002,
	ampX: .015 * 5,
	ampY: .003 * 5
}

const particles = [];

const sounds = {
	playing: false,
	playStars: function() {
		const {playing} = this;
		playing ? soundin.play() : ''
	},
	playWind: function() {
		const {playing} = this;
		playing ? soundout.play() : ''
	},
	setPlay: function() {
		music.play();
		setSoundIcon();
		this.playing = true;
	},
	setPause: function() {
		music.pause();
		setSoundIcon();
		this.playing = false;
	},
}

const animeStore = {
	index: -1,
	prevIndex: null,
	currentDressSlider: null,
	content: false,
	menu: false,
	prevCameraPosition: {
		endX: null,
		endY: null,
		endZ: null,
		endRX: null,
		endRY: null,
		endRZ: null
	},
	playing: false,
	scroll: false,
	next: [[1,2],[3,4],[5,0]],
	prev: [[1,0],[3,2],[5,4]],
}


//Animations store
const gltfStore = {
	mixer: [],
	animations: []
}

const throttledOnScroll = throttle(onScroll, 300);

const animationsGuiData = [
	{
		"startX": -0.134952,
    "startY": 3.965744,
    "startZ": 0.182446,
    "endX": -0.89,
    "endY": 3.024656,
    "endZ": 1.1617089999999999,
    "startRX": 0.013290999999999999,
    "startRY": -0.852159,
    "startRZ": -0.090948,
    "endRX": -0.117688,
    "endRY": -0.6060749999999999,
    "endRZ": -0.076337,
    "objStartRY": 0,
    "objEndRY": 8.6,
    "duration": 4000,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765",
    "particles": 3
  },
  {
  	"startX": -0.9636509999999999,
    "startY": 3.024656,
    "startZ": 1.1617089999999999,
    "endX": 0.017736,
    "endY": 2.1849369999999997,
    "endZ": -0.090921,
    "startRX": -0.11115,
    "startRY": -0.641532,
    "startRZ": -0.06630699999999999,
    "endRX": -0.339515,
    "endRY": -0.8219799999999999,
    "endRZ": -0.212728,
    "objStartRY": 8.6,
    "objEndRY": 0,
    "obj3StartRY": 0,
    "obj3EndRY": 8.6,
    "duration": 1500,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  {
  	"startX": 0.017736,
    "startY": 2.1849369999999997,
    "startZ": -0.090921,
    "endX": 0.028704,
    "endY": 1.122112,
    "endZ": 1.289866,
    "startRX": -0.339515,
    "startRY": -0.8219799999999999,
    "startRZ": -0.212728,
    "endRX": -0.044142999999999995,
    "endRY": 0.03624,
    "endRZ": 0.015323,
    "obj3StartRY": 8.6,
    "obj3EndRY": 0,
    "duration": 4000,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765",
    "particles": 4
  },
  {
	  "startX": 0.028704,
    "startY": 1.122112,
    "startZ": 1.289866,
    "endX": 0.186173,
    "endY": 0.48657,
    "endZ": -0.087522,
    "startRX": -0.044142999999999995,
    "startRY": 0.03624,
    "startRZ": 0.015323,
    "endRX": -0.161496,
    "endRY": 0.13526,
    "endRZ": -0.00245,
    "obj3StartRY": 0,
    "obj3EndRY": 8.6,
    "obj2StartRY": 9.6,
    "obj2EndRY": 0,
    "duration": 1500,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  {
  	"startX": 0.186173,
    "startY": 0.48657,
    "startZ": -0.087522,
    "endX": 0.086828,
    "endY": -0.818143,
    "endZ": 1.346854,
    "startRX": -0.161496,
    "startRY": 0.13526,
    "startRZ": -0.00245,
    "endRX": 0.019832,
    "endRY": 0.083074,
    "endRZ": 0.000185,
    "obj2StartRY": 0,
    "obj2EndRY": 9.6,
    "duration": 4000,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765",
    "particles": 5
  },
  {
  	"startX": 0.086828,
    "startY": -0.818143,
    "startZ": 1.346854,
    "endX": -0.05933848738366905,
    "endY": -1.6314853361009416,
    "endZ": -0.038750361730078176,
    "startRX": 0.019832,
    "startRY": 0.083074,
    "startRZ": 0.000185,
    "endRX": -0.09335365157235163,
    "endRY": 0.09579747424262565,
    "endRZ": 0.0011175874673510107,
    "obj2StartRY": 9.6,
    "obj2EndRY": 0,
    "duration": 1500,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  //content animation it use camera position
  {
    "duration": 2500,
    "x": 0.25,
    "z": -0.35,
   	"y": 0,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765"
  },
  {
    "duration": 1900,
    "x": -0.25,
    "z": 0.35,
   	"y": 0,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  {
    "duration": 2500,
    "x": 0,
    "z": -0.35,
   	"y": 0,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765"
  },
  {
    "duration": 1900,
    "x": 0,
    "z": 0.35,
   	"y": 0,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  {
    "duration": 2500,
    "x": 0,
    "z": -0.35,
   	"y": 0,
    "cubicBezier": "0.055, 0.450, 0.475, 0.765"
  },
  {
    "duration": 1900,
    "x": 0,
    "z": 0.35,
   	"y": 0,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800"
  },
  //menu in
  {
    "duration": 2500,
    "x": -1,
    "z": -2,
   	"y": 0,
   	"rx": -0.5,
   	"ry": 0.4,
   	"rz": 0.3,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800",
    //"particles": 6
  },
  //menu out
  {
    "duration": 2500,
    "cubicBezier": "0.765, 0.325, 0.280, 0.800",
  },
]

function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set(-0.134952, 3.965744, 0.182446)
	camera.rotation.set(0.013290999999999999, -0.852159, -0.090948)

	scene = new THREE.Scene();

	//Back
	scene.background = new THREE.Color('#fff7fe');

	//Lights
	light = new THREE.AmbientLight( 0xffffff, 0.8 ); 
	scene.add( light );
	
	scene.add( PointLight );

	scene.add( PointLight2 );

	scene.add( PointLight3 );
	
	//Cylinder
	const loaderText = new THREE.TextureLoader();
	loaderText.load('/homepage/img/map3.jpg', function(texture) {
		const radiusTop = 6;
		const radiusBottom = 6;
		const height = 15;
		const radialSegments = 32;
		const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments);
		const materialCyl = new THREE.MeshBasicMaterial({
			color: new THREE.Color('#fff7fe'),
			side: THREE.BackSide,
			map: texture,
		});
		const cylinder = new THREE.Mesh( geometry, materialCyl );
		scene.add( cylinder );
	})
	
	const progressAll = {
		loaded: 0,
	}

	//onProgress loader
	const onProgress = function(progress) {
		const {loaded, total} = progress;
		const el = document.querySelector('.sliders__loading__count');
		total === loaded ? progressAll.loaded++ : '';
		if(progressAll.loaded === 3) {
			const scroll = document.querySelector('.start');
			const loadbar = document.querySelector('.sliders__loading');
			scroll.style.opacity = 1;
			loadbar.style.opacity = 0;
		}
	};

	//Gltf Loader to Promise
	const loader = new THREE.GLTFLoader();
	function promiseLoader(url) {
		return new Promise((resolve, reject) => {
			loader.load(url, resolve, onProgress, reject)
		})
	};

	//3d Objects uls
	const fileUrls = [
		'/homepage/3d/Ткань.glb',
		'/homepage/3d/Ткань2.glb',
		'/homepage/3d/Ткань3.glb'
	];

	Promise.all(fileUrls.map(promiseLoader))
	.then(gltfs => {
		gltfs.forEach((gltf, index) => {
			gltf.scene.children.forEach(c => {
				if (c.type === "Mesh") {
					const scale = 0.1;
					const scaleObj3 = 0.16;

					c.scale.x = index === 2 ? scaleObj3 : scale;
					c.scale.y = index === 2 ? scaleObj3 : scale;
					c.scale.z = index === 2 ? scaleObj3 : scale;

					const positionY = [1.8890719999999999, -1.8699999999999999, 0.25]
					c.position.y = positionY[index];

					if(index === 2) {
						const positionX = 0.19999999999999998;
						c.position.x = positionX;
					}

					c.material = material;
					scene.add(c);

					gltfStore.mixer.push(new THREE.AnimationMixer(c))
					gltfStore.animations.push(gltf.animations);
				} 
			})
		})

		gltfStore.animations.forEach((animation, index) => {
			animation.forEach(clip => {
				gltfStore.mixer[index].clipAction(clip).reset().play();
			})
		});

		
		window.addEventListener("wheel", throttledOnScroll);
		document.querySelector('.sliders').addEventListener("touchstart", onTouchstart);
		document.querySelector('.sliders').addEventListener("touchmove", onTouchmove);
	})


	renderer = new THREE.WebGLRenderer( { antialias: true, physicallyCorrectLights: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
	container.appendChild( renderer.domElement );

	//Particles
	particles.push(
		new Partykals.ParticlesSystem({
		  container: scene,
		  particles: {
		  		startAlpha: 1,
	        endAlpha: 0,
		      size: new Partykals.Randomizers.MinMaxRandomizer(0.045, 0.055),
		      startAlphaChangeAt: 0,
		      ttl: 7,
		      offset: new Partykals.Randomizers.SphereRandomizer(5, 5),
		      globalColor: new THREE.Color('#feeaf4'),
		      endColor: new THREE.Color('#ffffff'),
		      worldPosition: true,
		      blending: 'additive',
		      texture: new THREE.TextureLoader().load('/homepage/img/particle.png')
		      //blending: "additive",
		  },
		  system: {
		      particlesCount: 2500,
		      depthWrite: false,
		      emitters: new Partykals.Emitter({
		          onInterval: new Partykals.Randomizers.MinMaxRandomizer(300, 500),
	            interval: new Partykals.Randomizers.MinMaxRandomizer(0.2, 0.8),
		      }),
		      speed: 1,
		      onUpdate: (system) => {
	            system.particleSystem.rotation.y += system.dt / 300;
	        },
		  }
		})
	)
	particles.push(
		new Partykals.ParticlesSystem({
		  container: scene,
		  particles: {
		  		startAlpha: 1,
	        endAlpha: 0,
		      size: new Partykals.Randomizers.MinMaxRandomizer(0.045, 0.055),
		      startAlphaChangeAt: 0,
		      ttl: 7,
		      offset: new Partykals.Randomizers.SphereRandomizer(4.2, 4.2),
		      globalColor: new THREE.Color('#feeaf4'),
		      endColor: new THREE.Color('#ffffff'),
		      worldPosition: true,
		      blending: 'additive',
		      texture: new THREE.TextureLoader().load('/homepage/img/particle.png')
		      //blending: "additive",
		  },
		  system: {
		      particlesCount: 1500,
		      depthWrite: false,
		      emitters: new Partykals.Emitter({
		          onInterval: new Partykals.Randomizers.MinMaxRandomizer(300, 500),
	            interval: new Partykals.Randomizers.MinMaxRandomizer(0.2, 0.8),
		      }),
		      speed: 1,
		      onUpdate: (system) => {
	            system.particleSystem.rotation.y += system.dt / 100;
	        },
		  }
		})
	)
	particles.push(
		new Partykals.ParticlesSystem({
		  container: scene,
		  particles: {
		  		startAlpha: 1,
	        endAlpha: 0,
		      size: new Partykals.Randomizers.MinMaxRandomizer(0.045, 0.055),
		      startAlphaChangeAt: 0,
		      ttl: 7,
		      offset: new Partykals.Randomizers.SphereRandomizer(3.8, 3.8),
		      globalColor: new THREE.Color('#feeaf4'),
		      endColor: new THREE.Color('#ffffff'),
		      worldPosition: true,
		      blending: 'additive',
		      texture: new THREE.TextureLoader().load('/homepage/img/particle.png')
		      //blending: "additive",
		  },
		  system: {
		      particlesCount: 1000,
		      depthWrite: false,
		      emitters: new Partykals.Emitter({
		          onInterval: new Partykals.Randomizers.MinMaxRandomizer(300, 500),
	            interval: new Partykals.Randomizers.MinMaxRandomizer(0.2, 0.8),
		      }),
		      speed: 1,
		      onUpdate: (system) => {
	            system.particleSystem.rotation.y += system.dt / 200;
	        },
		  }
		})
	)

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener("visibilitychange", onTabBlur, false);
	
}

function onTabBlur() {
	if (document.visibilityState === 'hidden'){
    
  }
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//

function animate() {
	requestAnimationFrame( animate );
	renderThree()
}


function renderThree() {
	const delta = clock.getDelta();
	const {playing} = animeStore;

	if (gltfStore.mixer && gltfStore.animations) {
    gltfStore.mixer.forEach(m => m.update(delta / 2));
  }
  if (!playing) {
		if(flyMode.targetX !== 0 && flyMode.targetY !== 0) {
			camera.position.x +=  (flyMode.targetX - camera.position.x) * flyMode.ease * 16;
			camera.position.y +=  (flyMode.targetY - camera.position.y) * flyMode.ease * 16;
		}
	}
	particles.forEach(c => c.update());
	renderer.render( scene, camera);
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove( event ) {
	flyMode.targetX = (event.clientX / windowHalfX) * flyMode.ampX + flyMode.cameraX;
	flyMode.targetY = (event.clientY / windowHalfY) * flyMode.ampY + flyMode.cameraY;
}

init();
animate();

/*Gui data to animations*/

function playAnimation(index, direction, first = false) {
	const a = animationsGuiData[index]
	const chainedAnimations = animeStore[direction];
	const {menu} = animeStore;

	let chainedIndex = null;

	chainedAnimations.forEach(anim => {
		if(anim[0] === index) {
			chainedIndex = anim[1]; 
		}
	})

	//Content animation
	const isContentAnimationsIn = [6,8,10].includes(index);
	const isContentAnimationsOut = [7,9,11].includes(index);
	//Menu animations
	const isMenuAnimationIn = index === 12;
	const isMenuAnimationOut = index === 13;
	//When animation out or in
	const dressIn = [0,2,4];
	const isDressIn = dressIn.includes(index);
	const isDressOut = [1,3,5].includes(index);

	//Dresses
	const objects = [];
	scene.children.forEach((c, index) => c.name === "BezierCircle" ? objects.push(index) : '');

	if(first) {//firstSlide
		animateFirstSlider();
	} else if(isContentAnimationsIn || isContentAnimationsOut) {//Content slider
		animateContent(index)
	} else if(isMenuAnimationIn || isMenuAnimationOut) {//Menu
		animateMenu(index)
	} else {//Dress slider
		if(menu && isDressOut) {
			//if menuActive and dressoutAnime do not play slider
		} else {
			animateSlider(index, direction)
		} 
	}

	//If first animation we transform from first camera position, others transform from current camera position
	let x = index === 0 && direction === 'next' ? a.startX : camera.position.x;
	let y = index === 0 && direction === 'next' ? a.startY : camera.position.y;
	let z = index === 0 && direction === 'next' ? a.startZ : camera.position.z;

	let Rx = index === 0 && direction === 'next' ? a.startRX : camera.rotation.x;
	let Ry = index === 0 && direction === 'next' ? a.startRY : camera.rotation.y;
	let Rz = index === 0 && direction === 'next' ? a.startRZ : camera.rotation.z;

	//Dressin and Menu
	if((a.particles && isDressIn) || (a.particles && isMenuAnimationIn)) {
		const index = a.particles;
		const particle = particles[index];
		
		if(particle) {
			particle.reset()
		} else {
			addParticle(a.particles)
		}
	}

	if(isContentAnimationsIn || isContentAnimationsOut || isMenuAnimationIn || isMenuAnimationOut) {
		a.endRX = camera.rotation.x;
		a.endRY = camera.rotation.y;
		a.endRZ = camera.rotation.z;
		a.objStartRY = a.objEndRY = scene.children[objects[0]].rotation.y
		a.obj2StartRY = a.obj2EndRY = scene.children[objects[1]].rotation.y
		a.obj3StartRY = a.obj3EndRY = scene.children[objects[2]].rotation.y
	}

	if(isContentAnimationsIn || isContentAnimationsOut || isMenuAnimationIn) {
		a.endX = camera.position.x + a.x;
		a.endY = camera.position.y + a.y;
		a.endZ = camera.position.z + a.z;
	}
	if(isMenuAnimationIn) {
		const {rx, ry, rz} = a;
		a.endRX = camera.rotation.x + rx;
		a.endRY = camera.rotation.y + ry;
		a.endRZ = camera.rotation.z + rz;
	}
	if(isMenuAnimationOut) {
		const {endX, endY, endZ, endRX, endRY, endRZ} = animeStore.prevCameraPosition;
		a.endX = endX;
		a.endY = endY;
		a.endZ = endZ;
		a.endRX = endRX;
		a.endRY = endRY;
		a.endRZ = endRZ;
	}
	
	anime.timeline({
	  easing: `cubicBezier(${a.cubicBezier})`,
	  duration: a.duration,
	  begin: function() {
	  	flyMode.targetX = 0;
	  	flyMode.targetY = 0;
	  	flyMode.cameraX = a.endX;
	  	flyMode.cameraY = a.endY;
	  	isDressIn ? sounds.playStars() : ''
	  	isDressOut && !menu ? sounds.playWind() : ''
	  	isMenuAnimationIn ? sounds.playWind() : ''
	  	animeStore.playing = true;
	  },
	  complete: function() {
			animeStore.playing = false;
			animeStore.index = index;
			if(isDressIn) {
				animeStore.currentDressSlider = dressIn.indexOf(index) + 1;
			}
			chainedIndex !== null ? playAnimation(chainedIndex, direction) : ''
	  }
	})
	.add({
		targets: camera.position,
		x: [x, a.endX],
		y: [y, a.endY],
		z: [z, a.endZ],
	}, 0)
	.add({
		targets: camera.rotation,
		x: [Rx, a.endRX],
		y: [Ry, a.endRY],
		z: [Rz, a.endRZ],
	}, 0)
	.add({
		targets: scene.children[objects[0]].rotation,
		y: [a.objStartRY, a.objEndRY],
	}, 0)
	.add({
		targets: scene.children[objects[1]].rotation,
		y: [a.obj2StartRY, a.obj2EndRY],
	}, 0)
	.add({
		targets: scene.children[objects[2]].rotation,
		y: [a.obj3StartRY, a.obj3EndRY],
	}, 0)

}

function addParticle(index) {
	//Menu
	if(index === 6) {
		const y = camera.position.y;
		const x = camera.position.x - 1;
		const z = camera.position.x;

		particles.push(
			new Partykals.ParticlesSystem({
			  container: scene,
			  particles: {
			  		offset: new Partykals.Randomizers.SphereRandomizer(0.2, 0.8),
			  		startAlpha: 1,
		        endAlpha: 0,
			      size: new Partykals.Randomizers.MinMaxRandomizer(0.017, 0.027),
			      startAlphaChangeAt: 0,
			      ttl: 15.5,
			      globalColor: new THREE.Color('#feeaf4'),
			      endColor: new THREE.Color('#ffffff'),
			      worldPosition: true,
			      blending: 'additive',
			      texture: new THREE.TextureLoader().load('/homepage/img/particle.png')
			  },
			  system: {
			      particlesCount: 500,
			      emitters: new Partykals.Emitter({
			        onInterval: 500,
	            interval: 0.2,
			      }),
			      ttl: 15.5,
			      speed: 1,
			      onUpdate: (system) => {
			      	system.particleSystem.position.y = y;
			      	system.particleSystem.position.z = x;
			      	system.particleSystem.position.x = z;
		          system.particleSystem.rotation.x += system.dt / 10;
		        },
			  }
			})
		)
	//DressIn
	} else {
		const y = index === 3 ? 3.2 :
				index === 4 ? 1.4 : -0.6;

		particles.push(
			new Partykals.ParticlesSystem({
			  container: scene,
			  particles: {
			  		offset: new Partykals.Randomizers.SphereRandomizer(0.2, 0.8),
			  		startAlpha: 1,
		        endAlpha: 0,
			      size: new Partykals.Randomizers.MinMaxRandomizer(0.017, 0.027),
			      startAlphaChangeAt: 0,
			      ttl: 5.5,
			      globalColor: new THREE.Color('#feeaf4'),
			      endColor: new THREE.Color('#ffffff'),
			      worldPosition: true,
			      blending: 'additive',
			      texture: new THREE.TextureLoader().load('/homepage/img/particle.png')
			  },
			  system: {
			      particlesCount: 500,
			      emitters: new Partykals.Emitter({
			        onInterval: 500,
	            interval: 0.2,
			      }),
			      ttl: 5.5,
			      speed: 1,
			      onUpdate: (system) => {
			      	system.particleSystem.position.y = y;
			      	system.particleSystem.position.z = 0;
			      	system.particleSystem.position.x = 0;
		          system.particleSystem.rotation.y += system.dt / 10;
		        },
			  }
			})
		)
	}

	
}

//Mobile scroll deltaY
let touchStart = 0;

function onTouchstart(event) {
  touchStart = event.touches[0].pageY;
}

function onTouchmove(event) {
	onScroll({
		deltaY:  touchStart - event.touches[0].pageY
	})
}


function onScroll(event) {
	const {playing, scroll, currentDressSlider} = animeStore;
	if(!playing && scroll) {
		let nextIndex, previousIndex;
		//Content
		switch(currentDressSlider) {
			case 1:
				nextIndex = 1;
				previousIndex = null;
				break;
			case 2:
				nextIndex = 3;
				previousIndex = 1;
				break;
			case 3:
				nextIndex = 5;
				previousIndex = 3;
				break;
		}

		const delta = Math.sign(event.deltaY);
  	const next = delta === 1 ? true : false;

		if(next) {
			playAnimation(nextIndex, 'next');
		} else {
			playAnimation(previousIndex, 'prev');
		}
	}
}

//Sound Button
const soundButton = document.querySelector('.button-sound');
soundButton.addEventListener('click', (e) => {
	let {target} = e;
	const isButton = target.classList.contains('.button-sound');
	target = isButton ? target : target.closest('.button-sound');
	const isMute = target.dataset.mute === 'true';
	if(isMute) {
		target.dataset.mute = 'false';
		sounds.setPlay();
	} else {
		target.dataset.mute = 'true';
		sounds.setPause();
	}
});

//Start Button
const button = document.querySelector('.start');
button.addEventListener('click', (e) => {
	e.target.remove()
	sounds.setPlay();
	playAnimation(0, 'next', true)
});

//Content Button
const contentButtons = document.querySelectorAll('.sliders__slider button');
contentButtons.forEach(b => b.addEventListener('click', onClickContentButton))
function onClickContentButton(e) {
	const {playing} = animeStore;
	if(!playing) {
		const slider = e.target.closest('.sliders__slider')
		const sliderIndex = getElementIndex(slider);
		const index = sliderIndex === 0 ? 6 : sliderIndex === 1 ? 8 : 10;
		playAnimation(index, 'next');
	}
}

//Constent Close Button
const contentCloseButton = document.querySelectorAll('.content__close');
contentCloseButton.forEach(b => b.addEventListener('click', onClickContentCloseButtons))
function onClickContentCloseButtons(e) {
	const {playing} = animeStore;
	if(!playing) {
		const contentSection = e.target.closest('.content__section')
		const contentIndex = getElementIndex(contentSection);
		const index = contentIndex === 0 ? 7 : contentIndex === 1 ? 9 : 11;
		playAnimation(index, 'next');
	}
}

/*Burger*/
const burgerButton = document.querySelector('.burger');
burgerButton.addEventListener('click', onClickBurgerButton)
function onClickBurgerButton(e) {
	let {target} = e;
	const isButton = target.classList.contains('.burger');
	target = isButton ? target : target.closest('.burger');

	const {playing, index} = animeStore;
	if(!playing) {
		target.classList.toggle('burger_opened');
		const isOpenedMenu = index === 12;
		if(isOpenedMenu) {
			const index = 13;
			playAnimation(index, 'next');
		} else {
			//Save position of camera
			animeStore.prevCameraPosition.endX = camera.position.x;
			animeStore.prevCameraPosition.endY = camera.position.y;
			animeStore.prevCameraPosition.endZ = camera.position.z;
			animeStore.prevCameraPosition.endRX = camera.rotation.x;
			animeStore.prevCameraPosition.endRY = camera.rotation.y;
			animeStore.prevCameraPosition.endRZ = camera.rotation.z;
			animeStore.prevIndex = index;
			const newIndex = 12;
			playAnimation(newIndex, 'next');
		}
		
	}
}

//Menu item
const menuItem = document.querySelectorAll('div.menu__item');
menuItem.forEach(b => b.addEventListener('click', onClickMenuItem))
function onClickMenuItem(e) {
	const {playing, index} = animeStore;
	if(!playing) {
		animeStore.prevIndex = index;

		const item = e.target.closest('.menu__item');
		const itemIndex = getElementIndex(item);
		const newIndex = itemIndex === 0 ? 5 : itemIndex === 1 ? 1 : 3;
		const burgerButton = document.querySelector('.burger');

		burgerButton.classList.remove('burger_opened');
		hideMenu();
		playAnimation(newIndex, 'next');
	}
}


function getElementIndex(node) {
  var index = 0;
  while ( (node = node.previousElementSibling) ) {
    index++;
  }
  return index;
}


function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
