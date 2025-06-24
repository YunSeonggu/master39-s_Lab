// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
    
    // 햄버거 메뉴 토글
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 스무스 스크롤
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // 모바일에서 메뉴 닫기
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.service-card, .section-header');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 히어로 섹션 파티클 애니메이션 강화
    createFloatingParticles();
    
    // 버튼 클릭 효과
    const buttons = document.querySelectorAll('.btn, .service-btn, .banner-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 리플 효과
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 타이핑 효과 (히어로 타이틀)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                if (originalText.charAt(i) === '<') {
                    // HTML 태그 처리
                    const closeTag = originalText.indexOf('>', i);
                    heroTitle.innerHTML += originalText.substring(i, closeTag + 1);
                    i = closeTag + 1;
                } else {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// 플로팅 파티클 생성 함수
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        if (hero) {
            hero.appendChild(particle);
        }
    }
}

// CSS 애니메이션 동적 추가
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// 페이지 로드 애니메이션
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 서비스 카드 호버 효과 강화
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });
});

// 모달 기능
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
        
        // 버튼 생성기 초기화
        if (modalId === 'service-modal') {
            initializeButtonGenerator();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 스크롤 복원
    }
}

// 모달 바깥 클릭 시 닫기
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// 버튼 생성기 기능
function initializeButtonGenerator() {
    const textInput = document.getElementById('button-text');
    const colorInput = document.getElementById('button-color');
    const sizeSelect = document.getElementById('button-size');
    
    if (textInput && colorInput && sizeSelect) {
        // 실시간 미리보기 업데이트
        [textInput, colorInput, sizeSelect].forEach(input => {
            input.addEventListener('input', updatePreview);
        });
        
        // 초기 미리보기 설정
        updatePreview();
    }
}

function updatePreview() {
    const text = document.getElementById('button-text').value || '클릭하세요';
    const color = document.getElementById('button-color').value;
    const size = document.getElementById('button-size').value;
    
    const previewButton = document.querySelector('.preview-button');
    const htmlCode = document.getElementById('html-code');
    
    if (previewButton && htmlCode) {
        // 크기 설정
        let padding, fontSize;
        switch (size) {
            case 'small':
                padding = '0.5rem 1rem';
                fontSize = '0.9rem';
                break;
            case 'large':
                padding = '1.2rem 2.5rem';
                fontSize = '1.2rem';
                break;
            default: // medium
                padding = '1rem 2rem';
                fontSize = '1rem';
        }
        
        // 미리보기 업데이트
        previewButton.textContent = text;
        previewButton.style.backgroundColor = color;
        previewButton.style.padding = padding;
        previewButton.style.fontSize = fontSize;
        
        // HTML 코드 생성
        const htmlString = `<button style="
    background-color: ${color};
    color: white;
    border: none;
    padding: ${padding};
    font-size: ${fontSize};
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
" onmouseover="this.style.transform='translateY(-2px)'" 
   onmouseout="this.style.transform='translateY(0)'">
    ${text}
</button>`;
        
        htmlCode.value = htmlString;
    }
}

function generateButton() {
    updatePreview();
    alert('버튼이 생성되었습니다! 아래 HTML 코드를 복사해서 사용하세요.');
}

function copyCode() {
    const htmlCode = document.getElementById('html-code');
    if (htmlCode) {
        htmlCode.select();
        htmlCode.setSelectionRange(0, 99999); // 모바일용
        
        try {
            document.execCommand('copy');
            alert('HTML 코드가 클립보드에 복사되었습니다! 🎉');
        } catch (err) {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
        }
    }
}

// 폼 제출 처리
document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.querySelector('.request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            if (name && email) {
                alert(`📧 ${name}님의 자료 신청이 완료되었습니다!\n이메일: ${email}\n\n곧 자료를 보내드리겠습니다. 감사합니다! 🎉`);
                closeModal('banner-modal');
                this.reset();
            }
        });
    }
    
    // 코스 버튼 클릭 처리
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('course-btn')) {
            const courseName = e.target.closest('.course-item').querySelector('h3').textContent;
            alert(`🎓 "${courseName}" 과정을 시작합니다!\n\n곧 학습 페이지로 이동됩니다.`);
        }
        
        if (e.target.classList.contains('gpt-btn')) {
            const gptName = e.target.closest('.gpt-card').querySelector('h3').textContent;
            
            // 실제 연결된 GPT가 아닌 경우만 일반 알림 표시
            if (!gptName.includes('운명통합관상AI') && !gptName.includes('StockPulseGPT')) {
                alert(`🤖 "${gptName}"을 체험합니다!\n\n새 창에서 GPT가 열립니다.`);
            }
        }
    });
});

