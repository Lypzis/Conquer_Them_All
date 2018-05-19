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

        this.walkableArea = this.map.objects['WalkableArea'][0];

        this.startEnemyPoint = this.map.objects['StartingPointEnemy'][0];
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

    getSurroudingSquare(i, x, y, side) {
        switch (side) {
            case 'left':
                return this.map.getTileLeft(i, x, y);
            case 'right':
                return this.map.getTileRight(i, x, y);
            default:
                return -1;
        }
    },

    /**
     * - Get the size of one of the table squares
     *  @returns : Valid starting placement object area.
     */
    getSquareSize() {
        return this.startPlayerPoint.width / 5;
    },

    /**
     * - Get the player starting point in the map.
     * @param {*} friendly : true: left side, false: right side.
     * @returns : The pieces starting position. 
     */
    getPlayerStartPoint(friendly) {
        return friendly ? this.startPlayerPoint : this.startEnemyPoint;
    },

    /**
     * - Get the table moveable area.
     * @returns : Moveable area of the table. 
     */
    getWalkableArea() {
        return this.walkableArea;
    },

    /**
     * - Receives one of the element location axis(its x or y) and convert to grid table value.
     * @param {*} currentAxis : y or x target value.
     * @returns : current converted grid axis coordinate. 
     */
    gridCoordinateConvert(currentAxis) {
        const gridSize = this.getSquareSize();

        return game.math.snapToFloor(Math.floor(currentAxis), gridSize) / gridSize;
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