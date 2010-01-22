package
{
    import flash.display.Sprite;
	import flash.events.MouseEvent;
    import flash.external.ExternalInterface;
    import flash.text.TextField;
	import flash.system.Security;
	
    /**
    * ...
    * @author yf
    */
    public class Test extends Sprite
    {
        public function Test():void
        {
			Security.allowDomain("*");
			
			btn.label = "a to j";
			btn1.label = "save";
			btn.addEventListener(MouseEvent.CLICK, btnHandler);
			btn1.addEventListener(MouseEvent.CLICK, btn1Handler);
			ExternalInterface.addCallback("jtoa" , jtoa);
		}
		private function callJs(str:String):void{
			ExternalInterface.call("atoj" , str);
		}
		
		
		private function btnHandler(event:MouseEvent):void
		{
            callJs("a -> j");
			txt.text = "a -> j";
		}
		private function jtoa(str:String):void
		{
			txt.text = "from js: "+str;
			//txt.text = "a <- j";
		}
		private function btn1Handler(event:MouseEvent):void
		{
			callJs(txt1.text);
		}
		
    }
}
