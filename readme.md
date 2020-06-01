# Bouncy Circles
Just a little demo where I tried to use canvas and webpack :P

## Live Demo

![](https://github.com/LeoYulinLiAa/bouncy_circles/workflows/Deploy%20to%20Github%20Pages/badge.svg)

https://leoyulinliaa.github.io/bouncy_circles

## Interesting bits on this project
- **By default, you can't focus on a canvas...**
  - That means when you do `addEventListener` to a canvas, it will never work...
    But there is a simple solution which is adding a `tabIndex` to the canvas...
  - See: https://stackoverflow.com/questions/12886286/addeventlistener-for-keydown-on-canvas
- **By default, canvas doesn't look good on high DPI devices...**
  - But luckly we can scale the canvas context using `CanvasTransform#scale` and `Window#devicePixelRatio`.
  - See: https://www.html5rocks.com/en/tutorials/canvas/hidpi/
- The `throttle` function (w8d5 exercise) is actually being used when handling keyboard input! 
  (Just not the one I implemted. The lodash one is better anyway :P)
