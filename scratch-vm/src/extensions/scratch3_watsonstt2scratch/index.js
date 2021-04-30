const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEbElEQVRYR8WYXUwUVxTH/7C7VWpbxBI3hKYkWw08lEQDxrhtUxXbREFtC6ZNjPXbtITWh7772Me+tk/Vhzax3T6QoNRKIdgEd1lRIlINCQmIWGEFl4XwvextzmXv9O7snZndnYHOE3vnzJnf/M/XveRhba87AKoNXnELwF6r1+dZGeR4n4nnrrd2wustSXEzOjqCj45+IK8ZcjgNyMGOHK3HpUvfZvRtF78+j66uv8h2BYBb/5CTgByu5+6AKVh1VbnShtaTVwqTU4BaSM0ACcLn24ZfA9eVH6GCdAKQw0UiMTDG4PVutlTRTOIkpBZuRwAJTlxvV5YjMj7mBCRnswuoqSersnVroSWgUS6Sn/PnjqO3t4fzOQIoQqwPXWlpMYKhfmVEa/bvRiw2pfyQ4eFRNNTX2AYcA+A9fOw0WgKXOYQcavpNSjY2XsSZs41ZQyZzscOOguzQJyfgcq22LoL88fJPqKs9nAJDkKSix+PJqC8Ko2AwhK+aTtrKQUbqyRdB6lUUSlr1R7L77NMjGBwc4GEfGnqCYw0HnAWkNnPttys5Q8qFsyaApMLQ4EP093bnDEk+WIJh+PGo8wqKcN9suYrFhXlDyFB3P9xu45wk9eiyHeLa+s+Rn+9SJr9RZYucbGr6BqdOX1A+S4ATE+P48ovjtnJwEcBL+kLRF41Rj6Tqdrlc6A4/TIMU+QfgF1tthjybAYr2YwZJ9+QKl8NrZ5Kw3Xs/RHfnTWwp9uKdfYdMe9yN5p+xvLxkmJMCMhqNYWpqGj98/x3a21tzniRsw8YCVL27j0Pd/rPVUkWyGxx4gEd9PUrI8oq3EH0xgUCgjU9fKg6xT8g2xHxz4D/wn2IEmEmoVyVmaAlcQXPzNfj976Wo/njkGXZVV8hrWe9m0uCEt+wgV8eiyMtYbAax6Vn+286G9R8AJbJy+qTLFVIUiJ0tfxmAYQJ6tbAIlbv2GBaEgKQNxJ6agygqLNbZMkxGI9qasE8uUITy9c4zyUFtU0Ch8dccNN1Gzs7GcD/Ypb2Hqt3lTj2sJRIrCHX8kZZvqi+3AmR1DaeQJ+1rOaRUJLJTguOlsMLQF75Nf8ZVR8nkM1EAWwzDkbxhBshKSstQ7d+f4mNhYR5tLVfTIAXco3s9WFqkIWNrSmnvNALkFWs0JWRI2mLNzU1zh1JorSJjJZwpoCmc7JnCvemV17CtsnJN4FRhyBhuMjrOWXWV6JhyQgjZYR0dLayGPz0o4CTA53RGyjhuWRjKgGlnDJUfAUe5F2z/nUx8tJHO4p1ZmQpA5vZ4EF9eNh38Am6g7x4mI3TqdKZSzYgJkL3p2443fNsR7mxDPK6GVOSc4/lm1KiZ3HhDHTeQSCQ0JWdmprAU531NLoh1gRMhYjv976Pg5U0pH/B6kVdVDOsSVhlEy0Ea7vJIC99q4zlJ6kqtZN2UU7UZJiDF2Pr7TpjnJICPATRnVX4OGesVYRU7qrChYCPGR0Yw9pSfT9ddNVWI5TXt37n/NxxB/Qvq4fCXEnc2qwAAAABJRU5ErkJggg==';
const recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');
const fetch = require("node-fetch");
// const TOKENJSON_URL = 'https://test.scratch.10botics.com/wt.json';
const TOKENJSON_URL = 'http://localhost:30000/WatsonToken.json';
var token= {
            clear: true,
            decodeStrings: false,
            format: true,
            hesitation: "",
            model: "en-US_BroadbandModel",
            objectMode: true,
            property: null,
            smartFormatting: true,
           };

const AvailableLocales = ['en', 'ja', 'zh-cn', 'zh-tw'];
const Message = {
    mandarin : {
        'zh-cn': "普通話",
        'zh-tw': "普通話",
        'ja': "普通話",
        'en': "Mandarin"
    },
    english : {
        'zh-cn': "英語",
        'zh-tw': "英語",
        'ja': "英語",
        'en': "Englihsh"
    },
    match_speech: {
        'zh-cn': "當我聽見 [SPEECH]",
        'zh-tw': "當我聽見 [SPEECH]",
        'ja': '[SPEECH]を聞いたとき',
        'en': 'When I hear [SPEECH]'
    },
    select_language : {
        'zh-cn': "選擇語言: [LANG]",
        'zh-tw': "選擇語言: [LANG]",
        'ja': "選擇語言: [LANG]",
        'en': 'Select Language [LANG]'
    },
    start_recognition: {
        'zh-cn': "語音識別 開始",
        'zh-tw': "語音識別 開始",
        'ja': "語音識別 開始",
        'en': 'Start Recognition'
    },
    stop_recognition: {
        'zh-cn': "語音識別 結束",
        'zh-tw': "語音識別 結束",
        'ja': "語音識別 結束",
        'en': 'Stop Recognition'
    },
    get_speech: {
        'zh-cn': "文字",
        'zh-tw': "文字",
        'ja': "文字",
        'en': 'Speech'
    },
}

