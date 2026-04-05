'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
}

export default function RevealText({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll<HTMLElement>('.reveal-word')

    gsap.set(words, {
      yPercent: 110,
      opacity: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      delay,
    })

    tl.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.04,
    })

    return () => {
      tl.kill()
    }
  }, [delay])

  const words = children.split(' ')

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="reveal-word inline-block">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
