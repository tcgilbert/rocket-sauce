# Rocket-Sauce: the game

## Overview
Here lies my very first web-game project that was completely of my own making. I wanted to create a game that hit that "goldie locks" level of not too diffcult, but also still an appropriate challenge. I am happy to report this game provided just that. As you can see by looking at the initial sketch, the concept is quite simple: Fly a rocket as high as you can, avoid asteroids along the way, and collect fuel to keep going. 
___
### Original Mock-up: where I started...
![mock-up](img/project-1_mockup.png)
### Completed Project: where I ended up...
![mock-up](img/finished-look.png)

## Key Elements
___
## 1.) The illusion of upward movement
- Because the meat of this game is a square box moving from side to side on the lower fourth of the canvas, it was really important to create a feeling of upward mobility
- This was accomplished in two ways
    1. Scrolling background
    2. Oscillating upper limit on rocket
### Scrolling Background
- There are two conditions in my handle background function
    - The first condition handles the first three background images, while the second condition handles the repeated background when the rocket is "in space."
    - The repeat is accomplished by drawing two images at the same time: one hidden and one the user sees. Once the visible image leaves the canvas its `y coordinate` is set to image's negative height value 
    
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
## 2.) Asteroids and Fuel
- The biggest challenge I faced with the game obstacles was creating a dynamic spawn rate and spawn location 
### Spawn Locations
- Every obstacle spawned is created above the canvas, with a downward velocity depending on what object it is. All this function does is return a random `x position` whenever an object is created.
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
        - Becuase the rate at which a fuel object is generated is constant, the logic behind coding this was straight-forward
        - The function is called within the game-loop and if the condition is met, a fuel object is created
```javascript
if (frame % fuelRate === 0) {
      fuelArray.unshift(new Fuel());
    }
```
 - handleAsteroids()
    - Because I wanted the rate at which asteroids are generated to be dynamic, I had to take a different approach that allowed for more control
    - I tried a few different approaches, but eventually I settled on creating an setInterval() function so I could increase the rate at which asteroids are generated as the game goes on
```javascript
if (!intervalStarted) {
      smallAsteroidInterval = setInterval(spawnAsteroidSmall, smallAsteroidRate);
      intervalStarted = true;
```
 - Again because `handleAsteroids()` ran in the game loop I had to use a boolean flag, in order to make sure that the interval was only created once

## 2.) The power-up blaster
### This thing...
<div>
<img src="img/blasterr.png" width="400" height="400" />
</div>

- While not the prettiest particle animation you'll see, I am proud of the way this came out. The particles, or circles in this case, are generated in the same way as the fuel object, just at a much faster rate.
- Upon collision the `blasted` property of an asteroid is set to true which changes the draw method of the asteroid class to draw a score, as well as turn off any collision detection 

## Major Takeawways