// 블로그 포스트 기능
const blogPosts = {
    post1: {
        category: '🚀 AI 트렌드',
        title: 'AI를 활용한 웹 개발의 미래',
        date: '2024.06.20',
        views: '👁 1,234'
    },
    post2: {
        category: '💻 개발 팁',
        title: 'React와 AI의 완벽한 결합',
        date: '2024.06.18',
        views: '👁 892'
    },
    post3: {
        category: '🎨 디자인',
        title: '사용자 경험을 향상시키는 UI 디자인',
        date: '2024.06.15',
        views: '👁 756'
    },
    post4: {
        category: '⚡ 성능',
        title: '웹사이트 성능 최적화 완벽 가이드',
        date: '2024.06.12',
        views: '👁 1,456'
    },
    post5: {
        category: '🔧 도구',
        title: '개발자를 위한 필수 AI 도구 10선',
        date: '2024.06.10',
        views: '👁 2,134'
    },
    post6: {
        category: '📊 분석',
        title: '데이터 분석으로 보는 웹 트렌드',
        date: '2024.06.08',
        views: '👁 1,023'
    }
};

function openBlogPost(postId) {
    const modal = document.getElementById('blog-post-modal');
    const post = blogPosts[postId];
    
    if (modal && post) {
        // 포스트 내용 업데이트
        document.getElementById('post-category').textContent = post.category;
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = post.date;
        document.getElementById('post-views').textContent = post.views;
        
        // 모달 표시
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 스크롤을 맨 위로
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

function closeBlogPost() {
    const modal = document.getElementById('blog-post-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Master39 GPT 연결 함수
function openMaster39GPT() {
    // 실제 ChatGPT 링크로 새 창에서 열기
    const gptUrl = 'https://chatgpt.com/g/g-680f145ee1fc8191978cac8665419dea-unmyeongtonghabgwansangai-master39';
    
    // 새 창에서 열기
    window.open(gptUrl, '_blank', 'noopener,noreferrer');
    
    // 사용자에게 알림
    setTimeout(() => {
        alert('🔮 운명통합관상AI GPT가 새 창에서 열렸습니다!\n\n✨ 사주팔자, 주역, 관상을 통합한 맞춤형 운세 분석을 체험해보세요!');
    }, 500);
}

// StockPulseGPT 연결 함수
function openStockPulseGPT() {
    // 실제 ChatGPT 링크로 새 창에서 열기
    const gptUrl = 'https://chatgpt.com/g/g-67f49cc2c49c819192b2e68cfa9d59dd-stockpulsegpt-master39-pro';
    
    // 새 창에서 열기
    window.open(gptUrl, '_blank', 'noopener,noreferrer');
    
    // 사용자에게 알림
    setTimeout(() => {
        alert('📈 StockPulseGPT Master39 Pro+가 새 창에서 열렸습니다!\n\n💰 실시간 주식 뉴스, 기술 분석, 재무 진단을 체험해보세요!');
    }, 500);
}

// SEO 블로그 자동화 기능
let keywordAnalysisData = null;

function analyzeKeywords() {
    const keyword = document.getElementById('seo-keyword').value.trim();
    
    if (!keyword) {
        alert('핵심 키워드를 입력해주세요.');
        return;
    }
    
    // 진행 상태 표시
    const progressContainer = document.getElementById('keyword-progress');
    const progressBar = document.getElementById('keyword-progress-bar');
    const progressText = document.getElementById('keyword-progress-text');
    const resultsArea = document.getElementById('keyword-results');
    
    progressContainer.style.display = 'block';
    resultsArea.innerHTML = '<p class="placeholder-text">분석 중...</p>';
    
    // 진행바 애니메이션
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 500);
    
    // 시뮬레이션 데이터로 키워드 분석 결과 생성
    setTimeout(() => {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = '분석 완료!';
        
        // 키워드 분석 결과 생성
        const analysisResults = generateKeywordAnalysis(keyword);
        keywordAnalysisData = analysisResults;
        
        // 결과 표시
        displayKeywordResults(analysisResults);
        
        // 블로그 생성 버튼 활성화
        document.getElementById('generate-blog-btn').disabled = false;
        
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 1000);
        
    }, 3000 + Math.random() * 2000);
}

function generateKeywordAnalysis(baseKeyword) {
    // 네이버 SEO 자동화 스크립트의 로직을 시뮬레이션
    const relatedKeywords = [
        `${baseKeyword} 추천`,
        `${baseKeyword} 인기`,
        `${baseKeyword} 베스트`,
        `${baseKeyword} 할인`,
        `${baseKeyword} 특가`,
        `${baseKeyword} 브랜드`,
        `${baseKeyword} 정품`,
        `${baseKeyword} 리뷰`,
        `${baseKeyword} 가격`,
        `${baseKeyword} 비교`,
        `${baseKeyword} 순위`,
        `${baseKeyword} 구매`,
        `${baseKeyword} 후기`,
        `${baseKeyword} 사용법`,
        `${baseKeyword} 효과`,
        `최고의 ${baseKeyword}`,
        `인기 ${baseKeyword}`,
        `베스트 ${baseKeyword}`,
        `프리미엄 ${baseKeyword}`,
        `고급 ${baseKeyword}`
    ];
    
    const sellerMasterData = relatedKeywords.slice(0, 10).map(keyword => {
        const seed = keyword.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const random = (seed * 9301 + 49297) % 233280;
        const baseViews = 1000 + (random % 50000);
        const products = 100 + (random % 5000);
        
        return {
            키워드: keyword,
            PC검색량: (baseViews * 0.3).toLocaleString(),
            모바일검색량: (baseViews * 0.7).toLocaleString(),
            총조회수: baseViews.toLocaleString(),
            상품수: products.toLocaleString(),
            비율: ((baseViews / products) * 100).toFixed(3),
            상품명제안: `${keyword} 프리미엄 상품`
        };
    });
    
    return {
        baseKeyword,
        relatedKeywords,
        sellerMasterData,
        totalKeywords: relatedKeywords.length,
        analysisDate: new Date().toLocaleString('ko-KR')
    };
}

function displayKeywordResults(results) {
    const resultsArea = document.getElementById('keyword-results');
    
    let html = `
        <div class="keyword-analysis-results">
            <div class="analysis-summary">
                <h4>📊 분석 요약</h4>
                <ul>
                    <li>기본 키워드: <strong>${results.baseKeyword}</strong></li>
                    <li>추출된 키워드: <strong>${results.totalKeywords}개</strong></li>
                    <li>분석 완료 시간: ${results.analysisDate}</li>
                </ul>
            </div>
            
            <div class="related-keywords-section">
                <h4>🎯 연관 키워드</h4>
                <div class="keyword-list">
    `;
    
    results.relatedKeywords.forEach(keyword => {
        html += `<span class="keyword-tag">${keyword}</span>`;
    });
    
    html += `
                </div>
            </div>
            
            <div class="sellermaster-section">
                <h4>📈 셀러마스터 분석 (상위 10개)</h4>
                <div class="sellermaster-table">
                    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc; font-weight: 600;">
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">키워드</th>
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">PC검색량</th>
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">모바일검색량</th>
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">총조회수</th>
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">상품수</th>
                                <th style="padding: 8px; border: 1px solid #e2e8f0;">비율</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    results.sellerMasterData.forEach(item => {
        html += `
            <tr>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: 500;">${item.키워드}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.PC검색량}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.모바일검색량}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.총조회수}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.상품수}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${item.비율}</td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    resultsArea.innerHTML = html;
}

function generateBlog() {
    const blogTone = document.getElementById('blog-tone').value;
    const blogLength = document.getElementById('blog-length').value;
    
    if (!keywordAnalysisData) {
        alert('먼저 키워드 분석을 진행해주세요.');
        return;
    }
    
    // 진행 상태 표시
    const progressContainer = document.getElementById('blog-progress');
    const progressBar = document.getElementById('blog-progress-bar');
    const progressText = document.getElementById('blog-progress-text');
    const resultsArea = document.getElementById('blog-results');
    
    progressContainer.style.display = 'block';
    resultsArea.innerHTML = '<p class="placeholder-text">AI가 SEO 최적화 블로그 글을 작성 중...</p>';
    
    // 진행바 애니메이션
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 85) progress = 85;
        progressBar.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = 'AI가 키워드를 분석하고 있습니다...';
        } else if (progress < 60) {
            progressText.textContent = 'SEO 최적화 구조를 설계하고 있습니다...';
        } else {
            progressText.textContent = '매력적인 블로그 콘텐츠를 작성하고 있습니다...';
        }
    }, 800);
    
    // GPT API 호출 시뮬레이션 (실제로는 서버에서 처리해야 함)
    setTimeout(() => {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = 'AI 블로그 글 생성 완료!';
        
        // 블로그 글 생성 (시뮬레이션)
        const blogContent = generateBlogContent(keywordAnalysisData, blogTone, blogLength);
        
        // 결과 표시
        displayBlogContent(blogContent);
        
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 1000);
        
    }, 5000 + Math.random() * 3000);
}

