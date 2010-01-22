function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
    } else {
             return document[movieName];
    }
}
function atoj(str){
	document.getElementById("test").innerHTML = str;
	testStr = str;
}

function jtoaHandler(){
	document.getElementById("test").innerHTML = "a <- j ºº×Ö²âÊÔ ";
	thisMovie("swfId").jtoa("jsjsjsjsjsjs");
}



//Gadget -----------------------------------

var testStr;


//getFriends
function request() {
  var idspec = opensocial.newIdSpec({ "userId" : "OWNER", "groupId" : "FRIENDS" });
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest("OWNER"), "get_owner");
  req.add(req.newFetchPeopleRequest(idspec), "get_friends");
  req.send(response);
  alert("request");
}
function response(dataResponse) {
  var owner = dataResponse.get('get_owner').getData();
  var friends = dataResponse.get('get_friends').getData(); 
  var html = 'Friends of ' + owner.getDisplayName();
  html += ':<br><ul>';
  friends.each(function(person) {
      html += '<li>' + person.getDisplayName() + '</li>';
  });
  html += '</ul>';
  document.getElementById('test').innerHTML = html;
}

/*
//saveInfo
function saveInfo(){
	var req = opensocial.newDataRequest();
	req.add(req.newUpdatePersonAppDataRequest("VIEWER", "str1", testStr));
	req.add(req.newUpdatePersonAppDataRequest("VIEWER", "str2", testStr+"~~"));
}

function requestMyData() {
	var req = opensocial.newDataRequest();
	var fields = [ "str1", "str2"];
	var p = {};
  
	p[opensocial.IdSpec.Field.USER_ID[]] = opensocial.IdSpec.PersonId.VIEWER;
	var idSpec = opensocial.newIdSpec(p);
	req.add(req.newFetchPersonAppDataRequest(idSpec, fields), "viewer_data");
	req.send(handleRequestMyData);
}

function handleRequestMyData(data) {
	var mydata=data.get("viewer_data");
	var viewer=data.get("viewer");
	me=viewer.getData();

	if (mydata.hadError()) {
		htmlout+=data.getErrorMessage();
		return;
	}
	// Do something with the returned data - note the getData call
	doSomethingWithMyData(mydata.getData());
}
function doSomethingWithMyData(data) {
	//Data is indexed by user id, and represents an object where keys 
	//correspond with the app data fields.
	var mydata=data[me.getId()];
	var div=document.getElementById('test');
	htmlout+="My AppField1 data is: "+mydata["str1"]+"<br />";
	htmlout+="My AppField2 data is: "+mydata["str2"]+"<br />";
	div.innerHTML=htmlout;
}

*/



function init() {
	alert("init");
	request();
}

gadgets.util.registerOnLoadHandler(init);

