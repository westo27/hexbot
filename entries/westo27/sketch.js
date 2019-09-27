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
        op2 = 80;
        op3 = 20;
        op4 = 10;

        // Initialize rows, columns and set-up arrays
        this.div = 10;

        this.columns = 500;
        this.rows = 500;

        this.preyCountTotal = null;
        this.predCountTotal = null;

        // this.rows = height / div;
        // this.board = new int[columns][rows];
        this.generation = 0;

        this.catchRate = 0.10;


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

                            // if (j%2== 0) board[i][j] = 2;
                            // else board[i][j] = 1;
                board[i][j] = this.predPreyPicker();

                }
            }
        this.board = board;
        }

    predPreyPicker()
    {
        var rtn;
        var r = random(0, 1);
        if (r < 0.10) rtn = 1; //Blue prey5%
        else if (r < 0.11) rtn = 2; //Rered3%
        else rtn = 0; //White empty 94%
        return rtn;
    }

    generate() {
        //Reset prey and pred count from last cycle
        var preyCount = 0;
        var predCount = 0;
        var i,j,x,y;

        var next = [];

        //Loop through board and count the number of cells within the moore neighborhood
        for (x = 0; x < this.columns; x++)
        {
            next[x] = [];
            for (y = 0; y < this.rows; y++)
            {
                // Add up all the states in a 3x3 surrounding grid
                var predNeighbors = 0;
                var preyNeighbors = 0;
                for (i = -1; i <= 1; i++)
                {
                    for (j = -1; j <= 1; j++)
                    {
                        if (this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows] === 1) preyNeighbors++;
                        else if (this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows] === 2) predNeighbors++;
                    }
                }

                //Subtract the cells own state from the neighbor count
                if (this.board[x][y] === 1) preyNeighbors--;
                else if (this.board[x][y] === 2) predNeighbors--;

                // Rules for Prey
                if (this.board[x][y] === 1)
                {
                    if (predNeighbors > 0) next[x][y] = this.eatEscapePicker(); //Eaten
                    else next[x][y] = this.board[x][y]; //Stasis
                }

                // Rules for Predators
                if (this.board[x][y] === 2)
                {
                    if (preyNeighbors >0) next[x][y] = 0; //moving
                    else if (preyNeighbors < 1) next[x][y] = 0; //Starvation
                    else next[x][y] = this.board[x][y]; //Stasis
                }

                // Rules for Space
                if (this.board[x][y] === 0)
                {
                    if (predNeighbors >= 2 && preyNeighbors >= 1) next[x][y] = 2; //Breed pred
                    else if (preyNeighbors >= 2) next[x][y] = 1; //Breed prey
                    else next[x][y] = 0;
                }
            }
        }
        // this.counter();
        this.predCountTotal = this.predCountTotal + predCount;
        this.preyCountTotal = this.preyCountTotal + preyCount;
        //Change board into next in time for the next cycle
        this.board = next;
        this.generation++;
    }

    /** METHOD
     * Decides if a predator successfully catches prey
     *
     * @return prey if hunt failed, predator if hunt succeeded
     */
    eatEscapePicker()
    {
        var rtn;
        var r = Math.random();
        if (r > this.catchRate) rtn = 1;
        else rtn = 2;
        return rtn;
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