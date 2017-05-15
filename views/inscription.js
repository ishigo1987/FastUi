exports.create = () =>
 {
   "use strict";

   const plateformeLanguage = tabris.device.get("language");
   const themeColor = "#0081cc";
   const fontStyle = "16px roboto, noto";
   let inscriptionView = new tabris.Page({
      title:plateformeLanguage === "fr-FR" ? "S'inscrire" : "Subscribe",
      background:`#fafafa`,
      opacity:1
    }).on("dispose", function()
     {
        require("../modules/animations.js")(this,"zoomOut");
     });

// La variable layoutProperties est utilisé pour ne pas avoir a chaque fois réecrire tout le layout
 const layoutProperties =
  {
    top:["prev()", 20],
    left:"10%",
    right:"10%"
  }
 let sexSelectionFr = [
  {
    genre1:"Masculin",
    genre2:"Feminin"
  }];
  let sexSelectionEn = [
   {
     genre1:"Male",
     genre2:"Female"
   }];
   let languageSelection = [
    {
      lang1:"English",
      lang2:"French"
    }];
 // let sexSelectionFr = ["Masculin", "Feminin"];
 // let languageSelectionEn = ["English", "French"];
 // let sexSelectionEn = ["Male", "Female"];
 let scrollView = new tabris.ScrollView({
     left:0,
     right:0,
     top:0,
     background: "#fafafa",
}).appendTo(inscriptionView);

 let firstText = new tabris.TextView({
    layoutData:
     {
       top:15,
       centerX:0
     },
    font: "bold 20px roboto, noto",
    text: plateformeLanguage === "fr-FR" ? "Pas encore inscrit?" : "Not registered?",
    textColor:"#212121",
    }).appendTo(scrollView);

 let secondText = new tabris.TextView({
    layoutData:
     {
       top:["prev()", 10],
       centerX:0
     },
    font: "14px roboto, noto",
    text: plateformeLanguage === "fr-FR" ? "Créez votre compte en une minute" : "Create your account in one minute",
    textColor:"#757575",
    }).appendTo(scrollView);

let userName = new tabris.TextInput({
    layoutData:layoutProperties,
    font: fontStyle,
    message: plateformeLanguage === "fr-FR" ? "Entrez votre nom" : "Enter your name",
    borderColor:themeColor
}).appendTo(scrollView);

let userSurname = new tabris.TextInput({
    layoutData:layoutProperties,
    font: fontStyle,
    message: plateformeLanguage === "fr-FR" ? "Entrez votre prenom" : "Enter your surname",
    borderColor:themeColor
}).appendTo(scrollView);

let pickerLanguage = new tabris.Picker({
    layoutData:layoutProperties,
    font: fontStyle,
    itemCount: languageSelection.length,
    items: plateformeLanguage === "fr-FR" ? languageSelection.lang2 : languageSelection.lang1,
    // selection: plateformeLanguage === "fr-FR" ? languageSelectionFr[1] : languageSelectionEn[0],
    selectionIndex:2
    itemText: (index) =>
    borderColor:themeColor
}).appendTo(scrollView);

let email = new tabris.TextInput({
    layoutData:layoutProperties,
    font: fontStyle,
    message: plateformeLanguage === "fr-FR" ? "Entrez votre adresse mail" : "Enter your email address",
    keyboard:"email",
    borderColor:themeColor
 }).appendTo(scrollView);

let pickerSex = new tabris.Picker({
    layoutData:layoutProperties,
    font:fontStyle,
    items: plateformeLanguage === "fr-FR" ? sexSelectionFr : sexSelectionEn,
    selection: plateformeLanguage === "fr-FR" ? sexSelectionFr[0] : sexSelectionEn[0],
    borderColor:themeColor
}).appendTo(scrollView);

let phoneNumber = new tabris.TextInput({
    layoutData:layoutProperties,
    font: fontStyle,
    message: plateformeLanguage === "fr-FR" ? "Entrez votre numero de telephone" : "Enter your phone number",
    keyboard:"phone",
    borderColor:themeColor
 }).appendTo(scrollView);

let password = new tabris.TextInput({
      layoutData:layoutProperties,
     font: fontStyle,
     message: plateformeLanguage === "fr-FR" ? "Entrez votre mot de passe" : "Enter your password",
     type:"password",
     borderColor:themeColor
    }).appendTo(scrollView);

let confirmPassword = new tabris.TextInput({
      layoutData:layoutProperties,
     font:fontStyle,
     message:plateformeLanguage === "fr-FR" ? "Confirmez votre mot de passe" : "Confirm your password",
     type:"password",
     borderColor:themeColor
    }).appendTo(scrollView);

let button = new tabris.Button({
     layoutData:
       {
         top:["prev()", 20],
         left:"10%",
         right:"10%"
       },
     font: fontStyle,
     textColor:"#fff",
     text: plateformeLanguage === "fr-FR" ? "S'inscrire" : "Subscribe",
     background:themeColor,
     height:50
   }).on("select", () =>
    {
       //On teste que les champs ne sont pas vides
       let textInfo;
       const userNameValue = userName.text;
       const userSurnameValue = userSurname.text;
       let pickerLanguageValue = pickerLanguage.selection;
       const emailValue = email.text;
       let pickerSexValue = pickerSex.selection;
       let phoneNumberValue = phoneNumber.text;
       const passwordValue = password.text;
       const confirmPasswordValue = confirmPassword.text;
       const regexMail =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
       if(userNameValue === "" || userSurnameValue === "" || emailValue === "" || phoneNumberValue === "" || passwordValue === "" || confirmPasswordValue === "")
        {
           textInfo = plateformeLanguage === "fr-FR" ? "Veuillez remplir tout les champs" : "Please complete all fields";
            window.plugins.toast.showShortCenter(textInfo);
        }
       else if(!regexMail.test(emailValue))
        {
           textInfo = plateformeLanguage === "fr-FR" ? "Veuillez entrer une adresse mail valide" : "Please enter a valid email address";
            window.plugins.toast.showShortCenter(textInfo);
        }
       else if(passwordValue !== confirmPasswordValue)
        {
            textInfo = plateformeLanguage === "fr-FR" ? "Les champs de mot de passe ne correspondent pas" : "Password fields do not match";
            window.plugins.toast.showShortCenter(textInfo);
        }
      else if(phoneNumberValue.length !== 9)
       {
         textInfo = plateformeLanguage === "fr-FR" ? "Veuillez entrer un numéro a 9 chiffres et sans l'indicatif" : "Please enter a 9 digit number and without the indicative";
         window.plugins.toast.showShortCenter(textInfo);
       }
       else
        {
          if(pickerLanguageValue === "Francais" || pickerLanguageValue === "French")
           {
             pickerLanguageValue = "fr";
           }
          else if(pickerLanguageValue === "Anglais" || pickerLanguageValue === "English")
           {
             pickerLanguageValue = "en";
           }
          if(pickerSexValue === "Masculin" || pickerSexValue === "Male")
           {
             pickerSexValue = "m";
           }
          else if(pickerSexValue === "Feminin" || pickerSexValue === "Female")
           {
             pickerSexValue = "f";
           }
          phoneNumberValue = `00237${phoneNumberValue}`;
          let dataUser =
            {
              name_user:userNameValue,
              surname_user:userSurnameValue,
              language_user: pickerLanguageValue,
              email_user:emailValue,
              password_user:passwordValue,
              sexe_user: pickerSexValue,
              phone_user:phoneNumberValue,
              api_request:"user_creation_request",
              api_from:phoneNumberValue
            }
           dataUser = JSON.stringify(dataUser);
           // On lance le module de requete ajax pour envoyer le formulaire d'inscription a l'api de lohce
           require("../modules/ajax.js")(dataUser,"InscriptionView",phoneNumberValue);
        }
    }).appendTo(scrollView);

  return inscriptionView;
 };
