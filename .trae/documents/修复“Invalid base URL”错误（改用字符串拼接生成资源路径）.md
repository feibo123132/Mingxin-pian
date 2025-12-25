## 问题
- 浏览器报错：Failed to construct 'URL': Invalid base URL。
- 原因：`new URL('audio/xxx', import.meta.env.BASE_URL)` 需要绝对基址；当 `base='./'` 或 `'/repo/'`（非完整 URL）时会抛错。

## 解决
- 不再用 `new URL(..., import.meta.env.BASE_URL)`，改为字符串拼接：
  - `const base = import.meta.env.BASE_URL || '/'`
  - `const prefix = base.endsWith('/') ? base : base + '/'`
  - 旋转音效：`new Audio(`${prefix}audio/spin.mp3`)`
  - 结果音效：去除前导 `/` 后拼接：`const p = (c.sound ?? `audio/card${i+1}.mp3`).replace(/^\/?/, '')`; `new Audio(`${prefix}${p}`)`

## 兼容性
- Dev：`BASE_URL='/'` → `/audio/*`
- Pages：`BASE_URL='./'` → `./audio/*`
- 任意子路径均适配，无需绝对 URL。

## 变更文件
- `src/components/Wheel.tsx`：替换两处资源路径构造。

## 验证
- 重新构建后页面不再报错；控制台无 `Invalid base URL`；音频正常播放。