// 宠物主逻辑
class PetLogic {
    constructor() {
        this.renderer = new PetRenderer();
        this.currentState = 'idle';
        this.isDragging = false;
        this.lastInteractionTime = Date.now();
        this.stateTimer = null;
        this.container = document.querySelector('.pet-container');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startIdleMode();
    }

    setupEventListeners() {
        const svg = document.getElementById('pet-svg');
        
        // 点击事件 - 显示随机状态
        svg.addEventListener('click', () => this.handleClick());
        
        // 鼠标按下 - 开始拖动
        svg.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        
        // 鼠标移动
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // 鼠标抬起 - 结束拖动
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // 双击 - 特殊动作
        svg.addEventListener('dblclick', () => this.handleDoubleClick());
    }

    // 点击处理
    handleClick() {
        this.lastInteractionTime = Date.now();
        const reactions = ['happy', 'shy', 'clicked', 'surprised'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        this.setState(randomReaction);
        
        // 3秒后回到 idle
        setTimeout(() => {
            if (this.currentState === randomReaction) {
                this.startIdleMode();
            }
        }, 3000);
    }

    // 鼠标按下 - 开始拖动
    handleMouseDown(e) {
        this.isDragging = true;
        this.lastInteractionTime = Date.now();
        this.setState('drag');
        this.container.classList.add('dragging');
    }

    // 鼠标移动 - 跟随拖动，更新状态
    handleMouseMove(e) {
        if (this.isDragging) {
            // 在这里可以添加拖动窗口的逻辑
            // 如果使用 Electron，需要在主进程实现具体的拖动
        }
    }

    // 鼠标抬起 - 结束拖动
    handleMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.container.classList.remove('dragging');
            this.setState('clicked');
            
            setTimeout(() => {
                this.startIdleMode();
            }, 2000);
        }
    }

    // 双击 - Study 状态
    handleDoubleClick() {
        this.lastInteractionTime = Date.now();
        this.setState('study');
        
        setTimeout(() => {
            if (this.currentState === 'study') {
                this.startIdleMode();
            }
        }, 5000);
    }

    // 设置状态
    setState(newState) {
        if (this.currentState === newState) return;
        
        this.renderer.currentAnimation = newState;
        this.currentState = newState;
        
        // 更新调试文本
        document.getElementById('status-debug').textContent = newState;
        
        // 调用对应的动画函数
        switch (newState) {
            case 'idle':
                this.renderer.animateIdle();
                break;
            case 'happy':
                this.renderer.animateHappy();
                break;
            case 'shy':
                this.renderer.animateShy();
                break;
            case 'cry':
                this.renderer.animateCry();
                break;
            case 'surprised':
                this.renderer.animateSurprised();
                break;
            case 'clicked':
                this.renderer.animateClicked();
                break;
            case 'drag':
                this.renderer.animateDrag();
                break;
            case 'sleep':
                this.renderer.animateSleep();
                break;
            case 'study':
                this.renderer.animateStudy();
                break;
        }
    }

    // 开始 Idle 模式，随机变化状态
    startIdleMode() {
        this.setState('idle');
        
        // 清除之前的定时器
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
        }
        
        // 每30秒检查一次是否该改变状态
        const checkStateChange = () => {
            if (this.currentState === 'idle') {
                const timeSinceInteraction = Date.now() - this.lastInteractionTime;
                
                // 如果60秒没有交互，随机切换到其他状态
                if (timeSinceInteraction > 60000) {
                    const states = ['cry', 'sleep', 'study', 'happy'];
                    const randomState = states[Math.floor(Math.random() * states.length)];
                    
                    if (randomState === 'sleep') {
                        this.setState('sleep');
                        setTimeout(() => {
                            if (this.currentState === 'sleep') {
                                this.startIdleMode();
                            }
                        }, 8000);
                    } else if (randomState === 'study') {
                        this.setState('study');
                        setTimeout(() => {
                            if (this.currentState === 'study') {
                                this.startIdleMode();
                            }
                        }, 5000);
                    } else if (randomState === 'cry') {
                        this.setState('cry');
                        setTimeout(() => {
                            if (this.currentState === 'cry') {
                                this.startIdleMode();
                            }
                        }, 4000);
                    } else {
                        this.setState('happy');
                        setTimeout(() => {
                            if (this.currentState === 'happy') {
                                this.startIdleMode();
                            }
                        }, 3000);
                    }
                } else {
                    this.stateTimer = setTimeout(checkStateChange, 30000);
                }
            }
        };
        
        this.stateTimer = setTimeout(checkStateChange, 30000);
    }
}

// 初始化宠物
window.addEventListener('DOMContentLoaded', () => {
    window.pet = new PetLogic();
});
