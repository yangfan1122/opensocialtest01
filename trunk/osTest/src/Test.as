package
{
    import flash.display.Sprite;
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
            ExternalInterface.addCallback("jtoa" , jtoa);
        }
        private function jtoa():void
        {
            txt.text = "j - a";
            ExternalInterface.call("atoj" , "a - j");
        }
    }
}
