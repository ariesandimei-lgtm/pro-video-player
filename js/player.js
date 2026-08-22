// ==========================
// PRO VIDEO PLAYER
// PLAYER.JS V3.5
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



    // ==========================
    // SUBTITLE ENGINE
    // ==========================


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



    // ==========================
    // CONTROL
    // ==========================


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
            video.duration) * 100;


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
// VOLUME
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


    player.classList.add(
        "hide-control"
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






document.querySelector(
".player-wrapper"
)
.addEventListener(
"click",
()=>{


const player =
document.querySelector(
".player-wrapper"
);



if(document.fullscreenElement){


    player.classList.remove(
        "hide-control"
    );


    player.classList.add(
        "show-control"
    );



clearTimeout(controlTimer);



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


});









// ==========================
// QUALITY SELECTOR V3.5
// ==========================


function changeQuality(quality){


    const currentTime =
    video.currentTime;


    const isPlaying =
    !video.paused;



    let source = "";



    switch(quality){


        case "720":

            source =
            "video/sample-720.mp4";

        break;



        case "1080":

            source =
            "video/sample-1080.mp4";

        break;



        case "1440":

            source =
            "video/sample-1440.mp4";

        break;



        case "2160":

            source =
            "video/sample-2160.mp4";

        break;


        default:

            source =
            "video/sample.mp4";

    }





    video.src =
    source;



    video.load();



    video.currentTime =
    currentTime;



    if(isPlaying){


        video.play()
        .catch(
        error=>{
            console.log(error);
        });


    }



}
