//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global game objects storage
*/
//////////////////////////////////////////////////////////////////////////////

const unities = {

    unitiesCreated: [],

    objects: [
        {
            key: 'warrior-icon',
            name: 'Dark Cloack Infantry',
            defense: 0.6,
            attack: 25,
            health: 120,
            movement: 4,
            speed: 40,
            chargeSpeed: 60,
            chargeMaxDamage: 45,
            minChargeDist: 3,
        },

        {
            key: 'hero-icon',
            name: "Yrinn's Thorns",
            defense: 0.5,
            attack: 32,
            health: 100,
            movement: 6,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 50,
            minChargeDist: 4,
        },

        {
            key: 'enemy-warrior-icon',
            name: '???',
            defense: 0.7,
            attack: 33,
            health: 100,
            movement: 5,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 51,
            minChargeDist: 4,
        },

        {
            key: 'enemy-hero-icon',
            name: '???',
            defense: 0.5,
            attack: 35,
            health: 100,
            movement: 6,
            speed: 50,
            chargeSpeed: 70,
            chargeMaxDamage: 52,
            minChargeDist: 3,
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

