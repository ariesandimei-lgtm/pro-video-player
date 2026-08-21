
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

    subtitleEngine.delay =
        value;

}
function changeSpeed(speed){

    const video =
        document.getElementById(
            "videoPlayer"
        );

    video.playbackRate = speed;

}
