class Hero extends Unity {

    constructor(game, x, y, unityKey){
        super(game, x, y, unityKey);

        this.defence = 0.5;
        this.attack = 160;
        this.health = 500;
        this.movement = 6;
        this.speed = 50;
        this.chargeSpeed = 70;
        this.chargeMaxDamage = 250;
        this.chargeDist = 4;
        //this.morale = null; 

    }  
}