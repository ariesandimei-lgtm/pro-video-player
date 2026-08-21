class SubtitleEngine {

    constructor(video, container) {

        this.video = video;
        this.container = container;

        this.segments = [];

        this.enabled = true;

    }


    async load(url) {

        try {

            const response = await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "Subtitle file tidak ditemukan"
                );

            }


            const data = await response.json();


            this.segments = data.segments;


            console.log(
                "Subtitle berhasil dimuat:",
                this.segments
            );


            return true;


        } catch (error) {


            console.error(
                "Gagal memuat subtitle:",
                error
            );


            return false;

        }

    }



    update() {


        if (!this.enabled) {

            this.container.textContent = "";

            return;

        }


        const currentTime =
            this.video.currentTime;



        const activeSubtitle =
            this.segments.find(
                segment =>

                currentTime >= segment.start &&
                currentTime <= segment.end

            );



        if (activeSubtitle) {


            this.container.textContent =
                activeSubtitle.text;


        } else {


            this.container.textContent =
                "";

        }


    }



    start() {


        const updateLoop = () => {


            this.update();


            requestAnimationFrame(
                updateLoop
            );


        };


        updateLoop();


    }



    enable() {

        this.enabled = true;

    }



    disable() {

        this.enabled = false;

        this.container.textContent = "";

    }



    toggle() {

        this.enabled =
            !this.enabled;

    }


}
