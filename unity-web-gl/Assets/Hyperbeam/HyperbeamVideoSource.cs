using UnityEngine;

namespace Hyperbeam
{
    public class HyperbeamVideoSource : MonoBehaviour
    {
        public HyperbeamController controller;

        void Start()
        {
            controller.OnTextureReady += OnTextureReady;
        }

        void OnTextureReady(Texture2D texture)
        {
            GetComponent<Renderer>().material.mainTexture = texture;
        }
    }
}
