let video;

let progressBar;

let volumeControl;

let subtitleContainer;



document.addEventListener(
"DOMContentLoaded",
async ()=>{


video =
document.getElementById(
"videoPlayer"
);



subtitleContainer =
document.getElementById(
"subtitleContainer"
);



const subtitleStatus =
document.getElementById(
"subtitleStatus"
);



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

if(subtitleStatus){

subtitleStatus.textContent =
"Aktif";

}


subtitleEngine.start();


}

else{


if(subtitleStatus){

subtitleStatus.textContent =
"Gagal";

}


}



window.subtitleEngine =
subtitleEngine;



progressBar =
document.getElementById(
"progressBar"
);



volumeControl =
document.getElementById(
"volumeControl"
);





if(progressBar){


video.addEventListener(
"timeupdate",
()=>{


if(video.duration){


progressBar.value =
(video.currentTime /
video.duration)
*100;


}


}
);



progressBar.addEventListener(
"input",
()=>{


if(video.duration){


video.currentTime =
(progressBar.value/100)
*
video.duration;


}


}
);


}






if(volumeControl){


volumeControl.addEventListener(
"input",
()=>{


video.volume =
volumeControl.value/100;


}
);


}



});







function changeSpeed(speed){


if(video){

video.playbackRate =
speed;

}


}






function toggleSubtitle(){


if(window.subtitleEngine){

window.subtitleEngine.toggle();

}


}







function togglePlay(){


if(video){


if(video.paused){

video.play();

}

else{

video.pause();

}


}


}








function toggleMute(){


if(video){

video.muted =
!video.muted;

}


}








function subtitleSize(size){


if(!subtitleContainer){

return;

}



if(size=="small"){

subtitleContainer.style.fontSize=
"18px";

}


if(size=="medium"){

subtitleContainer.style.fontSize=
"28px";

}


if(size=="large"){

subtitleContainer.style.fontSize=
"38px";

}


}







function subtitleDelay(value){


if(window.subtitleEngine){

window.subtitleEngine.setDelay(value);

}


}







function fullscreenVideo(){


const player =
document.querySelector(
".player-wrapper"
);



if(!document.fullscreenElement){


if(player.requestFullscreen){

player.requestFullscreen();

}


}

else{


document.exitFullscreen();


}


}
