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
	document.getElementById("test").innerHTML = "a <- j";
	thisMovie("swfId").jtoa("jsjsjsjsjsjs");
}



//Gadget
function request() {
  var idspec = opensocial.newIdSpec({ "userId" : "OWNER", "groupId" : "FRIENDS" });
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest("OWNER"), "get_owner");
  req.add(req.newFetchPeopleRequest(idspec), "get_friends");
  req.send(response);
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

function init() {
	request();
}

gadgets.util.registerOnLoadHandler(init);

