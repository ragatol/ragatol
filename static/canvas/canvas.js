var tela = document.getElementById("tela");
var ctx = tela.getContext("2d");
var backgroundColor = "#000";
var width = tela.width;
var height = tela.height;
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (o) {
        this.x += o.x;
        this.y += o.y;
    };
    return Vector;
}());
var MovingPoint = (function () {
    function MovingPoint(position, direction) {
        this.position = position;
        this.direction = direction;
    }
    MovingPoint.prototype.move = function () {
        this.position.add(this.direction);
        if (this.position.x <= 0 || this.position.x >= width)
            this.direction.x = -this.direction.x;
        if (this.position.y <= 0 || this.position.y >= height)
            this.direction.y = -this.direction.y;
    };
    return MovingPoint;
}());
function randomPos(width, height) {
    var x = Math.random() * width;
    var y = Math.random() * height;
    return new Vector(x, y);
}
function randomSpeed(min, max) {
    var val = Math.random() * (2 * max) - max;
    if (val > 0 && val < min)
        val = min;
    if (val < 0 && val > -min)
        val = -min;
    return val;
}
function randomDir(minSpeed, maxSpeed) {
    var x = randomSpeed(minSpeed, maxSpeed);
    var y = randomSpeed(minSpeed, maxSpeed);
    return new Vector(x, y);
}
var Polygon = (function () {
    function Polygon(vectors, color, open) {
        if (open === void 0) { open = false; }
        if (vectors < 2)
            throw Error("Need at least 2 poins!");
        if (vectors == 2)
            this.open = true;
        else
            this.open = open;
        this.color = color;
        this.points = new Array(vectors);
        for (var i = 0; i < this.points.length; ++i) {
            this.points[i] = new MovingPoint(randomPos(width, height), randomDir(1, 8));
        }
    }
    Polygon.prototype.update = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.move();
        }
    };
    Polygon.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        var _a = this.points[0].position, x = _a.x, y = _a.y;
        ctx.moveTo(x, y);
        for (var i = 1; i < this.points.length; ++i) {
            var _b = this.points[i].position, x_1 = _b.x, y_1 = _b.y;
            ctx.lineTo(x_1, y_1);
        }
        if (!this.open)
            ctx.closePath();
        ctx.stroke();
    };
    return Polygon;
}());
var objects = [
    new Polygon(2, "white"),
    new Polygon(3, "orange"),
    new Polygon(4, "rgb(100,150,255)")
];
var render = function () {
    ctx.fillStyle = "rgba(0,0,0,.075)";
    ctx.fillRect(0, 0, width, height);
    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
        var obj = objects_1[_i];
        obj.update();
        obj.draw(ctx);
    }
};
var rendering = window.setInterval(render, 33);
//# sourceMappingURL=canvas.js.map