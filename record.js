const fs = require('fs');
const recorder = require('node-record-lpcm16')
const wav = require('wav')

let recording = null
let file = null

const startRecording = () => {
    console.log('Start Recording');
    file = fs.createWriteStream('output.wav',{encoding: 'binary'})
    const writer = new wav.Writer({
        sampleRate: 16000,
        channels: 1,
    })
    recording = recorder.record({
        sampleRate: 16000,
        channels: 1,
    })
    .stream()
    .pipe(writer)
    .pipe(file)
};

const stopRecording = () => {
    console.log('Stop Recording')
    if (recording) {
        recording.end()
        recording = null
        file.end()    
    }
};

module.exports = { 
    startRecording, 
    stopRecording 
};
