/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Food } from "./Food";
import { NeuralNet } from "./NeuralNet";

export class Snake
{
    public score: number = 1;
    public lifeLeft: number = 200;  // Amount of moves the snake can make before it dies
    public lifetime: number = 0;  // Amount of time the snake has been alive
    private xVel: number;
    private yVel: number;
    private foodItterate: number = 0;  //itterator to run through the foodlist (used for replay)

    public fitness: number = 0;

    public dead: boolean = false;
    public replay: boolean = false;  //if this snake is a replay of best snake

    public vision: number[];  //snakes vision
    public decision: number[];  //snakes decision

    private head: p5.Vector;

    private body: p5.Vector[];  //snakes body
    private foodList: Food[];  //list of food positions (used to replay the best snake)

    private food: Food;
    public brain: NeuralNet;

    constructor(layers: number = null)
    {
        if (layers == null)
        {
            layers = hidden_layers;
        }

        this.head = createVector(800, height / 2);
        this.food = new Food();
        this.body = [];

        if (!humanPlaying)
        {
            this.vision = new Array<number>(24)
            this.decision = new Array<number>(4)
            this.foodList = []
            this.foodList.push(this.food.clone());
            this.brain = new NeuralNet(24, hidden_nodes, 4, layers);
            this.body.push(createVector(800, (height / 2) + SIZE));
            this.body.push(createVector(800, (height / 2) + (2 * SIZE)));
            this.score += 2;
        }

        return this;
    }

    static FromFoods(foods: Food[]): Snake
    {  //this constructor passes in a list of food positions so that a replay can replay the best snake
        let snake = new Snake();

        snake.replay = true;
        snake.vision = new Array<number>(24);
        snake.decision = new Array<number>(4);
        snake.body = [];
        snake.foodList = [];
        for (let f of foods)
        {  //clone all the food positions in the foodlist
            snake.foodList.push(f.clone());
        }
        snake.food = snake.foodList[snake.foodItterate];
        snake.foodItterate++;
        snake.head = createVector(800, height / 2);
        snake.body.push(createVector(800, (height / 2) + SIZE));
        snake.body.push(createVector(800, (height / 2) + (2 * SIZE)));
        snake.score += 2;

        return snake;
    }

    bodyCollide(x: number, y: number): boolean
    {  //check if a position collides with the snakes body
        for (let i = 0; i < this.body.length; i++)
        {
            if (x == this.body[i].x && y == this.body[i].y)
            {
                return true;
            }
        }
        return false;
    }

    foodCollide(x: number, y: number): boolean
    {  //check if a position collides with the food
        if (x == this.food.pos.x && y == this.food.pos.y)
        {
            return true;
        }
        return false;
    }

    wallCollide(x: number, y: number): boolean
    {  //check if a position collides with the wall
        if (x >= width - (SIZE) || x < 400 + SIZE || y >= height - (SIZE) || y < SIZE)
        {
            return true;
        }
        return false;
    }

    show(): void
    {  //show the snake
        this.food.show();
        fill(255);
        stroke(0);
        for (let i = 0; i < this.body.length; i++)
        {
            rect(this.body[i].x, this.body[i].y, SIZE, SIZE);
        }
        if (this.dead)
        {
            fill(150);
        } else
        {
            fill(255);
        }
        rect(this.head.x, this.head.y, SIZE, SIZE);
    }

