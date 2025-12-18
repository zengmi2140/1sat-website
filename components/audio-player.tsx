"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "[00:00]"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `[${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}]`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleMouseDown = () => setIsDragging(true)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    handleProgressClick(e)
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    document.addEventListener("mouseup", handleGlobalMouseUp)
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="border border-zinc-800 bg-zinc-950 p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-zinc-800 bg-black hover:bg-zinc-900 hover:border-orange-700 transition-colors group"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-orange-700 group-hover:text-orange-600" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 text-orange-700 group-hover:text-orange-600" fill="currentColor" />
          )}
        </button>

        {/* Current Time */}
        <span className="font-mono text-xs text-zinc-500 select-none">{formatTime(currentTime)}</span>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="flex-1 h-2 bg-zinc-800 relative cursor-pointer group"
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Progress Fill */}
          <div
            className="absolute left-0 top-0 h-full bg-orange-700 transition-all"
            style={{ width: `${progress}%` }}
          />

          {/* Hover Indicator */}
          <div className="absolute inset-0 bg-orange-900/0 group-hover:bg-orange-900/10 transition-colors" />

          {/* Draggable Handle */}
          <div
            className="absolute top-0 w-1 h-full bg-orange-500 transition-opacity opacity-0 group-hover:opacity-100"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          />
        </div>

        {/* Duration */}
        <span className="font-mono text-xs text-zinc-500 select-none">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
