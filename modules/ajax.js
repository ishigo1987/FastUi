module.exports = (data,whatView,userPhoneNumber) =>
 {
    "use strict";
    let plateformeLanguage = tabris.device.get("language");
    const url = "https://www.lohce.com/api/json";
    let xhrLohceApi = new XMLHttpRequest();
        xhrLohceApi.addEventListener("loadstart", () =>
         {
           // A remplacer par le plugin pDialog
           if(whatView === "InscriptionView")
            {
              let textInfo = plateformeLanguage === "fr-FR" ? "Inscription en cours..." : "Signing up...";
              window.plugins.toast.showShortCenter(textInfo);
            }
           else if(whatView === "ConnectionView")
            {
              let textInfo = plateformeLanguage === "fr-FR" ? "Connexion en cours..." : "Connection in progress...";
              window.plugins.toast.showShortCenter(textInfo);
            }
         });
        xhrLohceApi.addEventListener("load", () =>
         {
           let responseXhrLohceApi = JSON.parse(xhrLohceApi.responseText);
           console.log(responseXhrLohceApi);
           if(whatView === "InscriptionView")
            {
              if(responseXhrLohceApi.status === "SUCCESS" || responseXhrLohceApi.message === "USER_CREATION_SUCCESS")
               {
                 let dataUser = JSON.parse(data);
                 delete dataUser.password_user;
                 delete dataUser.api_request;
                 delete dataUser.api_from;
                 dataUser = JSON.stringify(dataUser);
                 localStorage.setItem("storeUserInfos", dataUser);
                 // On appele la vue ou on entrera le code secret
                 require("./codeGenerator.js")(userPhoneNumber);
               }
              else if(responseXhrLohceApi.status === "FAILED" && responseXhrLohceApi.message === "USER_CREATION_FAILED")
               {
                 let textError = plateformeLanguage === "fr-FR" ? "Erreur lors de la creation de l'inscription" : "User account not created";
                 window.plugins.toast.showShortCenter(textError);
               }
              else if(responseXhrLohceApi.status === "FAILED" && responseXhrLohceApi.message === "PHONE_ALREADY_USED")
               {
                 let textError = plateformeLanguage === "fr-FR" ? "Numéro de telephone deja utilisé veuillez vous connecter" : "Phone number already used please login";
                 window.plugins.toast.showShortCenter(textError);
               }
            }
          else if(whatView === "VerificationNumberView")
           {
              if(responseXhrLohceApi.status === "SUCCESS" && responseXhrLohceApi.message === "USER_CHECK_SUCCESS")
               {
                 // J'utilise ce localStorage pour faire en sorte que la vue verificationNumber.js ne s'ouvre plus d'une fois quand on a renvoyé le code
                 if(localStorage.getItem("blockShowVerificationViewAgain") === null)
                  {
                    let verificationNumber = require("../views/verificationNumber.js");
                        verificationNumber.create();
                  }
               }
           }
         });
        xhrLohceApi.addEventListener("error", (e) =>
         {
             // a remplacer par une snackbar
             let textError = plateformeLanguage === "fr-FR" ? "Pas de connexion internet" : "No network access";
             window.plugins.toast.showShortCenter(textError);
         });
       xhrLohceApi.responseType = "text";
       xhrLohceApi.open('POST',url, true);
       xhrLohceApi.send(data);
 };
