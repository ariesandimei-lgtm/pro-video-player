// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.4.6 STABLE
// ==========================


let video;
let progressBar;
let volumeControl;

let hideTimer;



// ==========================
// INITIALIZE
// ==========================


document.addEventListener(
"DOMContentLoaded",
async ()=>{


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





    // ==========================
    // PROGRESS BAR
    // ==========================


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






    // ==========================
    // VOLUME
    // ==========================


    volumeControl.addEventListener(
    "input",
    ()=>{


        video.volume =
        volumeControl.value / 100;



        if(video.volume > 0){

            video.muted=false;

        }
        else{

            video.muted=true;

        }


    });



});









// ==========================
// PLAY PAUSE
// ==========================


function togglePlay(){


    if(video.paused){


        video.play();


    }
    else{


        video.pause();


    }


}







// ==========================
// SPEED
// ==========================


function changeSpeed(speed){


    video.playbackRate =
    speed;


}







// ==========================
// MUTE
// ==========================


function toggleMute(){


    video.muted =
    !video.muted;


}








// ==========================
// SUBTITLE
// ==========================


function toggleSubtitle(){


    window.subtitleEngine.toggle();


}






function subtitleSize(size){


    const subtitle =
    document.getElementById(
        "subtitleContainer"
    );



    if(size==="small"){


        subtitle.style.fontSize =
        "18px";


    }



    if(size==="medium"){


        subtitle.style.fontSize =
        "28px";


    }



    if(size==="large"){


        subtitle.style.fontSize =
        "38px";


    }


}






function subtitleDelay(value){


    window.subtitleEngine.setDelay(
        value
    );


}








// ==========================
// FULLSCREEN
// ==========================


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
// FULLSCREEN AUTO HIDE
// ==========================


document.addEventListener(
"fullscreenchange",
()=>{


    const player =
    document.querySelector(
        ".player-wrapper"
    );



    if(document.fullscreenElement){


        hideControl();



        player.onclick =
        ()=>{


            showControl();


        };


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







function hideControl(){


    const player =
    document.querySelector(
        ".player-wrapper"
    );



    player.classList.add(
        "hide-control"
    );


    player.classList.remove(
        "show-control"
    );


}








function showControl(){


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
        hideTimer
    );



    hideTimer =
    setTimeout(
    ()=>{


        hideControl();


    },
    3000
    );


}
