using UnityEngine;
using Hyperbeam;

public class CustomHyperbeamController : MonoBehaviour
{
    public FirstPersonController playerController;
    public HyperbeamController controller;

    void Start()
    {
        controller.StartHyperbeamStream("https://1aa2bnwfuuv7hod22dmbiqxql.hyperbeam.com/zIzOfgT4THKDna3f7GmclA?token=3bL5G1TmxFHzbNrGvaJ6EwEk6yvefNsKOS-_w51Y3WA");
    }
}
