export class Word{
  constructor(){
    this.nativeLanguage; //english
    this.targetLanguage; //korean
    this.originalWord;
    this.translation; //word translated
    this.definition; //definition in native language
    this.image;
  }

  setNativeLanguage(nativeLanguage){
    this.nativeLanguage = nativeLanguage;
  }

  setTargetLanguage(targetLanguage){
    this.targetLanguage = targetLanguage;
  }

  setTranslation(translation){
    this.translation = translation;
  }

  setDefinition(definition){
    this.definition = definition;
  }

  setOriginalWord(originalWord){
    this.originalWord = originalWord;
  }

  setImage(image){
    this.image = image; //not quite sure if this is correct, or what format this should be
  }

  getTranslation(){
    let originalWord = this.originalWord;
    let q = this.originalWord;
    let target = this.targetLanguage;
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url =`https://translation.googleapis.com/language/translate/v2?target=${target}&q=${q}&key=${process.env.API_KEY}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if(this.status === 200) {
          resolve([response, originalWord]);
        } else {
          reject([this, response, originalWord]); 
        }
      });
      request.open("GET", url, true);
      request.send();
    });
    return promise;
  }
}

