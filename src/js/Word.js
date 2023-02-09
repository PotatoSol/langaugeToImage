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
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.rapidAPI,
        'X-RapidAPI-Host': process.env.rapidHost
      }
    };
    
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${this.originalWord}/`, options)
      .then(response => response.json())
      .then(response => document.getElementById("defOutput").innerText = response.results[0].definition)
      .catch(err => console.error(err));
  }
}
