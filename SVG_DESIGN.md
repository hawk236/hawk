# SVG 设计文档

本文档说明如何自定义角色的外观。

## 颜色系统

### 主要颜色变量

```css
/* 身体颜色 */
#f5f5f5  /* 奶白色 */

/* 线条颜色 */
#2c2c2c  /* 深黑色 */

/* 脸颊颜色 (正常) */
#f8d7e6  /* 浅粉色 */

/* 脸颊颜色 (开心/害羞) */
#ff9fc9  /* 鲜粉色 */

/* 害羞线 */
#d4a5bf  /* 深粉色 */

/* 眼泪 */
#87ceeb  /* 天蓝色 */

/* 爱心 */
#ff69b4  /* 热粉红 */
```

## 身体部分尺寸

### 头和身体

```javascript
// 身体
cx="100" cy="130" r="60"

// 头部
cx="100" cy="80" r="45"

// 耳朵（小圆形）
cx="75" cy="45" r="10"    // 左耳
cx="125" cy="45" r="10"   // 右耳
```

### 细节（眼睛、嘴巴等）

```javascript
// 左眼
cx="82" cy="75" r="8"

// 右眼
cx="118" cy="75" r="8"

// 眼睛高光（小圆点）
cx="84" cy="73" r="3"     // 左
cx="120" cy="73" r="3"    // 右

// 腮红（椭圆）
cx="65" cy="90" rx="12" ry="14"   // 左
cx="135" cy="90" rx="12" ry="14"  // 右
```

### 表情

```javascript
// 眉毛：贝塞尔曲线
// 左眉：M (开始) Q (控制点) (结束)
d="M 75 62 Q 82 60 89 62"

// 嘴巴（默认 W 形）
d="M 95 95 Q 100 99 105 95"
```

## 动画参数

### 呼吸动画

```css
@keyframes breathe {
    0%, 100% { transform: translateY(0); }      /* 原位置 */
    50% { transform: translateY(-3px); }        /* 上升 3 像素 */
}
/* 持续时间 3 秒 */
animation: breathe 3s ease-in-out infinite;
```

修改建议：
- 调大 `translateY(-3px)` 的值让呼吸更明显
- 调小 `3s` 的值让呼吸更快

### 摇晃动画

```css
@keyframes sway {
    0%, 100% { transform: translateX(0); }      /* 中心 */
    50% { transform: translateX(-8px); }        /* 左移 8 像素 */
}
animation: sway 2s ease-in-out infinite;
```

修改建议：
- 调校 `translateX(-8px)` 改变摇晃幅度
- 调校 `2s` 改变摇晃速度

### 挥手动画

```css
@keyframes wave {
    0%, 100% { transform: rotate(0deg); }       /* 原始角度 */
    25% { transform: rotate(-20deg); }          /* 左转 20° */
    75% { transform: rotate(20deg); }           /* 右转 20° */
}
```

修改建议：
- 调大 `20deg` 让挥手幅度更大
- 添加更多的 % 关键帧使动作更自然

## 四肢位置

```javascript
// 左腿
cx="75" cy="185" r="12"

// 右腿
cx="125" cy="185" r="12"

// 左手
cx="65" cy="145" r="10"

// 右手
cx="135" cy="145" r="10"
```

## 特殊元素

### 爱心

在 `<g id="heart">` 中修改：
```javascript
d="M 0,-5 C -3,-8 -8,-8 -8,-3 C -8,2 -3,7 0,10 C 3,7 8,2 8,-3 C 8,-8 3,-8 0,-5"
fill="#ff69b4"
```

### 书

在 `<g id="book">` 中修改，调整矩形大小：
```javascript
x="-15" y="-10" width="30" height="20"
```

### ZZZ

在 `<g id="zzz">` 中修改文字大小和位置。

## 线条粗细

主要用于美观效果：
- 身体轮廓：`stroke-width="4"` （粗边框）
- 眉毛：`stroke-width="2.5"`
- 嘴巴：`stroke-width="3"`
- 眼睛弯线：`stroke-width="2"`

## 实用修改示例

### 让身体更圆润

增加身体半径：
```javascript
// 原来
<circle id="body" r="60"/>
// 改成
<circle id="body" r="70"/>
```

### 让耳朵更大

增加耳朵半径：
```javascript
// 原来
<circle id="ear-left" r="10"/>
// 改成
<circle id="ear-left" r="15"/>
```

### 让表情更明显

增加腮红透明度和大小：
```javascript
// 原来
<ellipse rx="12" ry="14" opacity="0.7"/>
// 改成
<ellipse rx="14" ry="16" opacity="0.9"/>
```

### 改变主题颜色（例如变成粉色系）

替换所有奶白色：
```javascript
// 原来
fill="#f5f5f5"  // 奶白色
// 改成
fill="#ffe6f0"  // 粉白色
```

## 调试小贴士

1. 保存 HTML 文件后，刷新应用（F5）即可看到效果
2. 在开发模式运行以实时看到变化：`npm run dev`
3. 打开开发者工具（F12）检查 SVG 元素
4. 用浏览器的 SVG 编辑器（如 Inkscape）预览修改效果

## 导出为高分辨率

如需要制作成图标或其他格式：
1. 在浏览器打开 index.html
2. 右键 > 保存为图片（PNG）
3. 或使用在线 SVG 转换工具

祝设计愉快！ 🎨
