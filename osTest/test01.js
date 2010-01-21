<?xml version="1.0" encoding="UTF-8"?>
<Module>
  <ModulePrefs title="Just Read - 1 - Me and my friends"
               author_email="your.email@foo.bar" scrolling="true" height="500">
    <Require feature="opensocial-0.7"/>
  </ModulePrefs>
  <Content type="html">
    <![CDATA[
      <script type="text/javascript">

        var viewer;              // 类型：opensocial.Person
        var viewerFriends;       // 类型：opensocial.Collection


        /* 显示基本信息 */
        function showBasic() {
          /* 显示 VIEWER 名字 */
          document.getElementById('me').innerHTML = viewer.getDisplayName();
        
          /* 显示 VIEWER 的朋友名字 */
          var html = new Array();
          viewerFriends.each(function(friend) {
            html.push(friend.getDisplayName() + ", ");
          });
          document.getElementById('friends').innerHTML = html.join('');
        };


        /* 发送 Opensocial API 请求 */
        function reloadAll() {
          var req = new opensocial.DataRequest();
          req.add(req.newFetchPersonRequest('VIEWER'), 'v');
          req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'vf');
          req.send(onReloadAll);
        };


        /* 处理 Opensocial API 响应 */
        function onReloadAll(dataResponse) {
          /* 获取数据 */
          viewer = dataResponse.get('v').getData() || {};
          viewerFriends = dataResponse.get('vf').getData() || {};
          
          /* 显示数据 */
          showBasic();
        };


        /* Gadget 执行入口 */
        function init() {
          reloadAll();
        };
        gadgets.util.registerOnLoadHandler(init);
      </script>

      <!-- 用于显示的DOM -->
      <div id='main'>
        <b>我：</b>
        <p id='me'></p>
        <b>我的朋友：</b>
        <p id='friends'></p>
      </div>
    ]]>
  </Content>
</Module>

