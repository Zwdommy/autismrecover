// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 添加滚动动画
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 增强鼠标跟随效果
let cursorTrails = [];
const maxTrails = 20;

document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    document.body.appendChild(cursor);
    cursorTrails.push(cursor);

    if (cursorTrails.length > maxTrails) {
        const oldCursor = cursorTrails.shift();
        oldCursor.remove();
    }

    setTimeout(() => {
        cursor.remove();
        cursorTrails = cursorTrails.filter(trail => trail !== cursor);
    }, 1000);
});

// 增强浮动元素动画
function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.width = Math.random() * 100 + 50 + 'px';
    element.style.height = element.style.width;
    element.style.animationDuration = (Math.random() * 10 + 10) + 's';
    element.style.animationDelay = (Math.random() * 5) + 's';
    document.querySelector('.floating-elements').appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 15000);
}

// 增强视频和音频播放器交互
const mediaPlayers = document.querySelectorAll('video, audio');
mediaPlayers.forEach(player => {
    player.addEventListener('play', () => {
        player.parentElement.classList.add('playing');
        createFloatingElement(); // 播放时创建额外的浮动元素
    });

    player.addEventListener('pause', () => {
        player.parentElement.classList.remove('playing');
    });

    // 添加进度条动画
    player.addEventListener('timeupdate', () => {
        const progress = (player.currentTime / player.duration) * 100;
        player.parentElement.style.setProperty('--progress', `${progress}%`);
    });
});

// 添加导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 添加视差滚动效果
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.feature-card, .video-container, .music-player');
    
    parallaxElements.forEach(element => {
        const speed = 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 添加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 为标题添加打字机效果
const heroTitle = document.querySelector('#hero h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
}

// 添加滚动到顶部按钮
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // 为每个部分添加延迟动画
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
    startStarAnimation();
});

// 创建星星动画
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // 随机大小
    const sizes = ['small', 'medium', 'large'];
    star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    
    // 随机颜色
    const colors = ['pink', 'blue', 'yellow'];
    star.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    // 随机起始位置
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    
    // 随机动画时长
    const duration = Math.random() * 10 + 10; // 10-20秒
    star.style.animationDuration = `${duration}s`;
    
    // 随机延迟
    const delay = Math.random() * 5;
    star.style.animationDelay = `${delay}s`;
    
    document.body.appendChild(star);
    
    // 动画结束后移除星星
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

// 定期创建星星
function startStarAnimation() {
    // 初始创建一些星星
    for (let i = 0; i < 3; i++) { // 减少初始星星数量
        createStar();
    }
    
    // 每隔一段时间创建新的星星
    setInterval(() => {
        if (document.querySelectorAll('.star').length < 5) { // 减少最大星星数量
            createStar();
        }
    }, 3000); // 增加创建间隔
}

// 当用户滚动时增加星星数量
let scrollTimeout;
window.addEventListener('scroll', () => {
    // 滚动时创建额外的星星
    if (Math.random() > 0.9) { // 降低创建概率到10%
        createStar();
    }
    
    // 清除之前的定时器
    clearTimeout(scrollTimeout);
    
    // 设置新的定时器，滚动停止后减少星星创建频率
    scrollTimeout = setTimeout(() => {
        const stars = document.querySelectorAll('.star');
        if (stars.length > 8) { // 减少最大星星数量
            stars.forEach((star, index) => {
                if (index < stars.length - 8) {
                    star.remove();
                }
            });
        }
    }, 1000);
});

// 语言配置
const translations = {
    zh: {
        'page.title': 'AutismRecover - 用AI和AR点亮星星的孩子',
        'nav.logo': '✨ AutismRecover',
        'nav.about': '关于项目',
        'nav.demo': '项目演示',
        'nav.music': 'AI音乐',
        'nav.report': '项目报告',
        'lang.switch': 'EN',
        'hero.title': '用AI和AR点亮星星的孩子',
        'hero.subtitle': '为自闭症儿童打造个性化康复体验',
        'hero.watch': '观看演示',
        'hero.learn': '了解更多',
        'about.title': '关于项目',
        'about.feature1.title': '绘画转3D',
        'about.feature1.desc': '将儿童的绘画作品转化为3D角色，实现互动体验',
        'about.feature2.title': 'AI辅助',
        'about.feature2.desc': '利用生成式AI技术，提供个性化康复方案',
        'about.feature3.title': '音乐治疗',
        'about.feature3.desc': 'AI生成的音乐，帮助提升社交能力',
        'demo.title': '项目演示',
        'demo.videoError': '您的浏览器不支持视频播放。',
        'music.title': 'AI生成的音乐',
        'music.audioError': '您的浏览器不支持音频播放。',
        'music.info': '《In Our Song》- AI生成的治愈音乐',
        'report.title': '项目报告',
        'report.view': '查看完整报告',
        'footer.copyright': '© 2024 AutismRecover Project. All rights reserved.'
    },
    en: {
        'page.title': 'AutismRecover - Lighting Up Stars with AI and AR',
        'nav.logo': '✨ AutismRecover',
        'nav.about': 'About',
        'nav.demo': 'Demo',
        'nav.music': 'AI Music',
        'nav.report': 'Report',
        'lang.switch': '中文',
        'hero.title': 'Lighting Up Stars with AI and AR',
        'hero.subtitle': 'Creating Personalized Recovery Experience for Children with Autism',
        'hero.watch': 'Watch Demo',
        'hero.learn': 'Learn More',
        'about.title': 'About the Project',
        'about.feature1.title': 'Drawing to 3D',
        'about.feature1.desc': 'Transform children\'s drawings into 3D characters for interactive experiences',
        'about.feature2.title': 'AI Assistance',
        'about.feature2.desc': 'Utilize generative AI technology to provide personalized recovery plans',
        'about.feature3.title': 'Music Therapy',
        'about.feature3.desc': 'AI-generated music to enhance social skills',
        'demo.title': 'Project Demo',
        'demo.videoError': 'Your browser does not support video playback.',
        'music.title': 'AI-Generated Music',
        'music.audioError': 'Your browser does not support audio playback.',
        'music.info': '"In Our Song" - AI-Generated Healing Music',
        'report.title': 'Project Report',
        'report.view': 'View Full Report',
        'footer.copyright': '© 2024 AutismRecover Project. All rights reserved.'
    }
};

// 当前语言
let currentLang = 'en'; // 修改默认语言为英文

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage();
    
    // 添加切换动画
    const langText = document.querySelector('.lang-text');
    langText.style.transform = 'scale(0)';
    setTimeout(() => {
        langText.style.transform = 'scale(1)';
    }, 150);
}

// 更新页面语言
function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
    
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', currentLang);
}

// 页面加载时检查语言偏好
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
    updateLanguage(); // 确保在页面加载时立即应用语言设置
});

// 音频播放器错误处理
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('musicPlayer');
    const audioError = document.getElementById('audioError');
    
    if (audioPlayer) {
        // 监听错误事件
        audioPlayer.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            audioError.style.display = 'block';
            audioError.textContent = '音频加载失败，请检查网络连接或刷新页面重试。';
        });

        // 监听加载事件
        audioPlayer.addEventListener('loadeddata', function() {
            console.log('Audio loaded successfully');
            audioError.style.display = 'none';
        });

        // 尝试预加载音频
        audioPlayer.load();
    }
}); 