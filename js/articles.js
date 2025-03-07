/**
 * 预生成的文章列表数据
 * 此文件包含所有文章的元数据，用于快速加载文章列表
 * 当添加新文章时，需要更新此文件
 */

// 预生成的文章列表数据
const preloadedArticles = [
  {
    "title": "示例文章2",
    "file": "post2.md",
    "date": "2025-03-05"
  },
  {
    "title": "Hello World",
    "file": "post1.md",
    "date": "1999-01-01"
  }
];

// 导出文章列表，使其可以被其他模块导入
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { preloadedArticles };
}
