/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Snake } from "./Snake";

export class Population
{
    snakes: Snake[];
    bestSnake: Snake;

    bestSnakeScore: number = 0;
    gen: number = 0;
    samebest: number = 0;

    bestFitness: number = 0;
    fitnessSum: number = 0;

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

    /**
     * Check if all the snakes in the population are dead.
     */
    done(): boolean
    {
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

    /**
     * Update all the snakes in the generation.
     */
    update(): void
    {
        // If the best snake is not dead update it, this snake is a replay of the best from the past generation
        if (!this.bestSnake.dead)
        {
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

    /**
     * Show either the best snake or all the snakes.
     */
    show(x: number = 0, y: number = 0): void
    {
        // Show the brain of the best snake
        if (replayBest)
        {
            this.bestSnake.show(x + 400, y);
            this.bestSnake.brain.show(x, y, 360, 790, this.bestSnake.vision, this.bestSnake.decision);
        }
        else
        {
            for (let i = 0; i < this.snakes.length; i++)
            {
                this.snakes[i].show(x, y);
            }
        }
    }

    /**
     * Set the best snake of the generation.
     */
    setBestSnake(): void
    {
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
        }
        else
        {
            this.bestSnake = this.bestSnake.cloneForReplay();
        }
    }

    // Selects a random number in range of the fitnesssum and if a snake falls in that range then select it.
    selectParent(): Snake
    {
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

        // Add the best snake of the prior generation into the new generation
        newSnakes[0] = this.bestSnake.clone();

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
        // Start from 1 as to not override the best snake placed in index 0
        for (let i = 1; i < this.snakes.length; i++)
        {
            this.snakes[i].mutate();
        }
    }

    /**
     * Calculate the fitnesses for each snake.
     */
    calculateFitness(): void
    {
        for (let i = 0; i < this.snakes.length; i++)
        {
            this.snakes[i].calculateFitness();
        }
    }

    // Calculate the sum of all the snakes fitnesses.
    calculateFitnessSum(): void
    {
        this.fitnessSum = 0;
        for (let i = 0; i < this.snakes.length; i++)
        {
            this.fitnessSum += this.snakes[i].fitness;
        }
    }
}
