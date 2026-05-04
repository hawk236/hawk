// 宠物渲染器 - 管理所有视觉效果和动画
class PetRenderer {
    constructor() {
        this.svg = document.getElementById('pet-svg');
        this.body = document.getElementById('body');
        this.head = document.getElementById('head');
        this.eyeLeftLid = document.getElementById('eye-left-lid');
        this.eyeRightLid = document.getElementById('eye-right-lid');
        this.mouth = document.getElementById('mouth');
        this.browLeft = document.getElementById('brow-left');
        this.browRight = document.getElementById('brow-right');
        this.handLeft = document.getElementById('hand-left');
        this.handRight = document.getElementById('hand-right');
        this.legLeft = document.getElementById('leg-left');
        this.legRight = document.getElementById('leg-right');
        this.heart = document.getElementById('heart');
        this.book = document.getElementById('book');
        this.zzz = document.getElementById('zzz');
        this.tearLeft = document.getElementById('tear-left');
        this.tearRight = document.getElementById('tear-right');
        this.tearLeftDrop = document.getElementById('tear-left-drop');
        this.tearRightDrop = document.getElementById('tear-right-drop');
        
        // 害羞线
        this.shyLines = [];
        for (let i = 1; i <= 6; i++) {
            this.shyLines.push(document.getElementById(`shy-line-${i}`));
        }
        
        this.currentAnimation = null;
        this.animationFrameId = null;
    }

    // 重置到默认状态
    reset() {
        this.clearAnimation();
        this.mouth.setAttribute('d', 'M 95 95 Q 100 99 105 95'); // W形嘴
        this.mouth.setAttribute('stroke', '#2c2c2c');
        this.mouth.setAttribute('stroke-width', '3');
        this.mouth.setAttribute('fill', 'none');
        
        // 复位眼睛
        document.getElementById('eye-left').setAttribute('r', '8');
        document.getElementById('eye-right').setAttribute('r', '8');
        this.eyeLeftLid.setAttribute('opacity', '0');
        this.eyeRightLid.setAttribute('opacity', '0');
        
        // 复位眉毛
        this.browLeft.setAttribute('d', 'M 75 62 Q 82 60 89 62');
        this.browRight.setAttribute('d', 'M 111 62 Q 118 60 125 62');
        this.browLeft.setAttribute('stroke', '#2c2c2c');
        this.browRight.setAttribute('stroke', '#2c2c2c');
        
        // 隐藏特殊元素
        this.heart.setAttribute('opacity', '0');
        this.book.setAttribute('opacity', '0');
        this.zzz.setAttribute('opacity', '0');
        this.tearLeft.setAttribute('opacity', '0');
        this.tearRight.setAttribute('opacity', '0');
        this.tearLeftDrop.setAttribute('opacity', '0');
        this.tearRightDrop.setAttribute('opacity', '0');
        
        // 隐藏害羞线
        this.shyLines.forEach(line => line.setAttribute('opacity', '0'));
        
        // 复位身体和四肢
        this.body.style.animation = 'breathe 3s ease-in-out infinite';
        this.head.style.animation = 'none';
        this.handLeft.style.animation = 'none';
        this.handRight.style.animation = 'none';
        this.legLeft.style.animation = 'none';
        this.legRight.style.animation = 'none';
    }

    clearAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    // Idle 状态 - 站立呼吸眨眼
    animateIdle() {
        this.reset();
        
        // 随机眨眼
        const blinkInterval = setInterval(() => {
            if (this.currentAnimation !== 'idle') {
                clearInterval(blinkInterval);
                return;
            }
            this.blink();
        }, Math.random() * 3000 + 2000);
    }

