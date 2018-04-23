//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @autor: Victor V. Piccoli
 * @doc: Global styles object, each expression returns an style object
*/
//////////////////////////////////////////////////////////////////////////////

const styles = {

    /////////////////////////////////////////////////////////////////////////
    // For lighter backgrounds
    darkHeader() {
        return {
            font: 'bold 65pt SkydomeGlory',
            fill: 'black',
            align: 'center'
        }
    },

    navDarkItem() {
        return {
            base: {
                font: '30pt SkydomeGlory',
                align: 'left',
                strokeThickness: 4,
            },

            default: {
                fill: 'black',
                stroke: 'black'
            },

            onHover: {
                fill: "#2d2d2d",
                stroke: "rgba(84,84,84,0.5)"
            },

        }
    },

    //////////////////////////////////////////////////////////////////////
    // For darker backgrounds
    lightHeader() {
        return {
            font: 'bold 65pt SkydomeGlory',
            fill: '#fdfdfd',
            align: 'center'
        }
    },

    navLightItem() {
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

            onHover: {
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)"
            },
        }
    },

    ///////////////////////////////////////////////////////////////////////
    // Item position
    centerItem() {
        return {
            startY: 165,
            startX: game.world.centerX
        }
    },

    leftItem() {
        return {
            startY: 165,
            startX: 30
        }
    },

    // merges a modifier style object to the base style object then return it
    assignModifier(modifier, base) {
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