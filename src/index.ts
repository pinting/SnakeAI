/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Button } from "./Button";
import { Snake } from "./Snake";
import { Population } from "./Population";

window.DPC = 20;
window.SIZE = 40;
window.HIDDEN_NODES = 16;
window.HIDDEN_LARYERS = 2;
window.FPS = 100;

window.highscore = 0;
window.mutationRate = 0.05;
window.defaultMutation = mutationRate;
window.humanPlaying = false; // False for AI, true to play yourself
window.replayBest = true; // Shows only the best of each generation
window.seeVision = false; // See the snakes vision
window.modelLoaded = false;

let increaseMutationBtn: Button;
let decreaseMutationBtn: Button;

let snake: Snake;
let model: Snake;
let population: Population;

window.setup = function (): void
{
    createCanvas(1280, 800);

    increaseMutationBtn = new Button(320, 125, 20, 20, "+");
    decreaseMutationBtn = new Button(345, 125, 20, 20, "-");

    frameRate(FPS);

    if (humanPlaying)
    {
        snake = new Snake();
    }
    else
    {
        population = new Population(2000); // Adjust size of population
    }
}

window.draw = function (): void
{
    background(0);
    noFill();
    stroke(255);
    rectMode(CORNER);

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
            if (population.done())
            {
                highscore = population.bestSnake.score;
                population.calculateFitness();
                population.naturalSelection();
            } 
            else
            {
                population.update();
                population.show();
            }

            fill(150);
            textSize(25);
            textAlign(LEFT);

            text("BEST FITNESS: " + population.bestFitness, 105, 25);
            text("MOVES LEFT: " + population.bestSnake.lifeLeft, 105, 50);
            text("GEN: " + population.gen, 105, 75);
            text("MUTATION RATE: " + mutationRate * 100 + "%", 105, 100);

            text("SCORE : " + population.bestSnake.score, 105, height - 45);
            text("HIGHSCORE : " + highscore, 105, height - 15);

            increaseMutationBtn.show();
            decreaseMutationBtn.show();
        }
        else
        {
            model.look();
            model.think();
            model.move();
            model.show(400, 0);
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
    if (increaseMutationBtn.collide(mouseX, mouseY))
    {
        mutationRate *= 2;
        defaultMutation = mutationRate;
    }

    if (decreaseMutationBtn.collide(mouseX, mouseY))
    {
        mutationRate /= 2;
        defaultMutation = mutationRate;
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
