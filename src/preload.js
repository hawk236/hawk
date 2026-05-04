// Preload script for Electron
const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    startDrag: (x, y) => ipcRenderer.send('start-drag', { x, y }),
    moveDrag: (x, y) => ipcRenderer.send('move-drag', { x, y }),
});
