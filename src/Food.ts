/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

export class Food
{
    position: p5.Vector;

    constructor()
    {
        let x: number = Math.floor(random(0, SIZE));
        let y: number = Math.floor(random(0, SIZE));

        this.position = createVector(x, y);
    }

    show(x: number = 0, y: number = 0)
    {
        stroke(0);
        fill(255, 0, 0);
        rect(x + this.position.x * DPC, y + this.position.y * DPC, DPC, DPC);
    }

    clone()
    {
        let clone = new Food();

        clone.position.x = this.position.x;
        clone.position.y = this.position.y;

        return clone;
    }
}
