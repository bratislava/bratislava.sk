import { Button, HorizontalScrollWrapper } from '@bratislava/ui-bratislava';
import { ChevronRight } from '@bratislava/ui-bratislava/assets/images';
import React from 'react';
import cx from 'classnames';

interface IVideo {
  title?: string;
  speaker?: string;
  url?: string;
  size?: 'default' | 'small';
}

export interface VideosProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  videos?: IVideo[];
}

const Video = ({ title, speaker, url, size = 'default' }: IVideo) => {
  const [embedUrl, setEmbedUrl] = React.useState('');
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const parseYoutubeUrl = async () => {
      const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
      const res = await fetch(oembedUrl);
      const { html }: { html: string } = await res.json();

      const substrStart = html.indexOf('src="') + 5;
      const substrEnd = html.indexOf('oembed') + 6;
      const embedUrl = html.substring(substrStart, substrEnd);

      setEmbedUrl(embedUrl);
    };

    parseYoutubeUrl();
  }, [url]);

  return (
    <div className="w-70 xl:w-87">
      <iframe
        className={cx('rounded-5 shadow-xs', {
          'animate-pulse bg-gray-300': !isLoaded,
        })}
        title={title}
        width={size === 'default' ? '350' : '280'}
        height={size === 'default' ? '196' : '157'}
        src={embedUrl}
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      <a href={url} target="_blank" rel="noreferrer">
        <h5 className="font-semibold md:text-default mt-8 cursor-pointer hover:underline">
          {title}
        </h5>
      </a>
      <p className="mt-5">{speaker}</p>
    </div>
  );
};

export const Videos = ({
  id,
  className,
  title,
  subtitle,
  videos,
}: VideosProps) => {
  const [videosCount, setVideosCount] = React.useState(3);

  return (
    <div key={id} className={className}>
      <h4 className="font-semibold text-default md:text-md">{title}</h4>
      <p className="mt-5 mb-10 md:text-default">{subtitle}</p>

      {/* Mobile */}
      <HorizontalScrollWrapper className="lg:hidden flex gap-x-5">
        {videos.map((video) => (
          <Video key={video.url} size="small" {...video} />
        ))}
      </HorizontalScrollWrapper>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-7.5">
        {videos.slice(0, videosCount).map((video) => (
          <Video key={video.url} {...video} />
        ))}
      </div>
      {/* {videosCount <= videos.length && (
        <div className="hidden lg:flex mt-14 justify-center">
          <Button
            className="text-default py-[13px] px-6 font-medium"
            icon={<ChevronRight />}
            onClick={() => setVideosCount((prev) => prev + 3)}
          >
            {buttonContent}
          </Button>
        </div>
      )} */}
    </div>
  );
};
