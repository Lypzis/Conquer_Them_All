//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global game objects storage
*/
//////////////////////////////////////////////////////////////////////////////

const unities = {

    objects: [
        {
            key: 'warrior-icon',
            defense: 0.6,
            attack: 125,
            health: 600,
            movement: 4,
            speed: 40,
            chargeSpeed: 60,
            chargeMaxDamage: 225,
            minChargeDist: 3,
            //morale = null, 
        },

        {
            key: 'hero-icon',
            defense: 0.5,
            attack: 160,
            health: 500,
            movement: 6,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 250,
            minChargeDist: 4,
            //morale: null, 
        },

        {
            key: 'enemy-warrior-icon',
            defense: 0.7,
            attack: 165,
            health: 500,
            movement: 5,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 255,
            minChargeDist: 4,
            //morale: null, 
        },

        {
            key: 'enemy-hero-icon',
            defense: 0.5,
            attack: 175,
            health: 500,
            movement: 6,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 260,
            minChargeDist: 3,
            //morale: null, 
        }
    ],

    ///////////////////////////////////////////////////////////////////
    /** - Gets the specified object.
    * @param {*} keyReceived : key(name) of the image-icon. 
    * @returns : The specific object identified by the key.
    */
    getObject(keyReceived) {
        return this.objects.find(e => { return e.key === keyReceived });
    }

}

