/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Food } from "./Food";
import { NeuralNet } from "./NeuralNet";

export class Snake
{
    score: number = 1;
    lifeLeft: number = 200; // Mount of moves the snake can make before it dies
    lifetime: number = 0;
    direction: p5.Vector = createVector(0, 0); // Amount of time the snake has been alive
    currentFoodIndex: number = 0; // Index to run through the foodlist (used for replay)

    fitness: number = 0;

    dead: boolean = false;
    replay: boolean = false; // If this snake is a replay of best snake

    vision: number[];  // Snakes vision
    decision: number[];  // Snakes decision

    head: p5.Vector;
    body: p5.Vector[]; // Snakes body
    foodList: Food[]; // List of food positions (used to replay the best snake)
    food: Food;
    brain: NeuralNet;

    constructor(layers: number = null)
    {
        if (layers == null)
        {
            layers = HIDDEN_LARYERS;
        }

        this.head = createVector(SIZE / 2, SIZE / 2);
        this.food = new Food();
        this.body = [];

        if (!humanPlaying)
        {
            this.vision = new Array<number>(24)
            this.decision = new Array<number>(4)
            this.foodList = [this.food.clone()]
            this.brain = new NeuralNet(24, HIDDEN_NODES, 4, layers);
            this.body.push(createVector(SIZE / 2, (SIZE / 2) + 1));
            this.body.push(createVector(SIZE / 2, (SIZE / 2) + 2));
            this.score += 2;
        }

        return this;
    }

    /**
     * This factory passes in a list of food positions so that a replay can replay the best snake.
     * @param foods 
     */
    static FromFoods(foods: Food[]): Snake
    {
        let snake = new Snake();

        snake.replay = true;
        snake.vision = new Array<number>(24);
        snake.decision = new Array<number>(4);
        snake.body = [];
        snake.foodList = [];

        // Clone all the food positions in the foodlist
        for (let f of foods)
        {
            snake.foodList.push(f.clone());
        }

        snake.food = snake.foodList[snake.currentFoodIndex++];
        snake.head = createVector(SIZE / 2, SIZE / 2);
        snake.body.push(createVector(SIZE / 2, (SIZE / 2) + 1));
        snake.body.push(createVector(SIZE / 2, (SIZE / 2) + 2));
        snake.score += 2;

        return snake;
    }

