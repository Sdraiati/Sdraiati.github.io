const degreesToRads = deg => (deg * Math.PI) / 180.0;

//inverte il segno per adattarsi all'asse y inverso del canvas
const invertYaxis = angle => -angle;

function generateRandomColor() {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

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
        if (angle > this.#remaining_angle) return -1;
        else{
            this.createSliceLine(Cake.total_angle-this.#remaining_angle);           //start slice line

            this.#context.fillStyle = generateRandomColor();
            this.#context.fill();
            this.#context.closePath();
            this.#context.beginPath();

            this.createSliceLine(Cake.total_angle-this.#remaining_angle + angle);   //end slice line

            //this.#context.fillStyle = generateRandomColor();
            //this.#context.fill();
            //this.#context.closePath();
            //this.#context.beginPath();

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

//circle coordinates
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let offset_x = 500;
let offset_y = 250;
let radius = 200;

let cake = new Cake(offset_x, offset_y, radius, ctx, 2000);

/*
ctx.arc(offset_x, offset_y, radius, 0, degreesToRads(45));
ctx.fill();
ctx.stroke();
*/

cake.addSliceFromData(1000);
//cake.addSliceFromData(50)
//cake.addSliceFromData(100)
cake.draw();