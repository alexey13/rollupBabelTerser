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