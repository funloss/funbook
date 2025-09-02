import React from 'react';
import { Book } from '../types/Book';
import { ExternalLink, BookOpen, Star, Calendar } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
        <img
          src={book.bookCover}
          alt={book.bookName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) {
              placeholder.classList.remove('hidden');
            }
          }}
        />
        <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-purple-100">
          <BookOpen className="w-12 h-12 text-rose-400" />
        </div>
        
        {/* 分类标签 */}
        <div className="absolute top-2 left-2">
          <span className="px-1.5 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
            {book.cate_leaf}
          </span>
        </div>
        
        {/* 悬停时显示的操作提示 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-xs font-medium flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            查看笔记
          </div>
        </div>
      </div>
      
      <div className="p-1.5">
        <h3 className="font-medium text-xs text-gray-900 line-clamp-2 mb-1 group-hover:text-rose-600 transition-colors leading-tight">
          {book.bookName}
        </h3>
        
        {/* 评分和时间 */}
        <div className="flex items-center gap-1 mb-1">
          {book.score && (
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 font-medium">{book.score}</span>
            </div>
          )}
          {book.mtime && (
            <div className="flex items-center gap-0.5">
              <Calendar className="w-2.5 h-2.5 text-gray-400" />
              <span className="text-xs text-gray-500">
                {new Date(book.mtime).toLocaleDateString('zh-CN', { 
                  year: 'numeric',
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 truncate">
            {book.cate_level1}
          </span>
          
          {book.doubanUrl && (
            <a
              href={book.doubanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-rose-500 transition-colors flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};