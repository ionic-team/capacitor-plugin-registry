import { clsx } from 'clsx';
import { forwardRef } from 'react';

import styles from './index.module.scss';
import { pascalCase } from 'change-case';

const Button = forwardRef(function Button(
  { size = 'lg', kind = 'display', color = 'blue', variation = 'fill', ...props }: any,
  ref
) {
  const As = props.as ? props.as : props.href ? 'a' : 'button';

  return (
    <As
      {...props}
      ref={ref}
      className={clsx(
        props.className,
        'ds-button',
        `ds-button-${size}`,
        `ds-button-${kind}`,
        `ds-button-${color}`,
        `ds-button-${variation}`,
        styles.button,
        styles[`button${pascalCase(size)}`],
        styles[`button${pascalCase(kind)}`],
        styles[`button${pascalCase(color)}`],
        styles[`button${pascalCase(variation)}`]
      )}
    />
  );
});

export default Button;
