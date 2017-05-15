exports.create = () =>
 {
   localStorage.setItem("language","en");
   const themeColor = "#1976d2";
   let createnavigationView;
   let createMenuActionIcon;
   const language = localStorage.getItem("language");
   let executeNavigationView = require("../helpers/navigationViewAnimation.js")(createnavigationView,"#fff","#757575",false);
       executeNavigationView.set("titleTextColor", "#424242");
   require("../modules/tabrisUi.js")(`dark`, `#212121`, "#fff");
   const fontTextMenu = "normal 14px roboto noto";
   let actionBar = require("../helpers/actionIcons.js")(createMenuActionIcon,"Liste des commandes","images/android/inscription.png","low",executeNavigationView);
   let homeView = new tabris.Page({
       // Ici ce sera le contenu du localStorage.storeUserInfos
       title:``
   }).on({
      appear: () =>{
        require("../modules/tabrisUi.js")(`dark`, `#212121`, `#fff`);
        actionBar.visible = true;
        executeNavigationView.toolbarColor = "#fff";
        executeNavigationView.actionColor = "#757575";
        executeNavigationView.titleTextColor = "#fff";
       },
      disappear: () =>
       {
         require("../modules/tabrisUi.js")(`dark`, `#1565c0`, themeColor);
         actionBar.visible = false;
         executeNavigationView.toolbarColor = "#1976d2";
         executeNavigationView.actionColor = "#fff";
         executeNavigationView.titleTextColor = "#fff";
       }
    }).appendTo(executeNavigationView);

   let welcometext = new tabris.TextView({
       left:15,
       text:language === "fr" ? "BONJOUR" : "HELLO",
       textColor:"#757575",
       font:"bold 27px roboto noto"
   }).appendTo(homeView);

   let nameUser = new tabris.TextView({
       left:["prev()",5],
       text:"STEPHANE",
       textColor:"#757575",
       font:"bold 27px roboto noto"
   }).appendTo(homeView);

   let scrollView = new tabris.ScrollView({
       left:0,right:0,top:80,bottom:0,
       background:"#fafafa"
   }).appendTo(homeView);

   let findTravel = new tabris.Composite({
       left:0,right:"50%",top:80,bottom:"60%",
       id:"findTravel"
   }).on("tap", function(){
     let searchTravelView = require("./searchTravel.js");
         searchTravelView.create().appendTo(executeNavigationView);
   }).appendTo(homeView);

   let imageFindTravel = new tabris.ImageView({
       centerX:0,top:30,width:48,height:48,
       image:{src:"icons/home_menu/search.png"}
   }).appendTo(findTravel);

   let textMenufindTravel = new tabris.TextView({
       centerX:0,top:["prev()",5],
       text: language === "fr" ? "rechercher les voyages" : "Search travel",
       font:fontTextMenu,
       textColor:themeColor
   }).appendTo(findTravel);

   let buyTicket = new tabris.Composite({
       left:"50%",right:0,top:80,bottom:"60%",
       id:"buyTicket"
   }).appendTo(homeView);

   let imageBuyTicket = new tabris.ImageView({
       centerX:0,top:30,width:48,height:48,
       image:{src:"icons/home_menu/shop.png"}
   }).appendTo(buyTicket);

   let textMenubuyTicket = new tabris.TextView({
       centerX:0,top:["prev()",5],
       text: language === "fr" ? "Achat d’un billet" : "Purchase ticket",
       font:fontTextMenu,
       textColor:themeColor
   }).appendTo(buyTicket);

   let addContact = new tabris.Composite({
       left:0,right:"50%",top:["#findTravel",50]
   }).appendTo(homeView);

   let imageAddContact = new tabris.ImageView({
       centerX:0,centerY:0,width:48,height:48,
       image:{src:"icons/home_menu/contact.png"}
   }).appendTo(addContact);

   let textMenuAddContact = new tabris.TextView({
       centerX:0,top:["prev()",10],
       text: language === "fr" ? "Parrainage d’un contact" : "Sponsoring a contact",
       font:fontTextMenu,
       textColor:themeColor
   }).appendTo(addContact);

   let changeCommand = new tabris.Composite({
       left:"50%",right:0,top:["#buyTicket",50]
   }).appendTo(homeView);

   let imageChangeCommand = new tabris.ImageView({
       centerX:0,centerY:0,width:48,height:48,
       image:{src:"icons/home_menu/change_order.png"}
   }).appendTo(changeCommand);

   let textMenuChangeCommand = new tabris.TextView({
       centerX:0,top:["prev()",10],
       text: language === "fr" ? "modifier commande" : "Edit an order",
       font:fontTextMenu,
       textColor:themeColor
   }).appendTo(changeCommand);

 };
