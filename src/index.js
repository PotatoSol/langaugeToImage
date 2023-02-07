import {Word} from "./js/Word.js";

/*
console.log('hello');
let myWord = new Word();
myWord.originalWord = "hello";
myWord.targetLanguage = "ko";
console.log(myWord.getTranslation());
console.log(myWord.translation);
console.log('end');
myWord.setNativeLanguage('ko');
*/


function handleFormSubmit(){
  let inputNativeLang = document.getElementById("nativeLanguage").value;
  let inputTargetLang = document.getElementById("targetLanguage").value;
  let inputWord = document.getElementById("inputWord").value;

  let myWord = new Word();
  myWord.setNativeLanguage(inputNativeLang);
  myWord.setTargetLanguage(inputTargetLang);
  myWord.setOriginalWord(inputWord);
  //this will return a promise then call .then on that and print directly onto the html
  
  myWord.getTranslation().then(function(response) {
    //do thing
    document.getElementById("wordOutput").innerText = response[0].data.translations[0].translatedText;
    //this.setTranslation(response[0].data.translations[0].translatedText);
  }, function(errorMessage) {
    //do fail
    console.log(errorMessage);
  });
  /*
  console.log(process.env.API_KEY);
  console.log('below this line');
  console.log('translation', myWord.translation);

  console.log(inputNativeLang);
  console.log(inputTargetLang);
  console.log(inputWord);
  console.log(myWord);
  */
}

document.getElementById("setWord").addEventListener("submit" ,function(event){
  event.preventDefault();
  handleFormSubmit();
});