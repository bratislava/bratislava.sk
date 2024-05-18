import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import Markdown from '@/components/formatting/Markdown/Markdown'
import { TestimonialItemBlockFragment, TestimonialsSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

// TODO split to separate component files

type TestimonialsSectionProps = {
  section: TestimonialsSectionFragment
}

const TestimonialCard = ({
  testimonial,
  hasBackground,
  className,
}: {
  testimonial: TestimonialItemBlockFragment
  hasBackground?: boolean
  className?: string
}) => {
  return (
    <div
      className={twMerge(
        'relative rounded-lg bg-white p-4',
        hasBackground ? 'bg-white' : 'bg-category-100',
        className,
      )}
    >
      {/* TODO validate if this html syntax is ok */}
      <blockquote className="flex flex-col gap-4">
        <Typography type="p">{testimonial.quote}</Typography>
        <footer>
          {/* TODO there probably should not be p inside cite, but cite should be used directly */}
          <cite>
            <Typography type="p" fontWeight="semibold">
              {testimonial.name}
            </Typography>
          </cite>
        </footer>
      </blockquote>
    </div>
  )
}

const Testimonials = ({ section }: TestimonialsSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
      <div className={cx('col-span-1 flex flex-col gap-3', 'md:col-span-5')}>
        {section.title ? <Typography type="h2">{section.title}</Typography> : null}
        {section.text ? <Markdown content={section.text} variant="small-no-respo" /> : null}
      </div>
      <div className={cx('hidden md:block', 'col-span-1')} />
      <div className={cx('col-span-1', 'md:col-span-6')}>
        {/* TODO render as <ul> */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {section.testimonials.filter(isDefined).map((testimonial, index) => (
            <TestimonialCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx('col-span-1', 'md:col-span-2')}
              testimonial={testimonial}
              hasBackground={section.hasBackground ?? false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const TestimonialsSection = ({ section }: TestimonialsSectionProps) => {
  return <Testimonials section={section} />
}

export default TestimonialsSection
