// 量子通讯系统 - 修复加载问题版本
console.log('初始化通讯系统...');

// 系统状态管理
const SYSTEM_STATE = {
    isInitialized: false,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    quantumLevel: 5,
    isAnonymous: false,
    sessionStartTime: null,
    connectionStatus: 'connecting',
    isOnline: true
};

// 状态颜色常量
const STATUS_COLORS = {
    online: '#00ff88',
    away: '#ffaa00',
    busy: '#ff4444',
    invisible: '#666666'
};

// 全局变量
let currentUser = null;
let userProfile = null;
let friends = [];
let groups = [];
let friendRequests = [];
let currentMessages = [];
let currentChat = null;
let chatType = null;
let currentChatName = null;
let groupMembers = [];
let groupToDelete = null;
let sessionTimer = null;
let selectedFriendsToInvite = [];

// DOM 元素缓存
const elements = {
    // 认证相关
    authContainer: document.getElementById('auth-container'),
    chatContainer: document.getElementById('chat-container'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    loginTabBtn: document.getElementById('login-tab-btn'),
    signupTabBtn: document.getElementById('signup-tab-btn'),
    loginBtn: document.getElementById('login-btn'),
    signupBtn: document.getElementById('signup-btn'),
    anonymousLoginBtn: document.getElementById('anonymous-login-btn'),
    loginNumericId: document.getElementById('login-numeric-id'),
    loginPassword: document.getElementById('login-password'),
    signupUsername: document.getElementById('signup-username'),
    signupPassword: document.getElementById('signup-password'),
    signupConfirmPassword: document.getElementById('signup-confirm-password'),
    generatedNumericId: document.getElementById('generated-numeric-id'),
    refreshIdBtn: document.getElementById('refresh-id-btn'),
    authMessage: document.getElementById('auth-message'),
    
    // 聊天相关
    sidebar: document.getElementById('sidebar'),
    infoPanel: document.getElementById('info-panel'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileInfoBtn: document.getElementById('mobile-info-btn'),
    friendsList: document.getElementById('friends-list'),
    groupsList: document.getElementById('groups-list'),
    requestsList: document.getElementById('requests-list'),
    messagesContainer: document.getElementById('messages-container'),
    messageInput: document.getElementById('message-input'),
    sendBtn: document.getElementById('send-btn'),
    chatTitle: document.getElementById('chat-title'),
    mobileChatTitle: document.getElementById('mobile-chat-title'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    
    // 模态框
    modalOverlay: document.getElementById('modal-overlay'),
    editProfileModal: document.getElementById('edit-profile-modal'),
    createGroupModal: document.getElementById('create-group-modal'),
    deleteGroupModal: document.getElementById('delete-group-modal'),
    forgotPasswordModal: document.getElementById('forgot-password-modal')
};

// 量子加密模块
const QuantumCrypto = {
    encryptionLevel: 5,
    
    generateQuantumKey() {
        const key = Array.from({length: 32}, () => 
            Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join('');
        console.log('生成密钥:', key.substring(0, 16) + '...');
        return key;
    },
    
    encryptMessage(message, key) {
        // 模拟量子加密过程
        const encrypted = btoa(unescape(encodeURIComponent(message)));
        console.log('加密消息完成');
        return {
            data: encrypted,
            key: key,
            quantumLevel: this.encryptionLevel,
            timestamp: Date.now()
        };
    },
    
    decryptMessage(encryptedData, key) {
        try {
            const decrypted = decodeURIComponent(escape(atob(encryptedData.data)));
            console.log('解密消息完成');
            return decrypted;
        } catch (error) {
            console.error('解密失败:', error);
            return encryptedData.data; // 返回原始数据
        }
    },
    
    enhanceEncryption() {
        if (this.encryptionLevel < 10) {
            this.encryptionLevel++;
            SYSTEM_STATE.quantumLevel = this.encryptionLevel;
            console.log('加密等级提升至:', this.encryptionLevel);
            
            // 创建量子纠缠效果
            this.createQuantumEntanglementEffect();
            
            showNotification('加密', `加密等级提升至 ${this.encryptionLevel} 级`, 'success');
            return true;
        }
        return false;
    },
    
    getEncryptionStatus() {
        const levels = {
            1: '基础加密',
            2: '标准加密', 
            3: '增强加密',
            4: '高级加密',
            5: '二级加密'
        };
        return levels[this.encryptionLevel] || '未知等级';
    },
    
    createQuantumEntanglementEffect() {
        const effectsContainer = document.getElementById('quantum-effects');
        if (!effectsContainer) return;
        
        for (let i = 0; i < 3; i++) {
            const entanglement = document.createElement('div');
            entanglement.className = 'quantum-entanglement';
            entanglement.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            effectsContainer.appendChild(entanglement);
            
            setTimeout(() => {
                if (entanglement.parentNode) {
                    entanglement.parentNode.removeChild(entanglement);
                }
            }, 3000);
        }
    }
};

// 初始化函数 - 修复版本
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 加载完成，直接显示认证界面...');
    
    // 直接显示认证界面，跳过加载动画
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    if (elements.authContainer) {
        elements.authContainer.classList.remove('hidden');
        elements.authContainer.style.display = 'flex';
    }
    
    console.log('系统快速启动完成');
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 创建背景粒子
    createParticles();
});

// 系统初始化
function initializeSystem() {
    console.log('初始化通讯系统...');
    
    // 设置移动端检测
    if (SYSTEM_STATE.isMobile) {
        document.body.classList.add('mobile');
        console.log('移动端模式已激活');
    }
    
    // 初始化触摸优化
    initializeTouchOptimization();
    
    // 配置跨设备访问
    configureCrossDeviceAccess();
    
    // 初始化Supabase客户端
    if (typeof quantumSupabase !== 'undefined') {
        console.log('Supabase客户端已初始化');
    } else {
        console.warn('Supabase客户端未找到，使用离线模式');
    }
    
    // 检查本地存储的用户会话
    checkExistingSession();
    
    // 初始化UI组件
    initializeUIComponents();
    
    SYSTEM_STATE.isInitialized = true;
    console.log('系统初始化完成');
}

// 修复输入法键盘自动弹出问题
function initializeTouchOptimization() {
    console.log('🔧 初始化触摸优化...');
    
    // 防止非输入元素触发键盘
    document.addEventListener('touchstart', function(e) {
        const interactiveElements = ['input', 'textarea', 'select', 'button', 'a'];
        const isInteractive = e.target.matches(interactiveElements.join(','));
        
        if (!isInteractive) {
            // 隐藏键盘
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                activeElement.blur();
            }
        }
    }, { passive: true });
    
    // 防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 修复跨设备访问配置
function configureCrossDeviceAccess() {
    console.log('配置跨设备访问...');
    
    // 配置响应式设计
    configureResponsiveDesign();
    
    // 配置网络状态检测
    configureNetworkDetection();
}

// 配置响应式设计
function configureResponsiveDesign() {
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile !== SYSTEM_STATE.isMobile) {
            SYSTEM_STATE.isMobile = isMobile;
            document.body.classList.toggle('mobile', isMobile);
            console.log('设备类型变更:', isMobile ? '移动端' : '桌面端');
        }
    }
    
    // 初始检测
    handleResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
}

// 配置网络状态检测
function configureNetworkDetection() {
    function updateOnlineStatus() {
        const isOnline = navigator.onLine;
        const connectionText = document.getElementById('connection-text');
        const connectionDot = document.querySelector('.connection-dot');
        
        if (connectionText && connectionDot) {
            if (isOnline) {
                connectionText.textContent = '连接稳定';
                connectionDot.style.background = '#00ff88';
                connectionDot.style.boxShadow = '0 0 8px #00ff88';
            } else {
                connectionText.textContent = '连接中断';
                connectionDot.style.background = '#ff4444';
                connectionDot.style.boxShadow = '0 0 8px #ff4444';
            }
        }
        
        // 更新系统状态
        SYSTEM_STATE.isOnline = isOnline;
        
        if (isOnline) {
            showNotification('网络', '连接已恢复', 'success');
        } else {
            showNotification('网络', '连接中断，使用离线模式', 'warning');
        }
    }
    
    // 初始状态
    updateOnlineStatus();
    
    // 监听网络状态变化
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// 检查现有会话
function checkExistingSession() {
    try {
        const savedSession = localStorage.getItem('quantum_chat_session');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            if (session.expires > Date.now()) {
                console.log('发现有效会话，自动登录...');
                // 这里可以添加自动登录逻辑
            } else {
                localStorage.removeItem('quantum_chat_session');
                console.log('会话已过期，已清除');
            }
        }
    } catch (error) {
        console.error('检查会话失败:', error);
        localStorage.removeItem('quantum_chat_session');
    }
}