function generateBlogContent(analysisData, tone, length) {
    const { baseKeyword, relatedKeywords } = analysisData;
    
    const toneStyles = {
        friendly: '친근하고 따뜻한',
        professional: '전문적이고 신뢰감 있는',
        casual: '편안하고 자연스러운',
        trendy: '트렌디하고 젊은'
    };
    
    const lengthGuide = {
        short: '간결하고 핵심적인',
        medium: '균형 잡힌 상세한',
        long: '포괄적이고 심층적인'
    };
    
    // 시뮬레이션 블로그 내용 생성
    return `
        <h1>${baseKeyword} 완벽 가이드 - 2024년 최신 정보</h1>
        
        <p><strong>${baseKeyword}</strong>에 대해 궁금하신가요? 이 글에서는 ${toneStyles[tone]} 어조로 ${baseKeyword}에 대한 ${lengthGuide[length]} 내용을 다뤄보겠습니다.</p>
        
        <h2>🎯 ${baseKeyword}란 무엇인가요?</h2>
        <p>${baseKeyword}는 현재 많은 분들이 관심을 갖고 계시는 주제입니다. 특히 ${relatedKeywords.slice(0, 3).join(', ')} 등의 연관 키워드들과 함께 검색되고 있어, 이에 대한 종합적인 정보를 제공드리고자 합니다.</p>
        
        <h2>📊 ${baseKeyword} 트렌드 분석</h2>
        <p>최근 ${baseKeyword} 관련 검색량이 꾸준히 증가하고 있습니다. 특히 다음과 같은 키워드들이 함께 검색되고 있습니다:</p>
        <ul>
            ${relatedKeywords.slice(0, 5).map(keyword => `<li>${keyword}</li>`).join('')}
        </ul>
        
        <h3>🔍 주요 관심사</h3>
        <p>사용자들이 ${baseKeyword}에 대해 가장 많이 궁금해하는 내용들을 정리해보면:</p>
        <ul>
            <li>${baseKeyword} 추천 제품</li>
            <li>${baseKeyword} 가격 비교</li>
            <li>${baseKeyword} 사용법 및 효과</li>
            <li>${baseKeyword} 후기 및 리뷰</li>
        </ul>
        
        <h2>💡 ${baseKeyword} 선택 가이드</h2>
        <p>${baseKeyword}를 선택할 때 고려해야 할 중요한 요소들을 살펴보겠습니다.</p>
        
        <h3>1. 품질과 브랜드</h3>
        <p>신뢰할 수 있는 브랜드의 ${baseKeyword}를 선택하는 것이 중요합니다. ${baseKeyword} 브랜드별 특징과 장단점을 비교해보세요.</p>
        
        <h3>2. 가격 대비 성능</h3>
        <p>${baseKeyword} 가격을 비교할 때는 단순히 저렴한 것보다는 성능 대비 합리적인 가격의 제품을 선택하세요.</p>
        
        <h3>3. 사용자 후기</h3>
        <p>실제 ${baseKeyword} 사용자들의 후기와 리뷰를 참고하면 더 현명한 선택을 할 수 있습니다.</p>
        
        <h2>🛍️ ${baseKeyword} 추천 제품</h2>
        <p>현재 가장 인기 있는 ${baseKeyword} 제품들을 추천해드립니다:</p>
        
        <ul>
            <li><strong>프리미엄 ${baseKeyword}</strong> - 최고급 품질을 원하시는 분들께 추천</li>
            <li><strong>베스트 ${baseKeyword}</strong> - 가성비가 뛰어난 인기 제품</li>
            <li><strong>특가 ${baseKeyword}</strong> - 합리적인 가격의 실속형 제품</li>
        </ul>
        
        <h2>📈 ${baseKeyword} 구매 팁</h2>
        <p>${baseKeyword} 구매 시 알아두면 좋은 팁들을 소개합니다:</p>
        
        <ol>
            <li><strong>할인 시기 확인</strong>: ${baseKeyword} 할인 이벤트 시기를 미리 체크하세요</li>
            <li><strong>비교 쇼핑</strong>: 여러 쇼핑몰의 ${baseKeyword} 가격을 비교해보세요</li>
            <li><strong>정품 확인</strong>: ${baseKeyword} 정품 인증마크를 반드시 확인하세요</li>
        </ol>
        
        <h2>🤔 자주 묻는 질문</h2>
        
        <h3>Q1. ${baseKeyword}는 어떻게 사용하나요?</h3>
        <p>A1. ${baseKeyword} 사용법은 제품에 따라 다르지만, 일반적으로 다음과 같은 단계를 따르시면 됩니다...</p>
        
        <h3>Q2. ${baseKeyword} 효과는 언제부터 나타나나요?</h3>
        <p>A2. ${baseKeyword} 효과는 개인차가 있지만, 보통 사용 후 일정 시간이 지나면 효과를 실감할 수 있습니다...</p>
        
        <h2>🎯 결론</h2>
        <p>${baseKeyword}에 대한 정보를 종합해보면, 올바른 선택과 사용법을 통해 만족스러운 결과를 얻을 수 있습니다. ${baseKeyword} 구매를 고려하고 계신다면, 이 글에서 제공한 정보들을 참고하여 현명한 선택을 하시기 바랍니다.</p>
        
        <p>더 궁금한 점이 있으시면 언제든지 댓글로 문의해주세요. ${baseKeyword}에 대한 추가 정보도 계속 업데이트할 예정입니다!</p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #6366f1;">
            <p><strong>📝 이 글이 도움이 되셨나요?</strong></p>
            <p>${baseKeyword}에 대한 더 자세한 정보나 다른 관련 주제에 대해서도 궁금한 점이 있으시면 댓글로 알려주세요!</p>
        </div>
    `;
}

