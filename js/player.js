// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.5.1 FIX
// ==========================


let video;
let progressBar;
let volumeControl;

let controlTimer;



// ==========================
// START
// ==========================


document.addEventListener(
"DOMContentLoaded",
async()=>{


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





    // ======================
    // SUBTITLE ENGINE
    // ======================


    const subtitleBox =
    document.getElementById(
        "subtitleContainer"
    );


    const subtitleStatus =
    document.getElementById(
        "subtitleStatus"
    );



    if(
        typeof SubtitleEngine !== "undefined"
    ){

        let subtitleEngine =
        new SubtitleEngine(
            video,
            subtitleBox
        );



        let loaded =
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





    // ======================
    // TIME BAR
    // ======================


    video.addEventListener(
    "timeupdate",
    ()=>{


        if(video.duration){


            progressBar.value =
            (
                video.currentTime /
                video.duration
            )
            *
            100;


        }


    });





    progressBar.addEventListener(
    "input",
    ()=>{


        if(video.duration){


            video.currentTime =
            (
                progressBar.value /
                100
            )
            *
            video.duration;


        }


    });





    // ======================
    // VOLUME
    // ======================


    volumeControl.addEventListener(
    "input",
    ()=>{


        video.volume =
        volumeControl.value / 100;


        video.muted =
        video.volume === 0;


    });



});









// ==========================
// PLAY PAUSE
// ==========================


function togglePlay(){


    if(!video)
    return;



    if(video.paused){


        video.play()
        .catch(()=>{});


    }
    else{


        video.pause();


    }


}









// ==========================
// SPEED
// ==========================


function changeSpeed(speed){


    if(video){

        video.playbackRate =
        speed;

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


    if(window.subtitleEngine){

        window.subtitleEngine.toggle();

    }


}



function subtitleSize(size){


    let sub =
    document.getElementById(
        "subtitleContainer"
    );



    if(!sub)
    return;



    if(size==="small")
    sub.style.fontSize="18px";



    if(size==="medium")
    sub.style.fontSize="28px";



    if(size==="large")
    sub.style.fontSize="38px";


}






function subtitleDelay(value){


    if(window.subtitleEngine){

        window.subtitleEngine.setDelay(
            value
        );

    }


}









// ==========================
// QUALITY SWITCH FIX
// ==========================


function changeQuality(quality){


    if(!video)
    return;



    let time =
    video.currentTime;



    let playing =
    !video.paused;



    let volume =
    video.volume;



    let src="";



    switch(quality){


        case "720":

        src =
        "videos/sample-720.mp4";

        break;



        case "1080":

        src =
        "videos/sample-1080.mp4";

        break;



        case "1440":

        src =
        "videos/sample-1440.mp4";

        break;



        case "2160":

        src =
        "videos/sample-2160.mp4";

        break;



        default:

        return;


    }



    console.log(
        "QUALITY:",
        src
    );



    video.pause();



    video.src =
    src;



    video.load();





    video.onloadedmetadata =
    ()=>{


        video.currentTime =
        Math.min(
            time,
            video.duration
        );



        video.volume =
        volume;



        if(playing){


            video.play()
            .catch(
                e=>console.log(e)
            );


        }



    };



}









// ==========================
// FULLSCREEN
// ==========================


function fullscreenVideo(){


    let player =
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
// FULLSCREEN CONTROL
// ==========================


document.addEventListener(
"fullscreenchange",
()=>{


    let player =
    document.querySelector(
        ".player-wrapper"
    );



    if(document.fullscreenElement){


        player.classList.add(
            "hide-control"
        );



        player.onclick =
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


    let player =
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
