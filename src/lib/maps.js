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

        this.map.setCollisionByExclusion([1], true, this.layer);

        this.walkableTile = 1;

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

    /**
     * - Get the current layer index.
     * @returns : Index number.
     */
    getLayerIndex() {
        return this.layer.index;
    },

    /**
     * - Get one of the unity surrounding square coordinates.
     * @param {*} i : current unity layer index.
     * @param {*} x : current unity X position.
     * @param {*} y : current unity y position.
     * @param {*} side : name of the side to get coordinates('left' or 'right').
     * @returns : coordinates object. 
     */
    getSurroudingSquare(i, x, y, side) {
        switch (side) {
            case 'left':
                return this.map.getTileLeft(i, x, y);
            case 'right':
                return this.map.getTileRight(i, x, y);
            case 'top':
                return this.map.getTileAbove(i, x, y);
            case 'bottom':
                return this.map.getTileBelow(i, x, y);
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
     * - Sets all valid available coordinates in range of the object movement.
     * @param {*} posX : X coordinate of the object.
     * @param {*} posY : Y coordinate of the object.
     * @param {*} moveN : Movement range of the object.
     * @returns : Array of available coordinates that the object can move to. 
     */
    availableCoordinates(posX, posY, moveN) {
        const availableSquares = [];

        let maxRight = posX + moveN;
        let maxLeft = posX - moveN;
        let maxTop = posY - moveN;
        let maxBottom = posY + moveN;

        /*
        ex: Something with moveN equals 2;
        
                *
              * * *
            * * x * *
        */
        for (let y = posY; y > maxTop; --y) {
            for (let x = posX - 1; x >= maxLeft; --x) {
                availableSquares.push({ y, x });
            }

            for (let x = posX + 1; x <= maxRight; ++x) {
                availableSquares.push({ y, x });
            }

            availableSquares.push({ y, x: posX });
            ++maxLeft;
            --maxRight;
        }

        /*
              * * *
                * 
        */
        maxRight = posX + moveN;
        maxLeft = posX - moveN;

        for (let y = posY + 1; y <= maxBottom; ++y) {
            for (let x = posX - 1; x > maxLeft; --x) {
                availableSquares.push({ y, x });
            }

            for (let x = posX + 1; x < maxRight; ++x) {
                availableSquares.push({ y, x });
            }

            availableSquares.push({ y, x: posX });
            ++maxLeft;
            --maxRight;
        }

        return availableSquares.filter(e => 
            this.map.getTile(e.x, e.y, this.getLayerIndex()) != null && 
            this.map.getTile(e.x, e.y, this.getLayerIndex()).index == this.walkableTile
        ); 
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

};