// 初始化UI组件
function initializeUIComponents() {
    console.log('初始化UI组件...');
    
    // 生成初始数字ID
    generateNumericId();
    
    // 初始化标签页切换
    initializeTabSwitching();
    
    // 初始化表单验证
    initializeFormValidation();
    
    // 初始化功能按钮
    initializeFeatureButtons();
    
    SYSTEM_STATE.isInitialized = true;
    console.log('UI组件初始化完成');
}

// 初始化事件监听器
function initializeEventListeners() {
    console.log('初始化事件监听器...');
    
    // 认证标签页切换
    if (elements.loginTabBtn) {
        elements.loginTabBtn.addEventListener('click', () => switchAuthTab('login'));
    }
    
    if (elements.signupTabBtn) {
        elements.signupTabBtn.addEventListener('click', () => switchAuthTab('signup'));
    }
    
    // 登录按钮
    if (elements.loginBtn) {
        elements.loginBtn.addEventListener('click', handleLogin);
    }
    
    // 注册按钮
    if (elements.signupBtn) {
        elements.signupBtn.addEventListener('click', handleSignup);
    }
    
    // 匿名登录按钮
    if (elements.anonymousLoginBtn) {
        elements.anonymousLoginBtn.addEventListener('click', handleAnonymousLogin);
    }
    
    // 刷新ID按钮
    if (elements.refreshIdBtn) {
        elements.refreshIdBtn.addEventListener('click', generateNumericId);
    }
    
    // 忘记密码链接
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', showForgotPasswordModal);
    }
    
    // 移动端菜单按钮
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', toggleSidebar);
    }
    
    if (elements.mobileInfoBtn) {
        elements.mobileInfoBtn.addEventListener('click', toggleInfoPanel);
    }
    
    // 搜索功能
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', () => {
            const query = elements.searchInput.value.trim();
            if (query) {
                handleUserSearch(query);
            }
        });
    }
    
    if (elements.searchInput) {
        elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = elements.searchInput.value.trim();
                if (query) {
                    handleUserSearch(query);
                }
            }
        });
    }
    
    // 消息发送
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener('click', sendQuantumMessage);
    }
    
    if (elements.messageInput) {
        elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendQuantumMessage();
            }
        });
        
        elements.messageInput.addEventListener('input', function() {
            if (elements.sendBtn) {
                elements.sendBtn.disabled = !this.value.trim();
            }
        });
    }
    
    // 模态框关闭
    const closeModalButtons = [
        'close-modal', 'close-edit-modal', 'close-create-group-modal',
        'close-delete-group-modal', 'close-forgot-password-modal',
        'cancel-edit', 'cancel-create-group', 'cancel-delete-group',
        'cancel-reset-password'
    ];
    
    closeModalButtons.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', closeAllModals);
        }
    });
    
    // 确认操作按钮
    const confirmButtons = [
        { id: 'save-profile', handler: saveUserProfile },
        { id: 'create-group-btn-confirm', handler: createGroup },
        { id: 'confirm-delete-group', handler: deleteGroup },
        { id: 'confirm-reset-password', handler: handleResetPassword }
    ];
    
    confirmButtons.forEach(({ id, handler }) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', handler);
        }
    });
    
    // 添加好友按钮
    const addFriendBtn = document.getElementById('add-friend-btn');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', showAddFriendModal);
    }
    
    // 创建群组按钮
    const createGroupBtn = document.getElementById('create-group-btn');
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', showCreateGroupModal);
    }
    
    // 编辑资料按钮
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', showEditProfileModal);
    }
    
    // 退出登录按钮
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // 关闭面板按钮
    const closePanelBtn = document.getElementById('close-panel');
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', () => {
            elements.infoPanel.classList.remove('active');
        });
    }
    
    // 返回聊天按钮
    const backToChatBtn = document.getElementById('back-to-chat');
    if (backToChatBtn) {
        backToChatBtn.addEventListener('click', () => {
            const searchResultsPage = document.getElementById('search-results-page');
            if (searchResultsPage) {
                searchResultsPage.classList.add('hidden');
            }
            if (elements.chatContainer) {
                elements.chatContainer.classList.remove('hidden');
            }
        });
    }
    
    // 修复：添加侧边栏标签页切换事件监听器
    const sidebarTabButtons = document.querySelectorAll('.tabs .tab-btn');
    sidebarTabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            console.log('点击侧边栏标签:', tab);
            switchSidebarTab(tab);
        });
    });
    
    console.log('事件监听器初始化完成');
}

// 显示认证屏幕
function showAuthScreen() {
    if (elements.authContainer) {
        elements.authContainer.classList.remove('hidden');
        elements.authContainer.style.display = 'flex';
        console.log('认证屏幕已显示');
    }
}

// 显示聊天界面
function showChatInterface() {
    if (elements.authContainer) {
        elements.authContainer.classList.add('hidden');
        elements.authContainer.style.display = 'none';
    }
    if (elements.chatContainer) {
        elements.chatContainer.classList.remove('hidden');
        elements.chatContainer.style.display = 'flex';
    }
    
    // 加载用户数据
    loadUserData();
    
    console.log('聊天界面已显示');
}

// 标签页切换
function switchAuthTab(tab) {
    console.log('切换标签页:', tab);
    
    // 更新标签按钮状态
    document.querySelectorAll('.auth-tabs .cyber-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    if (tab === 'login') {
        if (elements.loginTabBtn) elements.loginTabBtn.classList.add('active');
        if (elements.loginForm) elements.loginForm.classList.add('active');
    } else {
        if (elements.signupTabBtn) elements.signupTabBtn.classList.add('active');
        if (elements.signupForm) elements.signupForm.classList.add('active');
    }
}

// 初始化标签页切换
function initializeTabSwitching() {
    // 侧边栏标签页
    const tabButtons = document.querySelectorAll('.tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            console.log('点击侧边栏标签:', tab);
            switchSidebarTab(tab);
        });
    });
}

// 切换侧边栏标签页
function switchSidebarTab(tab) {
    console.log('切换侧边栏标签:', tab);
    
    // 更新标签按钮状态
    document.querySelectorAll('.tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activeTabBtn = document.querySelector(`.tabs .tab-btn[data-tab="${tab}"]`);
    const activePanel = document.getElementById(`${tab}-tab`);
    
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
        console.log('激活标签按钮:', tab);
    }
    if (activePanel) {
        activePanel.classList.add('active');
        console.log('激活标签面板:', tab);
    }
    
    // 加载对应标签的数据
    switch (tab) {
        case 'friends':
            console.log('加载好友列表');
            loadFriends();
            break;
        case 'groups':
            console.log('加载群组列表');
            loadGroups();
            break;
        case 'requests':
            console.log('加载好友请求');
            loadFriendRequests();
            break;
    }
}

// 生成数字ID
function generateNumericId() {
    const numericId = String(Math.floor(Math.random() * 90000000) + 10000000);
    if (elements.generatedNumericId) {
        elements.generatedNumericId.textContent = numericId;
    }
    console.log('生成数字ID:', numericId);
    return numericId;
}

// 初始化表单验证
function initializeFormValidation() {
    // 密码强度检查
    const passwordInputs = [
        elements.signupPassword,
        elements.signupConfirmPassword
    ].filter(Boolean);
    
    passwordInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', validatePasswordStrength);
        }
    });
    
    // 数字ID验证
    if (elements.loginNumericId) {
        elements.loginNumericId.addEventListener('input', function() {
            validateNumericId(this);
        });
    }
    
    // 用户名验证
    if (elements.signupUsername) {
        elements.signupUsername.addEventListener('input', function() {
            validateUsername(this);
        });
    }
}

// 验证密码强度
function validatePasswordStrength() {
    const password = this.value;
    const strengthFill = document.getElementById('password-strength-fill');
    const strengthText = document.getElementById('password-strength-text');
    
    if (!strengthFill || !strengthText) return;
    
    let strength = 0;
    let text = '密钥强度';
    let className = 'weak';
    
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    switch (strength) {
        case 0:
        case 1:
            text = '较弱';
            className = 'weak';
            break;
        case 2:
        case 3:
            text = '中等';
            className = 'medium';
            break;
        case 4:
        case 5:
            text = '强大';
            className = 'strong';
            break;
    }
    
    strengthFill.className = `strength-fill ${className}`;
    strengthText.textContent = text;
}

// 验证数字ID
function validateNumericId(input) {
    const value = input.value.trim();
    const isValid = /^\d{8}$/.test(value);
    
    if (value && !isValid) {
        input.classList.add('input-error');
        return false;
    } else {
        input.classList.remove('input-error');
        return true;
    }
}

// 验证用户名
function validateUsername(input) {
    const value = input.value.trim();
    const isValid = value.length >= 2 && value.length <= 20;
    
    if (value && !isValid) {
        input.classList.add('input-error');
        return false;
    } else {
        input.classList.remove('input-error');
        return true;
    }
}

