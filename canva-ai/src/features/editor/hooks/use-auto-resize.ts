import { use, useCallback, useEffect } from "react";

interface UseAutoResizeProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
}

export const useAutoResize = ({
    canvas,
    container,
}: UseAutoResizeProps) => {
    const autoZoom = useCallback(() => {
        if (canvas && container) {
            const scale = Math.min(
                container.offsetWidth / canvas.getWidth(),
                container.offsetHeight / canvas.getHeight()
            );

            canvas.setZoom(scale);
            canvas.setWidth(container.offsetWidth);
            canvas.setHeight(container.offsetHeight);
        }
    }, [canvas, container]);
    
    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        if (canvas && container){
            resizeObserver = new ResizeObserver(() => {
                consoel.log('resize');
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