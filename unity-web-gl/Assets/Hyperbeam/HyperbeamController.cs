using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Events;

namespace Hyperbeam
{
    // Subclassing this class will result in undefined behaviour. Everything works properly when it's not subclass
    // so please don't
    public sealed class HyperbeamController : MonoBehaviour 
    {
        public Hyperbeam Instance;

        /// <summary>
        /// OnHyperbeamStart will notify any registered events when this controller's hyperbeam instance is accessible.
        /// </summary>
        public UnityEvent OnHyperbeamStart;

        /// <summary>
        /// OnTextureReady is the callback used by <see cref="HyperbeamVideoSource"/> to know when a texture is ready to be applied.
        /// </summary>
        public Action<Texture2D> OnTextureReady;

        /// <summary>
        /// OnControlReturned will notify any registered events when control is returned to unity after being handed off by <see cref="PassControlToBrowser"/>
        /// </summary>
        public UnityEvent OnControlReturned;

        private bool _hyperbeamControl = false;
        private float _volume = 0f;
        public float Volume
        {
            get
            {
                return _volume;
            }
            set
            {
                _volume = value;
                Instance.Volume = value;
            }
        }

        private bool _isPaused = false;
        public bool Paused
        {
            get
            {
                return _isPaused;
            }
            set
            {
                _isPaused = value;
                Instance.SetVideoPause(value);
            }
        }

        public void StartHyperbeamStream(string embedUrl)
        {
            Instance = new Hyperbeam(embedUrl, gameObject);
            StartCoroutine(Instance.GetHyperbeamTexture(OnTextureReady));
        }

        void Start()
        {
            OnControlReturned ??= new();
            OnHyperbeamStart ??= new();
        }

        void OnDestroy()
        {
            Instance.Dispose();
        }

        void OnDisable()
        {
            if (Instance != null)
            {
                Instance.Volume = 0f;
                Instance.SetVideoPause(true);
            }
        }

        void OnEnable()
        { 
            if (Instance != null)
            {
                Instance.Volume = Volume;
                Instance.SetVideoPause(Paused);
            } 
        }

        /// <summary>
        /// Called by the hyperbeam JSLIB to communicate with unity. Please register an event handler to <see cref="OnHyperbeamStart"/> 
        /// to get notified when hyperbeam has started.
        /// </summary>
        public void HyperbeamCallback()
        {
            _volume = Instance.Volume;
            OnHyperbeamStart?.Invoke();
        }

        /// <summary>
        ///     <para>
        ///         Will pass control to Hyperbeam's JsLib which will install event listeners for keyboard events
        ///         During this time hyperbeam will keep focus until it receives a keydown from closeKey with the correct modifier keys.
        ///     </para>
        ///     <para>
        ///         Register an event handler to <see cref="OnControlReturned"/> if you would like to recieve a notification when the use has "finished" interacting with Hyperbeam.
        ///     </para>
        /// </summary>
        /// <param name="closeKey">The Keydown that will trigger unity regaining control</param>
        /// <param name="ctrl">Whether or not the ctrl key must be held down to regain control</param>
        /// <param name="meta">Whether or not the meta key must be held down to regain control</param>
        public void PassControlToBrowser(string closeKey, bool ctrl, bool meta, bool alt, bool shift)
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            WebGLInput.captureAllKeyboardInput = false;
#endif
            if(!_hyperbeamControl)
            {
                Instance.GiveHyperbeamControl(closeKey, ctrl, meta, alt, shift);
                _hyperbeamControl = true;
            }
        }

        /// <summary>
        /// Called by the hyperbeam JSLIB to communicate with unity. Please register an event handler to <see cref="OnControlReturned"/> 
        /// to get notified when the user has "finished" interacting with hyperbeam.
        /// </summary>
        public void ReceiveControlFromBrowser()
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            WebGLInput.captureAllKeyboardInput = true;
#endif
            _hyperbeamControl = false;
            OnControlReturned?.Invoke();
        }
    }
}
