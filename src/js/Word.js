export class Word{
  constructor(){
    this.nativeLanguage; //native
    this.targetLanguage; //target
    this.originalWord; //original word
    this.translation; //word translated
  }

  async generatePhotos(){ //generate a picture from an api call
    let query = this.originalWord;
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=1`, 
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
  }

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
    this.generatePhotos();
    this.getDefinition();
    return promise;
  }

  getDefinition(){
    let definitionResponse = fetch(`https://api.dictionaryapi.dev/api/v2/entries/${this.nativeLanguage}/${this.originalWord}`)
    .then(function(response){
      console.log("hello :3", response);
    });
  }
}

