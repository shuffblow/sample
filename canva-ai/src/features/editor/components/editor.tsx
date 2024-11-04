"use client";

import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import { useEditor } from '@/features/editor/hooks/use-editors';

export const Editor = () => {
    const { init } = useEditor();

    // 初始化画布，工作区
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true,
            }
        );

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        });
    }, [init]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 h-full bg-muted" ref={containerRef}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>

    );
};