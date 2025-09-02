import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './Header';
import { CategoryFilter } from './CategoryFilter';
import { ScoreFilter } from './ScoreFilter';
import { BookGrid } from './BookGrid';
import { Book } from '../types/Book';
import { AlertCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minScore, setMinScore] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/funloss/funKnowledge/main/metaData.json'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('无法加载书籍数据，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 过滤书籍
  const filteredBooks = useMemo(() => {
    const filtered = books.filter(book => {
      const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.cate_level1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.cate_leaf.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || book.cate_level1 === selectedCategory;
      const matchesScore = !book.score || book.score >= minScore;
      
      return matchesSearch && matchesCategory && matchesScore;
    });
    
    // 按时间排序
    return filtered.sort((a, b) => {
      if (!a.mtime && !b.mtime) return 0;
      if (!a.mtime) return 1;
      if (!b.mtime) return -1;
      
      const dateA = new Date(a.mtime).getTime();
      const dateB = new Date(b.mtime).getTime();
      
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [books, searchTerm, selectedCategory, minScore, sortOrder]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">加载失败</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchBooks}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalBooks={books.length}
      />
      
      {!loading && books.length > 0 && (
        <CategoryFilter
          books={books}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}
      
      {!loading && books.length > 0 && (
        <ScoreFilter
          books={books}
          minScore={minScore}
          onScoreChange={setMinScore}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
      )}
      
      <BookGrid books={filteredBooks} loading={loading} />
    </div>
  );
};