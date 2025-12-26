## 要点
- SW 报错因尝试缓存 206 部分响应与非基本请求；仅缓存图片/音频，且只在 `status===200 && type==='basic'` 时写入缓存
- GO 按钮图片未显示因扩展名不一致与失败时显示 alt 文本

## 修改
1) 更新 `public/sw.js`
- 删除对 `/assets/` 的缓存逻辑
- 仅处理图片与音频
- `fetch` 后：
  - 判断 `res.status===200 && res.type==='basic'` 再 `cache.put`
  - `try/catch` 包裹 `cache.put` 以防 206/跨源失败
2) 更新 `src/components/Wheel.tsx`
- 将按钮图片改为 `images/go-btn.png`
- 设置 `alt=""`，避免加载失败显示文字

## 验证
- 强制刷新或注销 SW 后再加载，控制台无缓存报错；GO 按钮显示圆形猫咪图案且有金色边框与悬停放大效果。