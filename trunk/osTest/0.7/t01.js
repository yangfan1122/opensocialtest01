 /**
  * Request for friend information.
  */
  function getData() {    
    var req = opensocial.newDataRequest();
    req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.VIEWER), 'viewer');
    req.add(req.newFetchPeopleRequest(opensocial.DataRequest.Group.VIEWER_FRIENDS), 'viewerFriends');
    req.send(onLoadFriends);
  };

 /**
  * Parses the response to the friend information request and generates
  * html to list the friends along with their display name.
  *
  * @param {Object} dataResponse Friend information that was requested.
  */
  function onLoadFriends(dataResponse) {
    var viewer = dataResponse.get('viewer').getData();
    var html = 'Friends of ' + viewer.getDisplayName(); 
    html += ':<br><ul>';
    var viewerFriends = dataResponse.get('viewerFriends').getData();
    viewerFriends.each(function(person) {
      html += '<li>' + person.getDisplayName() + '</li>';
    });
    html += '</ul>';
    document.getElementById('content_div').innerHTML = html;
  };

  gadgets.util.registerOnLoadHandler(getData);
