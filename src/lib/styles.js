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

    // obs: create a nav item for dark backgrounds and another for lighter
    navItem() {
        return {
            base: {
                font: '30pt SkydomeGlory',
                align: 'left',
                strokeThickness: 4,
            },

            default: {
                fill: 'white',
                stroke: 'rgba(0,0,0,0)'
            },

            inverse: {
                fill: 'black',
                stroke: 'black'
            },

    

            onHover: {
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)"
            },

        }
    }

    // merges an modifier style object to a base style object then return it
    assignModifier(modifier, base){
        return Object.assign(modifier, base);
    }

}

/////////////////////////////////////
// Debbug tests
/*
const test = new styles();

let styled = test.navItem();

console.log(styled.another);
console.log(styled.transform[2]);
console.log(styled.transform[0]);
*/