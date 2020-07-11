/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

export class Food
{
    public pos: p5.Vector;

    constructor()
    {
        let x: number = 400 + SIZE + Math.floor(random(38)) * SIZE;
        let y: number = SIZE + Math.floor(random(38)) * SIZE;

        this.pos = createVector(x, y);
    }

    show()
    {
        stroke(0);
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y, SIZE, SIZE);
    }

    clone()
    {
        let clone = new Food();

        clone.pos.x = this.pos.x;
        clone.pos.y = this.pos.y;

        return clone;
    }
}
