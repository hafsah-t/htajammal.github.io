
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
let hard_url_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
                            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg',
                            'neptune.jpg', 'neptune.jpg', 'saturn.jpg', 'saturn.jpg',
                            'uranus.jpg', 'uranus.jpg', 'venus.png', 'venus.png',
                            'pluto.jpg', 'pluto.jpg', 'ceres.jpg', 'ceres.jpg',
                            'makemake.jpg', 'makemake.jpg', 'haumea.jpg', 'haumea.jpg'];
let easy_url_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
                            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg'];

export class memGame {
    ID_increment;
    url_array;
    board; // array of tile objects
    numFlipped; // num current tiles flipped (0-2)
    curr_flipped_id; // tile that is currently flipped
    should_unflip = false;
    numTries;
    hasWon = false;
    game_mode;

    constructor(size) { // new game defaults to a medium difficulty game
        this.board = new Array(size*2);
        this.board.fill(0);
        this.numFlipped = 0;
        this.ID_increment = 0;
        this.numTries = 0;
        this.curr_flipped_id = (size*2) + 1;
        this.game_mode = 'med';
        this.url_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
                            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg',
                            'neptune.jpg', 'neptune.jpg', 'saturn.jpg', 'saturn.jpg',
                            'uranus.jpg', 'uranus.jpg', 'venus.png', 'venus.png'];
        let shuffled_array = shuffleArray(this.url_array);
        shuffled_array = shuffleArray(shuffled_array);
        this.url_array = [...shuffled_array];
        let filled_board = this.board.map(x => this.createNewTile()); // makes a board of tiles
        this.board = [...filled_board];
        
    }

    createNewTile() {
        let tile = {};
        tile.id = this.ID_increment; // gets ID
        tile.isFlipped = false;
        tile.url = this.url_array[this.ID_increment]; // gets img url
        this.ID_increment++;
        return tile;
    }

    
    flip(id) {
        if (this.numFlipped == 0) { // first tile has not been flipped yet 
            // set current tile as curr_flipped tile
            this.curr_flipped_id = id;
            // flip the current tile
            this.board[id].isFlipped = true;
            // increment num of flipped tiles
            this.numFlipped = 1;
            this.should_unflip = false;
            return;
        }
        if (this.numFlipped == 1) {
            // unflip the tile for the player to see
            this.numTries++;
            this.board[id].isFlipped = true;
            this.tries++;
            // check if clicked tile matches currently flipped tile
            if (this.url_array[id] == this.url_array[this.curr_flipped_id]) { // matching pic
                // keep tile flipped
                this.board[this.curr_flipped_id].isFlipped = true;
                this.numFlipped = 0; // reset total # flipped 
                this.curr_flipped_id = this.board.length + 1; // reset curr_flipped tile
                this.should_unflip = false;
                
                return;
            } else {
                this.should_unflip = true;
                return;
            }
        }
        
    }
    unflip(id) {
        this.board[id].isFlipped = false;
        this.board[this.curr_flipped_id].isFlipped = false;
        this.curr_flipped_id = this.board.length + 1;
        this.numFlipped = 0;
    }

    setupNewGame(mode) { // Resets the game back to a random starting position.
        if (mode == 'easy') {
            let new_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg'];
            this.url_array = [...new_array];
        } 
        if (mode == 'med') {
            let new_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg',
            'neptune.jpg', 'neptune.jpg', 'saturn.jpg', 'saturn.jpg',
            'uranus.jpg', 'uranus.jpg', 'venus.png', 'venus.png'];
            this.url_array = [...new_array];
        } 
        if (mode == 'hard') {
            let new_array = ['earth.jpg', 'earth.jpg', 'jupiter.jpg', 'jupiter.jpg',
            'mars.jpg', 'mars.jpg', 'mercury.jpg', 'mercury.jpg',
            'neptune.jpg', 'neptune.jpg', 'saturn.jpg', 'saturn.jpg',
            'uranus.jpg', 'uranus.jpg', 'venus.png', 'venus.png',
            'pluto.jpg', 'pluto.jpg', 'ceres.jpg', 'ceres.jpg',
            'makemake.jpg', 'makemake.jpg', 'haumea.jpg', 'haumea.jpg'];
            this.url_array = [...new_array];
        }
        let shuffled_array = shuffleArray(this.url_array); // shuffle
        shuffled_array = shuffleArray(shuffled_array); // shuffle again
        this.url_array = [...shuffled_array];

        this.should_unflip = false;
        this.numFlipped = 0;
        this.ID_increment = 0;
        this.numTries = 0;
        
        let filled_board = this.url_array.map(x => this.createNewTile()); // makes a board of tiles
        this.board = [...filled_board];

        this.curr_flipped_id = this.board.length + 1;
        this.hasWon = false;
        this.game_mode = mode;
    }

    getGameState() {
        // Returns a accurate gameState object representing the current game state.
        let obj = {};
        obj.board = [...this.board];
        obj.numFlipped = this.numFlipped; // num current tiles flipped (0-1)
        obj.curr_flipped_id = this.curr_flipped_id; // tile that is currently flipped
        obj.urls = [...this.url_array];
        obj.should_unflip = this.should_unflip;
        obj.numTries = this.numTries;
        obj.hasWon = this.hasWon;
        obj.game_mode = this.game_mode;
        return obj;
    }
    

    hasWonMethod() {  // if all tiles have isFlipped = true
        let won = true;
        for (let i=0; i<this.board.length; i++) {
            if (this.board[i].isFlipped == false) {
                won = false;
                break;
            }
        }
        this.hasWon = won;
        return won;
    }
   

    
}