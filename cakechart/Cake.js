export const degreesToRads = deg => (deg * Math.PI) / 180.0;

//inverte il segno per adattarsi all'asse y inverso del canvas
export const invertYaxis = angle => -angle;

export class Cake {
    static total_angle = 360;
    #x;
    #y;
    #radius;
    #remaining_angle; //remaining angle of the cake
    #context; //context of the canvas
    
    constructor(x, y, radius, ctx, remaining_angle=360) {
        this.#remaining_angle = remaining_angle;
        this.#x = x;
        this.#y = y;
        this.#radius = radius;
        this.#context = ctx;

        this.#context.beginPath();
        this.#context.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI);
    }

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
            this.createSliceLine(Cake.total_angle-this.#remaining_angle + angle);
            this.#remaining_angle -= angle;
            return 0;
        }
    }

    draw(){ this.#context.stroke(); }
}