// 验证密码
function validatePassword(input) {
    const value = input.value;
    const isValid = value.length >= 6;
    
    if (value && !isValid) {
        input.classList.add('input-error');
        return false;
    } else {
        input.classList.remove('input-error');
        return true;
    }
}

// 设置按钮加载状态
function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>处理中...</span>';
    } else {
        button.disabled = false;
        // 需要根据具体按钮恢复原始内容
    }
}

// 处理登录
async function handleLogin() {
    const numericId = elements.loginNumericId?.value.trim();
    const password = elements.loginPassword?.value;
    
    if (!numericId || !password) {
        showAuthMessage('请输入ID和密钥', 'error');
        return;
    }
    
    if (!validateNumericId(elements.loginNumericId)) {
        showAuthMessage('ID必须是8位纯数字', 'error');
        return;
    }
    
    try {
        setButtonLoading(elements.loginBtn, true);
        
        console.log('尝试登录:', numericId);
        
        // 模拟登录过程
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 创建用户会话
        currentUser = {
            id: 'user-' + numericId,
            numeric_id: numericId,
            email: `user${numericId}@quantum.chat`,
            is_anonymous: false
        };
        
        userProfile = {
            id: currentUser.id,
            username: `用户${numericId}`,
            numeric_id: numericId,
            avatar_url: `https://ui-avatars.com/api/?name=用户${numericId}&background=0D8ABC&color=fff`,
            status: 'online',
            quantum_level: 5
        };
        
        // 保存会话
        saveSessionToStorage();
        
        // 切换到聊天界面
        showChatInterface();
        
        showAuthMessage('身份验证成功', 'success');
        
    } catch (error) {
        console.error('登录失败:', error);
        showAuthMessage('身份验证失败: ' + error.message, 'error');
    } finally {
        setButtonLoading(elements.loginBtn, false);
    }
}

// 处理注册
async function handleSignup() {
    const username = elements.signupUsername?.value.trim();
    const password = elements.signupPassword?.value;
    const confirmPassword = elements.signupConfirmPassword?.value;
    const numericId = generateNumericId(); // 直接生成数字ID
    const agreeTerms = document.getElementById('agree-terms')?.checked;
    
    if (!username || !password || !confirmPassword) {
        showAuthMessage('请填写所有必填字段', 'error');
        return;
    }
    
    if (!validateUsername(elements.signupUsername)) {
        showAuthMessage('用户名长度必须在2-20字符之间', 'error');
        return;
    }
    
    if (!validatePassword(elements.signupPassword)) {
        showAuthMessage('密钥长度至少6位', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthMessage('两次输入的密钥不一致', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showAuthMessage('请同意服务条款和隐私政策', 'error');
        return;
    }
    
    try {
        setButtonLoading(elements.signupBtn, true);
        
        console.log('注册新用户:', username, numericId);
        
        // 模拟注册过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 创建用户
        currentUser = {
            id: 'user-' + numericId,
            numeric_id: numericId,
            email: `user${numericId}@quantum.chat`,
            is_anonymous: false
        };
        
        userProfile = {
            id: currentUser.id,
            username: username,
            numeric_id: numericId, // 确保这里设置了numeric_id
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`,
            status: 'online',
            quantum_level: 5
        };
        
        // 保存会话
        saveSessionToStorage();
        
        // 切换到聊天界面
        showChatInterface();
        
        showAuthMessage('身份创建成功', 'success');
        
    } catch (error) {
        console.error('注册失败:', error);
        showAuthMessage('身份创建失败: ' + error.message, 'error');
    } finally {
        setButtonLoading(elements.signupBtn, false);
    }
}

// 处理匿名登录
async function handleAnonymousLogin() {
    try {
        setButtonLoading(elements.anonymousLoginBtn, true);
        
        console.log('匿名登录...');
        
        // 模拟匿名登录
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const numericId = generateNumericId();
        
        currentUser = {
            id: 'anonymous-' + Date.now(),
            numeric_id: numericId,
            email: `quantum${Date.now()}@anonymous.chat`,
            is_anonymous: true
        };
        
        userProfile = {
            id: currentUser.id,
            username: '匿名用户_' + numericId.substring(0, 4),
            numeric_id: numericId,
            avatar_url: 'https://ui-avatars.com/api/?name=匿名用户&background=9d4edd&color=fff',
            status: 'online',
            quantum_level: 3,
            is_anonymous: true
        };
        
        SYSTEM_STATE.isAnonymous = true;
        
        // 保存会话
        saveSessionToStorage();
        
        // 切换到聊天界面
        showChatInterface();
        
        showNotification('匿名模式', '匿名会话已激活', 'success');
        
    } catch (error) {
        console.error('匿名登录失败:', error);
        showAuthMessage('匿名会话创建失败', 'error');
    } finally {
        setButtonLoading(elements.anonymousLoginBtn, false);
    }
}

// 显示认证消息
function showAuthMessage(message, type = 'info') {
    if (!elements.authMessage) return;
    
    elements.authMessage.textContent = message;
    elements.authMessage.className = `cyber-message ${type}`;
    
    // 自动隐藏
    setTimeout(() => {
        elements.authMessage.textContent = '';
        elements.authMessage.className = 'cyber-message';
    }, 5000);
}

// 保存会话到本地存储
function saveSessionToStorage() {
    try {
        const sessionData = {
            user: currentUser,
            profile: userProfile,
            expires: Date.now() + (24 * 60 * 60 * 1000), // 24小时
            isAnonymous: SYSTEM_STATE.isAnonymous
        };
        
        localStorage.setItem('quantum_chat_session', JSON.stringify(sessionData));
        console.log('会话已保存到本地存储');
    } catch (error) {
        console.error('保存会话失败:', error);
    }
}

// 加载用户数据
async function loadUserData() {
    if (!currentUser) return;
    
    console.log('加载用户数据...');
    
    // 更新用户界面
    updateUserInterface();
    
    // 启动会话计时器
    startSessionTimer();
    
    // 加载好友列表
    await loadFriends();
    
    // 加载群组列表
    await loadGroups();
    
    // 加载好友请求
    await loadFriendRequests();
    
    console.log('用户数据加载完成');
}

// 更新用户界面
function updateUserInterface() {
    if (!userProfile) return;
    
    // 更新用户名
    const usernameElements = [
        document.getElementById('username'),
        document.getElementById('panel-name')
    ];
    
    usernameElements.forEach(element => {
        if (element) element.textContent = userProfile.username;
    });
    
    // 更新用户ID
    const numericIdElements = [
        document.getElementById('user-numeric-id'),
        document.getElementById('display-numeric-id')
    ];
    
    numericIdElements.forEach(element => {
        if (element) element.textContent = `ID: ${userProfile.numeric_id}`;
    });
    
    // 更新头像
    const avatarElements = [
        document.getElementById('user-avatar'),
        document.getElementById('panel-avatar')
    ];
    
    avatarElements.forEach(element => {
        if (element && userProfile.avatar_url) {
            element.src = userProfile.avatar_url;
        }
    });
    
    // 更新匿名标识
    const anonymousBadge = document.getElementById('anonymous-badge');
    if (anonymousBadge) {
        if (SYSTEM_STATE.isAnonymous) {
            anonymousBadge.classList.remove('hidden');
        } else {
            anonymousBadge.classList.add('hidden');
        }
    }
    
    // 更新会话类型
    const sessionType = document.getElementById('session-type');
    if (sessionType) {
        sessionType.textContent = SYSTEM_STATE.isAnonymous ? '匿名会话' : '注册用户';
    }
    
    // 设置初始状态
    setQuantumUserStatus('online');
}

// 切换侧边栏（移动端）
function toggleSidebar() {
    if (elements.sidebar) {
        elements.sidebar.classList.toggle('active');
    }
}

// 切换信息面板（移动端）
function toggleInfoPanel() {
    if (elements.infoPanel) {
        elements.infoPanel.classList.toggle('active');
    }
}

// 关闭所有模态框
function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
}

// 显示编辑资料模态框
function showEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    const editUsername = document.getElementById('edit-username');
    const editAvatar = document.getElementById('edit-avatar');
    const displayNumericId = document.getElementById('display-numeric-id');
    
    if (!modal || !editUsername || !displayNumericId) return;
    
    // 填充当前数据
    editUsername.value = userProfile?.username || '';
    editAvatar.value = userProfile?.avatar_url || '';
    displayNumericId.textContent = userProfile?.numeric_id || '未知';
    
    modal.classList.remove('hidden');
}

// 修复用户名保存功能
async function saveUserProfile() {
    const editUsername = document.getElementById('edit-username');
    const editAvatar = document.getElementById('edit-avatar');
    
    if (!editUsername || !userProfile) return;
    
    const newUsername = editUsername.value.trim();
    const newAvatar = editAvatar.value.trim();
    
    if (!newUsername) {
        showNotification('输入错误', '请输入用户名', 'error');
        return;
    }
    
    if (!validateUsername(editUsername)) {
        showNotification('输入错误', '用户名长度必须在2-20字符之间', 'error');
        return;
    }
    
    try {
        // 更新用户资料
        userProfile.username = newUsername;
        if (newAvatar) {
            userProfile.avatar_url = newAvatar;
        }
        
        // 保存到本地存储
        saveSessionToStorage();
        
        // 更新界面
        updateUserInterface();
        
        showNotification('资料更新', '用户资料已更新', 'success');
        closeAllModals();
        
    } catch (error) {
        console.error('保存用户资料失败:', error);
        showNotification('保存失败', '资料更新失败: ' + error.message, 'error');
    }
}

// 处理退出登录
function handleLogout() {
    console.log('用户退出登录');
    
    // 停止会话计时器
    stopSessionTimer();
    
    // 清除会话数据
    currentUser = null;
    userProfile = null;
    friends = [];
    groups = [];
    friendRequests = [];
    currentMessages = [];
    currentChat = null;
    
    // 清除本地存储
    localStorage.removeItem('quantum_chat_session');
    
    // 重置系统状态
    SYSTEM_STATE.isAnonymous = false;
    SYSTEM_STATE.sessionStartTime = null;
    
    // 切换到认证界面
    if (elements.chatContainer) {
        elements.chatContainer.classList.add('hidden');
        elements.chatContainer.style.display = 'none';
    }
    if (elements.authContainer) {
        elements.authContainer.classList.remove('hidden');
        elements.authContainer.style.display = 'flex';
    }
    
    // 重置表单
    if (elements.loginNumericId) elements.loginNumericId.value = '';
    if (elements.loginPassword) elements.loginPassword.value = '';
    
    showNotification('会话结束', '会话已安全结束', 'info');
}

// 显示添加好友模态框
function showAddFriendModal() {
    console.log('打开添加好友模态框');
    
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.getElementById('modal-title');
    
    if (!modal || !modalBody || !modalTitle) {
        console.error('❌ 模态框元素未找到');
        return;
    }
    
    modalTitle.textContent = '建立连接';
    
    modalBody.innerHTML = `
        <div class="modal-input-group">
            <label for="search-user">搜索用户ID或昵称</label>
            <input type="text" id="search-user" class="modal-input" placeholder="输入8位数字ID或用户昵称">
            <div id="search-results" class="search-results"></div>
        </div>
        <div class="modal-actions">
            <button class="modal-btn secondary" id="cancel-search">取消</button>
            <button class="modal-btn primary" id="search-user-btn">搜索</button>
        </div>
    `;
    
    // 添加事件监听器
    const searchBtn = document.getElementById('search-user-btn');
    const cancelBtn = document.getElementById('cancel-search');
    const searchInput = document.getElementById('search-user');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchQuantumUsers);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeAllModals);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchQuantumUsers();
            }
        });
    }
    
    modal.classList.remove('hidden');
}

// 搜索用户
async function searchQuantumUsers() {
    const searchInput = document.getElementById('search-user');
    const resultsContainer = document.getElementById('search-results');
    
    if (!searchInput || !resultsContainer) return;
    
    const query = searchInput.value.trim();
    
    if (!query) {
        showNotification('搜索错误', '请输入搜索内容', 'error');
        return;
    }
    
    try {
        resultsContainer.innerHTML = '<div class="no-results">搜索中...</div>';
        
        // 模拟搜索延迟
        setTimeout(() => {
            const mockResults = [
                {
                    id: 'quantum-user-1',
                    username: '示例用户',
                    numeric_id: '10000002',
                    avatar_url: 'https://ui-avatars.com/api/?name=示例用户&background=0D8ABC&color=fff',
                    status: 'online',
                    quantum_level: 5
                }
            ];
            
            // 过滤结果
            const filteredResults = mockResults.filter(user => 
                user.username.includes(query) || 
                user.numeric_id.includes(query)
            );
            
            if (filteredResults.length === 0) {
                resultsContainer.innerHTML = '<div class="no-results">未找到匹配的用户</div>';
                return;
            }
            
            resultsContainer.innerHTML = '';
            
            filteredResults.forEach(user => {
                const userEl = document.createElement('div');
                userEl.className = 'user-search-result';
                userEl.innerHTML = `
                    <img src="${user.avatar_url}" alt="${user.username}">
                    <div class="user-info">
                        <div class="user-name">${user.username}</div>
                        <div class="user-id">ID: ${user.numeric_id}</div>
                        <div class="user-status">${user.status === 'online' ? '在线' : '离线'} | 等级: ${user.quantum_level}</div>
                    </div>
                    <button class="add-user-btn" data-user-id="${user.id}">连接</button>
                `;
                
                resultsContainer.appendChild(userEl);
            });
            
            // 添加连接按钮事件
            document.querySelectorAll('.add-user-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-user-id');
                    sendQuantumFriendRequest(userId);
                });
            });
            
        }, 1500);
        
    } catch (error) {
        console.error('搜索用户失败:', error);
        resultsContainer.innerHTML = '<div class="no-results">搜索失败，请重试</div>';
    }
}

// 新增用户搜索功能
async function handleUserSearch(query) {
    if (!query.trim()) {
        showNotification('搜索', '请输入搜索内容', 'info');
        return;
    }
    
    console.log('搜索用户:', query);
    
    try {
        // 显示搜索页面
        showSearchResultsPage(query);
        
        let searchResults = [];
        
        // 根据搜索类型过滤结果
        const searchType = document.querySelector('input[name="search-type"]:checked')?.value || 'username';
        
        if (searchType === 'id') {
            // 精确搜索数字ID
            searchResults = await searchUsersByNumericId(query);
        } else {
            // 模糊搜索用户名
            searchResults = await searchUsersByUsername(query);
        }
        
        renderSearchResults(searchResults, query, searchType);
        
    } catch (error) {
        console.error('搜索失败:', error);
        showNotification('搜索失败', '搜索过程中出现错误', 'error');
        renderSearchResults([], query);
    }
}

// 按数字ID搜索
async function searchUsersByNumericId(numericId) {
    return new Promise(resolve => {
        setTimeout(() => {
            // 模拟精确ID搜索
            const mockUsers = [
                {
                    id: 'search-user-id',
                    username: `用户_${numericId}`,
                    numeric_id: numericId,
                    avatar_url: `https://ui-avatars.com/api/?name=用户${numericId}&background=0D8ABC&color=fff`,
                    status: 'online',
                    quantum_level: Math.floor(Math.random() * 5) + 3
                }
            ];
            
            // 只有当ID完全匹配时才返回结果
            const filteredResults = mockUsers.filter(user => 
                user.numeric_id === numericId
            );
            
            resolve(filteredResults);
        }, 800);
    });
}

