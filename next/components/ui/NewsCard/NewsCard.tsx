import { useState, useEffect, useRef, RefObject } from 'react';
import cx from 'classnames';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import { ChevronRight, ArrowRight } from '../../assets/images';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import { VerticalCard } from '../VerticalCard/VerticalCard';
import moment from 'moment';
import {
  UploadFile,
  Tag as TypeTag,
  PageCategory,
} from '@bratislava/strapi-sdk-homepage';

export interface NewsCardProps {
  className?: string;
  readMoreText?: string;
  coverImage?: Pick<UploadFile, 'url'>;
  tag?: {
    title: string;
    pageCategory: {
      color: string;
    };
  };
  title?: string;
  excerpt?: string;
  date_added?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  link?: string;
}

export const NewsCard = ({
  className,
  coverImage,
  tag,
  title,
  excerpt,
  updated_at,
  date_added,
  readMoreText,
  slug,
}: NewsCardProps) => {
  const { Link: UILink } = useUIContext();
  const [isHover, setHover] = useState(false);
  const cardRef: RefObject<HTMLInputElement> = useRef();

  const enterListner = () => setHover(true);
  const exitListner = () => setHover(false);

  useEffect(() => {
    if (cardRef?.current) {
      cardRef?.current.addEventListener('mouseenter', enterListner);
      cardRef?.current.addEventListener('mouseleave', exitListner);
    }
    return () => {
      cardRef?.current?.removeEventListener('mouseenter', enterListner);
      cardRef?.current?.removeEventListener('mouseleave', exitListner);
    };
  }, []);

  // TODO inject these from outside instead of useTranslation - react-i18n break the next app build
  // const { t } = useTranslation('common');

  useEffect(() => {
    if (cardRef?.current) {
      cardRef?.current.addEventListener('mouseenter', enterListner);
      cardRef?.current.addEventListener('mouseleave', exitListner);
    }
    return () => {
      cardRef?.current?.removeEventListener('mouseenter', enterListner);
      cardRef?.current?.removeEventListener('mouseleave', exitListner);
    };
  }, []);

  return (
    <VerticalCard
      className={cx(className, 'min-w-[348px]')}
      imageSrc={coverImage?.url}
    >
      <UILink href={`/blog/${slug}`}>
        <div ref={cardRef} className="space-y-5">
          {tag?.title && (
            <Tag title={tag.title} color={tag.pageCategory?.color} />
          )}
          <h3 className="text-md font-semibold news-small-content">{title}</h3>
          <span className="text-xs font-medium">
            {moment(date_added || updated_at).format('DD.MM.YYYY')}
          </span>
          <p className="text-sm news-small-content">{excerpt}</p>

          {slug && (
            <Button
              className="h-6 mt-5"
              shape="none"
              variant="muted"
              icon={
                isHover ? (
                  <ArrowRight color={tag?.pageCategory?.color} />
                ) : (
                  <ChevronRight />
                )
              }
            >
              <div
                className="relative font-semibold"
                style={{
                  color: isHover ? tag?.pageCategory?.color : 'black',
                }}
              >
                {readMoreText}
                <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 border-current border-b-2" />
              </div>
            </Button>
          )}
        </div>
      </UILink>
    </VerticalCard>
  );
};

export default NewsCard;
