import React from 'react';
import { Book } from '../types/Book';
import { Star, Clock } from 'lucide-react';

interface ScoreFilterProps {
  books: Book[];
  minScore: number;
  onScoreChange: (score: number) => void;
  sortOrder: 'newest' | 'oldest';
  onSortOrderChange: (order: 'newest' | 'oldest') => void;
}

export const ScoreFilter: React.FC<ScoreFilterProps> = ({ 
  books, 
  minScore, 
  onScoreChange,
  sortOrder,
  onSortOrderChange
}) => {
  // 获取所有评分并排序
  const scores = Array.from(new Set(books.map(book => book.score).filter(Boolean))).sort((a, b) => a! - b!);
  

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-2 md:gap-4">
          {/* 评分筛选 */}
          {scores.length > 0 && (
            <div className="flex items-center gap-2 min-w-0">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 mr-2">评分:</span>
              
              <div className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide flex-1">
                <button
                  onClick={() => onScoreChange(0)}
                  className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                    minScore === 0
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  全部
                </button>
                
                {scores.map((score) => (
                  <button
                    key={score}
                    onClick={() => onScoreChange(score!)}
                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                      minScore === score
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {score}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 时间排序 */}
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-700 mr-2">时间:</span>
            
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => onSortOrderChange('newest')}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  sortOrder === 'newest'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                由近及远
              </button>
              
              <button
                onClick={() => onSortOrderChange('oldest')}
                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  sortOrder === 'oldest'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                由远及近
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};