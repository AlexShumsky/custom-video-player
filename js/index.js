'use strict'
const video = document.querySelector('.video');
const playButton = document.querySelector('.play-b');
const soundButton = document.querySelector('.sound-b');
const playIcon = document.querySelector('.play');

window.addEventListener('load', functionsManager);

function functionsManager() {
	playVideoManager();
	showVideoDurationManager();
	volumeBarManager();
	progressBarManager();
}
function volumeBarManager() {
	const soundContainer = document.querySelector('.sound__container');
	const volumeBarContainer = document.querySelector('.volume__bar-container');
	const volumeBar = document.querySelector('.volume-bar');

	soundContainer.addEventListener('mouseover', showVolumeBar);
	soundContainer.addEventListener('mouseout', hideVolumeBar);

	function showVolumeBar() {
		volumeBarContainer.style.width = '120px';
	}
	function hideVolumeBar() {
		volumeBarContainer.style.width = '0px';
	}

	volumeBar.addEventListener('mouseup', changeVolume)
	function changeVolume() {
		video.volume = volumeBar.value;
	}
}
function playVideoManager() {
	const nextVideoButton = document.querySelector('.next-b');
	let counter = 1;
	playButton.addEventListener('click', playVideo);

	video.addEventListener('ended', changePlayIcon);

	function playVideo() {
		if (video.paused) {
			video.play();
			changePlayIcon();
		}
		else {
			video.pause();
			changePlayIcon();
		}
	}
	nextVideoButton.addEventListener('click', playNextVideo);
	function playNextVideo() {
		(counter == 3) ? (counter = 1) : counter++;
		video.src = `assets/video/video${counter}.mp4`;
		changePlayIcon();
	}
	function changePlayIcon() {
		(video.paused) ? (playIcon.src = 'assets/img/svg/play.svg', playIcon.style.filter = 'invert(0%)') :
			(playIcon.src = 'assets/img/svg/pause.svg', playIcon.style.filter = 'invert(70%)');
	}
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
function progressBarManager() {
	const videoProgress = document.querySelector('.video-progress');
	const videoProgressFilled = document.querySelector('.video-progress-filled');

	video.addEventListener('timeupdate', changeProgressBarOnTime);
	videoProgress.addEventListener('click', changeProgressBarPerClick);

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
}