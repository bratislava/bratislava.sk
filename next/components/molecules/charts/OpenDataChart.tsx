import { ErrorBox, LoadingSpinner } from '@bratislava/ui-bratislava';
import cx from 'classnames';
import merge from 'lodash/merge';
import dynamic from 'next/dynamic';
import * as React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HEIGHT = 380;
const DESCRIPTION_OFFSET = 6;

export interface ISeries {
  data: [number, number][];
  name: string;
}

interface IProps {
  className?: string;
  children?: React.ReactNode;
  series: ISeries[];
  colors?: string[];
  options?: ApexCharts.ApexOptions;
  title: string;
  label: string;
  description: string;
  subdescription: string;
  loading?: boolean;
  error?: any;
  xMin: number;
  xMax: number;
  xAxisFormatter: (value: string) => string;
}

const OpenDataChart = ({
  className,
  children,
  series,
  colors,
  options: iOptions,
  title,
  label,
  description,
  subdescription,
  loading,
  error,
  xMin,
  xMax,
  xAxisFormatter,
}: IProps) => {
  const [zoomedDomain, setZoomedDomain] = React.useState<[number, number]>([
    xMin,
    xMax,
  ]);
  const xDomain = zoomedDomain;
  const domainWidth = xDomain[1] - xDomain[0];

  const baseOptions: ApexCharts.ApexOptions = {
    colors,
    chart: {
      toolbar: {
        show: false,
      },
      events: {
        zoomed: (_ctx: any, zoom: { xaxis: { min: number; max: number } }) => {
          setZoomedDomain([zoom.xaxis.min, zoom.xaxis.max]);
        },
      },
    },
    markers: {
      size: 5,
    },
    xaxis: {
      min: xDomain[0],
      max: xDomain[1],
      type: 'category',
      labels: {
        formatter: xAxisFormatter,
      },
      tickAmount: domainWidth,
    },
    title: {
      text: description,
      style: { fontSize: '18px' },
      offsetX: DESCRIPTION_OFFSET,
    },
    subtitle: {
      text: subdescription,
      style: { fontSize: '12px', color: '#A9A9A9' },
      offsetX: DESCRIPTION_OFFSET,
    },
  };

  const options: ApexCharts.ApexOptions = merge(baseOptions, iOptions);

  const isNotSSR = typeof window !== 'undefined';

  return (
    <div className={cx(className, 'text-font')}>
      <h2 className="mt-8 mb-3 text-md leading-[40px] font-bold text-center">
        {title}
      </h2>

      <ErrorBox error={error} />

      <div className="relative">
        {loading && (
          <LoadingSpinner size="small" className="absolute top-1/2 left-1/2" />
        )}

        <div
          className={cx('py-5 px-8 shadow-lg rounded-2xl', {
            'opacity-25': loading,
          })}
        >
          {children}

          <h3 className="py-4 text-md leading-[40px] font-bold text-center">
            {label}
          </h3>

          {isNotSSR && (
            <Chart
              options={options}
              series={series}
              type="line"
              height={HEIGHT}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenDataChart;
