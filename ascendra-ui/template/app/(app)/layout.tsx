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
  PageLayout,
  SideBar,
  SideBarMain,
  SideBarMenu,
  SideBarMenuContent,
  SideBarMenuHeader,
  SideBarMenuItem,
  SideBarOverlay,
  SideBarToggle,
  ThemeToggle,
} from "@/ascendra-ui";
import { LuFlaskConical, LuHouse } from "react-icons/lu";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <SideBarOverlay />
      <Header>
        <HeaderLinks>
          <HeaderLink href="/">My Project</HeaderLink>
        </HeaderLinks>
        <HeaderActions>
          <ThemeToggle />
          <NameAvatar href="#" name="User Name" />
        </HeaderActions>
      </Header>
      <Nav>
        <NavLink href="/">Getting Started</NavLink>
        <NavLink href="/sandbox">Sandbox</NavLink>
      </Nav>
      <MainContainer>
        <SideBarToggle />
        <SideBar>
          <SideBarMain>
            <SideBarMenu basePath="/">
              <SideBarMenuHeader icon={LuHouse}>Getting Started</SideBarMenuHeader>
              <SideBarMenuContent>
                <SideBarMenuItem path="/">Overview</SideBarMenuItem>
              </SideBarMenuContent>
            </SideBarMenu>
            <SideBarMenu basePath="/sandbox">
              <SideBarMenuHeader icon={LuFlaskConical}>Sandbox</SideBarMenuHeader>
              <SideBarMenuContent>
                <SideBarMenuItem path="/sandbox">Component Test</SideBarMenuItem>
              </SideBarMenuContent>
            </SideBarMenu>
          </SideBarMain>
        </SideBar>
        <ContentArea>{children}</ContentArea>
      </MainContainer>
    </PageLayout>
  );
}
