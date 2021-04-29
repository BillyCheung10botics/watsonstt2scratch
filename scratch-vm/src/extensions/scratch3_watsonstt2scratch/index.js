const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const blockIconURI = 'data:image/png;base64,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';
const recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');
const fetch = require("node-fetch");

const TOKENJSON_URL = 'http://localhost:30000/WatsonToken.json';
var token= {
            clear: true,
            decodeStrings: false,
            format: true,
            hesitation: "",
            model: "",
            objectMode: true,
            property: null,
            smartFormatting: true,
           };

class Scratch3WatsonSTT2Scratch {
    constructor (runtime) {
        this.runtime = runtime;
        this.speech = '';
        fetch(TOKENJSON_URL)
        .then(res => res.json())
        .then(data => {
            // console.log("fetched.....")
            const SPEECH_TO_TEXT_URL = data.SPEECH_TO_TEXT_URL;
            const SPEECH_TO_TEXT_TOKEN = data.SPEECH_TO_TEXT_TOKEN;
            Object.assign(token, {accessToken: SPEECH_TO_TEXT_TOKEN, url: SPEECH_TO_TEXT_URL});
            // console.log(token);
            this.stream = recognizeMic(token);
            this.stream.stop();
        });

    }

    getInfo () {
        return {
            id: 'watsonstt2scratch',
            name: 'Speech Recognition',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'startRecognition',
                    blockType: BlockType.COMMAND,
                    text: 'Recognition Start'
                },

                {
                    opcode: 'stopRecognition',
                    blockType: BlockType.COMMAND,
                    text: 'Recognition Stop'
                },

                {
                    opcode: 'getSpeech',
                    blockType: BlockType.REPORTER,
                    text: 'Speech'
                }
            ],
            menus: {
            }
        };
    }

    startRecognition () {
        fetch(TOKENJSON_URL)
        .then(res => res.json())
        .then(data => {
            // console.log("fetched.....")
            const stturl = data.SPEECH_TO_TEXT_URL;
            const stttoken = data.SPEECH_TO_TEXT_TOKEN;
            Object.assign(token, {accessToken: stttoken, url: stturl});
            this.stream = recognizeMic(token);
            var thisthis = this;
            this.stream.on('data', function(data) {
                // const resultIndex = data.result_index;
                // const text = data.results[0].alternatives[0].transcript;
                thisthis.speech = data.results[0].alternatives[0].transcript;
                console.log(thisthis.speech);
                // console.log(data);
                // console.log(`Reg no.${resultIndex} Text:${text}`);
            });
        
            this.stream.on('error', function(err) {
                console.log(err);
            });
        });
    }

    stopRecognition () {
        this.stream.stop();
    }

    getSpeech() {
        return this.speech;
    }
}
module.exports = Scratch3WatsonSTT2Scratch;
