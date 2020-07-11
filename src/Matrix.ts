/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

export class Matrix
{
    public rows: number;
    public cols: number;
    public matrix: number[][];

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

    static FromMatrix(m: number[][]): Matrix
    {
        let matrix = new Matrix(0, 0);

        matrix.matrix = m;
        matrix.rows = m.length;
        matrix.cols = m[0].length;

        return matrix;
    }

    dot(n: Matrix): Matrix
    {
        let result = new Matrix(this.rows, n.cols);

        if (this.cols == n.rows)
        {
            for (let i = 0; i < this.rows; i++)
            {
                for (let j = 0; j < n.cols; j++)
                {
                    let sum = 0;
                    for (let k = 0; k < this.cols; k++)
                    {
                        sum += this.matrix[i][k] * n.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
        } else
        {
            console.warn("cols not equals rows")
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

    static singleColumnMatrixFromArray(arr: number[]): Matrix
    {
        let n = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++)
        {
            n.matrix[i][0] = arr[i];
        }
        return n;
    }

    toArray(): number[]
    {
        let arr: number[] = []

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                arr[j + i * this.cols] = this.matrix[i][j];
            }
        }
        return arr;
    }

    addBias(): Matrix
    {
        let n = new Matrix(this.rows + 1, 1);

        for (let i = 0; i < this.rows; i++)
        {
            n.matrix[i][0] = this.matrix[i][0];
        }

        n.matrix[this.rows][0] = 1;

        return n;
    }

    activate()
    {
        let n = new Matrix(this.rows, this.cols);
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
                let rand = random(0, 1);
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

    crossover(partner: Matrix): Matrix
    {
        let child = new Matrix(this.rows, this.cols);

        let randC = Math.floor(random(this.cols));
        let randR = Math.floor(random(this.rows));

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                if ((i < randR) || (i == randR && j <= randC))
                {
                    child.matrix[i][j] = this.matrix[i][j];
                } else
                {
                    child.matrix[i][j] = partner.matrix[i][j];
                }
            }
        }
        return child;
    }

    clone(): Matrix
    {
        let clone = new Matrix(this.rows, this.cols);
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
