"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  title: string
}

export function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose} className="video-modal">
          <DialogContent className="dialog-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <YouTubeEmbed videoId={videoId} title={title} />
              <button onClick={onClose} className="close-button">
                <X size={24} />
              </button>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

