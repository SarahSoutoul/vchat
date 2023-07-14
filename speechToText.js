const sdk = require('microsoft-cognitiveservices-speech-sdk');

const speechToText = (subscriptionKey, region, wavFile) => {
    return new Promise((resolve, reject) => {
      const audioConfig = sdk.AudioConfig.fromWavFileInput(wavFile);
      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  
      let completeTranscription = '';
  
      recognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          completeTranscription += e.result.text + " ";
        }
      };
  
      recognizer.speechEndDetected = (s, e) => {
        recognizer.stopContinuousRecognitionAsync(() => {
          recognizer.close();
          resolve(completeTranscription);
        }, (err) => {
          recognizer.close();
          reject(err);
        });
      };
  
      recognizer.startContinuousRecognitionAsync();
    });
  };
  
module.exports = speechToText;
  