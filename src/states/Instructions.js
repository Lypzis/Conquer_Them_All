class Instructions {
    create(){
        game.add.sprite(0, 0, 'quit-bg');

        utils.navItemSetter('<- Back', 4, 95, target => {
            game.state.start('GameMenu');
        });
    }

    update(){

    }
    
}