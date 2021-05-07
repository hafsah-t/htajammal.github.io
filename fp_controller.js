import {memGame} from "./engine/fp_game.js";



export const renderBoard = function(board, url_array) {
    // make a copy of the given tile array
    // for each tile object, if isFlipped = false, make the copy.url = blank image 
    let copy = [...board];
    for (let i=0; i<copy.length; i++) {
        if (copy[i].isFlipped == false) {
            copy[i].url = 'final_blank.jpg';
        } else {
            copy[i].url = url_array[i];
        }
    }
    if (url_array.length == 8) {
        return `
        <div id="game_div_8">
        <table id="mem_board_8">
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[0].id}" flip="${copy[0].isFlipped}"><img id="tile_img" src="game_pics/${copy[0].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[1].id}" flip="${copy[1].isFlipped}"><img id="tile_img" src="game_pics/${copy[1].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[2].id}" flip="${copy[2].isFlipped}"><img id="tile_img" src="game_pics/${copy[2].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[3].id}" flip="${copy[3].isFlipped}"><img id="tile_img" src="game_pics/${copy[3].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[4].id}" flip="${copy[4].isFlipped}"><img id="tile_img" src="game_pics/${copy[4].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[5].id}" flip="${copy[5].isFlipped}"><img id="tile_img" src="game_pics/${copy[5].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[6].id}" flip="${copy[6].isFlipped}"><img id="tile_img" src="game_pics/${copy[6].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[7].id}" flip="${copy[7].isFlipped}"><img id="tile_img" src="game_pics/${copy[7].url}"></button></td>
            </tr>
        </table>
        </div>   
     `
    }
    if (url_array.length == 16) {
        return `
        <div id="game_div_16">
        <table id="mem_board">
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[0].id}" flip="${copy[0].isFlipped}"><img id="tile_img" src="game_pics/${copy[0].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[1].id}" flip="${copy[1].isFlipped}"><img id="tile_img" src="game_pics/${copy[1].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[2].id}" flip="${copy[2].isFlipped}"><img id="tile_img" src="game_pics/${copy[2].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[3].id}" flip="${copy[3].isFlipped}"><img id="tile_img" src="game_pics/${copy[3].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[4].id}" flip="${copy[4].isFlipped}"><img id="tile_img" src="game_pics/${copy[4].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[5].id}" flip="${copy[5].isFlipped}"><img id="tile_img" src="game_pics/${copy[5].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[6].id}" flip="${copy[6].isFlipped}"><img id="tile_img" src="game_pics/${copy[6].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[7].id}" flip="${copy[7].isFlipped}"><img id="tile_img" src="game_pics/${copy[7].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[8].id}" flip="${copy[8].isFlipped}"><img id="tile_img" src="game_pics/${copy[8].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[9].id}" flip="${copy[9].isFlipped}"><img id="tile_img" src="game_pics/${copy[9].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[10].id}" flip="${copy[10].isFlipped}"><img id="tile_img" src="game_pics/${copy[10].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[11].id}" flip="${copy[11].isFlipped}"><img id="tile_img" src="game_pics/${copy[11].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[12].id}" flip="${copy[12].isFlipped}"><img id="tile_img" src="game_pics/${copy[12].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[13].id}" flip="${copy[13].isFlipped}"><img id="tile_img" src="game_pics/${copy[13].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[14].id}" flip="${copy[14].isFlipped}"><img id="tile_img" src="game_pics/${copy[14].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[15].id}" flip="${copy[15].isFlipped}"><img id="tile_img" src="game_pics/${copy[15].url}"></button></td>
            </tr>
        </table>
        </div>
     `
    }
    if (url_array.length == 24) {
        return `
        <div id="game_div_24">
        <table id="mem_board">
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[0].id}" flip="${copy[0].isFlipped}"><img id="tile_img" src="game_pics/${copy[0].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[1].id}" flip="${copy[1].isFlipped}"><img id="tile_img" src="game_pics/${copy[1].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[2].id}" flip="${copy[2].isFlipped}"><img id="tile_img" src="game_pics/${copy[2].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[3].id}" flip="${copy[3].isFlipped}"><img id="tile_img" src="game_pics/${copy[3].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[4].id}" flip="${copy[4].isFlipped}"><img id="tile_img" src="game_pics/${copy[4].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[5].id}" flip="${copy[5].isFlipped}"><img id="tile_img" src="game_pics/${copy[5].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[6].id}" flip="${copy[6].isFlipped}"><img id="tile_img" src="game_pics/${copy[6].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[7].id}" flip="${copy[7].isFlipped}"><img id="tile_img" src="game_pics/${copy[7].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[8].id}" flip="${copy[8].isFlipped}"><img id="tile_img" src="game_pics/${copy[8].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[9].id}" flip="${copy[9].isFlipped}"><img id="tile_img" src="game_pics/${copy[9].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[10].id}" flip="${copy[10].isFlipped}"><img id="tile_img" src="game_pics/${copy[10].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[11].id}" flip="${copy[11].isFlipped}"><img id="tile_img" src="game_pics/${copy[11].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[12].id}" flip="${copy[12].isFlipped}"><img id="tile_img" src="game_pics/${copy[12].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[13].id}" flip="${copy[13].isFlipped}"><img id="tile_img" src="game_pics/${copy[13].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[14].id}" flip="${copy[14].isFlipped}"><img id="tile_img" src="game_pics/${copy[14].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[15].id}" flip="${copy[15].isFlipped}"><img id="tile_img" src="game_pics/${copy[15].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[16].id}" flip="${copy[16].isFlipped}"><img id="tile_img" src="game_pics/${copy[16].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[17].id}" flip="${copy[17].isFlipped}"><img id="tile_img" src="game_pics/${copy[17].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[18].id}" flip="${copy[18].isFlipped}"><img id="tile_img" src="game_pics/${copy[18].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[19].id}" flip="${copy[19].isFlipped}"><img id="tile_img" src="game_pics/${copy[19].url}"></button></td>
            </tr>
            <tr>
                <td id="mem_tile"><button id="press_tile" target="${copy[20].id}" flip="${copy[20].isFlipped}"><img id="tile_img" src="game_pics/${copy[20].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[21].id}" flip="${copy[21].isFlipped}"><img id="tile_img" src="game_pics/${copy[21].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[22].id}" flip="${copy[22].isFlipped}"><img id="tile_img" src="game_pics/${copy[22].url}"></button></td>
                <td id="mem_tile"><button id="press_tile" target="${copy[23].id}" flip="${copy[23].isFlipped}"><img id="tile_img" src="game_pics/${copy[23].url}"></button></td>
            </tr>
        </table> 
        </div>  
     `
    }
};

