// cn helper function inspired by https://ui.shadcn.com/docs/installation/manual
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Keep in sync with utility classes in globals.css
      'font-size': [
        'text-size-button-large',
        'text-size-button-default',
        'text-size-p-large',
        'text-size-p-large-r',
        'text-size-p-default',
        'text-size-p-default-r',
        'text-size-p-small',
        'text-size-p-tiny',
        'text-size-h6',
        'text-size-h6-r',
        'text-size-h5',
        'text-size-h5-r',
        'text-size-h4',
        'text-size-h4-r',
        'text-size-h3',
        'text-size-h3-r',
        'text-size-h2',
        'text-size-h2-r',
        'text-size-h1',
        'text-size-h1-r',
        'text-size-h1-hero',
        'text-size-h1-hero-r',
      ],
    },
  },
})

function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export default cn
