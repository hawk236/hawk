# 项目清单与文件说明

## 📦 项目文件结构

```
hawk/
├── README.md                    # 项目主文档
├── QUICKSTART.md               # 快速开始指南
├── WINDOWS_SETUP.md            # Windows 桌面设置指南
├── SVG_DESIGN.md               # SVG 设计自定义文档
├── API.md                      # 开发者 API 文档
├── PROJECT_MANIFEST.md         # 本文档
├── .gitignore                  # Git 忽略文件
├── package.json                # NPM 配置文件
│
└── src/
    ├── main.js                 # Electron 主进程
    ├── preload.js              # Electron 预加载脚本
    ├── index.html              # 主 HTML，包含 SVG 角色定义
    │
    ├── styles/
    │   └── pet.css             # 样式和动画定义
    │
    └── assets/
        ├── config.js           # 配置文件（可选）
        ├── pet-renderer.js     # 渲染器和动画逻辑
        └── pet-logic.js        # 宠物交互和状态管理
```

## 📄 文档说明

### README.md
**项目主文档** - 包含：
- 角色特点介绍
- 9 种支持的动画状态
- 安装和运行步骤
- 项目结构概览
- 基础自定义选项
- 许可证信息

**何时阅读**: 第一次接触项目时必读

### QUICKSTART.md
**快速开始指南** - 包含：
- 首次安装步骤
- 运行应用命令
- 常见问题解答
- 文件说明
- 自定义建议

**何时阅读**: 想快速上手时

### WINDOWS_SETUP.md
**Windows 专项设置指南** - 包含：
- 基础运行步骤
- 让宠物始终在桌面上的方法
- 开机自启配置
- 窗口自定义
- 故障排除
- 性能优化

**何时阅读**: 在 Windows 上使用时

### SVG_DESIGN.md
**设计自定义文档** - 包含：
- 颜色系统和值
- 身体部分尺寸坐标
- 动画参数解释
- 实用修改示例
- 调试小贴士

**何时阅读**: 想修改角色外观时

### API.md
**开发者 API 文档** - 包含：
- 核心类 (PetRenderer, PetLogic) 说明
- 静态方法和属性列表
- 添加新动画状态的步骤
- 添加新交互的示例
- 与外部系统的集成
- 性能优化建议
- 常见问题

**何时阅读**: 想扩展功能或修改代码时

## 🔧 文件功能说明

### 源代码文件

#### src/main.js
- Electron 主进程入口
- 创建应用窗口
- 配置窗口属性（大小、位置、透明度等）
- 处理应用生命周期事件

**修改建议**：
- 改变窗口大小：修改 width 和 height
- 改变窗口位置：添加 x 和 y
- 改变图标：修改 icon 路径

#### src/preload.js
- Electron 预加载脚本
- 为安全起见在此暴露 API
- 目前为空，可按需扩展

**修改建议**：
- 与主进程通信时使用此文件

#### src/index.html
- 主 UI 文件
- 包含完整的 SVG 角色定义
- SVG 结构：
  - 身体、头部、耳朵
  - 眼睛、眉毛、嘴巴
  - 腮红、害羞线、眼泪
  - 四肢（手、脚）
  - 附件（爱心、书、ZZZ）
  - 引入动画样式和逻辑脚本

**修改建议**：
- 改变 SVG 属性（fill、stroke 等）来修改外观
- 调整坐标改变开口位置
- 添加新的 SVG 元素

#### src/styles/pet.css
- 模块化 CSS，包含样式和动画
- 动画定义：breathe（呼吸）、blink（眨眼）等
- 容器样式和背景透明配置

**修改建议**：
- 修改 @keyframes 改变动画效果
- 调整 animation-duration 改变速度
- 添加新的动画定义

#### src/assets/config.js
- 宠物行为配置文件
- 包含窗口、行为、动画、UI 配置
- 当前为静态配置（可扩展为动态加载）

**修改建议**：
- 调整 behavior.idleTimeBeforeAction 改变空闲时间
- 调整 spontaneousActions 改变自发动作概率
- 自定义动画参数

