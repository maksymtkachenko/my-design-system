// url=https://www.figma.com/design/Gteyfh2uDgJ4phtbEIy85X/?node-id=578-113
// source=https://github.com/maksymtkachenko/my-design-system/blob/main/packages/react-native/src/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.getString('Label')
const size = instance.getEnum('Size', { 'L': 'large', 'S': 'small' })
const variant = instance.getEnum('Type', {
  'Primary': 'primary', 'Secondary': 'secondary',
  'Tertiary': 'tertiary', 'Tertiary Mono': 'tertiary-mono',
})
const loading = instance.getEnum('Loading', { 'True': true, 'False': false })
// Interaction is handled by the platform, not a public Button prop.
const interactionState = instance.getEnum('State', { 'Default': 'default', 'Pressed': 'pressed' })
const showLeadingIcon = instance.getBoolean('Show Leading Icon')
const showTrailingIcon = instance.getBoolean('Show Trailing Icon')
const leadingInstance = showLeadingIcon ? instance.getInstanceSwap('Leading Icon') : null
const trailingInstance = showTrailingIcon ? instance.getInstanceSwap('Trailing Icon') : null
let leadingIcon
let trailingIcon
if (leadingInstance && leadingInstance.type === 'INSTANCE') {
  leadingIcon = leadingInstance.executeTemplate().example
}
if (trailingInstance && trailingInstance.type === 'INSTANCE') {
  trailingIcon = trailingInstance.executeTemplate().example
}

export default {
  example: figma.code`<Button
  label="${label}"
  size="${size}"
  variant="${variant}"
  ${loading ? 'loading' : ''}
  ${leadingIcon ? figma.code`leadingIcon={${leadingIcon}}` : ''}
  ${trailingIcon ? figma.code`trailingIcon={${trailingIcon}}` : ''}
/>`,
  imports: ['import { Button } from "@mds/react-native"'],
  id: 'app-button',
  metadata: { nestable: true, props: { interactionState } },
}
