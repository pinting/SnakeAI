/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Button.ts":
/*!***********************!*\
  !*** ./src/Button.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Button = /** @class */ (function () {
    function Button(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
    }
    Button.prototype.collide = function (x, y) {
        return x >= this.x - this.w / 2 &&
            x <= this.x + this.w / 2 &&
            y >= this.y - this.h / 2 &&
            y <= this.y + this.h / 2;
    };
    Button.prototype.show = function () {
        fill(255);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        textSize(22);
        textAlign(CENTER, CENTER);
        fill(0);
        noStroke();
        text(this.text, this.x, this.y - 3);
    };
    return Button;
}());
exports.Button = Button;


/***/ }),

/***/ "./src/Food.ts":
/*!*********************!*\
  !*** ./src/Food.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Food = /** @class */ (function () {
    function Food() {
        var x = Math.floor(random(0, SIZE));
        var y = Math.floor(random(0, SIZE));
        this.position = createVector(x, y);
    }
    Food.prototype.show = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        stroke(0);
        fill(255, 0, 0);
        rect(x + this.position.x * DPC, y + this.position.y * DPC, DPC, DPC);
    };
    Food.prototype.clone = function () {
        var clone = new Food();
        clone.position.x = this.position.x;
        clone.position.y = this.position.y;
        return clone;
    };
    return Food;
}());
exports.Food = Food;


/***/ }),

/***/ "./src/Matrix.ts":
/*!***********************!*\
  !*** ./src/Matrix.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
    function Matrix(r, c) {
        this.rows = r;
        this.cols = c;
        this.matrix = [];
        for (var y = 0; y < r; y++) {
            this.matrix[y] = [];
        }
    }
    Matrix.FromMatrix = function (other) {
        var matrix = new Matrix(0, 0);
        matrix.matrix = other;
        matrix.rows = other.length;
        matrix.cols = other[0].length;
        return matrix;
    };
    Matrix.prototype.dot = function (other) {
        var result = new Matrix(this.rows, other.cols);
        if (this.cols == other.rows) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < other.cols; j++) {
                    var sum = 0;
                    for (var k = 0; k < this.cols; k++) {
                        sum += this.matrix[i][k] * other.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
        }
        else {
            console.warn("Matrix: this.cols not equals other.rows in dot function");
        }
        return result;
    };
    Matrix.prototype.randomize = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] = random(-1, 1);
            }
        }
    };
    Matrix.singleColumnMatrixFromArray = function (array) {
        var n = new Matrix(array.length, 1);
        for (var i = 0; i < array.length; i++) {
            n.matrix[i][0] = array[i];
        }
        return n;
    };
    Matrix.prototype.toArray = function () {
        var array = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                array[j + i * this.cols] = this.matrix[i][j];
            }
        }
        return array;
    };
    Matrix.prototype.addBias = function () {
        var n = new Matrix(this.rows + 1, 1);
        for (var i = 0; i < this.rows; i++) {
            n.matrix[i][0] = this.matrix[i][0];
        }
        n.matrix[this.rows][0] = 1;
        return n;
    };
    Matrix.prototype.activate = function () {
        var n = new Matrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                n.matrix[i][j] = this.relu(this.matrix[i][j]);
            }
        }
        return n;
    };
    Matrix.prototype.relu = function (x) {
        return max(0, x);
    };
    Matrix.prototype.mutate = function (mutationRate) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var rand = random(0, 1);
                if (rand < mutationRate) {
                    this.matrix[i][j] += randomGaussian(0, 1) / 5;
                    if (this.matrix[i][j] > 1) {
                        this.matrix[i][j] = 1;
                    }
                    if (this.matrix[i][j] < -1) {
                        this.matrix[i][j] = -1;
                    }
                }
            }
        }
    };
    Matrix.prototype.crossover = function (other) {
        var child = new Matrix(this.rows, this.cols);
        var randC = Math.floor(random(this.cols));
        var randR = Math.floor(random(this.rows));
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if ((i < randR) || (i == randR && j <= randC)) {
                    child.matrix[i][j] = this.matrix[i][j];
                }
                else {
                    child.matrix[i][j] = other.matrix[i][j];
                }
            }
        }
        return child;
    };
    Matrix.prototype.clone = function () {
        var clone = new Matrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                clone.matrix[i][j] = this.matrix[i][j];
            }
        }
        return clone;
    };
    return Matrix;
}());
exports.Matrix = Matrix;


/***/ }),

