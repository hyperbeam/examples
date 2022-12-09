using Hyperbeam;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.UI;

public class FirstPersonController : MonoBehaviour
{
    [SerializeField]
    public GameObject PlayerCam;
    public GameObject BrowserImage;
    
    public CharacterController CharacterController;
    public PlayerInput playerControl;
    public HyperbeamController hb;

    public float mouseSensitivity = 20;
    public float movementSpeed = 5;

    private float xRotation = 0f;
    private Vector2 inputVec = Vector2.zero;

    // Start is called before the first frame update
    void Start()
    {
        if (CharacterController == null)
        {
            CharacterController = gameObject.GetComponent<CharacterController>();
        }

        playerControl = gameObject.GetComponent<PlayerInput>();
        hb.OnControlReturned.AddListener(ControlReturned);
    }


    public void ControlReturned()
    {
        Cursor.lockState = CursorLockMode.Locked;
        playerControl.SwitchCurrentActionMap("Player");
        BrowserImage.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        if (inputVec != Vector2.zero)
        {
            var moveVec = transform.right * inputVec.x + transform.forward * inputVec.y;
            CharacterController.Move(moveVec * movementSpeed * Time.deltaTime);
        }
    }

    public void OnMove(InputAction.CallbackContext ctx)
    {
        inputVec = ctx.ReadValue<Vector2>();
    }

    public void OnLook(InputAction.CallbackContext ctx)
    {
        if (Cursor.lockState != CursorLockMode.Locked)
            return;

        var inputVec = ctx.ReadValue<Vector2>();
        xRotation -= inputVec.y * mouseSensitivity * Time.deltaTime;
        xRotation = Mathf.Clamp(xRotation, -80f, 90f);
        PlayerCam.transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        gameObject.transform.Rotate(Vector3.up, inputVec.x * mouseSensitivity * Time.deltaTime);
    }

    public void OnFire()
    {
        Cursor.lockState = CursorLockMode.Locked;
    }

    public void OnReleaseLock() 
    {
        Cursor.lockState = CursorLockMode.None;
    }

    public void OnOpenUI()
    {
        Cursor.lockState = CursorLockMode.None;
        playerControl.SwitchCurrentActionMap("UI");
        BrowserImage.SetActive(true);
        hb.PassControlToBrowser("q", false, false, true, false);
    }
}
