import { clsx } from 'clsx';
import { InheritableElementProps } from '@utils/typeHelpers';

interface CustomResponsiveImageProps {
  image: any;
  params1x?: any;
  params2x?: any;
}

type ResponsiveImageProps = InheritableElementProps<'img', CustomResponsiveImageProps>;

const LegacyPrismicResponsiveImage = ({ image, params1x = {}, params2x = {}, ...props }: ResponsiveImageProps) => {
  if (!image?.url) return null;

  const reversed = Boolean(image['1x']);

  const data1x = reversed ? image['1x'] : image;
  const data2x = reversed ? image : image['2x'];

  const { dimensions: dimensions1x, url: url1x, alt: alt1x } = data1x;
  const { dimensions: dimensions2x, url: url2x, alt: alt2x } = data2x || {};

  params1x = {
    q: '65',
    ...params1x,
  };
  params2x = {
    q: '35',
    ...params2x,
  };

  const params1xString = urlParamGenerator(url1x, params1x);
  const params2xString = urlParamGenerator(url2x, params2x);

  const url1xWithParams = url1x + params1xString;
  const url2xWithParams = url2x + params2xString;

  const getSrc = () => {
    return url2x ? { srcSet: `${url1xWithParams} 1x, ${url2xWithParams} 2x` } : { src: url1xWithParams };
  };

  return (
    <img
      {...props}
      loading={props.loading || 'lazy'}
      className={clsx({
        [props.className || '']: true,
        'ui-responsive-image': true,
      })}
      {...getSrc()}
      alt={alt1x || alt2x}
      width={props.width || dimensions1x.width}
      height={props.height || dimensions1x.height}
    />
  );
};

const urlParamGenerator = (url: string, params: object) => {
  if (!url) return;

  return Object.entries(params).reduce(
    (acc, cur) => {
      const regex = new RegExp(`\\?.*${cur[0]}=`);

      if (!url.match(regex)) {
        return `${acc}${acc.match(/^\?$/) ? '' : '&'}${cur.join('=')}`;
      }
      return acc;
    },
    url.match(/\?/) ? '' : '?'
  );
};

export default LegacyPrismicResponsiveImage;
