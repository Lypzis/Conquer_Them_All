//////////////////////////////////////////////////////////////////////////////
/*
 * @by: Lypzis Team
 * @author: Victor V. Piccoli
 * @doc: Menu of the Game
*/
//////////////////////////////////////////////////////////////////////////////

class GameMenu {

    constructor() {
        this.optionCount = 1; //used to calculate where to vertically place each nav item on addMenuOption

        this.titleText = game.make.text(game.world.centerX, 100, "Conquer Them All", {
            font: 'bold 60pt SkydomeGlory',
            fill: '#fdfdfd',
            align: 'center'
        });

        this.optionStyle = {
            font: '30pt SkydomeGlory',
            fill: 'white',
            align: 'left'
        };

        this.start = this.addMenuOption('Start', (target) => console.log(this.optionCount) );
        this.options = this.addMenuOption('Options', (target) => console.log('You clicked options!') );
        this.instructions = this.addMenuOption('Instructions', (target) => console.log('You clicked instructions!') );
        this.credits = this.addMenuOption('Credits', (target) => console.log(this.optionCount) );

        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    }

    // Menu buttons/options factory
    addMenuOption(text, callback) {

        const optionStyle = {
            font: '30pt SkydomeGlory',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        };

        // automatically set the y position of the option items, so it appends them vertically after each other
        const txt = game.make.text(30, (this.optionCount * 80) + 175, text, optionStyle);

        // on hover
        const onOver = (target) => {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
        };

        // on out
        const onOut = (target) => {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
        };

        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        txt.inputEnabled = true; // makes the item clickable
        txt.events.onInputUp.add(callback); // on click, execute the received function
        txt.events.onInputOver.add(onOver);
        txt.events.onInputOut.add(onOut);

        this.optionCount++;

        return txt;
    }

    preload() {

    }

    create() {
        game.add.sprite(0, 0, 'menu-bg');

        game.add.existing(this.titleText);
        game.add.existing(this.start);
        game.add.existing(this.instructions);
        game.add.existing(this.options);
        game.add.existing(this.credits);

        // game continue even when not focused
        game.stage.disableVisibilityChange = true;
    }

}