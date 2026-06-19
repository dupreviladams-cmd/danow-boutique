import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}
export function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage
}: HeroProps) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl my-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }} />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/60 to-transparent" />

      <div className="relative h-full container mx-auto px-8 flex flex-col justify-center max-w-4xl">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          
          {title}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          
          {subtitle}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.4
          }}>
          
          <Link to={ctaLink}>
            <Button size="lg" className="group">
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>);

}