import { ComponentMeta } from './types';

export const registry: Record<string, ComponentMeta> = {
  'report-header': {
    slug: 'report-header',
    name: 'Report Header',
    description: 'Composable report title zone. Combines an eyebrow label, bold heading, subtitle, and a metadata footer that renders as an inline row or a multi-column stacked grid for dense field sets.',
    importPath: '@/ascendra-ui',
    importNames: ['ReportHeaderContent', 'ReportHeaderBody', 'ReportHeaderBodyWrap', 'ReportTitle', 'ReportTitleHeader', 'ReportSubTitle', 'ReportHeaderFooter', 'ReportHeaderField'],
    props: [
      { name: 'className (ReportHeaderContent)', type: 'string', description: 'Override the default p-8 pb-6 padding on the header container.' },
      { name: 'className (ReportHeaderBody)', type: 'string', description: 'Override the flex row that positions the title group and any right-side content (logo, badge).' },
      { name: 'className (ReportHeaderBodyWrap)', type: 'string', description: 'Override the wrapper around ReportTitle, ReportTitleHeader, and ReportSubTitle.' },
      { name: 'className (ReportTitle)', type: 'string', description: 'Override the uppercase tracking-widest eyebrow label styles.' },
      { name: 'className (ReportTitleHeader)', type: 'string', description: 'Override the text-3xl font-bold h1 heading styles.' },
      { name: 'className (ReportSubTitle)', type: 'string', description: 'Override the mt-1 text-sm text-muted-foreground subtitle styles.' },
      { name: 'stacked (ReportHeaderFooter)', type: 'boolean', default: 'false', description: 'When true, renders fields as a responsive 2–3 column grid instead of an inline flex row. Use when there are 5 or more metadata fields.' },
      { name: 'className (ReportHeaderFooter)', type: 'string', description: 'Override the metadata bar container. Default is mt-5 border-t pt-4 text-xs with flex or grid layout.' },
      { name: 'label (ReportHeaderField)', type: 'string', description: 'Field label. Displayed inline as "Label: value" in row mode, or above the value in stacked mode.' },
      { name: 'className (ReportHeaderField)', type: 'string', description: 'Override individual field styles.' },
    ],
  },

  'report-document': {
    slug: 'report-document',
    name: 'Report Document',
    description: 'Document shell and structural dividers. ReportDocumentWrapper is the root element targeted by the PDF export (id="report-content"). ReportSectionHeader separates content zones. ReportDocumentFooter anchors legal notices and attribution.',
    importPath: '@/ascendra-ui',
    importNames: ['ReportDocumentWrapper', 'ReportSectionHeader', 'ReportDocumentFooter', 'ReportDocumentFooterNote', 'ReportDocumentFooterLine', 'ReportDocumentFooterLineLeft', 'ReportDocumentFooterLineRight'],
    props: [
      { name: 'className (ReportDocumentWrapper)', type: 'string', description: 'Override the flex flex-col gap-10 root container. Note: id="report-content" is hardcoded — the PDF export button targets this id.' },
      { name: 'className (ReportSectionHeader)', type: 'string', description: 'Override the pb-3 border-b mb-4 section divider. Children are rendered inside — typically a heading or heading + badge.' },
      { name: 'className (ReportDocumentFooter)', type: 'string', description: 'Override the border-t pt-6 text-xs text-muted-foreground footer container.' },
      { name: 'className (ReportDocumentFooterNote)', type: 'string', description: 'Override individual disclaimer or note paragraph styles.' },
      { name: 'className (ReportDocumentFooterLine)', type: 'string', description: 'Override the flex row that holds attribution text and metadata chips.' },
      { name: 'className (ReportDocumentFooterLineLeft)', type: 'string', description: 'Override the left-side organization/author label styles.' },
      { name: 'className (ReportDocumentFooterLineRight)', type: 'string', description: 'Override the right-side metadata group (version, classification, date).' },
    ],
  },

  'report-content': {
    slug: 'report-content',
    name: 'Report Content',
    description: 'In-body text blocks for executive summaries, analyst notes, and methodology disclosures. ReportPdfExportButton captures the report document and downloads it as a paginated A4 PDF.',
    importPath: '@/ascendra-ui',
    importNames: ['ReportSummary', 'ReportNotes', 'ReportNote', 'ReportNoteHeader', 'ReportNoteText', 'ReportPdfExportButton'],
    props: [
      { name: 'className (ReportSummary)', type: 'string', description: 'Override the flex-col gap-3 text-sm leading-relaxed text-muted-foreground summary wrapper.' },
      { name: 'className (ReportNotes)', type: 'string', description: 'Override the flex-col gap-5 notes container.' },
      { name: 'className (ReportNote)', type: 'string', description: 'Override an individual note block wrapper.' },
      { name: 'className (ReportNoteHeader)', type: 'string', description: 'Override the mb-1 font-medium text-foreground note title paragraph.' },
      { name: 'className (ReportNoteText)', type: 'string', description: 'Override the note body paragraph.' },
      { name: 'fileName (ReportPdfExportButton)', type: 'string', description: 'PDF filename without the .pdf extension. Required.' },
      { name: 'title (ReportPdfExportButton)', type: 'string', default: "'Export PDF'", description: 'Button label shown when idle.' },
    ],
  },

  'chart-legend': {
    slug: 'chart-legend',
    name: 'Chart Legend',
    description: 'Inline legend item pairing a colored swatch with a label, and a group wrapper that controls alignment. Use beneath any chart to identify series, segments, or categories.',
    importPath: '@/ascendra-ui',
    importNames: ['ChartLegend', 'ChartLegendGroup'],
    props: [
      { name: 'variant (ChartLegend)', type: "'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5' | 'chart-6' | 'chart-7' | 'chart-8'", default: "'chart-1'", description: 'Chart color token applied to the swatch. Maps to the CSS variables --chart-1 through --chart-8.' },
      { name: 'shape (ChartLegend)', type: "'round' | 'square'", default: "'round'", description: "Shape of the color swatch. Use 'round' for line/pie charts and 'square' for bar/area charts." },
      { name: 'size (ChartLegend)', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'sm'", description: 'Swatch size: xs=4px, sm=8px, md=12px, lg=16px. Also adjusts the gap between swatch and label.' },
      { name: 'className (ChartLegend)', type: 'string', description: 'Additional CSS classes on the legend item wrapper.' },
      { name: 'align (ChartLegendGroup)', type: "'left' | 'center' | 'right'", default: "'center'", description: 'Horizontal alignment of the legend items within the group.' },
      { name: 'className (ChartLegendGroup)', type: 'string', description: 'Additional CSS classes on the group wrapper.' },
    ],
  },

  'chart-target-legend': {
    slug: 'chart-target-legend',
    name: 'Chart Target Legend',
    description: 'Inline legend item pairing a thin horizontal bar swatch (16×2px md, 24×2px lg) with a label, used to identify target or goal lines on a chart. Shares the same color tokens as ChartLegend.',
    importPath: '@/ascendra-ui',
    importNames: ['ChartTargetLegend', 'ChartTargetLegendGroup'],
    props: [
      { name: 'variant (ChartTargetLegend)', type: "'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5' | 'chart-6' | 'chart-7' | 'chart-8'", default: "'chart-1'", description: 'Chart color token applied to the bar swatch. Maps to the CSS variables --chart-1 through --chart-8.' },
      { name: 'size (ChartTargetLegend)', type: "'md' | 'lg'", default: "'md'", description: "Bar width: md=16px, lg=24px. Height is always 2px. Also adjusts the gap between bar and label." },
      { name: 'className (ChartTargetLegend)', type: 'string', description: 'Additional CSS classes on the legend item wrapper.' },
      { name: 'align (ChartTargetLegendGroup)', type: "'left' | 'center' | 'right'", default: "'center'", description: 'Horizontal alignment of the legend items within the group.' },
      { name: 'className (ChartTargetLegendGroup)', type: 'string', description: 'Additional CSS classes on the group wrapper.' },
    ],
  },

  'rating': {
    slug: 'rating',
    name: 'Rating',
    description: 'Star rating display and input with half-star precision, multiple sizes, and semantic color variants.',
    importPath: '@/ascendra-ui',
    importNames: ['Rating'],
    props: [
      { name: 'rating', type: 'number', description: 'Current rating value (0–max).' },
      { name: 'max', type: 'number', default: '5', description: 'Total number of stars.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Star size.' },
      { name: 'color', type: "'default' | 'amber' | 'orange' | 'red' | 'green' | 'blue' | 'violet'", default: "'default'", description: 'Fill color of active stars.' },
      { name: 'precision', type: "'full' | 'half'", default: "'half'", description: 'Whether to render half-star fills for fractional ratings.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show numeric value label next to the stars.' },
      { name: 'onChange', type: '(value: number) => void', description: 'When provided, enables click-to-rate interaction.' },
      { name: 'readOnly', type: 'boolean', default: 'false', description: 'Disables interaction even when onChange is present.' },
    ],
  },

  'color-tile': {
    slug: 'color-tile',
    name: 'Color Tile',
    description: 'Solid-color classification tile with a label and optional sublabel. Ideal for category grids, SDG alignments, priority indicators, and status tiles.',
    importPath: '@/ascendra-ui',
    importNames: ['ColorTile', 'ColorTileTitle', 'ColorTileSubTitle'],
    props: [
      { name: 'variant (ColorTile)', type: "'primary' | 'gray' | 'green' | 'emerald' | 'blue' | 'sky' | 'orange' | 'amber' | 'yellow' | 'red' | 'rose' | 'violet' | 'pink' | 'indigo' | 'teal' | 'cyan'", default: "'primary'", description: 'Solid background color of the tile.' },
      { name: 'className (ColorTile)', type: 'string', description: 'Additional CSS classes — use to control width, height, or padding.' },
      { name: 'className (ColorTileTitle)', type: 'string', description: 'Override the default text-xs font-bold opacity-80 styles.' },
      { name: 'className (ColorTileSubTitle)', type: 'string', description: 'Override the default text-[0.6rem] font-semibold leading-tight styles.' },
    ],
  },

  'simple-badge': {
    slug: 'simple-badge',
    name: 'Simple Badge',
    description: 'Small inline status badge for labeling content with semantic color variants.',
    importPath: '@/ascendra-ui',
    importNames: ['SimpleBadge'],
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'orange' | 'green' | 'blue' | 'red' | 'amber' | 'violet' | 'warning' | 'positive' | 'info'", default: "'default'", description: 'Color variant of the badge.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render as a child element using Radix Slot.' },
      { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    ],
  },

  'bubble-badge': {
    slug: 'bubble-badge',
    name: 'Bubble Badge',
    description: 'Gradient pill badges with inset highlight, available in multiple sizes and colors.',
    importPath: '@/ascendra-ui',
    importNames: ['BubbleBadge'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Size of the badge.' },
      { name: 'color', type: "'gray' | 'blue' | 'green' | 'red' | 'amber' | 'orange' | 'violet' | 'warning' | 'positive' | 'info'", default: "'gray'", description: 'Color variant.' },
    ],
  },

  'status-dot': {
    slug: 'status-dot',
    name: 'Status Dot',
    description: 'Tiny status indicator dot with a halo shadow ring, available in semantic colors.',
    importPath: '@/ascendra-ui',
    importNames: ['StatusDot'],
    props: [
      { name: 'variant', type: "'orange' | 'emerald' | 'sky' | 'violet' | 'rose' | 'amber' | 'red' | 'primary' | 'gray' | 'warning' | 'positive' | 'info'", default: "'gray'", description: 'Color variant.' },
    ],
  },

  'simple-alert': {
    slug: 'simple-alert',
    name: 'Simple Alert',
    description: 'Compact alert notification box with semantic severity variants and an optional icon.',
    importPath: '@/ascendra-ui',
    importNames: ['SimpleAlert', 'AlertIcon'],
    props: [
      { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'amber' | 'primary'", default: "'default'", description: 'Alert severity variant.' },
      { name: 'icon', type: 'React.ComponentType<{ className?: string; strokeWidth?: number }>', description: 'Icon component to display (defaults to InfoIcon).' },
    ],
  },

  'pro-badge': {
    slug: 'pro-badge',
    name: 'Pro Badge',
    description: 'Premium feature indicator with a blue-purple gradient treatment.',
    importPath: '@/ascendra-ui',
    importNames: ['ProBadge'],
    props: [],
  },

  'button': {
    slug: 'button',
    name: 'Button',
    description: 'Primary CTA button with a 4-layer shadow and gloss system, available in multiple variants and sizes.',
    importPath: '@/ascendra-ui',
    importNames: ['Button'],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'destructive' | 'ghost' | 'link'", default: "'primary'", description: 'Visual style of the button.' },
      { name: 'size', type: "'xs' | 'sm' | 'default' | 'lg' | 'icon'", default: "'default'", description: 'Size of the button.' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render as a child element using Radix Slot.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    ],
  },

  'input': {
    slug: 'input',
    name: 'Input',
    description: 'Text input with smart focus: shadow ring for pointer interactions, outline for keyboard navigation.',
    importPath: '@/ascendra-ui',
    importNames: ['Input'],
    props: [
      { name: 'full', type: 'boolean', default: 'false', description: 'Expands input to full container width.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    ],
  },

  'input-group': {
    slug: 'input-group',
    name: 'Input Group',
    description: 'Composite input system with prefix/suffix text, icon addons, and button addons.',
    importPath: '@/ascendra-ui',
    importNames: ['InputGroup', 'InputGroupAddon', 'InputGroupButton', 'InputGroupText', 'InputGroupInput', 'InputGroupTextarea'],
    props: [
      { name: 'align', type: "'inline-start' | 'inline-end' | 'block-start' | 'block-end'", description: 'Position of the addon relative to the input (on InputGroupAddon).' },
    ],
  },

  'checkbox': {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Custom checkbox with gradient overlay and shadow ring on the checked state.',
    importPath: '@/ascendra-ui',
    importNames: ['Checkbox'],
    props: [
      { name: 'checked', type: 'boolean | "indeterminate"', description: 'Controlled checked state.' },
      { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled default checked state.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback fired when the state changes.' },
    ],
  },

  'radio-group': {
    slug: 'radio-group',
    name: 'Radio Group',
    description: 'Custom radio group with glow and gloss effects on the selected item.',
    importPath: '@/ascendra-ui',
    importNames: ['RadioGroup', 'RadioGroupItem'],
    props: [
      { name: 'value', type: 'string', description: 'Controlled selected value.' },
      { name: 'defaultValue', type: 'string', description: 'Uncontrolled default selected value.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire group.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback fired when selection changes.' },
      { name: 'wrapperClassName', type: 'string', description: 'Additional classes for the item wrapper (on RadioGroupItem).' },
    ],
  },

  'switch': {
    slug: 'switch',
    name: 'Switch',
    description: 'Toggle switch with a gradient overlay on the active track.',
    importPath: '@/ascendra-ui',
    importNames: ['Switch'],
    props: [
      { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
      { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled default checked state.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback fired when toggled.' },
    ],
  },

  'select': {
    slug: 'select',
    name: 'Select',
    description: 'Custom select dropdown with scroll buttons and size variants.',
    importPath: '@/ascendra-ui',
    importNames: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectGroup', 'SelectLabel', 'SelectValue', 'SelectSeparator'],
    props: [
      { name: 'size', type: "'sm' | 'default'", default: "'default'", description: 'Size of the trigger (on SelectTrigger).' },
      { name: 'position', type: "'popper' | 'item-aligned'", default: "'popper'", description: 'Positioning strategy of the dropdown (on SelectContent).' },
    ],
  },

  'anchor': {
    slug: 'anchor',
    name: 'Anchor',
    description: 'Styled link component with semantic color variants and keyboard focus states.',
    importPath: '@/ascendra-ui',
    importNames: ['Anchor'],
    props: [
      { name: 'variant', type: "'primary' | 'blue' | 'muted'", default: "'primary'", description: 'Color variant.' },
      { name: 'href', type: 'string', description: 'Link destination URL.' },
    ],
  },

  'nav-link': {
    slug: 'nav-link',
    name: 'Nav Link',
    description: 'Navigation link with an active underline indicator driven by the current pathname.',
    importPath: '@/ascendra-ui',
    importNames: ['NavLink', 'NavLinkBadge'],
    props: [
      { name: 'href', type: 'string', description: 'Link destination URL.' },
      { name: 'exact', type: 'boolean', default: 'false', description: 'Only active when the path matches exactly.' },
    ],
  },

  'header': {
    slug: 'header',
    name: 'Header',
    description: 'Top navigation header with breadcrumb links, slash separators, chevrons, and action slots.',
    importPath: '@/ascendra-ui',
    importNames: ['Header', 'HeaderLink', 'HeaderSlash', 'HeaderChevron', 'HeaderActions', 'HeaderLinks'],
    props: [],
  },

  'dialog': {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Modal dialog with header, body, and footer slots. Centered overlay with max-w-sm default.',
    importPath: '@/ascendra-ui',
    importNames: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogBody', 'DialogFooter', 'DialogClose'],
    props: [
      { name: 'showCloseButton', type: 'boolean', default: 'false', description: 'Show the × close button in the top-right corner (on DialogContent).' },
      { name: 'footer', type: 'ReactNode', description: 'Footer content slot (on DialogContent).' },
    ],
  },

  'sheet': {
    slug: 'sheet',
    name: 'Sheet',
    description: 'Slide-out drawer panel that opens from any edge of the screen.',
    importPath: '@/ascendra-ui',
    importNames: ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetBody', 'SheetFooter', 'SheetClose'],
    props: [
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'right'", description: 'Edge the sheet slides in from (on SheetContent).' },
      { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show the × close button (on SheetContent).' },
    ],
  },

  'dropdown-menu': {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    description: 'Full-featured dropdown with items, separators, checkboxes, radio groups, and sub-menus.',
    importPath: '@/ascendra-ui',
    importNames: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuSeparator', 'DropdownMenuLabel', 'DropdownMenuCheckboxItem', 'DropdownMenuRadioItem', 'DropdownMenuSub', 'DropdownMenuSubTrigger', 'DropdownMenuSubContent', 'DropdownMenuShortcut'],
    props: [
      { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'Color variant for DropdownMenuItem.' },
      { name: 'inset', type: 'boolean', description: 'Add left padding to align items without icons (on DropdownMenuItem).' },
    ],
  },

  'table': {
    slug: 'table',
    name: 'Table',
    description: 'Data table with header, body, footer, scrollable container, and optional accent border and gradient background.',
    importPath: '@/ascendra-ui',
    importNames: ['Table', 'TableWrapper', 'TableHeader', 'TableHeaderRow', 'TableBody', 'TableRow', 'TableHead', 'TableCell', 'TableFooter', 'TableFoot', 'EmptyBody'],
    props: [
      // Table
      { name: 'scrollable', type: 'boolean', default: 'false', description: 'Enables scroll on the table container.' },
      { name: 'vertical', type: 'boolean', default: 'false', description: 'Enables vertical (y-axis) scroll.' },
      { name: 'horizontal', type: 'boolean', default: 'true', description: 'Enables horizontal (x-axis) scroll.' },
      { name: 'height', type: 'number', description: 'Max height in px when vertical scroll is enabled.' },
      { name: 'minHeight', type: 'number', description: 'Minimum height in px for the table container.' },
      // TableWrapper
      { name: 'border (TableWrapper)', type: 'BorderConfig', description: 'Optional accent border on the outer wrapper.' },
      // TableBody
      { name: 'border (TableBody)', type: 'BorderConfig', description: 'Optional accent border on the ::before panel element.' },
      { name: 'bg (TableBody)', type: 'BgConfig', description: 'Optional gradient background on the ::before panel. Removes solid bg when set.' },
      // BorderConfig
      { name: 'border.side', type: "'t' | 'l' | 'r' | 'b'", default: "'t'", description: 'Side the border appears on.' },
      { name: 'border.stroke', type: '1 | 2 | 3', default: '3', description: 'Border thickness in px.' },
      { name: 'border.color', type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'", default: "'orange'", description: 'Accent color at 60% opacity.' },
      // BgConfig
      { name: 'bg.style', type: "'linear' | 'radial' | 'conic'", default: "'linear'", description: 'CSS gradient type.' },
      { name: 'bg.side', type: "'t' | 'l' | 'r' | 'b'", default: "'b'", description: 'Gradient direction (linear only).' },
      { name: 'bg.color', type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'", default: "'orange'", description: 'Start color at 7% opacity.' },
      { name: 'bg.to', type: "'transparent' | 'white' | 'black' | AccentColor", default: "'transparent'", description: 'End stop color. Accent colors resolve to 500/60.' },
    ],
  },

  'empty': {
    slug: 'empty',
    name: 'Empty State',
    description: 'Placeholder for empty content areas with optional icon media and call-to-action.',
    importPath: '@/ascendra-ui',
    importNames: ['Empty', 'EmptyHeader', 'EmptyTitle', 'EmptyDescription', 'EmptyContent', 'EmptyMedia'],
    props: [
      { name: 'variant', type: "'default' | 'icon'", default: "'default'", description: 'Media display style (on EmptyMedia).' },
    ],
  },

  'card': {
    slug: 'card',
    name: 'Card',
    description: 'Settings-style card with header, collapsible panel, panel items, field, crown badge, and footer. Supports accent border and gradient background on the panel.',
    importPath: '@/ascendra-ui',
    importNames: ['Card', 'CardHeader', 'CardHeaderTitle', 'CardHeaderSubtitle', 'CardPanel', 'CardFooter', 'CardFooterIcon', 'CardPanelItem', 'CardPanelItemGroup', 'CardPanelItemCrown', 'CardPanelField'],
    props: [
      { name: 'danger', type: 'boolean', default: 'false', description: 'Applies red danger styling (on Card).' },
      { name: 'collapseable', type: "'expanded' | 'collapsed'", description: 'Enables collapse with toggle in CardHeader.' },
      { name: 'hasError', type: 'boolean', default: 'false', description: 'Shows a destructive outline ring when collapsed (on Card).' },
      { name: 'border', type: 'BorderConfig', description: 'Optional accent border on Card or CardPanel.' },
      { name: 'bg', type: 'BgConfig', description: 'Optional gradient background on CardPanel.' },
      { name: 'collapsed', type: 'boolean', description: 'Collapses the item/field to zero height (on CardPanelItem / CardPanelField).' },
      { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning'", default: "'default'", description: 'Crown badge color (on CardPanelItemCrown).' },
      { name: 'nudge', type: 'boolean', default: 'false', description: 'Attention-pulse animation (on CardPanelItemCrown).' },
      { name: 'nudgeVariant', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning'", default: "'warning'", description: 'Nudge color override (on CardPanelItemCrown).' },
    ],
  },

  'page-header': {
    slug: 'page-header',
    name: 'Page Header',
    description: 'Page-level header with title, subtitle, and an action slot. Composes PageHeaderGroup, PageTitle, PageSubtitle, and PageHeaderAction.',
    importPath: '@/ascendra-ui',
    importNames: ['PageHeader', 'PageHeaderGroup', 'PageTitle', 'PageSubtitle', 'PageHeaderAction'],
    props: [],
  },

  'page-bar': {
    slug: 'page-bar',
    name: 'Page Bar',
    description: 'Horizontal toolbar for search, filters, and primary actions above page content.',
    importPath: '@/ascendra-ui',
    importNames: ['PageBar', 'PageBarContent', 'PageBarAction'],
    props: [],
  },

  'aside-content': {
    slug: 'aside-content',
    name: 'Aside Content',
    description: 'Aside panel with optional dimmed state and gradient mask for overflow content on mobile.',
    importPath: '@/ascendra-ui',
    importNames: ['AsideContent'],
    props: [
      { name: 'dimmed', type: 'boolean', default: 'false', description: 'Applies a dim overlay on the aside.' },
    ],
  },

  'tabs': {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Tabbed navigation with dirty-state dot indicator and disabled tab support.',
    importPath: '@/ascendra-ui',
    importNames: ['Tabs', 'TabList', 'TabTrigger', 'TabContent'],
    props: [
      { name: 'defaultValue', type: 'string', description: 'Initially active tab value (uncontrolled).' },
      { name: 'value', type: 'string', description: 'Controlled active tab value.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when the active tab changes.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable a tab trigger (on TabTrigger).' },
      { name: 'dirty', type: 'boolean', default: 'false', description: 'Show unsaved-changes dot on a tab trigger (on TabTrigger).' },
    ],
  },

  'sidebar-menu': {
    slug: 'sidebar-menu',
    name: 'Sidebar Menu',
    description: 'Expandable sidebar navigation with grouped menu sets, icon headers, and active link detection.',
    importPath: '@/ascendra-ui',
    importNames: [
      'SideBar', 'useSideBar', 'SideBarFooter', 'SideBarHeader', 'SideBarMain', 'SideBarOverlay', 'SideBarToggle',
      'SideBarMenu', 'SideBarMenuHeader', 'SideBarMenuContent', 'SideBarMenuItem', 'SideBarMenuItemGroup', 'SideBarMenuSet', 'SideBarMenuSetTitle',
    ],
    props: [
      { name: 'basePath', type: 'string', description: 'Base path used for active link detection (on SideBarMenu).' },
      { name: 'icon', type: 'IconType', description: 'Icon for the menu header (on SideBarMenuHeader).' },
      { name: 'path', type: 'string', description: 'Link path for the menu item (on SideBarMenuItem).' },
      { name: 'alternate', type: "'default' | 'stand-alone'", default: "'default'", description: 'Layout variant for the menu item.' },
    ],
  },

  'copy-text': {
    slug: 'copy-text',
    name: 'Copy Text',
    description: 'Inline copy-to-clipboard trigger with icon feedback and an optional tooltip confirmation.',
    importPath: '@/ascendra-ui',
    importNames: ['CopyText'],
    props: [
      { name: 'value', type: 'string', description: 'Text to copy to the clipboard.' },
      { name: 'opaque', type: 'boolean', default: 'false', description: 'Show the copy icon without hover (always visible).' },
      { name: 'timeout', type: 'number', default: '1200', description: 'Duration in ms before resetting the copied state.' },
      { name: 'showTooltip', type: 'boolean', default: 'false', description: 'Show a "Copied" tooltip confirmation on click.' },
      { name: 'onClick', type: '(e: MouseEvent) => void | Promise<string>', description: 'Custom click handler; return a string to override what gets copied.' },
    ],
  },

  'name-avatar': {
    slug: 'name-avatar',
    name: 'Name Avatar',
    description: 'Auto-generated avatar from name initials with a deterministic background color derived from the name.',
    importPath: '@/ascendra-ui',
    importNames: ['NameAvatar'],
    props: [
      { name: 'name', type: 'string', description: 'Full name to generate initials from.' },
      { name: 'size', type: 'number', default: '28', description: 'Avatar size in pixels.' },
      { name: 'href', type: 'string', description: 'Optional URL — wraps avatar in a link.' },
    ],
  },

  'theme-toggle': {
    slug: 'theme-toggle',
    name: 'Theme Toggle',
    description: 'Dark/light mode toggle button powered by next-themes.',
    importPath: '@/ascendra-ui',
    importNames: ['ThemeToggle'],
    props: [],
  },

  'pagination-button': {
    slug: 'pagination-button',
    name: 'Pagination Button',
    description: 'Small bordered navigation button for pagination controls.',
    importPath: '@/ascendra-ui',
    importNames: ['PaginationButton'],
    props: [],
  },

  'row-action-button': {
    slug: 'row-action-button',
    name: 'Row Action Button',
    description: 'Icon button for table row actions — hidden by default, visible on row hover.',
    importPath: '@/ascendra-ui',
    importNames: ['RowActionButton'],
    props: [
      { name: 'opaque', type: 'boolean', default: 'false', description: 'Show the button without row hover (always visible).' },
    ],
  },

  'field': {
    slug: 'field',
    name: 'Field',
    description: 'Compound form field wrapper with label, description, error display, and orientation variants.',
    importPath: '@/ascendra-ui',
    importNames: ['Field', 'FieldSet', 'FieldLegend', 'FieldGroup', 'FieldContent', 'FieldLabel', 'FieldTitle', 'FieldDescription', 'FieldSeparator', 'FieldError'],
    props: [
      { name: 'orientation', type: "'vertical' | 'horizontal' | 'responsive'", default: "'vertical'", description: 'Layout direction of the label and control (on Field).' },
      { name: 'variant', type: "'legend' | 'label'", default: "'legend'", description: 'Typography style for FieldLegend.' },
      { name: 'errors', type: 'Array<{ message?: string }>', description: 'Array of error objects — deduplicates and displays messages (on FieldError).' },
    ],
  },

  'table-lookup': {
    slug: 'table-lookup',
    name: 'Table Lookup',
    description: 'Table-based lookup field for large datasets — supports single and multi-select with chips, async search, and configurable multi-column display.',
    importPath: '@/ascendra-ui',
    importNames: ['TableLookup'],
    props: [
      { name: 'columns', type: 'TableLookupColumn<T>[]', description: 'Column definitions — drives table headers and searchable field list.' },
      { name: 'valueKey', type: 'keyof T & string', description: 'Key used as the unique identifier for each record.' },
      { name: 'labelKey', type: 'keyof T & string', description: 'Key whose value is shown in chips and the single-mode trigger.' },
      { name: 'mode', type: "'single' | 'multiple'", default: "'single'", description: 'Single replaces the selection on each pick; multiple accumulates chips.' },
      { name: 'onSearch', type: '(query: string, field?: string) => Promise<T[]> | T[]', description: 'Called to load or filter data. Receives the search string and optional field key.' },
      { name: 'value', type: 'T | T[] | null', description: 'Controlled selected value(s).' },
      { name: 'onChange', type: '(value: T | T[] | null) => void', description: 'Called when the selection changes.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text shown when nothing is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger and prevents the popup from opening.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Applies a destructive outline to the trigger to signal a validation error.' },
    ],
  },

  'combobox': {
    slug: 'combobox',
    name: 'Combobox',
    description: 'Searchable dropdown with single and multi-select (chips) modes, built on Base UI.',
    importPath: '@/ascendra-ui',
    importNames: ['Combobox', 'ComboboxInput', 'ComboboxContent', 'ComboboxList', 'ComboboxItem', 'ComboboxGroup', 'ComboboxLabel', 'ComboboxEmpty', 'ComboboxSeparator', 'ComboboxChips', 'ComboboxChip', 'ComboboxChipsInput'],
    props: [
      { name: 'showTrigger', type: 'boolean', default: 'true', description: 'Show the chevron toggle button (on ComboboxInput).' },
      { name: 'showClear', type: 'boolean', default: 'false', description: 'Show the × clear button (on ComboboxInput).' },
      { name: 'showRemove', type: 'boolean', default: 'true', description: 'Show the × remove button on each chip (on ComboboxChip).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input (on ComboboxInput).' },
    ],
  },

  'nav': {
    slug: 'nav',
    name: 'Nav',
    description: 'Sticky horizontal navigation bar with muted background and horizontally scrollable content area.',
    importPath: '@/ascendra-ui',
    importNames: ['Nav'],
    props: [],
  },

  'unsaved-changes-bar': {
    slug: 'unsaved-changes-bar',
    name: 'Unsaved Changes Bar',
    description: 'Fixed bottom bar that surfaces when a form has unsaved changes, with save/reset actions and status states.',
    importPath: '@/ascendra-ui',
    importNames: ['UnsavedChangesBar'],
    props: [
      { name: 'isDirty', type: 'boolean', description: 'Shows the bar when true.' },
      { name: 'isSaving', type: 'boolean', description: 'Shows a loading spinner and hides action buttons.' },
      { name: 'isValid', type: 'boolean', description: 'When false on Save click, triggers nudge animation and validation message.' },
      { name: 'onSave', type: '() => boolean | Promise<boolean> | void', description: 'Called on Save; return true for success, false for error.' },
      { name: 'onReset', type: '() => void', description: 'Called on Reset click.' },
      { name: 'onInvalid', type: '() => void', description: 'Called when Save is clicked on an invalid form — use to trigger field-level errors.' },
      { name: 'message', type: 'string', default: "'Unsaved changes'", description: 'Idle state message.' },
      { name: 'saveLabel', type: 'string', default: "'Save'", description: 'Save button label.' },
      { name: 'resetLabel', type: 'string', default: "'Reset'", description: 'Reset button label.' },
      { name: 'className', type: 'string', description: 'Extra classes on the outer wrapper — use to offset centering when a sidebar is present.' },
    ],
  },

  'scroll-to-top': {
    slug: 'scroll-to-top',
    name: 'Scroll To Top',
    description: 'Behavior-only component that scrolls the window to the top on every route change and disables browser scroll restoration.',
    importPath: '@/ascendra-ui',
    importNames: ['ScrollToTop'],
    props: [],
  },

  'calendar': {
    slug: 'calendar',
    name: 'Calendar',
    description: 'Full-featured calendar built on react-day-picker. Supports single, multiple, and range selection with optional month/year dropdowns.',
    importPath: '@/ascendra-ui',
    importNames: ['Calendar'],
    props: [
      { name: 'mode', type: "'single' | 'multiple' | 'range'", description: 'Selection mode.' },
      { name: 'selected', type: 'Date | Date[] | DateRange | undefined', description: 'Controlled selected value.' },
      { name: 'onSelect', type: 'function', description: 'Called when the selection changes.' },
      { name: 'showOutsideDays', type: 'boolean', default: 'true', description: 'Show days from adjacent months.' },
      { name: 'captionLayout', type: "'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'", description: "Caption style. Defaults to 'dropdown' when startMonth/endMonth are set." },
      { name: 'startMonth', type: 'Date', description: 'Earliest month available — also enables the dropdown caption.' },
      { name: 'endMonth', type: 'Date', description: 'Latest month available.' },
      { name: 'numberOfMonths', type: 'number', default: '1', description: 'Number of months to display side-by-side.' },
    ],
  },

  'date-picker': {
    slug: 'date-picker',
    name: 'Date Picker',
    description: 'Popover-based single date picker with a trigger button and an embedded Calendar.',
    importPath: '@/ascendra-ui',
    importNames: ['DatePicker'],
    props: [
      { name: 'value', type: 'Date | undefined', description: 'Controlled selected date.' },
      { name: 'onChange', type: '(date: Date | undefined) => void', description: 'Called when the date changes.' },
      { name: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Trigger button placeholder text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Applies destructive outline to the trigger.' },
      { name: 'fromYear', type: 'number', description: 'Enables year/month dropdown starting from this year.' },
      { name: 'toYear', type: 'number', description: 'Enables year/month dropdown ending at this year.' },
      { name: 'captionLayout', type: "CalendarProps['captionLayout']", description: 'Caption style passed to the inner Calendar.' },
    ],
  },

  'date-range-picker': {
    slug: 'date-range-picker',
    name: 'Date Range Picker',
    description: 'Popover-based date range picker with configurable month count and an embedded range Calendar.',
    importPath: '@/ascendra-ui',
    importNames: ['DateRangePicker'],
    props: [
      { name: 'value', type: 'DateRange | undefined', description: 'Controlled selected range ({ from, to }).' },
      { name: 'onChange', type: '(range: DateRange | undefined) => void', description: 'Called when the range changes.' },
      { name: 'placeholder', type: 'string', default: "'Pick a date range'", description: 'Trigger button placeholder text.' },
      { name: 'numberOfMonths', type: 'number', default: '2', description: 'Number of calendar months shown in the popover.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Applies destructive outline to the trigger.' },
      { name: 'fromYear', type: 'number', description: 'Enables year/month dropdown starting from this year.' },
      { name: 'toYear', type: 'number', description: 'Enables year/month dropdown ending at this year.' },
    ],
  },

  'data-table': {
    slug: 'data-table',
    name: 'Data Table',
    description: 'Feature-rich data table with built-in search, filtering, sorting, column management, and pagination — composed via DataTableProvider and QueryProvider.',
    importPath: '@/ascendra-ui',
    importNames: [
      'DataTable', 'DataTableHeader', 'DataTableHeaderRow', 'DataTableHead',
      'DataTableBody', 'DataTableRow', 'DataTableCell', 'DataTableHighlight',
      'DataTableWrapper', 'DataTableFoot', 'DataTableLoadingBody', 'DataTableEmptyBody',
      'DataTableSearchInput', 'DataTableColumnManager', 'DataTableSortDropdown',
      'DataTableFilterDropdown', 'DataTableFilterBar', 'DataTableFilterItem',
      'DataTableSortIcon', 'DataTableCheckboxCell', 'DataTableCheckboxHead',
      'DataTableErrorBody', 'DataTableBar', 'DataTableBarAction', 'DataTableBarContent',
      'DataTableHeadAction', 'DataTableHeadActionItem',
      'DataTableExportHeadAction', 'DataTableRefreshHeadAction',
      'DataTableManageColumnsHeadAction', 'DataTableBulkExportHeadAction', 'DataTableBulkDeleteHeadAction',
      'DataTableRowAction', 'DataTableRowActionItem',
      'DataTableEditRowAction', 'DataTableDuplicateRowAction', 'DataTableDeleteRowAction', 'DataTableViewRowAction',
      'BatchNavigator', 'ManageQueriesDialog', 'QueryBar', 'QueryFieldRenderer', 'QueryParamPanel', 'SaveQueryDialog',
    ],
    props: [
      { name: 'key',          type: 'keyof T',                  description: 'Data property key for this column.' },
      { name: 'label',        type: 'string',                   description: 'Column header label.' },
      { name: 'type',         type: "'string' | 'number' | 'date'", default: "'string'", description: 'Data type — drives sort order and search formatting.' },
      { name: 'sortable',     type: 'boolean',                  default: 'true',    description: 'Set to false to remove the sort icon and click handler.' },
      { name: 'freeze',       type: 'boolean',                  default: 'false',   description: 'Always visible; cannot be hidden via the column manager.' },
      { name: 'locked',       type: 'boolean',                  default: 'false',   description: 'Column position cannot be changed by reordering.' },
      { name: 'active',       type: 'boolean',                  default: 'true',    description: 'Whether the column is visible by default.' },
      { name: 'filter',       type: 'boolean',                  default: 'false',   description: 'Whether the column appears in the filter picker.' },
      { name: 'displayValue', type: '(raw: string) => string',  description: 'Converts raw data values to labels in filter chips and options.' },
    ],
  },

  'item': {
    slug: 'item',
    name: 'Item',
    description: 'Flexible list item with media, title, description, actions, header, and footer slots. Supports outline and muted variants.',
    importPath: '@/ascendra-ui',
    importNames: ['Item', 'ItemMedia', 'ItemContent', 'ItemTitle', 'ItemDescription', 'ItemActions', 'ItemGroup', 'ItemSeparator', 'ItemHeader', 'ItemFooter'],
    props: [
      { name: 'variant', type: "'default' | 'outline' | 'muted'", default: "'default'", description: 'Border and background style of the item (on Item).' },
      { name: 'size', type: "'default' | 'sm' | 'xs'", default: "'default'", description: 'Padding and gap size (on Item).' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Render as a child element using Radix Slot (on Item).' },
      { name: 'variant', type: "'default' | 'icon' | 'image'", default: "'default'", description: 'Media display type (on ItemMedia).' },
    ],
  },

  'tooltips': {
    slug: 'tooltips',
    name: 'Tooltip',
    description: 'Floating label that appears on hover or focus. Wraps Radix UI Tooltip with TooltipProvider, all four placements, and rich content support.',
    importPath: '@/ascendra-ui/shadcn',
    importNames: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
    props: [
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Which side the tooltip appears on (on TooltipContent).' },
      { name: 'sideOffset', type: 'number', default: '4', description: 'Distance in px between trigger and tooltip (on TooltipContent).' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment relative to the trigger (on TooltipContent).' },
      { name: 'delayDuration', type: 'number', default: '700', description: 'Hover delay in ms before showing (on TooltipProvider).' },
    ],
  },

  'progress': {
    slug: 'progress',
    name: 'Progress & Stepper',
    description: 'ProgressBar wraps Radix Progress with size and color variants plus an indeterminate animation. Stepper is a fully custom horizontal step indicator with four statuses.',
    importPath: '@/ascendra-ui',
    importNames: ['ProgressBar', 'Stepper'],
    props: [
      { name: 'value', type: 'number', description: 'ProgressBar — progress value 0–100. Omit for indeterminate.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'ProgressBar — bar height.' },
      { name: 'color', type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: 'ProgressBar — fill color.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'ProgressBar — looping animation when progress is unknown.' },
      { name: 'steps', type: 'StepperItem[]', description: 'Stepper — array of step objects with label, optional description, and optional status.' },
      { name: 'currentStep', type: 'number', description: 'Stepper — active step index. Drives completed/active/pending status automatically.' },
    ],
  },

  'skeleton': {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Animated loading placeholder. Includes preset compositions for text blocks, user rows, stat tiles, cards, and table rows — built on shadcn skeleton.',
    importPath: '@/ascendra-ui',
    importNames: ['Skeleton', 'SkeletonText', 'SkeletonUser', 'SkeletonCard', 'SkeletonTableRow', 'SkeletonTable', 'SkeletonStat'],
    props: [
      { name: 'className', type: 'string', description: 'Skeleton — additional CSS classes to set size and shape.' },
      { name: 'lines', type: 'number', default: '3', description: 'SkeletonText — number of text lines.' },
      { name: 'rows', type: 'number', default: '5', description: 'SkeletonTable — number of data rows.' },
    ],
  },

  'command-palette': {
    slug: 'command-palette',
    name: 'Command Palette',
    description: 'Keyboard-first command palette dialog built on shadcn Command + Dialog. Groups commands with icons and shortcuts. Registers ⌘K/Ctrl+K via useCommandPalette hook.',
    importPath: '@/ascendra-ui',
    importNames: ['CommandPalette', 'useCommandPalette'],
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
      { name: 'groups', type: 'CommandPaletteGroup[]', description: 'Array of grouped command items.' },
      { name: 'placeholder', type: 'string', default: "'Search commands…'", description: 'Search input placeholder.' },
      { name: 'emptyMessage', type: 'string', default: "'No results found.'", description: 'Message shown when no items match.' },
    ],
  },

  'file-upload': {
    slug: 'file-upload',
    name: 'File Upload',
    description: 'Fully custom file upload with three variants (dropzone, button, inline) and five controlled states (idle, dragover, uploading, success, error). Includes drag-and-drop, type validation, size limits, and a progress bar.',
    importPath: '@/ascendra-ui',
    importNames: ['FileUpload'],
    props: [
      { name: 'variant', type: "'dropzone' | 'button' | 'inline'", default: "'dropzone'", description: 'Layout variant.' },
      { name: 'accept', type: 'string', description: 'Comma-separated accepted extensions or MIME types.' },
      { name: 'maxSize', type: 'number', description: 'Max file size in bytes — validated client-side.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting multiple files.' },
      { name: 'state', type: "'idle' | 'dragover' | 'uploading' | 'success' | 'error'", default: "'idle'", description: 'Controlled state override.' },
      { name: 'uploadProgress', type: 'number', description: 'Progress 0–100 shown during uploading state.' },
      { name: 'errorMessage', type: 'string', description: 'Error text in error state.' },
      { name: 'onFiles', type: '(files: File[]) => void', description: 'Called with validated files when selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interactions.' },
    ],
  },

  'rich-text-editor': {
    slug: 'rich-text-editor',
    name: 'Rich Text Editor',
    description: 'Tiptap-based rich text editor with a 6-action toolbar (bold, italic, strike, bullet list, numbered list, link). Controlled value/onChange API compatible with react-hook-form. Matches input ring and shadow tokens.',
    importPath: '@/ascendra-ui',
    importNames: ['RichTextEditor'],
    props: [
      { name: 'value', type: 'string', description: 'Controlled HTML content.' },
      { name: 'onChange', type: '(html: string) => void', description: 'Called with full HTML on every change.' },
      { name: 'placeholder', type: 'string', default: "'Write something…'", description: 'Placeholder shown in the empty editor.' },
      { name: 'readOnly', type: 'boolean', default: 'false', description: 'Hides toolbar and disables editing.' },
      { name: 'minHeight', type: 'number', default: '120', description: 'Min height of the editor area in px.' },
      { name: 'className', type: 'string', description: 'Additional CSS classes on the container.' },
    ],
  },

  'toasts': {
    slug: 'toasts',
    name: 'Toast',
    description: 'Lightweight, accessible toast notifications powered by Sonner. Mount <Toaster /> once in the root layout and call toast() from anywhere.',
    importPath: '@/ascendra-ui',
    importNames: ['toast', 'Toaster'],
    props: [
      { name: 'description', type: 'string', description: 'Optional supporting text shown below the title.' },
      { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Inline action button shown inside the toast.' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in milliseconds. Pass Infinity to persist.' },
      { name: 'id', type: 'string | number', description: 'Unique ID for updating or dismissing a specific toast.' },
    ],
  },

  'color-picker': {
    slug: 'color-picker',
    name: 'Color Picker',
    description: 'Fully custom color picker using Radix DropdownMenu as the floating shell — the same token-aligned popover as all other dropdowns. Supports HSL sliders, hex input, and a configurable preset grid.',
    importPath: '@/ascendra-ui',
    importNames: ['ColorPicker'],
    props: [
      { name: 'value', type: 'string', default: "'#2563eb'", description: 'Controlled hex color value (6-digit).' },
      { name: 'onChange', type: '(hex: string) => void', description: 'Called with the new hex when the color changes.' },
      { name: 'presets', type: 'string[]', description: 'Array of hex preset swatches. Defaults to a 30-color system palette.' },
      { name: 'presetsOnly', type: 'boolean', default: 'false', description: 'Hide sliders and hex input — show only the preset grid.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents opening the picker.' },
      { name: 'className', type: 'string', description: 'Additional CSS classes on the trigger button.' },
    ],
  },
};
