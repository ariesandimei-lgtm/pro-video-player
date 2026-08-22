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





    // ====================
    // PROGRESS BAR
    // ====================


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


        });



        progressBar.addEventListener(
        "input",
        ()=>{


            if(video.duration){


                video.currentTime =
                (progressBar.value/100)
                *
                video.duration;


            }


        });


    }






    // ====================
    // VOLUME
    // ====================


    if(volumeControl){


        volumeControl.addEventListener(
        "input",
        ()=>{


            video.volume =
            volumeControl.value / 100;


            if(video.volume === 0){

                video.muted = true;

            }

            else{

                video.muted = false;

            }


        });


    }




});







// ====================
// PLAY PAUSE
// ====================


function togglePlay(){


    if(video.paused){


        video.play();


    }

    else{


        video.pause();


    }


}








// ====================
// MUTE
// ====================


function toggleMute(){


    video.muted =
    !video.muted;


}








// ====================
// SPEED
// ====================


function changeSpeed(speed){


    video.playbackRate =
    speed;


}








// ====================
// SUBTITLE ON OFF
// ====================


function toggleSubtitle(){


    if(window.subtitleEngine){


        window.subtitleEngine.toggle();


    }


}








// ====================
// SUBTITLE SIZE
// ====================


function subtitleSize(size){



    if(!subtitleContainer){

        return;

    }



    if(size=="small"){


        subtitleContainer.style.fontSize =
        "18px";


    }



    if(size=="medium"){


        subtitleContainer.style.fontSize =
        "28px";


    }



    if(size=="large"){


        subtitleContainer.style.fontSize =
        "38px";


    }



}








// ====================
// SUBTITLE DELAY
// ====================


function subtitleDelay(value){


    if(window.subtitleEngine){


        window.subtitleEngine.setDelay(
            value
        );


    }


}








// ====================
// FULLSCREEN V3.4.2
// ====================


function fullscreenVideo(){


    const player =
    document.querySelector(
        ".player-wrapper"
    );



    player.classList.toggle(
        "fullscreen-mode"
    );



    if(!document.fullscreenElement){



        if(player.requestFullscreen){


            player.requestFullscreen();


        }

        else if(player.webkitRequestFullscreen){


            player.webkitRequestFullscreen();


        }



    }

    else{


        if(document.exitFullscreen){


            document.exitFullscreen();


        }


    }


}
