import React, { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colorMap, ColorKey, Theme } from '../utils/colorMap';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  colorKey: ColorKey;
  size: number;
}

interface PaintAreaProps {
  currentColor: ColorKey;
  currentSize: number;
  theme: Theme;
  onStrokesChange: (strokes: Stroke[] | ((prev: Stroke[]) => Stroke[])) => void;
  strokes: Stroke[];
}

export interface PaintAreaRef {
  exportSVG: () => void;
}

const PaintArea = forwardRef<PaintAreaRef, PaintAreaProps>(({
  currentColor,
  currentSize,
  theme,
  onStrokesChange,
  strokes
}, ref) => {
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const getPointFromEvent = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = getPointFromEvent(e);
    
    const newStroke: Stroke = {
      points: [point],
      colorKey: currentColor,
      size: currentSize
    };
    
    setCurrentStroke(newStroke);
    setIsDrawing(true);
  }, [currentColor, currentSize, getPointFromEvent]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke) return;
    
    e.preventDefault();
    const point = getPointFromEvent(e);
    
    setCurrentStroke(prev => prev ? {
      ...prev,
      points: [...prev.points, point]
    } : null);
  }, [isDrawing, currentStroke, getPointFromEvent]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing || !currentStroke) return;
    
    setIsDrawing(false);
    onStrokesChange(prevStrokes => [...prevStrokes, currentStroke]);
    setCurrentStroke(null);
  }, [isDrawing, currentStroke, onStrokesChange]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => startDrawing(e);
  const handleMouseMove = (e: React.MouseEvent) => draw(e);
  const handleMouseUp = () => stopDrawing();
  const handleMouseLeave = () => stopDrawing();

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => startDrawing(e);
  const handleTouchMove = (e: React.TouchEvent) => draw(e);
  const handleTouchEnd = () => stopDrawing();

  // Prevent scrolling on touch devices
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isDrawing]);

  const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

  // Export SVG function
  const exportSVG = useCallback(() => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    
    // Get the full viewport dimensions to ensure complete coverage
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate the actual canvas area (viewport minus toolbar height)
    const toolbarHeight = 80; // Approximate toolbar height
    const canvasWidth = viewportWidth;
    const canvasHeight = viewportHeight - toolbarHeight;
    
    // Create a completely new SVG with proper structure
    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    newSvg.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);
    newSvg.setAttribute('width', canvasWidth.toString());
    newSvg.setAttribute('height', canvasHeight.toString());
    
    // Add background rectangle that covers the entire canvas area
    const backgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    backgroundRect.setAttribute('x', '0');
    backgroundRect.setAttribute('y', '0');
    backgroundRect.setAttribute('width', canvasWidth.toString());
    backgroundRect.setAttribute('height', canvasHeight.toString());
    backgroundRect.setAttribute('fill', theme === 'dark' ? '#1f2937' : '#f3f4f6');
    newSvg.appendChild(backgroundRect);
    
    // Copy all the stroke elements
    const strokeElements = svgElement.querySelectorAll('polyline');
    strokeElements.forEach(stroke => {
      const clonedStroke = stroke.cloneNode(true) as SVGElement;
      newSvg.appendChild(clonedStroke);
    });
    
    const svgData = new XMLSerializer().serializeToString(newSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `paint-artwork-${theme}-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(svgUrl);
  }, [theme]);

  // Expose export function to parent via ref
  useImperativeHandle(ref, () => ({
    exportSVG
  }), [exportSVG]);

  return (
    <div className="absolute inset-0 m-0 bg-gray-100 dark:bg-gray-900">
      <svg
        ref={svgRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {allStrokes.map((stroke, index) => (
          <polyline
            key={index}
            points={stroke.points.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={colorMap[theme][stroke.colorKey]}
            strokeWidth={stroke.size}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
});

PaintArea.displayName = 'PaintArea';

export default PaintArea;
