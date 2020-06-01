import randomColor from 'randomcolor';
import throttle from "lodash.throttle";

class Circle {

  readonly radius: number;
  readonly color: string;
  private _location: { x: number, y: number };
  readonly velocity: { dx: number, dy: number };

  constructor(
    radius: number,
    color: string,
    velocity: { dx: number, dy: number } = { dx: Math.random() * 10 - 5, dy: Math.random() * 10 - 5 }
  ) {
    this.radius = radius;
    this.color = color;
    this._location = { x: 300, y: 200 };
    this.velocity = velocity;
  }

  update() {
    const { dx, dy } = this.velocity;
    const { x, y } = this._location;
    this._location = { x: dx + x, y: dy + y };
  }

  bounceX() {
    this.velocity.dx *= -1;
  }

  bounceY() {
    this.velocity.dy *= -1;
  }


  get location(): { x: number; y: number } {
    return this._location;
  }

}

class App {

  private canvas = document.createElement("canvas");
  private circles: Circle[] = [];
  private dimension = { width: 768, height: 512 };

  constructor() {

    const appContainer = document.getElementById("app-container")!;

    const dpr = window.devicePixelRatio;
    const { width, height } = this.dimension;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.id = "main-canvas";
    this.context.scale(dpr, dpr);
    this.canvas.tabIndex = 1;
    this.canvas.autofocus = true;
    appContainer.appendChild(this.canvas);

    const addCircleButton = document.createElement("button");
    addCircleButton.onclick = this.addCircle.bind(this);
    addCircleButton.innerText = "Add Circle";
    appContainer.appendChild(addCircleButton);

    const removeCircleButton = document.createElement("button");
    removeCircleButton.onclick = this.removeCircle.bind(this);
    removeCircleButton.innerText = "Remove Circle";
    appContainer.appendChild(removeCircleButton);

    const handler = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (event.key === ' ') {
        this.addCircle();
      } else if (event.key === 'Backspace') {
        this.removeCircle();
      }
    };

    const throttledHandler = throttle(handler, 50);

    this.canvas.addEventListener("keydown", throttledHandler);
  }

  public addCircle() {
    this.circles.push(new Circle(Math.random() * 10 + 10, randomColor()));
  }

  public removeCircle() {
    this.circles.pop();
  }

  private get context() {
    return this.canvas.getContext("2d")!
  }

  private drawCircle = function (this: CanvasRenderingContext2D, circle: Circle) {
    const { location: { x, y }, radius, color } = circle;
    this.fillStyle = color;
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI);
    this.fill();
  }.bind(this.context);

  private updateCircle = function (this: { width: number, height: number }, circle: Circle) {
    const { location: { x, y }, radius } = circle;
    const { width, height } = this;
    if (x + radius >= width || x - radius <= 0) circle.bounceX();
    if (y + radius >= height || y - radius <= 0) circle.bounceY();
    circle.update();
  }.bind(this.dimension);

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.circles.forEach(circle => {
      this.updateCircle(circle);
      this.drawCircle(circle);
    });
    requestAnimationFrame(() => this.render());
  }

}

document.addEventListener('DOMContentLoaded', function () {
  new App().render();
});
