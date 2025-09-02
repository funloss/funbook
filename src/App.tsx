import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BookDetail } from './components/BookDetail';
import { useState, useEffect } from 'react';
import { Book } from './types/Book';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/funloss/funKnowledge/main/metaData.json'
      );
      
      if (response.ok) {
        const data: Book[] = await response.json();
        setBooks(data);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookName" element={<BookDetail books={books} />} />
      </Routes>
    </Router>
  );
}

export default App;