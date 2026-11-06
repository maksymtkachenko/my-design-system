# Design system contributor guidance

- Use React for web and React Native for mobile. Share tokens and original SVG assets; keep platform implementations separate.
- Start with figma/libraries.json and figma/coverage.md. Registered files and inventoried components are not automatically implemented or connected.
- Use @mds/react or @mds/react-native components in consumers instead of copying their source.
- Read the relevant Figma component properties and design context before implementation. Preserve authored icon sizes and geometry.
- Edit packages/tokens/tokens.json for approved token changes. scripts/build.mjs generates JS, types, and CSS; never hand-edit dist.
- Use semantic tokens rather than inline color literals in shared components. Keep experiments in consumer apps until reusable.
- Keep Figma Code Connect templates in figma/web and figma/app as parserless .figma.ts files. Do not fabricate Figma node IDs or map unfinished components.
- Use platform interaction states rather than a public state prop. Keep components accessible to keyboard and screen reader users.
- Run npm run check, npm test, npm run figma:parse, and npm run test:browser after component changes.
- Do not commit credentials, Figma tokens, node_modules, or build output. Packages are private and unpublished until a distribution strategy is explicitly approved.
