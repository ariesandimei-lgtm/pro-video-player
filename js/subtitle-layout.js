class SubtitleLayout {


    constructor(){

        this.maxCharacters =
            42;

        this.maxLines =
            2;

    }



    formatWords(words){


        let lines = [];

        let currentLine = "";



        words.forEach(word => {


            let testLine =
                currentLine.length === 0
                ?
                word.text
                :
                currentLine +
                " " +
                word.text;



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
                    word.text;


            }


        });



        if(currentLine){

            lines.push(
                currentLine
            );

        }



        return lines
            .slice(0,this.maxLines)
            .join("<br>");

    }


}
