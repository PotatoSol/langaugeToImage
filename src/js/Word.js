class Word{
  constructor(){
    this.nativeLanguage;
    this.targetLanguage;
    this.wordInTargetLanguage; 
    this.definition; //definition in native language
    this.image;
  }

  setNativeLanguage(nativeLanguage){
    this.nativeLanguage = nativeLanguage;
  }

  setTargetLanguage(targetLanguage){
    this.targetLanguage = targetLanguage;
  }

  setWordInTargetLanguage(wordInTargetLanguage){
    this.wordInTargetLanguage = wordInTargetLanguage;
  }

  setDefinition(definition){
    this.definition = definition;
  }

  setImage(image){
    this.image = image; //not quite sure if this is correct, or what format this should be
  }
  
}