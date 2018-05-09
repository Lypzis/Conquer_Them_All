//////////////////////////////////////////////////////////////////////////////
/** 
 * @by: Lypzis Entertainment
 * @author: Victor V. Piccoli
 * @doc: Global generic map object
*/
//////////////////////////////////////////////////////////////////////////////

const maps = {

    //////////////////////////////////////////////////////////////////////////
    // Map
    /**
     * - Loads a given map.
     * @param {*} tileMapName : The map name to display.
     */
    loadMap(tileMapName) {
        this.map = game.add.tilemap(tileMapName);
        this.map.addTilesetImage('tableGround-tile');

        this.layer = this.map.createLayer(0);

        this.map.setCollision([2, 3], true, this.layer);

        this.startPlayerPoint = this.map.objects['StartingPointPlayer'][0];
    },

    //////////////////////////////////////////////////////////////////////////
    // Table
    /**
     * - Get the current layer displayed.
     * @returns : The current layer.
     */
    getLayer() {
        return this.layer;
    },

    getLayerIndex() {
        return this.layer.index;
    },

    /**
     * - Get the size of one of the table squares
     *  @returns : Valid starting placement object area.
     */
    getSquareSize(){
        return this.startPlayerPoint.width/5;
    },

    /**
     * - Get the player starting point in the map.
     * @returns : The player's pieces starting position. 
     */
    getPlayerStartPoint() {
        return this.startPlayerPoint;
    },

    /** - Increase each next value with the square size * index, starting from 0 to 4(5 values). 
     * @returns : squares array.
    */
    squareSizeSum() {
        const square = this.getSquareSize();
        const squares = [];

        for (let i = 0; i < 5; ++i) {
            let item = i * square;
            squares.push(item);
        }

        return squares;
    }

}