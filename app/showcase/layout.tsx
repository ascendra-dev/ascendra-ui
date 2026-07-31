"use client";

import { ReactNode } from "react";

import {
  ContentArea,
  Header,
  HeaderActions,
  HeaderLink,
  HeaderLinks,
  MainContainer,
  NameAvatar,
  Nav,
  NavLink,
  NavLinkBadge,
  PageLayout,
  SideBar,
  SideBarMain,
  SideBarMenu,
  SideBarMenuContent,
  SideBarMenuHeader,
  SideBarMenuItem,
  SideBarMenuItemGroup,
  SideBarMenuSet,
  SideBarMenuSetTitle,
  SideBarOverlay,
  SideBarToggle,
  SimpleBadge,
  ThemeToggle,
} from "@/ascendra-ui";
import { SidebarSearch } from "@/components/sidebar-search";
import {
  LuBookOpen,
  LuCalendar,
  LuFileText,
  LuLayers,
  LuPanelLeft,
  LuPanelRight,
  LuScrollText,
} from "react-icons/lu";
import {
  MdDashboardCustomize,
  MdOutlineTab,
  MdOutlineWindow,
} from "react-icons/md";
import {
  RiBarChartLine,
  RiBellLine,
  RiCompassLine,
  RiFileListLine,
  RiKeyboardLine,
  RiLayoutLine,
  RiTableLine,
} from "react-icons/ri";
import { TbSettingsCheck } from "react-icons/tb";
import { VscSymbolStructure } from "react-icons/vsc";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <SideBarOverlay />
      <Header>
        <HeaderLinks>
          <HeaderLink href="/showcase/getting-started/overview">
            <LuLayers className="shrink-0 text-primary" />
            <span className="truncate font-medium">Ascendra UI</span>
            <SimpleBadge variant="secondary">Beta</SimpleBadge>
          </HeaderLink>
        </HeaderLinks>
        <HeaderActions>
          <ThemeToggle />
          <NameAvatar href="#" name="burhan shah" />
        </HeaderActions>
      </Header>
      <Nav>
        <NavLink href="/showcase/getting-started/overview">
          Getting Started
        </NavLink>
        <NavLink href="/showcase/feedback/simple-badge">Components</NavLink>
        <NavLink href="/showcase/dashboards">Samples</NavLink>
        <NavLink href="/showcase/nav/header">
          Navigation
          <NavLinkBadge>New</NavLinkBadge>
        </NavLink>
        <NavLink href="/showcase/layout-guide">Layout Guide</NavLink>
      </Nav>
      <MainContainer>
        <SideBarToggle />
        <SideBar>
          <SidebarSearch>
            <SideBarMain>
              {/* Getting Started */}
              <SideBarMenuSet>
                <SideBarMenuSetTitle>Getting Started</SideBarMenuSetTitle>
                <SideBarMenu basePath="/showcase/getting-started">
                  <SideBarMenuHeader icon={LuBookOpen}>
                    Getting Started
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/getting-started/overview">
                      Overview
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/getting-started/design-tokens">
                      Design Tokens
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/getting-started/guidelines">
                      Usage Guidelines
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/getting-started/accessibility">
                      Accessibility
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
              </SideBarMenuSet>

              {/* Samples */}
              <SideBarMenuSet>
                <SideBarMenuSetTitle>Samples</SideBarMenuSetTitle>
                <SideBarMenuItemGroup>
                  <SideBarMenuItem
                    alternate="stand-alone"
                    icon={MdOutlineWindow}
                    path="/showcase/dialogs"
                  >
                    Dialog Gallery
                  </SideBarMenuItem>
                  <SideBarMenuItem
                    alternate="stand-alone"
                    icon={LuPanelRight}
                    path="/showcase/sheets"
                  >
                    Sheet Gallery
                  </SideBarMenuItem>
                  <SideBarMenuItem
                    alternate="stand-alone"
                    icon={LuPanelLeft}
                    path="/showcase/drawers"
                  >
                    Drawer Gallery
                  </SideBarMenuItem>
                </SideBarMenuItemGroup>
                <SideBarMenu basePath="/showcase/dashboards">
                  <SideBarMenuHeader icon={MdDashboardCustomize}>
                    Sample Dashboards
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/dashboards">
                      Dashboard Gallery
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/saas-revenue">
                      SaaS Revenue
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/ecommerce-ops">
                      E-commerce Ops
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/marketing">
                      Marketing
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/financial-pnl">
                      Financial P&L
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/trading-portfolio">
                      Trading Portfolio
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/healthcare">
                      Healthcare
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/hr-people">
                      HR & People
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/devops">
                      DevOps
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/supply-chain">
                      Supply Chain
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/dashboards/real-estate">
                      Real Estate
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/reports">
                  <SideBarMenuHeader icon={LuFileText}>
                    Sample Reports
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/reports">
                      Report Gallery
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/annual-financial-statement">
                      Annual Financial Statement
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/executive-business-review">
                      Executive Business Review
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/patient-health-summary">
                      Patient Health Summary
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/project-status-report">
                      Project Status Report
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/sales-pipeline-report">
                      Sales Pipeline Report
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/marketing-campaign-analysis">
                      Marketing Campaign Analysis
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/supply-chain-ops-report">
                      Supply Chain Operations
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/employee-performance-review">
                      Employee Performance
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/security-incident-report">
                      Security Incident Report
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/reports/esg-sustainability-report">
                      ESG Sustainability Report
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/forms">
                  <SideBarMenuHeader icon={RiFileListLine}>
                    Sample Forms
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/forms">
                      Forms Gallery
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/contact-inquiry">
                      Contact & Inquiry
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/user-profile">
                      User Profile Settings
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/support-ticket">
                      Support Ticket
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/appointment-booking">
                      Appointment Booking
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/job-application">
                      Job Application
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/financial-transaction">
                      Financial Transaction
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/create-product">
                      Create Product
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/project-kickoff">
                      Project Kickoff
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/search-filter">
                      Search & Filter Panel
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/forms/employee-onboarding">
                      Employee Onboarding
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
              </SideBarMenuSet>

              {/* Components */}
              <SideBarMenuSet>
                <SideBarMenuSetTitle>Components</SideBarMenuSetTitle>
                <SideBarMenu basePath="/showcase/feedback">
                  <SideBarMenuHeader icon={RiBellLine}>
                    Feedback & Status
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/feedback/simple-badge">
                      Simple Badge
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/bubble-badge">
                      Bubble Badge
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/status-dot">
                      Status Dot
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/color-tile">
                      Color Tile
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/simple-alert">
                      Simple Alert
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/toasts">
                      Toast
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/pro-badge">
                      Pro Badge
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/unsaved-changes-bar">
                      Unsaved Changes Bar
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/progress">
                      Progress & Stepper
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/skeleton">
                      Skeleton
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/feedback/rating">
                      Rating
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/inputs">
                  <SideBarMenuHeader icon={RiKeyboardLine}>
                    Forms & Inputs
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/inputs/button">
                      Button
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/input">
                      Input
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/input-group">
                      Input Group
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/checkbox">
                      Checkbox
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/radio-group">
                      Radio Group
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/switch">
                      Switch
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/select">
                      Select
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/field">
                      Field
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/combobox">
                      Combobox
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/table-lookup">
                      Table Lookup
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/file-upload">
                      File Upload
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/rich-text-editor">
                      Rich Text Editor
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/inputs/color-picker">
                      Color Picker
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/date">
                  <SideBarMenuHeader icon={LuCalendar}>
                    Date & Time
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/date/calendar">
                      Calendar
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/date/date-picker">
                      Date Picker
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/date/date-range-picker">
                      Date Range Picker
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/nav">
                  <SideBarMenuHeader icon={RiCompassLine}>
                    Navigation
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/nav/anchor">
                      Anchor
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/nav/nav">
                      Nav
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/nav/nav-link">
                      Nav Link
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/nav/header">
                      Header
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/overlay">
                  <SideBarMenuHeader icon={LuLayers}>
                    Overlays
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/overlay/dialog">
                      Dialog
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/overlay/sheet">
                      Sheet
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/overlay/dropdown-menu">
                      Dropdown Menu
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/overlay/tooltips">
                      Tooltip
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/overlay/command-palette">
                      Command Palette
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/report-ui">
                  <SideBarMenuHeader icon={LuScrollText}>
                    Reports
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/report-ui/report-header">
                      Report Header
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/report-ui/report-document">
                      Report Document
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/report-ui/report-content">
                      Report Content
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/charts">
                  <SideBarMenuHeader icon={RiBarChartLine}>
                    Charts
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/charts">
                      Chart Gallery
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/line">
                      Line Charts
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/area">
                      Area Charts
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/bar">
                      Bar Charts
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/pie">
                      Pie & Donut
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/radial">
                      Radial & Gauge
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/radar">
                      Radar Charts
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/scatter">
                      Scatter & Bubble
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/composed">
                      Composed Charts
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/treemap">
                      Treemap
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/histogram">
                      Histogram
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/candlestick">
                      Candlestick
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/chart-legend">
                      Chart Legend
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/charts/chart-target-legend">
                      Chart Target Legend
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/data-table">
                  <SideBarMenuHeader icon={RiTableLine}>
                    Tables & Data
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/data-table/table">
                      Table
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/data-table/empty">
                      Empty State
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/data-table">
                      Data Table
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/data-table-lab">
                      Data Table Lab
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenu basePath="/showcase/layout">
                  <SideBarMenuHeader icon={RiLayoutLine}>
                    Layout
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/layout-guide">
                      Layout Guide
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/layout/card">
                      Card
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/layout/page-header">
                      Page Header
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/layout/page-bar">
                      Page Bar
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/layout/aside-content">
                      Aside Content
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/layout/item">
                      Item
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
                <SideBarMenuItemGroup>
                  <SideBarMenuItem
                    alternate="stand-alone"
                    icon={MdOutlineTab}
                    path="/showcase/tabs"
                  >
                    Tabs
                  </SideBarMenuItem>
                  <SideBarMenuItem
                    alternate="stand-alone"
                    icon={VscSymbolStructure}
                    path="/showcase/sidebar-menu"
                  >
                    Sidebar Menu
                  </SideBarMenuItem>
                </SideBarMenuItemGroup>
                <SideBarMenu basePath="/showcase/util">
                  <SideBarMenuHeader icon={TbSettingsCheck}>
                    Utilities
                  </SideBarMenuHeader>
                  <SideBarMenuContent>
                    <SideBarMenuItem path="/showcase/util/copy-text">
                      Copy Text
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/util/name-avatar">
                      Name Avatar
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/util/theme-toggle">
                      Theme Toggle
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/util/pagination-button">
                      Pagination Button
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/util/row-action-button">
                      Row Action Button
                    </SideBarMenuItem>
                    <SideBarMenuItem path="/showcase/util/scroll-to-top">
                      Scroll To Top
                    </SideBarMenuItem>
                  </SideBarMenuContent>
                </SideBarMenu>
              </SideBarMenuSet>
            </SideBarMain>
          </SidebarSearch>
          {/* <SideBarFooter /> */}
        </SideBar>
        <ContentArea>{children}</ContentArea>
      </MainContainer>
    </PageLayout>
  );
}
