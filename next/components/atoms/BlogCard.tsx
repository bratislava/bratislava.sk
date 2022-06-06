import { Card } from '@bratislava/ui-bratislava';
import cx from 'classnames';
import NextLink from 'next/link';
import Image1 from '../assets/images/blog-image.png';
import Image2 from '../assets/images/blog-mobile-image.png';
import { ReactComponent as ChevronRight } from '../assets/images/chevron-right.svg';
import Image from 'next/image';

export interface BlogCardProps {
  className?: string;
  image?: string | StaticImageData;
  mobileImage?: string | StaticImageData;
  content?: React.ReactNode;
  href?: string;
}

export const BlogCard = ({
  className,
  image = Image1,
  mobileImage = Image2,
  content = 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
  href = '/',
}: BlogCardProps) => (
  <NextLink href={href} passHref>
    <div
      className={cx(
        className,
        'inline-flex flex-col 2xl:pr-8 xl:pr-5 cursor-pointer bg-white py-5'
      )}
    >
      <Card
        className={cx(
          className,
          'rounded-b-lg xl:rounded-l-none xl:rounded-r-lg xl:inline-flex xl:flex-row xl:items-center'
        )}
        buttonContent={<ChevronRight />}
        buttonPosition="mx-auto left-0 right-0 xl:hidden"
        buttonVariant="circle"
      >
        <div className="inline-flex xl:hidden">
          {image && (
            <Image src={mobileImage} alt="blog" width="280" height="190" />
          )}
        </div>
        <div className="hidden xl:inline-flex">
          {image && <Image src={image} alt="blog" width="225" height="200" />}
        </div>

        <div className="flex mx-6 items-center w-52 xl:w-66 xl:px-12 text-center xl:text-left justify-center h-48">
          <span className="text-default font-medium">{content}</span>
        </div>
      </Card>
    </div>
  </NextLink>
);

export default BlogCard;
