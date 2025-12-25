## 原因定位
- 构建后的 index.html 资源路径未带仓库子路径，导致在 `https://<user>.github.io/<repo>/` 下请求 `/assets/...` 与 `/favicon.svg` 返回 404。
- `index.html` 中使用了以 `/` 开头的绝对路径；Vite 未强制写入 base 时，在 Pages 子路径环境会白屏。

## 修改方案
1) Vite 基路径
- 在 `vite.config.ts` 设置 `base: process.env.BASE_PATH ?? '/'`。
- 在 Pages 工作流 `pages.yml` 的构建步骤，注入 `BASE_PATH=/${{ github.event.repository.name }}/`，并直接 `pnpm run build`（不再传 `--base=...`）。

2) favicon 引用
- 将 `index.html` 的 `<link rel="icon" href="/favicon.svg">` 改为相对路径 `href="favicon.svg"`，避免绝对根路径。

## 验证
- 重新触发 Actions 后，访问 `https://<user>.github.io/<repo>/` 页面加载正常；控制台不再有 404；音频与图片资源均能加载。

若你确认，我将立即按此方案修改配置与工作流。