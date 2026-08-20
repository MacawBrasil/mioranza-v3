/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
'use client'
import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'
import type { SwiperProps, SwiperSlideProps } from 'swiper/react'

export function Swiper(props: SwiperProps) {
  const swiperRef = useRef<HTMLElement | null>(null)
  const { children, ...rest } = props

  useEffect(() => {
    // Register Swiper web component
    register()

    // pass component props to parameters
    const params = {
      ...rest,
    }

    // Assign it to swiper element
    Object.assign(swiperRef.current!, params)

    // initialize swiper
    ;(swiperRef.current! as any).initialize()
  }, [])

  return (
    <swiper-container init={false} ref={swiperRef}>
      {children}
    </swiper-container>
  )
}
export function SwiperSlide(props: SwiperSlideProps & { children?: React.ReactNode }) {
  const { children, ...rest } = props
  //@ts-ignore
  return <swiper-slide {...rest}>{children}</swiper-slide>
}
