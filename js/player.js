// ===================================
// PRO VIDEO PLAYER
// PLAYER.JS V3.5.2
// ===================================


let video;
let progressBar;
let volumeControl;

let controlTimer;



// ===================================
// INITIALIZE
// ===================================


document.addEventListener(
"DOMContentLoaded",
async ()=>{


video =
document.getElementById(
"videoPlayer"
);



progressBar =
document.getElementById(
"progressBar"
);



volumeControl =
document.getElementById(
"volumeControl"
);



const subtitleContainer =
document.getElementById(
"subtitleContainer"
);



const subtitleStatus =
document.getElementById(
"subtitleStatus"
);



// ===============================
// SUBTITLE ENGINE
// ===============================


if(typeof SubtitleEngine !== "undefined"){


const subtitleEngine =
new SubtitleEngine(
video,
subtitleContainer
);



const loaded =
await subtitleEngine.load(
"./subtitles/indonesia.json"
);



if(loaded){


subtitleStatus.innerHTML =
"Aktif";


subtitleEngine.start();


}

else{


subtitleStatus.innerHTML =
"Gagal";


}



window.subtitleEngine =
subtitleEngine;


}






// ===============================
// VIDEO PROGRESS
// ===============================


video.addEventListener(
"timeupdate",
()=>{


if(video.duration){


progressBar.value =
(video.currentTime /
video.duration) * 100;


}



});







progressBar.addEventListener(
"input",
()=>{


if(video.duration){


video.currentTime =
(progressBar.value / 100)
*
video.duration;


}


});







// ===============================
// VOLUME
// ===============================


volumeControl.addEventListener(
"input",
()=>{


video.volume =
volumeControl.value / 100;



video.muted =
video.volume === 0;



});



});








// ===================================
// PLAY PAUSE
// ===================================


function togglePlay(){


if(video.paused){


video.play();


}

else{


video.pause();


}


}








// ===================================
// MUTE
// ===================================


function toggleMute(){


video.muted =
!video.muted;


}









// ===================================
// SPEED
// ===================================


function changeSpeed(speed){


video.playbackRate =
speed;


}









// ===================================
// SUBTITLE
// ===================================


function toggleSubtitle(){


if(window.subtitleEngine){


window.subtitleEngine.toggle();


}


}







function subtitleSize(size){


let sub =
document.getElementById(
"subtitleContainer"
);



if(size==="small"){


sub.style.fontSize="18px";


}



if(size==="medium"){


sub.style.fontSize="28px";


}



if(size==="large"){


sub.style.fontSize="38px";


}


}








function subtitleDelay(value){


if(window.subtitleEngine){


window.subtitleEngine.setDelay(
value
);


}


}









// ===================================
// QUALITY SWITCH V3.5.2
// ===================================


function changeQuality(q){



let currentTime =
video.currentTime;



let playing =
!video.paused;



let source = "";





switch(q){


case "720":

source =
"./videos/sample-720.mp4";

break;



case "1080":

source =
"./videos/sample-1080.mp4";

break;



case "1440":

source =
"./videos/sample-1440.mp4";

break;



case "2160":

source =
"./videos/sample-2160.mp4";

break;



default:

return;


}






video.pause();



video.src =
source;



video.load();






video.onloadedmetadata =
()=>{


video.currentTime =
currentTime;



if(playing){


video.play();


}


};



}









// ===================================
// FULLSCREEN
// ===================================


function fullscreenVideo(){


const player =
document.querySelector(
".player-wrapper"
);



if(!document.fullscreenElement){



player.requestFullscreen();



}

else{


document.exitFullscreen();


}


}









// ===================================
// FULLSCREEN CONTROL
// YOUTUBE STYLE
// ===================================


document.addEventListener(
"fullscreenchange",
()=>{


const player =
document.querySelector(
".player-wrapper"
);



if(document.fullscreenElement){



player.classList.add(
"hide-control"
);



player.onclick =
showFullscreenControls;



player.ontouchstart =
showFullscreenControls;



}

else{


player.classList.remove(
"hide-control"
);



player.classList.remove(
"show-control"
);



}


});









function showFullscreenControls(){



const player =
document.querySelector(
".player-wrapper"
);



player.classList.remove(
"hide-control"
);



player.classList.add(
"show-control"
);




clearTimeout(
controlTimer
);




controlTimer =
setTimeout(
()=>{


player.classList.remove(
"show-control"
);



player.classList.add(
"hide-control"
);



},
3000
);



}
