/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Button } from "./Button";
import { Snake } from "./Snake";
import { Population } from "./Population";

window.SIZE = 20;
window.hidden_nodes = 16;
window.hidden_layers = 2;
window.fps = 100;  //15 is ideal for self play, increasing for AI does not directly increase speed, speed is dependant on processing power

window.highscore = 0;

window.mutationRate = 0.05;
window.defaultmutation = mutationRate;

window.humanPlaying = false;  //false for AI, true to play yourself
window.replayBest = true;  //shows only the best of each generation
window.seeVision = false;  //see the snakes vision
window.modelLoaded = false;

let increaseMut: Button;
let decreaseMut: Button;

let snake: Snake;
let model: Snake;

let pop: Population;

window.setup = function (): void
{
    createCanvas(1200, 800);
    increaseMut = new Button(340, 125, 20, 20, "+");
    decreaseMut = new Button(365, 125, 20, 20, "-");
    frameRate(fps);

    if (humanPlaying)
    {
        snake = new Snake();
    }
    else
    {
        pop = new Population(2000); //adjust size of population
    }
}

window.draw = function (): void
{
    background(0);
    noFill();
    stroke(255);
    line(400, 0, 400, height);
    rectMode(CORNER);
    rect(400 + SIZE, SIZE, width - 400 - 40, height - 40);

    if (humanPlaying)
    {
        snake.move();
        snake.show();
        fill(150);
        textSize(20);
        text("SCORE : " + snake.score, 500, 50);

        if (snake.dead)
        {
            snake = new Snake();
        }
    }
    else
    {
        if (!modelLoaded)
        {
            if (pop.done())
            {
                highscore = pop.bestSnake.score;
                pop.calculateFitness();
                pop.naturalSelection();
            } 
            else
            {
                pop.update();
                pop.show();
            }

            fill(150);
            textSize(25);
            textAlign(LEFT);
            text("BEST FITNESS : " + pop.bestFitness, 120, 25);
            text("MOVES LEFT : " + pop.bestSnake.lifeLeft, 120, 50);
            text("GEN : " + pop.gen, 120, 75);
            text("MUTATION RATE : " + mutationRate * 100 + "%", 120, 100);
            text("SCORE : " + pop.bestSnake.score, 120, height - 45);
            text("HIGHSCORE : " + highscore, 120, height - 15);
            increaseMut.show();
            decreaseMut.show();
        }
        else
        {
            model.look();
            model.think();
            model.move();
            model.show();
            model.brain.show(0, 0, 360, 790, model.vision, model.decision);

            if (model.dead)
            {
                let newmodel = new Snake();
                newmodel.brain = model.brain.clone();
                model = newmodel;

            }

            textSize(25);
            fill(150);
            textAlign(LEFT);
            text("SCORE : " + model.score, 120, height - 45);
        }

        textAlign(LEFT);
        textSize(18);
        fill(255, 0, 0);
        text("RED < 0", 120, height - 75);
        fill(0, 0, 255);
        text("BLUE > 0", 200, height - 75);
    }

}

window.mousePressed = function (): void
{
    if (increaseMut.collide(mouseX, mouseY))
    {
        mutationRate *= 2;
        defaultmutation = mutationRate;
    }

    if (decreaseMut.collide(mouseX, mouseY))
    {
        mutationRate /= 2;
        defaultmutation = mutationRate;
    }
}

window.keyPressed = function (): void
{
    if (humanPlaying)
    {
        switch (keyCode)
        {
            case UP_ARROW:
                snake.moveUp();
                break;
            case DOWN_ARROW:
                snake.moveDown();
                break;
            case LEFT_ARROW:
                snake.moveLeft();
                break;
            case RIGHT_ARROW:
                snake.moveRight();
                break;
        }
    }
}
