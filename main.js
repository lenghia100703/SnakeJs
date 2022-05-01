const canvas = document.getElementById('screen');
canvas.height = canvas.width = 500;
const ctx = canvas.getContext('2d');
const jump = 25;
let score = 0;
let speed = 10;
let hp = 20;

var key;


class Pos {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Food {
    constructor(x, y){
        this.x = x;
        this.y = y;

    }
    randomPos(){
        return Math.floor(Math.random() * 500/25)*25;
    }

    clear(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, jump, jump);
    }

    drawApple(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, jump, jump);
    }

    randomApple(){
        this.clear();

        this.x = this.randomPos();
        this.y = this.randomPos();

        this.drawApple();

    }
}


class Snake {
    constructor(){
        this.body = [
            new Pos(250, 250),
            new Pos(225, 250),
            new Pos(200, 250),
        ]
    }

    checkDie(){
        if (this.body[0].x >= canvas.width || this.body[0].x < 0 || this.body[0].y >= canvas.height || this.body[0].y < 0){
            return false;
        }
        for (let i = this.body.length - 1; i >= 1; i-- ){
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y){
                return false;
            }
        }
        
        return true;
    }

    

    drawSnake(){
        ctx.fillStyle = '#fff';
        for (let i = 0; i < this.body.length; i++){
            ctx.fillRect(this.body[i].x, this.body[i].y, jump, jump);
        }
    }

    clear(){
        ctx.fillStyle = '#000';
        for (let i = 0; i < this.body.length; i++){
            ctx.fillRect(this.body[i].x, this.body[i].y, jump, jump);
        }
    }

    move(){
        this.clear();
        
        if (key == 'u' || key == 'd' || key == 'l' || key == 'r'){
            for (let i = this.body.length - 1; i >= 1; i--){
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
        }
        
        if (key == 'u') { this.body[0].y += jump };
        if (key == 'd') { this.body[0].y -= jump };
        if (key == 'l') { this.body[0].x += jump };
        if (key == 'r') { this.body[0].x -= jump };
        

        this.drawSnake();
    }

    bodyUpdate(){
        this.clear();

        let snakeLength = this.body.length;
        let mountX = this.body[snakeLength - 1].x - this.body[snakeLength - 2].x;
        let mountY = this.body[snakeLength - 1].y - this.body[snakeLength - 2].y;
        let newPart = new Pos(this.body[snakeLength - 1].x + mountX, this.body[snakeLength - 1].y + mountY);
        this.body.push(newPart);

        this.drawSnake();
    }

    checkEat(food){
        if (food.x == this.body[0].x && food.y == this.body[0].y){
            score ++;
            speed ++;
            
            return true;
        }
        return false;
    }

    

}



let player = new Snake();
player.drawSnake();

let food = new Food();
food.randomApple();

function drawGame(){
    
    player.move();
    if (player.checkEat(food) === true){
        player.bodyUpdate();
        food.randomApple();
        document.getElementById("heading").innerHTML = `SCORE: ${score}`;
    }
    if (player.checkDie() == false){
        return;
    }
    setTimeout(drawGame, 2000/speed);
}

drawGame();




document.onkeydown = function(e){
    if (e.keyCode == 83 && key != 'd') { key = 'u' };
    if (e.keyCode == 87 && key != 'u') { key = 'd' };
    if (e.keyCode == 68 && key != 'r') { key = 'l' };
    if (e.keyCode == 65 && key != 'l') { key = 'r' };
}

document.getElementById("result").innerHTML = 'You die :((';
let form = document.querySelector('.js-form');


function opentab(){
    form.classList.add('open');
}












