function toggleTheme() {
    const themeLink = document.getElementById('theme-style');
    const isDark = themeLink.href.includes('dark');
    
    // 切换CSS文件
    themeLink.href = isDark ? 'css/light.css' : 'css/dark.css';
    
    // 保存到LocalStorage
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light';
document.getElementById('theme-style').href = `css/${savedTheme}.css`;