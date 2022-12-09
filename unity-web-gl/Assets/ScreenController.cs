using Hyperbeam;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem.UI;
using UnityEngine.UI;

public class ScreenController : MonoBehaviour, IPointerMoveHandler, IPointerDownHandler, IPointerUpHandler, IScrollHandler
{
    public HyperbeamController Controller;
    private RectTransform pos;

    [SerializeField]
    private RawImage rawImage;

    public void OnPointerDown(PointerEventData eventData)
    {
        var pos = CursorPosToNormalizedPos(eventData.position, null);

        Controller.Instance.SendMouseDown(pos.x, pos.y, eventData.button);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        var pos = CursorPosToNormalizedPos(eventData.position, null);

        Controller.Instance.SendMouseUp(pos.x, pos.y, eventData.button);
    }

    public void OnPointerMove(PointerEventData eventData)
    {
        var pos = CursorPosToNormalizedPos(eventData.position, null);

        Controller.Instance.SendMouseMove(pos.x, pos.y);
    }

    public void OnScroll(PointerEventData eventData)
    {
        Controller.Instance.SendWheel(-eventData.scrollDelta.y);
    }

    void OnEnable()
    {
        pos = GetComponent<RectTransform>();
        StartCoroutine(Controller.Instance.GetHyperbeamTexture(OnFrameTexReady));
    }

    void OnFrameTexReady(Texture2D tex)
    {
        rawImage.texture = tex; 
    }

    Vector2 CursorPosToNormalizedPos(Vector2 cursorPos, Camera cam)
    {
        Vector2 localPoint;

        RectTransformUtility.ScreenPointToLocalPointInRectangle(pos, cursorPos, cam, out localPoint);

        return new Vector2((localPoint.x / pos.rect.width) + .5f, (localPoint.y / pos.rect.height) + .5f);
    }
}