function displayBlogContent(content) {
    const resultsArea = document.getElementById('blog-results');
    
    resultsArea.innerHTML = `
        <div class="blog-content-display">
            ${content}
            <button class="copy-blog-btn" onclick="copyBlogContent()">📋 블로그 글 복사</button>
        </div>
    `;
}

function copyBlogContent() {
    const blogContent = document.querySelector('.blog-content-display');
    const textContent = blogContent.innerText;
    
    navigator.clipboard.writeText(textContent).then(() => {
        const copyBtn = document.querySelector('.copy-blog-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ 복사 완료!';
        copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        }, 2000);
    }).catch(() => {
        alert('복사 기능을 사용할 수 없습니다. 텍스트를 직접 선택해서 복사해주세요.');
    });
}

// 블로그글쓰기 자동화 관련 변수
let currentNaverTitles = [];
let currentAnalysisResult = null;
let generatedTitles = [];

// 환경 변수에서 API 키 가져오기 (실제 환경에서는 서버에서 처리)
// API 키는 환경변수로 서버에서 관리됩니다

// 네이버 블로그 제목 수집 및 GPT 분석 시작
async function startBlogAnalysis() {
    const keyword = document.getElementById('blog-keyword').value.trim();
    
    if (!keyword) {
        alert('분석할 키워드를 입력해주세요.');
        return;
    }
    
    // 1단계: 네이버 블로그 제목 수집
    await collectNaverTitles(keyword);
    
    // 2단계: GPT 분석 및 제목 생성
    await analyzeWithGPT();
}

