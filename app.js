
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let timerId;
let score = 0;

//ball diamter
const ballDiameter = 20;

//width of grid
const boardWidth = 560;
const boardHeight = 300;

// size of block
const blockWidth = 100;
const blockHeight = 20;

//user placement
const userStart = [230, 10];
// [xAxis, yAxis]
let curretPosition = userStart;

// ball position
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
let xDirection = -2;
let yDirection = 2;

// speed of ball
ballSpd = 20;

// create Block
// Gives all 4 points of block to be used for collsions
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
];

console.log(blocks[0]);

function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] +'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block)
    }
}

addBlock();

// function createBlocks(numBlocks) {
//     let leftSpace = 5;
//     let bottomSpace = 0;
//     for (i = 0; i < numBlocks; i++) {
//         const block = document.createElement('div');
//         block.classList.add('block');
//         block.style.left = `${leftSpace}px`;
//         block.style.bottom = `${bottomSpace}px`;
//         grid.appendChild(block)
//         leftSpace += 105
//         if (leftSpace >= 400) {
//             bottomSpace -= 25;
//             leftSpace = 5;
//         }
//     }

// }


//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw functions
//draw functions

// draw the user
function drawUser() {
    user.style.left = curretPosition[0] + 'px';
    user.style.bottom = curretPosition[1] + 'px'
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//draw functions
//draw functions


// move user
function moveUser (e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (curretPosition[0] > 0) {
                curretPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (curretPosition[0] < boardWidth - blockWidth)
            curretPosition[0] += 10;
            drawUser();
    }
}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    collisionCheck();
}

timerId = setInterval(moveBall, ballSpd);

// check for collisions 
function collisionCheck() {
    //block collisions 
    for (let i = 0; i < blocks.length; i++) {
        if (
            ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]))
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            // console.log(allBlocks)
            
            // makes block invisable
            allBlocks[i].classList.remove('block');

            // removes block from block array
            blocks.splice(i, 1);
            changeDirection();
            score++;
            // console.log(blocks.length);
            scoreDisplay.innerHTML = score;

            //check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You WIN';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }


    //wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0) 
    {
        changeDirection();
    }


    //User collisions
    if(
        (ballCurrentPosition[0] > curretPosition[0] && ballCurrentPosition[0] < (curretPosition[0] + blockWidth)) &&
        (ballCurrentPosition[1] > curretPosition[1] && ballCurrentPosition [1] < (curretPosition[1] + blockHeight) )
        ) {
            changeDirection();
    }

    //check for game over
    if(ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You LOSE'
        document.removeEventListener('keydown', moveUser);
    }
}

// Changes the movment of ball
function changeDirection() {
    if(xDirection === 2 && yDirection == 2) {
        yDirection = -2;
        return;
    }
    if(xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if(xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}
