// supabase.js - 量子通讯连接模块 - 完整修复版
console.log('🔧 初始化通讯连接模块...');

// 系统状态
const QUANTUM_SYSTEM = {
    isOnline: false,
    lastHeartbeat: null,
    reconnectAttempts: 0,
    maxReconnectAttempts: 5,
    connectionType: 'direct' // 'direct' 或 'proxy'
};

// 获取 Supabase 配置
const getSupabaseConfig = () => {
    // 在浏览器环境中，优先使用代理模式避免 CORS 问题
    const baseUrl = window.location.origin;
    const useProxy = true; // 默认使用代理模式
    
    if (useProxy && baseUrl && !baseUrl.includes('file://')) {
        console.log('🌐 使用代理模式连接');
        QUANTUM_SYSTEM.connectionType = 'proxy';
        return {
            url: `${baseUrl}/api`, // 通过 Cloudflare Pages 代理
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3Bsd253ZXJ1eHJucHZ0YmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDU1MzIsImV4cCI6MjA3NzEyMTUzMn0.g2Mu2isNpXjEqyYOoqMrfvdco5N-P6f2_j92V5Fjzig',
            isProxy: true
        };
    } else {
        console.log('🌐 使用直连模式');
        QUANTUM_SYSTEM.connectionType = 'direct';
        return {
            url: 'https://ueoplwnweruxrnpvtbdu.supabase.co',
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3Bsd253ZXJ1eHJucHZ0YmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDU1MzIsImV4cCI6MjA3NzEyMTUzMn0.g2Mu2isNpXjEqyYOoqMrfvdco5N-P6f2_j92V5Fjzig',
            isProxy: false
        };
    }
};

// 初始化 Supabase 客户端
function initializeQuantumSupabase() {
    try {
        console.log('🚀 初始化量子通讯客户端...');
        
        const config = getSupabaseConfig();
        console.log('🔗 连接配置:', { 
            url: config.url,
            connectionType: QUANTUM_SYSTEM.connectionType,
            keyLength: config.anonKey ? config.anonKey.length : 0 
        });
        
        // 检查 Supabase 库是否可用
        if (typeof supabase === 'undefined') {
            console.warn('⚠️ Supabase 客户端库未加载，使用离线模式');
            showConnectionStatus(false, '离线模式');
            return createQuantumFallbackClient();
        }
        
        // 创建 Supabase 客户端
        const supabaseClient = supabase.createClient(config.url, config.anonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false, // 在代理环境下禁用 URL 检测
                flowType: 'implicit',
                storage: typeof localStorage !== 'undefined' ? localStorage : null
            },
            realtime: {
                params: {
                    eventsPerSecond: 10
                }
            },
            global: {
                headers: {
                    'X-Quantum-Level': '5',
                    'X-Client-Info': 'gcn-echo-v2.0',
                    'X-Connection-Type': QUANTUM_SYSTEM.connectionType
                }
            }
        });
        
        // 测试连接
        testQuantumConnection(supabaseClient);
        
        console.log('✅ Supabase 客户端创建成功');
        return supabaseClient;
        
    } catch (error) {
        console.error('❌ Supabase 初始化失败:', error);
        showConnectionStatus(false, '初始化失败');
        return createQuantumFallbackClient();
    }
}

// 测试量子连接
async function testQuantumConnection(client) {
    try {
        console.log('🌐 测试量子数据库连接...');
        showConnectionStatus('connecting', '连接中...');
        
        // 添加超时控制
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('连接超时')), 8000)
        );
        
        const connectPromise = client.from('quantum_profiles').select('count').limit(1);
        
        const { data, error } = await Promise.race([connectPromise, timeoutPromise]);
        
        if (error) {
            console.warn('⚠️ 数据库连接测试失败:', error.message);
            QUANTUM_SYSTEM.isOnline = false;
            
            if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
                console.log('🔌 网络或CORS问题，启用离线模式');
                showConnectionStatus(false, '网络问题');
            } else {
                showConnectionStatus(false, '连接失败');
            }
        } else {
            console.log('✅ 量子数据库连接正常');
            QUANTUM_SYSTEM.isOnline = true;
            QUANTUM_SYSTEM.lastHeartbeat = new Date();
            QUANTUM_SYSTEM.reconnectAttempts = 0;
            showConnectionStatus(true, '连接稳定');
            
            // 创建量子连接成功效果
            createQuantumConnectionEffect();
        }
    } catch (error) {
        console.warn('⚠️ 连接测试异常:', error.message);
        QUANTUM_SYSTEM.isOnline = false;
        
        if (error.message.includes('超时')) {
            showConnectionStatus(false, '连接超时');
        } else {
            showConnectionStatus(false, '连接异常');
        }
    }
}

