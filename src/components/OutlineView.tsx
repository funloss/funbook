import React, { useMemo } from 'react';
import { Hash } from 'lucide-react';

interface OutlineViewProps {
  markdown: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export const OutlineView: React.FC<OutlineViewProps> = ({ markdown }) => {
  const headings = useMemo(() => {
    const lines = markdown.split('\n');
    const headingItems: HeadingItem[] = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replaceAll('**', "");
        const id = `heading-${index}`;
        headingItems.push({ id, text, level });
      }
    });
    
    return headingItems;
  }, [markdown]);

  const scrollToHeading = (headingText: string) => {
    // 查找包含该标题文本的元素
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (const element of elements) {
      if (element.textContent?.trim() === headingText) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        break;
      }
    }
  };

  if (headings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Hash className="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p className="text-sm">暂无章节大纲</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <Hash className="w-4 h-4 text-gray-600" />
        <h3 className="font-medium text-gray-900">章节大纲</h3>
      </div>
      
      {headings.map((heading, index) => (
        <button
          key={index}
          onClick={() => scrollToHeading(heading.text)}
          className={`
            w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50
            ${heading.level === 1 ? 'font-semibold text-gray-900' : ''}
            ${heading.level === 2 ? 'font-medium text-gray-800 ml-2' : ''}
            ${heading.level === 3 ? 'text-gray-700 ml-4' : ''}
            ${heading.level === 4 ? 'text-gray-600 ml-6' : ''}
            ${heading.level === 5 ? 'text-gray-500 ml-8' : ''}
            ${heading.level === 6 ? 'text-gray-400 ml-10' : ''}
          `}
        >
          <span className="block truncate">
            {heading.text}
          </span>
        </button>
      ))}
    </div>
  );
};