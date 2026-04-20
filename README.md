# Python Offline Package Helper

一个用于生成 Python 离线安装脚本的 Web 工具。专为禁止使用 Anaconda、无法连接外网的 Windows 生产环境设计，通过纯 `pip` 工作流解决数据科学库（如 Pandas）的跨机器部署。

---

## 🛠️ 本地安装引导 (针对 Git 用户)

如果你通过 `git clone` 获取了本项目，请按照以下步骤在本地运行该 Web 界面：

### 1. 环境准备
确保你的电脑已安装 [Node.js](https://nodejs.org/) (建议版本 v18.0.0+)。

### 2. 安装与启动
在项目根目录下打开终端，依次执行：

```bash
# 1. 安装项目所需的所有前端依赖
npm install

# 2. 启动本地开发服务器
npm run dev
```

### 3. 访问界面
启动后，终端会显示本地地址（通常是 `http://localhost:3000`）。在浏览器打开该地址，你将看到 **Python Offline Helper** 的 UI 操作界面。

---

## 📖 核心使用流程 (Workflow)

运行界面后，请按照以下三个阶段完成离线安装：

### 第一阶段：有网电脑 (生成 Wheel 资源)
1. **配置环境**：在界面左侧选择目标 Python 版本（如 `3.9`）和平台（如 `win_amd64`）。
2. **选择库包**：勾选 `pandas`, `openpyxl` 等需要的库。
3. **下载脚本**：复制界面生成的 **"Online: Fetch Wheel Binaries"** 代码，保存为 `download.bat`。
4. **执行**：在有网电脑运行 `download.bat`，它会创建一个 `python_packages` 文件夹并下载所有依赖。

### 第二阶段：物理转移
1. 将 `python_packages` 文件夹和界面生成的 **"Offline: Air-Gapped Install"** 脚本（保存为 `install.bat`）存入 U 盘。

### 第三阶段：离线电脑 (一键安装)
1. 在离线电脑插入 U 盘，双击运行 `install.bat`。
2. 脚本会自动调用本地 `pip` 并在本地文件夹中搜寻依赖完成安装，**不需要联网**。

---

## ⚠️ 常见问题排查 (Troubleshooting)

- **版本不匹配**：如果安装时提示 `Could not find a version`，请检查离线电脑 `python --version` 是否确为 3.9。
- **乱码问题**：若 `.bat` 运行乱码，请在保存脚本时选择 **ANSI** 编码，或在脚本首行加入 `chcp 65001`。
- **路径错误**：必须保证 `install.bat` 与 `python_packages` 文件夹处于同一个目录下。

---

## 🚀 极速预览 (无需 Git)
如果你不想在本地安装 Node.js，可以直接使用我的云端共享版本：
[**在线预览：点击即用**](https://ais-pre-3u3mq5vesqvzfjkjjjmhzw-512945237866.europe-west2.run.app)

---
署名：**Bruno.F**
