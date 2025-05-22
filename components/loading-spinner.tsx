"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-green-600 border-r-green-600 border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-green-400 border-l-green-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg font-medium text-green-600"
      >
        Loading Zuu Experimentals...
      </motion.div>
    </div>
  )
}
