//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Global styles class, each function expression returns an style object
*/
//////////////////////////////////////////////////////////////////////////////

class styles {

    header() {
        return {
            font: 'bold 65pt SkydomeGlory',
            fill: '#fdfdfd',
            align: 'center'
        }
    }

    navItem() {
        return {
            font: '30pt SkydomeGlory',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4,

            onOver(target) {
                target.fill = "#FEFFD5";
                target.stroke = "rgba(200,200,200,0.5)";
            },

            onOut(target) {
                target.fill = "white";
                target.stroke = "rgba(0,0,0,0)";
            },

            inverseColor(target){
                target.fill = 'black',
                target.stroke = 'black'
            }
        }
    }
}