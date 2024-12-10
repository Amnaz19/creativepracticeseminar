let scene = 0; // Scene control variable
let emojis = []; // Array to hold falling emojis for Scene 1
let basketX = 200; // Basket position (player-controlled)
let basketWidth = 60; // Basket width
let basketHeight = 10; // Basket height
let score = 0; // Score counter
let brushSize = 10; // Size of the brush
let isDrawing = false; // Flag for drawing state
let drawColor = [255, 0, 0]; // Default drawing color (red)
let arcade;
let scene3;
let scene4;
let scene1;
let scene5;
let startGame = false;
// Variables for bouncing feelings in Scene 0
let feelings = [];
let feelingTexts = ["😊", "😢", "😡", "😱", "😍", "😂", "😔", "😎", "🤯", "🥳"];

// Store all drawing points for Scene 2
let drawingPoints = [];
function preload(){
  arcade = loadImage("arcade.png")
  scene3 = loadImage("scene3.png")
  scene4 = loadImage("scene4.png")
  scene1 = loadImage("scene1.png")
  scene1_1 = loadImage("scene4.png")
}
function setup() {
  createCanvas(400, 600);

  // Initialize bouncing feelings for Scene 0
  for (let i = 0; i < 10; i++) {
    feelings.push({
      x: random(85, 280),
      y: random(210, 430),
      dx: random(-2, 2),
      dy: random(-2, 2),
      text: random(feelingTexts),
    });
  }

  // Initialize falling emojis for Scene 1
  for (let i = 0; i < 5; i++) {
    emojis.push({
      x: random(85, 280),
      y: random(200, 430),
      speed: random(2, 5),
      emoji: random(feelingTexts),
    });
  }
  
 setupMelody();
}

function draw() {
  background(50);
  if (scene == 0) {
    drawArcadeMachine("Welcome to Feelings Arcade", "Click the blue button to start!");
    // drawDancingFeelings(); // Dancing feelings in Scene 0
  } else if (scene === 1) {
    drawArcadeMachine("", ""); // Arcade machine without text
    playEmojiGameInsideMachine(); // Play game inside the machine
  } else if (scene === 2) {
    drawArcadeMachine("", ""); // Arcade machine without text
    drawFeelingGame(); // Drawing game in Scene 2
    drawColorPalette(); // Draw the color palette at the bottom of the machine
  }else if (scene === 3) {
    drawArcadeMachine("", ""); // Arcade machine without text
    melodyGame();
    
  }
  noFill()
  rect(85,200,220,230)
  ellipse(317,471,28,28)
  
}

// Function to draw the arcade machine
function drawArcadeMachine(mainText, subText) {

  if (scene == 0)image(scene1,0,0)
  else if (scene == 1 && !startGame)image(scene1_1,0,0);
  else if (scene == 1) image(scene4,0,0)
  else if (scene == 2 && drawingPoints.length)image(scene4,0,0);
  else if (scene == 2 )image(scene3,0,0);
  else if (scene == 3) image(scene4,0,0);
  else image(arcade,0,0);
  
  // Additional instructions for the game
  if (scene === 1) {
    fill(255); // White color for text
    textSize(14);
    text("Catch feelings and not eat them!", 200, 410); // Updated text color to white
    textSize(10);
    text("Press the red button to return.", 200, 430);
  }
}

// Function to draw bouncing feelings for Scene 0
function drawDancingFeelings() {
  textSize(20);
  fill(255);
  for (let feeling of feelings) {
    text(feeling.text, feeling.x, feeling.y);
    feeling.x += feeling.dx;
    feeling.y += feeling.dy;

    // Bounce off walls
    if (feeling.x < 80 || feeling.x > 280) feeling.dx *= -1;
    if (feeling.y < 210 || feeling.y > 430) feeling.dy *= -1;
  }
}

