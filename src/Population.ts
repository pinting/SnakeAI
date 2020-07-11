/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Snake } from "./Snake";

export class Population
{
    private snakes: Snake[];
    public bestSnake: Snake;

    private bestSnakeScore: number = 0;
    public gen: number = 0;
    private samebest: number = 0;

    public bestFitness: number = 0;
    private fitnessSum: number = 0;

    constructor(size: number)
    {
        this.snakes = []
        for (let i = 0; i < size; i++)
        {
            this.snakes[i] = new Snake();
        }
        this.bestSnake = this.snakes[0].clone();
        this.bestSnake.replay = true;
    }

    done(): boolean
    {  //check if all the snakes in the population are dead
        for (let i = 0; i < this.snakes.length; i++)
        {
            if (!this.snakes[i].dead)
                return false;
        }
        if (!this.bestSnake.dead)
        {
            return false;
        }
        return true;
    }

    update(): void
    {  //update all the snakes in the generation
        if (!this.bestSnake.dead)
        {  //if the best snake is not dead update it, this snake is a replay of the best from the past generation
            this.bestSnake.look();
            this.bestSnake.think();
            this.bestSnake.move();
        }
        for (let i = 0; i < this.snakes.length; i++)
        {
            if (!this.snakes[i].dead)
            {
                this.snakes[i].look();
                this.snakes[i].think();
                this.snakes[i].move();
            }
        }
    }

    show(): void
    {  //show either the best snake or all the snakes
        if (replayBest)
        {
            this.bestSnake.show();
            this.bestSnake.brain.show(0, 0, 360, 790, this.bestSnake.vision, this.bestSnake.decision);  //show the brain of the best snake
        }
        else
        {
            for (let i = 0; i < this.snakes.length; i++)
            {
                this.snakes[i].show();
            }
        }
    }

    setBestSnake(): void
    {  //set the best snake of the generation
        let max = 0;
        let maxIndex = 0;
        for (let i = 0; i < this.snakes.length; i++)
        {
            if (this.snakes[i].fitness > max)
            {
                max = this.snakes[i].fitness;
                maxIndex = i;
            }
        }
        if (max > this.bestFitness)
        {
            this.bestFitness = max;
            this.bestSnake = this.snakes[maxIndex].cloneForReplay();
            this.bestSnakeScore = this.snakes[maxIndex].score;
            //samebest = 0;
            //mutationRate = defaultMutation;
        }
        else
        {
            this.bestSnake = this.bestSnake.cloneForReplay();
            /*
            samebest++;
            if(samebest > 2) {  //if the best snake has remained the same for more than 3 generations, raise the mutation rate
               mutationRate *= 2;
               samebest = 0;
            }*/
        }
    }

    selectParent(): Snake
    {  //selects a random number in range of the fitnesssum and if a snake falls in that range then select it
        let rand = random(this.fitnessSum);
        let summation = 0;
        for (let i = 0; i < this.snakes.length; i++)
        {
            summation += this.snakes[i].fitness;
            if (summation > rand)
            {
                return this.snakes[i];
            }
        }
        return this.snakes[0];
    }

    naturalSelection(): void
    {
        let newSnakes = [];

        this.setBestSnake();
        this.calculateFitnessSum();

        newSnakes[0] = this.bestSnake.clone();  //add the best snake of the prior generation into the new generation
        for (let i = 1; i < this.snakes.length; i++)
        {
            let child = this.selectParent().crossover(this.selectParent());
            child.mutate();
            newSnakes[i] = child;
        }
        this.snakes = [];
        for (let s of newSnakes)
        {
            this.snakes.push(s.clone());
        }
        this.gen += 1;
    }

    mutate(): void
    {
        for (let i = 1; i < this.snakes.length; i++)
        {  //start from 1 as to not override the best snake placed in index 0
            this.snakes[i].mutate();
        }
    }

    calculateFitness(): void
    {  //calculate the fitnesses for each snake
        for (let i = 0; i < this.snakes.length; i++)
        {
            this.snakes[i].calculateFitness();
        }
    }

    calculateFitnessSum(): void
    {  //calculate the sum of all the snakes fitnesses
        this.fitnessSum = 0;
        for (let i = 0; i < this.snakes.length; i++)
        {
            this.fitnessSum += this.snakes[i].fitness;
        }
    }
}
