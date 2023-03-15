
let radius = 150;
let time = 0;
let dt = 0.01;
let wave = [];


let x = 0;
let y = 0;
function setup() {
    createCanvas(2000, 1000);
}

function draw() {
    background(0);
    translate(200, 400);
    stroke(255);
    noFill();
    ellipse(0, 0, 2 * radius); // Main Circle

    x = radius * cos(time);
    y = radius * sin(time);
    wave.unshift(y); 

    fill(255);
    ellipse(x, y, 10);
    line(0, 0, x, y);


    translate(500, 0);
    line(x - 500, y, 0, wave[0]);
    beginShape();
    noFill();
    for(let i = 0; i < wave.length; i++)
        vertex(i, wave[i])
    endShape();
    
    time -= dt;

    if (wave.length > 500) {
        wave.pop()
    }
}
