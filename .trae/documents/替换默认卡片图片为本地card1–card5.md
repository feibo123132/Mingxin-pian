## 改动内容
- 在 `src/data/defaultCards.ts` 引入 `src/assets/postcards/card1.png` 至 `card5.png`
- 将默认配置数组中 5 项的 `image` 字段分别替换为新引入的图片变量
- 保持标题与内容为当前版本，不改动其他逻辑（LocalStorage、设置弹窗、重置默认）

## 验证
- 开发服务器热更新后，打开页面直接显示 5 张新图；断网时仍正常（本地资源）
- 设置弹窗“重置为默认”复位到这 5 张图

确认后我将立即修改并验证显示