// 按用户名搜索
async function searchUsersByUsername(username) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockUsers = [
                {
                    id: 'search-user-1',
                    username: `${username}`,
                    numeric_id: String(Math.floor(Math.random() * 90000000) + 10000000),
                    avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`,
                    status: 'online',
                    quantum_level: Math.floor(Math.random() * 5) + 3
                },
                {
                    id: 'search-user-2',
                    username: `量子${username}`,
                    numeric_id: String(Math.floor(Math.random() * 90000000) + 10000000),
                    avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=9d4edd&color=fff`,
                    status: 'offline',
                    quantum_level: Math.floor(Math.random() * 5) + 3
                }
            ];
            
            // 用户名模糊匹配
            const filteredResults = mockUsers.filter(user => 
                user.username.toLowerCase().includes(username.toLowerCase())
            );
            
            resolve(filteredResults);
        }, 800);
    });
}

// 显示搜索结果页面
function showSearchResultsPage(query) {
    // 隐藏其他容器
    if (elements.authContainer) elements.authContainer.classList.add('hidden');
    if (elements.chatContainer) elements.chatContainer.classList.add('hidden');
    
    // 显示搜索结果页面
    const searchResultsPage = document.getElementById('search-results-page');
    if (searchResultsPage) {
        searchResultsPage.classList.remove('hidden');
        searchResultsPage.style.display = 'flex';
    }
    
    // 更新搜索查询文本
    const searchQueryText = document.getElementById('search-query-text');
    if (searchQueryText) {
        searchQueryText.textContent = query;
    }
}

