// 宠物配置文件
// 在这里调整宠物的行为和参数

const PET_CONFIG = {
    // 窗口配置
    window: {
        width: 300,
        height: 350,
        alwaysOnTop: true,  // 是否始终在最前
        skipTaskbar: true,  // 是否隐藏任务栏
    },

    // 行为配置
    behavior: {
        // 空闲状态持续多长时间后触发自发动作（毫秒）
        idleTimeBeforeAction: 60000,  // 60 秒
        
        // 检查状态变化的间隔（毫秒）
        stateCheckInterval: 30000,  // 30 秒
        
        // 各状态的持续时间（毫秒）
        stateDuration: {
            happy: 3000,
            shy: 2500,
            cry: 4000,
            surprised: 600,
            clicked: 2000,
            drag: 1000,
            sleep: 8000,
            study: 5000,
        },

        // 自发动作的概率权重
        // 总和为 100
        spontaneousActions: {
            idle: 50,      // 50% 继续闲置
            sleep: 20,     // 20% 睡觉
            study: 15,     // 15% 学习
            happy: 10,     // 10% 开心
            cry: 5,        // 5% 哭泣
        },
    },

    // 动画配置
    animation: {
        // 呼吸动画参数
        breathe: {
            duration: 3000,    // 毫秒
            distance: 3,       // 像素
        },

        // 眨眼间隔
        blinkInterval: {
            min: 2000,  // 最小间隔（毫秒）
            max: 5000,  // 最大间隔（毫秒）
        },

        // 摇晃参数
        sway: {
            duration: 2000,    // 毫秒
            distance: 8,       // 像素
        },

        // 跳动参数
        wobble: {
            duration: 600,     // 毫秒
            distance: 30,      // 像素
        },

        // 漂浮参数（睡觉状态）
        float: {
            duration: 2000,    // 毫秒
            distance: 5,       // 像素
        },
    },

    // UI 配置
    ui: {
        // 是否显示状态调试信息
        showDebugStatus: true,
        
        // 深色模式
        darkMode: false,
    },
};

// 使用示例：
// 如需修改，例如让宠物摇晃更快：
// PET_CONFIG.animation.sway.duration = 1000;

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PET_CONFIG;
}
