/// <reference path="./global.d.ts" />

import * as p5_global from "p5/global"
import * as p5 from "p5"

import { Matrix } from "./Matrix";

export class NeuralNet
{
    private iNodes: number;
    private hNodes: number;
    private oNodes: number;
    private hLayers: number;
    private weights: Matrix[];

    constructor(input: number, hidden: number, output: number, hiddenLayers: number)
    {
        this.iNodes = input;
        this.hNodes = hidden;
        this.oNodes = output;
        this.hLayers = hiddenLayers;

        this.weights = [];
        this.weights.push(new Matrix(this.hNodes, this.iNodes + 1));
        for (let i = 1; i < this.hLayers; i++)
        {
            this.weights.push(new Matrix(this.hNodes, this.hNodes + 1));
        }
        this.weights.push(new Matrix(this.oNodes, this.hNodes + 1));

        for (let w of this.weights)
        {
            w.randomize();
        }
    }

    mutate(mr: number)
    {
        for (let w of this.weights)
        {
            w.mutate(mr);
        }
    }

    output(inputsArr: number[]): number[]
    {
        let inputs = Matrix.singleColumnMatrixFromArray(inputsArr);
        let curr_bias = inputs.addBias();

        for (let i = 0; i < this.hLayers; i++)
        {
            let hidden_ip = this.weights[i].dot(curr_bias);
            let hidden_op = hidden_ip.activate();
            curr_bias = hidden_op.addBias();
        }

        let output_ip = this.weights[this.weights.length - 1].dot(curr_bias);
        let output = output_ip.activate();

        return output.toArray();
    }

    crossover(partner: NeuralNet): NeuralNet
    {
        let child = new NeuralNet(this.iNodes, this.hNodes, this.oNodes, this.hLayers);
        for (let i = 0; i < this.weights.length; i++)
        {
            child.weights[i] = this.weights[i].crossover(partner.weights[i]);
        }
        return child;
    }

    clone(): NeuralNet
    {
        let clone = new NeuralNet(this.iNodes, this.hNodes, this.oNodes, this.hLayers);
        for (let i = 0; i < this.weights.length; i++)
        {
            clone.weights[i] = this.weights[i].clone();
        }

        return clone;
    }

    load(weight: Matrix[]): void
    {
        for (let i = 0; i < this.weights.length; i++)
        {
            this.weights[i] = weight[i];
        }
    }

    pull(): Matrix[]
    {
        let model: Matrix[] = []

        for (let w of this.weights)
        {
            model.push(w.clone());
        }

        return model;
    }

    show(x: number, y: number, w: number, h: number, vision: number[], decision: number[])
    {
        let space = 5;
        let nSize = (h - (space * (this.iNodes - 2))) / this.iNodes;
        let nSpace = (w - (this.weights.length * nSize)) / this.weights.length;
        let hBuff = (h - (space * (this.hNodes - 1)) - (nSize * this.hNodes)) / 2;
        let oBuff = (h - (space * (this.oNodes - 1)) - (nSize * this.oNodes)) / 2;

        let maxIndex = 0;

        for (let i = 1; i < decision.length; i++)
        {
            if (decision[i] > decision[maxIndex])
            {
                maxIndex = i;
            }
        }

        let lc = 0;  //Layer Count

        //DRAW NODES
        for (let i = 0; i < this.iNodes; i++)
        {  //DRAW INPUTS
            if (vision[i] != 0)
            {
                fill(0, 255, 0);
            } else
            {
                fill(255);
            }
            stroke(0);
            ellipseMode(CORNER);
            ellipse(x, y + (i * (nSize + space)), nSize, nSize);
            textSize(nSize / 2);
            textAlign(CENTER, CENTER);
            fill(0);
            text(i, x + (nSize / 2), y + (nSize / 2) + (i * (nSize + space)));
        }

        lc++;

        for (let a = 0; a < this.hLayers; a++)
        {
            for (let i = 0; i < this.hNodes; i++)
            {  //DRAW HIDDEN
                fill(255);
                stroke(0);
                ellipseMode(CORNER);
                ellipse(x + (lc * nSize) + (lc * nSpace), y + hBuff + (i * (nSize + space)), nSize, nSize);
            }
            lc++;
        }

        for (let i = 0; i < this.oNodes; i++)
        {  //DRAW OUTPUTS
            if (i == maxIndex)
            {
                fill(0, 255, 0);
            } else
            {
                fill(255);
            }
            stroke(0);
            ellipseMode(CORNER);
            ellipse(x + (lc * nSpace) + (lc * nSize), y + oBuff + (i * (nSize + space)), nSize, nSize);
        }

        lc = 1;

        //DRAW WEIGHTS
        for (let i = 0; i < this.weights[0].rows; i++)
        {  //INPUT TO HIDDEN
            for (let j = 0; j < this.weights[0].cols - 1; j++)
            {
                if (this.weights[0].matrix[i][j] < 0)
                {
                    stroke(255, 0, 0);
                } else
                {
                    stroke(0, 0, 255);
                }
                line(x + nSize, y + (nSize / 2) + (j * (space + nSize)), x + nSize + nSpace, y + hBuff + (nSize / 2) + (i * (space + nSize)));
            }
        }

        lc++;

        for (let a = 1; a < this.hLayers; a++)
        {
            for (let i = 0; i < this.weights[a].rows; i++)
            {  //HIDDEN TO HIDDEN
                for (let j = 0; j < this.weights[a].cols - 1; j++)
                {
                    if (this.weights[a].matrix[i][j] < 0)
                    {
                        stroke(255, 0, 0);
                    } else
                    {
                        stroke(0, 0, 255);
                    }
                    line(x + (lc * nSize) + ((lc - 1) * nSpace), y + hBuff + (nSize / 2) + (j * (space + nSize)), x + (lc * nSize) + (lc * nSpace), y + hBuff + (nSize / 2) + (i * (space + nSize)));
                }
            }
            lc++;
        }

        for (let i = 0; i < this.weights[this.weights.length - 1].rows; i++)
        {  //HIDDEN TO OUTPUT
            for (let j = 0; j < this.weights[this.weights.length - 1].cols - 1; j++)
            {
                if (this.weights[this.weights.length - 1].matrix[i][j] < 0)
                {
                    stroke(255, 0, 0);
                } else
                {
                    stroke(0, 0, 255);
                }
                line(x + (lc * nSize) + ((lc - 1) * nSpace), y + hBuff + (nSize / 2) + (j * (space + nSize)), x + (lc * nSize) + (lc * nSpace), y + oBuff + (nSize / 2) + (i * (space + nSize)));
            }
        }

        fill(0);
        textSize(15);
        textAlign(CENTER, CENTER);
        text("U", x + (lc * nSize) + (lc * nSpace) + nSize / 2, y + oBuff + (nSize / 2));
        text("D", x + (lc * nSize) + (lc * nSpace) + nSize / 2, y + oBuff + space + nSize + (nSize / 2));
        text("L", x + (lc * nSize) + (lc * nSpace) + nSize / 2, y + oBuff + (2 * space) + (2 * nSize) + (nSize / 2));
        text("R", x + (lc * nSize) + (lc * nSpace) + nSize / 2, y + oBuff + (3 * space) + (3 * nSize) + (nSize / 2));
    }
}