// 更新渲染搜索结果函数
function renderSearchResults(results, query, searchType) {
    const resultsList = document.getElementById('search-results-list');
    if (!resultsList) return;
    
    let noResultsMessage = '';
    if (searchType === 'id') {
        noResultsMessage = `没有找到ID为 "<strong>${query}</strong>" 的用户`;
    } else {
        noResultsMessage = `没有找到用户名包含 "<strong>${query}</strong>" 的用户`;
    }
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 40px; margin-bottom: 15px; color: #666;"></i>
                <h3>未找到用户</h3>
                <p>${noResultsMessage}</p>
                <div class="search-tips">
                    <p>搜索提示：</p>
                    <ul>
                        <li>使用完整的8位数字ID进行精确搜索</li>
                        <li>使用用户名进行模糊搜索</li>
                        <li>确保搜索的用户已经注册</li>
                    </ul>
                </div>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = '';
    
    results.forEach(user => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        // 检查是否已经是好友
        const isFriend = friends.some(f => f.friend.id === user.id);
        const isPending = friendRequests.some(req => 
            req.from_user.id === user.id && req.status === 'pending'
        );
        
        let buttonText = '添加好友';
        let buttonClass = 'add-friend-btn';
        
        if (isFriend) {
            buttonText = '已添加';
            buttonClass += ' added';
        } else if (isPending) {
            buttonText = '请求中';
            buttonClass += ' pending';
        }
        
        resultItem.innerHTML = `
            <img class="search-result-avatar" src="${user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D8ABC&color=fff`}" alt="${user.username}">
            <div class="search-result-info">
                <div class="search-result-name">${user.username}</div>
                <div class="search-result-id">ID: ${user.numeric_id}</div>
                <div class="search-result-status">量子等级: ${user.quantum_level || 5} | 状态: ${user.status || '离线'}</div>
            </div>
            <button class="${buttonClass}" data-user-id="${user.id}" ${isFriend || isPending ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;
        
        // 添加事件监听器
        const addFriendBtn = resultItem.querySelector('.add-friend-btn');
        if (addFriendBtn && !isFriend && !isPending) {
            addFriendBtn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                sendFriendRequest(userId);
                this.textContent = '请求中';
                this.classList.add('pending');
                this.disabled = true;
            });
        }
        
        resultsList.appendChild(resultItem);
    });
}

// 修复好友请求发送功能
async function sendFriendRequest(friendId) {
    try {
        console.log('发送好友请求给:', friendId);
        
        // 创建好友请求对象
        const friendRequest = {
            id: 'friend-request-' + Date.now(),
            from_user: {
                id: currentUser.id,
                username: userProfile.username,
                numeric_id: userProfile.numeric_id,
                avatar_url: userProfile.avatar_url,
                quantum_level: SYSTEM_STATE.quantumLevel
            },
            status: 'pending',
            created_at: new Date().toISOString(),
            message: '希望与您建立连接'
        };
        
        // 添加到本地请求列表
        friendRequests.push(friendRequest);
        
        // 更新UI
        updateRequestsBadge();
        
        // 创建量子纠缠效果
        QuantumCrypto.createQuantumEntanglementEffect();
        
        showNotification('连接请求', '好友请求已通过通道发送', 'success');
        
    } catch (error) {
        console.error('发送好友请求失败:', error);
        showNotification('请求失败', '发送好友请求时出现错误', 'error');
    }
}

// 发送好友请求
async function sendQuantumFriendRequest(friendId) {
    try {
        console.log('发送好友请求给:', friendId);
        
        // 创建量子纠缠效果
        QuantumCrypto.createQuantumEntanglementEffect();
        
        showNotification('连接', '好友请求已通过通道发送', 'success');
        closeAllModals();
        
        // 模拟好友请求发送
        setTimeout(() => {
            showNotification('连接建立', '连接已建立', 'success');
        }, 2000);
        
    } catch (error) {
        console.error('发送好友请求失败:', error);
        showNotification('请求失败', '连接建立失败', 'error');
    }
}

// 显示创建群组模态框
function showCreateGroupModal() {
    console.log('打开创建群组模态框');
    
    const modal = document.getElementById('create-group-modal');
    if (!modal) {
        console.error('创建群组模态框未找到');
        return;
    }
    
    // 清空表单
    const groupNameInput = document.getElementById('group-name');
    const groupDescriptionInput = document.getElementById('group-description');
    
    if (groupNameInput) groupNameInput.value = '';
    if (groupDescriptionInput) groupDescriptionInput.value = '';
    
    modal.classList.remove('hidden');
}

