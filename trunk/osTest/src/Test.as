﻿package
{
    import flash.display.Sprite;
	import flash.events.MouseEvent;
    import flash.external.ExternalInterface;
    import flash.text.TextField;
    /**
    * ...
    * @author yf
    */
    public class Test extends Sprite
    {
        public function Test():void
        {
			btn.label = "a to j";
			btn.addEventListener(MouseEvent.CLICK, btnHandler);
			ExternalInterface.addCallback("jtoa" , jtoa);
        }
		private function btnHandler(event:MouseEvent):void
		{
            ExternalInterface.call("atoj" , "a -> j");
			txt.text = "a -> j";
		}
		private function jtoa():void
		{
			txt.text = "a <- j";
		}
		
		
    }
}
