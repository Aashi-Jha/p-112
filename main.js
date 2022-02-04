
prediction_1="";
prediction_2="";


Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='capture_img' src='"+data_uri+"'/>";
    });
}
console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ceGfYDo7P/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth=window.speechSynthesis;
speak_data_1="The prediction is "+prediction_1;
speak_data_2="The prediction is "+prediction_2;
var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterthis);
}

function check(){
img=document.getElementById("capture_img");
classifier.classify(img , gotresult);
}

function gotresult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        document.getElementById("result_emoji_1").innerHTML=prediction_1;
        document.getElementById("result_emoji_2").innerHTML=prediction_2;

        speak();

        if(prediction_1=="victory"){
            document.getElementById("emoji_result_1").innerHTML="&#9996;";
        }
        if(prediction_1=="good"){
            document.getElementById("emoji_result_1").innerHTML="&#128076;";
        }
        if(prediction_1=="thumb up"){
            document.getElementById("emoji_result_1").innerHTML="&#128077;";
        }
        if(prediction_1=="thumb down"){
            document.getElementById("emoji_result_1").innerHTML="&#128078;";
        }
        if(prediction_1=="rock"){
            document.getElementById("emoji_result_1").innerHTML="&#129304;";
        }

        if(prediction_2=="victory"){
            document.getElementById("emoji_result_2").innerHTML="&#9996;";
        }
        if(prediction_2=="good"){
            document.getElementById("emoji_result_2").innerHTML="&#128076;";
        }
        if(prediction_2=="thumb up"){
            document.getElementById("emoji_result_2").innerHTML="&#128077;";
        }
        if(prediction_2=="thumb down"){
            document.getElementById("emoji_result_2").innerHTML="&#128078;";
        }
        if(prediction_2=="rock"){
            document.getElementById("emoji_result_2").innerHTML="&#129304;";
        }
    }
}