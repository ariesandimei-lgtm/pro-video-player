class SubtitleEngine {

    constructor(video, container) {

        this.video = video;
        this.container = container;

        this.segments = [];

        this.enabled = true;

    }


    async load(url) {

        try {

            const response =
                await fetch(url);


            const data =
                await response.json();


            this.segments =
                data.segments;


            console.log(
                "Subtitle berhasil dimuat",
                this.segments
            );


            return true;


        } catch(error) {


            console.error(
                "Subtitle gagal:",
                error
            );


            return false;

        }

    }



    update() {


        if(!this.enabled){

            this.container.textContent = "";

            return;

        }


        const currentTime =
            this.video.currentTime;



        const active =
            this.segments.find(
                segment =>

                currentTime >= segment.start &&
                currentTime <= segment.end

            );



        if(active){


            this.container.textContent =
                active.text;


        } else {


            this.container.textContent =
                "";

        }


    }



    start(){


        const loop = () => {


            this.update();


            requestAnimationFrame(loop);


        };


        loop();


    }



    setEnabled(value){

        this.enabled = value;

    }


}
