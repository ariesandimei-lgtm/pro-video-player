class SubtitleEngine {


constructor(video, container){

    this.video = video;
    this.container = container;

    this.segments = [];

    this.enabled = true;

    this.delay = 0;
this.segmenter =
    new SubtitleSegmenter();
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
            "Word subtitle loaded",
            this.segments
        );


        return true;


    }catch(error){

        console.error(error);

        return false;

    }

}



update(){


if(!this.enabled){

    this.container.innerHTML="";

    return;

}



const currentTime =
    this.video.currentTime +
    this.delay;



const segment =
    this.segments.find(
        item =>
        currentTime >= item.start &&
        currentTime <= item.end
    );



if(!segment){

    this.container.innerHTML="";

    return;

}



let html="";



if(segment.words){


segment.words.forEach(word=>{


let active =
currentTime >= word.start &&
currentTime <= word.end;



if(active){

html +=
`<span class="active-word">
${word.text}
</span> `;

}

else{

html +=
`${word.text} `;

}


});


}

else{


html =
segment.text;


}



const formatted =
    this.segmenter.formatSegment(
        segment
    );


this.container.innerHTML =
    formatted.displayText;



}



start(){


const loop=()=>{

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

this.delay=value;

}



}
