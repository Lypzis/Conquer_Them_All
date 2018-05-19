class EnemyWarrior extends Unity {

    constructor(game, x, y, unityKey, friendly){
        super(game, x, y, unityKey);

        this.friendly = friendly;

        this.defence = 0.7;
        this.attack = 165;
        this.health = 500;
        this.movement = 5;
        this.speed = 50;
        this.chargeSpeed = 70;
        this.chargeMaxDamage = 255;
        this.minChargeDist = 4;
        //this.morale = null; 

    }  
}