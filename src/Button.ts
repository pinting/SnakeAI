/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

export class Button
{
    private x: number;
    private y: number;
    private w: number;
    private h: number;
    private text: string;

    constructor(x: number, y: number, w: number, h: number, t: string)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = t;
    }

    collide(x: number, y: number)
    {
        if (x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y >= this.y - this.h / 2 && y <= this.y + this.h / 2)
        {
            return true;
        }
        return false;
    }

    show()
    {
        fill(255);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        textSize(22);
        textAlign(CENTER, CENTER);
        fill(0);
        noStroke();
        text(this.text, this.x, this.y - 3);
    }
}