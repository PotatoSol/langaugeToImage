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
//copy
  async CuratedPhotos(page_num){
    // fetch the data from api
    let query = this.originalWord;
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.pexelsAPI,     //use the apikey you have generated
        },
    });
    const response=await data.json();   //convert the response to json 
    let myImg = document.createElement("img");
    console.log(response.photos[0].src.medium);
    myImg.setAttribute("src", response.photos[0].src.medium);
    while(document.getElementById("picOutput").firstChild){
      document.getElementById("picOutput").removeChild(document.getElementById("picOutput").firstChild);
    }
    document.getElementById("picOutput").append(myImg);


    //display_images(response);   // call the display_images method to display the images on page
}
//paste


  getTranslation(){
    let originalWord = this.originalWord;
    let q = this.originalWord;
    let target = this.targetLanguage;
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url =`https://translation.googleapis.com/language/translate/v2?target=${target}&q=${q}&key=${process.env.googleAPI}`;
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
    this.CuratedPhotos(1);
    return promise;
  }
}

