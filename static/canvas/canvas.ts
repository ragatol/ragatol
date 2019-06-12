let tela = document.getElementById("tela") as HTMLCanvasElement;
let ctx = tela.getContext("2d");

const backgroundColor = "#000";
const width = tela.width;
const height = tela.height;

ctx.fillStyle = backgroundColor;
ctx.fillRect(0,0,width,height);

class Vector {
	x: number;
	y: number;

	constructor( x:number , y:number) {
		this.x = x;
		this.y = y;
	}

	add(o:Vector) {
		this.x += o.x;
		this.y += o.y;
	}
}

class MovingPoint {
	position: Vector;
	direction: Vector;

	constructor(position:Vector,direction:Vector) {
		this.position = position;
		this.direction = direction;
	}

	move() {
		this.position.add(this.direction);
		if (this.position.x <= 0 || this.position.x >= width)
			this.direction.x = -this.direction.x;
		if (this.position.y <= 0 || this.position.y >= height)
			this.direction.y = -this.direction.y;
	}
}

function randomPos(width:number,height:number): Vector {
	let x = Math.random() * width;
	let y = Math.random() * height;
	return new Vector(x,y);
}

function randomSpeed(min:number, max:number) {
	let val = Math.random() * (2 * max) - max;
	if (val > 0 && val < min) val = min;
	if (val < 0 && val > -min) val = -min;
	return val;
}

function randomDir(minSpeed:number, maxSpeed:number) {
	let x = randomSpeed(minSpeed,maxSpeed);
	let y = randomSpeed(minSpeed,maxSpeed);
	return new Vector(x,y);
}

class Polygon {
	points: MovingPoint[];
	color: string;
	open: boolean;

	constructor(vectors:number,color:string,open:boolean = false) {
		if (vectors < 2) throw Error("Need at least 2 poins!");
		if (vectors == 2) this.open = true; else this.open = open;
		this.color = color;
		this.points = new Array<MovingPoint>(vectors);
		for (let i = 0; i < this.points.length; ++i) {
			this.points[i] = new MovingPoint(randomPos(width,height),randomDir(1,8));
		}
	}

	update() {
		for (let point of this.points) {
			point.move();
		}
	}

	draw(ctx:CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		let {x,y} = this.points[0].position;
		ctx.moveTo(x,y);
		for (let i = 1; i < this.points.length; ++i) {
			let {x,y} = this.points[i].position;
			ctx.lineTo(x,y);
		}
		if (!this.open) ctx.closePath();
		ctx.stroke();
	}
}


let objects:Polygon[] = [
	new Polygon(2,"white"),
	new Polygon(3,"orange"),
	new Polygon(4,"rgb(100,150,255)")
];

let render = () => {
	ctx.fillStyle = "rgba(0,0,0,.075)";
	ctx.fillRect(0,0,width,height);
	for (let obj of objects) {
		obj.update();
		obj.draw(ctx);
	}
}

let rendering = window.setInterval(render,33);
