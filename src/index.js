import {Word} from "./js/Word.js";

function handleFormSubmit(){
  let inputNativeLang = document.getElementById("nativeLanguage").value;
  let inputTargetLang = document.getElementById("targetLanguage").value;
  let inputWord = document.getElementById("inputWord").value;

  let myWord = new Word();
  myWord.setNativeLanguage(inputNativeLang);
  myWord.setTargetLanguage(inputTargetLang);
  myWord.setOriginalWord(inputWord);
  myWord.getTranslation().then(function(response) { //calls the language api to translate the word
    let myResponse = response[0].data.translations[0].translatedText;
    document.getElementById("wordOutput").innerText = myResponse;

  }, function(errorMessage) { //put if it fails here
    console.log(errorMessage);
  });
}


document.getElementById("setWord").addEventListener("submit" ,function(event){
  event.preventDefault();
  handleFormSubmit();
});



