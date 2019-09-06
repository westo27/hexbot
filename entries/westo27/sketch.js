/**
 * This is a Cellular Automata system that attempts to simulate the predator-prey interactions seen in the Lotka-Volterra model.
 * This program was originally created in processing (java) and ported over to p5.js (javascript).
 *
 * Bugs: none known
 *
 * @author       Tom Weston
 * @version      4.0
 * @see also     sim.js
 */

//Global Variables
var op1,op2; //int
var op3; //float
var op4; //string
let sim;

function setup()
{
    createCanvas(500, 500);
    frameRate(10);
    sim = new Sim(op2, op3, op4);//object needs to be called here
}

/** METHOD
 * Continuously draws inside the window
 */
function draw()
{
    background(220);

    sim.generate();
    //sim.display();

    console.log(sim.generation);
}

/**
 * Sim Class
 *
 * Bugs: none known
 *
 * @author       Tom Weston
 * @version      4.0
 * @see also     sketch.js
 */

class Sim {


    /**
     * Constructor: Requires a specified Suit and CardValue.
     * @param op2 The value of user input 2, % of board
     * @param op3 The value of user input 3, catch rate
     * @param op4 The value of user input 4, stochastic/deterministic
     */
    constructor(op2, op3, op4) {
        // Initialize rows, columns and set-up arrays
        this.div = 10;

        this.columns = 500;
        this.rows = 500;

        this.preyCount = null;
        this.predCount = null;

        // this.columns = width / div;
        // this.rows = height / div;
        // this.board = new int[columns][rows];
        this.generation = 0;

        this.gridFill = op2;

        this.catchRate = 0.33;
        this.distType = "";

        this.gridFill = op2;
        this.catchRate = op3;
        this.distType = op4;

        //Board, this 2D array fills every position on the board
        this.board = [this.columns, this.rows];

        this.init();
    }

    /** METHOD
     * Set up the board
     */
    init() {
        var i;
        var j;
        //Loop through board array and call predPreyPicker() on each entity
        for (i = 0; i < this.columns; i++) {
            for (j = 0; j < this.rows; j++) {
                if (j <= this.gridFill) {
                    switch (this.distType) {
                        case "d":
                            if (j % 2 == 0) this.board = 2;
                            else this.board = 1;
                            break;
                        case "s":
                            this.board = predPreyPicker();
                            break;
                    }
                }
            }
        }
    }

    generate() {
        this.generation++;
    }
}