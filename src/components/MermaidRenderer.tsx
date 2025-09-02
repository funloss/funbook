import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  chart: string;
  id: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart, id }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      // 配置 Mermaid
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        fontSize: 14,
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
          bottomMarginAdj: 1,
          useMaxWidth: true,
          rightAngles: false,
          showSequenceNumbers: false
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          fontFamily: 'ui-sans-serif, system-ui',
          fontSize: 11,
          fontWeight: 'normal',
          gridLineStartPadding: 35,
          leftPadding: 75,
          topPadding: 50,
          bottomPadding: 5,
          numberSectionStyles: 4
        }
      });

      // 渲染图表
      mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p class="font-medium">图表渲染失败</p>
              <p class="text-sm mt-1">请检查 Mermaid 语法是否正确</p>
            </div>
          `;
        }
      });
    }
  }, [chart, id]);

  return (
    <div 
      ref={elementRef} 
      className="mermaid-container my-6 flex justify-center overflow-x-auto"
      style={{ minHeight: '100px' }}
    />
  );
};