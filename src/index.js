import {Word} from "./js/Word.js";
import "./css/styles.css";

function handleFormSubmit(){
  let myWord = new Word();
  myWord.nativeLanguage = document.getElementById("nativeLanguage").value;
  myWord.targetLanguage = document.getElementById("targetLanguage").value;
  myWord.originalWord = document.getElementById("inputWord").value;

  myWord.getTranslation().then(function(response) { //calls the language api to translate the word
    let myResponse = response[0].data.translations[0].translatedText;
    document.getElementById("wordOutput").innerText = "{ " + myWord.originalWord + " } | { " + myResponse + " } ";
  }, function(errorMessage) { //put if it fails here
    console.log(errorMessage);
  });
}

document.getElementById("setWord").addEventListener("submit" ,function(event){
  event.preventDefault();
  handleFormSubmit();
});



