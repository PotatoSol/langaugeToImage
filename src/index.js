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
    let myResponse = response[0].data.translations[0].translatedText;
    document.getElementById("wordOutput").innerText = myResponse;
    fetch(`https://serpapi.com/search.json?q=${myWord.originalWord}&tbm=isch&ijn=0`).then(function(response) {
      console.log(response);
    });
    let myPic = `https://serpapi.com/search.json?q=${myWord.originalWord}&tbm=isch&ijn=0`;
    console.log(myPic);
    let img = document.createElement("img");
    img.setAttribute("src", myPic);
    document.getElementById("wordOutput").append(document.createElement("br"));
    document.getElementById("wordOutput").append(img);
    //https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0
    //this.setTranslation(response[0].data.translations[0].translatedText);

  }, function(errorMessage) {
    //do fail
    console.log(errorMessage);
  });
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


document.getElementById("setWord").addEventListener("submit" ,function(event){
  event.preventDefault();
  handleFormSubmit();
});