const PLAYER_TOKEN = 'X';
const SYSTEM_TOKEN = 'O'

$(document).ready(function () {
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]


    function isGameOver() {
        // check horizontal
        for (var i = 0; i < 3; i++) {
            if (grid[i][0] != ' ' &&
                grid[i][0] === grid[i][1] &&
                grid[i][0] === grid[i][2]) {
                return grid[i][0];
            }
        }

        // chek vertical
        for (var j = 0; j < 3; j++) {
            if (grid[0][j] != ' ' &&
                grid[0][j] === grid[1][j] &&
                grid[0][j] === grid[2][j]) {
                return grid[0][j];
            }
        }


        // check diagonal - top left bottom right    
        if (grid[0][0] != ' ' &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]) {
            return grid[0][0];
        }
    
        // check diagonal - bottom left top right        
        if (grid[2][0] != ' ' &&
            grid[2][0] === grid[1][2] &&
            grid[2][0] === grid[0][2]) {
            return grid[2][0];
        }
        
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(grid[i],[j] === ' '){
                    return false;
                }
            }
        }
        return null;
    }


    function systemMove(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(grid[i][j] === ' '){
                    return {
                        i: i,
                        j: j
                    };
                }
            }
        }
        return null; 
    }

    $('.col').click(function () {
        $this = $(this);
        $this.html(PLAYER_TOKEN);
        const i = $this.data('i');
        const j = $this.data('j');
        grid[i][j] = PLAYER_TOKEN;
        console.log(grid);
        
        let gameState = isGameOver();
        if (gameState) {
            alert('game over: ' + gameState);
            return;
        }
        else {
            // system move
            const move = systemMove();
            grid[move.i][move.j] = SYSTEM_TOKEN;
            $('.col[data-i=' + move.i + '][data-j=' + move.j + ']').html(SYSTEM_TOKEN);
        }

        gameState = isGameOver();
        if(gameState)
        {
            alert('game over: ' + gameState);
        }

    });

    $('#newGameButton').click(function(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                grid[i][j] = ' ';
                $('.col[data-i=' + i + '][data-j=' + j + ']').html(' ');
            }
        }
    });
});