// 显示连接状态
function showConnectionStatus(isConnected, message = '') {
    const connectionText = document.getElementById('connection-text');
    const connectionDot = document.querySelector('.connection-dot');
    const signalBars = document.querySelector('.signal-bars');
    
    if (connectionText && connectionDot) {
        if (isConnected === true) {
            connectionText.textContent = message || '连接稳定';
            connectionDot.style.background = '#00ff88';
            connectionDot.style.boxShadow = '0 0 8px #00ff88';
            
            if (signalBars) {
                signalBars.style.opacity = '1';
            }
            
            // 显示成功通知（仅在从离线恢复时）
            if (QUANTUM_SYSTEM.reconnectAttempts > 0) {
                showNotification('连接恢复', '量子连接已恢复', 'success');
            }
            
        } else if (isConnected === 'connecting') {
            connectionText.textContent = message || '连接中...';
            connectionDot.style.background = '#ffaa00';
            connectionDot.style.boxShadow = '0 0 8px #ffaa00';
            
            if (signalBars) {
                signalBars.style.opacity = '0.5';
            }
            
        } else {
            connectionText.textContent = message || '连接中断';
            connectionDot.style.background = '#ff4444';
            connectionDot.style.boxShadow = '0 0 8px #ff4444';
            
            if (signalBars) {
                signalBars.style.opacity = '0.3';
            }
            
            // 显示离线通知（仅在首次连接失败时）
            if (QUANTUM_SYSTEM.reconnectAttempts === 0) {
                showNotification('连接问题', '使用离线模式，部分功能受限', 'warning');
            }
        }
    }
    
    // 更新系统状态
    QUANTUM_SYSTEM.isOnline = isConnected === true;
}

