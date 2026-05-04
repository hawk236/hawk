# API 文档

本文档说明如何扩展和自定义宠物的功能。

## 核心类

### PetRenderer

负责所有的视觉效果和动画。

#### 静态方法

```javascript
// 重置到默认状态
renderer.reset()

// 眨眼
renderer.blink()

// 各种动画状态
renderer.animateIdle()
renderer.animateHappy()
renderer.animateShy()
renderer.animateCry()
renderer.animateSurprised()
renderer.animateClicked()
renderer.animateDrag()
renderer.animateSleep()
renderer.animateStudy()
```

#### 属性

```javascript
renderer.svg                 // SVG 根元素
renderer.body                // 身体元素
renderer.head                // 头部元素
renderer.mouth               // 嘴巴元素
renderer.currentAnimation    // 当前动画状态
```

#### 示例

```javascript
// 创建渲染器
const renderer = new PetRenderer();

// 让宠物开心
renderer.animateHappy();

// 2秒后让宠物害羞
setTimeout(() => {
    renderer.animateShy();
}, 2000);
```

## PetLogic

负责所有的交互和状态管理。

#### 静态方法

```javascript
// 设置状态
pet.setState('happy')

// 开始空闲模式
pet.startIdleMode()

// 事件处理器
pet.handleClick()
pet.handleMouseDown(e)
pet.handleMouseMove(e)
pet.handleMouseUp()
pet.handleDoubleClick()
```

#### 属性

```javascript
pet.currentState        // 当前状态字符串
pet.isDragging         // 是否正在拖动
pet.lastInteractionTime // 上次交互时间戳
pet.renderer           // PetRenderer 实例
```

#### 示例

```javascript
// 访问全局宠物实例
const pet = window.pet;

// 强制进入睡眠状态
pet.setState('sleep');

// 检查当前状态
if (pet.currentState === 'idle') {
    console.log('宠物在闲置中...');
}
```

## 添加新的动画状态

### 第一步：在 renderer 中添加方法

```javascript
// 在 pet-renderer.js 中添加
animateNewState() {
    this.reset();  // 先重置
    
    // 修改 SVG 属性
    this.mouth.setAttribute('d', 'M 95 95 L 105 95');
    
    // 设置动画
    this.body.style.animation = 'customAnimation 2s ease-in-out infinite';
}
```

### 第二步：在 logic 中添加处理

```javascript
// 在 pet-logic.js 的 setState 中添加
case 'newstate':
    this.renderer.animateNewState();
    break;
```

### 第三步：添加 CSS 动画

```css
/* 在 pet.css 中添加 */
@keyframes customAnimation {
    0%, 100% { /* 起始状态 */ }
    50% { /* 中间状态 */ }
}
```

## 添加新的交互

### 示例：右键菜单

```javascript
// 在 pet-logic.js 的 setupEventListeners 中添加
svg.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    this.handleRightClick();
});

// 添加处理函数
handleRightClick() {
    this.lastInteractionTime = Date.now();
    this.setState('dance'); // 假设我们有舞蹈状态
}
```

### 示例：键盘快捷键

```javascript
// 在 setupEventListeners 中添加
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        this.setState('happy');
    }
});
```

## 修改 SVG 元素

所有 SVG 元素都可以通过 ID 访问：

```javascript
// 获取元素
const element = document.getElementById('mouth');

// 改变属性
element.setAttribute('d', 'M 95 100 L 105 100');
element.setAttribute('stroke', '#ff0000');
element.setAttribute('stroke-width', '2');

// 改变样式
element.style.animation = 'breathe 3s ease-in-out infinite';
element.style.opacity = '0.5';

// 获取鼠标事件时的属性值
const currentStroke = element.getAttribute('stroke');
```

## 创建自定义动画

### 使用 CSS

```css
@keyframes spinAround {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 应用到身体 */
#body {
    animation: spinAround 2s linear infinite;
}
```

### 使用 JavaScript

```javascript
// 手动控制动画
const startTime = Date.now();
const duration = 1000; // 1秒

const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // progress 从 0 到 1
    const y = Math.sin(progress * Math.PI * 2) * 10;
    document.getElementById('body').style.transform = `translateY(${y}px)`;
    
    if (progress < 1) {
        requestAnimationFrame(animate);
    }
};

animate();
```

## 与外部系统的集成

### 获取系统信息

```javascript
// 在 main.js 中读取系统信息
const os = require('os');
const cpuUsage = os.loadavg();

// 传递给渲染器
mainWindow.webContents.send('system-info', { cpuUsage });
```

### 接收系统信息

```javascript
// 在 preload.js 中
const { ipcRenderer } = require('electron');

ipcRenderer.on('system-info', (event, data) => {
    console.log('系统 CPU 使用率:', data.cpuUsage);
    
    // 根据系统状态改变宠物行为
    if (data.cpuUsage[0] > 50) {
        window.pet.setState('cry');  // CPU 过高就哭泣
    }
});
```

## 性能优化建议

### 1. 减少重排

```javascript
// ❌ 不好
for (let i = 0; i < 100; i++) {
    element.style.top = i + 'px';  // 每次都重排
}

// ✅ 好
element.style.transform = `translateY(${value}px)`;  // 使用 transform
```

### 2. 批量修改 DOM

```javascript
// ❌ 不好
for (let i = 0; i < 10; i++) {
    document.getElementById(`element-${i}`).setAttribute('fill', '#ff0000');
}

// ✅ 好
const style = document.createElement('style');
style.textContent = `#element-0, #element-1, ... { fill: #ff0000; }`;
document.head.appendChild(style);
```

### 3. 使用 requestAnimationFrame

```javascript
// ❌ 不好
setInterval(() => {
    // 更新视图
}, 16);

// ✅ 好
const animate = () => {
    // 更新视图
    requestAnimationFrame(animate);
};
animate();
```

## 调试技巧

### 查看当前状态

仅在开发模式，可在元素检查器看到状态文本 (#status-debug)

### 打开开发者工具

```bash
npm run dev
```

然后 F12 打开开发者工具

### 在控制台调用方法

```javascript
// 在浏览器控制台输入：
window.pet.setState('happy')
window.pet.renderer.blink()
```

## 常见问题

### Q: 如何添加声音效果？

A: 使用 Web Audio API

```javascript
const audio = new Audio('path/to/sound.wav');
audio.play();
```

### Q: 如何保存宠物的偏好设置？

A: 使用 localStorage

```javascript
// 保存
localStorage.setItem('petPreference', JSON.stringify({
    size: 'large',
    theme: 'dark',
}));

// 读取
const prefs = JSON.parse(localStorage.getItem('petPreference'));
```

### Q: 如何让多个宠物同时运行？

A: 使用多个 Electron 窗口

```javascript
// 在 main.js 中
for (let i = 0; i < 3; i++) {
    createWindow();
}
```

## 资源

- [Electron 文档](https://www.electronjs.org/docs)
- [MDN Web API](https://developer.mozilla.org/en-US/docs/Web/API)
- [SVG 参考](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

祝编码愉快！ 🚀
