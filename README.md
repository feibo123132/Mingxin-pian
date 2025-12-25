# 圣诞大转盘（明信片抽卡）

纯前端、离线可用的 React + Vite SPA。支持 LocalStorage 配置、惯性转盘、吉他拨片指针、结果/设置弹窗、音效（旋转与结果）。

## 本地开发

- `pnpm install`
- `pnpm run dev`
- 访问 `http://localhost:5173/` 或终端提示端口

## 部署到 GitHub Pages（已配置 Actions）

1. 在 GitHub 新建仓库（例如 `christmas-wheel`）
2. 推送代码：
   - `git init`
   - `git add . && git commit -m "init"`
   - `git branch -M main`
   - `git remote add origin https://github.com/<your>/christmas-wheel.git`
   - `git push -u origin main`
3. 仓库 → Settings → Pages → Source 选择 `GitHub Actions`
4. Actions 完成后访问：`https://<your>.github.io/christmas-wheel/`

说明：工作流会在构建时注入 `--base=/<repo>/`，确保静态资源与路由在 Pages 子路径下可用。

## 音效与资源

- 旋转音效：`public/audio/spin.mp3`
- 结果音效：`public/audio/card1.mp3` ~ `card5.mp3`
- 明信片插画：`src/assets/postcards/`

结果音效与旋转音效互不干扰；停止时只取消旋转音效循环，让其自然播完。

## 设置与重置

- 右上角齿轮打开设置弹窗，可编辑标题/内容，上传图片，保存到本地
- “重置为默认”恢复 5 张内置卡片与本地资源引用

## 技术栈

- React 18 + Vite + TailwindCSS
- LocalStorage 数据存储
- GitHub Actions + Pages 部署

