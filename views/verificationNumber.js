exports.create = () =>
 {
    const plateformeLanguage = tabris.device.get("language");
    localStorage.setItem("blockShowVerificationViewAgain", "blocked");
    let phoneNumber = JSON.parse(localStorage.getItem("storeUserInfos"));
        phoneNumber = phoneNumber.phone_user;
        phoneNumber = phoneNumber.substr(5);
    const themeColor = "#0081cc";
    let createNavigationView;
    let returnNavigationView = require("../helpers/navigationViewAnimation")(createNavigationView,true);
    let pageVerifNumber = new tabris.Page({
        title: plateformeLanguage === "fr-FR" ? "Verification du numéro " : "Verifying your phone number",
        background:`#fafafa`
     }).on("dispose", function()
      {
         require("../modules/animations.js")(this,"zoomOut");
      }).appendTo(returnNavigationView);

     let fontStyle = "16px roboto, noto";

     let introText = new tabris.TextView({
       layoutData:
          {
            top:15,
            right:"10%",
            left:"10%"
          },
       font:fontStyle,
       text: plateformeLanguage === "fr-FR" ? `Nous vous avons envoyé un code de verification au numéro ${phoneNumber}` : `We have sent you a verification code to the number ${phoneNumber}`,
       textColor:"#212121",
      }).appendTo(pageVerifNumber);

    let codeInput = new tabris.TextInput({
        layoutData:
         {
           top:["prev()", 30],
           left:"10%",
           right:"10%",
         },
     font:fontStyle,
     message: plateformeLanguage === "fr-FR" ? "Entrez le code" : "Enter the code",
     keyboard:"number",
     borderColor:themeColor
    }).appendTo(pageVerifNumber);

let button = new tabris.Button({
     layoutData:
       {
         top:["prev()", 40],
         left:"10%",
         right:"10%"
       },
     font:fontStyle,
     textColor:"#fff",
     text: plateformeLanguage === "fr-FR" ? "Continuer" : "Continue",
     background:themeColor,
     id:"buttonToSubmit"
   }).on("select", () =>
      {
        let codeInputValue = codeInput.text;
        lsCheckCode = localStorage.getItem("codeVerification");
        if(codeInputValue === "")
         {
           let textInfo = plateformeLanguage === "fr-FR" ? "Veuillez entrer le code" : "Please enter code";
           window.plugins.toast.showShortBottom(textInfo);
         }
        else if(codeInputValue.length !== 5)
         {
           let textInfo = plateformeLanguage === "fr-FR" ? "Veuillez entrer un code a 5 chiffres" : "Please enter a 5 digit code";
           window.plugins.toast.showShortBottom(textInfo);
         }
        else if(String(codeInputValue) !== lsCheckCode)
         {
           let textInfo = plateformeLanguage === "fr-FR" ? "Le code que vous avez entré ne correspond pas" : "The code you entered does not match";
           window.plugins.toast.showShortBottom(textInfo);
         }
        else if(String(codeInputValue) === lsCheckCode)
         {
           require("./connexion.js")();
         }
          // pageVerifNumber.dispose();

      }).appendTo(pageVerifNumber);

 function resendCode()
  {
     let counter = 90;
     let textToResend = new tabris.TextView({
         top:["#buttonToSubmit", 20],centerX:0,
         text: plateformeLanguage === "fr-FR" ? "renvoyer un code dans:" : "Return a code in:",
         font:fontStyle,
         textColor:"#757575"
     }).appendTo(pageVerifNumber);

     let secondCount = new tabris.TextView({
         top:["#buttonToSubmit", 20],left:["prev()",3],
         text: `${counter}s`,
         font:fontStyle,
         textColor:"#757575"
     }).appendTo(pageVerifNumber);

     let secondCountToTheEnd = setInterval(() =>
         {
           secondCount.text = `${counter--}s`;
           if(counter === 0)
            {
              secondCount.dispose();
              textToResend.text = plateformeLanguage === "fr-FR" ? "Renvoyer le code" : "Return the code";
              clearInterval(secondCountToTheEnd);
              textToResend.on("tap", () =>
               {
                 if(textToResend.text === "Renvoyer le code" || textToResend.text === "Return the code")
                  {
                    // Fonction de renvoi de code
                    require("../modules/codeGenerator.js")(phoneNumber);
                    textToResend.dispose();
                    resendCode();
                  }
                 else
                  {
                    return false;
                  }

               });
            }
         },1000);
  }
  resendCode();

  return returnNavigationView;
};
