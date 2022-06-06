import { TImageCarouselItem } from '@bratislava/ui-bratislava';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
import React from 'react';

interface IProps extends TImageCarouselItem {
  className?: string;
  description?: React.ReactNode;
}

const CardGradient = ({
  title,
  url,
  mainImage,
  className,
  description,
}: IProps) => {
  const { Link: UILink } = useUIContext();

  return (
    <UILink href={url}>
      <div
        className={cx(
          'relative group inline-block h-60 w-70 lg:h-74 lg:w-87 pt-2 cursor-pointer transition-all transform lg:hover:-translate-y-2 lg:hover:drop-shadow-lg rounded-lg',
          className
        )}
      >
        <img
          src={mainImage.src}
          className="w-full h-full rounded-lg object-cover"
          alt={title}
        />
        {title && (
          // Gradient
          <div className="absolute bottom-0 w-full h-44 bg-gradient-to-t from-[#000] flex items-end rounded-b-lg">
            <div className="flex flex-col">
              <p className="text-white p-6 group-hover:pb-3 text-default font-semibold">
                {title}
              </p>
              <p className="hidden group-hover:block">{description}</p>
            </div>
          </div>
        )}
      </div>
    </UILink>
  );
};

export default CardGradient;
