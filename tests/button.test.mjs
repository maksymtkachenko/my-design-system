import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../packages/react/dist/index.js';

test('loading blocks activation and preserves the accessible name', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { label: 'Save changes', loading: true }));
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /aria-label="Save changes"/);
  assert.doesNotMatch(html, /https:\/\/www.figma.com\/api\/mcp\/asset/);
});

test('a form button defaults to a non-submitting action and supports explicit submit', () => {
  assert.match(renderToStaticMarkup(React.createElement(Button, { label: 'Open' })), /type="button"/);
  assert.match(renderToStaticMarkup(React.createElement(Button, { label: 'Save', type: 'submit' })), /type="submit"/);
});