    move(): void
    {  //move the snake
        if (!this.dead)
        {
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
            } else if (this.bodyCollide(this.head.x, this.head.y))
            {
                this.dead = true;
            } else if (this.lifeLeft <= 0 && !humanPlaying)
            {
                this.dead = true;
            }
        }
    }

    eat(): void
    {  //eat food
        let len = this.body.length - 1;
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
        if (len >= 0)
        {
            this.body.push(createVector(this.body[len].x, this.body[len].y));
        } else
        {
            this.body.push(createVector(this.head.x, this.head.y));
        }
        if (!this.replay)
        {
            this.food = new Food();
            while (this.bodyCollide(this.food.pos.x, this.food.pos.y))
            {
                this.food = new Food();
            }
            if (!humanPlaying)
            {
                this.foodList.push(this.food);
            }
        } else
        {  //if the snake is a replay, then we dont want to create new random foods, we want to see the positions the best snake had to collect
            this.food = this.foodList[this.foodItterate];
            this.foodItterate++;
        }
    }

    shiftBody(): void
    {  //shift the body to follow the head
        let tempx = this.head.x;
        let tempy = this.head.y;
        this.head.x += this.xVel;
        this.head.y += this.yVel;
        let temp2x: number;
        let temp2y: number;
        for (let i = 0; i < this.body.length; i++)
        {
            temp2x = this.body[i].x;
            temp2y = this.body[i].y;
            this.body[i].x = tempx;
            this.body[i].y = tempy;
            tempx = temp2x;
            tempy = temp2y;
        }
    }

    cloneForReplay(): Snake
    {  //clone a version of the snake that will be used for a replay
        let clone = Snake.FromFoods(this.foodList);
        clone.brain = this.brain.clone();
        return clone;
    }

    clone(): Snake
    {  //clone the snake
        let clone = new Snake(hidden_layers);
        clone.brain = this.brain.clone();
        return clone;
    }

    crossover(parent: Snake): Snake
    {  //crossover the snake with another snake
        let child = new Snake(hidden_layers);
        child.brain = this.brain.crossover(parent.brain);
        return child;
    }

    mutate(): void
    {  //mutate the snakes brain
        this.brain.mutate(mutationRate);
    }

    calculateFitness(): void
    {  //calculate the fitness of the snake
        if (this.score < 10)
        {
            this.fitness = floor(this.lifetime * this.lifetime) * pow(2, this.score);
        } else
        {
            this.fitness = floor(this.lifetime * this.lifetime);
            this.fitness *= pow(2, 10);
            this.fitness *= (this.score - 9);
        }
    }

    look()
    {  //look in all 8 directions and check for food, body and wall
        this.vision = [];
        let temp = this.lookInDirection(createVector(-SIZE, 0));
        this.vision[0] = temp[0];
        this.vision[1] = temp[1];
        this.vision[2] = temp[2];
        temp = this.lookInDirection(createVector(-SIZE, -SIZE));
        this.vision[3] = temp[0];
        this.vision[4] = temp[1];
        this.vision[5] = temp[2];
        temp = this.lookInDirection(createVector(0, -SIZE));
        this.vision[6] = temp[0];
        this.vision[7] = temp[1];
        this.vision[8] = temp[2];
        temp = this.lookInDirection(createVector(SIZE, -SIZE));
        this.vision[9] = temp[0];
        this.vision[10] = temp[1];
        this.vision[11] = temp[2];
        temp = this.lookInDirection(createVector(SIZE, 0));
        this.vision[12] = temp[0];
        this.vision[13] = temp[1];
        this.vision[14] = temp[2];
        temp = this.lookInDirection(createVector(SIZE, SIZE));
        this.vision[15] = temp[0];
        this.vision[16] = temp[1];
        this.vision[17] = temp[2];
        temp = this.lookInDirection(createVector(0, SIZE));
        this.vision[18] = temp[0];
        this.vision[19] = temp[1];
        this.vision[20] = temp[2];
        temp = this.lookInDirection(createVector(-SIZE, SIZE));
        this.vision[21] = temp[0];
        this.vision[22] = temp[1];
        this.vision[23] = temp[2];
    }

    lookInDirection(direction: p5.Vector): number[]
    {  //look in a direction and check for food, body and wall
        let look = [0, 0, 0]
        let pos = createVector(this.head.x, this.head.y);
        let distance: number = 0;
        let foodFound: boolean = false;
        let bodyFound: boolean = false;
        pos.add(direction);
        distance += 1;
        while (!this.wallCollide(pos.x, pos.y))
        {
            if (!foodFound && this.foodCollide(pos.x, pos.y))
            {
                foodFound = true;
                look[0] = 1;
            }
            if (!bodyFound && this.bodyCollide(pos.x, pos.y))
            {
                bodyFound = true;
                look[1] = 1;
            }
            if (this.replay && seeVision)
            {
                stroke(0, 255, 0);
                point(pos.x, pos.y);
                if (foodFound)
                {
                    noStroke();
                    fill(255, 255, 51);
                    ellipseMode(CENTER);
                    ellipse(pos.x, pos.y, 5, 5);
                }
                if (bodyFound)
                {
                    noStroke();
                    fill(102, 0, 102);
                    ellipseMode(CENTER);
                    ellipse(pos.x, pos.y, 5, 5);
                }
            }
            pos.add(direction);
            distance += 1;
        }
        if (this.replay && seeVision)
        {
            noStroke();
            fill(0, 255, 0);
            ellipseMode(CENTER);
            ellipse(pos.x, pos.y, 5, 5);
        }
        look[2] = 1 / distance;
        return look;
    }

    think()
    {  //think about what direction to move
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
        if (this.yVel != SIZE)
        {
            this.xVel = 0;
            this.yVel = -SIZE;
        }
    }

    moveDown(): void
    {
        if (this.yVel != -SIZE)
        {
            this.xVel = 0;
            this.yVel = SIZE;
        }
    }

    moveLeft(): void
    {
        if (this.xVel != SIZE)
        {
            this.xVel = -SIZE;
            this.yVel = 0;
        }
    }

    moveRight(): void
    {
        if (this.xVel != -SIZE)
        {
            this.xVel = SIZE;
            this.yVel = 0;
        }
    }
}
