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
    createCanvas(600, 600);
    frameRate(10);
    sim = new Sim(op2, op3, op4);//object needs to be called here
}

/** METHOD
 * Continuously draws inside the window
 */
function draw()
{
    sim.generate();
    sim.display();

    console.log(sim.generation);
}

/**
 * Sim Class
 *
 * Bugs: none known
 *
 * @author       Tom Weston
 * @version      4.0
 */

class Sim {

    /**
     * Constructor: Requires a specified Suit and CardValue.
     * @param op2 The value of user input 2, % of board
     * @param op3 The value of user input 3, catch rate
     * @param op4 The value of user input 4, stochastic/deterministic
     */
    constructor(op2, op3, op4) {
        op2 = 10;
        op3 = 20;
        op4 = 10;

        // Initialize rows, columns and set-up arrays
        this.div = 10;

        this.columns = 500;
        this.rows = 500;

        this.preyCount = null;
        this.predCount = null;

        // this.rows = height / div;
        // this.board = new int[columns][rows];
        this.generation = 0;

        this.catchRate = 0.33;


        this.gridFill = op2;
        this.catchRate = op3;
        this.distType = op4;

        //Board, this 2D array fills every position on the board
        this.board = [];

        this.init();
    }

    /** METHOD
     * Set up the board
     */
    init() {
        var i;
        var j;

        var board = [];

        //Loop through board array and call predPreyPicker() on each entity
        for (i = 0; i < this.columns; i++) {
            board[i] = [];
            for (j = 0; j < this.rows; j++) {
                if (j <= this.gridFill) {
                            if (j % 2 == 0) board[i][j] = 2;
                            else board[i][j] = 1;
                    }
                }
            }
        this.board = board;
        }

    predPreyPicker()
    {
        var rtn;
        var r = random(0, 1);
        if (r < 0.50) rtn = 1; //Blue prey5%
        else if (r < 1) rtn = 2; //Rered3%
        else rtn = 0; //White empty 94%
        return rtn;
    }

    generate() {
        this.generation++;
    }

    /** METHOD
     * Display the cells, called by draw() on each cycle
     */
    display()
    {
        var i;
        var j;

        for ( i = 0; i < this.columns; i++)
        {
            for ( j = 0; j < this.rows; j++)
            {
                if ((this.board[i][j] == 2)) fill(127, 0, 0); //Pred
                else if ((this.board[i][j] == 1)) fill(102, 102, 255); //Prey
                else if ((this.board[i][j] == 0)) fill(255); //Blank
                stroke(0);
                var x = i * 30;
                var y = j * 30;
                rect(x, y, 30, 30);
            }
        }
    }
}