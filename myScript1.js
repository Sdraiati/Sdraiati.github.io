const degreesToRads = deg => (deg * Math.PI) / 180.0;

//inverte il segno per adattarsi all'asse y inverso del canvas
const invertYaxis = angle => 360-angle;

function generateRandomColor() {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function createSliceLine(ctx, angle) {
    let inv_angle = invertYaxis(angle);
    let rad_angle = degreesToRads(inv_angle);

    ctx.moveTo(offset_x, offset_y);

    let x_dest = offset_x + radius * Math.cos(rad_angle);
    let y_dest = offset_y + radius * Math.sin(rad_angle);

    ctx.lineTo(x_dest, y_dest);
}

//circle coordinates
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var offset_x = 500;
var offset_y = 250;
var radius = 200;

ctx.beginPath();

createSliceLine(ctx, 0);           //start slice line
createSliceLine(ctx, 90);     //end slice line
ctx.arc(offset_x, offset_y, radius, degreesToRads(270), degreesToRads(360));         //draw the arc

ctx.fillStyle = generateRandomColor();
ctx.fill();
ctx.closePath();

ctx.beginPath();

createSliceLine(ctx, 90);           //start slice line
createSliceLine(ctx, 360);     //end slice line
ctx.arc(offset_x, offset_y, radius, degreesToRads(0), degreesToRads(270));         //draw the arc

ctx.fillStyle = generateRandomColor();
ctx.fill();
ctx.closePath();

ctx.stroke();