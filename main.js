img = "";
status = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound("alarm_sound.mp3");
}

function setup(){
    canvas = createCanvas(380,380); 
    var width = screen.width;
    if (width<992){
        canvas.center();
    }
    else{
        canvas.position(580,130);
    }

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
}


        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++){

            fill(r,g,b);

          
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " (" + percent + "%) ", objects[i].x + 15 , objects[i].y + 15);
            textSize(18);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        if(objects[i].label == "person"){
       
            document.getElementById("status").innerHTML = "Baby Detected";
     
            alarm.stop();
        }
        else{  

            document.getElementById("status").innerHTML = "Baby Not Detected";
            alarm.play();
        }

        }

        
        if(objects.length <= 0){
            
            document.getElementById("status").innerHTML = "Baby Not Detected";
          
            alarm.play();
        }

    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}