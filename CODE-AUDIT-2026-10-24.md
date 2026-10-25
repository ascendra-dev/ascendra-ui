# Ascendra UI Code Audit

Is the library still clean and maintainable after this month's bulk changes? A full pass over the shipped
`ascendra-ui/` folder, from the first commit to today, with every finding graded and a fix that keeps today's
behaviour.

| | |
|---|---|
| Date | 24 Oct 2026 |
| Scope | 221 files · 19,921 lines |
| History | 193 commits since 31 Jul |
| At | ascendra-ui `0af8b17` |
| Code changed | none |

Published copy: https://claude.ai/artifact/4KceR1nB63EqXRHzMEPhJo (private)

## The short answer

**The code is still maintainable, and most of it is in good shape.** It is strictly typed with zero type errors, has
a single import cycle in 238 modules, and its comments explain *why* things are done, not just what. The rapid feature
work did not wreck the structure.

**But the speed left marks, and one older gap now matters more.** The week's work added one real accessibility bug
(focus escapes the "modal" focus mode), several pieces of hidden coupling, and a few wrong-way dependencies.
Separately, the library has **no automated tests at all**. That predates this month, but it is why it should be fixed
first: every other item here is safer to change once there is a net.

Five findings are must-fix (all small), ten should-fix, and six can wait. None calls for a rewrite.

## At a glance

| Check | Result | Status |
|---|---|---|
| Type check (`strict`) | 0 errors | good |
| Import cycles (madge, 238 modules) | 1 | should fix |
| Lint, whole library | 11 errors · 2 warnings | must fix |
| Automated tests · CI | 0 · none | must fix |
| Keyboard focus inside focus mode / maximized card | escapes after 54 / 11 Tabs | must fix |
| React contexts | 26 (7 new this week) | ok, see notes |
| Malformed Tailwind classes | 1 | must fix |
| Exports used nowhere (excluding Props types) | 4 | later |
| Renders when hovering rows | 0 | good |
| Entering focus mode, click to paint (dev build) | 51–70 ms | good |

Ages on each finding: *initial release* means it shipped on 31 Jul; *this week* means the UX review and focus-mode
work (23–24 Oct).

## Must fix — 5 findings, each small

### M1 · Focus mode and maximized cards let keyboard focus escape — *this week*

- **Where:** `components/ui/maximize.tsx`. The element gets `role="dialog"` and `aria-modal` but nothing keeps focus
  inside it.
- **Evidence:** live test. 11 Tabs in a maximized Overview card land on another card's "Collapse section" button,
  hidden behind the overlay. In a focused Audit Log page focus leaves the panel after 54 Tabs.
- **Why it matters:** keyboard and screen-reader users can operate controls they cannot see, and the page tells
  assistive tech it is modal when it is not.
- **Fix:** trap focus while maximized with Radix `FocusScope` (the `radix-ui` package is already a dependency, so
  nothing new is installed), or mark the rest of the page `inert` while maximized. Behaviour otherwise unchanged.
- **Effort:** small

### M2 · No automated tests and no CI — *initial release*

- **Where:** ascendra-ui and ascendra-commons-ui: 0 test files, no `test` script, no workflows.
- **Evidence:** every check in this month's work (focus mode, maximize, row cursors, sidebar, collapsed footer) was a
  throwaway browser script, deleted afterwards.
- **Why it matters:** this is the main maintainability risk. Nothing stops the next change, or the refactors below,
  from silently breaking what already works.
- **Fix:** keep a small Playwright smoke suite against the testbed, built from the checks already run this month
  (about ten flows). Run type check, lint and the suite from a pre-push hook, the same pattern ascendra-commons already
  uses with `check.js`.
- **Effort:** medium, once

### M3 · A broken dark-mode shadow on loading, empty and error states — *initial release*

- **Where:** `components/ui/table.tsx:320` (`EmptyBody`)
- **Evidence:** `dark:before:shadow-[…rgba(0,0,0,2),…0.2)`: the closing `]` is missing and the opacity is `2`.
  Tailwind never generates the class. It is the only malformed class in the library. `CardPanel` has the correct
  version (`0.4`, bracket closed).
- **Why it matters:** in dark mode those boxes lose their raised look. It also shows the copy-paste drift described
  in S6.
