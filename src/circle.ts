export class Circle {

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