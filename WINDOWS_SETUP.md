# Windows 桌面设置指南

本指南说明如何在 Windows 10/11 上配置此桌面宠物。

## 基础设置

### 第一步：安装应用

1. 打开命令行（Win + R，输入 `cmd`，回车）
2. 进入项目文件夹
   ```
   cd D:\path\to\hawk
   ```
3. 安装依赖（首次运行）
   ```
   npm install
   ```

### 第二步：运行应用

```
npm start
```

应用会在左上角启动。

## 进阶配置

### 让宠物始终在桌面上

#### 方法 1：使用 fences 或工具栏固定

> 注意：Electron 窗口默认已设置 `alwaysOnTop`，应该已经在最前面。

#### 方法 2：创建快捷方式（推荐）

1. **创建批处理文件** `start-pet.bat`

```batch
@echo off
cd /d D:\path\to\hawk
npm start
```

2. **创建快捷方式**
   - 右键空白处 → 新建 → 快捷方式
   - 位置输入：`D:\path\to\start-pet.bat`
   - 名称：`宠物`
   - 完成

3. **配置快捷方式**
   - 右键快捷方式 → 属性
   - 目标：`D:\path\to\start-pet.bat`
   - 起始位置：`D:\path\to\hawk`
   - 运行方式：最小化
   - 应用

### 让宠物开机自启

#### 方法 1：添加到启动文件夹

1. 按 `Win + R`，输入 `shell:startup`
2. 将 `start-pet.bat` 快捷方式复制到此文件夹

#### 方法 2：任务计划程序

1. 按 `Win + R`，输入 `taskschd.msc`
2. 左边 → 创建基本任务
3. 名称：`启动宠物`
4. 触发器 → 选择"登录时"
5. 操作 → 启动程序
6. 程序：`D:\path\to\start-pet.bat`
7. 确定

## 自定义窗口

### 改变窗口大小

编辑 `src/main.js`：

```javascript
mainWindow = new BrowserWindow({
    width: 300,    // ← 改这里（像素）
    height: 350,   // ← 改这里（像素）
    // ...
});
```

常用尺寸：
- 小：200 × 250
- 标准：300 × 350
- 大：400 × 450

### 改变宠物位置

在 `src/main.js` 中添加位置设置：

```javascript
mainWindow = new BrowserWindow({
    width: 300,
    height: 350,
    x: 100,        // ← X 坐标
    y: 100,        // ← Y 坐标
    // ...
});
```

获取屏幕尺寸来计算右下角位置：

```javascript
const { screen } = require('electron');
const primaryDisplay = screen.getPrimaryDisplay();
const { width, height } = primaryDisplay.workAreaSize;

mainWindow = new BrowserWindow({
    width: 300,
    height: 350,
    x: width - 300,      // 右边缘
    y: height - 350,     // 下边缘
    // ...
});
```

### 隐藏任务栏图标

已在 `skipTaskbar: true` 中设置，无需修改。

## 宠物控制

### 快捷键

- **单击**：触发随机反应
- **拖动**：移动宠物窗口
- **双击**：学习状态
- **放置不管**：自发动作

### 优雅退出

- 右键右下角系统托盘 → 关闭（如果有）
- 或直接关闭窗口

## 故障排除

### Q: 窗口看不到

**A:** 检查任务栏右下角的 Electron 图标，或：
- 按 `Alt + Tab` 查看是否在后台
- 检查是否被其他窗口覆盖
- 尝试移动鼠标到屏幕角落

### Q: 宠物不动作

**A:** 检查控制台是否有错误：
1. 关闭应用
2. 运行：`npm run dev`（显示调试信息）
3. 重新打开，查看浏览器开发者工具（F12）

### Q: 占用 CPU 过高

**A:** 检查动画配置，可能是动画频率过高：
1. 编辑 `src/styles/pet.css`
2. 增加动画时间，减少更新频率

### Q: 无法拖动窗口

**A:** 可能是 Electron 版本问题，编辑 `src/main.js`：

```javascript
// 添加这行以启用拖动
mainWindow.setMovable(true);
```

## 性能优化

### 降低 CPU 占用

1. 关闭不必要的 CSS 动画
2. 编辑 `src/styles/pet.css`，注释掉部分 @keyframes
3. 或增加动画周期使之更缓

### 节省内存

1. 关闭开发者工具（生产模式）
2. 只运行 `npm start`，不要用 `npm run dev`

## 高级自定义

### 多个宠物实例

创建多个快捷方式，每个指向不同的配置文件。

### 与其他工具集成

可以通过 IPC 与其他应用通信，例如：
- Rainmeter 小工具
- 屏幕录制软件
- 流媒体应用

### 打包成独立应用

使用 `electron-builder`：

```bash
npm install --save-dev electron-builder
npm run build
```

## 反馈与问题

如遇到问题，检查：
1. Node.js/npm 版本是否正确
2. 依赖是否正确安装
3. Electron 是否能正常启动

更新依赖：
```bash
npm update
npm install --save-dev electron@latest
```

祝使用愉快！ 🤍
