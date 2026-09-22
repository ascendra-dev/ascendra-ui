"use client";

import { ReactNode } from "react";

import {
  ContentArea,
  Header,
  HeaderActions,
  HeaderLink,
  HeaderLinks,
  MainContainer,
  Nav,
  NavLink,
  PageLayout,
  SideBar,
  SideBarMain,
  SideBarMenuItem,
  SideBarMenuItemGroup,
  SideBarOverlay,
  SideBarToggle,
  SimpleBadge,
  ThemeToggle,
} from "@/ascendra-ui";
import {
  LuBookOpen,
  LuFolderTree,
  LuLayers,
  LuRefreshCw,
  LuRocket,
} from "react-icons/lu";

export default function StarterLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <SideBarOverlay />
      <Header>
        <HeaderLinks>
          <HeaderLink href="/starter">
            <LuLayers className="shrink-0 text-primary" />
            <span className="truncate font-medium">Your App</span>
            <SimpleBadge variant="secondary">Starter</SimpleBadge>
          </HeaderLink>
        </HeaderLinks>
        <HeaderActions>
          <ThemeToggle />
        </HeaderActions>
      </Header>
      <Nav>
        <NavLink href="/starter">Getting Started</NavLink>
      </Nav>
      <MainContainer>
        <SideBarToggle />
        <SideBar>
          <SideBarMain>
            <SideBarMenuItemGroup>
              <SideBarMenuItem alternate="stand-alone" icon={LuRocket} path="/starter#welcome">
                Welcome
              </SideBarMenuItem>
              <SideBarMenuItem alternate="stand-alone" icon={LuFolderTree} path="/starter#structure">
                Project Structure
              </SideBarMenuItem>
              <SideBarMenuItem alternate="stand-alone" icon={LuBookOpen} path="/starter#docs">
                Where The Docs Live
              </SideBarMenuItem>
              <SideBarMenuItem alternate="stand-alone" icon={LuRefreshCw} path="/starter#update">
                Staying Updated
              </SideBarMenuItem>
            </SideBarMenuItemGroup>
          </SideBarMain>
        </SideBar>
        <ContentArea>{children}</ContentArea>
      </MainContainer>
    </PageLayout>
  );
}
