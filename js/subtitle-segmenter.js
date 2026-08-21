class SubtitleSegmenter {


    constructor(){

        this.maxCharacters = 42;

        this.maxLines = 2;

        this.minDuration = 1.0;

    }



    splitText(text){


        if(text.length <= this.maxCharacters){

            return [text];

        }



        const words =
            text.split(" ");



        let lines = [];

        let currentLine = "";



        words.forEach(word => {


            const testLine =
                currentLine.length === 0
                ?
                word
                :
                currentLine + " " + word;



            if(
                testLine.length <=
                this.maxCharacters
            ){

                currentLine =
                    testLine;


            }

            else {


                lines.push(
                    currentLine
                );


                currentLine =
                    word;

            }


        });



        if(currentLine){

            lines.push(
                currentLine
            );

        }



        return lines.slice(
            0,
            this.maxLines
        );


    }



    formatSegment(segment){


        const result = {
            ...segment
        };



        const lines =
            this.splitText(
                segment.text
            );



        result.displayText =
            lines.join("\n");



        return result;


    }


}
