alert("testtttt");
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
function gotoCanvas(params) {
	var canvas_view=new gadgets.views.View("canvas");//发送目标
	gadgets.views.requestNavigateTo(canvas_view, params);
}
var my_params = {
    foo : 12345,
    bar : "Bar value"
}
//gotoCanvas(my_params);



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
gotoProfile();




if (getViewName()=="canvas") {
	/* Do canvas specific stuff here */
	output("in "+getViewName());

	//在画布视图中，检查具有以下代码的值
	var prefs = gadgets.views.getParams();
	var foo = prefs["foo"];
	/* foo contains 12345 */

	var bar = prefs["bar"];
	/* bar contains "Bar value" */
	output("foo="+foo+",bar="+bar);
	output("<br>");


}
if (getViewName()=="profile") {
	/* Do profile specific stuff here */
	output(getViewName());
}






function output(str){
	document.getElementById("txt").innerHTML += str+"<br />";
}

//gadgets.util.registerOnLoadHandler(getViewName);