    /**
     * Check if a position collides with the snakes body.
     * @param x 
     * @param y 
     */
    bodyCollide(x: number, y: number): boolean
    {
        for (let i = 0; i < this.body.length; i++)
        {
            if (x == this.body[i].x && y == this.body[i].y)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if a position collides with the food.
     * @param x 
     * @param y 
     */
    foodCollide(x: number, y: number): boolean
    {
        return x == this.food.position.x && y == this.food.position.y;
    }

    /**
     * Check if a position collides with the wall.
     * @param x 
     * @param y 
     */
    wallCollide(x: number, y: number): boolean
    {
        return x >= SIZE || x < 0 || y >= SIZE || y < 0;
    }

    show(x: number = 0, y: number = 0): void
    {
        fill(100);
        rect(x, y, SIZE * DPC, SIZE * DPC);
        
        this.food.show(x, y);

        fill(255);
        stroke(0);

        for (let i = 0; i < this.body.length; i++)
        {
            rect(x + this.body[i].x * DPC, y + this.body[i].y * DPC, DPC, DPC);
        }

        if (this.dead)
        {
            fill(150);
        }
        else
        {
            fill(255);
        }

        rect(x + this.head.x * DPC, y + this.head.y * DPC, DPC, DPC);
    }

    /**
     * Move the snake.
     */
    move(): void
    {
        if (this.dead)
        {
            return;
        }
        
        if (!humanPlaying && !modelLoaded)
        {
            this.lifetime++;
            this.lifeLeft--;
        }

        if (this.foodCollide(this.head.x, this.head.y))
        {
            this.eat();
        }

        this.shiftBody();

        if (this.wallCollide(this.head.x, this.head.y))
        {
            this.dead = true;
        }
        else if (this.bodyCollide(this.head.x, this.head.y))
        {
            this.dead = true;
        }
        else if (this.lifeLeft <= 0 && !humanPlaying)
        {
            this.dead = true;
        }
    }

    /**
     * Eat food.
     */
    eat(): void
    {
        let last = this.body.length - 1;

        this.score++;
        
        if (!humanPlaying && !modelLoaded)
        {
            if (this.lifeLeft < 500)
            {
                if (this.lifeLeft > 400)
                {
                    this.lifeLeft = 500;
                } else
                {
                    this.lifeLeft += 100;
                }
            }
        }

        if (last >= 0)
        {
            this.body.push(createVector(this.body[last].x, this.body[last].y));
        }
        else
        {
            this.body.push(createVector(this.head.x, this.head.y));
        }

        if (!this.replay)
        {
            this.food = new Food();

            while (this.bodyCollide(this.food.position.x, this.food.position.y))
            {
                this.food = new Food();
            }
            if (!humanPlaying)
            {
                this.foodList.push(this.food);
            }
        }
        else
        {
            // If the snake is a replay, then we don't want to create new random foods, 
            // we want to see the positions the best snake had to collect
            this.food = this.foodList[this.currentFoodIndex++];
        }
    }

    /**
     * Shift the body to follow the head.
     */
    shiftBody(): void
    {
        let prevX = this.head.x;
        let prevY = this.head.y;
        
        this.head.x += this.direction.x;
        this.head.y += this.direction.y;

        for (let i = 0; i < this.body.length; i++)
        {
            const x = prevX;
            const y = prevY;

            prevX = this.body[i].x;
            prevY = this.body[i].y;

            this.body[i].x = x;
            this.body[i].y = y;
        }
    }

    /**
     * Clone a version of the snake that will be used for a replay.
     */
    cloneForReplay(): Snake
    {
        const clone = Snake.FromFoods(this.foodList);

        clone.brain = this.brain.clone();

        return clone;
    }

    /**
     * Clone the snake.
     */
    clone(): Snake
    {
        const clone = new Snake(HIDDEN_LARYERS);

        clone.brain = this.brain.clone();

        return clone;
    }

    /**
     * Crossover the snake with another snake.
     * @param parent 
     */
    crossover(parent: Snake): Snake
    {
        let child = new Snake(HIDDEN_LARYERS);

        child.brain = this.brain.crossover(parent.brain);

        return child;
    }

    /**
     * Mutate the snakes brain.
     */
    mutate(): void
    {
        this.brain.mutate(mutationRate);
    }

    /**
     * Calculate the fitness of the snake.
     */
    calculateFitness(): void
    {
        if (this.score < 10)
        {
            this.fitness = floor(this.lifetime * this.lifetime) * pow(2, this.score);
        }
        else
        {
            this.fitness = floor(this.lifetime * this.lifetime);
            this.fitness *= pow(2, 10);
            this.fitness *= (this.score - 9);
        }
    }

    /**
     * Look in all 8 directions and check for food, body and wall.
     */
    look()
    {
        this.vision = [];

        let temp = this.lookInDirection(createVector(-1, 0));

        this.vision[0] = temp[0];
        this.vision[1] = temp[1];
        this.vision[2] = temp[2];
        
        temp = this.lookInDirection(createVector(-1, -1));

        this.vision[3] = temp[0];
        this.vision[4] = temp[1];
        this.vision[5] = temp[2];

        temp = this.lookInDirection(createVector(0, -1));

        this.vision[6] = temp[0];
        this.vision[7] = temp[1];
        this.vision[8] = temp[2];

        temp = this.lookInDirection(createVector(1, -1));

        this.vision[9] = temp[0];
        this.vision[10] = temp[1];
        this.vision[11] = temp[2];

        temp = this.lookInDirection(createVector(1, 0));
        
        this.vision[12] = temp[0];
        this.vision[13] = temp[1];
        this.vision[14] = temp[2];

        temp = this.lookInDirection(createVector(1, 1));
        
        this.vision[15] = temp[0];
        this.vision[16] = temp[1];
        this.vision[17] = temp[2];

        temp = this.lookInDirection(createVector(0, 1));

        this.vision[18] = temp[0];
        this.vision[19] = temp[1];
        this.vision[20] = temp[2];

        temp = this.lookInDirection(createVector(-1, 1));

        this.vision[21] = temp[0];
        this.vision[22] = temp[1];
        this.vision[23] = temp[2];
    }

    /**
     * Look in a direction and check for food, body and wall.
     * @param direction 
     */
    lookInDirection(direction: p5.Vector): number[]
    {
        let look = new Array(3).fill(0)
        let position = createVector(this.head.x, this.head.y);
        let distance: number = 0;
        let foodFound: boolean = false;
        let bodyFound: boolean = false;

        position.add(direction);
        distance += 1;

        while (!this.wallCollide(position.x, position.y))
        {
            if (!foodFound && this.foodCollide(position.x, position.y))
            {
                foodFound = true;
                look[0] = 1;
            }

            if (!bodyFound && this.bodyCollide(position.x, position.y))
            {
                bodyFound = true;
                look[1] = 1;
            }

            if (this.replay && seeVision)
            {
                stroke(0, 255, 0);
                point(position.x, position.y);

                if (foodFound)
                {
                    noStroke();
                    fill(255, 255, 51);
                    ellipseMode(CENTER);
                    ellipse(position.x, position.y, 5, 5);
                }

                if (bodyFound)
                {
                    noStroke();
                    fill(102, 0, 102);
                    ellipseMode(CENTER);
                    ellipse(position.x, position.y, 5, 5);
                }
            }

            position.add(direction);
            distance += 1;
        }

        if (this.replay && seeVision)
        {
            noStroke();
            fill(0, 255, 0);
            ellipseMode(CENTER);
            ellipse(position.x, position.y, 5, 5);
        }

        look[2] = 1 / distance;

        return look;
    }

    /**
     * Think about what direction to move.
     */
    think()
    {
        this.decision = this.brain.output(this.vision);

        let maxIndex = 0;
        let max = 0;

        for (let i = 0; i < this.decision.length; i++)
        {
            if (this.decision[i] > max)
            {
                max = this.decision[i];
                maxIndex = i;
            }
        }

        switch (maxIndex)
        {
            case 0:
                this.moveUp();
                break;
            case 1:
                this.moveDown();
                break;
            case 2:
                this.moveLeft();
                break;
            case 3:
                this.moveRight();
                break;
        }
    }

    moveUp(): void
    {
        if (this.direction.y != 1)
        {
            this.direction.x = 0;
            this.direction.y = -1;
        }
    }

    moveDown(): void
    {
        if (this.direction.y != -1)
        {
            this.direction.x = 0;
            this.direction.y = 1;
        }
    }

    moveLeft(): void
    {
        if (this.direction.x != 1)
        {
            this.direction.x = -1;
            this.direction.y = 0;
        }
    }

    moveRight(): void
    {
        if (this.direction.x != -1)
        {
            this.direction.x = 1;
            this.direction.y = 0;
        }
    }
}