// Function to play the emoji-catching game inside the arcade machine
function playEmojiGameInsideMachine() {

  if(keyIsDown(RIGHT_ARROW)){
    basketX+=2;
    basketX = min(basketX,240);
    startGame = true
  }
  if(keyIsDown(LEFT_ARROW)){
    basketX-=2;
    basketX = max(basketX,85)
    startGame = true

  }
  if(!startGame)return
  // Draw basket
  fill(200, 100, 50);
  rect(basketX, 410, basketWidth, basketHeight, 5); // Basket inside the screen area
  // Update and draw emojis
  for (let i = 0; i < emojis.length; i++) {
    let emoji = emojis[i];
    textSize(20);
    fill(255);
    text(emoji.emoji, emoji.x, emoji.y);
    emoji.y += emoji.speed;

    // Check if emoji is caught
    if (
      emoji.y > 390 &&
      emoji.x > basketX &&
      emoji.x < basketX + basketWidth
    ) {
      score++; // Increase score
      emoji.y = 200; // Reset emoji position
      emoji.x = random(85, 290); // Reset emoji x-position
      emoji.speed = random(2, 5); // Reset emoji speed
    }

    // Reset if emoji falls out of screen
    if (emoji.y > 410) {
      emoji.y = 200;
      emoji.x = random(85, 290);
    }
  }

  // Display score
  fill(255);
  textSize(8);
  textAlign(LEFT, TOP);
  text("Score: " + score, 90, 220); // Display score in the top-left corner of the screen
}

// Function to draw the drawing game in Scene 2
function drawFeelingGame() {
  // Draw previous drawings
  for (let point of drawingPoints) {
    fill(point.color);
    noStroke();
    ellipse(point.x, point.y, brushSize, brushSize);
  }
  push()
  fill("white")
  text("CLEAR",95,185)
  noFill()
  stroke("white")
  rect(92,174,40,15)
  pop()

  // If the user is currently drawing
  if (isDrawing) {
    if (!(mouseX < 85 || mouseX > 300 || mouseY < 210 || mouseY > 400)){
    let currentPoint = {
      x: mouseX,
      y: mouseY,
      color: drawColor
    };
    drawingPoints.push(currentPoint); // Store the point to keep track of the drawing
    }
  }
}

// Function to draw the color palette at the bottom of the screen
function drawColorPalette() {
  let paletteY = 410; // Y position of the color palette (just above the button panel)
  let colorSize = 15; // Smaller size for each color swatch
  let colorSpacing = 15; // Smaller spacing between color swatches
  let startX = (width - (7 * colorSize + 6 * colorSpacing)) / 2; // Center palette

  // Colors in the palette
  let colors = [
    [255, 0, 0],    // Red
    [0, 255, 0],    // Green
    [0, 0, 255],    // Blue
    [255, 255, 0],  // Yellow
    [255, 165, 0],  // Orange
    [75, 0, 130],   // Indigo
    [238, 130, 238] // Violet
  ];

  // Draw color swatches
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(startX + i * (colorSize + colorSpacing), paletteY, colorSize, colorSize);
  }
}

// Handle mouse clicks for buttons and color palette
function mousePressed() {
    if(scene == 0 && mouseX>140 && mouseX<252 && mouseY>330 && mouseY<385)scene++;
    if(scene == 2 && mouseX>92 && mouseX<132 && mouseY>174 && mouseY<189)
      drawingPoints.splice(0,drawingPoints.length)
    if(dist(mouseX,mouseY,81,483)<20){
      scene--;
      if(scene<0)scene=3;
    }
     if(dist(mouseX,mouseY,317,471)<28){
      scene++;
      scene%=4;
    }
    // Check if mouse is inside the machine's screen to start drawing
    if (mouseX > 85 && mouseX < 300 && mouseY > 210 && mouseY < 400) {
      isDrawing = true; // Start drawing
    }

    // Check if mouse is on top of any color swatch
    let colorSize = 15;
    let colorSpacing = 15;
    let startX = (width - (7 * colorSize + 6 * colorSpacing)) / 2;
    for (let i = 0; i < 7; i++) {
      let colorX = startX + i * (colorSize + colorSpacing);
      if (mouseX > colorX && mouseX < colorX + colorSize && mouseY > 410 && mouseY < 425) {
        drawColor = [
          [255, 0, 0],    // Red
          [0, 255, 0],    // Green
          [0, 0, 255],    // Blue
          [255, 255, 0],  // Yellow
          [255, 165, 0],  // Orange
          [75, 0, 130],   // Indigo
          [238, 130, 238] // Violet
        ][i]; // Change the drawing color based on the selected swatch
      }
    }
}

// Handle mouse release to stop drawing
function mouseReleased() {
  isDrawing = false; // Stop drawing when mouse is released
}
