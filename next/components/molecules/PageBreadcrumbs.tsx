import { useUIContext } from '@bratislava/common-frontend-ui-context';
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage';
import cx from 'classnames';
import * as React from 'react';
import { pagePath } from '../../utils/page';

interface Props {
  page: GeneralPageFragment;
}

const PageBreadcrumbs = ({ page }: Props) => {
  const { Link: UILink } = useUIContext();
  const crumbs: { title: string; url: string | null }[] = [];

  const parent = page.parentPage;

  if (parent) {
    crumbs.push({
      title: parent.title ?? '',
      url: pagePath(parent),
    });
  } else if (page.pageCategory) {
    crumbs.push({ title: page.pageCategory.title ?? '', url: null });
  }

  crumbs.push({ title: page.title ?? '', url: null });
  return (
    <React.Fragment>
      {crumbs.map((crumb, i) => {
        const last = i === crumbs.length - 1;

        return (
          <React.Fragment key={i}>
            {crumb.url ? (
              <UILink href={crumb.url} className="hover:underline">
                {crumb.title}
              </UILink>
            ) : (
              <span className={cx({ 'font-bold': last })}>{crumb.title}</span>
            )}
            {!last && <span className="px-2">&gt;</span>}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default PageBreadcrumbs;
