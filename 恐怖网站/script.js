// 等待DOM加载完成
Document.prototype.ready = function(callback) {
    if (document.readyState !== 'loading') {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};

// 主函数
function init() {
    // 首先检查是否已经显示过免责声明
    if (!localStorage.getItem('disclaimerAccepted')) {
        // 如果没有显示过，显示免责声明模态框
        showDisclaimer();
    }
    
    // 添加恐怖背景音乐（如果浏览器支持）
    let audio = null;
    let backgroundMusic = null;
    
    if (typeof Audio !== 'undefined') {
        audio = new Audio();
        
        // 创建背景音乐对象
        backgroundMusic = new Audio('背景音乐/1.mp3');
        backgroundMusic.loop = true; // 设置循环播放
        backgroundMusic.volume = 0.3; // 设置音量为30%
        
        // 尝试立即播放背景音乐
        backgroundMusic.play().catch(error => {
            console.log('自动播放受限，等待用户交互后播放:', error);
            
            // 作为后备方案，仍然监听用户交互
            function playOnInteraction() {
                backgroundMusic.play();
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('keydown', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            }
            
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('keydown', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
        
        // 添加背景音乐控制按钮事件
        const musicToggle = document.getElementById('music-toggle');
        if (musicToggle) {
            musicToggle.addEventListener('click', function() {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(error => {
                        console.log('无法播放背景音乐:', error);
                    });
                    this.textContent = '🔇 停止音乐 🔇';
                } else {
                    backgroundMusic.pause();
                    this.textContent = '🎵 开始音乐 🎵';
                }
            });
        }
        
        // 添加音量控制滑块事件
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl) {
            volumeControl.addEventListener('input', function() {
                backgroundMusic.volume = parseFloat(this.value);
            });
        }
        
        // 添加视频按钮点击事件
        const videoBtn = document.getElementById('video-btn');
        if (videoBtn) {
            videoBtn.addEventListener('click', function() {
                // 暂停背景音乐
                if (backgroundMusic && !backgroundMusic.paused) {
                    backgroundMusic.pause();
                    // 更新音乐控制按钮文本
                    if (musicToggle) {
                        musicToggle.textContent = '🎵 开始音乐 🎵';
                    }
                }
                window.location.href = 'videos.html';
            });
        }
        
        // 返回首页按钮事件
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
    }
    
    // 开始按钮交互
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // 暂停背景音乐
            if (backgroundMusic && !backgroundMusic.paused) {
                backgroundMusic.pause();
                // 更新音乐控制按钮文本
                if (musicToggle) {
                    musicToggle.textContent = '🎵 开始音乐 🎵';
                }
            }
            
            // 播放点击音效
            playSound('click');
            
            // 添加屏幕闪烁效果
            flashScreen(3);
            
            // 短暂延迟后触发恐怖效果
            setTimeout(() => {
                triggerJumpScare();
            }, 1500);
        });
    }
    
    // 显示免责声明模态框函数
    function showDisclaimer() {
        // 创建模态框容器
        const modal = document.createElement('div');
        modal.id = 'disclaimer-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.backdropFilter = 'blur(5px)';
        
        // 创建模态框内容
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#1a1a1a';
        modalContent.style.color = '#ff3333';
        modalContent.style.padding = '40px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.maxWidth = '600px';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflow = 'auto';
        modalContent.style.border = '2px solid #ff3333';
        modalContent.style.boxShadow = '0 0 30px rgba(255, 51, 51, 0.8)';
        modalContent.style.animation = 'modal-pulse 2s infinite';
        
        // 添加标题
        const title = document.createElement('h2');
        title.textContent = '⚠️ 重要免责声明 ⚠️';
        title.style.textAlign = 'center';
        title.style.marginBottom = '20px';
        title.style.fontSize = '28px';
        title.style.color = '#ff0000';
        
        // 添加免责声明内容（从disclaimer.html复制）
        const content = document.createElement('div');
        content.innerHTML = `
            <p>在进入本恐怖网站之前，请务必阅读以下免责声明：</p>
            <br>
            <p class="disclaimer-warning">不建议以下人群访问本网站：</p>
            <ul>
                <li>心脏病患者</li>
                <li>高血压患者</li>
                <li>有心理疾病史者</li>
                <li>孕妇</li>
                <li>未成年人</li>
                <li>对恐怖内容敏感者</li>
            </ul>
            <br>
            <p class="disclaimer-warning">风险提示：</p>
            <p>本网站包含恐怖、惊悚、血腥、暴力等内容，可能引起恐惧、焦虑、恶心等不适反应。访问本网站即表示您已年满18周岁，并确认自己的心理健康状况适合接触此类内容。如在浏览过程中感到不适，请立即关闭网站。</p>
            <br>
            <p>本网站不对因访问或使用本网站内容而导致的任何心理或生理伤害承担责任。请谨慎选择是否继续访问！</p>
            <br>
            <p>点击"我已阅读并确认"表示您同意以上条款。</p>
        `;
        
        content.style.fontSize = '16px';
        content.style.lineHeight = '1.8';
        
        // 设置警告文本样式
        const warnings = content.querySelectorAll('.disclaimer-warning');
        warnings.forEach(warning => {
            warning.style.color = '#ff6666';
            warning.style.fontWeight = 'bold';
        });
        
        // 设置列表样式
        const ul = content.querySelector('ul');
        ul.style.marginLeft = '20px';
        ul.style.marginTop = '10px';
        ul.style.marginBottom = '10px';
        
        // 创建确认按钮
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '我已阅读并确认';
        confirmBtn.style.display = 'block';
        confirmBtn.style.margin = '20px auto 0';
        confirmBtn.style.padding = '12px 40px';
        confirmBtn.style.fontSize = '18px';
        confirmBtn.style.fontWeight = 'bold';
        confirmBtn.style.backgroundColor = '#ff3333';
        confirmBtn.style.color = '#fff';
        confirmBtn.style.border = 'none';
        confirmBtn.style.borderRadius = '5px';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.style.boxShadow = '0 5px 15px rgba(255, 51, 51, 0.5)';
        confirmBtn.style.transition = 'all 0.3s ease';
        
        // 添加按钮悬停效果
        confirmBtn.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#ff0000';
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.7)';
        });
        
        confirmBtn.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#ff3333';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(255, 51, 51, 0.5)';
        });
        
        // 添加确认按钮点击事件
        confirmBtn.addEventListener('click', function() {
            // 标记已接受免责声明
            localStorage.setItem('disclaimerAccepted', 'true');
            
            // 移除模态框
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                
                // 如果当前不在首页，重定向到首页
                if (window.location.pathname !== '/index.html' && 
                    window.location.pathname.endsWith('index.html') === false) {
                    window.location.href = 'index.html';
                }
            }, 300);
        });
        
        // 组装模态框
        modalContent.appendChild(title);
        modalContent.appendChild(content);
        modalContent.appendChild(confirmBtn);
        modal.appendChild(modalContent);
        
        // 添加到页面
        document.body.appendChild(modal);
    }
    
    // 视频功能 - 现在在videos.html页面中实现
    if (window.location.pathname.endsWith('videos.html')) {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // 视频播放时触发随机恐怖效果
            video.addEventListener('play', function() {
                // 暂停背景音乐
                if (backgroundMusic && !backgroundMusic.paused) {
                    backgroundMusic.pause();
                    // 更新音乐控制按钮文本
                    const musicToggle = document.getElementById('music-toggle');
                    if (musicToggle) {
                        musicToggle.textContent = '🎵 开始音乐 🎵';
                    }
                }
                // 每5-10秒随机触发一次恐怖效果
                const effectInterval = setInterval(() => {
                    if (!video.paused) {
                        if (Math.random() > 0.7) {
                            createBloodDrop();
                        }
                        if (Math.random() > 0.85) {
                            flashScreen();
                        }
                    } else {
                        clearInterval(effectInterval);
                    }
                }, Math.random() * 5000 + 5000);
                
                // 保存定时器ID，以便在视频暂停时清除
                video.dataset.effectInterval = effectInterval;
            });
            
            // 视频暂停时清除定时器并创建幽灵
            video.addEventListener('pause', function() {
                // 清除之前的定时器
                if (this.dataset.effectInterval) {
                    clearInterval(this.dataset.effectInterval);
                }
                
                // 随机创建幽灵效果
                if (Math.random() > 0.6) {
                    const rect = this.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top - 100;
                    createGhost(x, y);
                }
            });
            
            // 视频结束时触发屏幕闪烁和惊吓效果
            video.addEventListener('ended', function() {
                // 清除定时器
                if (this.dataset.effectInterval) {
                    clearInterval(this.dataset.effectInterval);
                }
                
                // 屏幕闪烁效果
                flashScreen();
                
                // 延迟后触发惊吓效果
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    triggerJumpScare(rect.left + rect.width/2, rect.top + rect.height/2);
                }, 800);
            });
        });
    }

    
    // 添加鼠标跟随的恐怖效果
    document.addEventListener('mousemove', function(e) {
        // 随机在鼠标附近生成小的视觉干扰
        if (Math.random() > 0.98) {
            createVisualDisturbance(e.clientX, e.clientY);
        }
    });
    
    // 随机生成血滴效果
    setInterval(createRandomBloodDrop, 3000);
    
    // 随机生成幽灵效果
    setInterval(createRandomGhost, 5000);
    
    // 随机触发页面闪烁
    setInterval(() => {
        if (Math.random() > 0.8) {
            flashScreen(1);
        }
    }, 10000);
    
    // 滚动效果 - 页面滚动时随机触发恐怖元素
    window.addEventListener('scroll', function() {
        if (Math.random() > 0.95) {
            createRandomGhost();
        }
    });
    
    // 链接悬停效果
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseover', function() {
            if (Math.random() > 0.7) {
                this.style.color = '#ff3333';
                this.style.textShadow = '0 0 10px #ff3333';
                setTimeout(() => {
                    this.style.color = '';
                    this.style.textShadow = '';
                }, 200);
            }
        });
    });
    
    // 函数：播放声音
    function playSound(type) {
        if (!audio) return;
        
        // 根据不同类型播放不同音效
        switch(type) {
            case 'click':
                // audio.src = 'sounds/click.mp3';
                // audio.volume = 0.5;
                // audio.play().catch(e => console.log('无法播放音效:', e));
                break;
            case 'scream':
                // audio.src = 'sounds/scream.mp3';
                // audio.volume = 0.7;
                // audio.play().catch(e => console.log('无法播放音效:', e));
                break;
        }
    }
    
    // 函数：屏幕闪烁效果
    function flashScreen(times) {
        let count = 0;
        const flashInterval = setInterval(() => {
            document.body.style.backgroundColor = count % 2 === 0 ? '#000' : '#ff3333';
            count++;
            
            if (count >= times * 2) {
                clearInterval(flashInterval);
                document.body.style.backgroundColor = '';
            }
        }, 100);
    }
    
    // 函数：触发惊吓效果
    function triggerJumpScare() {
        // 暂停背景音乐
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.pause();
            // 更新音乐控制按钮文本
            const musicToggle = document.getElementById('music-toggle');
            if (musicToggle) {
                musicToggle.textContent = '🎵 开始音乐 🎵';
            }
        }
        
        // 创建全屏视频容器
        const jumpScare = document.createElement('div');
        jumpScare.style.position = 'fixed';
        jumpScare.style.top = '0';
        jumpScare.style.left = '0';
        jumpScare.style.width = '100%';
        jumpScare.style.height = '100%';
        jumpScare.style.backgroundColor = '#000';
        jumpScare.style.display = 'flex';
        jumpScare.style.justifyContent = 'center';
        jumpScare.style.alignItems = 'center';
        jumpScare.style.zIndex = '1000';
        jumpScare.style.pointerEvents = 'auto'; // 允许与视频交互
        
        // 创建视频元素
        const video = document.createElement('video');
        video.src = '视频/2/2.mp4';
        video.controls = false; // 不显示控制条
        video.autoplay = true;  // 自动播放
        video.muted = false;    // 不静音
        video.loop = false;     // 不循环
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        video.style.objectFit = 'contain';
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.padding = '10px 15px';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = '1001';
        
        // 关闭按钮点击事件
        closeBtn.addEventListener('click', function() {
            video.pause();
            // 添加淡出效果
            jumpScare.style.transition = 'opacity 0.5s ease';
            jumpScare.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(jumpScare);
            }, 500);
        });
        
        // 视频结束事件
        video.addEventListener('ended', function() {
            // 添加淡出效果
            jumpScare.style.transition = 'opacity 0.5s ease';
            jumpScare.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(jumpScare);
            }, 500);
        });
        
        // 组装
        jumpScare.appendChild(video);
        jumpScare.appendChild(closeBtn);
        
        // 添加到页面
        document.body.appendChild(jumpScare);
    }
    
    // 函数：创建视觉干扰
    function createVisualDisturbance(x, y) {
        const disturbance = document.createElement('div');
        disturbance.style.position = 'fixed';
        disturbance.style.left = (x - 100) + 'px';
        disturbance.style.top = (y - 100) + 'px';
        disturbance.style.width = '200px';
        disturbance.style.height = '200px';
        disturbance.style.backgroundColor = 'rgba(255, 51, 51, 0.1)';
        disturbance.style.borderRadius = '50%';
        disturbance.style.pointerEvents = 'none';
        disturbance.style.zIndex = '100';
        disturbance.style.animation = 'pulse 0.3s ease-out';
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(0); opacity: 0.8; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(disturbance);
        
        // 动画结束后移除
        setTimeout(() => {
            document.body.removeChild(disturbance);
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }
    
    // 函数：创建随机血滴
    function createRandomBloodDrop() {
        const drop = document.createElement('div');
        drop.classList.add('blood-drop');
        
        // 随机大小
        const size = Math.random() * 10 + 5;
        drop.style.width = size + 'px';
        drop.style.height = size + 'px';
        
        // 随机水平位置
        const x = Math.random() * window.innerWidth;
        drop.style.left = x + 'px';
        
        // 随机下落速度
        const duration = Math.random() * 5 + 3;
        drop.style.animationDuration = duration + 's';
        
        document.body.appendChild(drop);
        
        // 动画结束后移除
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, duration * 1000);
    }
    
    // 函数：创建随机幽灵
    function createRandomGhost() {
        const ghost = document.createElement('div');
        ghost.classList.add('ghost');
        
        // 随机大小
        const size = Math.random() * 50 + 30;
        ghost.style.width = size + 'px';
        ghost.style.height = size * 1.2 + 'px';
        
        // 随机水平位置
        const x = Math.random() * window.innerWidth;
        ghost.style.left = x + 'px';
        
        // 随机漂浮速度
        const duration = Math.random() * 10 + 8;
        ghost.style.animationDuration = duration + 's';
        
        // 随机漂浮方向
        if (Math.random() > 0.5) {
            ghost.style.transform = 'scaleX(-1)';
        }
        
        document.body.appendChild(ghost);
        
        // 动画结束后移除
        setTimeout(() => {
            if (ghost.parentNode) {
                ghost.parentNode.removeChild(ghost);
            }
        }, duration * 1000);
    }
}

// 初始化页面
window.document.ready(init);