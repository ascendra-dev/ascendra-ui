export type PropDef = {
  name: string;
  type: string;
  default?: string;
  description: string;
  /** Which sub-component this prop belongs to, e.g. "SelectContent". Shown in the props table. */
  component?: string;
};

export type ComponentMeta = {
  slug: string;
  name: string;
  description: string;
  importPath: string;
  importNames: string[];
  props?: PropDef[];
  /** Short JSX snippets that show how to use the component. Rendered as code blocks in the reference. */
  examples?: string[];
};

export type NavItem = {
  name: string;
  slug: string;
};

export type NavCategory = {
  title: string;
  items: NavItem[];
};

export type FormComplexity = 'Simple' | 'Medium' | 'Complex';

export type FormMeta = {
  slug: string;
  name: string;
  description: string;
  domain: string;
  complexity: FormComplexity;
  layout: string;
  components: string[];
  hasEditMode?: boolean;
};

export type DialogType = 'Confirmation' | 'Destructive' | 'Input' | 'Alert' | 'Feature';

export type DialogMeta = {
  slug: string;
  name: string;
  description: string;
  type: DialogType;
  components: string[];
};

export type SheetType = 'Detail' | 'Preview' | 'Activity' | 'Settings';

export type DrawerType = 'Action' | 'Panel' | 'Preview' | 'Input';

export type SheetMeta = {
  slug: string;
  name: string;
  description: string;
  type: SheetType;
  domain: string;
  components: string[];
};

export type DrawerMeta = {
  slug: string;
  name: string;
  description: string;
  type: DrawerType;
  domain: string;
  components: string[];
};

export type ReportComplexity = 'Simple' | 'Medium' | 'Complex';
export type ReportLayout = 'Document' | 'Wide' | 'Mixed';
export type ReportType = 'Executive' | 'Financial' | 'Operational' | 'Performance' | 'Clinical' | 'Compliance';
export type ReportStatus = 'available' | 'coming-soon';

export type ReportMeta = {
  slug: string;
  name: string;
  domain: string;
  complexity: ReportComplexity;
  layout: ReportLayout;
  reportType: ReportType;
  description: string;
  keyMetrics: [string, string, string, string];
  elements: string[];
  status: ReportStatus;
};

export type LayoutCellHeight = 'sm' | 'md' | 'lg' | 'xl';

export type LayoutCell = {
  type: 'chart' | 'table';
  cols: number;
  title: string;
  height?: LayoutCellHeight;
};

export type DashboardMeta = {
  slug: string;
  name: string;
  domain: string;
  description: string;
  chartTypes: string[];
  kpis: [string, string, string, string];
  layout: LayoutCell[][];
};
