let video;
let progressBar;
let volumeControl;


document.addEventListener(
"DOMContentLoaded",
()=>{


video=document.getElementById(
"videoPlayer"
);


progressBar=document.getElementById(
"progressBar"
);


volumeControl=document.getElementById(
"volumeControl"
);



// subtitle

if(typeof SubtitleEngine !== "undefined"){


let engine =
new SubtitleEngine(
video,
document.getElementById(
"subtitleContainer"
)
);



engine.load(
"./subtitles/indonesia.json"
)
.then(ok=>{


if(ok){

document.getElementById(
"subtitleStatus"
).innerHTML="Aktif";


engine.start();


}


});


window.subtitleEngine=engine;


}




// progress


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




// volume


volumeControl.addEventListener(
"input",
()=>{


video.volume =
volumeControl.value/100;


});



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

video.playbackRate=speed;

}









// =====================
// QUALITY SWITCH
// =====================


function changeQuality(q){


let files={

720:"videos/sample-720.mp4",

1080:"videos/sample-1080.mp4",

1440:"videos/sample-1440.mp4",

2160:"videos/sample-2160.mp4"

};



let current =
video.currentTime;


let playing =
!video.paused;



let volume =
video.volume;



video.src =
files[q];



video.load();



video.onloadedmetadata=function(){


video.currentTime =
current;



video.volume =
volume;



if(playing){

video.play();

}



};



}









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



if(size=="small")
sub.style.fontSize="18px";


if(size=="medium")
sub.style.fontSize="28px";


if(size=="large")
sub.style.fontSize="38px";



}







function subtitleDelay(v){


if(window.subtitleEngine){

window.subtitleEngine.setDelay(v);

}


}









function fullscreenVideo(){


let box =
document.querySelector(
".player-wrapper"
);



if(!document.fullscreenElement){

box.requestFullscreen();

}

else{

document.exitFullscreen();

}


}
