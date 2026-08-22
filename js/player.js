// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.4.6
// ==========================


let video;
let progressBar;
let volumeControl;

let controlTimer;



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





    // progress video

    video.addEventListener(
    "timeupdate",
    ()=>{


        if(video.duration){


            progressBar.value =
            (video.currentTime /
            video.duration) * 100;


        }


    });





    // geser progress

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





    // volume

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
// SPEED
// ==========================


function changeSpeed(speed){


    video.playbackRate =
    speed;


}






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


        player.requestFullscreen()
        .then(()=>{


            player.classList.add(
                "hide-control"
            );


        });



    }

    else{


        document.exitFullscreen();


    }


}







// ==========================
// FULLSCREEN CONTROL
// YOUTUBE STYLE
// ==========================



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



        player.addEventListener(
            "click",
            showFullscreenControls
        );



        player.addEventListener(
            "touchstart",
            showFullscreenControls
        );



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
