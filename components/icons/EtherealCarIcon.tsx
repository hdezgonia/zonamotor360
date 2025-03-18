"use client"

import type React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface EtherealCarIconProps {
  className?: string
  size?: number
}

export const EtherealCarIcon: React.FC<EtherealCarIconProps> = ({ className = "", size = 24 }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 16.5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M6.5 12c0-1.5 2.5-5.5 5.5-5.5s5.5 4 5.5 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 7.5C9 6.5 10.5 3 12 3s3 3.5 3 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="7" cy="16" r="2" fill="currentColor" />
            <circle cx="17" cy="16" r="2" fill="currentColor" />
          </svg>
        </TooltipTrigger>
        <TooltipContent>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-48 p-3 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg"
          >
            <p className="text-sm font-medium">
              Olimpo: Un vehículo que trasciende lo ordinario, elevándose a alturas automotrices sin igual.
            </p>
          </motion.div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

