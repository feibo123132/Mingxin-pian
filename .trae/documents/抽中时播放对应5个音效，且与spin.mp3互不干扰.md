## 目标
- 抽到某张卡时，立刻播放对应的结果音频；同时保留 `spin.mp3` 自然播完，互不干扰。

## 实施步骤
1) 预加载结果音频
- 在 `src/components/Wheel.tsx` 创建 `selectionAudiosRef: HTMLAudioElement[]`，来源为 `cards.map(c => new Audio(c.sound))`，`preload='auto'`，`loop=false`。

2) 首次点击 GO 的解锁处理（移动端）
- 在 `spin()` 的开头，若未解锁，依次对 5 个音频执行：`a.muted=true; a.play(); a.pause(); a.muted=false;`，标记已解锁。

3) 停止时播放对应音频
- 已有 `transitionend` 停止监听；在其回调中根据 `selectedIndex` 执行 `selectionAudiosRef.current[idx].currentTime=0; ...play()`；同时仅将 `spinAudio.loop=false`。

4) 清理
- 可选：在 `selectionAudiosRef.current[idx].onended` 中做轻量清理（取消回调即可）。

## 验证
- GO 后转动声正常；停止瞬间弹窗出现且相应结果音频立刻播放；两路音频并行且互不打断。