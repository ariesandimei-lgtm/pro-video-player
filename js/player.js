
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
                "subtitles/indonesia.json"
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
