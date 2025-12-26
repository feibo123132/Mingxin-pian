import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Music } from 'lucide-react'
import { useAudioBus } from '../store/audioBus'

const BgmController: React.FC = () => {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState<number | null>(null)
  const base = (import.meta.env.BASE_URL || '/')
  const prefix = base.endsWith('/') ? base : base + '/'
  const audios = useMemo(() => {
    const srcs = ['bgm1.mp3', 'bgm2.mp3', 'bgm3.mp3'].map((f) => `${prefix}audio/${f}`)
    return srcs.map((s) => {
      const a = new Audio(s)
      a.preload = 'auto'
      a.loop = false
      a.volume = 0.6
      return a
    })
  }, [])

  const fadeTimerRef = useRef<number | null>(null)
  const baseVol = 0.6
  const duckVol = 0.2
  const activeCount = useAudioBus((s) => s.activeCount)

  useEffect(() => {
    if (!playing) return
    const a = current != null ? audios[current] : null
    if (!a) return
    if (activeCount > 0) {
      if (fadeTimerRef.current) {
        window.clearInterval(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
      a.volume = duckVol
    } else {
      if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current)
      const duration = 2000
      const stepMs = 50
      const steps = Math.floor(duration / stepMs)
      let i = 0
      const start = a.volume
      fadeTimerRef.current = window.setInterval(() => {
        i++
        const t = Math.min(i / steps, 1)
        a.volume = start + (baseVol - start) * t
        if (t >= 1) {
          if (fadeTimerRef.current) {
            window.clearInterval(fadeTimerRef.current)
            fadeTimerRef.current = null
          }
        }
      }, stepMs)
    }
  }, [activeCount, playing, current])

  useEffect(() => {
    audios.forEach((a) => {
      try {
        a.muted = true
        a.play().then(() => a.pause()).catch(() => {})
        a.muted = false
      } catch {}
    })
  }, [audios])

  const playIndex = (idx: number) => {
    setCurrent(idx)
    audios.forEach((x, i) => {
      if (i !== idx) {
        try { x.pause(); x.currentTime = 0 } catch {}
      }
    })
    const a = audios[idx]
    try {
      a.volume = activeCount > 0 ? duckVol : baseVol
      a.play().catch(() => {})
      a.onended = () => {
        const choices = audios.map((_, i) => i).filter((i) => i !== idx)
        const next = choices[Math.floor(Math.random() * choices.length)]
        playIndex(next)
      }
      setPlaying(true)
    } catch {}
  }

  const toggle = () => {
    if (!playing) {
      const startIdx = Math.floor(Math.random() * audios.length)
      playIndex(startIdx)
    } else {
      const a = current != null ? audios[current] : null
      if (a) {
        try { a.pause() } catch {}
      }
      setPlaying(false)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`absolute top-0 right-10 p-2 rounded-full shadow ${playing ? 'bg-[#FFD748]' : 'bg-gray-200'}`}
      aria-label="音乐控制"
      title={playing ? '暂停背景音乐' : '播放背景音乐'}
      style={playing ? { animation: 'spin 3s linear infinite' } : undefined}
    >
      <Music className={`w-6 h-6 ${playing ? 'text-white' : 'text-gray-700'}`} />
    </button>
  )
}

export default BgmController

