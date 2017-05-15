exports.create = () =>
 {
   "use strict";
   const plateformeLanguage = tabris.device.get("language");
   const platform = device.platform;
   const themeColor = "#1976d2";
   let createnavigationView;
   let createMenuActionIcon;
   let executeNavigationView = require("../helpers/navigationViewAnimation.js")(createnavigationView,"#1976d2","#fff",false);
   let actionBarInscription = require("../helpers/actionIcons.js")(createMenuActionIcon,"Inscription","images/android/inscription.png","high",executeNavigationView);
       actionBarInscription.on("select",() =>
        {
             let inscriptionView = require("./inscription.js");
                 inscriptionView.create().appendTo(executeNavigationView);
             require("../modules/animations.js")(executeNavigationView,"zoomIn");
        });

   let connexionView = new tabris.Page({
         title:"",
         background:themeColor
   }).on({
       appear: () => {actionBarInscription.visible = true;},
       disappear: () => {actionBarInscription.visible = false;}
   }).appendTo(executeNavigationView);

  let scrollView = new tabris.ScrollView({
      left:0,
      right:0,
      top:0,
      bottom:30
  }).appendTo(connexionView);

  let logoView = new tabris.TextView({
      layoutData:{centerX: 0,top:20,},
      font:"bold 30px roboto",
      text:"LOHCE",
      textColor:"#fff"
  }).appendTo(scrollView);

  let login = new tabris.TextInput({
      layoutData:
       {
         top: 115,
         left:"10%",
         right:"10%",
        },
       font: "16px roboto, noto",
       message: plateformeLanguage === "fr-FR" ? "Entrez votre numéro de téléphone" : "Enter your phone number",
       borderColor:"#eee",
       textColor:"#fff",
       keyboard:"phone"
  }).appendTo(scrollView);

  let password = new tabris.TextInput({
      layoutData:
        {
          top:180,
          left:"10%",
          right:"10%",
        },
       font: "16px roboto, noto",
       message: plateformeLanguage === "fr-FR" ? "Entrez votre mot de passe" : "Enter your password",
       type:"password",
       borderColor:"#eee",
       textColor:"#fff"
  }).appendTo(scrollView);

  let button = new tabris.Button({
      layoutData:
       {
         top:270,
         left:"10%",
         right:"10%"
        },
      font: "16px roboto, noto",
      textColor:"#fff",
      text: plateformeLanguage === "fr-FR" ? "Connexion" : "Connection",
      background:"#2196f3",
      height:60
  }).on("select", () =>
       {
          // On teste que les champs ne sont pas vides si c'est le cas on lance la verification du couple login mot de passe
          const loginValue = login.get("text");
          const passwordValue = password.get("text");
          if(loginValue === "" || passwordValue === "")
           {
             window.plugins.toast.showShortBottom("Veuillez remplir tout les champs");
           }
}).appendTo(scrollView);

let forgetPassword = new tabris.TextView({
     layoutData:
      {
        top:350,
        centerX:0
      },
     font: "16px roboto, noto",
     text: plateformeLanguage === "fr-FR" ? "Mot de passe oublié?" : "Forgot your password?",
     textColor:"#fff",
}).on("tap", () =>
     {
       console.log("you le brave");
     }).appendTo(scrollView);

     return executeNavigationView;
 };
