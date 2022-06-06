import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
export interface IframeProps {
  iframe_url?: string;
  iframe_width?: number;
  iframe_height?: number;
  iframe_frameBorder?: string;
  iframe_scrolling?: string;
  iframe_allowfullscreen?: boolean;
  iframe_style?: string;
}
export const Iframe = ({
  iframe_url,
  iframe_width,
  iframe_height,
  iframe_frameBorder,
  iframe_scrolling,
  iframe_allowfullscreen,
  iframe_style,
}: IframeProps) => {
  // console.log("test12",JSON.parse(`{${iframe_style}}`));
  return (
    <iframe
      src={iframe_url}
      width={iframe_width}
      height={iframe_height}
      frameBorder={iframe_frameBorder}
      scrolling={iframe_scrolling}
      allowFullScreen={iframe_allowfullscreen}
      style={JSON.parse(`{${iframe_style}}`)}
    ></iframe>
  );
};
export default Iframe;
