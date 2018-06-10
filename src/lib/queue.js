//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global queue, stores activated objects and handles their execution order.
*/
//////////////////////////////////////////////////////////////////////////////

const queue = {
    activated: [],

    /** - Check if a unity is already in the queue.
    * @param {*} unity : an unity object.
    * @returns : If the unity exists in the queue, returns true, otherwise, false.
    */
    checkExists(unity) {
        const temp = this.activated.find(e => e.id === unity.id);

        if (temp === undefined)
            return false;

        return true;
    },

    /** - Removes an unity from the queue.
    * @param {*} unity : an unity object.
    */
    removeExists(unity) {

        if (this.checkExists(unity))
            this.activated.splice(this.activated.indexOf(unity), 1);
    },

    /** - Add an unity to the queue.
    * @param {*} unity : an unity object.
    */
    add(unity) {
        if (!this.checkExists(unity))
            this.activated.push(unity);
    },

    /** - Clears the queue, reseting objects in the process.
    */
    safeClear() {
        this.activated.forEach(e => {
            e.active = false;
            e.mouseX = null;
            e.mouseY = null;
            e.execute = false;
            e.availableCoordinates = maps.availableCoordinates(e.positionX, e.positionY, e.movement);
        });

        unities.unitiesCreated.forEach(e => {
            e.inputEnabled = true;
        });

        this.activated = [];
    },

    /** - Check if the unity is the last of the queue.
    * @param {*} unity : an unity object.
    * @returns : True if it is the last and is done executing.
    */
    checkFinished(unity) {
        if (this.activated.length > 0) {

            const index = this.activated.indexOf(unity);
            const lastIndex = this.activated.length - 1;

            if (index === lastIndex) {
                const speedY = this.activated[lastIndex].body.velocity.y;
                const speedX = this.activated[lastIndex].body.velocity.x;
                const posX = this.activated[lastIndex].positionX;
                const posY = this.activated[lastIndex].positionY;
                const mouseX = this.activated[lastIndex].mouseX;
                const mouseY = this.activated[lastIndex].positionY;

                return (speedY == 0 && speedX == 0) && (mouseX == posX && mouseY == posY);
            }

            return false;
        }
    },

    /** - Check if the previous unity in the queue is still executing.
    * @param {*} unity : an unity object.
    * @returns : True if it is the first or previous is done executing.
    */
    checkPreviousExecuted(unity) {
        if (queue.activated.length > 0) {
            const index = queue.activated.indexOf(unity);

            if (index == 0) 
                return true;

            const prevIndex = index - 1;
            const speedY = this.activated[prevIndex].body.velocity.y;
            const speedX = this.activated[prevIndex].body.velocity.x;
            const posX = this.activated[prevIndex].positionX;
            const posY = this.activated[prevIndex].positionY;
            const mouseX = this.activated[prevIndex].mouseX;
            const mouseY = this.activated[prevIndex].positionY;

            return (speedY == 0 && speedX == 0) && (mouseX == posX && mouseY == posY); 
        }
    }

}