// 创建量子连接效果
function createQuantumConnectionEffect() {
    const effectsContainer = document.getElementById('quantum-effects');
    if (!effectsContainer) return;
    
    for (let i = 0; i < 5; i++) {
        const connectionPulse = document.createElement('div');
        connectionPulse.className = 'quantum-connection-pulse';
        connectionPulse.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: #00f3ff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #00f3ff;
            animation: connectionPulse 2s ease-out ${i * 0.2}s;
            z-index: 9997;
            pointer-events: none;
        `;
        
        document.body.appendChild(connectionPulse);
        
        setTimeout(() => {
            if (connectionPulse.parentNode) {
                connectionPulse.parentNode.removeChild(connectionPulse);
            }
        }, 2000);
    }
    
    // 添加 CSS 动画
    if (!document.querySelector('#connection-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'connection-pulse-style';
        style.textContent = `
            @keyframes connectionPulse {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 创建降级客户端（离线模式）
function createQuantumFallbackClient() {
    console.warn('🚨 使用降级客户端（离线模式）');
    showConnectionStatus(false, '离线模式');
    
    return {
        auth: {
            getSession: () => {
                console.log('🔍 获取会话（离线模式）');
                return Promise.resolve({ 
                    data: { 
                        session: {
                            user: {
                                id: 'offline-user',
                                email: 'offline@quantum.chat',
                                user_metadata: {}
                            }
                        }
                    }, 
                    error: null 
                });
            },
            
            signUp: (credentials) => {
                console.log('📝 注册用户（离线模式）:', credentials.email);
                const numericId = generateOfflineNumericId();
                return Promise.resolve({ 
                    data: { 
                        user: { 
                            id: 'offline-user-' + Date.now(),
                            email: credentials.email,
                            user_metadata: {
                                username: credentials.email.split('@')[0] || '离线用户',
                                numeric_id: numericId
                            }
                        }, 
                        session: null 
                    }, 
                    error: null 
                });
            },
            
            signInWithPassword: (credentials) => {
                console.log('🔐 登录用户（离线模式）:', credentials.email);
                const numericId = generateOfflineNumericId();
                return Promise.resolve({ 
                    data: { 
                        user: { 
                            id: 'offline-user-' + Date.now(),
                            email: credentials.email,
                            user_metadata: {
                                username: '离线用户_' + numericId.substring(0, 4),
                                numeric_id: numericId
                            },
                            is_anonymous: false
                        }, 
                        session: null 
                    }, 
                    error: null 
                });
            },
            
            signInAnonymously: () => {
                console.log('👤 匿名登录（离线模式）');
                const numericId = generateOfflineNumericId();
                return Promise.resolve({ 
                    data: { 
                        user: { 
                            id: 'quantum-anonymous-' + Date.now(),
                            email: 'quantum' + Date.now() + '@anonymous.chat',
                            user_metadata: {
                                username: '匿名用户_' + numericId.substring(0, 4),
                                numeric_id: numericId
                            },
                            is_anonymous: true
                        }, 
                        session: null 
                    }, 
                    error: null 
                });
            },
            
            signOut: () => {
                console.log('🚪 退出登录（离线模式）');
                return Promise.resolve({ error: null });
            },
            
            onAuthStateChange: (callback) => {
                console.log('🔔 认证状态监听器已注册（离线模式）');
                // 模拟认证状态变化
                setTimeout(() => {
                    callback('SIGNED_OUT', null);
                }, 100);
                return { 
                    data: { 
                        subscription: { 
                            unsubscribe: () => console.log('🔕 取消订阅认证状态') 
                        } 
                    } 
                };
            },
            
            updateUser: (attributes) => {
                console.log('✏️ 更新用户资料（离线模式）:', attributes);
                return Promise.resolve({
                    data: {
                        user: {
                            id: 'offline-user',
                            ...attributes
                        }
                    },
                    error: null
                });
            }
        },
        
        from: (table) => ({
            select: (columns = '*') => ({
                eq: (column, value) => ({
                    single: () => {
                        console.log(`📊 查询 ${table} 表（离线模式）: ${column} = ${value}`);
                        return Promise.resolve({ 
                            data: createOfflineData(table, column, value),
                            error: null
                        });
                    },
                    maybeSingle: () => {
                        console.log(`📊 查询 ${table} 表（离线模式）: ${column} = ${value}`);
                        return Promise.resolve({ 
                            data: createOfflineData(table, column, value),
                            error: null
                        });
                    },
                    limit: (count) => ({
                        single: () => Promise.resolve({ 
                            data: createOfflineData(table, column, value),
                            error: null
                        })
                    })
                }),
                order: (column, options = { ascending: false }) => ({
                    limit: (count) => ({
                        single: () => Promise.resolve({ 
                            data: createOfflineData(table),
                            error: null
                        })
                    })
                }),
                in: (column, values) => ({
                    single: () => Promise.resolve({ 
                        data: createOfflineData(table),
                        error: null
                    })
                })
            }),
            
            insert: (data) => {
                console.log(`📝 插入 ${table} 表（离线模式）:`, data);
                // 模拟插入成功
                const insertedData = Array.isArray(data) ? data.map(item => ({
                    id: 'offline-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                    ...item,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })) : {
                    id: 'offline-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                    ...data,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                // 保存到本地存储
                saveToLocalStorage(table, insertedData);
                
                return Promise.resolve({ 
                    data: insertedData,
                    error: null 
                });
            },
            
            update: (data) => {
                console.log(`✏️ 更新 ${table} 表（离线模式）:`, data);
                // 模拟更新成功
                const updatedData = {
                    ...data,
                    updated_at: new Date().toISOString()
                };
                
                // 更新本地存储
                updateLocalStorage(table, updatedData);
                
                return Promise.resolve({ 
                    data: updatedData,
                    error: null 
                });
            },
            
            delete: () => {
                console.log(`🗑️ 删除 ${table} 表记录（离线模式）`);
                return Promise.resolve({ 
                    data: null,
                    error: null 
                });
            },
            
            upsert: (data) => {
                console.log(`🔄 更新或插入 ${table} 表（离线模式）:`, data);
                return Promise.resolve({ 
                    data: data,
                    error: null 
                });
            }
        }),
        
        channel: (name) => ({
            on: (event, callback) => ({
                subscribe: () => {
                    console.log(`📡 订阅频道 ${name}（离线模式）事件: ${event}`);
                    // 模拟实时事件
                    if (event === 'postgres_changes' && name === 'quantum_messages') {
                        setTimeout(() => {
                            // 模拟新消息通知
                            callback({
                                new: {
                                    id: 'simulated-msg-' + Date.now(),
                                    sender_id: 'system',
                                    content: '欢迎使用GCN回响通讯系统（离线模式）！',
                                    created_at: new Date().toISOString()
                                }
                            });
                        }, 3000);
                    }
                    
                    return {
                        unsubscribe: () => console.log(`🔕 取消订阅频道 ${name}`)
                    };
                }
            })
        }),
        
        removeChannel: () => {
            console.log('🗑️ 移除频道（离线模式）');
            return Promise.resolve({ error: null });
        }
    };
}

// 生成离线数字ID
function generateOfflineNumericId() {
    return String(Math.floor(Math.random() * 90000000) + 10000000);
}

// 创建离线数据
function createOfflineData(table, column, value) {
    const mockData = {
        quantum_profiles: {
            id: 'offline-user',
            username: '离线用户',
            numeric_id: generateOfflineNumericId(),
            avatar_url: 'https://ui-avatars.com/api/?name=离线用户&background=6c757d&color=fff',
            status: 'online',
            is_anonymous: false,
            quantum_level: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        quantum_groups: {
            id: 'offline-group',
            name: '离线群组',
            description: '离线模式下的示例群组',
            created_by: 'offline-user',
            avatar_url: 'https://ui-avatars.com/api/?name=离线群组&background=6c757d&color=fff',
            is_public: true,
            quantum_level: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        quantum_friends: {
            id: 'offline-friend',
            user_id: 'offline-user',
            friend_id: 'system-user',
            status: 'accepted',
            quantum_level: 5,
            created_at: new Date().toISOString()
        },
        quantum_messages: {
            id: 'offline-message',
            sender_id: 'system',
            content: '系统处于离线模式，部分功能可能受限',
            created_at: new Date().toISOString(),
            quantum_level: 5,
            quantum_encrypted: true
        }
    };
    
    return mockData[table] || null;
}

// 保存到本地存储
function saveToLocalStorage(table, data) {
    try {
        const key = `quantum_${table}`;
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        
        if (Array.isArray(data)) {
            existingData.push(...data);
        } else {
            existingData.push(data);
        }
        
        localStorage.setItem(key, JSON.stringify(existingData));
        console.log(`💾 保存到本地存储: ${key}`);
    } catch (error) {
        console.error('❌ 保存到本地存储失败:', error);
    }
}

// 更新本地存储
function updateLocalStorage(table, data) {
    try {
        const key = `quantum_${table}`;
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        
        // 简单的更新逻辑 - 在实际应用中需要更复杂的匹配
        if (Array.isArray(existingData) && existingData.length > 0) {
            existingData[0] = { ...existingData[0], ...data };
            localStorage.setItem(key, JSON.stringify(existingData));
        }
        
        console.log(`✏️ 更新本地存储: ${key}`);
    } catch (error) {
        console.error('❌ 更新本地存储失败:', error);
    }
}

// 量子连接监控
function startQuantumConnectionMonitor(client) {
    setInterval(() => {
        if (!QUANTUM_SYSTEM.isOnline && QUANTUM_SYSTEM.reconnectAttempts < QUANTUM_SYSTEM.maxReconnectAttempts) {
            console.log('🔄 尝试重新连接数据库...');
            QUANTUM_SYSTEM.reconnectAttempts++;
            testQuantumConnection(client);
        }
    }, 30000); // 每30秒检查一次
}

// 显示通知
function showNotification(title, message, type = 'info') {
    // 简单的控制台通知
    console.log(`📢 ${title}: ${message}`);
    
    // 如果页面有通知系统，使用它
    if (typeof window.showNotification === 'function') {
        window.showNotification(title, message, type);
    }
}

// 初始化并导出客户端
const quantumSupabaseClient = initializeQuantumSupabase();

// 启动连接监控
startQuantumConnectionMonitor(quantumSupabaseClient);

// 导出到全局
window.quantumSupabase = quantumSupabaseClient;
window.quantumSystemStatus = QUANTUM_SYSTEM;
window.showConnectionStatus = showConnectionStatus;

console.log('🚀 通讯连接模块初始化完成');
console.log('🌐 系统状态:', QUANTUM_SYSTEM);

// 添加全局错误处理
window.addEventListener('error', function(e) {
    console.error('🌐 全局错误:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('🌐 未处理的Promise拒绝:', e.reason);
});