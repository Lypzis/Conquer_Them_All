class Warrior extends Unity {

    constructor(game, x, y, unityKey, friendly){
        super(game, x, y, unityKey);
        
        this.friendly = friendly;

        this.defence = 0.6;
        this.attack = 125;
        this.health = 600;
        this.movement = 4;
        this.speed = 40;
        this.chargeSpeed = 60;
        this.chargeMaxDamage = 225;
        this.minChargeDist = 3;
        //this.morale = null; 

    }  
}