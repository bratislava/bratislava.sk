import Image from 'next/image'
import { ComponentProps } from 'react'

import { UploadFile } from '@/services/graphql'

// copied from MKB project https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/MImage.tsx

export type StrapiUploadImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: StrapiUploadImage
  alt?: string
  disableBlurPlaceholder?: boolean
}

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const StrapiImage = ({ image, alt, ...rest }: MImageProps) => (
  <Image
    src={image.url}
    alt={alt ?? image.alternativeText ?? ''}
    // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
    width={rest.fill ? undefined : image.width ?? undefined}
    height={rest.fill ? undefined : image.height ?? undefined}
    {...rest}
  />
)

export default StrapiImage
