var clickSound=new Audio("Click.wav");
var backgroundMusic=new Audio("background music.mp3");
backgroundMusic.loop=true;

var warriorImage=document.getElementById("warrior");
var runStart=0;
var startingButtons=document.getElementById("startingButtons");
var startingButtonsMarginLeft=300;
function start(event) {
    //Enter key
    if (event.which==13) {
        if (warriorRunWorkerId==0) {
            if (beginNumber==1) {
            runStart=1
            clearInterval(idleWorkerId);
            warriorRunWorkerId=setInterval(run,70);
            runSound.play();
            backgroundWorkerId=setInterval(scrollingBackground,70);
            scoreWorkerId=setInterval(newScore,100);
            createObstacleId=setInterval(createObstacle,100);
            moveObstacleId=setInterval(moveObstacles,100);
            }
            
        }    
    }
    //Space Key
    if (event.which==32) {
        if (warriorJumpWorkerId==0) {
            if (runStart==1) {
                clearInterval(warriorRunWorkerId);
                runSound.pause();
                warriorJumpWorkerId=setInterval(jump,80);
                jumpSound.play();
            }
        }
            
        
    }
}

//Run Function
var runSound=new Audio("run.mp3");
runSound.loop=true;
var runImageNumber=1;
var warriorRunWorkerId=0;
function run() {
    runImageNumber++;
    if (runImageNumber==13) {
        runImageNumber=1;
    }
    warriorImage.src="run-"+runImageNumber+".png";
}

//Jump Function
var jumpSound=new Audio("Jump.wav")
var jumpImageNumber=1;
var warriorJumpWorkerId=0;
var warriorMarginTop=625;
function jump() {
    jumpImageNumber++;
    if (jumpImageNumber==15) {
        jumpImageNumber=1;
        clearInterval(warriorJumpWorkerId);
        warriorJumpWorkerId=0;
        warriorRunWorkerId=setInterval(run,70);
        runSound.play();
    }
    if (jumpImageNumber<=7) {
        warriorMarginTop=warriorMarginTop-40;
        warriorImage.style.marginTop=warriorMarginTop+"px";
    }
    if (jumpImageNumber>=8) {
        warriorMarginTop=warriorMarginTop+40;
        warriorImage.style.marginTop=warriorMarginTop+"px";
    }
    if (jumpImageNumber==14) {
        warriorImage.style.marginTop="625px";
    }
    warriorImage.src="jump-"+jumpImageNumber+".png";
}


//Scrolling Background
var backgroundWorkerId=0;
var background=document.getElementById("TreesBackground");
var platform=document.getElementById("platform");
var trees=document.getElementById("Trees");
var bigTrees=document.getElementById("bigTrees");
var platformX=0;
var bigTreesX=0;
var backgroundx=0;
function scrollingBackground() {
    startingButtonsMarginLeft=startingButtonsMarginLeft-10;
    startingButtons.style.marginLeft=startingButtonsMarginLeft+"px";
    backgroundx=backgroundx-3;
    bigTreesX=bigTreesX-5;
    platformX=platformX-10;
    background.style.backgroundPositionX=backgroundx+"px";
    bigTrees.style.backgroundPositionX=bigTreesX+"px";
    platform.style.backgroundPositionX=platformX+"px";
    trees.style.backgroundPositionX=platformX+"px"
}

//Score
var score=document.getElementById("score");
var scorePoint=0;
var scoreWorkerId=0;
function newScore() {
    scorePoint++;
    score.innerHTML=scorePoint;
}

//Create Obstacle
var createObstacleId=0;
var obstacleId=1;
var obstacleMarginLeft=600;
function createObstacle() {
    var obstacle=document.createElement("div");
    obstacle.className="obstacle";

    obstacle.id="obstacle"+obstacleId;
    obstacleId++;

    var gap=Math.random()*(1000-400)+400
    obstacleMarginLeft=obstacleMarginLeft+gap;

    obstacle.style.marginLeft=obstacleMarginLeft+"px";
    
    trees.appendChild(obstacle);
    trees.appendChild

}

//Move Obstacles
var moveObstacleId=0;
function moveObstacles() {
    for (var i=1; i<=obstacleId; i++){
        var currentObstacle=document.getElementById("obstacle"+i);
        var currentMarginLeft=currentObstacle.style.marginLeft;
        var newMarginLeft=parseInt(currentMarginLeft)-20;
        currentObstacle.style.marginLeft=newMarginLeft+"px";
        
        if (newMarginLeft<=82) {
            if (newMarginLeft>=22) {
                if (warriorMarginTop<=625) {
                    if (warriorMarginTop>=535) {
                        clearInterval(warriorRunWorkerId);
                        runSound.pause();
                        clearInterval(warriorJumpWorkerId);
                        warriorJumpWorkerId=-1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createObstacleId);
                        clearInterval(moveObstacleId);

                        deadWorkerId=setInterval(dead,70);
                        deadSound.play();
                    }
                }
            }
        }
    }
}

//Dead Function
var deadSound=new Audio("dead.wav");
var warriorDeadImageNumber=1;
var deadWorkerId=0;
function dead() {
    warriorDeadImageNumber++;
    if (warriorDeadImageNumber==7) {
        warriorDeadImageNumber=6;

        warriorImage.style.marginTop="617px";
        document.getElementById("gameOver").style.visibility="visible";
        score.style.visibility="hidden";
        startingButtons.style.visibility="hidden";
        document.getElementById("endScore").innerHTML=scorePoint;
    }
    warriorImage.src="dead-"+warriorDeadImageNumber+".png";
}

//Idle Function
var idleWorkerId=0;
var idleImageNumber=1;
function idle() {
    idleImageNumber++;
    if (idleImageNumber==7) {
        idleImageNumber=1;
    }
    warriorImage.src="idle-"+idleImageNumber+".png";
}


//Start Screen
var startScreen=document.getElementById("startScreen");
var startWarrior=document.getElementById("startWarrior");
var startWarriorImageId=1;
var startScreenId=0;
function startup() {
    backgroundMusic.play();
    startWarriorImageId++;
    warriorImage.style.visibility="hidden";
    startingButtons.style.visibility="hidden";
    score.style.visibility="hidden";
    if (startWarriorImageId==13) {
        startWarriorImageId=1;
    }
    startWarrior.src="run-"+startWarriorImageId+".png";
    
}
startScreenId=setInterval(startup,70);
var beginNumber=0;
function begin(){
    clickSound.play();
    beginNumber=1;
    clearInterval(startScreenId);
    startScreen.style.visibility="hidden";
    idleWorkerId=setInterval(idle,450);
    warriorImage.style.visibility="visible";
    startingButtons.style.visibility="visible";
    score.style.visibility="visible";
}

function refresh(){
    clickSound.play();
    location.reload();
}


function playIn(){
    document.getElementById("startButton").style.color="white";
    document.getElementById("retry").style.color="white";
}

function playOut(){
    document.getElementById("startButton").style.color="black";
    document.getElementById("retry").style.color="black";
}