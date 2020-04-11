// Created by Paul

//////////////////
// ElDorado
////////////////
// Author : Paul Caron
////////////////


var canvas;
var ctx;
var W=window.innerWidth;
var H=window.innerHeight;
var doc=document;
var controller;
var hero;
var rows=[];
var damageOn=false;
var paulcaron=true;
var difficulty=1;
var coins=[];
var coinmojis=["💰","👑","💎"];
var dash=1;
var enemies=[];
var stickside="left";
var lifebar={
    life:1000,
    draw:function(){
        ctx.fillStyle="red";        
        ctx.fillRect(W/4,1,W/2,H/40);
        
        ctx.fillStyle=damageOn?"hsl("+Date.now()/2%360+",100%,50%)":"green";
        ctx.fillRect(W/4,1,W/2*this.life/1000,H/40);
        ctx.strokeStyle ="white";
        ctx.strokeRect(W/4,1,W/2,H/40);
    },
    reset:function(){
        this.life=1000;
    }
}
var wallet={
    money:0,
    draw:function(){
        ctx.font="30px Arial";
        ctx.fillStyle="lime";
        ctx.fillText(this.money,W*0.1,H*0.1);
    },
    reset:function(){
        this.money=0;
    }
}

function hideSelect(){
    var s=doc.querySelector("#select");
    s.style.display="none";
}

function init(c){
    if(paulcaron == undefined){
        return 0;
    }
    canvas = doc.getElementById("canvas");
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext("2d");
    ctx.textAlign="center"
        ctx.textBaseline="middle"; 
    canvas.addEventListener('touchstart', touchStart, false);
            canvas.addEventListener('touchmove', touchMove, false);
    canvas.addEventListener('touchend', touchEnd, false);      
    hero=new Character(c);   
    hero.dash=function() {
        dash=2;
    }
    controller = new Control()  ;
    if(stickside =="left"){
    controller.addButton(0.85*W,0.7*H,W/12,"brown",hero.dash)  ;}else{
        controller.addButton(0.85*W,0.7*H,W/12,"brown",hero.dash)
    }
   // controller.addButton(0.85*W,0.9*H,W/12,"brown",hero.dash)  ;
        
    for(let a=0;a<H;a++){
        rows.push(new Row(W/2,100));
    }        
    //controller.draw();
    //hero.draw();
    let count=0;
    window.requestAnimationFrame(loop);
    
    function loop(){
        
        ctx.fillStyle ="rgba(0,0,0,0.15)";
        ctx.fillRect(0,0,W,H);
        for(let r=0;r<rows.length;r++){
            rows[r].draw(r);
        }
        for(let c=0;c<coins.length;c++){
            coins[c].update();
            coins[c].draw();
        }
        hero.draw();
        checkPoints();
        controller.draw();
        lifebar.draw();
        wallet.draw();
        rows.pop();
        let newX=rows[0].x+Math.sin(Date.now()/600)*Math.random()+Math.cos(Date.now()/1700)*Math.random();
        let newWidth=rows[0].width+Math.sin(count/50)*W/2.4/150;
        if(newX>3*W/4){
            newX=3*W/4;
        }
        if(newX<W/4){
            newX=W/4;
        }
        if(newWidth>W/3.2){
            newWidth=W/3.2;
        }
        if(newWidth<W/14){
            newWidth=W/14;
        }
        
        rows.unshift(new Row(newX,newWidth));
        if(count%Math.ceil(900*Math.random())==0){
            coins.push(new Coin(rows[0].x+Math.random()*rows[0].width-rows[0].width/2,0,coinmojis[Math.floor(Math.random()*3)]));
        }        
        for(let c=coins.length-1;c>=0;c--){
            if(Math.hypot(coins[c].x-hero.x,coins[c].y-hero.y)<hero.radius+8){
                coins.splice(c,1);
                wallet.money+=10;
            }else if(coins[c].y>H){
                coins.splice(c,1);                
            }
        }
        
        if(count%Math.ceil(Math.random()*2550)==0&&enemies.length<4){
            enemies.push(new Enemy());
        }
        count++;
        if(lifebar.life<=0){
            if(confirm("Game Over.\nRestart?")){
                var s=doc.querySelector("#select");
    s.style.display="";
                lifebar.reset();
                wallet.reset();
                rows.length=0;
                coins.length=0;
            }
            return 0;
        }
        window.requestAnimationFrame(loop);
    }
}

/////////////////////
// Coin Class
/////////////////////
class Coin{
    constructor(x,y,moji){
        this.x=x;
        this.y=y;
        this.moji=moji;
    }
    update(){
        this.y++;
    }
    draw(){
        ctx.font="15px Arial";
        ctx.textAlign="center"
        ctx.textBaseline="middle"; 
        ctx.strokeStyle ="grey";
        ctx.fillText(this.moji,this.x,this.y);
        ctx.strokeText(this.moji,this.x,this.y);
    }
}


///////////////////////
// Row Class
//////////////////////
class Row{
    constructor(x,width){
        this.x=x;
        this.width=width;           
    }    
    draw(y){
        ctx.fillStyle ="gold";
        ctx.fillRect(this.x-this.width/2,y,this.width,1);
    }
}

//////////////////////////
// Character Class
///////////////////////