    // 眨眼
    blink() {
        const duration = 150;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 简单的眨眼动画
            if (progress < 0.5) {
                const scale = progress * 2;
                this.eyeLeftLid.setAttribute('ry', 8 * scale);
                this.eyeRightLid.setAttribute('ry', 8 * scale);
            } else {
                const scale = (1 - progress) * 2;
                this.eyeLeftLid.setAttribute('ry', 8 * scale);
                this.eyeRightLid.setAttribute('ry', 8 * scale);
            }
            
            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // Happy 状态 - 开心
    animateHappy() {
        this.reset();
        
        // 改变眼睛样式 - 弯月形
        // 通过改变透明度和使用 overflow 隐藏来创建弯月眼
        document.getElementById('eye-left').setAttribute('fill', 'none');
        document.getElementById('eye-left').setAttribute('stroke', '#2c2c2c');
        document.getElementById('eye-left').setAttribute('stroke-width', '2');
        document.getElementById('eye-right').setAttribute('fill', 'none');
        document.getElementById('eye-right').setAttribute('stroke', '#2c2c2c');
        document.getElementById('eye-right').setAttribute('stroke-width', '2');
        
        // 隐藏眼睛高光
        document.getElementById('eye-left-light').setAttribute('opacity', '0');
        document.getElementById('eye-right-light').setAttribute('opacity', '0');
        
        // 嘴巴开开心心
        this.mouth.setAttribute('d', 'M 95 98 Q 100 103 105 98');
        this.mouth.setAttribute('stroke-width', '3');
        
        // 挥手动画
        this.handRight.style.animation = 'wave 1s ease-in-out infinite';
        
        // 增加腮红
        document.getElementById('cheek-left').setAttribute('fill', '#ff9fc9');
        document.getElementById('cheek-right').setAttribute('fill', '#ff9fc9');
    }

    // Shy 状态 - 害羞
    animateShy() {
        this.reset();
        
        // 低头
        this.head.style.animation = 'none';
        this.body.style.animation = 'none';
        
        // 眉毛下降，表现害羞
        this.browLeft.setAttribute('d', 'M 75 64 Q 82 62 89 64');
        this.browRight.setAttribute('d', 'M 111 64 Q 118 62 125 64');
        
        // 眼睛看下方
        document.getElementById('eye-left').setAttribute('cy', '80');
        document.getElementById('eye-right').setAttribute('cy', '80');
        
        // 显示害羞线
        this.shyLines.forEach(line => line.setAttribute('opacity', '0.6'));
        
        // 左右摇晃
        this.body.style.animation = 'sway 2s ease-in-out infinite';
        
        // 增加腮红
        document.getElementById('cheek-left').setAttribute('fill', '#ff9fc9');
        document.getElementById('cheek-right').setAttribute('fill', '#ff9fc9');
    }

    // Cry 状态 - 哭泣
    animateCry() {
        this.reset();
        
        // 眼睛委屈
        const eyeRadius = '6';
        document.getElementById('eye-left').setAttribute('r', eyeRadius);
        document.getElementById('eye-right').setAttribute('r', eyeRadius);
        document.getElementById('eye-left').setAttribute('cy', '78');
        document.getElementById('eye-right').setAttribute('cy', '78');
        
        // 眉毛内侧下沉
        this.browLeft.setAttribute('d', 'M 75 60 Q 82 64 89 60');
        this.browRight.setAttribute('d', 'M 111 60 Q 118 64 125 60');
        this.browLeft.setAttribute('stroke', '#d4a5bf');
        this.browRight.setAttribute('stroke', '#d4a5bf');
        
        // 嘴巴变开心的哭嘴
        this.mouth.setAttribute('d', 'M 95 100 Q 100 94 105 100');
        
        // 显示眼泪
        this.tearLeft.setAttribute('opacity', '1');
        this.tearRight.setAttribute('opacity', '1');
        this.tearLeftDrop.setAttribute('opacity', '1');
        this.tearRightDrop.setAttribute('opacity', '1');
        
        // 轻微摇晃
        this.body.style.animation = 'none';
        this.head.style.animation = 'sway 2s ease-in-out infinite';
    }

    // Surprised 状态 - 惊吓
    animateSurprised() {
        this.reset();
        
        // 眼睛睁大
        document.getElementById('eye-left').setAttribute('r', '10');
        document.getElementById('eye-right').setAttribute('r', '10');
        document.getElementById('eye-left-light').setAttribute('r', '4');
        document.getElementById('eye-right-light').setAttribute('r', '4');
        
        // 嘴巴张开
        this.mouth.setAttribute('d', 'M 97 98 Q 100 103 103 98');
        this.mouth.setAttribute('stroke-width', '2');
        
        // 身体弹起
        this.body.style.animation = 'wobble 0.6s ease-out';
        
        // 6次换到 happy
        setTimeout(() => {
            if (this.currentAnimation === 'surprised') {
                this.animateClicked();
            }
        }, 600);
    }

    // Clicked 状态 - 点击后害羞开心
    animateClicked() {
        this.reset();
        
        // 眼睛弯成弦月
        this.mouth.setAttribute('d', 'M 95 98 Q 100 103 105 98');
        
        // 脸红
        document.getElementById('cheek-left').setAttribute('fill', '#ff9fc9');
        document.getElementById('cheek-right').setAttribute('fill', '#ff9fc9');
        
        // 轻微害羞 - 眼睛弯一点
        const browPath = 'M 75 63 Q 82 61 89 63';
        this.browLeft.setAttribute('d', browPath);
        this.browRight.setAttribute('d', 'M 111 63 Q 118 61 125 63');
        
        // 出现爱心
        this.heart.setAttribute('opacity', '1');
        this.heart.style.animation = 'heartBounce 1.5s ease-out forwards';
        
        setTimeout(() => {
            if (this.currentAnimation === 'clicked') {
                this.heart.setAttribute('opacity', '0');
            }
        }, 1500);
    }

    // Drag 状态 - 被拖动
    animateDrag() {
        this.reset();
        
        // 手臂举起
        this.handLeft.setAttribute('cy', '120');
        this.handRight.setAttribute('cy', '120');
        
        // 表情慌张
        this.mouth.setAttribute('d', 'M 97 95 L 103 95');
        this.mouth.setAttribute('stroke', '#2c2c2c');
        this.mouth.setAttribute('stroke-width', '2');
        
        // 眼睛变小
        document.getElementById('eye-left').setAttribute('r', '6');
        document.getElementById('eye-right').setAttribute('r', '6');
        
        // 眉毛上扬
        this.browLeft.setAttribute('d', 'M 75 58 Q 82 55 89 58');
        this.browRight.setAttribute('d', 'M 111 58 Q 118 55 125 58');
    }

    // Sleep 状态 - 睡觉
    animateSleep() {
        this.reset();
        
        // 闭眼
        this.eyeLeftLid.setAttribute('opacity', '1');
        this.eyeRightLid.setAttribute('opacity', '1');
        this.eyeLeftLid.setAttribute('ry', '8');
        this.eyeRightLid.setAttribute('ry', '8');
        
        // 嘴巴闭上
        this.mouth.setAttribute('d', 'M 95 100 L 105 100');
        this.mouth.setAttribute('stroke-width', '1');
        
        // 漂浮动画
        this.body.style.animation = 'sleepFloat 2s ease-in-out infinite';
        
        // 显示 ZZZ
        this.zzz.setAttribute('opacity', '1');
        this.zzz.style.animation = 'sleepFloat 2s ease-in-out infinite';
    }

    // Study 状态 - 学习看书
    animateStudy() {
        this.reset();
        
        // 保持正常高度，不需要太多调整
        // 认真表情
        const browPath = 'M 75 62 Q 82 59 89 62';
        this.browLeft.setAttribute('d', browPath);
        this.browRight.setAttribute('d', 'M 111 62 Q 118 59 125 62');
        
        // 眼睛看向前方，恢复标准大小
        document.getElementById('eye-left').setAttribute('fill', '#2c2c2c');
        document.getElementById('eye-left').setAttribute('stroke', 'none');
        document.getElementById('eye-left').setAttribute('r', '8');
        document.getElementById('eye-right').setAttribute('fill', '#2c2c2c');
        document.getElementById('eye-right').setAttribute('stroke', 'none');
        document.getElementById('eye-right').setAttribute('r', '8');
        document.getElementById('eye-left-light').setAttribute('opacity', '1');
        document.getElementById('eye-right-light').setAttribute('opacity', '1');
        
        // 嘴巴认真 - 小闭嘴
        this.mouth.setAttribute('d', 'M 96 99 L 104 99');
        this.mouth.setAttribute('stroke-width', '1.5');
        
        // 显示书
        this.book.setAttribute('opacity', '1');
        
        // 轻微上下摇晃
        this.body.style.animation = 'sleepFloat 3s ease-in-out infinite';
    }
}

// 导出给全局使用
window.PetRenderer = PetRenderer;
