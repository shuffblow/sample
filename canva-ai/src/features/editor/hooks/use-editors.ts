import { fabric } from "fabric";
import { useCallback, useState } from "react"
import { useAutoResize } from "./use-auto-resize";

export const useEditor = ()=> {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    useAutoResize({
        canvas,
        container,
    });
    
    const init = useCallback(({
        initialCanvas,
        initialContainer,
    }:{
        initialCanvas: fabric.Canvas,
        initialContainer: HTMLDivElement
    })=>{
        // 控件样式
        fabric.Object.prototype.set({
            cornerColor: '#fff',
            cornerStyle: 'circle',
            borderColor: '#3B82F6',
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: '#3B82F6',
        })
        const initialWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name:'clip',
            fill: "white",
            // 不可选择也不可控制
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5,
            }),
        });

        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        setCanvas(initialCanvas);
        setContainer(initialContainer);
        const test = new fabric.Rect({
            width: 100,
            height: 100,
            fill: "black",
        });

        initialCanvas.add(test);
        initialCanvas.centerObject(test);
    }, []);

    return {
        init
    }
}