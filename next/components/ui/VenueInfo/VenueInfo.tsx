import cx from 'classnames';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowRightShort } from '../../assets/images/arrow-right-short.svg';
import { ReactComponent as ArrowRightLong } from '../../assets/images/arrow-right.svg';

export interface VenueInfoProps {
  className?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  buttonTitle: string;
  linkTitle: string;
}

export const VenueInfo = ({
  className,
  title,
  description,
  buttonTitle,
  linkTitle,
}: VenueInfoProps) => (
  <div
    className={cx(
      className,
      'flex flex-col gap-y-3 md:gap-y-4 w-full max-w-87'
    )}
  >
    <h1 className="font-medium text-md md:text-lg">{title}</h1>
    <p className="font-normal text-base">{description}</p>
    <Button className="md:mt-4 w-40 h-10 md:h-12">
      <span className="font-medium text-base md:text-default">
        {buttonTitle}
      </span>
    </Button>
    <Button
      className="w-36 font-medium text-primary text-base md:text-default"
      icon={<ArrowRightShort />}
      hoverIcon={<ArrowRightLong />}
      shape="none"
    >
      {linkTitle}
    </Button>
  </div>
);

export default VenueInfo;
