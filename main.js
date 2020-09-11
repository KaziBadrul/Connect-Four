var player1 = prompt("Player Blue, enter your name: ")
var player1Color = "rgb(0, 102, 255)"

var player2 = prompt("Player Red, enter your name: ")
var player2Color = "rgb(255, 153, 0)"

if (player1 == '' || player1 == null) {
    player1 = "One";
}
if (player2 == '' || player2 == null) {
    player2 = "Two";
}

var table = $("table tr");

var game_status = true;
var current_player = 1;

function changeColor(rowIndex, colIndex, color) {
    table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function checkColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    for (let i = 5; i >= 0; i--) {
        var color = checkColor(i, colIndex);
        if (color === "rgb(128, 128, 128)") {
            return i;
        }
    }
}

function checkMatch(one, two, three, four) {
    if (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one != undefined) {
        return true
    } else {
        return false
    }
}

function horizontalMatch() {
    for (i = 0; i <= 5; i++) {
        for (j = 0; j <= 6; j++) {
            if (checkMatch(checkColor(i, j), checkColor(i, j + 1), checkColor(i, j + 2), checkColor(i, j + 3))) {
                return true
            }
        }
    }
}

function verticalMatch() {
    for (j = 0; j <= 6; j++) {
        for (i = 0; i <= 5; i++) {
            if (checkMatch(checkColor(i, j), checkColor(i + 1, j), checkColor(i + 2, j), checkColor(i + 3, j))) {
                return true
            }
        }
    }
}

function diagonalMatch() {
    for (i = 0; i <= 5; i++) {
        for (j = 0; j <= 6; j++) {
            if (checkMatch(checkColor(i, j), checkColor(i + 1, j + 1), checkColor(i + 2, j + 2), checkColor(i + 3, j + 3))) {
                return true
            } else if (checkMatch(checkColor(i, j), checkColor(i - 1, j - 1), checkColor(i - 2, j - 2), checkColor(i - 3, j - 3))) {
                return true
            } else if (checkMatch(checkColor(i, j), checkColor(i - 1, j + 1), checkColor(i - 2, j + 2), checkColor(i - 3, j + 3))) {
                return true
            } else if (checkMatch(checkColor(i, j), checkColor(i + 1, j - 1), checkColor(i + 2, j - 2), checkColor(i + 3, j - 3))) {
                return true
            }
        }
    }
}

$('.turn').text(`${player1}'s Turn`)
$('.turn').css('color', player1Color);
var current_color = player1Color;
var current_name = player1;


function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
            $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}

$(".board button").click(function() {
    var col = $(this).closest('td').index()
    changeColor(checkBottom(col), col, current_color)

    if (horizontalMatch() || verticalMatch() || diagonalMatch()) {
        $(".turn").text(`${current_name} has won!`);
        gameEnd(current_name)

    } else {
        current_player = current_player * -1;
        if (current_player == 1) {
            $('.turn').text(`${player1}'s Turn`)
            $('.turn').css('color', player1Color)
            current_color = player1Color
            current_name = player1;
        } else {
            $('.turn').text(`${player2}'s Turn`)
            $('.turn').css('color', player2Color)
            current_color = player2Color
            current_name = player2;
        }
    }
})
