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
var Sim = {}; //object needs to be called here


function setup()
{
    createCanvas(500, 500);
    frameRate(10);
    //Sim object
    sim = new Sim(op2, op3, op4);//object needs to be called here
}

/** METHOD
 * Continuously draws inside the window
 */
function draw()
{
    background(255);

    sim.generate();
    sim.display();

    console.log(sim.generation);
}