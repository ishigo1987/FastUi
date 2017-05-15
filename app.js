"use strict";
const themeColor = "#1976d2";
let navigationView = new tabris.NavigationView({
left: 0, top: 0, right: 0, bottom: 0, toolbarColor:themeColor, titleTextColor:"#fff"
}).appendTo(tabris.ui.contentView);
require("./modules/tabrisUi.js")(`dark`, `#0d47a1`, themeColor);
localStorage.setItem("storeUserInfos", "stephane");
let storeUserInfos = localStorage.getItem("storeUserInfos");
if(storeUserInfos === null)
 {
   // connexion.js
   let connexionView = require("./views/connexion.js");
       connexionView.create();
 }
else
 {
     // home.js
     let homePage = require("./views/home.js");
         homePage.create();
 }