/***/ "./src/NeuralNet.ts":
/*!**************************!*\
  !*** ./src/NeuralNet.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(/*! ./Matrix */ "./src/Matrix.ts");
var NeuralNet = /** @class */ (function () {
    function NeuralNet(input, hidden, output, hiddenLayers) {
        this.iNodes = input;
        this.hNodes = hidden;
        this.oNodes = output;
        this.hLayers = hiddenLayers;
        this.weights = [];
        this.weights.push(new Matrix_1.Matrix(this.hNodes, this.iNodes + 1));
        for (var i = 1; i < this.hLayers; i++) {
            this.weights.push(new Matrix_1.Matrix(this.hNodes, this.hNodes + 1));
        }
        this.weights.push(new Matrix_1.Matrix(this.oNodes, this.hNodes + 1));
        for (var _i = 0, _a = this.weights; _i < _a.length; _i++) {
            var w = _a[_i];
            w.randomize();
        }
    }
    NeuralNet.prototype.mutate = function (mr) {
        for (var _i = 0, _a = this.weights; _i < _a.length; _i++) {
            var w = _a[_i];
            w.mutate(mr);
        }
    };
    NeuralNet.prototype.output = function (inputsArr) {
        var inputs = Matrix_1.Matrix.singleColumnMatrixFromArray(inputsArr);
        var curr_bias = inputs.addBias();
        for (var i = 0; i < this.hLayers; i++) {
            var hidden_ip = this.weights[i].dot(curr_bias);
            var hidden_op = hidden_ip.activate();
            curr_bias = hidden_op.addBias();
        }
        var output_ip = this.weights[this.weights.length - 1].dot(curr_bias);
        var output = output_ip.activate();
        return output.toArray();
    };
    NeuralNet.prototype.crossover = function (partner) {
        var child = new NeuralNet(this.iNodes, this.hNodes, this.oNodes, this.hLayers);
        for (var i = 0; i < this.weights.length; i++) {
            child.weights[i] = this.weights[i].crossover(partner.weights[i]);
        }
        return child;
    };
    NeuralNet.prototype.clone = function () {
        var clone = new NeuralNet(this.iNodes, this.hNodes, this.oNodes, this.hLayers);
        for (var i = 0; i < this.weights.length; i++) {
            clone.weights[i] = this.weights[i].clone();
        }
        return clone;
    };
    NeuralNet.prototype.load = function (weights) {
        for (var i = 0; i < this.weights.length; i++) {
            this.weights[i] = weights[i];
        }
    };
    NeuralNet.prototype.pull = function () {
        var model = [];
        for (var _i = 0, _a = this.weights; _i < _a.length; _i++) {
            var w = _a[_i];
            model.push(w.clone());
        }
        return model;
    };
    NeuralNet.prototype.show = function (x, y, w, h, vision, decision) {
        var space = 5;
        var nSize = (h - (space * (this.iNodes - 2))) / this.iNodes;
        var nSpace = (w - (this.weights.length * nSize)) / this.weights.length;
        var hBuff = (h - (space * (this.hNodes - 1)) - (nSize * this.hNodes)) / 2;
        var oBuff = (h - (space * (this.oNodes - 1)) - (nSize * this.oNodes)) / 2;
        var maxIndex = 0;
        for (var i = 1; i < decision.length; i++) {
            if (decision[i] > decision[maxIndex]) {
                maxIndex = i;
            }
        }
        var layer = 0;
        // DRAW NODES
        // Draw inputs
        for (var i = 0; i < this.iNodes; i++) {
            if (vision[i] != 0) {
                fill(0, 255, 0);
            }
            else {
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
        layer++;
        // Draw hidden
        for (var a = 0; a < this.hLayers; a++) {
            for (var i = 0; i < this.hNodes; i++) {
                fill(255);
                stroke(0);
                ellipseMode(CORNER);
                ellipse(x + (layer * nSize) + (layer * nSpace), y + hBuff + (i * (nSize + space)), nSize, nSize);
            }
            layer++;
        }
        // Draw outputs
        for (var i = 0; i < this.oNodes; i++) {
            if (i == maxIndex) {
                fill(0, 255, 0);
            }
            else {
                fill(255);
            }
            stroke(0);
            ellipseMode(CORNER);
            ellipse(x + (layer * nSpace) + (layer * nSize), y + oBuff + (i * (nSize + space)), nSize, nSize);
        }
        layer = 1;
        // DRAW WEIGHTS
        // Input to hidden
        for (var i = 0; i < this.weights[0].rows; i++) {
            for (var j = 0; j < this.weights[0].cols - 1; j++) {
                if (this.weights[0].matrix[i][j] < 0) {
                    stroke(255, 0, 0);
                }
                else {
                    stroke(0, 0, 255);
                }
                line(x + nSize, y + (nSize / 2) + (j * (space + nSize)), x + nSize + nSpace, y + hBuff + (nSize / 2) + (i * (space + nSize)));
            }
        }
        layer++;
        // Hidden to hidden
        for (var a = 1; a < this.hLayers; a++) {
            for (var i = 0; i < this.weights[a].rows; i++) {
                for (var j = 0; j < this.weights[a].cols - 1; j++) {
                    if (this.weights[a].matrix[i][j] < 0) {
                        stroke(255, 0, 0);
                    }
                    else {
                        stroke(0, 0, 255);
                    }
                    line(x + (layer * nSize) + ((layer - 1) * nSpace), y + hBuff + (nSize / 2) + (j * (space + nSize)), x + (layer * nSize) + (layer * nSpace), y + hBuff + (nSize / 2) + (i * (space + nSize)));
                }
            }
            layer++;
        }
        // Hidden to output
        for (var i = 0; i < this.weights[this.weights.length - 1].rows; i++) {
            for (var j = 0; j < this.weights[this.weights.length - 1].cols - 1; j++) {
                if (this.weights[this.weights.length - 1].matrix[i][j] < 0) {
                    stroke(255, 0, 0);
                }
                else {
                    stroke(0, 0, 255);
                }
                line(x + (layer * nSize) + ((layer - 1) * nSpace), y + hBuff + (nSize / 2) + (j * (space + nSize)), x + (layer * nSize) + (layer * nSpace), y + oBuff + (nSize / 2) + (i * (space + nSize)));
            }
        }
        fill(0);
        textSize(15);
        textAlign(CENTER, CENTER);
        text("U", x + (layer * nSize) + (layer * nSpace) + nSize / 2, y + oBuff + (nSize / 2));
        text("D", x + (layer * nSize) + (layer * nSpace) + nSize / 2, y + oBuff + space + nSize + (nSize / 2));
        text("L", x + (layer * nSize) + (layer * nSpace) + nSize / 2, y + oBuff + (2 * space) + (2 * nSize) + (nSize / 2));
        text("R", x + (layer * nSize) + (layer * nSpace) + nSize / 2, y + oBuff + (3 * space) + (3 * nSize) + (nSize / 2));
    };
    return NeuralNet;
}());
exports.NeuralNet = NeuralNet;


/***/ }),