// 创建量子群组
async function createGroup() {
    const groupNameInput = document.getElementById('group-name');
    const groupDescriptionInput = document.getElementById('group-description');
    
    if (!groupNameInput || !groupNameInput.value.trim()) {
        showNotification('输入错误', '请输入频道名称', 'error');
        return;
    }
    
    const groupName = groupNameInput.value.trim();
    const groupDescription = groupDescriptionInput ? groupDescriptionInput.value : '';
    
    try {
        setButtonLoading(document.getElementById('create-group-btn-confirm'), true);
        
        console.log('创建群组:', groupName);
        
        // 生成群组ID和头像
        const groupId = 'quantum-group-' + Date.now();
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(groupName)}&background=9d4edd&color=fff`;
        
        const newGroup = {
            id: groupId,
            name: groupName,
            description: groupDescription,
            avatar_url: avatarUrl,
            created_by: currentUser.id,
            created_at: new Date().toISOString(),
            quantum_level: SYSTEM_STATE.quantumLevel,
            member_count: 1
        };
        
        // 保存到本地存储（模拟数据库持久化）
        saveGroupToStorage(newGroup);
        
        // 添加到当前群组列表
        groups.push(newGroup);
        
        // 创建量子群组效果
        QuantumCrypto.createQuantumEntanglementEffect();
        
        // 更新UI
        updateGroupsBadge();
        renderGroupsList();
        
        showNotification('频道', `频道 "${groupName}" 创建成功`, 'success');
        closeAllModals();
        
        // 自动打开新创建的群组
        setTimeout(() => {
            openQuantumChat(groupId, 'group', groupName);
        }, 1000);
        
    } catch (error) {
        console.error('创建群组失败:', error);
        showNotification('创建失败', '频道创建失败: ' + error.message, 'error');
    } finally {
        setButtonLoading(document.getElementById('create-group-btn-confirm'), false);
    }
}

// 保存群组到本地存储
function saveGroupToStorage(group) {
    try {
        // 从本地存储获取现有群组
        const storedGroups = JSON.parse(localStorage.getItem('quantum_chat_groups') || '[]');
        
        // 添加新群组
        storedGroups.push(group);
        
        // 保存回本地存储
        localStorage.setItem('quantum_chat_groups', JSON.stringify(storedGroups));
        
        console.log('群组已保存到本地存储:', group.name);
    } catch (error) {
        console.error('保存群组到本地存储失败:', error);
    }
}

// 从本地存储加载群组
function loadGroupsFromStorage() {
    try {
        const storedGroups = JSON.parse(localStorage.getItem('quantum_chat_groups') || '[]');
        console.log('从本地存储加载群组:', storedGroups.length);
        return storedGroups;
    } catch (error) {
        console.error('从本地存储加载群组失败:', error);
        return [];
    }
}

// 删除群组
function deleteGroup() {
    if (!groupToDelete) return;
    
    try {
        console.log('删除群组:', groupToDelete.name);
        
        // 从本地存储中删除
        const storedGroups = JSON.parse(localStorage.getItem('quantum_chat_groups') || '[]');
        const updatedGroups = storedGroups.filter(group => group.id !== groupToDelete.id);
        localStorage.setItem('quantum_chat_groups', JSON.stringify(updatedGroups));
        
        // 从当前群组列表中删除
        groups = groups.filter(group => group.id !== groupToDelete.id);
        
        // 删除相关消息
        localStorage.removeItem(`quantum_chat_messages_${groupToDelete.id}`);
        
        // 更新UI
        updateGroupsBadge();
        renderGroupsList();
        
        // 如果当前正在查看被删除的群组，重置聊天界面
        if (currentChat === groupToDelete.id && chatType === 'group') {
            resetChatInterface();
        }
        
        showNotification('频道删除', `频道 "${groupToDelete.name}" 已删除`, 'success');
        closeAllModals();
        
        groupToDelete = null;
        
    } catch (error) {
        console.error('删除群组失败:', error);
        showNotification('删除失败', '频道删除失败: ' + error.message, 'error');
    }
}

// 显示删除群组确认模态框
function showDeleteGroupModal(group) {
    groupToDelete = group;
    
    const modal = document.getElementById('delete-group-modal');
    const deleteGroupName = document.getElementById('delete-group-name');
    
    if (!modal || !deleteGroupName) {
        console.error('删除群组模态框未找到');
        return;
    }
    
    deleteGroupName.textContent = group.name;
    modal.classList.remove('hidden');
}

// 显示忘记密码模态框
function showForgotPasswordModal() {
    console.log('打开忘记密码模态框');
    
    const modal = document.getElementById('forgot-password-modal');
    if (!modal) {
        console.error('忘记密码模态框未找到');
        return;
    }
    
    // 清空表单
    const resetNumericId = document.getElementById('reset-numeric-id');
    const newPassword = document.getElementById('new-password');
    
    if (resetNumericId) resetNumericId.value = '';
    if (newPassword) newPassword.value = '';
    
    modal.classList.remove('hidden');
}

// 处理重置密码
async function handleResetPassword() {
    const numericId = document.getElementById('reset-numeric-id').value.trim();
    const newPassword = document.getElementById('new-password').value;
    
    if (!numericId || !newPassword) {
        showNotification('输入错误', '请输入ID和新密钥', 'error');
        return;
    }
    
    if (!validateNumericId(document.getElementById('reset-numeric-id'))) {
        showNotification('输入错误', 'ID必须是8位纯数字', 'error');
        return;
    }
    
    if (!validatePassword(document.getElementById('new-password'))) {
        showNotification('输入错误', '新密钥长度至少6位', 'error');
        return;
    }
    
    try {
        setButtonLoading(document.getElementById('confirm-reset-password'), true);
        
        console.log('重置密码:', numericId);
        
        // 模拟重置过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification('密钥重置', '密钥已成功重置', 'success');
        closeAllModals();
        
        // 自动切换到登录标签页
        switchAuthTab('login');
        
    } catch (error) {
        console.error('重置密码失败:', error);
        showNotification('重置失败', '密钥重置失败: ' + error.message, 'error');
    } finally {
        setButtonLoading(document.getElementById('confirm-reset-password'), false);
    }
}

// 显示服务条款模态框
function showTermsModal() {
    showNotification('服务条款', '通讯服务条款内容加载中...', 'info');
}

// 显示隐私政策模态框
function showPrivacyModal() {
    showNotification('隐私政策', '通讯隐私政策内容加载中...', 'info');
}

// 好友功能
async function loadFriends() {
    if (!currentUser) return;
    
    try {
        console.log('加载好友列表...');
        
        // 模拟数据 - 确保界面能正常显示
        friends = [
            {
                id: 'quantum-friend-1',
                friend: {
                    id: 'quantum-friend-1',
                    username: '用户A',
                    avatar_url: 'https://ui-avatars.com/api/?name=用户A&background=0D8ABC&color=fff',
                    numeric_id: '10000002',
                    status: 'online',
                    quantum_level: 5,
                    last_seen: new Date().toISOString()
                },
                status: 'accepted',
                quantum_level: 5
            },
            {
                id: 'quantum-friend-2', 
                friend: {
                    id: 'quantum-friend-2',
                    username: '示例用户B',
                    avatar_url: 'https://ui-avatars.com/api/?name=示例用户B&background=9d4edd&color=fff',
                    numeric_id: '10000003',
                    status: 'offline',
                    quantum_level: 3,
                    last_seen: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30分钟前
                },
                status: 'accepted',
                quantum_level: 3
            }
        ];
        
        console.log(`好友列表加载完成: ${friends.length} 位好友`);
        updateFriendsBadge();
        renderFriendsList();
        
    } catch (error) {
        console.error('加载好友异常:', error);
        // 使用模拟数据确保界面正常
        friends = [];
        updateFriendsBadge();
        renderFriendsList();
    }
}

function updateFriendsBadge() {
    const friendsBadge = document.getElementById('friends-badge');
    if (friendsBadge) {
        friendsBadge.textContent = friends.length;
    }
}

function renderFriendsList() {
    if (!elements.friendsList) return;
    
    elements.friendsList.innerHTML = '';
    
    if (friends.length === 0) {
        elements.friendsList.innerHTML = `
            <div class="list-item">
                <div class="list-item-info">
                    <div class="list-item-name">通讯录为空</div>
                    <div class="list-item-last-msg">点击"建立连接"开始通讯</div>
                </div>
            </div>
        `;
        return;
    }
    
    friends.forEach(friend => {
        const friendEl = document.createElement('div');
        friendEl.className = 'list-item';
        friendEl.setAttribute('data-id', friend.friend.id);
        friendEl.setAttribute('data-type', 'friend');
        friendEl.setAttribute('data-name', friend.friend.username);
        
        const statusText = friend.friend.status === 'online' ? '在线' : '离线';
        const statusClass = friend.friend.status === 'online' ? 'status-online' : 'status-offline';
        const lastSeen = friend.friend.status === 'online' ? '' : ` | 最后在线: ${formatLastSeen(friend.friend.last_seen)}`;
        
        friendEl.innerHTML = `
            <img class="list-item-avatar" src="${friend.friend.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.friend.username)}&background=0D8ABC&color=fff`}" alt="${friend.friend.username}">
            <div class="list-item-info">
                <div class="list-item-name">${friend.friend.username}</div>
                <div class="list-item-last-msg">ID: ${friend.friend.numeric_id || '未知'} | 等级: ${friend.quantum_level}</div>
            </div>
            <div class="list-item-time ${statusClass}">${statusText}${lastSeen}</div>
        `;
        
        // 添加点击事件监听器
        friendEl.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            const name = this.getAttribute('data-name');
            openQuantumChat(id, type, name);
        });
        
        elements.friendsList.appendChild(friendEl);
    });
}

// 格式化最后在线时间
function formatLastSeen(timestamp) {
    if (!timestamp) return '未知';
    
    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffMs = now - lastSeen;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return lastSeen.toLocaleDateString('zh-CN');
}

// 群组功能
async function loadGroups() {
    if (!currentUser) return;
    
    try {
        console.log('加载群聊列表...');
        
        // 从本地存储加载群组
        const storedGroups = loadGroupsFromStorage();
        
        // 合并默认群组和存储的群组
        groups = [
            {
                id: 'quantum-welcome-group',
                name: '欢迎频道',
                description: '新用户欢迎频道',
                created_by: 'quantum-system',
                avatar_url: 'https://ui-avatars.com/api/?name=欢迎频道&background=9d4edd&color=fff',
                created_at: new Date().toISOString(),
                quantum_level: 5,
                member_count: 1,
                is_public: true
            },
            ...storedGroups
        ];
        
        console.log(`群聊列表加载完成: ${groups.length} 个群组`);
        updateGroupsBadge();
        renderGroupsList();
        
    } catch (error) {
        console.error('加载群聊异常:', error);
        groups = [
            {
                id: 'quantum-welcome-group',
                name: '欢迎频道',
                created_by: 'quantum-system',
                avatar_url: 'https://ui-avatars.com/api/?name=欢迎频道&background=9d4edd&color=fff',
                quantum_level: 5,
                member_count: 1
            }
        ];
        updateGroupsBadge();
        renderGroupsList();
    }
}

function updateGroupsBadge() {
    const groupsBadge = document.getElementById('groups-badge');
    if (groupsBadge) {
        groupsBadge.textContent = groups.length;
    }
}

function renderGroupsList() {
    if (!elements.groupsList) return;
    
    elements.groupsList.innerHTML = '';
    
    if (groups.length === 0) {
        elements.groupsList.innerHTML = `
            <div class="list-item">
                <div class="list-item-info">
                    <div class="list-item-name">暂无群组频道</div>
                    <div class="list-item-last-msg">点击"创建频道"建立群组</div>
                </div>
            </div>
        `;
        return;
    }
    
    groups.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'list-item';
        groupEl.setAttribute('data-id', group.id);
        groupEl.setAttribute('data-type', 'group');
        groupEl.setAttribute('data-name', group.name);
        
        // 只有用户创建的群组才显示删除按钮
        const canDelete = group.created_by === currentUser.id;
        const deleteButton = canDelete ? 
            `<div class="group-actions">
                <button class="delete-group-btn" data-group-id="${group.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>` : '';
        
        const memberText = group.member_count ? `${group.member_count} 成员` : '新频道';
        
        groupEl.innerHTML = `
            <img class="list-item-avatar" src="${group.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(group.name)}&background=9d4edd&color=fff`}" alt="${group.name}">
            <div class="list-item-info">
                <div class="list-item-name">${group.name}</div>
                <div class="list-item-last-msg">${group.description || '群组频道'} | 等级: ${group.quantum_level}</div>
            </div>
            <div class="list-item-time">${memberText}</div>
            ${deleteButton}
        `;
        
        // 添加点击事件监听器
        groupEl.addEventListener('click', function(e) {
            // 防止点击删除按钮时触发聊天打开
            if (!e.target.closest('.delete-group-btn')) {
                const id = this.getAttribute('data-id');
                const type = this.getAttribute('data-type');
                const name = this.getAttribute('data-name');
                openQuantumChat(id, type, name);
            }
        });
        
        // 添加删除按钮事件
        const deleteBtn = groupEl.querySelector('.delete-group-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止事件冒泡
                const groupId = this.getAttribute('data-group-id');
                const groupToDelete = groups.find(g => g.id === groupId);
                if (groupToDelete) {
                    showDeleteGroupModal(groupToDelete);
                }
            });
        }
        
        elements.groupsList.appendChild(groupEl);
    });
}

// 好友请求功能
async function loadFriendRequests() {
    if (!currentUser) return;
    
    try {
        console.log('加载好友请求...');
        
        // 模拟好友请求数据
        friendRequests = [
            {
                id: 'request-1',
                from_user: {
                    id: 'user-request-1',
                    username: '用户C',
                    numeric_id: '10000004',
                    avatar_url: 'https://ui-avatars.com/api/?name=用户C&background=ff006e&color=fff',
                    quantum_level: 4
                },
                status: 'pending',
                created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10分钟前
                message: '希望与您建立连接'
            }
        ];
        
        console.log(`好友请求加载完成: ${friendRequests.length} 个请求`);
        updateRequestsBadge();
        renderFriendRequests();
        
    } catch (error) {
        console.error('加载好友请求异常:', error);
        friendRequests = [];
        updateRequestsBadge();
        renderFriendRequests();
    }
}

function updateRequestsBadge() {
    const requestsBadge = document.getElementById('requests-badge');
    if (requestsBadge) {
        requestsBadge.textContent = friendRequests.length;
    }
}

function renderFriendRequests() {
    if (!elements.requestsList) return;
    
    elements.requestsList.innerHTML = '';
    
    if (friendRequests.length === 0) {
        elements.requestsList.innerHTML = `
            <div class="list-item">
                <div class="list-item-info">
                    <div class="list-item-name">暂无验证请求</div>
                    <div class="list-item-last-msg">等待其他用户建立连接</div>
                </div>
            </div>
        `;
        return;
    }
    
    friendRequests.forEach(request => {
        const requestEl = document.createElement('div');
        requestEl.className = 'list-item';
        requestEl.innerHTML = `
            <img class="list-item-avatar" src="${request.from_user.avatar_url}" alt="${request.from_user.username}">
            <div class="list-item-info">
                <div class="list-item-name">${request.from_user.username}</div>
                <div class="list-item-last-msg">ID: ${request.from_user.numeric_id} | ${request.message}</div>
                <div class="list-item-time">${formatLastSeen(request.created_at)}</div>
            </div>
            <div class="list-item-actions">
                <button class="cyber-icon-btn small accept-request" data-request-id="${request.id}" title="接受">
                    <i class="fas fa-check"></i>
                </button>
                <button class="cyber-icon-btn small decline-request" data-request-id="${request.id}" title="拒绝">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // 添加接受按钮事件
        const acceptBtn = requestEl.querySelector('.accept-request');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                const requestId = this.getAttribute('data-request-id');
                acceptFriendRequest(requestId);
            });
        }
        
        // 添加拒绝按钮事件
        const declineBtn = requestEl.querySelector('.decline-request');
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                const requestId = this.getAttribute('data-request-id');
                declineFriendRequest(requestId);
            });
        }
        
        elements.requestsList.appendChild(requestEl);
    });
}

