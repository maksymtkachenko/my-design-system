import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { assets } from '@mds/icons';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-mono';
  size?: 'large' | 'small';
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/** Import @mds/react/styles.css once in your application. */
export function Button({ label, variant = 'primary', size = 'large', loading = false,
  leadingIcon, trailingIcon, disabled, className = '', type = 'button', ...props }: ButtonProps) {
  const tone = variant === 'primary' ? 'inverse' : variant === 'tertiary' ? 'primary' : 'mono';
  const spinner = assets[`spinner-web-${size === 'large' ? 'm' : 's'}-${tone}`];
  return (
    <button {...props} type={type} className={`mds-button ${className}`}
      data-variant={variant} data-size={size} data-loading={loading}
      disabled={disabled || loading} aria-busy={loading || undefined} aria-label={props['aria-label'] ?? label}>
      <span className="mds-button__content">
        {loading ? <img className="mds-button__spinner" alt="" aria-hidden="true"
          width={size === 'large' ? 24 : 16} height={size === 'large' ? 24 : 16}
          src={`data:image/svg+xml,${encodeURIComponent(spinner)}`} /> : <>
          {leadingIcon && <span className="mds-button__icon" aria-hidden="true">{leadingIcon}</span>}
          <span className="mds-button__label">{label}</span>
          {trailingIcon && <span className="mds-button__icon" aria-hidden="true">{trailingIcon}</span>}
        </>}
      </span>
    </button>
  );
}
