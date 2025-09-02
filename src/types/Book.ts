export interface Book {
  bookName: string;
  doubanUrl: string;
  bookCover: string;
  cate_level1: string;
  cate_leaf: string;
  githubUrl: string;
  score?: number;
  mtime?: string;
  tags?: string[];
}