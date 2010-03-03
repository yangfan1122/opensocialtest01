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
	var canvas_view=new gadgets.views.View("canvas");//发送到"canvas"视图
	gadgets.views.requestNavigateTo(canvas_view, params);
}
var my_params = {
    foo1 : 12345,
    bar1 : "Bar value"
}
gotoCanvas(my_params);






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