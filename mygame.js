function load() {
    enemy_img = new Image;
    enemy_img.src = "assets/enemy.png";
    
    vaccine_img = new Image;
    vaccine_img.src = "assets/vaccine.png";
    
    player_img = new Image;
    player_img.src = "assets/player.png";
    
}
function init() {
    canvas = document.getElementById("mycanvas");
    W = 1500;
    H = 650;
    console.log(canvas);
    canvas.width = W;
    canvas.height = H;
    
    pen = canvas.getContext('2d');
    e1 = {
        X : 170,
        Y : 60,
        h : 80,
        w : 80,
        speed : 27,
    }
    e2 = {
        X : 450,
        Y : 160,
        h : 80,
        w : 80,
        speed : 40,
    }
    
    e3 = {
        X : 750,
        Y : 30,
        h : 80,
        w : 80,
        speed : 25,
    }
    
    e4 = {
        X : 1050,
        Y : 130,
        h : 80,
        w : 80,
        speed : 35,
    }
    player = {
        X : 50,
        Y : H/2,
        h : 120,
        w : 120,
        speed : 20,
        health : 100,
        moving : false,
    }
    vaccine = {
        X : W-100,
        Y : H/2,
        h : 90,
        w : 80,
    }
    
    enemy = [e1,e2,e3,e4];
    
    canvas.addEventListener('mousedown',function() {
        console.log("mousepressed");
        player.moving = true;
    });
    
    canvas.addEventListener('mouseup',function() {
        console.log("mousereleased");
        player.moving = false;
    });
    
    GameOver=false;
}

function draw() {
    
    pen.clearRect(0,0,W,H);
    pen.drawImage(vaccine_img,vaccine.X,vaccine.Y,vaccine.h,vaccine.w);
    pen.drawImage(player_img,player.X,player.Y,player.h,player.w);
    for(let i=0;i<enemy.length;i++)
        {
            pen.drawImage(enemy_img,enemy[i].X,enemy[i].Y,enemy[i].h,enemy[i].w);
        }
    pen.fillStyle="white";
    pen.font="17px Roboto";
    pen.fillText("Score "+player.health,20,20,4000);
}
function update() {
    if(player.moving == true)
    {
        player.X += player.speed;
        player.health+=20;
    }
    if(isOverlap(player,vaccine))
    {
        alert("You Won!!!");
        GameOver=true;
    }
    
    for(let i=0;i<enemy.length;i++)
        {
            if(isOverlap(player,enemy[i]))
                {
                    player.health-=20;
                    if(player.health<0)
                        {
                            alert("Game Over"+player.health);
                            clearInterval(f);
                        }
                }
        }
    
    for(let i=0;i<enemy.length;i++)
        {
            enemy[i].Y += enemy[i].speed;
    
            if(enemy[i].Y>H-enemy[i].h||enemy[i].Y<0)
                {
                    enemy[i].speed *= -1;
                }
    
            
        }
}

function isOverlap(rect1,rect2) {
    if(rect1.X<rect2.X+rect2.w &&
       rect1.X+rect1.w>rect2.X &&
       rect1.Y<rect2.Y+rect2.h &&
       rect1.Y+rect1.h>rect2.h
      )
        {
            return true;
        }
            return false;
}

function gameloop() {
    if(GameOver==true)
        {
            clearInterval(f);
        }
    draw();
    update();
}
load();
init();
var f = setInterval(gameloop,100);