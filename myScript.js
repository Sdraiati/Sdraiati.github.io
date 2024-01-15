const degreesToRads = deg => (deg * Math.PI) / 180.0;

//inverte il segno per adattarsi all'asse y inverso del canvas
const invertYaxis = angle =>360 -angle;

function generateRandomColor() {
    // Generate a random hexadecimal color code
    let color = Math.floor(Math.random()*16777215).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return '#' + color;
}

class Cake {
    static total_angle = 360;
    #x;
    #y;
    #radius;
    #used_angle;   //remaining angle of the cake
    #context;           //context of the canvas
    #total_data;        //total data (corresponding to 100%)
    #used_colors;            //colors of the slices
    
    constructor(x, y, radius, ctx, total=100, used_angle=0) {
        this.#used_angle = used_angle;
        this.#x = x;
        this.#y = y;
        this.#radius = radius;
        this.#context = ctx;
        this.#total_data = total;
        this.#used_colors = ["#ffffff"];

        this.#context.beginPath();
        this.#context.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI);
        //color of the cake
        this.#context.fillStyle = this.#used_colors[0];
        this.#context.fill();
    }

    getTotalData(){ return this.#total_data; }

    setTotalData(total){ this.#total_data = total; }

    getUsedColors(){ return this.#used_colors; }

    //return a color code which is not used
    getColor() {
        let color;
        do {
            color = generateRandomColor();
        } while (this.#used_colors.includes(color));
        
        return color;
    }

    //property to create the line of the slice
    //angle is relative to x axis
    createSliceLine(angle) {
        let inv_angle = invertYaxis(angle);
        let rad_angle = degreesToRads(inv_angle);

        this.#context.moveTo(this.#x, this.#y);

        let x_dest = this.#x + this.#radius * Math.cos(rad_angle);
        let y_dest = this.#y + this.#radius * Math.sin(rad_angle);

        this.#context.lineTo(x_dest, y_dest);
        return rad_angle;
    }

    //property to add the slice
    //angle is the angle of the slice
    addSlice(angle) {
        this.#context.closePath();
        this.#context.stroke();

        if (angle > Cake.total_angle-this.#used_angle){console.log("Overflow usable angle"); return -1;}
        else{
            this.#context.beginPath();

            let end_angle = this.createSliceLine(this.#used_angle);           //start slice line

            let start_angle = this.createSliceLine(this.#used_angle + angle);     //end slice line

            this.#context.arc(this.#x, this.#y, this.#radius, start_angle, end_angle);                               //draw the arc

            //add color to the slice
            this.#used_colors.push(this.getColor());

            this.#context.fillStyle = this.#used_colors[this.#used_colors.length-1];
            this.#context.fill();

            this.#context.closePath();
            this.#context.stroke();

            this.#used_angle += angle;
            return 0;
        }
    }

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

cake.addSliceFromData(1000);
cake.addSliceFromData(50)
cake.addSliceFromData(100)