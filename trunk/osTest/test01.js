function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
    } else {
             return document[movieName];
    }
}

function atoj(str){
	document.getElementById("test").innerHTML += str + "<br>";
}

function jtoa(){
	thisMovie("swfId").jtoa();
	document.getElementById("test").innerHTML = "";
}


