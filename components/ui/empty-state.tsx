import { Button } from "@/components/ui/button"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from "framer-motion"
import AnimatedGradientBackground from "./animated-gradient-background"

interface EmptyStateProps {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
  isLoading?: boolean
}

export function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
  isLoading = false
}: EmptyStateProps) {
  return (
    <div className="relative w-full min-h-[60vh] overflow-hidden rounded-lg">
      <AnimatedGradientBackground 
        Breathing={true}
        gradientColors={[
          "#0A0A0A",
          "#2979FF",
          "#FF80AB",
          "#FF6D00",
          "#FFD600",
          "#00E676",
          "#3D5AFE"
        ]}
        containerClassName="rounded-lg"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 mb-6"
        >
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-gray-300 max-w-md">{description}</p>
          <Button
            onClick={onButtonClick}
            disabled={isLoading}
            className="bg-white text-black hover:bg-white/90"
          >
            {isLoading ? "Creating..." : buttonText}
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 