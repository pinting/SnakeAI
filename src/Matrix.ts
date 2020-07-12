/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

export class Matrix
{
    rows: number;
    cols: number;
    matrix: number[][];

    constructor(r: number, c: number)
    {
        this.rows = r;
        this.cols = c;
        this.matrix = []

        for (let y = 0; y < r; y++)
        {
            this.matrix[y] = [];
        }
    }

    static FromMatrix(other: number[][]): Matrix
    {
        const matrix = new Matrix(0, 0);

        matrix.matrix = other;
        matrix.rows = other.length;
        matrix.cols = other[0].length;

        return matrix;
    }

    dot(other: Matrix): Matrix
    {
        const result = new Matrix(this.rows, other.cols);

        if (this.cols == other.rows)
        {
            for (let i = 0; i < this.rows; i++)
            {
                for (let j = 0; j < other.cols; j++)
                {
                    let sum = 0;
                    for (let k = 0; k < this.cols; k++)
                    {
                        sum += this.matrix[i][k] * other.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
        }
        else
        {
            console.warn("Matrix: this.cols not equals other.rows in dot function")
        }

        return result;
    }

    randomize(): void
    {
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                this.matrix[i][j] = random(-1, 1);
            }
        }
    }

    static singleColumnMatrixFromArray(array: number[]): Matrix
    {
        const n = new Matrix(array.length, 1);

        for (let i = 0; i < array.length; i++)
        {
            n.matrix[i][0] = array[i];
        }

        return n;
    }

    toArray(): number[]
    {
        const array: number[] = []

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                array[j + i * this.cols] = this.matrix[i][j];
            }
        }
        return array;
    }

    addBias(): Matrix
    {
        const n = new Matrix(this.rows + 1, 1);

        for (let i = 0; i < this.rows; i++)
        {
            n.matrix[i][0] = this.matrix[i][0];
        }

        n.matrix[this.rows][0] = 1;

        return n;
    }

    activate()
    {
        const n = new Matrix(this.rows, this.cols);

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                n.matrix[i][j] = this.relu(this.matrix[i][j]);
            }
        }

        return n;
    }

    relu(x: number)
    {
        return max(0, x);
    }

    mutate(mutationRate: number)
    {
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                const rand = random(0, 1);

                if (rand < mutationRate)
                {
                    this.matrix[i][j] += randomGaussian(0, 1) / 5;

                    if (this.matrix[i][j] > 1)
                    {
                        this.matrix[i][j] = 1;
                    }
                    if (this.matrix[i][j] < -1)
                    {
                        this.matrix[i][j] = -1;
                    }
                }
            }
        }
    }

    crossover(other: Matrix): Matrix
    {
        const child = new Matrix(this.rows, this.cols);

        const randC = Math.floor(random(this.cols));
        const randR = Math.floor(random(this.rows));

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                if ((i < randR) || (i == randR && j <= randC))
                {
                    child.matrix[i][j] = this.matrix[i][j];
                } else
                {
                    child.matrix[i][j] = other.matrix[i][j];
                }
            }
        }
        return child;
    }

    clone(): Matrix
    {
        const clone = new Matrix(this.rows, this.cols);

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                clone.matrix[i][j] = this.matrix[i][j];
            }
        }

        return clone;
    }
}
