import React from 'react';
import { BookOpen, Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalBooks: number;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, totalBooks }) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/funloss/funKnowledge/main/img/20250828-221312.jpeg"  // 图片路径根据实际存放位置调整
                alt="帆布书单Logo" 
                className="w-full h-full object-contain"  // 确保图片适应容器大小
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">帆布书单</h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">FunBook</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-2 md:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              />
            </div>
          </div>

          {/* 统计信息 */}
          <div className="text-xs md:text-sm text-gray-500 flex-shrink-0">
            <span className="hidden sm:inline">共 </span>{totalBooks}<span className="hidden sm:inline"> 本书籍</span>
          </div>
        </div>
      </div>
    </div>
  );
};