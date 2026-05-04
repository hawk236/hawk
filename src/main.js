const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let dragStartX = 0;
let dragStartY = 0;
let windowStartX = 0;
let windowStartY = 0;

function createWindow() {
  // 获取屏幕信息（可选：让窗口显示在指定位置）
  // const { screen } = require('electron');
  // const primaryDisplay = screen.getPrimaryDisplay();
  // const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 300,
    height: 350,
    // x: width - 320,      // 屏幕右边缘（可选）
    // y: height - 370,     // 屏幕下边缘（可选）
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      contextIsolation: false,
      nodeIntegration: true,
    },
    transparent: true,           // 透明背景
    frame: false,                // 无标题栏
    alwaysOnTop: true,           // 始终最前
    skipTaskbar: true,           // 隐藏任务栏
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  // 处理拖动事件
  ipcMain.on('start-drag', (event, { x, y }) => {
    dragStartX = x;
    dragStartY = y;
    const bounds = mainWindow.getBounds();
    windowStartX = bounds.x;
    windowStartY = bounds.y;
  });

  ipcMain.on('move-drag', (event, { x, y }) => {
    const deltaX = x - dragStartX;
    const deltaY = y - dragStartY;
    mainWindow.setPosition(windowStartX + deltaX, windowStartY + deltaY);
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools in development mode if --dev flag is passed
  if (process.argv.includes('--dev') || process.argv.includes('--remote-debugging-port=9222')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
