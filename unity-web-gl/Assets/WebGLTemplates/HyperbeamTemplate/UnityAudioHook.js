class UnityAudioHook extends AudioWorkletProcessor {
    unityRef;
    gameObject;
    sampleRate;
    // This is how many seconds of available buffer space to keep on hand.
    // This helps to avoid race conditions where we're rewriting a buffer while unity 
    // is using that same buffer to populate audio data into the audio clip.
    bufferSizeSec = 1;
    
    outputBuffers = new Array();
    currentWriteableIndex = 0;
    initializedGameObject = false;


    constructor(options) {
        super();

        if (!options || !options.processorOptions) {
            throw 'Must pass in processor options';
        }

        if (!options.processorOptions.gameObject) {
            throw 'Must provide a gameobject to call OnSampleReady(float32[]) ON';
        }

        if (!options.processorOptions.sampleRate) {
            throw 'Must inform node of the correct sample rate'
        }

        if (options.processorOptions.bufferSizeSec) {
            this.bufferSizeSec = options.processorOptions.bufferSizeSec;
        }
        
        this.unityRef = window.unityInstance;
        this.gameObject = options.processorOptions.gameObject;
        this.sampleRate = options.processorOptions.sampleRate;

        this.port.onmessage = this.portMsgHandler;
    }

    process(input, output, params) {
        const channels = input[0];
        const numChannels = channels.length;
        const numSamples = channels[0].length;

        // This is the first time we get access to the number of channels, and samples in our input
        this.createOutputArrays(numChannels, numSamples);

        const outputArr = this.outputBuffers[this.currentWriteableIndex];
        var outputIndex = 0;

        if(!this.initializedGameObject) {
            // We can only send one value of a primitive type over to unity
            // so we'll send a 3 length array over to unity with our init values
            // 0 - Length, in number of samples, of the array
            // 1 - Number of channels
            // 2 - Sample Rate
            // 3 - How many audio clips to make
            const initArray = new Int32Array(4);

            // Use outputArr.length instead of numSamples because length is our final interleaved total
            // which is what unity expects.
            initArray[0] = outputArr.length;
            initArray[1] = numChannels;
            initArray[2] = this.sampleRate;

            // 1 to 1 matching on input and output buffers. This is a bit wasteful, but it keeps audio safe.
            initArray[4] = this.outputBuffers.length;

            this.unityRef.sendMessage(this.gameObject, "InitializeAudioClips", init)
            this.port.postMessage("")
        }

        // This will interleave the audio samples in the way unity expects.
        for(let i = 0; i < numSamples; i++) {
            for (let j = 0; j < numChannels; j++) {
                outputArr[outputIndex] = channels[j][i];
                outputIndex++;
            }
        }
        
        this.currentWriteableIndex++;
        if(this.currentWriteableIndex >= this.outputBuffers.length) {
            this.currentWriteableIndex = 0;
        }
        
        this.unityRef.sendMessage(this.gameObject, "OnSampleReady", outputArr);
    }

    portMsgHandler(message) {

    } 

    createOutputArrays(numChannels, numSamples) {
        if (this.outputBuffers.length > 0) {
            return;
        } 

        const totalArrays = (this.sampleRate * this.bufferSizeSec) / numSamples;
        const arrayLen = numChannels * numSamples;

        for(let i = 0; i < totalArrays; i++) {
            this.outputBuffers.push(new Float32Array(arrayLen));
        }
    }
}

registerProcessor("unity-audio-hook", UnityAudioHook);