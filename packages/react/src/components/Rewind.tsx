import { useEffect, useRef, type ButtonHTMLAttributes } from 'react';
import { assets } from '@mds/icons';
import { tokens } from '@mds/tokens';

export interface RewindProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  direction?: 'forward' | 'backward';
  size?: 'small' | 'large';
  label?: string;
}

const pressDuration = 400;
const pressEasing = 'cubic-bezier(0.5, 0, 0.5, 1)';

/** Figma component 6528:555 and press timeline 6529:43. */
export function Rewind({ direction = 'forward', size = 'small', label, className = '', type = 'button', onClick, ...props }: RewindProps) {
  const animations = useRef<Animation[]>([]);
  useEffect(() => () => animations.current.forEach(animation => animation.cancel()), []);

  const icon = assets[`rewind-${direction}-${size}`];
  const iconSize = size === 'large' ? 32 : 24;

  return (
    <button {...props} type={type} className={`mds-rewind ${className}`} data-size={size}
      aria-label={label ?? (direction === 'forward' ? 'Skip forward' : 'Skip backward')}
      onClick={event => {
        onClick?.(event);
        if (event.defaultPrevented || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        animations.current.forEach(animation => animation.cancel());
        const button = event.currentTarget;
        const turn = direction === 'forward' ? 'rotate(6.283185rad)' : 'rotate(-6.283185rad)';
        animations.current = [
          button.animate([
            { transform: 'rotate(0rad)', offset: 0, easing: pressEasing },
            { transform: turn, offset: .9973, easing: 'linear' },
            { transform: turn, offset: 1 },
          ], pressDuration),
          button.animate([
            { backgroundColor: tokens.color.backgroundPlayback, offset: 0, easing: pressEasing },
            { backgroundColor: tokens.color.backgroundPlaybackPulse, offset: .25, easing: pressEasing },
            { backgroundColor: tokens.color.backgroundPlayback, offset: .5, easing: 'linear' },
            { backgroundColor: tokens.color.backgroundPlayback, offset: 1 },
          ], pressDuration),
        ];
      }}>
      <img src={`data:image/svg+xml,${encodeURIComponent(icon)}`} width={iconSize} height={iconSize} alt="" />
    </button>
  );
}
