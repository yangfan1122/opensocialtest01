gadgets.util.registerOnLoadHandler(populateMyAppData);
   var htmlout = "";
   var me = null;

   /************************************************************************
    * Set user data
    */
   function populateMyAppData() {
     var req = opensocial.newDataRequest();
     var data1 = Math.random() * 5;
     var data2 = Math.random() * 100;
     var data3 = new Date().getTime();
     htmlout += "Setting AppField1 to " + data1 + "<br />";
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField1", data1)) + "<br />";
     htmlout += "Setting AppField2 to " + data2 + "<br />";
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField2", data2)) + "<br />";
     htmlout += "Setting AppField3 to " + data3 + "<br />";
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField3", data3)) + "<br />";
     req.send(handlePopulateMyAppData, "update_appdata");
	 alert(1);
   }

   /************************************************************************
    * Handle responses from update person app data requests
    */
   function handlePopulateMyAppData(data) {
     if (data.hadError()) {
       htmlout += data.getError();
     }
     requestMyData();
   }
   
   /************************************************************************
    * Fetch app data
    */
   function requestMyData() {
     var req = opensocial.newDataRequest();
     var fields = [ "AppField1", "AppField2", "AppField3" ];
     req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.VIEWER), "viewer");
     req.add(req.newFetchPersonAppDataRequest("VIEWER", fields), "viewer_data");
     req.send(handleRequestMyData);
	 alert(2);
   }

   /************************************************************************
    * Handle responses from app data requests
    */
   function handleRequestMyData(data) {
     var mydata = data.get("viewer_data");
     var viewer = data.get("viewer");
     me = viewer.getData();

     if (mydata.hadError()) {
       htmlout += data.getError();
       return;
     }
     // Do something with the returned data - note the getData call
     doSomethingWithMyData(mydata.getData());
	 alert(3);
   }

   /************************************************************************
   * Operate on user data
   */
   function doSomethingWithMyData(data) {
     //Data is indexed by user id, and represents an object where keys 
     //correspond with the app data fields.
     var mydata = data[me.getId()];
     var div = document.getElementById('content_div');
     htmlout += "My AppField1 data is: " + mydata["AppField1"] + "<br />";
     htmlout += "My AppField2 data is: " + mydata["AppField2"] + "<br />";
     htmlout += "My AppField3 data is: " + mydata["AppField3"] + "<br />";
     div.innerHTML = htmlout;
   }
   