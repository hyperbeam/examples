using System;
using System.Collections;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Hyperbeam
{
    public class Hyperbeam : IDisposable
    {
        #region external functions
        [DllImport("__Internal")]
        private static extern int startHyperbeam(string embedUrl, string controllerName);

        [DllImport("__Internal")]
        private static extern int destroyInstance(int instanceId);

        [DllImport("__Internal")]
        private static extern int getTextureId(int instanceId);

        [DllImport("__Internal")]
        private static extern int getTextureWidth(int instanceId);

        [DllImport("__Internal")]
        private static extern int getTextureHeight(int instanceId);

        [DllImport("__Internal")]
        private static extern float getVolume(int instanceId);

        [DllImport("__Internal")]
        private static extern float setVolume(int instanceId, float vol);

        [DllImport("__Internal")]
        private static extern void sendKeyEvent(int instanceId, string eventType, string key, bool ctrl, bool menu);

        [DllImport("__Internal")]
        private static extern void sendMouseEvent(int instanceId, string eventType, float x, float y, int button);

        [DllImport("__Internal")]
        private static extern void sendWheelEvent(int instanceId, float deltaY);

        [DllImport("__Internal")]
        private static extern void setPause(int instanceId, bool pause);

        [DllImport("__Internal")]
        private static extern void giveHyperbeamControl(int instanceId, string closeKey, bool ctrl, bool meta, bool alt, bool shift);
        #endregion


        public float minDistance;
        public float maxDistance;

        private readonly int instanceId;
        private readonly GameObject controller;
        private Texture2D instanceTexture;

        private bool _disposed;

        public float Volume
        {
            get {
                return getVolume(instanceId);
            }

            set
            {
                setVolume(instanceId, value);
            }
        }

        /// <summary>
        /// Constructs a new hyperbeam instance using the browsers native WebRTC engine
        /// </summary>
        /// <param name="embedUrl">The URL of the virtual browser to connect to</param>
        /// <param name="controller">A GameObject which has a component descending from the HyperbeamController class</param>
        public Hyperbeam(string embedUrl, GameObject controller)
        {
            this.controller = controller;
            instanceId = startHyperbeam(embedUrl, this.controller.name);
        }

        // Finalizer that tells the jslib to clean up this instance. 
        ~Hyperbeam() => Dispose(false);

        internal IntPtr GetTexturePtr()
        {
            return new IntPtr(getTextureId(instanceId));
        }

        /// <summary>
        ///     A Couroutine to be called with StartCoroutine. This takes a callback that will be invoked when a texture is available. It will check once per frame until it finds one
        /// </summary>
        /// <remarks>
        /// <example>
        ///     <code>
        ///         private Hyperbeam hbeam;
        /// 
        ///         void Start()
        ///         {
        ///             StartCoroutine(hbeam.GetHyperbeamTexture(OnTextureReady))
        ///         }
        /// 
        ///         void OnTextureReady(Texture2D texture)
        ///         {
        ///             GetComponent<Renderer>().material.mainTexture = texture;
        ///         }
        ///     </code>
        /// </example>
        /// </remarks>
        /// <param name="callback">The callback to be invoked when a texture is ready</param>
        public IEnumerator GetHyperbeamTexture(Action<Texture2D> callback)
        {
            if(instanceTexture == null)
            {
                var texturePtr = GetTexturePtr();
                while (texturePtr == null || texturePtr.ToInt32() == 0)
                {
                    yield return null;
                    texturePtr = GetTexturePtr();
                }
                instanceTexture = Texture2D.CreateExternalTexture(GetTextureWidth(), GetTextureHeight(), TextureFormat.RGBA32, false, false, texturePtr);
            }

            callback?.Invoke(instanceTexture);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
            {
                return;
            }
            destroyInstance(instanceId);

            _disposed = true;
        }

        public int GetTextureWidth()
        {
            return getTextureWidth(instanceId);
        }

        public int GetTextureHeight()
        {
            return getTextureHeight(instanceId);
        }

        //public void ApplyVolumeFalloff()
        //{
        //    float distance = Vector3.Distance(audioDst.transform.position, audioListener.transform.position);
        //    if (distance < minDistance)
        //    {
        //        setVolume(instanceId, 1.0f * Volume);
        //    }
        //    else if (distance > maxDistance)
        //    {
        //        setVolume(instanceId, 0f);
        //    }
        //    else
        //    {
        //        setVolume(instanceId, (1.0f / (float)Math.Pow((distance - minDistance), 2.0f)) * Volume);
        //    }
        //}


        /// <summary>
        /// Sends a keydown event to the connected hyperbeam instance
        /// </summary>
        /// <param name="Key">The keydown to send to hyperbeam</param>
        /// <param name="Ctrl">Is the control key held down</param>
        /// <param name="Meta">Is the met key held down</param>
        public void SendKeyDown(char Key, bool Ctrl, bool Meta)
        {
            sendKeyEvent(instanceId, "keydown", FixControlKeys(Key), Ctrl, Meta);
        }

        /// <summary>
        /// Sends a keyup event to the connected hyperbeam instance
        /// </summary>
        /// <param name="Key">The keyup to send to hyperbeam</param>
        /// <param name="Ctrl">Is the control key held down</param>
        /// <param name="Meta">Is the met key held down</param>
        public void SendKeyUp(char Key, bool Ctrl, bool Meta)
        {
            sendKeyEvent(instanceId, "keyup", FixControlKeys(Key), Ctrl, Meta);
        }


        /// <summary>
        /// Sends a mousedown event to the connected hyperbeam instance
        /// </summary>
        /// <param name="X">The x coordinate of the mousedown event normalized to be between [0, 1] where 0 is the left of the browser</param>
        /// <param name="Y">The y coordinate of the mousedown event normalized to be between [0, 1] where 0 is the top of the browser</param>
        /// <param name="button">The button of the mousedown event</param>
        public void SendMouseDown(float X, float Y,  PointerEventData.InputButton button)
        {
            sendMouseEvent(instanceId, "mousedown", X, Y, GetIntFromButtons(button));
        }


        /// <summary>
        /// Sends a mouseup event to the connected hyperbeam instance
        /// </summary>
        /// <param name="X">The x coordinate of the mouseup event normalized to be between [0, 1] where 0 is the left of the browser</param>
        /// <param name="Y">The y coordinate of the mouseup event normalized to be between [0, 1] where 0 is the top of the browser</param>
        /// <param name="button">The button of the mouseup event</param>
        public void SendMouseUp(float X, float Y, PointerEventData.InputButton button)
        {
            sendMouseEvent(instanceId, "mouseup", X, Y, GetIntFromButtons(button));
        }

        /// <summary>
        /// Sends a mousemove event to the connected hyperbeam instance
        /// </summary>
        /// <param name="X">The x coordinate of the mousemove event normalized to be between [0, 1] where 0 is the left of the browser</param>
        /// <param name="Y">The y coordinate of the mousemove event normalized to be between [0, 1] where 0 is the top of the browser</param>
        public void SendMouseMove(float X, float Y)
        {
            sendMouseEvent(instanceId, "mousemove", X, Y, 0);
        }

        /// <summary>
        /// Sends a mousewheel event to the connected hyperbeam instance
        /// </summary>
        /// <param name="DeltaY">The direction of the mousewheel 1 is up -1 is down</param>
        public void SendWheel(float DeltaY)
        {
            sendWheelEvent(instanceId, DeltaY);
        }


        /// <summary>
        /// Pauses the video stream to save CPU and Bandwidth
        /// </summary>
        /// <param name="pause">Whether to pause or not</param>
        public void SetVideoPause(bool pause)
        {
            setPause(instanceId, pause);
        }

        /// <summary>
        /// Give control to the browser to take keyup and down events. This provides a far better UX than trying to get keyups and down out of unity.
        /// </summary>
        /// <remarks>
        /// the parameters for this function dictate the "finished" control sequence for hyperbeam to return control to unity.
        /// the keydown event will listen for the exact key with all modifiers and if it finds it on a keydown will clean up the event handlers and return control to unity.
        /// </remarks>
        /// <param name="closeKey">the key string that the keydown handler will listen for</param>
        /// <param name="ctrl">should the control key be held to return control</param>
        /// <param name="meta">should the meta key be held to return control</param>
        /// <param name="alt">should the alt key be held to return control</param>
        /// <param name="shift">should the shift key be held to return control</param>
        public void GiveHyperbeamControl(string closeKey, bool ctrl, bool meta, bool alt, bool shift)
        {
            giveHyperbeamControl(instanceId, closeKey, ctrl, meta, alt, shift);
        }

        // This fixes the button codes for hyperbeam specifically.
        private int GetIntFromButtons(PointerEventData.InputButton button)
        {
            return button switch
            {
                PointerEventData.InputButton.Left => 0,
                PointerEventData.InputButton.Right => 2,
                PointerEventData.InputButton.Middle => 1,
                _ => 0,
            };
        }

        private string FixControlKeys(char c)
        {
            return c switch
            {
                (char)8 => "Backspace",
                _ => c.ToString(),
            };
        }
    }
}
