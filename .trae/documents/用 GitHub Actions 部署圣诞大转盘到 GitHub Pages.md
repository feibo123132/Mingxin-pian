## 我将为你做的改动
1) 新增工作流
- `.github/workflows/ci.yml`：每次 push/PR 进行安装与构建校验
- `.github/workflows/pages.yml`：自动构建并发布到 GitHub Pages（main 分支变更触发）
2) Pages 构建基路径
- 构建时传入 `--base=/<repo>/`，不改动本地开发
3) 音频路径适配 Pages
- 将代码中对 `public/audio` 的引用改为 `${import.meta.env.BASE_URL}audio/...`，确保在 Pages 子路径下正常播放
4) 文档
- 在 README 中写明“首推到 GitHub 后自动部署、访问地址格式”

## 你的操作步骤
1) 创建仓库
- 在 GitHub 新建空仓库（例如：`christmas-wheel`）
2) 推送本地代码
- 在项目根执行：
  - `git init`
  - `git add . && git commit -m "init: christmas wheel"`
  - `git branch -M main`
  - `git remote add origin https://github.com/<你的账号>/christmas-wheel.git`
  - `git push -u origin main`
3) 打开 Pages
- 仓库 → Settings → Pages → Build and deployment → Source 选 `GitHub Actions`
- 等待工作流完成后，访问：`https://<你的账号>.github.io/christmas-wheel/`
4) 资源准备
- 确认 `public/audio/` 下存在：`spin.mp3`、`card1.mp3`~`card5.mp3`

## 验证
- 推送后 Actions 自动运行并发布；转盘、图片、音频在 Pages 环境正常工作（子路径基座下不 404）

如果你确认，我将立即添加上述两个工作流文件、调整音频引用为 `import.meta.env.BASE_URL` 并补充 README。