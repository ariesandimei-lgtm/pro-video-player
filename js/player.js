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




progressBar =
document.getElementById(
"progressBar"
);


volumeControl =
document.getElementById(
"volumeControl"
);





/* PROGRESS BAR */


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





/* VOLUME */


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







function togglePlay(){


if(video.paused){

video.play();

}

else{

video.pause();

}


}






function toggleMute(){


video.muted =
!video.muted;


}






function changeSpeed(speed){


video.playbackRate =
speed;


}






function toggleSubtitle(){


window.subtitleEngine.toggle();


}






function subtitleSize(size){



if(size=="small"){

subtitleContainer.style.fontSize="18px";

}


if(size=="medium"){

subtitleContainer.style.fontSize="28px";

}


if(size=="large"){

subtitleContainer.style.fontSize="38px";

}


}






function subtitleDelay(value){


window.subtitleEngine.setDelay(value);


}






function fullscreenVideo(){


const player =
document.querySelector(
".player-wrapper"
);



if(player.requestFullscreen){

player.requestFullscreen();

}


}