class Scratch3WatsonSTT2Scratch {
    get LANGUAGE_MENU () {
        return [
            {
              text: Message.english[this._locale],
              value: 'english'
            },
            {
              text: Message.mandarin[this._locale],
              value: 'mandarin'
            }
        ]
      }

    constructor (runtime) {
        this.runtime = runtime;
        this.speech = '';
        this.language = 'english'
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
        this._locale = this.setLocale();
        return {
            id: 'watsonstt2scratch',
            name: 'Speech Recognition',
            color1: "#B8397D",
            color2: "#2B54AB",
            blockIconURI: blockIconURI,
            blocks: [

                {
                    opcode: 'matchSpeech',
                    blockType: BlockType.HAT,
                    text: Message.match_speech[this._locale],
                    arguments: {
                        SPEECH: {
                                type: ArgumentType.STRING,
                                defaultValue: 'hello'
                        }
                    }         
                },

                {
                    opcode: 'selectLanguage',
                    blockType: BlockType.COMMAND,
                    text: Message.select_language[this._locale],
                    arguments: {
                        LANG: {
                            type: ArgumentType.STRING,
                            menu: 'languageMenu',
                            defaultValue: 'english'
                        }
                    }
                },

                {
                    opcode: 'startRecognition',
                    blockType: BlockType.COMMAND,
                    text: Message.start_recognition[this._locale]
                },

                {
                    opcode: 'stopRecognition',
                    blockType: BlockType.COMMAND,
                    text: Message.stop_recognition[this._locale]
                },

                {
                    opcode: 'getSpeech',
                    blockType: BlockType.REPORTER,
                    text: Message.get_speech[this._locale]
                }


            ],
            menus: {
                languageMenu: {
                    acceptReporters: true,
                    items: this.LANGUAGE_MENU
                }
            }
        };
    }
    matchSpeech(args) {
        let target = args.SPEECH.toLowerCase().match(/([^"\s?.',\!\=]+)/g);
        // console.log(target);
        let speech  = this.speech.toLowerCase().match(/([^"\s?.',\!\=]+)/g);
        // console.log(speech);
        return this.containsAllSubstrings(speech, target)
    }

    selectLanguage (args) {
        // Allowable values: [ar-AR_BroadbandModel,ar-MS_BroadbandModel,ar-MS_Telephony,de-DE_BroadbandModel,de-DE_NarrowbandModel,de-DE_Telephony,en-AU_BroadbandModel,en-AU_NarrowbandModel,en-AU_Telephony,en-GB_BroadbandModel,en-GB_NarrowbandModel,en-GB_Telephony,en-US_BroadbandModel,en-US_Multimedia,en-US_NarrowbandModel,en-US_ShortForm_NarrowbandModel,en-US_Telephony,es-AR_BroadbandModel,es-AR_NarrowbandModel,es-CL_BroadbandModel,es-CL_NarrowbandModel,es-CO_BroadbandModel,es-CO_NarrowbandModel,es-ES_BroadbandModel,es-ES_NarrowbandModel,es-ES_Telephony,es-MX_BroadbandModel,es-MX_NarrowbandModel,es-PE_BroadbandModel,es-PE_NarrowbandModel,fr-CA_BroadbandModel,fr-CA_NarrowbandModel,fr-CA_Telephony,fr-FR_BroadbandModel,fr-FR_NarrowbandModel,fr-FR_Telephony,it-IT_BroadbandModel,it-IT_NarrowbandModel,it-IT_Telephony,ja-JP_BroadbandModel,ja-JP_NarrowbandModel,ko-KR_BroadbandModel,ko-KR_NarrowbandModel,nl-NL_BroadbandModel,nl-NL_NarrowbandModel,pt-BR_BroadbandModel,pt-BR_NarrowbandModel,pt-BR_Telephony,zh-CN_BroadbandModel,zh-CN_NarrowbandModel]
        this.language = args.LANG;
        if (this.language === 'english') {
            Object.assign(token, {model: "en-US_BroadbandModel"});
        } else if (this.language === 'mandarin') {
            Object.assign(token, {model: "zh-CN_BroadbandModel"});
        }
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

    setLocale() {
        let locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
          return locale;
        } else {
          return 'en';
        }
    }

    //utility function----------------------------------
    containsAllSubstrings(str, substrings) {
        // reference---https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
        // Dharmang, Jim Blackler
        // str : a list containing words of a sentence
        // substrings: a list of substrings
        if (str) {
            for (var i = 0; i != substrings.length; i++) {
                var substring = substrings[i];
                if (str.indexOf(substring) === -1) {
                    return false;
                }
                }
                return true; 
        } else {
            return false;
        }

    }
}
module.exports = Scratch3WatsonSTT2Scratch;
