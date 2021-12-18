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
}
function volumeBarManager() {
	const soundContainer = document.querySelector('.sound__container');
	const volumeBarContainer = document.querySelector('.volume__bar-container');

	soundContainer.addEventListener('mouseover', showVolumeBar);
	soundContainer.addEventListener('mouseout', hideVolumeBar);

	function showVolumeBar() {
		volumeBarContainer.style.width = '120px';
	}
	function hideVolumeBar() {
		volumeBarContainer.style.width = '0px';
	}
}
function playVideoManager() {
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
		let durationMinutes = Math.floor(video.duration / 60);
		let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
		let currentDurationMinutes = Math.floor(video.currentTime / 60);
		let currentDurationSeconds = Math.floor(video.currentTime - currentDurationMinutes * 60);
		currentTime.textContent = `${currentDurationMinutes}:${addZero(currentDurationSeconds)}`;
		totalDuration.textContent = `${durationMinutes}:${addZero(durationSeconds)}`;

		function addZero(el) {
			return (+el < 10) ? '0' + el : el;
		}
	}
}