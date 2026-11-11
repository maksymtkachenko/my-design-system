// url=https://www.figma.com/design/Gteyfh2uDgJ4phtbEIy85X/?node-id=6526-510
// source=https://github.com/maksymtkachenko/my-design-system/blob/main/packages/react/src/components/PlayPause.tsx
// component=PlayPause
import figma from 'figma'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', {
  'XSmall': 'x-small', 'Small': 'small', 'Large': 'large',
})
// Figma State names describe the visible icon; playing describes media state.
const initialPlaying = instance.getEnum('State', { 'Play': 'false', 'Pause': 'true' })

export default {
  example: figma.code`function PlaybackControl() {
  const [playing, setPlaying] = useState(${initialPlaying});
  return <PlayPause size="${size}" playing={playing} onPlayingChange={setPlaying} />;
}`,
  imports: ['import { useState } from "react"', 'import { PlayPause } from "@mds/react"', 'import "@mds/react/styles.css"'],
  id: 'app-play-pause-react',
  metadata: { nestable: false },
}
