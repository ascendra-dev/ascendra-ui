// Registry of slug → preview component.
// When adding a new component: create components/previews/{slug}-preview.tsx,
// import it here, and add the slug entry to the map below.
// That's the only file you need to touch (besides registry.ts + nav-config.ts).

import { ButtonDocContent } from "@/components/previews/button-preview";
import { RatingDocContent } from "@/components/previews/rating-preview";
import { ColorTileDocContent } from "@/components/previews/color-tile-preview";
import { SimpleBadgeDocContent } from "@/components/previews/simple-badge-preview";
import { BubbleBadgeDocContent } from "@/components/previews/bubble-badge-preview";
import { StatusDotDocContent } from "@/components/previews/status-dot-preview";
import { SimpleAlertDocContent } from "@/components/previews/simple-alert-preview";
import { ProBadgeDocContent } from "@/components/previews/pro-badge-preview";
import { InputDocContent } from "@/components/previews/input-preview";
import { InputGroupDocContent } from "@/components/previews/input-group-preview";
import { CheckboxDocContent } from "@/components/previews/checkbox-preview";
import { RadioGroupDocContent } from "@/components/previews/radio-group-preview";
import { SwitchDocContent } from "@/components/previews/switch-preview";
import { SelectDocContent } from "@/components/previews/select-preview";
import { AnchorDocContent } from "@/components/previews/anchor-preview";
import { NavLinkDocContent } from "@/components/previews/nav-link-preview";
import { HeaderDocContent } from "@/components/previews/header-preview";
import { DialogDocContent } from "@/components/previews/dialog-preview";
import { SheetDocContent } from "@/components/previews/sheet-preview";
import { DropdownMenuDocContent } from "@/components/previews/dropdown-menu-preview";
import { TableDocContent } from "@/components/previews/table-preview";
import { EmptyDocContent } from "@/components/previews/empty-preview";
import { PageHeaderDocContent } from "@/components/previews/page-header-preview";
import { PageBarDocContent } from "@/components/previews/page-bar-preview";
import { AsideContentDocContent } from "@/components/previews/aside-content-preview";
import { TabsDocContent } from "@/components/previews/tabs-preview";
import { SidebarMenuDocContent } from "@/components/previews/sidebar-menu-preview";
import { CopyTextDocContent } from "@/components/previews/copy-text-preview";
import { NameAvatarDocContent } from "@/components/previews/name-avatar-preview";
import { ThemeToggleDocContent } from "@/components/previews/theme-toggle-preview";
import { PaginationButtonDocContent } from "@/components/previews/pagination-button-preview";
import { RowActionButtonDocContent } from "@/components/previews/row-action-button-preview";
import { FieldDocContent } from "@/components/previews/field-preview";
import { ComboboxDocContent } from "@/components/previews/combobox-preview";
import { TableLookupDocContent } from "@/components/previews/table-lookup-preview";
import { NavDocContent } from "@/components/previews/nav-preview";
import { UnsavedChangesBarDocContent } from "@/components/previews/unsaved-changes-bar-preview";
import { ScrollToTopDocContent } from "@/components/previews/scroll-to-top-preview";
import { ItemDocContent } from "@/components/previews/item-preview";
import { CalendarDocContent } from "@/components/previews/calendar-preview";
import { DatePickerDocContent } from "@/components/previews/date-picker-preview";
import { DateRangePickerDocContent } from "@/components/previews/date-range-picker-preview";
import { DataTableDocContent } from "@/components/previews/data-table-preview";
import { CardDocContent } from "@/components/previews/card-preview";
import { TooltipDocContent } from "@/components/previews/tooltip-preview";
import { ProgressDocContent } from "@/components/previews/progress-preview";
import { SkeletonDocContent } from "@/components/previews/skeleton-preview";
import { CommandPaletteDocContent } from "@/components/previews/command-palette-preview";
import { FileUploadDocContent } from "@/components/previews/file-upload-preview";
import { RichTextEditorDocContent } from "@/components/previews/rich-text-editor-preview";
import { ColorPickerDocContent } from "@/components/previews/color-picker-preview";
import { ToastDocContent } from "@/components/previews/toast-preview";
import { ChartLegendDocContent } from "@/components/previews/chart-legend-preview";
import { ChartTargetLegendDocContent } from "@/components/previews/chart-target-legend-preview";
import { ReportHeaderDocContent } from "@/components/previews/report-header-preview";
import { ReportDocumentDocContent } from "@/components/previews/report-document-preview";
import { ReportContentDocContent } from "@/components/previews/report-content-preview";

export type DocComponent = React.ComponentType;

export const docComponents: Partial<Record<string, DocComponent>> = {
  button: ButtonDocContent,
  rating: RatingDocContent,
  "color-tile": ColorTileDocContent,
  "simple-badge": SimpleBadgeDocContent,
  "bubble-badge": BubbleBadgeDocContent,
  "status-dot": StatusDotDocContent,
  "simple-alert": SimpleAlertDocContent,
  "pro-badge": ProBadgeDocContent,
  input: InputDocContent,
  "input-group": InputGroupDocContent,
  checkbox: CheckboxDocContent,
  "radio-group": RadioGroupDocContent,
  switch: SwitchDocContent,
  select: SelectDocContent,
  anchor: AnchorDocContent,
  "nav-link": NavLinkDocContent,
  header: HeaderDocContent,
  dialog: DialogDocContent,
  sheet: SheetDocContent,
  "dropdown-menu": DropdownMenuDocContent,
  table: TableDocContent,
  empty: EmptyDocContent,
  card: CardDocContent,
  "page-header": PageHeaderDocContent,
  "page-bar": PageBarDocContent,
  "aside-content": AsideContentDocContent,
  tabs: TabsDocContent,
  "sidebar-menu": SidebarMenuDocContent,
  "copy-text": CopyTextDocContent,
  "name-avatar": NameAvatarDocContent,
  "theme-toggle": ThemeToggleDocContent,
  "pagination-button": PaginationButtonDocContent,
  "row-action-button": RowActionButtonDocContent,
  field: FieldDocContent,
  combobox: ComboboxDocContent,
  "table-lookup": TableLookupDocContent,
  nav: NavDocContent,
  "unsaved-changes-bar": UnsavedChangesBarDocContent,
  "scroll-to-top": ScrollToTopDocContent,
  item: ItemDocContent,
  calendar: CalendarDocContent,
  "date-picker": DatePickerDocContent,
  "date-range-picker": DateRangePickerDocContent,
  "data-table": DataTableDocContent,
  tooltips: TooltipDocContent,
  progress: ProgressDocContent,
  skeleton: SkeletonDocContent,
  "command-palette": CommandPaletteDocContent,
  "file-upload": FileUploadDocContent,
  "rich-text-editor": RichTextEditorDocContent,
  "color-picker": ColorPickerDocContent,
  toasts: ToastDocContent,
  "chart-legend": ChartLegendDocContent,
  "chart-target-legend": ChartTargetLegendDocContent,
  "report-header": ReportHeaderDocContent,
  "report-document": ReportDocumentDocContent,
  "report-content": ReportContentDocContent,
};
