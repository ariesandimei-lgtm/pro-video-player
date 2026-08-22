// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.5.1
// ==========================


let video;
let progressBar;
let volumeControl;



document.addEventListener(
"DOMContentLoaded",
async()=>{


video =
document.getElementById(
"videoPlayer"
);



const subtitleContainer =
document.getElementById(
"subtitleContainer"
);



const subtitleStatus =
document.getElementById(
"subtitleStatus"
);



// SUBTITLE

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

subtitleStatus.textContent =
"Aktif";

subtitleEngine.start();

}

else{

subtitleStatus.textContent =
"Gagal";

}



window.subtitleEngine =
subtitleEngine;



// CONTROL


progressBar =
document.getElementById(
"progressBar"
);


volumeControl =
document.getElementById(
"volumeControl"
);





video.addEventListener(
"timeupdate",
()=>{


if(video.duration){

progressBar.value =
(video.currentTime /
video.duration)*100;

}


});





progressBar.addEventListener(
"input",
()=>{


video.currentTime =
(progressBar.value/100)
*
video.duration;


});





volumeControl.addEventListener(
"input",
()=>{


video.volume =
volumeControl.value/100;


video.muted =
video.volume===0;


});


});







// PLAY

function togglePlay(){


if(video.paused){

video.play();

}

else{

video.pause();

}


}





// SPEED

function changeSpeed(speed){

video.playbackRate =
speed;

}






// MUTE

function toggleMute(){

video.muted =
!video.muted;

}







// SUBTITLE

function toggleSubtitle(){

window.subtitleEngine.toggle();

}



function subtitleSize(size){


let sub =
document.getElementById(
"subtitleContainer"
);


if(size==="small")
sub.style.fontSize="18px";


if(size==="medium")
sub.style.fontSize="28px";


if(size==="large")
sub.style.fontSize="38px";


}





function subtitleDelay(value){

window.subtitleEngine.setDelay(
value
);

}








// FULLSCREEN


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








// ==========================
// QUALITY SWITCH
// ==========================


function changeQuality(q){


let current =
video.currentTime;


let playing =
!video.paused;



let source;



switch(q){


case "720":

source =
"videos/sample-720.mp4";

break;



case "1080":

source =
"videos/sample-1080.mp4";

break;



case "1440":

source =
"videos/sample-1440.mp4";

break;



case "2160":

source =
"videos/sample-2160.mp4";

break;


}



video.src =
source;



video.load();



video.currentTime =
current;



if(playing){

video.play();

}


}
