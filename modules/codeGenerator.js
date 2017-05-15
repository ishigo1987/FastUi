module.exports = (phoneToSendCode) =>
 {
    "use strict";
    let generateNumber = new Uint16Array(1);
    window.crypto.getRandomValues(generateNumber);
    let codeVerification = generateNumber[0];
    let dataToSend =
     {
       phone_user: phoneToSendCode,
       private_message: `Votre code de vérification: ${codeVerification}`,
       api_request: "user_check_request",
       api_from:phoneToSendCode
     }
    dataToSend = JSON.stringify(dataToSend);
    localStorage.setItem("checkCode", codeVerification)
    // On lance une requete ajax a l'api lohce et on appele la vue de verification de numéro de telephone
    require("./ajax.js")(dataToSend,"VerificationNumberView",phoneToSendCode);
    // le parametre isResendCode me sert a savoir si c'est une demande de renvoi de code comme ca charge plus le module de verification de numéro
 };
