import { useLayoutEffect, useRef, type ButtonHTMLAttributes } from 'react';
import { assets } from '@mds/icons';
import { tokens } from '@mds/tokens';

export interface PlayPauseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  size?: 'x-small' | 'small' | 'large';
}

/** Figma 6526:510; motion timeline 6529:65. */
export function PlayPause({ playing, onPlayingChange, size = 'x-small', className = '', onClick, type = 'button', ...props }: PlayPauseProps) {
  const button = useRef<HTMLButtonElement>(null);
  const play = useRef<HTMLSpanElement>(null);
  const pause = useRef<HTMLSpanElement>(null);
  const timeline = useRef<Animation[]>([]);
  const initialPlaying = useRef(playing);
  useLayoutEffect(() => {
    const ease = 'cubic-bezier(0.5, 0, 0.5, 1)';
    const options = { duration: 200, fill: 'both' as const };
    const animations = [
      button.current!.animate([
        { backgroundColor: tokens.color.backgroundPlayback, offset: 0, easing: ease },
        { backgroundColor: tokens.color.backgroundPlaybackPulse, offset: .5, easing: ease },
        { backgroundColor: tokens.color.backgroundPlayback, offset: 1 },
      ], options),
      play.current!.animate([
        { transform: 'scale(1)', opacity: 1, offset: 0, easing: ease },
        { transform: 'scale(.85)', opacity: 0, offset: .625, easing: 'linear' },
        { transform: 'scale(.85)', opacity: 0, offset: 1 },
      ], options),
      pause.current!.animate([
        { transform: 'scale(.85)', opacity: 0, offset: 0, easing: 'linear' },
        { transform: 'scale(.85)', opacity: 0, offset: .375, easing: ease },
        { transform: 'scale(1)', opacity: 1, offset: 1 },
      ], options),
    ];
    animations.forEach(animation => { animation.pause(); animation.currentTime = initialPlaying.current ? 200 : 0; });
    timeline.current = animations;
    return () => { animations.forEach(animation => animation.cancel()); timeline.current = []; };
  }, []);
  useLayoutEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const animations = timeline.current;
      const target = playing ? 200 : 0;
      // Keep all tracks on one playhead. play() automatically rewinds animations
      // at a boundary, so never play a timeline already at its target endpoint.
      const current = Math.max(0, Math.min(200, Number(animations[0]?.currentTime ?? target)));
      animations.forEach(animation => {
        animation.pause();
        animation.playbackRate = playing ? 1 : -1;
        animation.currentTime = media.matches ? target : current;
      });
      if (!media.matches && current !== target) animations.forEach(animation => animation.play());
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [playing]);
  return <button {...props} ref={button} type={type} className={`mds-play-pause ${className}`}
    data-size={size} data-playing={playing} aria-label={playing ? 'Pause' : 'Play'}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented) onPlayingChange(!playing); }}>
    {(['play', 'pause'] as const).map(action => <span key={action} className={`mds-play-pause__${action}`} aria-hidden="true">
      <span ref={action === 'play' ? play : pause} className="mds-play-pause__motion">
        <img src={`data:image/svg+xml,${encodeURIComponent(assets[`playback-${action}-${size}`])}`} alt="" />
      </span>
    </span>)}
  </button>;
}
