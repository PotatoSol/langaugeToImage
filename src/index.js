import {Word} from "./js/Word.js";
import { getJson } from "serpapi";

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
    printImage
    /*
    let img = document.createElement("img");
    img.setAttribute("src", myWord.getImage());
    document.getElementById("wordOutput").append(document.createElement("br"));
    console.log(img.src[0]);
    document.getElementById("wordOutput").append(img);
    */
    //this.setTranslation(response[0].data.translations[0].translatedText);
  }, function(errorMessage) {
    //do fail
    console.log(errorMessage);
  });

  async function printImage(){
  const params = {
    q: myWord.originalWord,
    google_domain: "google.com",
    tbm: "isch",
    api_key: process.env.API_KEY
  };
  
  // Show result as JSON
  const response1 = await getJson("google", params);
  console.log(response1);
}


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