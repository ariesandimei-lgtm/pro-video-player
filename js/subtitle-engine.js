class SubtitleEngine {

    constructor(video, container){

        this.video = video;
        this.container = container;

        this.segments = [];

        this.enabled = true;

        this.delay = 0;
this.layout =
    new SubtitleLayout();
    }


    async load(url){

        try{

            const response =
                await fetch(url);


            const data =
                await response.json();


            this.segments =
                data.segments;


            console.log(
                "Subtitle loaded:",
                this.segments
            );


            return true;


        } catch(error){

            console.error(error);

            return false;

        }

    }



    update(){


        if(!this.enabled){

            this.container.innerHTML = "";

            return;

        }



        const currentTime =
            this.video.currentTime +
            this.delay;



        const segment =
            this.segments.find(item =>

                currentTime >= item.start &&
                currentTime <= item.end

            );



        if(!segment){

            this.container.innerHTML = "";

            return;

        }



        let wordsHTML = "";

segment.words.forEach(word => {


    const active =
        currentTime >= word.start &&
        currentTime <= word.end;


    if(active){

        wordsHTML +=
        `<span class="active-word">${word.text}</span> `;

    }

    else{

        wordsHTML +=
        `${word.text} `;

    }

});


this.container.innerHTML =
    wordsHTML;


    }



    start(){

        const loop = () => {

            this.update();

            requestAnimationFrame(loop);

        };


        loop();

    }



    toggle(){

        this.enabled =
            !this.enabled;

    }



    setDelay(value){

        this.delay =
            value;

    }


}
