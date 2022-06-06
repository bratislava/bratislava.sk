import cx from 'classnames';

export interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  footer?: React.ReactNode;
}

export const FooterCard = ({
  className,
  footer,
  children,
  ...rest
}: IProps) => (
  <div
    className={cx(
      className,
      'bg-input-nav-bg shadow-md rounded-lg overflow-hidden'
    )}
    {...rest}
  >
    <div className="flex flex-col rounded-xl">
      <div className="bg-input-nav-bg flex flex-col">{children}</div>
      <div className="bg-secondary">{footer}</div>
    </div>
  </div>
);

export default FooterCard;
