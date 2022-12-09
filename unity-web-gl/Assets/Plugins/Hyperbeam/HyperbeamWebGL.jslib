mergeInto(LibraryManager.library, {
    hyperbeamInstances: new Array(),

    // this will give a native texture ID that we can 
    // pass back to C# for actual rendering
    registerNativeTexture: function(glTexture) {
        var id = GL.getNewId(GL.textures);
        glTexture.name = id;
        GL.textures[id] = glTexture;

        return id;
    },

    startHyperbeam: async function(embedUrl, controllerName) {
        audioCtx = window.hyperbeamAudioCtx;

        if (window.hyperbeamInstances === null || window.hyperbeamInstances === undefined) {
            window.hyperbeamInstances = new Array();
        }

        //Create a hidden div for us to use
        const url = UTF8ToString(embedUrl);
        const controller = UTF8ToString(controllerName);

        console.log("starting hyperbeam from JSLIB");

        const div = document.createElement("div");
        div.style.display = "none";

        var hyperbeamInstance = {
            hyperbeamSdk: null,
            hyperbeamDiv: div,
            texture: null,
            textureId: null,
            texWidth: 0,
            texHeight: 0,
            source: null,
            audioCtx: null,
            controller: controller,
        }

        const newId = window.hyperbeamInstances.length;
        hyperbeamInstance.hyperbeamSdk = await window.Hyperbeam(div, url, {
            delegateKeyboard: false,
            frameCb: function (frame) {
                if (frame.constructor === HTMLVideoElement) {
                    hyperbeamInstance.texWidth = div.width = frame.videoWidth;
                    hyperbeamInstance.texHeight = div.height = frame.videoHeight;
                } else {
                    hyperbeamInstance.texWidth = div.width = frame.width;
                    hyperbeamInstance.texHeight = div.height = frame.height;
                }

                if(!hyperbeamInstance.texture) {
                    hyperbeamInstance.texture = GLctx.createTexture();
                    
                    hyperbeamInstance.textureId = GL.getNewId(GL.textures);
                    hyperbeamInstance.texture.name = hyperbeamInstance.textureId;
                    GL.textures[hyperbeamInstance.textureId] = hyperbeamInstance.texture;

                    GLctx.bindTexture(GLctx.TEXTURE_2D, hyperbeamInstance.texture);
                    GLctx.texStorage2D(GLctx.TEXTURE_2D, 1, GLctx.RGBA8, div.width, div.height);
    
                    GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_MIN_FILTER, GLctx.LINEAR);
    
                    GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_WRAP_S, GLctx.CLAMP_TO_EDGE);
                    GLctx.texParameteri(GLctx.TEXTURE_2D, GLctx.TEXTURE_WRAP_T, GLctx.CLAMP_TO_EDGE);
    
                    GLctx.activeTexture(GLctx.TEXTURE0);
                } else {
                    GLctx.bindTexture(GLctx.TEXTURE_2D, hyperbeamInstance.texture);
                }

                GLctx.texSubImage2D(GLctx.TEXTURE_2D, 0, 0, 0, GLctx.RGBA, GLctx.UNSIGNED_BYTE, frame);
            },

            // audioTrackCb: function(track) {
            //     const stream = new MediaStream([track]);
                

            //     source = audioCtx.createMediaStreamSource(stream);
            //     const UnityAudioNode = new AudioWorkvarNode(
            //         audioCtx,
            //         "unity-audio-hook",
            //         {
            //             processorOptions: {
            //                 //unityRef: unityInstance,
            //                 gameObject: audioObject,
            //                 sampleRate: audioCtx.sampleRate,
            //             }
            //         }
            //     );

            //     source.connect(UnityAudioNode);
            // }
        })

        console.log(hyperbeamInstance.hyperbeamSdk);
        unityInstance.SendMessage(hyperbeamInstance.controller, "HyperbeamCallback");
        
        window.hyperbeamInstances.push(hyperbeamInstance);
        return newId;
    },

    destroyInstance: function(instanceId) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        const instance = window.hyperbeamInstances[instanceId];
        instance.hyperbeamSdk.destroy();
        instance.hyperbeamDiv.remove();
        window.hyperbeamInstances[instanceId] = null;
    },

    // this function can be successfully called after connect and can be used to grab the browser texture
    getTextureId: function(instanceId) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return 0;
        }

        return window.hyperbeamInstances[instanceId].textureId;
    },

    getTextureWidth: function(instanceId) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return 0;
        }

        return window.hyperbeamInstances[instanceId].texWidth;
    },

    getTextureHeight: function(instanceId) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return 0;
        }

        return window.hyperbeamInstances[instanceId].texHeight;
    },

    sendKeyEvent: function(instanceId, eventType, key, ctrl, meta) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        var keyEvent = {
            type: UTF8ToString(eventType),
            key: UTF8ToString(key),
            ctrlKey: ctrl,
            metaKey: meta
        }

        window.hyperbeamInstances[instanceId].hyperbeamSdk.sendEvent(keyEvent);
    },

    sendMouseEvent: function(instanceId, eventType, x, y, button) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        var mouseEvent = {
            type: UTF8ToString(eventType),
            x: x,
            y: y,
            button: button,
        }

        window.hyperbeamInstances[instanceId].hyperbeamSdk.sendEvent(mouseEvent);
    },

    sendWheelEvent: function(instanceId, deltaY) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        var wheelEvent = {
            type: "wheel",
            deltaY: deltaY,
        }

        window.hyperbeamInstances[instanceId].hyperbeamSdk.sendEvent(wheelEvent);
    },

    getVolume: function(instanceId) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return 0;
        }

        return window.hyperbeamInstances[instanceId].hyperbeamSdk.volume;
    },

    setVolume: function(instanceId, newVolume) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        window.hyperbeamInstances[instanceId].hyperbeamSdk.volume = newVolume;
    },

    setPause: function(instanceId, pause) {
        if(!window.hyperbeamInstances[instanceId]) { 
            return;
        }

        window.hyperbeamInstances[instanceId].hyperbeamSdk.videoPaused = pause;
    },

    giveHyperbeamControl: function(instanceId, closeKey, ctrl, meta, alt, shift) {
        console.log("giveHyperbeamControl called for ID: " + instanceId);
        if(!window.hyperbeamInstances[instanceId]) { 
            console.log("unable to find hyperbeam instance " + instanceId);
            return;
        }

        console.log("Control received by hyperbeam on instance: " + instanceId);
        const instance = window.hyperbeamInstances[instanceId]; 
        const translatedKey = UTF8ToString(closeKey);

        const keydownHandler = (event) => {
            if(event.key === translatedKey 
                && event.ctrlKey == ctrl 
                && event.metaKey == meta
                && event.shiftKey == shift
                && event.altKey == alt) {
                console.log("cancel sequence found...");
                window.removeEventListener('keydown', keydownHandler, {passive: true});
                window.removeEventListener('keyup', keyupHandler, {passive: true});
                unityInstance.SendMessage(instance.controller, "ReceiveControlFromBrowser");
                return;
            }

            instance.hyperbeamSdk.sendEvent({
                type: 'keydown',
                key: event.key,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
            });
        }

        const keyupHandler = (event) => {
            instance.hyperbeamSdk.sendEvent({
                type: 'keyup',
                key: event.key,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
            });
        }

        console.log("Adding handlers...");
        // Name the handlers so they can be removed later
        window.addEventListener('keydown', keydownHandler, {passive: true});
        window.addEventListener('keyup', keyupHandler, {passive: true});
    }
})