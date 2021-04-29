# WatsonSTT2Scratch

*Read this in other languages: [English](README.md).*

WatsonSTT2Scratch allows speech recognition with IBM Watson in Scratch 3. 
This scratch extension is inspired by [champierre](https://github.com/champierre/speech2scratch) and [IBM Watson STT](https://cloud.ibm.com/apidocs/speech-to-text).

The following browsers are supported, 
1. Chrome (tested on version 90.0.4430.93)
2. Safari (tested on version 14.0.3)
3. Firefox (tested on version 86.0.1 )
you are welcome to report your tests on other platforms to billy.cheung@10botics.com.

This repository is under development (29/04/2021)
## How to use

### Speech recognition
TO DO


## For Developers - How to run WatsonSTT2Scratch extension on your computer

1. Setup LLK/scratch-gui on your computer.

    ```
    % git clone https://github.com/LLK/scratch-gui
    % cd scratch-gui
    % npm install
    ```

2. In scratch-gui folder, clone WatsonSTT2Scratch. You will have a watsonstt2scratch folder under scratch-gui.

    ```
    % git clone https://github.com/BillyCheung10botics/watsonstt2scratch
    ```

3. Run the install script with your json url containing watson token (for example, http://localhost:30000/WatsonToken.json of the below command). To generate a token url with IBM Iam API, please refer to https://github.com/BillyCheung10botics/watson_token_generator .

    ```
    % sh watsonstt2scratch/install.sh "http://localhost:30000/WatsonToken.json"
    ```

4.  Modify the `webpack.config.js` to allow https server, add the following code to line 23.
    ```
    https: true
    ```
5. Run Scratch, then go to https://localhost:8601/.

    ```
    % npm start --https
    ```

### Demo & Links
TO DO
