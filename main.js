noseX = 0;
noseY = 0;

difference = null;
rightWrist = null;
leftWrist = null;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded");
}

function draw(){
    background('#969A97');

    document.getElementById("square_side").innerHTML = "Width and Height of the square will be : "+ difference;
    fill('#F90093');
    stroke('#F90093');
    square(noseX, noseY, difference);
}

function gotPoses(results){
    if( results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = "+noseX+", Nose Y = "+ noseY);

        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        difference = floor(rightWrist - leftWrist);
        if(difference < 0){
            difference = difference * (-1);
        }

        console.log("leftWristX =>"+ leftWrist+ " rigthWristX =>"+rightWrist+ " difference => "+ difference);
    }
}