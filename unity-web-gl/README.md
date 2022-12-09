# Hyperbeam WebGL Example

## **Important Notes**
This repo contains a fully working unity example but there are a few weird points if you're trying to implement this in your own project

1. The X scale of a Plane in world space needs to be reversed to see an image correctly
2. The Y scale of a RawImage in screen space also needs to be reversed to see the image correctly 
3. Your WebGLTemplate must import the [Hyperbeam Web SDK](https://www.npmjs.com/package/@hyperbeam/web/v/0.0.24) and set window.Hyperbeam correctly:
```js
<script type="module">
    import Hyperbeam from "https://unpkg.com/@hyperbeam/web@latest/dist/index.js"
    Window.Hyperbeam = Hyperbeam
</script>
```
4. the hyperbeam SDK expects(for now) the variable ``unityInstance`` to be present and populated with the value returned from ```CreateUnityInstance```
```js
<script>
var unityInstance;
//...
createUnityInstance(canvas, config (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
}).then((gameInstance) => {
   unityInstance = gameInstance;
   //...
})
```
---

## Getting started with the Hyperbeam WebGL SDK
After importing the WebGL SDK unitypackage you'll notice a few files. Importantly are the files in the ``Hyperbeam`` folder and namespace. 

To get started place a new plane in the scene and give it a negative x scale.

Attach a ``HyperbeamController`` component and the ``HyperbeamVideoSource`` component to the plane.

Drag the ``HyperbeamController`` component onto the ``controller`` field of the ``HyperbeamVideoSource``

Create a new script component on the plane and in it's ``start()`` method call ``HyperbeamController.StartHyperbeamStream("<embedURL>")`` 

Open your webgl player settings and in the ``Resolution and Presentation`` tabs select the ``HyperbeamWebGL`` template 

Build the project and load it up in your browser of choice and you should see a video pop up on the plane!

---

## Structure of the WebGL SDK
``HyperbeamController.cs`` and ``Hyperbeam.cs`` are the center of communication between unity and hyperbeam's JSLib. Ideally you will never instantiate Hyperbeam.cs directly, as the ``HyperbeamController`` contains the methods that the JSLib tries to call.

The ``Hyperbeam`` class keeps track of our instance and gives us a safe handle to interact with the hyperbeam web sdk. It is available to interact with via the ``Instance`` field on the ``HyperbeamController``

The ``HyperbeamController`` is the object in the scene that the JS plugin will send messages too and be responsible for handling interfacing with unity. It will automatically clean up the instance when it is destroyed, or pause and mute the stream when disabled. It provides 3 events that allow you to get notified when certain messages are sent back from the JS plugins. 

Investigate the classes for more details on each individual methods. 

``HyperbeamVideoSource`` is a simple controller that shows how to get notified of a new texture being available and how to place it on a material. It should be noted that each hyperbeam instance only creates one texture and just changes the texture when there is a new frame available.

