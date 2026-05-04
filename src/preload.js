// Preload script for Electron
const { contextBridge } = require('electron');

// 如果需要可以在这里暴露一些 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 可以在这里添加主进程的 API 调用
});