- **Fix:** correct the class, ideally by sharing one surface style (S6).
- **Effort:** tiny

### M4 · React state is sorted in place — *initial release*

- **Where:** `providers/data-table-query/data-table-query.provider.tsx:158`
- **Evidence:** `savedUserQueries.sort(…)` inside a `useMemo` reorders the state array itself. A few lines later
  `mergedQueries` does it safely, filtering into a new array first.
- **Why it matters:** state changes outside `setState`, which React and the React Compiler both assume never happens.
  It is harmless today only because the order rarely changes.
- **Fix:** sort a copy: `[...savedUserQueries].sort(…)`.
- **Effort:** tiny

### M5 · The library does not pass its own lint — *mixed ages*

- **Where:** `table-lookup.tsx` (`Math.random` during render, refs read during render ×3, state set in an effect),
  `color-picker.tsx`, `manage-queries-dialog.tsx`, `data-table-query.provider.tsx:270`,
  `use-visible-rows-height.ts:31`, `use-is-small-screen.ts`, and shadcn's `use-mobile.ts`. Two accessibility warnings
  on the date pickers (`aria-invalid` on a button).
- **Evidence:** whole-library lint: 11 errors, 2 warnings. Checks this month linted only the changed files, so these
  went unnoticed.
- **Why it matters:** the render-purity and ref errors are the cases where the React Compiler skips optimising a
  component. A red lint also can't be used as a gate.
- **Fix:** make `table-lookup` pure (stable ids, refs only in effects and handlers). For the one-time hydration effects
  that are correct as written, add a targeted disable with the reason. Exclude `shadcn/` from lint, since its files
  are never edited.
- **Effort:** small to medium

## Should fix — 10 findings, structure and upkeep

### S1 · Focus mode reaches into other components through a global stylesheet — *this week*

