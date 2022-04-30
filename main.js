const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const jump = 25;
var key;
const array = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];

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
    randomIndex(){
        return Math.floor(Math.random() * 22);
    }
    randomX() {
        return array[this.randomIndex()];
    }
    randomY() {
        return array[this.randomIndex()];
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

        this.x = this.randomX();
        this.y = this.randomY();

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
        
        for (let i = this.body.length - 1; i >= 1; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
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
            return true;
        }
        return false;
    }
}



let player = new Snake();
player.drawSnake();

let food = new Food();
food.randomApple();



setInterval(() =>{
    player.move();
    if (player.checkEat(food) === true){
        player.bodyUpdate();
        food.randomApple();
    }
}, 150);

document.onkeydown = function(e){
    if (e.keyCode == 83 && key != 'd') { key = 'u' };
    if (e.keyCode == 87 && key != 'u') { key = 'd' };
    if (e.keyCode == 68 && key != 'r') { key = 'l' };
    if (e.keyCode == 65 && key != 'l') { key = 'r' };
}




