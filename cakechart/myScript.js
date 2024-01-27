PALETTE = ["#D25AF3", "#3DA179", "#BB891C", "#8264C7", "#3D9AA0", "#808059", "#E9476A", "#CE4129", "#8D69D0", "#AE7D22", "#5293C4", "#CF298A", "#BF5A5A", "#779F19", "#548461", "#989021"]
//legend limit for dynamic height
const LEGEND_LIMIT = 6;

const degreesToRads = deg => (deg * Math.PI) / 180.0;

//invert the sign to adapt to the inverse y axis of the canvas
const invertYaxis = angle =>360 -angle;

function generateRandomColor() {
    // Generate a random hexadecimal color code
    let color = Math.floor(Math.random()*16777215).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return '#' + color;
}

class Legend {
    #x;
    #y;
    #context;
    #colors;
    #items;

    constructor(ctx, colors, items, elongated=false, x=800, y=50, width=150, height=200){
        this.#x = x;
        this.#y = y;
        this.#context = ctx;
        this.#colors = colors;
        this.#items = items;

        //draw the rectangle border
        this.#context.beginPath();
        if(elongated) this.#context.rect(this.#x, this.#y, width, height*2);
        else this.#context.rect(this.#x, this.#y, width, height);
        this.#context.closePath();
        this.#context.stroke();

        //draw the items
        let item_x = this.#x + 10;
        let item_y = this.#y + 10;
        for (let i = 0; i < this.#colors.length-1; i++) {
            this.insertItem(item_x, item_y, this.#colors[i+1], this.#items[i]); //colors, start from 1 to skip the background color
            item_y += 30;
        }
    }

    insertItem(x, y, color, text, width=20, height=20){
        this.#context.beginPath();
        this.#context.rect(x, y, width, height);
        this.#context.fillStyle = color;
        this.#context.fill();
        this.#context.font = "20px Arial";
        this.#context.fillText(text, x+30, y+20);
        this.#context.closePath();
        this.#context.stroke();
    }
}

class Cake {
    static total_angle = 360;
    #x;
    #y;
    #radius;
    #offset_angle;  //offset angle of the cake
    #last_angle;   //last angle used
    #used_angle;   //remaining angle of the cake
    #context;      //context of the canvas
    #total_data;   //total data (corresponding to 100%)
    #used_colors;  //colors of the slices
    #palette_index;
    #legend;
    
    constructor(x, y, radius, ctx, offset_angle=0, total=100) {
        this.#used_angle = 0;
        this.#offset_angle = offset_angle;
        this.#last_angle = offset_angle;
        this.#x = x;
        this.#y = y;
        this.#radius = radius;
        this.#context = ctx;
        this.#total_data = total;
        this.#used_colors = ["#ffffff"];
        this.#palette_index = 0;
        this.#legend = null;

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

    //get one color from palette
    getPaletteColor(){ 
        let color = PALETTE[this.#palette_index];
        if (this.#palette_index == PALETTE.length-1) return console.log("Palette overflow");
        ++this.#palette_index;
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
        
        this.#last_angle = this.#offset_angle + this.#used_angle;
        if (angle > Cake.total_angle-this.#used_angle){console.log("Overflow usable angle"); return -1;}
        else{
            this.#context.beginPath();

            let end_angle = this.createSliceLine(this.#last_angle);               //start slice line

            let start_angle = this.createSliceLine(this.#last_angle + angle);     //end slice line

            this.#context.arc(this.#x, this.#y, this.#radius, start_angle, end_angle);                               //draw the arc

            //add color to the slice
            this.#used_colors.push(this.getPaletteColor());

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

    createLegend(items){
        if (items.length > LEGEND_LIMIT) this.#legend = new Legend(this.#context, this.#used_colors, items, true);
        else this.#legend = new Legend(this.#context, this.#used_colors, items);
    }
}

//circle coordinates
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let offset_x = 500;
let offset_y = 250;
let radius = 200;

let cake = new Cake(offset_x, offset_y, radius, ctx, 90);

cake.addSlice(50);
cake.addSlice(40);
cake.addSlice(30);
cake.addSlice(60);
cake.addSlice(80);
cake.addSlice(10);
cake.addSlice(45);
cake.addSlice(45);
//cake.addSliceFromData(5);
//cake.addSliceFromData(10);
//cake.addSliceFromData(35);

items = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"];
cake.createLegend(items);