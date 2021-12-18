'use strict'
const video = document.querySelector('.video');
const playButton = document.querySelector('.play-b');
const playButtonContainer = document.querySelector('.video__playbutton-container');
const playIcon = document.querySelector('.play');
const volumeBar = document.querySelector('.volume-bar');
const soundButton = document.querySelector('.sound-b');
const fullScreenButton = document.querySelector('.fullscreen-b');


window.addEventListener('load', functionsManager);
window.addEventListener('resize', changePlayButtonPosition);
document.addEventListener('keydown', hotkeysManager);
function hotkeysManager(keyObj) {
	const key = keyObj.key;
	switch (key.toLowerCase()) {
		case ' ': playVideo();
			break;
		case 'm': muteVideo();
			break;
		case 'f': fullScreenMode();
			break;
		case 'arrowright': progressBarManager('ArrowRight');
			break;
		case 'arrowleft': progressBarManager('ArrowLeft');
			break;
	}
}
function functionsManager() {
	playVideoManager();
	showVideoDurationManager();
	volumeBarManager();
	progressBarManager();
	fullScreenManager();
	changePlayButtonPosition();
}

function showVideoDurationManager() {

	const currentTime = document.querySelector('.current-time');
	const totalDuration = document.querySelector('.total-duration');

	video.onloadedmetadata = () => showVideoDuration();
	video.addEventListener('timeupdate', showVideoDuration);


	function showVideoDuration() {
		let durationMinutes = Math.floor(video.duration / 60) || '0';
		let durationSeconds = Math.floor(video.duration - durationMinutes * 60) || '0';
		let currentDurationMinutes = Math.floor(video.currentTime / 60);
		let currentDurationSeconds = Math.floor(video.currentTime - currentDurationMinutes * 60);
		currentTime.textContent = `${currentDurationMinutes}:${addZero(currentDurationSeconds)}`;
		totalDuration.textContent = `${durationMinutes}:${addZero(durationSeconds)}`;

		function addZero(el) {
			return (+el < 10) ? '0' + el : el;
		}
	}

}
function progressBarManager(key = null) {
	const videoProgress = document.querySelector('.video-progress');
	const videoProgressFilled = document.querySelector('.video-progress-filled');

	video.addEventListener('timeupdate', changeProgressBarOnTime);
	videoProgress.addEventListener('click', changeProgressBarPerClick);

	if (key == 'ArrowRight' || key == 'ArrowLeft') changeProgressBarPerButtonPress(key);

	function changeProgressBarOnTime() {
		const VideoDurationPersentage = (video.currentTime / video.duration) * 100;
		videoProgressFilled.style.width = VideoDurationPersentage + '%';
	}
	function changeProgressBarPerClick(event) {
		const progressTime = event.offsetX;
		const progressPersentage = (progressTime / videoProgress.offsetWidth) * 100;
		video.currentTime = video.duration * progressPersentage / 100;
		videoProgressFilled.style.width = progressPersentage + '%';
	}
	function changeProgressBarPerButtonPress(key) {
		(key == 'ArrowLeft') ? video.currentTime -= 2 :
			(key == 'ArrowRight') ? video.currentTime += 2 : false;
		showRewind(key);
	}
	function showRewind(arrowDirection) {
		const rewindForward = document.querySelector('.rewind__forward');
		const rewindBackward = document.querySelector('.rewind__backward');
		(arrowDirection.slice(5) == 'Right') ? rewindForward.style.display = 'flex' :
			(arrowDirection.slice(5) == 'Left') ? rewindBackward.style.display = 'flex' : false;
		setTimeout(() => {
			rewindForward.style.display = 'none';
			rewindBackward.style.display = 'none'
		}, 300)
	}
}

/*FULLSCREAN*/
function fullScreenManager() {
	fullScreenButton.addEventListener('click', fullScreenMode);
}
function fullScreenMode() {
	if (!document.fullscreenElement) {
		video.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}
/*PLAY-VIDEO*/
function playVideoManager() {

	const nextVideoButton = document.querySelector('.next-b');
	let counter = 1;

	video.addEventListener('click', playVideo)

	video.addEventListener('ended', changePlayIcon);

	playButton.addEventListener('click', playVideo);
	playButtonContainer.addEventListener('click', playVideo);
	nextVideoButton.addEventListener('click', playNextVideo);

	function playNextVideo() {
		(counter == 3) ? (counter = 1) : counter++;
		video.src = `assets/video/video${counter}.mp4`;
		changePlayIcon();
	}

}
function playVideo() {
	if (video.paused) {
		video.play();
		changePlayIcon();
		changePlayButtonContainer();
	}
	else {
		video.pause();
		changePlayIcon();
		changePlayButtonContainer();
	}
}

function changePlayIcon() {
	(video.paused) ? (playIcon.src = 'assets/img/svg/play.svg', playIcon.style.filter = 'invert(0%)') :
		(playIcon.src = 'assets/img/svg/pause.svg', playIcon.style.filter = 'invert(70%)');
}
function changePlayButtonContainer() {
	(video.paused) ? playButtonContainer.style.display = 'block' : playButtonContainer.style.display = 'none';
}
function changePlayButtonPosition() {
	const videoPlayerHight = document.querySelector('.video__container').offsetHeight;
	const videoPlayerWidth = document.querySelector('.video__container').offsetWidth;
	const playButtonContainer = document.querySelector('.video__playbutton-container');
	playButtonContainer.style.top = `${videoPlayerHight / 2 - 75}px`;
	playButtonContainer.style.left = `${videoPlayerWidth / 2 - 75}px`;
}
/*VOLUME-BAR*/
function volumeBarManager() {
	const soundContainer = document.querySelector('.sound__container');
	const volumeBarContainer = document.querySelector('.volume__bar-container');



	soundContainer.addEventListener('mouseover', showVolumeBar);
	soundContainer.addEventListener('mouseout', hideVolumeBar);
	volumeBar.addEventListener('mouseup', changeVolume);
	soundButton.addEventListener('click', muteVideo);

	function showVolumeBar() {
		volumeBarContainer.style.width = '120px';
	}
	function hideVolumeBar() {
		volumeBarContainer.style.width = '0px';
	}
	function changeVolume() {
		video.volume = volumeBar.value;
		(video.volume) ? soundButton.classList.remove('muted') : soundButton.classList.add('muted');
	}
}
function muteVideo() {
	muteVolume();
	animateMuteIcon();
}
function muteVolume() {
	(!video.muted) ? volumeBar.value = 0 : volumeBar.value = video.volume;
	video.muted = !video.muted;
}
function animateMuteIcon() {
	(!video.muted) ? soundButton.classList.remove('muted') : soundButton.classList.add('muted');
}