class Character{
    constructor(color){
        this.x=W/2;
        this.y=H/2;
        this.speedX=0;
        this.speedY=0;
        this.color=color;
        this.radius=W/20;
    }
    updatePosition(){
        this.radius=Math.sin(Date.now()/1200)*W/80*difficulty+W/80*difficulty;        
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.speedX=(controller.joystick.stick.x-controller.joystick.x)*0.03*dash;
        this.speedY=(controller.joystick.stick.y-controller.joystick.y)*0.03*dash;
        if(this.y>=H-10){
            this.y=H-10;
        }else if(this.y<10){
            this.y=10;
        }
        if(this.x>W){
            this.x=W;
        }else if(this.x<0){
            this.x=0;
        }
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle=damageOn?"hsl("+Date.now()/2%360+",100%,50%)":this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.strokeStyle ="#777";
        ctx.stroke();
        this.updatePosition();
    }
}

function checkPoints(x=hero.x,y=Math.round(hero.y)){
  
    if(x+hero.radius>rows[y].x+rows[y].width/2||x-hero.radius<rows[y].x-rows[y].width/2){
        lifebar.life--;
        damageOn=true;
    }else{
        damageOn=false;
    }
    for(let a=enemies.length-1;a>=0;a--){
        let d=Math.hypot(enemies[a].x-hero.x,enemies[a].y-hero.y);
        if(d<enemies[a].radius+hero.radius){
            lifebar.life--;
            damageOn=true;
        }
        enemies[a].draw();
        if(enemies[a].x>W||enemies[a].x<0){
            enemies.splice(a,1);
        }
    }
}
////////////////////
// Enemy class
///////////////////
class Enemy{
    constructor(){
        this.x=Math.random()>0.5?W:0;
        this.y=Math.random()*H;
        this.speedX=this.x==0?1*Math.random():-1*Math.random();
        this.speedY=this.y>H/2?-1*Math.random():1 *Math.random();
        this.radius=W/15;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.strokeStyle ="#777";
        ctx.stroke();
        this.updatePosition();
    }
    updatePosition(){
              
        this.x+=this.speedX;
        this.y+=this.speedY;
    }    
}





//////////////////////////
// Controller Module
////////////////////////
class Control{
    constructor(){
        this.joystick={
            x:2.5*W/10,
            y:0.7*H,
            radius:W/7,
            color:"rgba(100,100,100,0.2)",
            stick:{
                x:2.5*W/10,
                y:0.7*H,
                color:"black",
                radius:W/25,
                angle:null,
                touchRadius:0
            },
            draw:function(){
                this.stick.angle=Math.atan2((this.stick.y-this.y),(this.stick.x-this.x));
                
                this.stick.touchRadius=Math.hypot((this.stick.x-this.x),(this.stick.y-this.y));
                if(this.stick.touchRadius>this.radius){
                    this.stick.x=Math.cos(this.stick.angle)*this.radius+this.x;
                    this.stick.y=Math.sin(this.stick.angle)*this.radius+this.y;
                }
                ctx.beginPath();
                ctx.fillStyle=this.color;
                ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
                ctx.fill();
                ctx.strokeStyle ="#333";
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle=this.stick.color;
                ctx.arc(this.stick.x,this.stick.y,this.stick.radius,0,Math.PI*2);
                ctx.fill();
            }
        };
        this.buttons=[];
        this.clock={
            starttime:Date.now()
        };
    }
    addButton(x,y,radius,color,func){
        this.buttons.push(new Button(x,y,radius,color,func));
    }
    draw(){
        this.buttons.forEach((button)=>{button.draw()});
        this.joystick.draw();
        ctx.font = "30px Arial";
        ctx.strokeStyle="white";
        let d=Math.round((Date.now()-this.clock.starttime)/1000);
        ctx.fillText(d,0.9*W,H*0.1);
        ctx.strokeText(d,0.9*W,H*0.1);
    }    
}
class Button{
    constructor(x,y,radius,color,func){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.func=func;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.strokeStyle="#333";
        ctx.stroke();
    }
}

function touchStart(e) {
   
    e.preventDefault();
    if (e.touches.length >= 1) {
        
            for(let touch of Array.from(e.touches)){
                if((touch.pageX-touch.target.offsetLeft)>W/2){
                for(let button of controller.buttons){
                        if((touch.pageX>=(button.x-button.radius)&&touch.pageX<=(button.x+button.radius))&&(touch.pageY>=button.y-button.radius&&touch.pageY<=button.y+button.radius)){
                        button.func();;             
                    }
                }}
            }
    }
}
    
function touchMove(e) {

    e.preventDefault();
    
    if (e.touches.length >= 1) {
            
            for(let touch of Array.from(e.touches)){
                if((touch.pageX-touch.target.offsetLeft)<W/2&&stickside=="left"){
                controller.joystick.stick.x=(touch.pageX-touch.target.offsetLeft);
                controller.joystick.stick.y=touch.pageY-touch.target.offsetTop;}
            }
    }
}

function touchEnd(e){
if(e.touches.length==0){    controller.joystick.stick.x=controller.joystick.x;
    controller.joystick.stick.y=controller.joystick.y;
        dash=1;
    }else if(e.touches.length==1&&e.touches[0].pageX>W/2&&stickside=="left"){
        controller.joystick.stick.x=controller.joystick.x;
    controller.joystick.stick.y=controller.joystick.y;
    }else if(e.touches.length==1&&e.touches[0].pageX<W/2&&stickside=="left"){
        dash=1;
    }
}

//end of controller module

