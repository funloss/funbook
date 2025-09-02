import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Book } from '../types/Book';
import { MermaidRenderer } from './MermaidRenderer';
import { OutlineView } from './OutlineView';

interface BookDetailProps {
  books: Book[];
}

export const BookDetail: React.FC<BookDetailProps> = ({ books }) => {
  const { bookName } = useParams<{ bookName: string }>();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // 解码URL参数并查找对应的书籍
  const decodedBookName = bookName ? decodeURIComponent(bookName) : '';
  const book = books.find(b => b.bookName === decodedBookName);

  // 调试信息
  console.log('URL bookName:', bookName);
  console.log('Decoded bookName:', decodedBookName);
  console.log('Available books:', books.map(b => b.bookName));
  console.log('Found book:', book);

  useEffect(() => {
    if (book?.githubUrl) {
      fetchMarkdownContent(book.githubUrl);
    }
  }, [book]);

  const fetchMarkdownContent = async (githubUrl: string) => {
    setLoading(true);
    setError('');
    
    try {
      // 将 GitHub URL 转换为原始内容 URL
      const rawUrl = githubUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
      
      const response = await fetch(rawUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const content = await response.text();
      
      // 过滤掉 YAML front matter
      const filteredContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
      setMarkdown(filteredContent);
    } catch (err) {
      console.error('Error fetching markdown:', err);
      setError('无法加载笔记内容，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">书籍未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-gray-900 truncate">
                {book.bookName}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500">
                  {book.cate_level1} · {book.cate_leaf}
                </span>
                {book.doubanUrl && (
                  <a
                    href={book.doubanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    豆瓣链接 <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              
              {/* 标签展示 */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-full border border-rose-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:flex lg:gap-8">
          {/* 左侧大纲 */}
          {markdown && !loading && !error && (
            <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
              <div className="bg-white rounded-xl shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] flex flex-col">
                <div className="p-4 lg:p-6 lg:flex-1 lg:overflow-y-auto max-h-48 lg:max-h-none overflow-y-auto lg:overflow-y-auto">
                  <OutlineView markdown={markdown} />
                </div>
              </div>
            </div>
          )}
          
          {/* 右侧内容 */}
          <div className="lg:flex-1 lg:min-w-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                  <span className="ml-3 text-gray-600">加载笔记内容中...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center py-16">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <span className="ml-3 text-red-600">{error}</span>
                </div>
              )}

              {markdown && !loading && !error && (
                <div className="prose prose-gray max-w-none p-4 md:p-8">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-6 md:mt-8 first:mt-0">{children}</h1>,
                      h2: ({children}) => <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 mt-4 md:mt-6">{children}</h2>,
                      h3: ({children}) => <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 mt-4 md:mt-6">{children}</h3>,
                      p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-4 md:pl-6 mb-4 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-4 md:pl-6 mb-4 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="text-gray-700 text-sm md:text-base">{children}</li>,
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-rose-200 pl-3 md:pl-4 italic text-gray-600 my-4 bg-rose-50 py-2 text-sm md:text-base">
                          {children}
                        </blockquote>
                      ),
                      code: ({children, className, ...props}) => {
                        const isInline = !className;
                        const language = className?.replace('language-', '') || '';
                        
                        // 处理 Mermaid 图表
                        if (language === 'mermaid') {
                          const chartId = Math.random().toString(36).substr(2, 9);
                          return <MermaidRenderer chart={String(children)} id={chartId} />;
                        }
                        
                        if (isInline) {
                          return <code className="bg-gray-100 px-1 py-0.5 rounded text-xs md:text-sm font-mono text-rose-600">{children}</code>;
                        }
                        
                        return (
                          <div className="my-4">
                            {language && (
                              <div className="bg-gray-200 px-2 md:px-3 py-1 text-xs font-medium text-gray-600 rounded-t-lg border-b">
                                {language}
                              </div>
                            )}
                            <code className={`block bg-gray-100 p-3 md:p-4 ${language ? 'rounded-b-lg' : 'rounded-lg'} text-xs md:text-sm font-mono overflow-x-auto whitespace-pre`}>
                              {children}
                            </code>
                          </div>
                        );
                      },
                      pre: ({children}) => <div className="my-4">{children}</div>,
                      table: ({children}) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({children}) => <thead className="bg-gray-50">{children}</thead>,
                      tbody: ({children}) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
                      tr: ({children}) => <tr>{children}</tr>,
                      th: ({children}) => (
                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {children}
                        </th>
                      ),
                      td: ({children}) => (
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                          {children}
                        </td>
                      ),
                      hr: () => <hr className="my-6 md:my-8 border-gray-200" />,
                      strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                      a: ({href, children}) => (
                        <a href={href} className="text-rose-600 hover:text-rose-700 underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};