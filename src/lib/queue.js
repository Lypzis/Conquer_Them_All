//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global queue, handle objects in wait
*/
//////////////////////////////////////////////////////////////////////////

const queue = {
    activated: [],

    checkExists(unity) {
        const temp = this.activated.find(e => e.id === unity.id);

        if (temp === undefined)
            return false;

        return true;
    },

    removeExists(unity) {
      
        if (this.checkExists(unity))
            this.activated.splice(this.activated.indexOf(unity), 1);
        else
            console.log('not found!');
            
    },

    add(unity) {
        if (!this.checkExists(unity))
            this.activated.push(unity);
    },

    safeClear(){
        this.activated.forEach(e => {
            e.active = false;
            e.mouseX = null;
            e.mouseY = null;
            e.execute = false;   
        });

        this.activated = [];
    }

}