import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  label: string;
  icon: ReactNode;
}

export function IconButton({ label, icon, className = '', type = 'button', ...props }: IconButtonProps) {
  return (
    <button {...props} type={type} aria-label={label} className={`mds-icon-button ${className}`}>
      <span className="mds-icon-button__icon" aria-hidden="true">{icon}</span>
    </button>
  );
}
