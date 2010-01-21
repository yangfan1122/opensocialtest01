function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
    } else {
             return document[movieName];
    }
}

function atoj(str){
	document.getElementById("test").innerHTML = str;
}

function jtoaHandler(){
	alert("jtoaHandler");
	document.getElementById("test").innerHTML = "a <- j";
	thisMovie("swfId").jtoa();
}


