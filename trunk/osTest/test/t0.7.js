function getViewName() {
	return gadgets.views.getCurrentView().getName();
}

function getUrlP() {
	output(gadgets.util.getUrlParameters()["parent"]);//父网址

	var supported_views = gadgets.views.getSupportedViews();
	output("supported_views['canvas'] = "+supported_views["canvas"]);

	var application_id = gadgets.util.getUrlParameters()["gadgetId"];//获取应用程序的 ID
	output("application_id = "+application_id);

	output("~~~~");
}
//getUrlP();





//通过 requestNavigateTo() 将数据传递至应用程序
function gotoCanvas1(params) {
	var canvas_view=new gadgets.views.View("canvas");//发送到"canvas"视图
	gadgets.views.requestNavigateTo(canvas_view, params);
}
var my_params = {
    foo1 : 12345,
    bar1 : "Bar value"
}
//gotoCanvas1(my_params);







//浏览至另一个视图
function navigateTo(dest) {
	var supported_views=gadgets.views.getSupportedViews();
	gadgets.views.requestNavigateTo(supported_views[dest]);
}
/**
   * When called, this method asks the container to switch to the canvas
   */
function gotoCanvas() {
	navigateTo("canvas");
}
/**
   * When called, this method asks the container to switch to the profile
   */
function gotoProfile() {
	navigateTo("profile");
}
//gotoProfile();







//通过 querystring 将数据传递至应用程序
var data = { "foo" : 1234554321, "bar" : "Bar value querystring" };
var json_data = gadgets.json.stringify(data);
var url_data = encodeURIComponent(json_data);
function diyAppUrl(){
	var appUrl = "http://sandbox.orkut.com/Main#Application.aspx?appId=" + gadgets.util.getUrlParameters()["gadgetId"] + "&appParams=" + url_data;
	output("通过url给应用程序传递参数: "+appUrl);
}
//diyAppUrl();









//链接到应用程序内的页面
function makeLink(page, app_id, uid) {
	return [ gadgets.util.getUrlParameters()["parent"], 
	             "/Application.aspx?appId=", 
	             app_id, 
	             "&uid=",
	             uid,
	             "&appParams=%7B%22page%22%3A%22", 
	             page,
	             "%22%7D"].join("");
}


/* stored_app_id should be initialized to the application ID - Check the 
   * "Obtaining the application's ID" section for details on
   * obtaining this.
   * stored_uid should be initialized to the user's orkut UID - Note that 
   * is _not_ the same as the opensocial ID number!  Check the 
   * "Getting a user's orkut UID" section for details on 
   * obtaining this. */












//获取用户的 orkut UID
var getOrkutUid;
function request() {
	var req=opensocial.newDataRequest();
	req.add(req.newFetchPersonRequest("VIEWER"), "viewer");
	req.send(response);
}
function response(data) {
	var viewer=data.get("viewer").getData();
	var profile_url=viewer.getField(opensocial.Person.Field.PROFILE_URL);
	var regex=/uid=([^&#]+)/;
	var result=profile_url.match(regex);
	if (result.length==2) {
		var uid=result[1];
		/* uid now contains the viewer's orkut UID */
		getOrkutUid = uid;
		output("getOrkutUid = "+getOrkutUid);

		//链接到应用程序内的页面
		var about_url=makeLink("about", gadgets.util.getUrlParameters()["gadgetId"], getOrkutUid);
		output("about_url = "+about_url);

	} else {
		/* there was a problem getting the UID */
		output("promblem in getUid");
	}
}
//request();







//获取个人信息
//CURRENT_LOCATION 
function getData11() {
	var req=opensocial.newDataRequest();
	req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.VIEWER), 'viewer');
	req.add(req.newFetchPeopleRequest(opensocial.DataRequest.Group.VIEWER_FRIENDS), 'viewerFriends');
	req.send(onLoadFriends11);
}
function onLoadFriends11(dataResponse) {
	var viewer=dataResponse.get('viewer').getData();
	var html='Friends of '+viewer.getId();
	html+=':<br><ul>';
	var viewerFriends=dataResponse.get('viewerFriends').getData();
	viewerFriends.each(function(person) {
	      html += '<li>' + person.getDisplayName() + '</li>';
	    });
	html+='</ul>';
	output(html);
}

getData11();



output("CURRENT_LOCATION="+CURRENT_LOCATION);





if (getViewName()=="canvas") {
	/* Do canvas specific stuff here */
	output("in "+getViewName());
	
	
	//在画布视图中，检查具有以下代码的值
	var prefs = gadgets.views.getParams();
	var foo = prefs["foo1"];
	var bar = prefs["bar1"];
	output("foo="+foo+",bar="+bar+"<br>");
	

}
if (getViewName()=="profile") {
	/* Do profile specific stuff here */
	output(getViewName());
}






function output(str){
	document.getElementById("txt").innerHTML += str+"<br />";
}

//gadgets.util.registerOnLoadHandler(getViewName);