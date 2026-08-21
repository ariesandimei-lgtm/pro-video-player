
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const video =
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

console.log(
    "Subtitle loaded:",
    loaded
);


        if (loaded) {

            subtitleStatus.textContent =
                "Aktif";

            subtitleEngine.start();

        } else {

            subtitleStatus.textContent =
                "Gagal";

        }


        window.subtitleEngine =
            subtitleEngine;

    }
);
let subtitleDelayValue = 0;


function toggleSubtitle(){

    subtitleEngine.toggle();

}



function subtitleSize(size){

    const subtitle =
        document.getElementById(
            "subtitleContainer"
        );


    if(size === "small"){

        subtitle.style.fontSize="18px";

    }


    if(size === "medium"){

        subtitle.style.fontSize="28px";

    }


    if(size === "large"){

        subtitle.style.fontSize="38px";

    }

}



function subtitleDelay(value){

    subtitleDelayValue = value;

    subtitleEngine.setDelay(value);

}
function changeSpeed(speed){

    const video =
        document.getElementById(
            "videoPlayer"
        );

    video.playbackRate = speed;

}
function togglePlay(){

    const video =
    document.getElementById(
        "videoPlayer"
    );


    if(video.paused){

        video.play();

    }

    else{

        video.pause();

    }

}



function toggleMute(){

    const video =
    document.getElementById(
        "videoPlayer"
    );


    video.muted =
    !video.muted;

}



function fullscreenVideo(){

    const video =
    document.getElementById(
        "videoPlayer"
    );


    if(video.requestFullscreen){

        video.requestFullscreen();

    }

}
const video =
document.getElementById(
    "videoPlayer"
);


const progressBar =
document.getElementById(
    "progressBar"
);



video.addEventListener(
    "timeupdate",
    ()=>{


        if(video.duration){

            progressBar.value =
            (video.currentTime /
            video.duration) * 100;

        }


    }
);



progressBar.addEventListener(
    "input",
    ()=>{


        if(video.duration){

            video.currentTime =
            (progressBar.value / 100)
            *
            video.duration;

        }


    }
);
