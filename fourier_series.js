let R = 75;
let dt = 0.01;

let wavepos = 200;

let time = 0;
let wave = [];
let paused = false;
let nslider, ampslider;
let mycolor = [];

function setup() {
    nslider = createSlider(1, 100, value=3, step=1);
    ampslider = createSlider(1, 100, value=3, step=1);
    nslider.input(sliderChanged);
    ampslider.input(ampSliderChanged);
    var canvas = createCanvas(1200, 400);
    canvas.parent("canvas");
    genColorArray();
    document.getElementById("ampValue").innerHTML = ampslider.value();
    document.getElementById("nsliderValue").innerHTML = nslider.value();
}

function genColorArray() {
    mycolor = []
    for(let i = 0; i < nslider.value(); i++) {
        r = random(255);
        g = random(255);
        b = random(255);
        mycolor[i] = color(r, g, b);
    }
}

function sliderChanged()
{
    document.getElementById("nsliderValue").innerHTML = nslider.value();
    genColorArray();
}

function ampSliderChanged()
{
    document.getElementById("ampValue").innerHTML = ampslider.value();
    R = ampslider.value();
}

function pauseCanvas() {
    paused = !paused;
    if(paused)
    {
        noLoop();
        document.getElementById("pauseButton").innerHTML = "PLAY";
    }
    else
    {
        loop();
        document.getElementById("pauseButton").innerHTML = "PAUSE";
    }
}

function draw() {
    background(0);
    translate(200, 200);

    let x = 0;
    let y = 0;

    for(let i=0; i < nslider.value(); i++) {
        let prevx = x;
        let prevy = y;
        let n = 2 * i + 1;
        let radius = R * (4/(n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(mycolor[i]);
        beginShape();
        strokeWeight(5);
        noFill();
        ellipse(prevx, prevy, 2 * radius); // Main Circle
        endShape();

        fill(255);
        stroke(255);
        line(prevx, prevy, x, y);
        ellipse(x, y, 2);

    }
    wave.unshift(y); 

    translate(wavepos, 0);
    line(x - wavepos, y, 0, wave[0]);
    beginShape();
    noFill();
    for(let i = 0; i < wave.length; i++)
        vertex(i, wave[i])
    endShape();
    
    time -= dt;

    if (wave.length > 1000) {
        wave.pop()
    }
}
