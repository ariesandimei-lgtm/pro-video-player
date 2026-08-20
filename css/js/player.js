
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


        if (
            !video ||
            !subtitleContainer
        ) {

            console.error(
                "Elemen video atau subtitle tidak ditemukan."
            );

            return;
        }


        const subtitleEngine =
            new SubtitleEngine(
                video,
                subtitleContainer
            );


        const loaded =
            await subtitleEngine.load(
                "subtitles/indonesia.json"
            );


        if (loaded) {

            subtitleStatus.textContent =
                "Aktif";

            subtitleEngine.start();

        } else {

            subtitleStatus.textContent =
                "Gagal dimuat";

        }


        video.addEventListener(
            "play",
            () => {

                console.log(
                    "Video diputar"
                );

            }
        );


        video.addEventListener(
            "pause",
            () => {

                console.log(
                    "Video dijeda"
                );

                subtitleEngine.update();

            }
        );


        video.addEventListener(
            "seeked",
            () => {

                console.log(
                    "Seek:",
                    video.currentTime.toFixed(2)
                );

                subtitleEngine.update();

            }
        );


        video.addEventListener(
            "ratechange",
            () => {

                console.log(
                    "Playback speed:",
                    video.playbackRate
                );

                subtitleEngine.update();

            }
        );


        window.subtitleEngine =
            subtitleEngine;

    }
);
