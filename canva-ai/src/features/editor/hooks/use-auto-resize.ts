import { fabric } from "fabric";
import { request } from "http";
import { use, useCallback, useEffect } from "react";

interface UseAutoResizeProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
}

export const useAutoResize = ({
    canvas,
    container,
}: UseAutoResizeProps) => {
    // 每当container有变化的时候，自动调整画布的大小
    const autoZoom = useCallback(() => {
        if( !canvas || !container) return;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        canvas.setWidth(container.offsetWidth);
        canvas.setHeight(container.offsetHeight);
        
        const center = canvas.getCenter();
        const zoomRatio = 0.85;
        const localWorkspace = canvas.getObjects().find((item) => item.name === 'clip');

        // @ts-ignore
        const scale = fabric.util.findScaleToFit(localWorkspace, { width, height });

        const zoom = scale * zoomRatio;

        canvas.setViewportTransform(fabric.iMatrix.concat());
        canvas.zoomToPoint(new fabric.Point(
            center.left,
            center.top,
        ), zoom);

        if(!localWorkspace) return;

        const workspaceCenter = localWorkspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;

        if(canvas.width === undefined || canvas.height === undefined || !viewportTransform) {
            return;
        }

        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        canvas.setViewportTransform(viewportTransform);
        localWorkspace.clone((cloned: fabric.Rect) => {
            canvas.clipPath = cloned;
            canvas.requestRenderAll();
        });
    }, [canvas, container]);
    useEffect(() => {
        // 监听container的变化
        let resizeObserver: ResizeObserver | null = null;
        if (canvas && container){
            resizeObserver = new ResizeObserver(() => {
                autoZoom();
            });
            resizeObserver.observe(container);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            };
        };
    }, [canvas, container]);
};