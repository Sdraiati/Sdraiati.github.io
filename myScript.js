const degreesToRads = deg => (deg * Math.PI) / 180.0;

//inverte il segno per adattarsi all'asse y inverso del canvas
const invertYaxis = angle => -angle;

class Cake {
    static total_angle = 360;
    #x;
    #y;
    #radius;
    #remaining_angle;   //remaining angle of the cake
    #context;           //context of the canvas
    #total_data;        //total data (corresponding to 100%)
    
    constructor(x, y, radius, ctx, total, remaining_angle=360) {
        this.#remaining_angle = remaining_angle;
        this.#x = x;
        this.#y = y;
        this.#radius = radius;
        this.#context = ctx;
        this.#total_data = total;

        this.#context.beginPath();
        this.#context.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI);
    }

    getTotalData(){ return this.#total_data; }

    setTotalData(total){ this.#total_data = total; }

    //property to create the line of the slice
    //angle is relative to x axis
    createSliceLine(angle) {
        let inv_angle = invertYaxis(angle);
        let rad_angle = degreesToRads(inv_angle);

        this.#context.moveTo(this.#x, this.#y);

        let x_dest = this.#x + this.#radius * Math.cos(rad_angle);
        let y_dest = this.#y + this.#radius * Math.sin(rad_angle);

        ctx.lineTo(x_dest, y_dest);
    }

    //property to add the slice
    //angle is the angle of the slice
    addSlice(angle) {
        //if it's the first slice, we create the horizontal line
        if (this.#remaining_angle == 360) this.createSliceLine(0);
        
        if (angle > this.#remaining_angle) return -1;
        else{
            this.createSliceLine(Cake.total_angle-this.#remaining_angle + angle);
            this.#remaining_angle -= angle;
            return 0;
        }
    }

    draw(){ this.#context.stroke(); }

    //add a slice from a certain amount of data
    addSliceFromData(data){
        let angle = (data/this.#total_data)*360;
        return this.addSlice(angle);
    }
}

/*
import { degreesToRads } from "./Cake";
import { invertYaxis } from "./Cake";
import { Cake } from "./Cake";
*/

/*
function createCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
}
//funzione per creare le linee dello slice
function createSliceLine(ctx, x_circle, y_circle, radius, angle) {
    inv_angle = invertYaxis(angle);
    rad_angle = degreesToRads(inv_angle);
    ctx.moveTo(x_circle, y_circle);
    x_dest = x_circle + radius * Math.cos(rad_angle);
    y_dest = y_circle + radius * Math.sin(rad_angle);
    ctx.lineTo(x_dest, y_dest);
}

//x_prev e y_prev sono le coordinate del punto più a destra sulla circonferenza della slice precedente
function createSlice(ctx, x_circle, y_circle, radius, x_prev, y_prev, angle) {
    createSliceLine(ctx, x_circle, y_circle, radius, 0, 0);
    createSliceLine(ctx, x_circle, y_circle, radius, angle, x_prev, y_prev);
    prev_angle = angle; angle = -90;
    createSliceLine(ctx, x_circle, y_circle, radius, prev_angle+angle, x_prev, y_prev);
}
*/

//circle coordinates
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let offset_x = 500;
let offset_y = 250;
let radius = 200;
/*
//TO REMOVE
x_prev = offset_x+radius; y_prev = offset_y;

createCircle(ctx, offset_x, offset_y, radius);
createSlice(ctx, offset_x, offset_y, radius, x_prev, y_prev, -45);
ctx.stroke();
*/
//PREV 27/12
let cake = new Cake(offset_x, offset_y, radius, ctx, 2000);
/*
cake.draw();
cake.addSlice(45);
cake.draw();
cake.addSlice(45);
cake.draw();
cake.addSlice(180);
cake.draw();
cake.addSlice(20);
cake.draw();
*/
cake.addSliceFromData(1000);
cake.addSliceFromData(50)
cake.addSliceFromData(100)
cake.draw();