class EnemyHero extends Unity {

    constructor(game, x, y, unityKey, friendly){
        super(game, x, y, unityKey);

        this.friendly = friendly;
        
        this.defence = 0.5;
        this.attack = 175;
        this.health = 500;
        this.movement = 6;
        this.speed = 50;
        this.chargeSpeed = 70;
        this.chargeMaxDamage = 260;
        this.minChargeDist = 3;
        //this.morale = null; 

    }  
}