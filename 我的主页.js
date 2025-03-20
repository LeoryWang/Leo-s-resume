// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化滚动监听
    initScrollSpy();
    
    // 初始化动画观察器
    initAnimationObserver();
    
    // 触发初始动画
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function initAnimationObserver() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initSmoothScroll() {
    // 为所有导航链接添加点击事件
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标部分ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 平滑滚动到目标部分
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新导航栏活动状态
                updateActiveNav(this);
            }
        });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNav(activeLink) {
    // 移除所有链接的active类
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前链接添加active类
    activeLink.classList.add('active');
}