export async function appendNewBoard(game, urls) {
    // alert('test');
    const $game_div = $('#game_append');
    $game_div.empty();
    $game_div.append(renderBoard(game.board, urls));

    createTileButtonHandlers(game); // create tile click handlers
    
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function handleTileClick(event) {
    let game_obj = event.data.the_game;
    if (event.data.flipped == 'false') {
        // call game method
        game_obj.flip(event.data.tile_id); // call game method
        const $game_div = $('#game_append');
        $game_div.empty();
        let new_obj = game_obj.getGameState();
        $game_div.append(renderBoard(new_obj.board, new_obj.urls));
        // check if flipped tile should be unflipped 
        if (game_obj.should_unflip == true) {
            game_obj.unflip(event.data.tile_id);
            // remove click handlers from other tiles
            let removelisteners = document.querySelectorAll('#press_tile');
            for (let i=0; i<removelisteners.length; i++) {
                const $remove_button = $(removelisteners[i]);
                $remove_button.off("click", handleTileClick);
            }
            sleep(1000).then(() => { appendNewBoard(game_obj, game_obj.url_array); });
            const $tries = $('#numtries');
            $tries.replaceWith(replaceTries(game_obj.numTries));
            return;
        }

        createTileButtonHandlers(game_obj); // create tile click handlers
        
        if (game_obj.hasWonMethod() == true) { // all tiles are flipped 
            const $won_message = $('#reset');
            $won_message.append('<p id="reset_message">You finished the game! Click reset to win with fewer tries!</p>');
        }
        const $tries = $('#numtries');
        $tries.replaceWith(replaceTries(game_obj.numTries));

    }
};

export const replaceTries = function(tries) {
    return `
    <p id="numtries">Tries: ${tries}</p>  
     `
};

export const handleResetButton = function(event) {
    event.data.the_game.setupNewGame(event.data.the_game.game_mode);
    const $game_div = $('#game_append');
    $game_div.empty();
    $game_div.append(renderBoard(event.data.the_game.board, event.data.the_game.url_array));
    const $tries = $('#numtries');
    $tries.replaceWith(replaceTries(event.data.the_game.numTries));

    createTileButtonHandlers(event.data.the_game); // create tile click handlers
    
    let winmessage = document.querySelectorAll('#reset_message');
    if (winmessage.length != 0) {
        const $page = $('#reset_message');
        $page.remove();
    }
    return;
};

export const createTileButtonHandlers = function(game_obj) {
    let tilebuttons = document.querySelectorAll('#press_tile');
    for (let i=0; i<tilebuttons.length; i++) {
        const $curr_button = $(tilebuttons[i]);
        $curr_button.on("click", {
            the_game: game_obj,
            tile_id: $curr_button.attr('target'),
            flipped: $curr_button.attr('flip')
        },
        handleTileClick);
    }
};
export const handleEasyModeClick = function(event) {
    event.data.the_game.game_mode = 'easy';
    handleResetButton(event);
};
export const handleMediumModeClick = function(event) {
    event.data.the_game.game_mode = 'med';
    handleResetButton(event);
};
export const handleHardModeClick = function(event) {
    event.data.the_game.game_mode = 'hard';
    handleResetButton(event);
};
export const loadMemoryGametoDom = function(game) {
    const $game_div = $('#game_append');
    let obj = game.getGameState();
    $game_div.append(renderBoard(game.board, obj.urls));
    
    createTileButtonHandlers(game); // tile click handlers

    const $resetbutton = $('#reset_button');
    $resetbutton.on("click", {
        the_game: game,
    },
    handleResetButton);

    const $easymode = $('#easymode');
    $easymode.on("click", {
        the_game: game,
    },
    handleEasyModeClick);

    const $mediummode = $('#mediummode');
    $mediummode.on("click", {
        the_game: game,
    },
    handleMediumModeClick);

    const $hardmode = $('#hardmode');
    $hardmode.on("click", {
        the_game: game,
    },
    handleHardModeClick);
};

$(function() {
    let new_game = new memGame(8);
    loadMemoryGametoDom(new_game);
});