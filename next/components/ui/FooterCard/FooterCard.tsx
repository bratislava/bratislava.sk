import cx from 'classnames'

export interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  footer?: React.ReactNode
}

export const FooterCard = ({ className, footer, children, ...rest }: IProps) => (
  <div className={cx(className, 'bg-white shadow-md rounded-lg overflow-hidden')} {...rest}>
    <div className="flex flex-col rounded-xl">
      <div className="flex flex-col bg-white">{children}</div>
      <div className="bg-category-200">{footer}</div>
    </div>
  </div>
)

export default FooterCard
