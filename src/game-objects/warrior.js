class Warrior extends Unity {

    constructor(game, x, y, unityKey){
        super(game, x, y, unityKey);

        
        this.defence = 0.5;
        this.attack = 125;
        this.health = 600;
        this.movement = 4;
        this.speed = 40;
        this.chargeSpeed = 60;
        this.chargeMaxDamage = 225;
        this.chargeDist = 3;
        //this.morale = null; 

    }  
}