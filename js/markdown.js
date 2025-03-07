/**
 * Markdown渲染和文章列表自动生成功能
 * 
 * 此文件实现两个主要功能：
 * 1. 自动扫描并生成markdown文件列表
 * 2. 使用marked.js在浏览器端渲染markdown内容
 */

// 文章列表配置
const articlesConfig = {
    // 文章目录路径（相对于网站根目录）
    directory: 'posts/',
    // 文章元数据（标题、日期等）
    articles: [
        // 这里会通过AJAX动态获取文章列表
    ]
};

/**
 * 初始化页面
 * 根据当前页面类型执行不同的初始化操作
 */
function initPage() {
    // 判断当前页面类型
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        // 首页 - 加载文章列表
        loadArticleList();
    } else if (window.location.pathname.includes('/posts/') && window.location.pathname.endsWith('.html')) {
        // 文章页 - 加载并渲染Markdown内容
        const mdFilePath = window.location.pathname.replace('.html', '.md');
        loadAndRenderMarkdown(mdFilePath);
    }
}

/**
 * 加载文章列表
 * 通过AJAX请求获取posts目录下的所有.md文件，并生成文章列表
 */
async function loadArticleList() {
    try {
        // 在实际应用中，这里应该是一个AJAX请求获取文章列表
        // 但由于GitHub Pages的限制，我们使用预定义的文章列表
        // 在实际部署时，你可以手动更新这个列表，或使用GitHub API
        
        // 模拟文章列表数据
        const articles = [
            { title: '第一篇文章', file: 'post1.md', date: '2023-08-20' },
            { title: '第二篇文章', file: 'post2.md', date: '2025-03-06' },
            { title: '第三篇文章', file: 'post3.md', date: '2023-09-15' }
        ];
        
        // 更新文章列表
        updateArticleList(articles);
    } catch (error) {
        console.error('加载文章列表失败:', error);
    }
}

/**
 * 更新文章列表DOM
 * @param {Array} articles 文章列表数据
 */
function updateArticleList(articles) {
    const navContainer = document.querySelector('.nav-container nav ul');
    if (!navContainer) return;
    
    // 清空现有列表
    navContainer.innerHTML = '';
    
    // 添加文章链接
    articles.forEach(article => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `posts/${article.file.replace('.md', '.html')}`;
        a.textContent = article.title;
        li.appendChild(a);
        navContainer.appendChild(li);
    });
}

/**
 * 加载并渲染Markdown内容
 * @param {string} mdFilePath Markdown文件路径
 */
async function loadAndRenderMarkdown(mdFilePath) {
    try {
        // 加载marked.js库（如果尚未加载）
        await loadMarkedIfNeeded();
        
        // 获取文章容器
        const articleContainer = document.querySelector('article');
        if (!articleContainer) return;
        
        // 保存标题和日期元素（如果存在）
        const titleElement = articleContainer.querySelector('h2');
        const dateElement = articleContainer.querySelector('time');
        
        // 清空文章容器（保留标题和日期）
        articleContainer.innerHTML = '';
        
        // 恢复标题和日期（如果存在）
        if (titleElement) articleContainer.appendChild(titleElement);
        if (dateElement) articleContainer.appendChild(dateElement);
        
        // 在实际应用中，这里应该是一个AJAX请求获取Markdown内容
        // 但由于GitHub Pages的限制，我们使用预定义的Markdown内容
        // 在实际部署时，你需要将.md文件放在对应的目录中
        
        // 模拟Markdown内容
        let markdownContent;
        if (mdFilePath.includes('post1.md')) {
            markdownContent = `
# 我的第一篇文章

这是通过VS Code的 \`Markdown Preview Enhanced\` 插件生成的HTML内容

\`\`\`javascript
console.log("Hello World!");
\`\`\`

![示例图片](https://images.pexels.com/photos/30606161/pexels-photo-30606161.jpeg)
            `;
        } else if (mdFilePath.includes('post2.md')) {
            markdownContent = `
# 我的第二篇文章

这是第二篇示例文章，展示了主题切换功能。

## 代码示例

\`\`\`javascript
// JavaScript示例
function sayHello(name) {
    return \`你好，\${name}！\`;
}

console.log(sayHello('访客'));
\`\`\`

## 列表示例

- 项目一
- 项目二
- 项目三
            `;
        } else if (mdFilePath.includes('post3.md')) {
            markdownContent = `
# 我的第三篇文章

这是第三篇示例文章，展示了如何添加新文章到博客系统。

## 添加新文章的步骤

1. 在posts目录创建新的.md文件
2. 创建对应的HTML文件
3. 更新首页的文章列表

## 代码示例

\`\`\`javascript
// 示例代码
function addNewPost() {
    console.log("成功添加新文章！");
}

addNewPost();
\`\`\`

## 总结

添加新文章非常简单，只需按照固定的格式创建文件即可。
            `;
        } else {
            markdownContent = '# 文章未找到';
        }
        
        // 检查marked对象是否已加载
        if (typeof marked === 'undefined') {
            console.error('marked库未成功加载，无法渲染Markdown内容');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = '无法加载Markdown渲染库，请检查网络连接或刷新页面重试。';
            articleContainer.appendChild(errorDiv);
            return;
        }
        
        // 渲染Markdown内容
        const htmlContent = marked.parse(markdownContent);
        
        // 创建内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'markdown-content';
        contentDiv.innerHTML = htmlContent;
        
        // 添加内容到文章容器
        articleContainer.appendChild(contentDiv);
        
        // 添加返回首页链接
        const homeLinkP = document.createElement('p');
        homeLinkP.className = 'home-link';
        const homeLink = document.createElement('a');
        homeLink.href = '../index.html';
        homeLink.textContent = '返回首页';
        homeLinkP.appendChild(homeLink);
        articleContainer.appendChild(homeLinkP);
        
        console.log('Markdown内容已成功渲染');
    } catch (error) {
        console.error('加载Markdown内容失败:', error);
        // 显示错误信息给用户
        const articleContainer = document.querySelector('article');
        if (articleContainer) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = '加载文章内容时出错，请稍后重试。';
            articleContainer.appendChild(errorDiv);
        }
    }
}

/**
 * 加载marked.js库（如果尚未加载）
 * @returns {Promise} 加载完成的Promise
 */
function loadMarkedIfNeeded() {
    return new Promise((resolve, reject) => {
        // 检查marked是否已加载
        if (window.marked) {
            resolve();
            return;
        }
        
        // 创建script元素
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
            console.log('marked.js库已成功加载');
            resolve();
        };
        script.onerror = () => {
            console.error('无法加载marked.js库');
            reject(new Error('Failed to load marked.js'));
        };
        
        // 添加到文档
        document.head.appendChild(script);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);