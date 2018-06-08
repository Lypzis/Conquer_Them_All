//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Load a level into the game Window ( No levels yet )
*/
//////////////////////////////////////////////////////////////////////////////

class TheGame {

    init() {
        this.titleText = game.add.text(game.world.centerX, 100, "Game", styles.lightHeader());

        // add game-table-bg, it should place itself right above the table, then some pixels left and some to top;
        this.tableBG = game.add.image(0, 0, 'game-table-bg');

        this.executeActionsBtn = this.add.button(
            this.world.centerX,
            this.world.height - 48,
            'execute-btn',
            this.executeActions,
            this, 1, 0, 2, 0);

        utils.navItemSetter('<- Back', 1, 90, target => {
            this.mouseX = null;
            this.mouseY = null;
            this.warriors = null;
            this.hero = null;
            this.enemyHero = null;
            this.enemyWarriors = null;
            this.layer = null;
            this.executeActionsBtn = null;
            this.total = null;

            queue.activated = [];
            unities.unitiesCreated = [];

            game.state.start('GameMenu');
        }, null, true);

        ////////////////////////////////////////////////////////////////////////////////
        // Creates the table, each level should receive a different map(consideration of levels classes)
        // and then charge the level in this class
        maps.loadMap('tilemap');

        this.warriors = utils.generateTableUnities('warrior-icon', 2, 0, true);
        this.hero = utils.generateTableUnities('hero-icon', 1, 1, true);

        this.enemyHero = utils.generateTableUnities('enemy-hero-icon', 1, 3, false);
        this.enemyWarriors = utils.generateTableUnities('enemy-warrior-icon', 2, 4, false);

        unities.unitiesCreated = Array.prototype.concat(
            this.enemyHero,
            this.hero,
            this.enemyWarriors,
            this.warriors
        );

        this.layer = maps.getLayer();

        //////////////////////////////////////////////////////////////////////////////////////////////
        // total army feedback main player image
        this.army1 = game.add.sprite(80, game.world.centerY - 32, 'hero-icon-64', 0); //

        this.army1Title = game.add.text(this.army1.x + (this.army1.width * 2), game.world.centerY - 40, null, styles.customText('18pt'));
        this.army1Status = game.add.text(this.army1.x + (this.army1.width * 2), game.world.centerY - 16, null, styles.customText('16pt'));

        // total army feedback main enemy image
        this.army2 = game.add.sprite(game.world.width - 80, game.world.centerY - 32, 'enemy-hero-icon-64', 0);

        this.army2Title = game.add.text(this.army2.x - (this.army2.width * 2), game.world.centerY - 40, null, styles.customText('18pt'));
        this.army2Status = game.add.text(this.army2.x - (this.army2.width * 2), game.world.centerY - 16, null, styles.customText('16pt'));

        this.overWrite = false; //??
        this.onHover = false; //??
        //////////////////////////////////////////////////////////////////////////////////////////////

        utils.centerGameObjects([
            this.titleText,
            this.executeActionsBtn,
            this.army1,
            this.army2,
            this.army1Title,
            this.army2Title,
            this.army1Status,
            this.army2Status,
        ]);

        // FPS
        game.time.advancedTiming = true;
    }

    checkTotalTroops() {
        let enemyTotal = 0;
        let friendlyTotal = 0;

        unities.unitiesCreated.forEach(e => {
            if (e.friendly)
                friendlyTotal += e.health;
            else
                enemyTotal += e.health;
        });

        this.army1Title.text = 'Hero Army';
        this.army2Title.text = 'Enemy Army';
        this.army1Status.text = friendlyTotal;
        this.army2Status.text = enemyTotal;

    }

    checkUnitStatusOnHover() {
        this.unity = {
            //name: null, future implementation
            key: null,
            health: null,
            attack: null,
            defense: null,
            friendly: null,
        };

        //let picture = '-64';

        unities.unitiesCreated.forEach(e => {
            if (e.check) {
                this.unity.key = e.key;
                this.unity.health = e.health;
                this.unity.attack = e.attack;
                this.unity.defense = `${Math.floor((1 - e.defense) * 100)}%`;
                this.unity.friendly = e.friendly;
            }
        });

        if (this.unity.key != null) {
            let str = `${this.unity.health} ${this.unity.attack} ${this.unity.defense}`

            if (this.unity.friendly) {
                this.army1Title.text = this.unity.key;
                this.army1Status.text = str;
            } else {
                this.army2Title.text = this.unity.key;
                this.army2Status.text = str;
            }
        }

    }

    onClick() {
        // On click
        game.input.onDown.add(() => {
            // capture click axis
            this.mouseX = maps.gridCoordinateConvert(game.input.x);
            this.mouseY = maps.gridCoordinateConvert(game.input.y);

            // gets the id of the activated object
            unities.unitiesCreated.forEach(e => {
                if (e.active) {
                    e.setMouseAxis(this.mouseX, this.mouseY);
                }
            });
        });
    }

    // unities that have been given a proper place to go will now be ordered to move to it
    executeActions() {
        // no need to store dead stuff.
        unities.unitiesCreated = unities.unitiesCreated.filter(e => e.alive);

        if (queue.activated.length > 0)
            unities.unitiesCreated.forEach(e => {
                e.inputEnabled = false;
                e.executePressed = true;
            });
        else
            unities.unitiesCreated.forEach(e => {
                e.inputEnabled = true;
                e.executePressed = true;
            });

        queue.activated.forEach(e => {
            e.execute = true;
        });
    }

    create() {
        this.init();
        this.onClick();
    }

    update() {
        game.debug.text(game.time.fps, 34, 46, "#00ff00");

        // works, put a trigger to call only once though
        this.checkTotalTroops();
        this.checkUnitStatusOnHover();
    }
}


