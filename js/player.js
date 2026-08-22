// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.5 FIX
// ==========================


let video;
let progressBar;
let volumeControl;

let controlTimer;



// ==========================
// INIT
// ==========================


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




    // ======================
    // SUBTITLE ENGINE
    // ======================


    const subtitleContainer =
    document.getElementById(
        "subtitleContainer"
    );


    const subtitleStatus =
    document.getElementById(
        "subtitleStatus"
    );



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


    }



    // ======================
    // PROGRESS
    // ======================


    video.addEventListener(
    "timeupdate",
    ()=>{


        if(video.duration){


            progressBar.value =
            (
                video.currentTime /
                video.duration
            ) * 100;


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


    if(video){

        video.muted =
        !video.muted;

    }


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


    const subtitle =
    document.getElementById(
        "subtitleContainer"
    );


    if(!subtitle)
    return;



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


    if(window.subtitleEngine){

        window.subtitleEngine.setDelay(
            value
        );

    }


}








// ==========================
// QUALITY SWITCH V3.5 FIX
// ==========================


function changeQuality(quality){


    if(!video)
    return;



    let currentTime =
    video.currentTime;



    let playing =
    !video.paused;



    let volume =
    video.volume;



    let source = "";



    switch(quality){


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
        Math.min(
            currentTime,
            video.duration
        );



        video.volume =
        volume;



        if(playing){


            video.play()
            .catch(()=>{});


        }



    };


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
// ==========================


document.addEventListener(
"fullscreenchange",
()=>{


    const player =
    document.querySelector(
        ".player-wrapper"
    );



    if(!player)
    return;



    if(document.fullscreenElement){


        player.classList.add(
            "hide-control"
        );


        player.onclick =
        showFullscreenControls;



    }


    else{


        player
