let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;

var fuel = 100;
var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
    lander_img = loadImage("normal.png")
    bg_img = load_img("bg.png")
    thrust = loadAnimation("b_thrust_1.png", "b_thrust_2.png","b_thrust_3.png");
    crash = loadAnimation("crash1.png", "crash2.png", "crash3.png");
    land = loadAnimation("landing1.png", "landing2.png", "landing3.png");
    rcs_left = loadAnimation("left_thruster_1.png", "left_thruster_2");
    normal = loadAnimation("normal.png");
    rcs_right = loadAnimation("right_thruster_1", "right_thruster_2");
    

    thrust.playing= true;
    thrust.looping= false;
    rcs_left.looping= false;
    rcs_right.looping= false;

}

function setup() {
    createCanvas(1000, 700);
    frameRate(800);
    timer = 1500;
    thrust.frameDelay = 5;
    rcs_left.frameDelay = 5;
    rcs_right.frameDelay = 5;
    
    

    lander = createSprite(100, 50, 30, 30);
    lander.addImage(lander_img);
    lander.scale = 0.1;
    lander.setCollider("rectangle",0,0,200,200);

    lander.addAnimation('thrusting', thrust);
    lander.addAnimation('left', rcs_left);
    lander.addAnimation('normal', normal);
    lander.addAnimation('right', rcs_right);

    ground = createSprite(500, 690, 1000, 20);

    rectMode(CENTER);
    textSize(15);
}

function draw()
{
    background(51);
    Image(bg_img,0,0);
    push()
    fill(255);
    text("Vertical velocity:"+round(vy),800, 75);
    text("Fuel: "+fuel, 800,25);
    text("Horizontal velocity:"+round(vx, 2),800, 50);
    pop();


    vy +=g;
    lander.postition.y+=vy;
    lander.postition.y+=vx;

    drawSprites();
}
if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}


function upward_thrust()
{
    vy = -1;
    fuel-=1;
}