// 接受好友请求
function acceptFriendRequest(requestId) {
    const request = friendRequests.find(req => req.id === requestId);
    if (!request) return;
    
    console.log('接受好友请求:', request.from_user.username);
    
    // 添加到好友列表
    friends.push({
        id: 'friend-from-' + requestId,
        friend: request.from_user,
        status: 'accepted',
        quantum_level: Math.max(SYSTEM_STATE.quantumLevel, request.from_user.quantum_level)
    });
    
    // 从请求列表中移除
    friendRequests = friendRequests.filter(req => req.id !== requestId);
    
    // 更新UI
    updateFriendsBadge();
    updateRequestsBadge();
    renderFriendsList();
    renderFriendRequests();
    
    showNotification('连接建立', `已与 ${request.from_user.username} 建立连接`, 'success');
    
    // 创建量子纠缠效果
    QuantumCrypto.createQuantumEntanglementEffect();
}

// 拒绝好友请求
function declineFriendRequest(requestId) {
    const request = friendRequests.find(req => req.id === requestId);
    if (!request) return;
    
    console.log('拒绝好友请求:', request.from_user.username);
    
    // 从请求列表中移除
    friendRequests = friendRequests.filter(req => req.id !== requestId);
    
    // 更新UI
    updateRequestsBadge();
    renderFriendRequests();
    
    showNotification('请求拒绝', `已拒绝 ${request.from_user.username} 的连接请求`, 'info');
}

// 聊天功能 - 修复后的openQuantumChat函数
async function openQuantumChat(chatId, type, name) {
    if (!currentUser) return;
    
    console.log(`打开“回响”聊天: ${name}, 类型: ${type}, ID: ${chatId}`);
    
    currentChat = chatId;
    chatType = type;
    currentChatName = name;
    
    // 更新聊天标题
    if (elements.chatTitle) {
        elements.chatTitle.textContent = name;
    }
    
    // 更新移动端标题
    if (elements.mobileChatTitle) {
        elements.mobileChatTitle.textContent = name;
    }
    
    // 移动端：打开聊天后关闭侧边栏
    if (SYSTEM_STATE.isMobile && elements.sidebar) {
        elements.sidebar.classList.remove('active');
    }
    
    // 启用消息输入
    if (elements.messageInput) {
        elements.messageInput.disabled = false;
        elements.messageInput.placeholder = `发送量子加密消息给 ${name}...`;
        elements.messageInput.focus();
    }
    
    if (elements.sendBtn) {
        elements.sendBtn.disabled = false;
    }
    
    // 加载消息历史
    await loadQuantumMessages();
    
    // 更新活跃状态
    updateQuantumActiveChatState(chatId, type);
    
    showNotification('通道', `与 ${name} 的通道已激活`, 'success');
}

async function loadQuantumMessages() {
    if (!currentChat || !currentUser) return;
    
    try {
        console.log('加载消息历史...');
        
        // 从本地存储加载消息
        const storedMessages = loadQuantumMessagesFromStorage(currentChat);
        
        if (storedMessages.length > 0) {
            currentMessages = storedMessages;
            console.log(`从存储加载消息: ${currentMessages.length} 条消息`);
        } else {
            // 生成初始消息数据
            currentMessages = generateInitialMessages();
            console.log(`生成初始消息: ${currentMessages.length} 条消息`);
        }
        
        renderQuantumMessages(currentMessages);
        
    } catch (error) {
        console.error('加载消息异常:', error);
        currentMessages = [];
        renderQuantumMessages([]);
    }
}

// 生成初始消息
function generateInitialMessages() {
    const messages = [
        {
            id: 'quantum-msg-1',
            sender_id: chatType === 'group' ? 'quantum-system' : currentChat,
            content: chatType === 'group' 
                ? '欢迎来到GCN回响通讯系统！这是一个安全、加密的通讯平台。' 
                : '欢迎使用GCN回响通讯系统！这是一个安全加密的通讯平台。',
            created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5分钟前
            sender: {
                username: chatType === 'group' ? '系统助手' : '示例用户'
            },
            quantum_encrypted: true,
            quantum_level: 5
        }
    ];
    
    if (chatType === 'friend') {
        messages.push({
            id: 'quantum-msg-2', 
            sender_id: currentUser.id,
            content: '你好！很高兴使用GCN回响通讯系统。',
            created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2分钟前
            sender: {
                username: userProfile?.username || '您'
            },
            quantum_encrypted: true,
            quantum_level: SYSTEM_STATE.quantumLevel
        });
    }
    
    if (chatType === 'group' && currentChat === 'quantum-welcome-group') {
        messages.push({
            id: 'quantum-msg-3',
            sender_id: 'quantum-system',
            content: '通讯特性：\n• 端到端加密\n• 实时消息传输\n• 完全匿名模式\n• 自毁消息功能',
            created_at: new Date().toISOString(),
            sender: {
                username: '系统助手'
            },
            quantum_encrypted: true,
            quantum_level: 10
        });
    }
    
    return messages;
}

// 从本地存储加载消息
function loadQuantumMessagesFromStorage(chatId) {
    try {
        const storedMessages = JSON.parse(localStorage.getItem(`quantum_chat_messages_${chatId}`) || '[]');
        return storedMessages;
    } catch (error) {
        console.error('从本地存储加载消息失败:', error);
        return [];
    }
}

// 保存消息到本地存储
function saveQuantumMessagesToStorage(chatId, messages) {
    try {
        localStorage.setItem(`quantum_chat_messages_${chatId}`, JSON.stringify(messages));
    } catch (error) {
        console.error('保存消息到本地存储失败:', error);
    }
}

