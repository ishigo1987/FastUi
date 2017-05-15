exports.create = () =>
 {
   "use strict";

   const plateformeLanguage = tabris.device.get("language");
   const themeColor = "#0081cc";
   const fontStyle = "16px roboto, noto";
   let searchTravelView = new tabris.Page({
      title:plateformeLanguage === "fr-FR" ? "Rechercher un voyage" : "Search a travel",
      background:`#fafafa`,
      opacity:1
    }).on("dispose", function()
     {
      //  require("../modules/animations.js")(this,"zoomOut");
     });

   let scrollView = new tabris.ScrollView({
    left:0,right:0,top:0,bottom:0
   }).appendTo(searchTravelView);

   let departTown = new tabris.Composite({
    left:15,right:15,top:50,height:50,
    background:"#e0e0e0",
    cornerRadius:3,
  }).on("tap", function()
   {
     this.background = "#bdbdbd";
     setTimeout(() =>{departTown.background = "#e0e0e0";},75);
     let callbackfunction = function(buttonIndex) {
     setTimeout(function() {
      if(buttonIndex === 1)
       {
          textDepartTown.text = "Douala";
       }
     else if(buttonIndex === 2)
      {
         textDepartTown.text = "Yaoundé";
      }
     },0);
   };

   let options = {
       'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
       'title': "Ville de départ",
       'buttonLabels': ["Douala", "Yaoundé"],
       'androidEnableCancelButton' : true, // default false
       'addCancelButtonWithLabel': 'Fermer'
      };
     window.plugins.actionsheet.show(options, callbackfunction);
   }).appendTo(scrollView);

   let textDepartTown = new tabris.TextView({
      centerX:0,centerY:0,
      text:plateformeLanguage === "fr-FR" ? "Selectionner la ville de départ" : "Select the departure city",
      textColor:"#757575",
      font:"20px roboto noto"
   }).appendTo(departTown);

   let arrivalTown = new tabris.Composite({
       left:15,right:15,top:["prev()", 20],height:50,
       background:"#e0e0e0",
       cornerRadius:3,
   }).on("tap", function(){
      this.background = "#bdbdbd";
      setTimeout(() =>{arrivalTown.background = "#e0e0e0";},75);
      let callbackfunction = function(buttonIndex) {
      setTimeout(function() {
       if(buttonIndex === 1)
        {
           textarrivalTown.text = "Douala";
        }
      else if(buttonIndex === 2)
        {
          textarrivalTown.text = "Yaoundé";
        }
       },0);
      };

    let options = {
        'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        'title': "Ville d'arrivée",
        'buttonLabels': ["Douala", "Yaoundé"],
        'androidEnableCancelButton' : true, // default false
        'addCancelButtonWithLabel': 'Fermer'
       };
      window.plugins.actionsheet.show(options, callbackfunction);
   }).appendTo(scrollView);

   let textarrivalTown = new tabris.TextView({
      centerX:0,centerY:0,
      text:plateformeLanguage === "fr-FR" ? "Selectionner la ville darrivée" : "Select the City of Arrival",
      textColor:"#757575",
      font:"20px roboto noto"
   }).appendTo(arrivalTown);

   let dateToGo = new tabris.Composite({
       left:15,right:15,top:["prev()", 20],height:50,
       background:"#e0e0e0",
       cornerRadius:3,
   }).on("tap", function()
    {
      this.background = "#bdbdbd";
      setTimeout(() =>{dateToGo.background = "#e0e0e0";},75);
      cordova.plugins.DateTimePicker.show({
	     mode: "date",
	    date:new Date(),
	    allowOldDates: false,
	    allowFutureDates: true,
	    minuteInterval: 10,
	    locale: plateformeLanguage === "fr-FR" ? "FR" : "EN",
	    okText: plateformeLanguage === "fr-FR" ? "Selectionner" : "Select",
	    cancelText: plateformeLanguage === "fr-FR" ? "Annuler" : "Cancel",
	    android: {
		   theme: 16974123, // Theme_DeviceDefault_Light
		   calendar: true
	    }
    }, function(newDate) {
       textDateToGo.text = newDate;
   }, function (err) {
	    window.plugins.toast.showShortBottom(`Impossible d'ouvrir le calendrier ${err}`);
   });
    }).appendTo(scrollView);

  let textDateToGo = new tabris.TextView({
      centerX:0,centerY:0,
      text:plateformeLanguage === "fr-FR" ? "Choisir la date de depart" : "Select departure date",
      textColor:"#757575",
      font:"20px roboto noto"
  }).appendTo(dateToGo);

  let buttonToSearch = new tabris.Button({
      left:15,right:15,top:["prev()", 70],height:60,
      text:plateformeLanguage === "fr-FR" ? "Rechercher un voyage" : "Search for a trip",
      background:themeColor,
      font:"bold 20px roboto noto",
      textColor:"#fff"
  }).on("select",() =>
   {

   }).appendTo(scrollView);
  return searchTravelView;
 }
