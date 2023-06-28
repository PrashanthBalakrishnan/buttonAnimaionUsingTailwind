import { useAnimate, animate } from 'framer-motion'
import { stagger } from 'framer-motion/dom'

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type AnimationSequence = Parameters<typeof animate>[0]

const ButtonOne = ({ text, stars }: { text: string; stars: number }) => {
  const textArr = text.split('')

  console.log(textArr)
  const [scope, animate] = useAnimate()
  const button = () => {
    const sparkles = Array.from({ length: stars })
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.1, 1.3),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: '<',
      },
    ])

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      { duration: 0.5, at: '<' },
    ])

    const sparklesRest: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      { x: 0, y: 0 },
      {
        duration: 0.00001,
      },
    ])

    animate([
      ...sparklesRest,
      ['.letter', { y: -32 }, { duration: 0.2, delay: stagger(0.03) }],
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      ['.letter', { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ])
  }
  return (
    <div ref={scope}>
      <button
        onClick={button}
        className="rounded-full border-2 border-blue-600 px-6 py-2 text-blue-600 transition-colors hover:bg-blue-100 relative"
      >
        <span className="sr-only">{text}</span>
        <span
          className="h-8 flex items-center justify-center overflow-hidden text-2xl"
          aria-hidden
        >
          {textArr.map((letter, index) => (
            <span
              data-letter={letter}
              className="letter inline-block leading-8 relative h-8 after:h-8 after:absolute after:left-0 after:top-full after:content-[attr(data-letter)]"
              key={`${letter}-${index}`}
            >
              {letter === ' ' ? <span>&nbsp;</span> : letter}
            </span>
          ))}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block  pointer-events-none -z-10"
        >
          {Array.from({ length: stars }).map((_, index) => (
            <svg
              className={`absolute left-1/2 top-1/2 sparkle-${index} opacity-0`}
              key={index}
              viewBox="0 0 122 117"
              width="10"
              height="10"
            >
              <path
                className="fill-blue-600"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>
      </button>
    </div>
  )
}
export default ButtonOne
