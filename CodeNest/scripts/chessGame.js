let turn = 'X';
let score = {
    'X': 0,
    'O': 0
};
let gridValue = 0;

function hide() {
    document.getElementById("a").style.zIndex = "1";
    document.getElementById("game").style.zIndex = "-1";
}

function fnLoad() {
    let select = document.getElementById("grid");
    for (i = 3; i <= 9; i += 1) {
        let option = document.createElement('option');
        select.options[select.options.length] = new Option(i + ' X ' + i, i);
    }

    addEvent(document.getElementById("game"), "click", fnChoose);

    fnNewGame();
}

function addEvent(element, eventName, callback) {

    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

function fnChoose(e) {
    if (e.target && e.target.nodeName == "TD") {
        let targetElement = document.getElementById(e.target.id);
        let prevTurn;
        if ((targetElement.className).indexOf("disabled") == -1) {
            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);
            score[turn] += 1;
            prevTurn = turn;
            turn = turn === "X" ? "O" : "X";
            if (fndecide(targetElement, prevTurn)) {
                line();
                hide();
            } else if ((score['X'] + score['O']) == (gridValue * gridValue)) {
                alert('Draw!');
                fnNewGame();
            }
        }
    }
}

function fndecide(targetElement, prevTurn) {
    let UL = document.getElementById('game');
    let elements, i, j, cnt;
    if (score[prevTurn] >= gridValue) {
        let classes = targetElement.className.split(/\s+/);
        for (i = 0; i < classes.length; i += 1) {
            cnt = 0;
            if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
                elements = UL.getElementsByClassName(classes[i]);
                for (j = 0; j < elements.length; j += 1) {
                    if (elements[j].innerHTML == prevTurn) {
                        cnt += 1;
                    }
                }
                if (cnt == gridValue) {
                    return true;
                }
            }
        }
    }
    return false;
}

function fnNewGame() {
    let gameUL = document.getElementById("game");
    if (gameUL.innerHTML !== '') {
        gameUL.innerHTML = null;
        score = {
            'X': 0,
            'O': 0
        };
        turn = 'X';
        gridValue = 0;
    }
    let select = document.getElementById("grid");
    gridValue = select.options[select.selectedIndex].value;
    let i, j, li, k = 0,
        classLists;
    let gridAdd = +gridValue + 1;

    for (i = 1; i <= gridValue; i += 1) {
        tr = document.createElement('tr');
        for (j = 1; j <= gridValue; j += 1) {
            k += 1;
            li = document.createElement('td');
            li.setAttribute("id", 'li' + k);

            classLists = 'td row' + i + ' col' + j;

            if (i === j) {
                classLists = 'td row' + i + ' col' + j + ' dia0';
            }

            if ((i + j) === gridAdd) {
                classLists = 'td row' + i + ' col' + j + ' dia1';
            }

            if (!isEven(gridValue) && (Math.round(gridValue / 2) === i && Math.round(gridValue / 2) === j))
                classLists = 'td row' + i + ' col' + j + ' dia0 dia1';

            li.className = classLists;
            tr.appendChild(li);

        }
        gameUL.appendChild(tr);
    }
}
function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}
