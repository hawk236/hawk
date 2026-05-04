# 快速开始指南

## 首次安装

1. 进入项目目录
```bash
cd /workspaces/hawk
```

2. 安装依赖
```bash
npm install
```

这会自动下载 Electron 和其他依赖（可能需要几分钟）

## 运行应用

### 生产模式（普通运行）
```bash
npm start
```

### 开发模式（带开发者工具）
```bash
npm run dev
```

## 常见问题

### Q: 窗口看不到怎么办？
A: 窗口默认设置为"始终在最前"，可能被其他窗口覆盖。试试：
- 检查任务栏中是否有 Electron 进程
- 右键任务栏图标，选择最大化或还原

### Q: 如何修改宠物的样子？
A: 编辑 `src/index.html` 中的 SVG 代码：
- 修改 fill 属性改变颜色
- 修改 r 属性改变大小
- 修改 cx/cy 属性改变位置

### Q: 如何修改窗口大小？
A: 编辑 `src/main.js` 中的 createWindow 函数：
```javascript
width: 300,  // 改这里
height: 350, // 改这里
```

### Q: 能否打成桌面快捷方式？
A: 使用 electron-builder：
```bash
npm install --save-dev electron-builder
```
然后修改 package.json 和配置文件。

## 文件说明

- `src/main.js` - 应用主进程，窗口管理
- `src/index.html` - SVG 角色定义
- `src/assets/pet-renderer.js` - 动画和视觉效果
- `src/assets/pet-logic.js` - 交互和状态管理
- `src/styles/pet.css` - 动画样式定义
- `src/preload.js` - Electron 安全脚本

## 自定义建议

1. **改变动画性格**：修改 `src/assets/pet-logic.js` 中的状态转换逻辑
2. **调整动画速度**：修改 `src/styles/pet.css` 中的 animation-duration
3. **改变表情样子**：修改 `src/assets/pet-renderer.js` 中的 SVG 属性更新
4. **修改交互**：在 `src/assets/pet-logic.js` 中的事件监听器中添加新功能

祝你使用愉快！ 🤍