function renderQuantumMessages(messages) {
    if (!elements.messagesContainer) return;
    
    elements.messagesContainer.innerHTML = '';
    
    if (messages.length === 0) {
        let welcomeText = `这是您与 ${currentChatName} 的通讯开始`;
        if (SYSTEM_STATE.isAnonymous) {
            welcomeText = `匿名模式 - 与 ${currentChatName} 的临时通讯`;
        }
        
        elements.messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-atom"></i>
                    <div class="orbit-ring"></div>
                </div>
                <h3>加密通道建立</h3>
                <p>${welcomeText}</p>
                <div class="welcome-features">
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <span>${QuantumCrypto.getEncryptionStatus()}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bolt"></i>
                        <span>实时传输</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-globe"></i>
                        <span>量子纠缠</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-user-secret"></i>
                        <span>${SYSTEM_STATE.isAnonymous ? '临时匿名' : '完全匿名'}</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    messages.forEach(message => {
        const messageEl = document.createElement('div');
        const isSent = message.sender_id === currentUser.id;
        
        messageEl.className = `message-bubble ${isSent ? 'sent' : 'received'}`;
        
        let senderInfo = '';
        if (chatType === 'group' && !isSent) {
            senderInfo = `<div class="message-sender">${message.sender?.username || '未知用户'}</div>`;
        }
        
        const time = new Date(message.created_at).toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // 添加加密标识
        const quantumBadge = message.quantum_encrypted ? 
            `<div class="quantum-badge" title="加密等级 ${message.quantum_level || 5}">
                <i class="fas fa-atom"></i>
            </div>` : '';
        
        messageEl.innerHTML = `
            ${senderInfo}
            <div class="message-content">${escapeHtml(message.content)}</div>
            <div class="message-time">${time} ${quantumBadge}</div>
        `;
        
        elements.messagesContainer.appendChild(messageEl);
    });
    
    // 滚动到底部
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

async function sendQuantumMessage() {
    if (!elements.messageInput || !currentChat || !currentUser) return;
    
    const content = elements.messageInput.value.trim();
    
    if (!content) {
        return;
    }
    
    console.log('发送消息:', content);
    
    // 生成密钥并加密消息
    const quantumKey = QuantumCrypto.generateQuantumKey();
    const encryptedMessage = QuantumCrypto.encryptMessage(content, quantumKey);
    
    // 创建新消息
    const newMessage = {
        id: 'quantum-msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        sender_id: currentUser.id,
        content: content,
        encrypted_data: encryptedMessage,
        created_at: new Date().toISOString(),
        sender: {
            username: userProfile?.username || '您'
        },
        quantum_encrypted: true,
        quantum_level: SYSTEM_STATE.quantumLevel
    };
    
    // 添加到当前消息列表
    currentMessages.push(newMessage);
    
    // 保存到本地存储
    saveQuantumMessagesToStorage(currentChat, currentMessages);
    
    // 重新渲染消息
    renderQuantumMessages(currentMessages);
    
    // 清空输入框
    elements.messageInput.value = '';
    
    // 禁用发送按钮
    if (elements.sendBtn) {
        elements.sendBtn.disabled = true;
    }
    
    // 保持焦点
    elements.messageInput.focus();
    
    showNotification('消息', '加密消息已通过通道发送', 'success');
    
    // 随机增强加密级别
    if (Math.random() > 0.7) {
        QuantumCrypto.enhanceEncryption();
    }
    
    // 删除或注释掉群聊自动回复
    /*
    // 如果是群聊，模拟其他用户回复
    if (chatType === 'group' && Math.random() > 0.5) {
        simulateGroupReply();
    }
    */
}

function updateQuantumActiveChatState(chatId, type) {
    // 移除所有活跃状态
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 设置当前聊天为活跃状态
    const currentChatEl = document.querySelector(`.list-item[data-id="${chatId}"][data-type="${type}"]`);
    if (currentChatEl) {
        currentChatEl.classList.add('active');
    }
}

// 重置聊天界面
function resetChatInterface() {
    currentChat = null;
    chatType = null;
    currentChatName = null;
    currentMessages = [];
    
    if (elements.chatTitle) {
        elements.chatTitle.textContent = '选择通讯目标';
    }
    
    if (elements.mobileChatTitle) {
        elements.mobileChatTitle.textContent = 'GCN回响';
    }
    
    if (elements.messageInput) {
        elements.messageInput.disabled = true;
        elements.messageInput.placeholder = '输入加密消息...';
        elements.messageInput.value = '';
    }
    
    if (elements.sendBtn) {
        elements.sendBtn.disabled = true;
    }
    
    // 显示欢迎消息
    if (elements.messagesContainer) {
        elements.messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-satellite"></i>
                    <div class="orbit-ring"></div>
                </div>
                <h3>GCN“回响”通讯系统就绪</h3>
                <p>选择通讯目标建立安全连接</p>
                <div class="welcome-features">
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <span>二级加密</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bolt"></i>
                        <span>实时传输</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-globe"></i>
                        <span>全球覆盖</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-user-secret"></i>
                        <span>完全匿名</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// 初始化其他功能按钮
function initializeFeatureButtons() {
    console.log('初始化功能按钮...');
    
    // 状态按钮
    const statusBtn = document.getElementById('status-btn');
    if (statusBtn) {
        statusBtn.addEventListener('click', toggleQuantumStatusMenu);
    }
    
    // 状态选项
    document.querySelectorAll('.status-option').forEach(option => {
        option.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            setQuantumUserStatus(status);
            document.getElementById('status-menu').classList.add('hidden');
        });
    });
    
    // 点击外部关闭状态菜单
    document.addEventListener('click', (e) => {
        const statusMenu = document.getElementById('status-menu');
        if (statusMenu && !statusMenu.classList.contains('hidden') && 
            !e.target.closest('#status-btn') && !e.target.closest('.status-menu')) {
            statusMenu.classList.add('hidden');
        }
    });
    
    // 创建群组确认按钮
    const createGroupConfirmBtn = document.getElementById('create-group-btn-confirm');
    if (createGroupConfirmBtn) {
        createGroupConfirmBtn.addEventListener('click', createGroup);
    }
    
    // 创建群组取消按钮
    const cancelCreateGroupBtn = document.getElementById('cancel-create-group');
    if (cancelCreateGroupBtn) {
        cancelCreateGroupBtn.addEventListener('click', closeAllModals);
    }
    
    // 刷新请求按钮
    const refreshRequestsBtn = document.getElementById('refresh-requests-btn');
    if (refreshRequestsBtn) {
        refreshRequestsBtn.addEventListener('click', loadFriendRequests);
    }
}

function toggleQuantumStatusMenu() {
    const statusMenu = document.getElementById('status-menu');
    if (statusMenu) {
        statusMenu.classList.toggle('hidden');
    }
}

// 修复用户状态设置函数
function setQuantumUserStatus(status) {
    const statusIndicator = document.getElementById('user-status');
    const mobileStatus = document.getElementById('mobile-status');
    
    if (statusIndicator) {
        // 移除所有状态类
        statusIndicator.classList.remove('online', 'away', 'busy', 'invisible');
        
        // 添加新状态类
        if (status !== 'online') {
            statusIndicator.classList.add(status);
        }
        
        // 使用全局状态颜色常量
        statusIndicator.style.background = STATUS_COLORS[status] || STATUS_COLORS.online;
    }
    
    if (mobileStatus) {
        const statusTexts = {
            online: '在线',
            away: '离开',
            busy: '忙碌',
            invisible: '隐身'
        };
        
        mobileStatus.textContent = statusTexts[status] || '在线';
        mobileStatus.style.color = STATUS_COLORS[status] || STATUS_COLORS.online;
    }
    
    // 更新状态选项
    document.querySelectorAll('.status-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-status') === status) {
            option.classList.add('active');
        }
    });
    
    showNotification('状态更新', `量子状态已设置为: ${getQuantumStatusText(status)}`, 'success');
}

function getQuantumStatusText(status) {
    const statusMap = {
        online: '在线',
        away: '暂时离开',
        busy: '忙碌',
        invisible: '隐身'
    };
    return statusMap[status] || '未知状态';
}

// 通知系统
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    // 限制通知数量
    if (container.children.length > 3) {
        container.removeChild(container.firstChild);
    }
    
    const notification = document.createElement('div');
    notification.className = `cyber-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-title">${title}</div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-message">${message}</div>
    `;
    
    container.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlide 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // 点击关闭
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
}

// 创建粒子背景
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // 清空现有粒子
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机属性
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const color = Math.random() > 0.5 ? '#00f3ff' : '#9d4edd';
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            top: ${top}%;
            animation: floatParticle ${duration}s infinite linear ${delay}s;
            opacity: ${0.1 + Math.random() * 0.3};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// 会话计时器
function startSessionTimer() {
    if (sessionTimer) clearInterval(sessionTimer);
    
    SYSTEM_STATE.sessionStartTime = new Date();
    
    sessionTimer = setInterval(() => {
        if (SYSTEM_STATE.sessionStartTime) {
            const now = new Date();
            const diff = Math.floor((now - SYSTEM_STATE.sessionStartTime) / 1000);
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            
            const timerElement = document.getElementById('session-timer');
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }, 1000);
}

function stopSessionTimer() {
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
    }
    
    const timerElement = document.getElementById('session-timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
}

// 工具函数
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

console.log('GCN回响通讯系统初始化完成!');