// 네이버 블로그 제목 수집 (실제 API 호출)
async function collectNaverTitles(keyword) {
    const progressContainer = document.getElementById('naver-titles-progress');
    const progressBar = document.getElementById('naver-progress-bar');
    const resultsContainer = document.getElementById('naver-titles-results');
    
    progressContainer.style.display = 'block';
    resultsContainer.innerHTML = '<p class="placeholder-text">네이버 블로그 제목을 수집하고 있습니다...</p>';
    
    // 진행바 애니메이션
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
    
    try {
        // 실제 네이버 API 호출
        const response = await fetch(`/api/naver-blog?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        currentNaverTitles = data.titles;
        
    } catch (error) {
        console.error('네이버 제목 수집 오류:', error);
        // 오류 시 시뮬레이션 데이터로 대체
        currentNaverTitles = generateNaverTitles(keyword);
        alert('네이버 API 호출에 실패했습니다. 시뮬레이션 데이터를 사용합니다.');
    }
    
    clearInterval(interval);
    progressBar.style.width = '100%';
    progressContainer.style.display = 'none';
    displayNaverTitles();
}

// 네이버 제목 시뮬레이션 데이터 생성
function generateNaverTitles(keyword) {
    const templates = [
        `${keyword} 추천 BEST 10 완전정리`,
        `${keyword} 구매가이드 | 2024년 최신`,
        `${keyword} 후기 총정리 솔직리뷰`,
        `${keyword} 가격비교 최저가 찾기`,
        `${keyword} 사용법 초보자 가이드`,
        `2024 ${keyword} 순위 TOP 5`,
        `${keyword} 장단점 완벽분석`,
        `${keyword} 무엇을 선택할까? 비교분석`,
        `${keyword} 실제 사용후기 공유`,
        `${keyword} 구매 전 꼭 알아야 할 5가지`,
        `${keyword} 브랜드별 비교 추천`,
        `${keyword} 가성비 제품 추천`,
        `${keyword} 할인정보 모음`,
        `${keyword} 트렌드 2024`,
        `${keyword} 선택기준 완벽가이드`,
        `${keyword} 종류별 특징 정리`,
        `${keyword} 구매팁 노하우`,
        `${keyword} 리뷰 모음집`,
        `${keyword} 인기순위 베스트`,
        `${keyword} 전문가 추천`,
        `${keyword} 꿀팁 모음`,
        `${keyword} 체크포인트 5가지`,
        `${keyword} 2024 신제품 정보`,
        `${keyword} 할부 무이자 정보`,
        `${keyword} 세일정보 총정리`,
        `${keyword} A부터 Z까지`,
        `${keyword} 완벽가이드북`,
        `${keyword} 실패없는 선택법`,
        `${keyword} 고르는 방법`,
        `${keyword} 최신 정보 업데이트`
    ];
    
    return templates.slice(0, 30);
}

// 네이버 제목 결과 표시
function displayNaverTitles() {
    const resultsContainer = document.getElementById('naver-titles-results');
    let html = '<div class="naver-titles-list">';
    
    currentNaverTitles.forEach((title, index) => {
        html += `<div class="naver-title-item">${index + 1}. ${title}</div>`;
    });
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// GPT 분석 및 제목 생성
async function analyzeWithGPT() {
    const progressContainer = document.getElementById('gpt-analysis-progress');
    const progressBar = document.getElementById('gpt-analysis-bar');
    const resultsContainer = document.getElementById('gpt-analysis-results');
    const titlesContainer = document.getElementById('generated-titles-results');
    
    progressContainer.style.display = 'block';
    resultsContainer.innerHTML = '<p class="placeholder-text">GPT가 제목을 분석하고 있습니다...</p>';
    
    // 진행바 애니메이션
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 300);
    
    try {
        // 백엔드를 통한 GPT API 호출
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: '네이버 블로그 제목을 분석하여 구조, 키워드, 패턴을 파악하고 새로운 제목 10개를 생성해주세요.'
                    },
                    {
                        role: 'user',
                        content: `다음 제목들을 분석해주세요: ${currentNaverTitles.join(', ')}`
                    }
                ],
                model: 'gpt-4o',
                max_tokens: 2000
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // 분석 결과 저장
        currentAnalysisResult = {
            structure: data.structure,
            keywords: data.keywords,
            pattern: data.pattern,
            interest: data.interest,
            seo: data.seo
        };
        
        // 생성된 제목들 추출
        generatedTitles = [];
        for (let i = 1; i <= 10; i++) {
            if (data[`title${i}`]) {
                generatedTitles.push(data[`title${i}`]);
            }
        }
        
        // 제목이 없으면 시뮬레이션 데이터 사용
        if (generatedTitles.length === 0) {
            throw new Error('생성된 제목이 없습니다.');
        }
        
    } catch (error) {
        console.error('GPT 분석 오류:', error);
        // 오류 시 시뮬레이션 데이터로 대체
        currentAnalysisResult = generateAnalysisResult();
        generatedTitles = generateNewTitles();
        alert(`GPT API 호출에 실패했습니다.\n오류: ${error.message}\n시뮬레이션 데이터를 사용합니다.`);
    }
    
    clearInterval(interval);
    progressBar.style.width = '100%';
    progressContainer.style.display = 'none';
    displayAnalysisResult();
    displayGeneratedTitles();
    
    // 블로그 글 작성 버튼 활성화
    document.getElementById('write-btn').disabled = false;
}

// GPT 분석 결과 시뮬레이션
function generateAnalysisResult() {
    return {
        structure: "대부분의 제목이 10-20자 내외의 중간 길이를 가지며, '추천', 'BEST', '가이드', '후기' 등의 신뢰성을 높이는 키워드를 포함합니다. 숫자를 활용한 구체적인 정보 제공과 '2024년 최신' 같은 시의성을 강조하는 패턴이 두드러집니다.",
        keywords: "추천, BEST, 가이드, 후기, 순위, 비교, 가격, 구매, 리뷰, 2024, 최신, 완벽, 총정리, 할인, 가성비 등이 고빈도로 등장하며, 이는 구매 의사결정에 필요한 정보를 제공한다는 신호를 보냅니다.",
        pattern: "[키워드] + [액션워드] + [구체적 정보] 형태가 주를 이루며, 특히 '추천 BEST 10', '완전정리', '솔직리뷰' 같은 완성도와 신뢰성을 암시하는 구조가 반복됩니다.",
        interest: "숫자 활용(TOP 5, BEST 10), 시의성 강조(2024년 최신), 완전성 어필(완벽분석, 총정리), 개인적 경험(실제 후기, 솔직리뷰) 등을 통해 클릭 유도를 극대화합니다.",
        seo: "키워드를 제목 앞부분에 배치하고, 검색량이 높은 '추천', '가격', '후기' 등의 단어를 조합하여 검색 노출을 최적화했습니다. 구체적인 숫자와 연도를 포함해 정확성을 높였습니다."
    };
}

// 새로운 제목 생성 시뮬레이션
function generateNewTitles() {
    const keyword = document.getElementById('blog-keyword').value.trim();
    const titleCount = parseInt(document.getElementById('title-count').value);
    
    const newTitleTemplates = [
        `${keyword} 전문가가 알려주는 선택의 기술`,
        `${keyword} 숨겨진 꿀정보 대공개`,
        `${keyword} 현명한 소비자를 위한 가이드`,
        `${keyword} 트렌드 분석과 미래 전망`,
        `${keyword} 초보자도 쉽게 이해하는 완벽 가이드`,
        `${keyword} 가성비 최고! 추천 제품 리스트`,
        `${keyword} 구매 전 반드시 확인할 체크리스트`,
        `${keyword} 실패 없는 선택을 위한 노하우`,
        `${keyword} 2024년 최신 트렌드 완벽 정리`,
        `${keyword} 브랜드별 장단점 솔직 비교`,
        `${keyword} 예산별 맞춤 추천 가이드`,
        `${keyword} 사용자 리뷰로 보는 실제 만족도`,
        `${keyword} 전문가 vs 일반인, 선택 기준의 차이`,
        `${keyword} 온라인 최저가 쇼핑 노하우`,
        `${keyword} 라이프스타일별 맞춤 추천`
    ];
    
    return newTitleTemplates.slice(0, titleCount);
}

// GPT 분석 결과 표시
function displayAnalysisResult() {
    const resultsContainer = document.getElementById('gpt-analysis-results');
    
    const html = `
        <div class="gpt-analysis-section">
            <h4>📊 제목의 구조적 특징</h4>
            <div class="gpt-analysis-content">${currentAnalysisResult.structure}</div>
        </div>
        <div class="gpt-analysis-section">
            <h4>🎯 핵심 키워드</h4>
            <div class="gpt-analysis-content">${currentAnalysisResult.keywords}</div>
        </div>
        <div class="gpt-analysis-section">
            <h4>🔧 제목 구성 패턴</h4>
            <div class="gpt-analysis-content">${currentAnalysisResult.pattern}</div>
        </div>
        <div class="gpt-analysis-section">
            <h4>💡 독자 관심 유발 기법</h4>
            <div class="gpt-analysis-content">${currentAnalysisResult.interest}</div>
        </div>
        <div class="gpt-analysis-section">
            <h4>🔍 SEO 최적화 특징</h4>
            <div class="gpt-analysis-content">${currentAnalysisResult.seo}</div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

// 생성된 제목 표시
function displayGeneratedTitles() {
    const resultsContainer = document.getElementById('generated-titles-results');
    let html = '<div class="generated-titles-list">';
    
    generatedTitles.forEach((title, index) => {
        html += `
            <div class="generated-title-item">
                <div class="title-text">${index + 1}. ${title}</div>
                <button class="title-select-btn" onclick="selectTitleForBlog('${title}')">
                    선택
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// 제목 선택하여 블로그 글 작성
function selectTitleForBlog(title) {
    startBlogWritingWithTitle(title);
}

// 블로그 글 작성 시작
async function startBlogWriting() {
    if (generatedTitles.length === 0) {
        alert('먼저 제목 분석을 완료해주세요.');
        return;
    }
    
    // 첫 번째 제목으로 자동 시작
    await startBlogWritingWithTitle(generatedTitles[0]);
}

// 선택된 제목으로 블로그 글 작성
async function startBlogWritingWithTitle(selectedTitle) {
    const model = document.getElementById('blog-model').value;
    const minChars = document.getElementById('min-chars').value;
    const maxChars = document.getElementById('max-chars').value;
    
    const progressContainer = document.getElementById('blog-writing-progress');
    const progressBar = document.getElementById('blog-writing-bar');
    const progressText = document.getElementById('blog-writing-text');
    const resultsContainer = document.getElementById('blog-writing-results');
    
    progressContainer.style.display = 'block';
    resultsContainer.innerHTML = '<p class="placeholder-text">블로그 글을 작성하고 있습니다...</p>';
    
    // 단계별 진행 표시
    const steps = [
        '키워드 분석 중...',
        '구조 설계 중...',
        '본문 작성 중...',
        'SEO 최적화 중...',
        '최종 검토 중...'
    ];
    
    let progress = 0;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
        progress += 4;
        progressBar.style.width = progress + '%';
        
        if (progress >= (stepIndex + 1) * 20 && stepIndex < steps.length - 1) {
            stepIndex++;
            progressText.textContent = steps[stepIndex];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 150);
    
    try {
        // 실제 GPT API 호출로 블로그 글 생성
        const response = await fetch('/api/generate-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: selectedTitle,
                model: model,
                minChars: parseInt(minChars),
                maxChars: parseInt(maxChars)
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        const blogPost = data.content;
        
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressContainer.style.display = 'none';
        displayBlogPostAutomation(selectedTitle, blogPost);
        
    } catch (error) {
        console.error('블로그 글 생성 오류:', error);
        // 오류 시 시뮬레이션 데이터로 대체
        const blogPost = generateBlogPostAutomation(selectedTitle, minChars, maxChars);
        
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressContainer.style.display = 'none';
        displayBlogPostAutomation(selectedTitle, blogPost);
        
        alert(`GPT API 호출에 실패했습니다.\n오류: ${error.message}\n시뮬레이션 데이터를 사용합니다.`);
    }
}

// 블로그 글 생성 시뮬레이션
function generateBlogPostAutomation(title, minChars, maxChars) {
    const keyword = document.getElementById('blog-keyword').value.trim();
    
    return `# ${title}

안녕하세요! 오늘은 **${keyword}**에 대해 자세히 알아보는 시간을 가져보겠습니다. 

## 🔍 ${keyword}란 무엇인가요?

${keyword}는 현재 많은 분들이 관심을 가지고 계시는 주요 관심사 중 하나입니다. 최근 트렌드를 분석해보면, ${keyword}에 대한 관심도가 꾸준히 증가하고 있으며, 특히 2024년에는 더욱 주목받고 있는 상황입니다.

## 📊 ${keyword} 선택 기준

### 1. 품질과 성능
가장 중요한 것은 품질과 성능입니다. ${keyword}를 선택할 때는 다음과 같은 요소들을 고려해야 합니다:
- 내구성과 안정성
- 사용 편의성
- 가성비

### 2. 브랜드 신뢰도
신뢰할 수 있는 브랜드인지 확인하는 것도 중요합니다. 고객 리뷰와 평점을 참고하여 선택하시는 것을 추천드립니다.

### 3. 가격 대비 효과
합리적인 가격인지 여러 업체를 비교해보시고 결정하시기 바랍니다.

## 💡 ${keyword} 활용 팁

실제 사용자들의 후기를 종합해보면, ${keyword}를 효과적으로 활용하기 위해서는 다음과 같은 방법들이 도움이 됩니다:

1. **사전 정보 수집**: 충분한 정보를 수집한 후 결정하기
2. **전문가 상담**: 필요시 전문가의 조언을 구하기
3. **실제 체험**: 가능하다면 직접 체험해보기

## 🎯 ${keyword} 추천 가이드

### 초보자를 위한 추천
${keyword}를 처음 접하시는 분들께는 다음과 같은 기준으로 선택하시길 권합니다:
- 사용법이 간단한 제품
- 고객 지원이 잘 되는 브랜드
- 합리적인 가격대의 제품

### 경험자를 위한 추천
이미 ${keyword}에 대한 경험이 있으신 분들은:
- 고급 기능을 제공하는 제품
- 커스터마이징이 가능한 제품
- 전문적인 용도에 특화된 제품

## 📈 2024년 ${keyword} 트렌드

올해 ${keyword} 시장의 주요 트렌드는 다음과 같습니다:
- 스마트 기능 강화
- 친환경적 요소 증가
- 개인 맞춤화 서비스 확대

## 🛍️ ${keyword} 추천 제품 TOP 5

1. **프리미엄 ${keyword}** - 최고급 품질의 제품
2. **베스트셀러 ${keyword}** - 가장 인기 있는 제품
3. **가성비 ${keyword}** - 합리적인 가격의 제품
4. **신제품 ${keyword}** - 최신 기술이 적용된 제품
5. **특가 ${keyword}** - 할인가로 구매 가능한 제품

## ❓ 자주 묻는 질문 (FAQ)

**Q: ${keyword} 선택 시 가장 중요한 것은 무엇인가요?**
A: 개인의 용도와 예산을 고려하여 가성비가 좋은 제품을 선택하는 것이 중요합니다.

**Q: ${keyword} 관련해서 주의할 점이 있나요?**
A: 구매 전 충분한 정보 수집과 비교 검토를 하시는 것을 권장드립니다.

**Q: ${keyword} 사용 시 어떤 효과를 기대할 수 있나요?**
A: 올바른 사용법을 따르면 만족스러운 결과를 얻을 수 있습니다.

## 💝 마무리

지금까지 ${keyword}에 대해 자세히 알아보았습니다. 이 정보가 여러분의 선택에 도움이 되었기를 바랍니다. ${keyword}를 통해 더 나은 일상을 만들어 가시길 응원합니다!

궁금한 점이 있으시면 언제든 댓글로 문의해 주세요. 감사합니다! 🙏

---
*이 글이 도움이 되셨다면 공유와 좋아요 부탁드립니다!* ❤️`;
}

// 블로그 글 결과 표시
function displayBlogPostAutomation(title, content) {
    const resultsContainer = document.getElementById('blog-writing-results');
    
    const formattedContent = content
        .replace(/\n/g, '<br>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\- (.*)$/gm, '<li>$1</li>')
        .replace(/^(\d+)\. (.*)$/gm, '<li>$2</li>');
    
    const html = `
        <div class="blog-post-display">
            <h1>📝 생성된 블로그 글</h1>
            <div class="blog-content">${formattedContent}</div>
        </div>
        <button class="copy-post-btn" onclick="copyBlogPostAutomation('${title}', \`${content.replace(/`/g, '\\`').replace(/'/g, "\\'")}\`)">
            📋 블로그 글 복사하기
        </button>
    `;
    
    resultsContainer.innerHTML = html;
}

// 블로그 글 복사
function copyBlogPostAutomation(title, content) {
    const fullContent = `제목: ${title}\n\n${content}`;
    navigator.clipboard.writeText(fullContent).then(() => {
        const copyBtn = document.querySelector('.copy-post-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ 복사 완료!';
        copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        }, 2000);
    }).catch(() => {
        alert('복사 기능을 사용할 수 없습니다. 텍스트를 직접 선택해서 복사해주세요.');
    });
} 