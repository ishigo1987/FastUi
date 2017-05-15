module.exports = (navigationViewAnimation,toolbarColorHex,actionColorHex,boolAnimation) =>
 {
   navigationViewAnimation = new tabris.NavigationView({
    left: 0, top: 0, right: 0, bottom: 0, toolbarColor:toolbarColorHex, titleTextColor:"#fff",actionColor:actionColorHex,pageAnimation:"default"
     }).appendTo(tabris.ui.contentView);
   if(boolAnimation === true)
    {
       navigationViewAnimation.set({
           transform:{scaleX:0,scaleY:0},
           animated:false
        });
       navigationViewAnimation.animate({
         transform:{scaleX:1,scaleY:1},
         opacity:1
          },
          {
            delay: 0,
            duration:250,
            repeat:0,
            reverse:false,
            easing: "ease-in-out"
       }
      ).then();
    }

 return navigationViewAnimation;
 };