#### src/assets/pet-renderer.js
- 视觉效果渲染器类 (PetRenderer)
- 管理所有 SVG 元素
- 提供 9 个动画状态方法
- 处理动画逻辑（眨眼、摇晃等）

**修改建议**：
- 在 animateXxx() 方法中添加新表情
- 修改 SVG 属性调用来改变动作
- 添加新的元素支持

#### src/assets/pet-logic.js
- 宠物逻辑主类 (PetLogic)
- 管理所有交互（点击、拖动、双击等）
- 状态管理和状态转换逻辑
- 自发动作系统

**修改建议**：
- 在 setupEventListeners() 中添加新交互
- 在 handleXxx() 中添加事件处理
- 修改 startIdleMode() 改变自发行为

## 🎯 快速任务指引

### 我想...

#### ...改变宠物颜色
→ 编辑 `src/index.html` 中的 SVG fill 属性

#### ...改变窗口大小
→ 编辑 `src/main.js` 的 width 和 height

#### ...添加新动画
→ 按 API.md 的"添加新的动画状态"部分步骤

#### ...改变动画速度
→ 编辑 `src/styles/pet.css` 的 animation-duration

#### ...改变交互响应
→ 编辑 `src/assets/pet-logic.js` 的处理函数

#### ...添加声音效果
→ 参考 API.md 的常见问题部分

#### ...在 Windows 开机自启
→ 按 WINDOWS_SETUP.md 的开机自启部分

## 📋 依赖清单

- **Electron**: ^27.0.0
  - 打包为桌面应用
  - 提供 Chromium + Node.js 环境

## 🚀 运行指令速查

```bash
# 安装依赖（首次运行，需要互联网）
npm install

# 运行应用
npm start

# 开发模式（带调试工具）
npm run dev
```

## 📊 状态系统

共 9 种动画状态：

1. **idle** - 闲置（默认状态）
2. **happy** - 开心
3. **shy** - 害羞
4. **cry** - 哭泣
5. **surprised** - 惊吓
6. **clicked** - 点击反应
7. **drag** - 被拖动
8. **sleep** - 睡眠
9. **study** - 学习

### 状态转换流程

```
idle (默认)
  ↓ [30秒无交互]
  ↓ [可能触发]
  ├→ happy (3秒)
  ├→ shy (2.5秒)
  ├→ cry (4秒)
  ├→ sleep (8秒)
  └→ study (5秒)
  
[用户交互]
  ├→ 单击 → surprised → clicked → idle
  ├→ 拖动 → drag → clicked → idle
  └→ 双击 → study → idle
```

## ✅ 验证清单

项目完整性检查：

- ✅ package.json 存在且执行指令正确
- ✅ src/main.js 实现 Electron 启动
- ✅ src/index.html 包含完整 SVG
- ✅ src/styles/pet.css 包含所有动画
- ✅ src/assets/pet-renderer.js 实现 9 种动画
- ✅ src/assets/pet-logic.js 实现交互系统
- ✅ 所有文档完整并准确

## 🎓 学习路径建议

**初学者**:
1. 读 README.md 了解概况
2. 按 QUICKSTART.md 运行应用
3. 单击宠物查看不同表情
4. 阅读 SVG_DESIGN.md 学习修改外观

**开发者**:
1. 精读 API.md 了解代码架构
2. 在浏览器调试工具检查代码
3. 按 API.md 的示例添加新功能
4. 参考代码注释理解实现

**设计师**:
1. 阅读 SVG_DESIGN.md 了解设计参数
2. 修改 src/index.html 的 SVG 属性
3. 使用浏览器实时预览效果
4. 参考修改示例创作新风格

## 📝 许可证

MIT License - 自由使用和修改

## 🆘 获取帮助

1. 检查对应的文档（README、QUICKSTART、WINDOWS_SETUP）
2. 阅读 API.md 的常见问题部分
3. 使用浏览器开发者工具（F12）调试
4. 运行 `npm run dev` 启用调试模式

---

**最后更新**: 2024 年 5 月 4 日
**版本**: 1.0.0
**状态**: ✅ 完整且可用

享受你的可爱桌面宠物！ 🤍