/***/ "./src/Population.ts":
/*!***************************!*\
  !*** ./src/Population.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Snake_1 = __webpack_require__(/*! ./Snake */ "./src/Snake.ts");
var Population = /** @class */ (function () {
    function Population(size) {
        this.bestSnakeScore = 0;
        this.gen = 0;
        this.samebest = 0;
        this.bestFitness = 0;
        this.fitnessSum = 0;
        this.snakes = [];
        for (var i = 0; i < size; i++) {
            this.snakes[i] = new Snake_1.Snake();
        }
        this.bestSnake = this.snakes[0].clone();
        this.bestSnake.replay = true;
    }
    /**
     * Check if all the snakes in the population are dead.
     */
    Population.prototype.done = function () {
        for (var i = 0; i < this.snakes.length; i++) {
            if (!this.snakes[i].dead)
                return false;
        }
        if (!this.bestSnake.dead) {
            return false;
        }
        return true;
    };
    /**
     * Update all the snakes in the generation.
     */
    Population.prototype.update = function () {
        // If the best snake is not dead update it, this snake is a replay of the best from the past generation
        if (!this.bestSnake.dead) {
            this.bestSnake.look();
            this.bestSnake.think();
            this.bestSnake.move();
        }
        for (var i = 0; i < this.snakes.length; i++) {
            if (!this.snakes[i].dead) {
                this.snakes[i].look();
                this.snakes[i].think();
                this.snakes[i].move();
            }
        }
    };
    /**
     * Show either the best snake or all the snakes.
     */
    Population.prototype.show = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        // Show the brain of the best snake
        if (replayBest) {
            this.bestSnake.show(x + 400, y);
            this.bestSnake.brain.show(x, y, 360, 790, this.bestSnake.vision, this.bestSnake.decision);
        }
        else {
            for (var i = 0; i < this.snakes.length; i++) {
                this.snakes[i].show(x, y);
            }
        }
    };
    /**
     * Set the best snake of the generation.
     */
    Population.prototype.setBestSnake = function () {
        var max = 0;
        var maxIndex = 0;
        for (var i = 0; i < this.snakes.length; i++) {
            if (this.snakes[i].fitness > max) {
                max = this.snakes[i].fitness;
                maxIndex = i;
            }
        }
        if (max > this.bestFitness) {
            this.bestFitness = max;
            this.bestSnake = this.snakes[maxIndex].cloneForReplay();
            this.bestSnakeScore = this.snakes[maxIndex].score;
        }
        else {
            this.bestSnake = this.bestSnake.cloneForReplay();
        }
    };
    // Selects a random number in range of the fitnesssum and if a snake falls in that range then select it.
    Population.prototype.selectParent = function () {
        var rand = random(this.fitnessSum);
        var summation = 0;
        for (var i = 0; i < this.snakes.length; i++) {
            summation += this.snakes[i].fitness;
            if (summation > rand) {
                return this.snakes[i];
            }
        }
        return this.snakes[0];
    };
    Population.prototype.naturalSelection = function () {
        var newSnakes = [];
        this.setBestSnake();
        this.calculateFitnessSum();
        // Add the best snake of the prior generation into the new generation
        newSnakes[0] = this.bestSnake.clone();
        for (var i = 1; i < this.snakes.length; i++) {
            var child = this.selectParent().crossover(this.selectParent());
            child.mutate();
            newSnakes[i] = child;
        }
        this.snakes = [];
        for (var _i = 0, newSnakes_1 = newSnakes; _i < newSnakes_1.length; _i++) {
            var s = newSnakes_1[_i];
            this.snakes.push(s.clone());
        }
        this.gen += 1;
    };
    Population.prototype.mutate = function () {
        // Start from 1 as to not override the best snake placed in index 0
        for (var i = 1; i < this.snakes.length; i++) {
            this.snakes[i].mutate();
        }
    };
    /**
     * Calculate the fitnesses for each snake.
     */
    Population.prototype.calculateFitness = function () {
        for (var i = 0; i < this.snakes.length; i++) {
            this.snakes[i].calculateFitness();
        }
    };
    // Calculate the sum of all the snakes fitnesses.
    Population.prototype.calculateFitnessSum = function () {
        this.fitnessSum = 0;
        for (var i = 0; i < this.snakes.length; i++) {
            this.fitnessSum += this.snakes[i].fitness;
        }
    };
    return Population;
}());
exports.Population = Population;


