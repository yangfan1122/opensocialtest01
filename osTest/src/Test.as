package
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
			try{
				ExternalInterface.addCallback("jtoa" , jtoa);
			}catch (e:*) {
				txt.text = "error: "+e;
			}
			
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
