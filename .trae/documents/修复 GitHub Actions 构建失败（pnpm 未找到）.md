## 问题
- 工作流在 `actions/setup-node@v4` 步骤报错：Unable to locate executable file: pnpm。
- 原因：在 setup-node 使用了 `cache: 'pnpm'`，该 Action会尝试调用 `pnpm` 获取缓存路径，但此时 pnpm 尚未安装（安装在后续步骤）。

## 解决
- 移除两个工作流中 `setup-node` 的 `cache: 'pnpm'`，改为由 `pnpm/action-setup@v3`负责安装 pnpm；再进行安装与构建。
- 保持 pages 构建命令注入 `--base=/${REPO_NAME}/`。

## 将进行的改动
- 更新 `.github/workflows/ci.yml`：删除 `cache` 字段，不再触发 pnpm 早期调用。
- 更新 `.github/workflows/pages.yml`：同样删除 `cache` 字段。

## 你需要做的
- 推送更新到 `main`，在 Actions 页面点击 Re-run all jobs 或等待新 push 触发。
- 确认 Pages 设置 Source 为 GitHub Actions。

## 预期结果
- CI 与 Pages 工作流成功运行；自动部署到 `https://<你的账号>.github.io/<repo>/`。