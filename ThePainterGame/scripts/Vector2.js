
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static get zero() {
        return new Vector2();
    };

    get isZero() {
        return (this.x === 0 && this.y === 0);
    };

    addTo(v) {
        if (v instanceof Vector2) {
            this.x += v.x;
            this.y += v.y;
        }
        else if (!isNaN(v)) {
            this.x += v;
            this.y += v;
        }
        return this;
    };

    add(v) {
        let result = this.copy();
        return result.addTo(v);
    };

    subtractFrom(v) {
        if (v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        }
        else if (!isNaN(v)) {
            this.x -= v;
            this.y -= v;
        }
        return this;
    };

    subtract(v) {
        let result = this.copy();
        return result.subtractFrom(v);
    };

    divideBy(v) {
        if (v instanceof Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        }
        else if (!isNaN(v)) {
            this.x /= v;
            this.y /= v;
        }
        return this;
    };

    divide(v) {
        let result = this.copy();
        return result.divideBy(v);
    };

    multiplyWith(v) {
        if (v instanceof Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        }
        else if (!isNaN(v)) {
            this.x *= v;
            this.y *= v;
        }
        return this;
    };

    multiply(v) {
        let result = this.copy();
        return result.multiplyWith(v);
    };

    toString() {
        return `(${this.x}, ${this.y})`;
    };

    copy() {
        return new Vector2(this.x, this.y);
    };

    equals(obj) {
        return (this.x === obj.x && this.y === obj.y);
    };
}