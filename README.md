# Maksym Design System

[Design System Reference](https://maksymtkachenko.github.io/my-design-system/) includes live React examples, usage guidelines, and design tokens. GitHub Actions publishes the static site from `main` after verification passes.

A personal design system with React for web, React Native for mobile, and shared tokens and original SVG assets. This repository is the implementation source of truth; the linked Figma libraries remain the design and review workspace.

## Start locally

Requires Node.js 22.13 or a newer supported LTS release, npm, and Chrome for browser checks.

```sh
npm ci
npm run check
npm test
npm run figma:parse
npm run test:browser
npm run dev
```

Open http://127.0.0.1:6006 for Storybook. `npm run dev` (or `npm run storybook`) builds the workspace packages and starts Storybook. `npm run build` generates packages and the static Storybook in `apps/docs/dist`. On CI, Playwright installs Chrome before the browser test.

## Packages

| Package | Purpose |
| --- | --- |
| `@mds/tokens` | Approved token subset, generated JavaScript, TypeScript declarations, and CSS variables |
| `@mds/icons` | Original SVG exports, with the full FDS icon catalog available at `@mds/icons/library` |
| `@mds/react` | React web components and CSS |
| `@mds/react-native` | React Native components using native interaction and SVG rendering |
| `@mds/docs` | Storybook stories, usage guidelines, tokens, and icon catalog |

Each package is private and unpublished. These names currently resolve inside this workspace; they cannot yet be installed from npm in an independent project. Publishing versioned packages to a chosen registry is a separate distribution step. No npm or GitHub Packages credentials are stored here.

## Figma libraries

| Library | Source | Code destination |
| --- | --- | --- |
| Foundations | [FDS.Foundations](https://www.figma.com/design/fOf8vjS4sNd9pxeha6gAGi) | `packages/tokens` |
| Iconography | [FDS.Iconography](https://www.figma.com/design/b9upztxn5UwuO2o2JsHmgV) | `packages/icons` |
| App | [FDS.Components.App](https://www.figma.com/design/Gteyfh2uDgJ4phtbEIy85X) | `packages/react-native` |
| Web | [FDS.Components.Web](https://www.figma.com/design/fSby1O6rPTvFRZkdN6ie6I) | `packages/react` |

Machine-readable references live in [figma/libraries.json](figma/libraries.json). See [coverage](figma/coverage.md) for implemented and pending work. Registering a library does not convert every component or synchronize subsequent edits automatically.

## Initial component usage

Inside the workspace, web usage is:

```tsx
import { Button } from '@mds/react';
import '@mds/react/styles.css';

<Button label="Save changes" variant="primary" onClick={save} />
```

Load Inter at weight 600 in the consuming web app; the docs app bundles it locally with `@fontsource/inter`.

Mobile usage is:

```tsx
import { Button } from '@mds/react-native';

<Button label="Save changes" variant="primary" onPress={save} />
```

React Native consumers need `react-native-svg`, including the normal native installation/pod setup for their application. The initial package is type-checked, but has not been run on a physical device or simulator. iOS uses its system font to match the SF Pro Text design; Android uses its native sans-serif adaptation.

Both Buttons support `large` and `small` sizes, four variants, loading, disabled, and leading/trailing icon slots. Web states use CSS; mobile uses Pressable. Figma's State property is recorded in template metadata rather than exposed as a component prop. Disabled styling, focus indication, and spinner animation are implementation additions because those behaviors are not fully specified in the inspected Button component sets.

## Figma Code Connect

The approved Button connections have parserless `.figma.ts` templates in [figma/web](figma/web) and [figma/app](figma/app). Templates map all size, type, loading, text, and icon properties; nested icons are resolved dynamically. An icon without its own Code Connect template may not produce an icon snippet yet.

`npm run figma:parse` validates the templates and produces ignored `figma/compiled.json`. Initial publication was attempted through Figma MCP, but Figma rejected both mappings because these libraries require an Organization or Enterprise plan for Code Connect. The mappings are **not published**. Figma MCP can still read the libraries, and their source references remain usable in this repository.

If Code Connect becomes available for the libraries, publish through Figma MCP or provide a Figma token via the `FIGMA_ACCESS_TOKEN` environment variable and run:

```sh
npx figma connect publish --skip-update-check
```

Keep credentials out of Git. Publishing requires appropriate Figma library access and Code Connect entitlement. CI checks source and templates; it does not publish mappings or change Figma variables automatically.

## Change workflow

1. Explore and review a design change in Figma or the local playground.
2. Update approved tokens, platform components, usage guidance, and affected Code Connect templates in one change.
3. Run the checks and review the visual result.
4. Merge, then update the published Figma library and Code Connect mappings as needed.
5. When package distribution is established, release a version and let consumer projects upgrade explicitly.

There is no automatic two-way token sync. The initial tokens are verified values used by Button in the supplied libraries, not a complete Foundations export. Native geometry and theme coverage still need platform review.

The initial npm audit reported seven findings in the Code Connect development-tool dependency chain (three high, four moderate), with no complete compatible fix reported for the current CLI. This is tracked as an upstream tooling limitation; these CLI dependencies are not shipped in the component packages.

## Storybook reference site

Storybook configuration lives in `.storybook`; component stories live alongside the reference content in `apps/docs/src`. Use Controls for component props, Actions to observe callbacks, and the Background toolbar for Black (default), White, Colorful, or Colorful (moving). Play/Pause also has a Background blur control (6 px by default). Each component has usage guidelines and generated documentation with source examples. Foundations contains shared tokens and the searchable icon catalog.

GitHub Actions verifies the static Storybook and publishes `apps/docs/dist` to the existing GitHub Pages URL. No Storybook or Chromatic account is required.
