# Migration and connection coverage

## Library registration

All four user-provided Figma files have been inspected and registered in libraries.json. This is an explicit source manifest, not a global file-to-repository sync.

| Area | Initial coverage | Pending |
| --- | --- | --- |
| Foundations | Light-mode semantic colors, spacing, radii, and text styles used by Button | Full collection export, primitive/semantic alias graph, other text styles, layout, border system, and other modes |
| Iconography | 870 original SVG exports from the Icons page, with 16, 24, and 32 px variants in the reference site and Icon Button picker | Code Connect templates; pictograms and illustrations |
| Web | Button: both sizes, all four variants, default/hover/pressed/loading; platform focus and disabled behavior | Alert, Button Pill, Button Icon, Button Group, Button Group Pill, Checkbox, Help Text, Input, Radio, Row, standalone Spinner |
| App | Button: both sizes, all four variants, default/pressed/loading; native press and disabled behavior | Alert, Button Pill, Button Icon, Button Group, Button Group Pill, Checkbox, Help Text, Input, Row, Radio, standalone Spinner, Sticky Button, System |

## Initial approved Code Connect targets

| Figma target | Source | Template |
| --- | --- | --- |
| [Web Button, 475:66](https://www.figma.com/design/fSby1O6rPTvFRZkdN6ie6I?node-id=475-66) | packages/react/src/Button.tsx | figma/web/Button.figma.ts |
| [App Button, 578:113](https://www.figma.com/design/Gteyfh2uDgJ4phtbEIy85X?node-id=578-113) | packages/react-native/src/Button.tsx | figma/app/Button.figma.ts |

Figma rejected publication of both connections because the libraries require an Organization or Enterprise plan. Templates parse successfully, but no live Code Connect mapping was created. Exact results are recorded in connections.json. Foundations values are integrated through tokens; Code Connect is used for implemented components, not arbitrary whole-file links.

## Provenance and verification

- Initial token values were read through Figma variable definitions on Web Button 475:66 and App Button 578:113. The collection wrapper on Foundations 14:59 did not expose values through the variable-read tool; this is not recorded as a full Foundations export.
- Original Plus SVG is from Iconography node 444:5252. Spinner SVGs are exact exports returned for each platform Button's nested Spinner variants.
- Asset files remain local; no temporary Figma URL is referenced at runtime.
- Web checks cover default geometry (84 x 48 within font rounding), small height 32, background states, focus, keyboard activation, loading semantics, and successful SVG rendering.
- React Native is type-checked. Device rendering, touch target review, screen reader testing, and Android typography comparison remain pending.
- Initial packages have only the inspected light-mode values. Do not advertise dark mode or full library migration.

## Playback control

React PlayPause implements App component 6526:510 with all three sizes and six original SVG assets. Motion from 6529:65 uses the 200 ms timeline once per toggle, reversing for Pause to Play. Reduced motion snaps to the endpoint. No new Code Connect publication or React Native implementation is claimed.