/***/ }),

/***/ "./src/Snake.ts":
/*!**********************!*\
  !*** ./src/Snake.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Food_1 = __webpack_require__(/*! ./Food */ "./src/Food.ts");
var NeuralNet_1 = __webpack_require__(/*! ./NeuralNet */ "./src/NeuralNet.ts");
var Snake = /** @class */ (function () {
    function Snake(layers) {
        if (layers === void 0) { layers = null; }
        this.score = 1;
        this.lifeLeft = 200; // Mount of moves the snake can make before it dies
        this.lifetime = 0;
        this.direction = createVector(0, 0); // Amount of time the snake has been alive
        this.currentFoodIndex = 0; // Index to run through the foodlist (used for replay)
        this.fitness = 0;
        this.dead = false;
        this.replay = false; // If this snake is a replay of best snake
        if (layers == null) {
            layers = HIDDEN_LARYERS;
        }
        this.head = createVector(SIZE / 2, SIZE / 2);
        this.food = new Food_1.Food();
        this.body = [];
        if (!humanPlaying) {
            this.vision = new Array(24);
            this.decision = new Array(4);
            this.foodList = [this.food.clone()];
            this.brain = new NeuralNet_1.NeuralNet(24, HIDDEN_NODES, 4, layers);
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
    Snake.FromFoods = function (foods) {
        var snake = new Snake();
        snake.replay = true;
        snake.vision = new Array(24);
        snake.decision = new Array(4);
        snake.body = [];
        snake.foodList = [];
        // Clone all the food positions in the foodlist
        for (var _i = 0, foods_1 = foods; _i < foods_1.length; _i++) {
            var f = foods_1[_i];
            snake.foodList.push(f.clone());
        }
        snake.food = snake.foodList[snake.currentFoodIndex++];
        snake.head = createVector(SIZE / 2, SIZE / 2);
        snake.body.push(createVector(SIZE / 2, (SIZE / 2) + 1));
        snake.body.push(createVector(SIZE / 2, (SIZE / 2) + 2));
        snake.score += 2;
        return snake;
    };
    /**
     * Check if a position collides with the snakes body.
     * @param x
     * @param y
     */
    Snake.prototype.bodyCollide = function (x, y) {
        for (var i = 0; i < this.body.length; i++) {
            if (x == this.body[i].x && y == this.body[i].y) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if a position collides with the food.
     * @param x
     * @param y
     */
    Snake.prototype.foodCollide = function (x, y) {
        return x == this.food.position.x && y == this.food.position.y;
    };
    /**
     * Check if a position collides with the wall.
     * @param x
     * @param y
     */
    Snake.prototype.wallCollide = function (x, y) {
        return x >= SIZE || x < 0 || y >= SIZE || y < 0;
    };
    Snake.prototype.show = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        fill(100);
        rect(x, y, SIZE * DPC, SIZE * DPC);
        this.food.show(x, y);
        fill(255);
        stroke(0);
        for (var i = 0; i < this.body.length; i++) {
            rect(x + this.body[i].x * DPC, y + this.body[i].y * DPC, DPC, DPC);
        }
        if (this.dead) {
            fill(150);
        }
        else {
            fill(255);
        }
        rect(x + this.head.x * DPC, y + this.head.y * DPC, DPC, DPC);
    };
    /**
     * Move the snake.
     */
    Snake.prototype.move = function () {
        if (this.dead) {
            return;
        }
        if (!humanPlaying && !modelLoaded) {
            this.lifetime++;
            this.lifeLeft--;
        }
        if (this.foodCollide(this.head.x, this.head.y)) {
            this.eat();
        }
        this.shiftBody();
        if (this.wallCollide(this.head.x, this.head.y)) {
            this.dead = true;
        }
        else if (this.bodyCollide(this.head.x, this.head.y)) {
            this.dead = true;
        }
        else if (this.lifeLeft <= 0 && !humanPlaying) {
            this.dead = true;
        }
    };
    /**
     * Eat food.
     */
    Snake.prototype.eat = function () {
        var last = this.body.length - 1;
        this.score++;
        if (!humanPlaying && !modelLoaded) {
            if (this.lifeLeft < 500) {
                if (this.lifeLeft > 400) {
                    this.lifeLeft = 500;
                }
                else {
                    this.lifeLeft += 100;
                }
            }
        }
        if (last >= 0) {
            this.body.push(createVector(this.body[last].x, this.body[last].y));
        }
        else {
            this.body.push(createVector(this.head.x, this.head.y));
        }
        if (!this.replay) {
            this.food = new Food_1.Food();
            while (this.bodyCollide(this.food.position.x, this.food.position.y)) {
                this.food = new Food_1.Food();
            }
            if (!humanPlaying) {
                this.foodList.push(this.food);
            }
        }
        else {
            // If the snake is a replay, then we don't want to create new random foods, 
            // we want to see the positions the best snake had to collect
            this.food = this.foodList[this.currentFoodIndex++];
        }
    };
    /**
     * Shift the body to follow the head.
     */
    Snake.prototype.shiftBody = function () {
        var prevX = this.head.x;
        var prevY = this.head.y;
        this.head.x += this.direction.x;
        this.head.y += this.direction.y;
        for (var i = 0; i < this.body.length; i++) {
            var x = prevX;
            var y = prevY;
            prevX = this.body[i].x;
            prevY = this.body[i].y;
            this.body[i].x = x;
            this.body[i].y = y;
        }
    };
    /**
     * Clone a version of the snake that will be used for a replay.
     */
    Snake.prototype.cloneForReplay = function () {
        var clone = Snake.FromFoods(this.foodList);
        clone.brain = this.brain.clone();
        return clone;
    };
    /**
     * Clone the snake.
     */
    Snake.prototype.clone = function () {
        var clone = new Snake(HIDDEN_LARYERS);
        clone.brain = this.brain.clone();
        return clone;
    };
    /**
     * Crossover the snake with another snake.
     * @param parent
     */
    Snake.prototype.crossover = function (parent) {
        var child = new Snake(HIDDEN_LARYERS);
        child.brain = this.brain.crossover(parent.brain);
        return child;
    };
    /**
     * Mutate the snakes brain.
     */
    Snake.prototype.mutate = function () {
        this.brain.mutate(mutationRate);
    };
    /**
     * Calculate the fitness of the snake.
     */
    Snake.prototype.calculateFitness = function () {
        if (this.score < 10) {
            this.fitness = floor(this.lifetime * this.lifetime) * pow(2, this.score);
        }
        else {
            this.fitness = floor(this.lifetime * this.lifetime);
            this.fitness *= pow(2, 10);
            this.fitness *= (this.score - 9);
        }
    };
    /**
     * Look in all 8 directions and check for food, body and wall.
     */
    Snake.prototype.look = function () {
        this.vision = [];
        var temp = this.lookInDirection(createVector(-1, 0));
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
    };
    /**
     * Look in a direction and check for food, body and wall.
     * @param direction
     */
    Snake.prototype.lookInDirection = function (direction) {
        var look = new Array(3).fill(0);
        var position = createVector(this.head.x, this.head.y);
        var distance = 0;
        var foodFound = false;
        var bodyFound = false;
        position.add(direction);
        distance += 1;
        while (!this.wallCollide(position.x, position.y)) {
            if (!foodFound && this.foodCollide(position.x, position.y)) {
                foodFound = true;
                look[0] = 1;
            }
            if (!bodyFound && this.bodyCollide(position.x, position.y)) {
                bodyFound = true;
                look[1] = 1;
            }
            if (this.replay && seeVision) {
                stroke(0, 255, 0);
                point(position.x, position.y);
                if (foodFound) {
                    noStroke();
                    fill(255, 255, 51);
                    ellipseMode(CENTER);
                    ellipse(position.x, position.y, 5, 5);
                }
                if (bodyFound) {
                    noStroke();
                    fill(102, 0, 102);
                    ellipseMode(CENTER);
                    ellipse(position.x, position.y, 5, 5);
                }
            }
            position.add(direction);
            distance += 1;
        }
        if (this.replay && seeVision) {
            noStroke();
            fill(0, 255, 0);
            ellipseMode(CENTER);
            ellipse(position.x, position.y, 5, 5);
        }
        look[2] = 1 / distance;
        return look;
    };
    /**
     * Think about what direction to move.
     */
    Snake.prototype.think = function () {
        this.decision = this.brain.output(this.vision);
        var maxIndex = 0;
        var max = 0;
        for (var i = 0; i < this.decision.length; i++) {
            if (this.decision[i] > max) {
                max = this.decision[i];
                maxIndex = i;
            }
        }
        switch (maxIndex) {
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
    };
    Snake.prototype.moveUp = function () {
        if (this.direction.y != 1) {
            this.direction.x = 0;
            this.direction.y = -1;
        }
    };
    Snake.prototype.moveDown = function () {
        if (this.direction.y != -1) {
            this.direction.x = 0;
            this.direction.y = 1;
        }
    };
    Snake.prototype.moveLeft = function () {
        if (this.direction.x != 1) {
            this.direction.x = -1;
            this.direction.y = 0;
        }
    };
    Snake.prototype.moveRight = function () {
        if (this.direction.x != -1) {
            this.direction.x = 1;
            this.direction.y = 0;
        }
    };
    return Snake;
}());
exports.Snake = Snake;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./global.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(/*! ./Button */ "./src/Button.ts");
var Snake_1 = __webpack_require__(/*! ./Snake */ "./src/Snake.ts");
var Population_1 = __webpack_require__(/*! ./Population */ "./src/Population.ts");
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
var increaseMutationBtn;
var decreaseMutationBtn;
var snake;
var model;
var population;
window.setup = function () {
    createCanvas(1280, 800);
    increaseMutationBtn = new Button_1.Button(320, 125, 20, 20, "+");
    decreaseMutationBtn = new Button_1.Button(345, 125, 20, 20, "-");
    frameRate(FPS);
    if (humanPlaying) {
        snake = new Snake_1.Snake();
    }
    else {
        population = new Population_1.Population(2000); // Adjust size of population
    }
};
window.draw = function () {
    background(0);
    noFill();
    stroke(255);
    rectMode(CORNER);
    if (humanPlaying) {
        snake.move();
        snake.show();
        fill(150);
        textSize(20);
        text("SCORE : " + snake.score, 500, 50);
        if (snake.dead) {
            snake = new Snake_1.Snake();
        }
    }
    else {
        if (!modelLoaded) {
            if (population.done()) {
                highscore = population.bestSnake.score;
                population.calculateFitness();
                population.naturalSelection();
            }
            else {
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
        else {
            model.look();
            model.think();
            model.move();
            model.show(400, 0);
            model.brain.show(0, 0, 360, 790, model.vision, model.decision);
            if (model.dead) {
                var newmodel = new Snake_1.Snake();
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
};
window.mousePressed = function () {
    if (increaseMutationBtn.collide(mouseX, mouseY)) {
        mutationRate *= 2;
        defaultMutation = mutationRate;
    }
    if (decreaseMutationBtn.collide(mouseX, mouseY)) {
        mutationRate /= 2;
        defaultMutation = mutationRate;
    }
};
window.keyPressed = function () {
    if (humanPlaying) {
        switch (keyCode) {
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
};


/***/ })

/******/ });
//# sourceMappingURL=index.js.map