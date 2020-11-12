# Rocket-Sauce

## Overview
Here lies my first original web-game project: ROCKET SAUCE! I wanted to spend most of my time having fun with the creative side of the project, so I chose a game concept that I knew I could get up and running fairly quick. As you can see by looking at the original mock-up, the concept is quite simple: fly the rocket as high as you can, avoid asteroids, and collect fuel along the way to keep going. This project hit that ideal "goldie-locks" level of not to difficult, but also just enough of a challenge for me too learn new things, and also have a lot of fun with it. 
___
### Mock-up vs. Finished Look
![mock-up](img/readme-pic.png)

## How to play
- Click the link! --> <a href="https://tcgilbert.github.io/rocket-sauce/">Rocket Sauce - PLAY NOW</a>
- Or, fork and clone this repository and open the `index.html` file or use a Live Server plug-in

## Languages and Tools
- Vanilla Javascript
- HTML5 Canvas
- CSS
- Adobe Photoshop
___

## Key Elements
___
## 1.) The illusion of upward movement
- Because the meat of this game is a square box moving from side to side on the lower fourth of the canvas, it was really important to create a feeling of upward mobility.
- This was accomplished in two ways
    1. Scrolling background
    2. Oscillating upper limit on rocket
### Scrolling Background
- There are two conditions in my handle background function
    - The first condition handles the first three background images, while the second condition handles the repeated background when the rocket is "in space."
    - The repeat is accomplished by drawing two images at the same time: one hidden and one the user sees. Once the visible image leaves the canvas its `y coordinate` is set to image's negative height value. 
    
        - `repeatBG.y1 = -repeatBG.height;`
``` javascript
function handleBackground() {
  if (yPosR === 0) {
    yPos += bgScroll * 0.5;
    ctx.drawImage(launchStage, 0, yPos, canvas.width, canvas.height);
    ctx.drawImage(stage2, 0, yPos - 800, canvas.width, canvas.height);
    ctx.drawImage(stars, 0, yPos - 1600, canvas.width, canvas.height);
  }
  if (yPos > 1600) {
    if (repeatBG.y1 >= repeatBG.height) repeatBG.y1 = -repeatBG.height;
    else repeatBG.y1 += bgScroll * 0.5;
    if (repeatBG.y2 >= repeatBG.height) repeatBG.y2 = -repeatBG.height;
    else repeatBG.y2 += bgScroll * 0.5;
    ctx.drawImage(stars, 0, repeatBG.y1, canvas.width, canvas.height);
    ctx.drawImage(stars, 0, repeatBG.y2, canvas.width, canvas.height);
  }
}
```
___
## 2.) Asteroids and Fuel
- The biggest challenge I faced with the game obstacles was creating dynamic spawn rates and locations optimal for gameplay.
### Spawn Locations
- Every obstacle spawned is created above the canvas, and each object has a unique downward velocity depending on its type. All this function does is return a random `x position` whenever an object is created.
- Because the canvas is 1000px wide I choose to create 10 different spawn locations to cover the whole canvas.
```javascript
function randomStartPos() {
  let ranNum = Math.ceil(Math.random() * 10);
  switch(ranNum) {
    case 1: return 100;
    case 2: return 200;
    case 3: return 300; 
    case 4: return 400;
    case 5: return 500; 
    case 6: return 600;
    case 7: return 700;
    case 8: return 800;
    case 9: return 900;
    case 10: return 950;
  }
}
```
### Spawn Rates
- The rate at which objects appeared was determined in their respective handler functions
    - handleFuel()
        - Becuase the rate at which a fuel object is generated is constant, the logic behind coding this was straight-forward.
        - The function is called within the game-loop and if the condition is met, a fuel object is created.
        - Here I use the amount of frames that have gone by with the modulo operator. 
```javascript
if (frame % fuelRate === 0) {
      fuelArray.unshift(new Fuel());
    }
```
 - handleAsteroids()
    - Because I wanted the rate at which asteroids are generated to be dynamic, I had to take a different approach that allowed for more control.
    - I tried a few different approaches, but eventually I settled on creating a setInterval() function so I could increase the rate at which asteroids are generated as the game goes on.
```javascript
if (!intervalStarted) {
      smallAsteroidInterval = setInterval(spawnAsteroidSmall, smallAsteroidRate);
      intervalStarted = true;
```
 - Again because `handleAsteroids()` ran in the game loop I had to use a boolean flag, in order to make sure that the interval was only created once: this was a technique used a lot throughout this project.
___
## 3.) The power-up blaster
<div>
<img src="img/blasterr.png" width="400" height="400" />
</div>

- While not the prettiest particle animation you'll see, I am proud of the way this came out. The particles, or circles in this case, are generated in the same way as the fuel objects, just at a much faster rate.
- Upon collision with an asteroid, the `blasted` property of the asteroid is set to true which changes the draw method of the asteroid class to draw `"+Xpts"`, as well as turn off collision detection for that object. 


