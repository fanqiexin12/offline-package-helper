# Python Offline Package Helper

一个用于生成 Python 离线安装脚本的工具，专为无法访问外网且禁止使用 Anaconda 的环境设计。

## 功能特点
- **符合 Python 3.9 环境**：针对 Windows x64 等平台精准下载 Wheel 文件。
- **自动化脚本**：生成有网环境下载脚本 (`download.bat`) 和离线环境安装脚本 (`install.bat`)。
- **常用库集成**：预设 pandas, numpy, matplotlib, scikit-learn 等常用数据分析库。
- **无 Conda 依赖**：纯 pip 工作流，规避商业许可与法律问题。

## 如何使用
1. 在 AI Studio 预览界面配置目标 Python 版本与平台。
2. 选择需要的库。
3. 复制生成的脚本并在对应环境执行。

## 导出与部署
你可以通过 Google AI Studio 的 **Settings > Export to GitHub** 功能将此项目同步到你的 GitHub 仓库。

---
署名：**Bruno.F**
