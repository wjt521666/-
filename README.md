# 王江涛个人作品集

React + Vite 制作的个人作品集首版，包含全屏 Hero、个人经历、八个精选项目模块、个人优势、软件技能栏和整屏联系方式收尾页。

## 本地运行

当前机器没有全局 npm，已在 `tools/npm` 中放了本地 npm CLI。可以用下面的命令启动：

```powershell
$env:PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
& 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools\npm\package\bin\npm-cli.js run dev -- --port 5173
```

如果你的环境有 npm，也可以直接运行：

```powershell
npm install
npm run dev
```

## 资产

作品图已复制到 `public/assets/projects`，Hero 视频背景为 `public/assets/video/hero-reel.mp4`，由现有作品图生成。后续可直接替换同名文件或在 `src/main.jsx` 中调整项目模块。
