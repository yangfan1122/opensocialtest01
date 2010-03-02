gadgets.util.registerOnLoadHandler(populateMyAppData);
var htmlout="";
var me=null;

/**
    * Set user data
    */
function populateMyAppData() {
	var req=opensocial.newDataRequest();
	var data1=Math.random()*5;
	var data2=Math.random()*100;
	var data3 = new Date().getTime();
	htmlout+="Setting AppField1 to "+data1+"<br />";
	req.add(req.newUpdatePersonAppDataRequest("VIEWER","AppField1",data1))+"<br />";
	htmlout+="Setting AppField2 to "+data2+"<br />";
	req.add(req.newUpdatePersonAppDataRequest("VIEWER","AppField2",data2))+"<br />";
	htmlout+="Setting AppField3 to "+data3+"<br />";
	req.add(req.newUpdatePersonAppDataRequest("VIEWER","AppField3",data3))+"<br />";
	req.send(handlePopulateMyAppData);
	output(htmlout);
}

/**
    * Handle responses from update person app data requests
    */
function handlePopulateMyAppData(data) {
	if (data.hadError()) {
		htmlout+=data.getErrorMessage();
	}
	requestMyData();
}

/**
    * Fetch app data
    */
function requestMyData() {
	var req=opensocial.newDataRequest();
	var fields=["AppField1","AppField2","AppField3"];
	req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), "viewer");
	output("3.0");
	req.add(req.newFetchPersonAppDataRequest("VIEWER", "AppField1"), "viewer_data");
	output("3.1");
	req.send(handleRequestMyData);
}

/**
    * Handle responses from app data requests
    */
function handleRequestMyData(data) {
	output(4);
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

/**
   * Operate on user data
   */
function doSomethingWithMyData(data) {
	output("data = "+data);
	//Data is indexed by user id, and represents an object where keys 
	//correspond with the app data fields.
	var mydata=data[me.getId()];
	var div=document.getElementById('content_div');
	htmlout+="My AppField1 data is: "+mydata["AppField1"]+"<br />";
	htmlout+="My AppField2 data is: "+mydata["AppField2"]+"<br />";
	htmlout+="My AppField3 data is: "+mydata["AppField3"]+"<br />";
	//div.innerHTML=htmlout;
	output(htmlout);
}


function output(str){
	document.getElementById("content_div").innerHTML += str+"<br />";

}



