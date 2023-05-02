//Only start the game once
var title = true;

//Music
var titleMusic;
var overMusic = new Audio("./audio/07Liberation.mp3");

//GAME
var cyanPlayer = false;
var goldPlayer = false;
var purplePlayer = false;

//Event listener to start game
window.addEventListener("keypress", eventKeypress)

//-----------------------------------------------------------
//Start the GAME and open the canvas

function eventKeypress(e) {
    if (e.key == " ") {
        if (title == true) {
            document.getElementById('title').src = "./images/tutorial.gif";
            eventRules();
            canvasApp();
        }
    }
}

function eventRules() {
    titleMusic = new Audio("./audio/01DeadbyDaylightTheme.mp3");
    titleMusic.volume = 0.2;
    titleMusic.loop = true;
    titleMusic.play();
}


//-----------------------------------------------------------
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;
} // canvasSupport()


function canvasApp() {
    if (title = true) {
        title = false;

        var gameStart = false;
        //-----------------------------------------------------------
        //Check to see if the canvas has a context 
        if (!canvasSupport()) {
            return; //Canvas not supported so exit the function
        }

        window.onkeypress = function (e) {
            if (e.key == "Enter") {
                if (gameStart == false) {
                    document.getElementById('myCanvas').width = "1280";
                    document.getElementById('myCanvas').height = "720";
                    document.getElementById('title').width = "0";
                    console.log("game()");
                    overMusic.pause();
                    game();
                }
            }
        }



        function game() {

            // -----------------------------------------------------------
            //function for getting a random number with in a range
            //From the Collision Detection Lab
            function getRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            } //getRandom

            gameStart = true;
            titleMusic.pause();

            var player1escapeSound = false;
            var player2escapeSound = false;

            // -----------------------------------------------------
            //Setup the canvas object
            var theCanvas = document.getElementById("myCanvas"); //get the canvas element
            var ctx = theCanvas.getContext("2d"); //get the context

            var canvasHeight = theCanvas.height; //get the heigth of the canvas
            var canvasWidth = theCanvas.width; //get the width of the canvas
            var canvasColor = "rgba(0,0,0,1)";

            //Test Canvas
            //var canvasColor = "white";

            //Canvas
            var canvas = {
                color: canvasColor,
            };
            // -----------------------------------------------------------
            //MAP

            var borderEW = 100;
            var borderNW = 50;

            //Boundaries
            function drawBoundaries() {
                //Left
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.lineWidth = "5";
                ctx.stroke();
                ctx.fillRect(0, 0, borderEW, canvasHeight);
                ctx.closePath();

                //Right
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.lineWidth = "5";
                ctx.stroke();
                ctx.fillRect(canvasWidth - borderEW, 0, borderEW, canvasHeight);
                ctx.closePath();

                //Top
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.lineWidth = "5";
                ctx.stroke();
                ctx.fillRect(0, 0, canvasWidth, borderNW);
                ctx.closePath();

                //Bottom
                ctx.beginPath();
                ctx.strokeStyle = "rgb(0,0,30)";
                ctx.fillStyle = "rgb(0,0,30)";
                ctx.lineWidth = "5";
                ctx.stroke();
                ctx.fillRect(0, canvasHeight - borderNW, canvasWidth, borderNW);
                ctx.closePath();
            }

            // -----------------------------------------------------------
            //Random Spawn Points for Players
            var xObject;
            var yObject;
            var objectSpace = 50;

            //Player Spawn Boundaries
            var topB = borderNW + 1;
            var bottomB = canvasHeight - borderNW - 1;
            var leftB = borderEW + 1;
            var rightB = canvasWidth - borderEW - 1;

            //Random Coordinates for Players
            var player1X = getRandom(leftB, canvasWidth / 2);
            var player1Y = getRandom(topB, bottomB);

            var player2X = getRandom(canvasWidth / 2, rightB);
            var player2Y = getRandom(topB, bottomB);

            // -----------------------------------------------------------
            //Initilize Variables

            //Music Variables
            var bgMusic;
            var backgroundMusic = "./audio/02BeingWatched.mp3";
            var mute = false;

            //Player Variables
            var playerSize = 30;
            var playerSpeed = 2;
            var playerLight = 110;
            var playerEscaped = false;

            var enemyCount = 0;
            var enemies = [];
            var enemyColor = "#0D0D0D";

            //Exit gate
            var exitGateSize = 40;
            var exitGateX = getRandom(leftB, rightB - exitGateSize);
            var exitGateY = getRandom(topB, bottomB - exitGateSize);

            //Object Variables
            var flashLightTaken = false;
            var shoesTaken = false;
            var bearTaken = false;
            var medKitTaken = false;
            var glowColor = "red";

            //Random characters
            var player1Character = Math.floor(Math.random() * 7);
            var player2Character = Math.floor(Math.random() * 7);
            while (player1Character == player2Character) {
                player2Character = Math.floor(Math.random() * 7);
            }

            var player1 = {
                character: player1Character,
                alive: true,
                escaped: playerEscaped,
                x: player1X,
                y: player1Y,
                size: playerSize,
                speed: playerSpeed,
                lightCircle: playerLight,
            }

            var player2 = {
                character: player2Character,
                alive: true,
                escaped: playerEscaped,
                x: player2X,
                y: player2Y,
                size: playerSize,
                speed: playerSpeed,
                lightCircle: playerLight,
            }
            // -----------------------------------------------------------
            //Key press array

            var keysPressed = [];

            //Add key to list when pressed
            window.onkeydown = function (e) {
                var isKey = false;

                for (var i = 0; i < keysPressed.length; i++) {
                    if (e.key == keysPressed[i]) {
                        isKey = true;
                    }
                }

                if (isKey == false) {
                    keysPressed.push(e.key);
                }
            }

            //Remove the key when no longer touching key
            window.onkeyup = function (e) {
                for (var i = 0; i < keysPressed.length; i++) {
                    if (e.key == keysPressed[i]) {
                        keysPressed.splice(i, 1);
                    }
                }
            }

            // -----------------------------------------------------------
            //Sounds

            //Background Music
            function playBackground(song) {
                bgMusic = new Audio(song);
                bgMusic.pause();
                bgMusic.volume = 0.2;
                bgMusic.loop = true;
                bgMusic.play();
            }

            function endMusic() {
                overMusic.pause();
                overMusic.volume = 0.2;
                overMusic.loop = true;
                overMusic.play();
            }

            //play sound 
            function deathSound() {
                var dSound = new Audio("./audio/death.mp3");
                dSound.volume = 0.6;
                dSound.play();
            }

            function collectSound() {
                var cSound = new Audio("./audio/collectObject.mp3");
                cSound.volume = 0.6;
                cSound.play();
            }

            function escapeSound() {
                var eSound = new Audio("./audio/swoosh.mp3");
                eSound.volume = 0.6;
                eSound.play();
            }

            window.onkeypress = function (e) {
                if (e.key == "m" || e.key == "M") {
                    if (mute == false) {
                        bgMusic.pause();
                        mute = true;
                    } else {
                        bgMusic.play();
                        mute = false;
                    }
                }
            }
            // -----------------------------------------------------
            // Setup Images
            // declare an array for image objects
            var images = [];
            // assign our image sources
            var imageSources = [
                "./images/BluePlayer.png", //0
                "./images/CyanPlayer.png", //1
                "./images/GoldPlayer.png", //2
                "./images/GreenPlayer.png", //3
                "./images/PurplePlayer.png", //4
                "./images/RedPlayer.png", //5
                "./images/YellowPlayer.png", //6
                "./images/Bear.png", //7
                "./images/MedKit.png", //8
                "./images/Radar.png", //9
                "./images/Shoes.png", //10
                "./images/FlashLight.png"]; //11 
            //imageSource    

            // -----------------------------------------------------    
            // loadImages()
            // load all the images
            function loadImages(images, imageSources, callback) {
                var loadedImages = 0;

                // for each imageSource
                for (var src = 0; src < imageSources.length; src++) {
                    //create a new image object
                    images[src] = new Image();

                    //load the image 
                    images[src].onload = function () {
                        if (++loadedImages >= imageSources.length) {
                            callback(images);
                        };
                    }
                    //set the image source
                    images[src].src = imageSources[src];
                } //for
            } //loadimages()
            // -----------------------------------------------------    
            // Enemies

            //Generate Enemy
            function genEnemy() {
                enemyCount += 1;
                var circleSize = 30;

                var startMoveX = Math.floor(Math.random() * 2);

                if (startMoveX == 1) {
                    startMoveX = -5;
                } else if (startMoveX == 0) {
                    startMoveX = 5;
                }

                var startMoveY = Math.floor(Math.random() * 2);

                if (startMoveY == 1) {
                    startMoveY = -5;
                } else if (startMoveY == 0) {
                    startMoveY = 5;
                }

                var circleX = getRandom(0, canvasWidth);
                var circleY = 0;

                //circle
                var enemy = {
                    x: circleX,
                    y: circleY,
                    size: circleSize,
                    moveX: startMoveX,
                    moveY: startMoveY,
                }
                enemies.push(enemy);

            }

            function moveEnemies() {
                for (var i = 0; i < enemies.length; i++) {
                    // increment to the next location based on movement size
                    enemies[i].x += enemies[i].moveX;
                    enemies[i].y += enemies[i].moveY;

                    // check boundaries of X axis (right and left)
                    if (enemies[i].x > canvasWidth - borderEW - enemies[i].size / 2) {
                        enemies[i].x = canvasWidth - borderEW - enemies[i].size / 2;
                        //change direction
                        enemies[i].moveX *= -1;
                    }

                    if (enemies[i].x < borderEW + enemies[i].size / 2) {
                        enemies[i].x = borderEW + enemies[i].size / 2;
                        //change direction
                        enemies[i].moveX *= -1;
                    }

                    // check boundaries of Y axis (bottom or top)
                    if (enemies[i].y > canvasHeight - borderNW - enemies[i].size / 2) {
                        enemies[i].y = canvasHeight - borderNW - enemies[i].size / 2;
                        //change direction
                        enemies[i].moveY *= -1;
                    }

                    if (enemies[i].y < borderNW + enemies[i].size / 2) {
                        enemies[i].y = borderNW + enemies[i].size / 2;
                        //change direction
                        enemies[i].moveY *= -1;
                    }
                }
            }

            function drawEnemies() {
                for (var i = 0; i < enemies.length; i++) {
                    //start path
                    ctx.beginPath();
                    //draw circle    
                    ctx.arc(enemies[i].x, enemies[i].y, enemies[i].size / 2, 0, Math.PI * 2);
                    //set fill color
                    ctx.fillStyle = enemyColor;
                    //fill the circle
                    ctx.fill();
                    //close path
                    ctx.closePath();
                }
            }
            //Random Spawn Points for Objects
            var xObject;
            var yObject;
            var objectSpace = 50;

            //Player Spawn Boundaries
            var topB = borderNW + 1;
            var bottomB = canvasHeight - borderNW - 1;
            var leftB = borderEW + 1;
            var rightB = canvasWidth - borderEW - 1;

            //Random Coordinates for Players

            //Medkit
            var medkitX = getRandom(leftB + 25, canvasWidth / 2 - 25);
            var medkitY = getRandom(topB + 25 * 0.85, bottomB / 2 - 25 * 0.85);

            while (player1.x < medkitX + 25 &&
                player1.x + player1.size > medkitX &&
                player1.y < medkitY + 25 * 0.85 &&
                player1.size + player1.y > medkitY &&
                player2.x < medkitX + 25 &&
                player2.x + player2.size > medkitX &&
                player2.y < medkitY + 25 * 0.85 &&
                player2.size + player2.y > medkitY) {

                medkitX = getRandom(leftB + 25, canvasWidth / 2 - 25);
                medkitY = getRandom(topB + 25 * 0.85, bottomB / 2 - 25 * 0.85);

            }

            //radar
            var radarX = getRandom(canvasWidth / 2 + 25, rightB - 25);
            var radarY = getRandom(topB + 25 * 1.85, bottomB / 2 - 25 * 1.85);

            while (player1.x < radarX + 25 &&
                player1.x + player1.size > radarX &&
                player1.y < radarY + 25 * 1.85 &&
                player1.size + player1.y > radarY &&
                player2.x < radarX + 25 &&
                player2.x + player2.size > radarX &&
                player2.y < radarY + 25 * 1.85 &&
                player2.size + player2.y > radarY) {

                radarX = getRandom(canvasWidth / 2 + 25, rightB - 25);
                radarY = getRandom(topB + 25 * 1.85, bottomB / 2 - 25 * 1.85);

            }

            //shoes
            var shoesX = getRandom(leftB + 40, canvasWidth / 2 - 40);
            var shoesY = getRandom(canvasHeight / 2 + 40 * 0.5, bottomB - 40 * 0.5);

            while ((player1.x < shoesX + 40 &&
                    player1.x + player1.size > shoesX &&
                    player1.y < shoesY + 40 * 0.5 &&
                    player1.size + player1.y > shoesY) || (
                    player2.x < shoesX + 40 &&
                    player2.x + player2.size > shoesX &&
                    player2.y < shoesY + 40 * 0.5 &&
                    player2.size + player2.y > shoesY)) {

                shoesX = getRandom(leftB + 40, canvasWidth / 2 - 40);
                shoesY = getRandom(canvasHeight / 2 + 40 * 0.5, bottomB - 40 * 0.5);

            }

            //flashlight
            var flashlightX = getRandom(canvasWidth / 2 + 25, rightB - 25);
            var flashlightY = getRandom(canvasHeight / 2 + 25 * 2.048, bottomB - 25 * 2.048);

            while (player1.x < flashlightX + 25 &&
                player1.x + player1.size > flashlightX &&
                player1.y < flashLightY + 25 * 2.048 &&
                player1.size + player1.y > flashlightY &&
                player2.x < flashlightX + 25 &&
                player2.x + player2.size > flashlightX &&
                player2.y < flashlightY + 25 * 2.048 &&
                player2.size + player2.y > flashlightY) {

                flashlightX = getRandom(canvasWidth / 2 + 25, rightB - 25);
                flashlightY = getRandom(canvasHeight / 2 + 25 * 2.048, bottomB - 25 * 2.048);

            }

            // -----------------------------------------------------    
            // Objects

            //Variables
            var objectsFound = 0;
            var totalObjects = 5;
            var objects = [];
            var objectsTaken = [];

            //Objects

            //Bear
            var bear = {
                name: "bear",
                spawn: false,
                x: 640,
                y: 360,
                width: 30,
                length: 30 * 1,
            };
            objects.push(bear);

            var medKit = {
                name: "medkit",
                spawn: true,
                x: medkitX,
                y: medkitY,
                width: 25,
                length: 25 * 0.85,
            };
            objects.push(medKit);

            var radar = {
                name: "radar",
                spawn: true,
                x: radarX,
                y: radarY,
                width: 25,
                length: 25 * 1.85,
            };
            objects.push(radar);

            var shoes = {
                name: "shoes",
                spawn: true,
                x: shoesX,
                y: shoesY,
                width: 40,
                length: 40 * 0.5,
            };
            objects.push(shoes);

            var flashLight = {
                name: "flashlight",
                spawn: true,
                x: flashlightX,
                y: flashlightY,
                width: 25,
                length: 25 * 2.048,
            };
            objects.push(flashLight);


            function drawObjects() {
                //MedKit
                if (medKit.spawn == true) {
                    ctx.drawImage(images[8], medKit.x, medKit.y, medKit.width, medKit.length);
                }

                //Radar
                if (radar.spawn == true) {
                    ctx.drawImage(images[9], radar.x, radar.y, radar.width, radar.length);
                }

                //Shoes
                if (shoes.spawn == true) {
                    ctx.drawImage(images[10], shoes.x, shoes.y, shoes.width, shoes.length);
                }

                //Flashlight
                if (flashLight.spawn == true) {
                    ctx.drawImage(images[11], flashLight.x, flashLight.y, flashLight.width, flashLight.length);
                }

                //Bear
                if (bear.spawn == true) {
                    ctx.drawImage(images[7], bear.x, bear.y, bear.width, bear.length);
                }

            }

            // -----------------------------------------------------    
            // Player 1

            //Draw Player
            function drawPlayer1() {

                //boundaries
                if (player1.x <= borderEW) {
                    player1.x = borderEW + 1;
                }

                if (player1.x + player1.size >= canvasWidth - borderEW) {
                    player1.x = canvasWidth - player1.size - borderEW - 1;
                }

                if (player1.y <= borderNW) {
                    player1.y = borderNW + 1;
                }

                if (player1.y + player1.size >= canvasHeight - borderNW) {
                    player1.y = canvasHeight - borderNW - player1.size - 1;
                }

                //Draw Player
                if (player1.alive == true && player1.escaped == false) {
                    ctx.drawImage(images[player1.character], player1.x, player1.y, player1.size, player1.size)
                }

            } //drawPlayer1();

            function movePlayer1() {
                for (var i = 0; i < keysPressed.length; i++) {
                    if ((keysPressed[i] == "w" || keysPressed[i] == "W") && player1.alive == true) {
                        player1.y -= player1.speed;
                    }

                    if ((keysPressed[i] == "s" || keysPressed[i] == "S") && player1.alive == true) {
                        player1.y += player1.speed;
                    }

                    if ((keysPressed[i] == "a" || keysPressed[i] == "A") && player1.alive == true) {
                        player1.x -= player1.speed;
                    }

                    if ((keysPressed[i] == "d" || keysPressed[i] == "D") && player1.alive == true) {
                        player1.x += player1.speed;
                    }
                }

            } //movePlayer1()

            // -----------------------------------------------------    
            // Player 2

            //Draw Player
            function drawPlayer2() {

                //boundaries
                if (player2.x <= borderEW) {
                    player2.x = borderEW + 1;
                }

                if (player2.x + player2.size >= canvasWidth - borderEW) {
                    player2.x = canvasWidth - player2.size - borderEW - 1;
                }

                if (player2.y <= borderNW) {
                    player2.y = borderNW + 1;
                }

                if (player2.y + player2.size >= canvasHeight - borderNW) {
                    player2.y = canvasHeight - borderNW - player2.size - 1;
                }

                //Draw Player
                if (player2.alive == true && player2.escaped == false) {
                    ctx.drawImage(images[player2.character], player2.x, player2.y, player2.size, player2.size)
                }
            } //drawPlayer2()

            function movePlayer2() {

                for (var i = 0; i < keysPressed.length; i++) {
                    if (keysPressed[i] == "ArrowUp" && player2.alive == true) {
                        player2.y -= player2.speed;
                    }

                    if (keysPressed[i] == "ArrowDown" && player2.alive == true) {
                        player2.y += player2.speed;
                    }

                    if (keysPressed[i] == "ArrowLeft" && player2.alive == true) {
                        player2.x -= player2.speed;
                    }

                    if (keysPressed[i] == "ArrowRight" && player2.alive == true) {
                        player2.x += player2.speed;
                    }

                }
            } //movePlayer2()

            // -----------------------------------------------------------
            //Check Collisions 
            function checkCollisions() {

                // -----------------------------------------------------------
                //Enemy Collision

                //Player1
                for (var i = 0; i < enemies.length; i++) {

                    var distX = Math.abs(enemies[i].x - player1.x - player1.size / 2);
                    var distY = Math.abs(enemies[i].y - player1.y - player1.size / 2);

                    if ((((distX - player1.size / 2) * (distX - player1.size / 2)) + ((distY - player1.size / 2) * (distY - player1.size / 2))) <= ((enemies[i].size / 2) * (enemies[i].size / 2))) {
                        //write out the object locations for debugging

                        if (player1.alive == true) {
                            player1.alive = false;
                            deathSound();
                        }
                    } //if
                }

                //Player2
                for (var i = 0; i < enemies.length; i++) {

                    var distX = Math.abs(enemies[i].x - player2.x - player2.size / 2);
                    var distY = Math.abs(enemies[i].y - player2.y - player2.size / 2);

                    if ((((distX - player2.size / 2) * (distX - player2.size / 2)) + ((distY - player2.size / 2) * (distY - player2.size / 2))) <= ((enemies[i].size / 2) * (enemies[i].size / 2))) {
                        //write out the object locations for debugging

                        if (player2.alive == true) {
                            player2.alive = false;
                            deathSound();
                        }
                    } //if
                }

                // -----------------------------------------------------------
                //Object Collision
                //Player1

                for (var i = 0; i < objects.length; i++) {
                    if (player1.x < objects[i].x + objects[i].width &&
                        player1.x + player1.size > objects[i].x &&
                        player1.y < objects[i].y + objects[i].length &&
                        player1.size + player1.y > objects[i].y) {

                        if (objects[i].spawn == true) {
                            objects[i].x = 0;
                            objects[i].y = 0;
                            objects[i].spawn = false;
                            objectsTaken.push(objects[i].name);

                            objectsFound += 1;
                            collectSound();
                        }

                    }
                }

                //Player2
                for (var i = 0; i < objects.length; i++) {
                    if (player2.x < objects[i].x + objects[i].width &&
                        player2.x + player1.size > objects[i].x &&
                        player2.y < objects[i].y + objects[i].length &&
                        player2.size + player2.y > objects[i].y) {

                        if (objects[i].spawn == true) {
                            objects[i].x = 0;
                            objects[i].y = 0;
                            objects[i].spawn = false;
                            objectsTaken.push(objects[i].name);

                            objectsFound += 1;
                            collectSound();
                        }
                    }
                }

                //ExitGate Collisions
                //Player1
                if (player1.x < exitGateX + exitGateSize &&
                    player1.x + player1.size > exitGateX &&
                    player1.y < exitGateY + exitGateSize &&
                    player1.size + player1.y > exitGateY) {

                    if (objectsFound == 5) {
                        player1.escaped = true;
                        if (player1escapeSound == true) {
                            escapeSound();
                            player1escapeSound = false;
                        }
                    }

                }

                //Player2
                if (player2.x < exitGateX + exitGateSize &&
                    player2.x + player2.size > exitGateX &&
                    player2.y < exitGateY + exitGateSize &&
                    player2.size + player2.y > exitGateY) {

                    if (objectsFound == 5) {
                        player2.escaped = true;
                        if (player2escapeSound == true) {
                            escapeSound();
                            player2escapeSound = false;
                        }
                    }

                }



            } //checkCollision()
            // -----------------------------------------------------------
            //Draw lights
            function drawLights() {
                if (player1.alive == true && player1.escaped == false) {
                    ctx.beginPath();
                    ctx.arc((player1.x + (playerSize / 2)), (player1.y + (playerSize / 2)), player1.lightCircle / 2, 0, Math.PI * 2);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();
                }

                if (player2.alive == true && player2.escaped == false) {
                    ctx.beginPath();
                    ctx.arc((player2.x + (playerSize / 2)), (player2.y + (playerSize / 2)), player2.lightCircle / 2, 0, Math.PI * 2);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();
                }
            }

            // -----------------------------------------------------------
            //Other Functions

            //player buffs
            function checkObjects() {
                //MedKit
                if (medKit.spawn == false) {
                    if (medKitTaken == false) {
                        player1.alive = true;
                        player2.alive = true;
                        medKitTaken = true;
                    }
                }

                //Radar
                if (radar.spawn == false) {
                    enemyColor = "red";
                }

                //Shoes
                if (shoes.spawn == false) {
                    if (shoesTaken == false) {
                        player1.speed *= 2;
                        player2.speed *= 2;
                        shoesTaken = true;
                    }
                }

                //Flashlight
                if (flashLight.spawn == false) {
                    if (flashLightTaken == false) {
                        player1.lightCircle = 160;
                        player2.lightCircle = 160;
                        flashLightTaken = true;
                    }
                }

                //Spawn the bear
                if (objectsFound == 4) {
                    bear.spawn = true;
                }

                if (objectsFound == 1) {
                    if (enemyCount == 1) {
                        genEnemy();
                    }
                }

                if (objectsFound == 2) {
                    if (enemyCount == 2) {
                        genEnemy();
                    }
                }

                if (objectsFound == 3) {
                    if (enemyCount == 3) {
                        genEnemy();
                    }
                }

                if (objectsFound == 4) {
                    if (enemyCount == 4) {
                        genEnemy();
                    }
                }

                if (objectsFound == 5) {
                    glowColor = "white";
                    if (enemyCount == 5) {
                        genEnemy();
                    }
                }
            }

            function displayUI() {
                var displayStart = 420;
                var currentDistance = 0;
                var heightOffset = 30;

                ctx.beginPath();
                ctx.font = '24pt "Shrikhand", cursive, sans-serif';
                ctx.fillStyle = "white";
                ctx.strokeStyle = "red";
                ctx.lineWidth = "1";
                ctx.fillText('Objects Collected:', 100, canvasHeight - 15);
                ctx.strokeText('Objects Collected:', 100, canvasHeight - 15);
                ctx.closePath();

                //For Loop for items on bottom
                for (var i = 0; i < objectsTaken.length; i++) {
                    //Teddy Bear
                    if (objectsTaken[i] == "bear") {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = glowColor;
                        ctx.drawImage(images[7], displayStart + currentDistance, canvasHeight - heightOffset - 10, bear.width * 1.1, bear.length * 1.1)
                        ctx.shadowBlur = 0;
                        currentDistance += 60;
                    }

                    //MedKit
                    if (objectsTaken[i] == "medkit") {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = glowColor;
                        ctx.drawImage(images[8], displayStart + currentDistance, canvasHeight - heightOffset - 5, medKit.width * 1.1, medKit.length * 1.1);
                        ctx.shadowBlur = 0;
                        currentDistance += 60;
                    }

                    //Radar
                    if (objectsTaken[i] == "radar") {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = glowColor;
                        ctx.drawImage(images[9], displayStart + currentDistance, canvasHeight - heightOffset - 15, radar.width * 0.8, radar.length * 0.8);
                        ctx.shadowBlur = 0;
                        currentDistance += 50;
                    }

                    //Shoes
                    if (objectsTaken[i] == "shoes") {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = glowColor;
                        ctx.drawImage(images[10], displayStart + currentDistance, canvasHeight - heightOffset - 10, shoes.width * 1.5, shoes.length * 1.5);
                        ctx.shadowBlur = 0;
                        currentDistance += 90;
                    }

                    //Flashlight
                    if (objectsTaken[i] == "flashlight") {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = glowColor;
                        ctx.drawImage(images[11], displayStart + currentDistance, canvasHeight - heightOffset - 15, flashLight.width * 0.8, flashLight.length * 0.8);
                        ctx.shadowBlur = 0;
                        currentDistance += 55;
                    }

                } //ForLoop for Items on Bottom

                //Left Side Counter

                //Objects
                ctx.beginPath();
                ctx.font = '19pt "Shrikhand", cursive, sans-serif';
                ctx.fillStyle = "white";
                ctx.strokeStyle = "red";
                ctx.lineWidth = "1";
                ctx.fillText('Objects', 0, 65);
                ctx.strokeText('Objects', 0, 65);
                ctx.closePath();

                //Found
                ctx.beginPath();
                ctx.font = '19pt "Shrikhand", cursive, sans-serif';
                ctx.fillStyle = "white";
                ctx.strokeStyle = "red";
                ctx.lineWidth = "1";
                ctx.fillText('Found', 5, 85);
                ctx.strokeText('Found', 5, 85);
                ctx.closePath();

                ctx.beginPath();
                ctx.font = '25pt "Shrikhand", cursive, sans-serif';
                ctx.fillStyle = "white";
                ctx.strokeStyle = "red";
                ctx.lineWidth = "1";
                ctx.fillText(objectsFound + '/' + totalObjects, 15, 115);
                ctx.strokeText(objectsFound + '/' + totalObjects, 15, 115);
                ctx.closePath();
            }

            function drawExitGate() {
                if (objectsFound < totalObjects) {
                    ctx.beginPath();
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "5";
                    ctx.rect(exitGateX, exitGateY, exitGateSize, exitGateSize);
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.lineWidth = "5";
                    ctx.moveTo(exitGateX + 10, exitGateY)
                    ctx.lineTo(exitGateX + 10, exitGateY + exitGateSize);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.lineWidth = "5";
                    ctx.moveTo(exitGateX + 20, exitGateY)
                    ctx.lineTo(exitGateX + 20, exitGateY + exitGateSize);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.lineWidth = "5";
                    ctx.moveTo(exitGateX + 30, exitGateY)
                    ctx.lineTo(exitGateX + 30, exitGateY + exitGateSize);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                } else if (objectsFound == totalObjects) {
                    ctx.beginPath();
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "5";
                    ctx.rect(exitGateX, exitGateY, exitGateSize, exitGateSize);
                    ctx.stroke();
                    ctx.closePath();
                }
            }

            //the game loop
            function gameLoop() {
                requestAnimationFrame(gameLoop);
                //Check to see if game is over
                gameOverCheck();

                if (gameStart == true) {
                    drawCanvas();
                }
            }

            // clear canvas
            function clearCanvas(color) {
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            } //clearCanvas()

            //draw the canvas
            function drawCanvas() {
                //1. clear the canvas
                clearCanvas(canvas.color);

                //2. Check Buffs
                checkObjects();

                //3. move objects
                movePlayer1();
                movePlayer2();
                moveEnemies();

                //4. draw objects 
                drawLights();
                drawBoundaries();
                drawExitGate();
                drawObjects();
                drawPlayer1();
                drawPlayer2();
                drawEnemies();


                //Draw the UI
                displayUI();

                //5. check for collisions
                checkCollisions();
            }

            //Check to see if the game is over
            function gameOverCheck() {
                if (player1.alive == false && player2.alive == false) {
                    clearCanvas("black");
                    //GameOver
                    ctx.beginPath();
                    ctx.font = '60pt "Permanent Marker", cursive, sans-serif';
                    ctx.fillStyle = "red";
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "3";
                    ctx.fillText('GAME OVER', 360, 370);
                    ctx.strokeText('GAME OVER', 360, 370);
                    ctx.closePath();

                    //Press to Restart
                    ctx.beginPath();
                    ctx.font = '30pt "Permanent Marker", cursive, sans-serif';
                    ctx.fillStyle = "red";
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = "3";
                    ctx.fillText('Press Enter to Restart', 375, 400);
                    ctx.strokeText('Press Enter to Restart', 375, 400);
                    ctx.closePath();

                    reset();
                }

                //Check Escapes
                if (player1.escaped == true && player2.escaped == true) {
                    escaped();
                    cyanPlayer = true;
                    goldPlayer = true;
                } else if (player1.escaped == true && player2.alive == false) {
                    escaped();
                    cyanPlayer = true;
                    purplePlayer = true;
                } else if (player1.alive == false && player2.escaped == true) {
                    escaped();
                    cyanPlayer = true;
                    purplePlayer = true;
                }
            }

            function escaped() {
                //Escaped
                clearCanvas("black");
                ctx.beginPath();
                ctx.font = '60pt "Black Han Sans", cursive, sans-serif';
                ctx.fillStyle = "red";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "3";
                ctx.fillText('YOU ESCAPED', 330, 370);
                ctx.strokeText('YOU ESCAPED', 330, 370);
                ctx.closePath();

                //Press to Restart
                ctx.beginPath();
                ctx.font = '30pt "Black Han Sans", cursive, sans-serif';
                ctx.fillStyle = "red";
                ctx.strokeStyle = "black";
                ctx.lineWidth = "3";
                ctx.fillText('Press Enter to Restart', 375, 400);
                ctx.strokeText('Press Enter to Restart', 375, 400);
                ctx.closePath();
                reset();
            }

            //RESET VARIABLES TO PREVENT OVERLAPPING STUFF
            function reset() {
                bgMusic.pause();
                endMusic();

                var player1escapeSound = false;
                var player2escapeSound = false;

                gameStart = false;
                //Player Variables
                player1 = {
                    alive: true,
                    escaped: false,
                    speed: playerSpeed,
                    lightCircle: playerLight,
                }

                player2 = {
                    alive: true,
                    escaped: false,
                    speed: playerSpeed,
                    lightCircle: playerLight,
                }

                //Object Variables
                flashLightTaken = false;
                shoesTaken = false;
                bearTaken = false;
                medKitTaken = false;

                objectsFound = 0;
                totalObjects = 5;
                objects = [];
                glowColor = "red";

                //Enemy Variables
                enemyCount = 0;
                enemies = [];
                enemyColor = "#0D0D0D";

                //Sound
                bgMusic.volume = 0;

                canvasApp();


            }

            //Functions to begin

            loadImages(images, imageSources, function (images) {

            });

            //Start the game loop
            genEnemy();
            gameLoop();
            playBackground(backgroundMusic);
        }

    }

}