- **Where:** `components/layout/page-focus.css`
- **Evidence:** one unlayered stylesheet depends on 15 `data-slot` names spread across 8 components (page main,
  wrapper, content, header, title, the data table's wrapper, clip and frame, and others).
- **Why it matters:** renaming any of those slots breaks focus mode without a type error or a lint warning. Someone
  editing `PageContent` has no way to know focus mode relies on it.
- **Fix:** keep today's behaviour but make the contract visible: either list the slots in one exported constant that
  both sides import, or let each component apply its own focus-mode classes from the `usePageFocused` /
  `usePageFillTable` context that already exists.
- **Effort:** medium

### S2 · Two slot names each mean two different things — *initial release*

- **Where:** `table-container` is `DataTableWrapper`'s grey box *and* `Table`'s scroller. `table-wrapper` is
  `TableWrapper`'s card *and* `DataTable`'s scroller.
- **Why it matters:** any selector using these names is ambiguous. S1's stylesheet uses both, and works only because
  of the surrounding structure.
- **Fix:** rename one of each pair (for example `table-scroller`) and update the few selectors.
- **Effort:** small

### S3 · Some imports point the wrong way — *mixed ages*

- **Where:**
  - `ui/table.tsx → card/card.tsx`, so a primitive depends on Card for "show every row when maximized" (this week).
  - `data-table/data-table.tsx → layout/page-focus.tsx`, so a table depends on a page layout (this week).
  - `forms/back-link ↔ layout` now depend on each other (this week).
  - `side-bar/side-bar-search.tsx → index.ts`, the library importing its own barrel, which is the one import cycle
    madge found (initial release).
  - `utils/` and `preferences/` take their types from `providers/` (initial release).
- **Why it matters:** a primitive that knows about Card or page layout can't be understood or moved on its own, and
  changes ripple upward. Cycles through the barrel can produce undefined imports at load time.
- **Fix:** read "maximized" from the ui-level maximize scope instead of Card's context. Move the page-table
  registration into a ui-level module so the table doesn't import layout. Import directly in `side-bar-search`. Move
  shared types into a `types` module.
- **Effort:** medium

### S4 · `Table` and `DataTable` are two copies that have started to drift — *initial release, widened this week*

- **Evidence:** `Table` ↔ `DataTable` are 62% identical, and their row and header pairs 44–58%. They have already
  diverged: `Table`'s header measures its real height for the card frame, `DataTable`'s relies on a 40px default, and
  this week's fill mode was added to `DataTable` only.
- **Why it matters:** every scroll or sticky-header fix has to be made twice, and one copy gets forgotten.
- **Fix:** one internal hook for the scroller, overlay scrollbars and header measurement, used by both.
- **Effort:** medium

### S5 · The query provider is one 42-field context — *initial release*

- **Where:** `providers/data-table-query/data-table-query.provider.tsx`: 648 lines, 14 pieces of state, two
  `exhaustive-deps` suppressions.
- **Evidence:** every component that reads any field (query bar, parameter panel, table wrapper, footer) re-renders on
  any change, whether a page step, a mute or a draft. The sibling `data-table.provider` deliberately splits its state
  into six contexts.
- **Why it matters:** the two core providers follow different architectures, and this one is the hardest file in the
  library to change safely. It is careful and well commented, so the risk is its size, not its quality.
- **Fix:** split into the current run, query management (saved, disabled, order) and paging, following
  `data-table.provider`. Measure before and after with a render counter.
- **Effort:** medium to large

### S6 · The raised-surface style is copied by hand — *initial release*

- **Evidence:** the white body with a hairline ring and soft shadow, plus its dark variant, is written out separately
  in `table.tsx` (twice), `card-panel.tsx` and `aside-content.tsx`. One copy drifted into the bug in M3.
- **Fix:** one shared class list, as `overlayClasses` already does for overlays.
- **Effort:** small

### S7 · The sidebar's open state lives in the DOM, written from six files — *initial release*

- **Evidence:** six files read and write a `data-sidebar` attribute on `#app-layout` directly, instead of React state:
  the menu item, overlay, search, toggle, menu header and layout mode. The 24 Oct "sidebar links don't open" bug lived
  exactly here.
- **Fix:** keep open/closed in `SideBarContext` and derive the attribute from it, so there is one owner.
- **Effort:** medium

### S8 · The stacking order is scattered — *mixed ages*

- **Evidence:** 13 different z-index values across 9 files. Only `popup-layer` names its layers. The rest are bare
  numbers placed just above or below a neighbour, such as maximize at `z-189`/`z-190` under the sheet's `z-200`.
- **Fix:** one module that names the whole scale (page popups, top bars, sidebar, maximize, sheet, dialog, dialog
  popups), imported everywhere.
- **Effort:** small

### S9 · Every row carries closed menus and tooltips — *initial release*

- **Evidence:** render counts on People, taken through React's devtools hook without app changes: about 50 component
  renders per row per update, mostly closed Radix menu, tooltip and checkbox trees. Three search keystrokes cost 4,304
  renders. Entering focus mode costs 1,648, because every closed popup re-renders for the new popup layer.
- **Why it matters:** it is not felt today (focus mode paints in 51–70 ms in the dev build, with no long tasks), but
  cost grows with rows per page.
- **Fix:** mount a row's menu content only when it opens, and tooltips lazily.
- **Effort:** medium

### S10 · Three small robustness gaps in maximize — *this week*

- **Where:** `components/ui/maximize.tsx`
- **Evidence:**
  - `MaximizeProvider` adds or removes its wrapper when `enabled` changes, so a card whose `maximizable` prop changed
    would remount its contents. That breaks the "a value switch, never a wrapper that comes and goes" rule
    `popup-layer` follows.
  - React and the restore code both write the element's `tabIndex`.
  - The placeholder keeps the height measured at maximize time, so resizing the window while maximized leaves it stale.
- **Fix:** always render the providers and switch values only. Give `tabIndex` a single owner. Re-measure the
  placeholder on resize.
- **Effort:** small

## Acceptable for now — 6 findings, tidy when convenient

### L1 · Context values are fresh objects, but the React Compiler covers them — *mixed ages*

13 providers pass an inline object, which normally re-renders every consumer on each render. Both apps set
`reactCompiler: true`, which memoizes these automatically, so this matters only in components the compiler skips
(M5). Some files also memoize by hand (maximize, page focus, data-table provider) while most rely on the compiler. It
would help to choose one convention and write it down.

### L2 · Four exports are dead — *mixed ages*

`useIsSmallScreen` (orphaned by the 24 Oct sidebar fix, and a duplicate of shadcn's `useIsMobile`), `defineColumns`,
`formatDateRange` and `formatShortDate` are used nowhere in the library, showcase, testbed or commons packages. The
other 60 unused exports are `Props` types, which are reasonable public API.

### L3 · The icon rule in CLAUDE.md is not followed in 20 files — *initial release*

The repo's CLAUDE.md says icons always come from `react-icons/lu`, never `lucide-react` directly. 20 library files
import `lucide-react`, all since the first commit. Either migrate them or relax the rule.

### L4 · No formatter configuration in ascendra-ui — *initial release*

141 files use single quotes and 67 use double. Each file is consistent with itself, but nothing enforces one style.
ascendra-commons-ui has a `.prettierrc`; ascendra-ui does not. Add one matching the majority, and reformat in a single
dedicated commit so the history stays readable.

### L5 · Card knows about charts — *this week*

The "chart fills a maximized card" rule lives in `card.tsx` as selectors on the chart's slot. It works, but it is the
same hidden-coupling pattern as S1. Fold it into whatever S1 settles on.

### L6 · `PageFocus` adds four wrapper elements to every page — *this week*

They are there even when focus mode is never used, so the page never remounts on entering it. The cost is negligible.
Note it only if a page ever needs a very flat DOM.

## What is in good shape

- **Types:** `strict` mode, zero errors.
- **Structure:** one import cycle in 238 modules, and folders mostly depend downward (components → ui → shadcn,
  utils).
- **Comments explain intent:** the Strict-Mode guard in the query provider, the trigger-versus-restore order, the
  Safari body-height workaround and the overlay-scrollbar host gotcha are all written down where they apply.
- **Security:** `BackLink` only follows same-site paths (`samePath` rejects `//host` and `https:`), so the back
  parameter can't be used to redirect elsewhere.
- **Good context design exists already:** `data-table.provider` splits its state into six memoized contexts, which is
  the model for S5.
- **Cheap interactions:** row hover, cursor cues and tint are pure CSS, with 0 renders. Focus mode paints in 51–70 ms
  in the dev build.
- **No dead selectors:** every `data-slot` a selector refers to still exists.
- **Clean dialog patterns:** the dialog footer slot, the popup layer and the overlay styles are small, documented and
  reused.

## Suggested order of work

1. **Build the safety net first (M2).** A smoke suite and a pre-push gate, so each later step is verified rather than
   eyeballed.
2. **Quick, contained fixes:** M1 focus trap, M3 shadow, M4 sort copy, S2 slot names, S6 shared surface, S8 z-scale,
   L2 dead code.
3. **Get lint to green (M5)**, then make it part of the gate.
4. **Structural tidy-up:** S3 dependency direction, S4 one table scroller, S1 and L5 the focus-mode contract, S10
   maximize robustness.
5. **The larger refactors, measured:** S5 split the query context, S7 sidebar state, S9 lazy row menus. Record render
   counts before and after each one.

Every fix above keeps today's behaviour. Each one would be its own reviewed commit in ascendra-ui, synced to
commons-ui afterwards.

## How this was checked

- **Automated, over the whole library:** type check (`tsc --noEmit`), whole-library ESLint, madge for cycles and a
  folder-level dependency graph, a scan of all 26 contexts and their provider values, an inventory of imperative DOM
  work (listeners, attribute and style writes), `data-slot` definitions against selector use, a similarity diff of
  `Table` against `DataTable`, and a scan of every export against the library, showcase, testbed and commons packages.
- **Read in full, by hand:** `maximize`, `page-focus` and its stylesheet, the whole card family, `table.tsx`,
  `data-table.tsx`, `chart-bar-link`, `back-link`, `popup-layer`, `dialog` and `data-table-query.provider`. The other
  files were covered by the automated passes, not read line by line.
- **Measured in the running testbed:** render counts through React's devtools hook (no app changes), click-to-paint
  timing with a long-task observer, and a keyboard Tab walk out of focus mode and a maximized card. All in the dev
  build, so production numbers will be lower.
- **Not covered:** the 17 shadcn primitives (never edited, by rule). Production bundle size. The testbed and commons
  pages themselves, which are consumers of the library and deserve their own pass.
