import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookCard } from './BookCard';
import { Book } from '../types/Book';
import { BookOpen } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  loading: boolean;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, loading }) => {
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    // 简单的URL编码
    const encodedName = encodeURIComponent(book.bookName);
    console.log('Navigating to book:', book.bookName, 'encoded:', encodedName);
    navigate(`/book/${encodedName}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="aspect-[3/4] bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无书籍</h3>
          <p className="text-gray-500">试试调整搜索条件或分类筛选</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
        {books.map((book) => (
          <BookCard
            key={`${book.bookName}-${book.githubUrl}`}
            book={book}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </div>
    </div>
  );
};