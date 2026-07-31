import {
  Card,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  CardPanelItem,
  MainContent,
  PageContent,
  PageHeader,
  PageHeaderGroup,
  PageMain,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SimpleBadge,
} from "@/ascendra-ui";
import { LuFlaskConical, LuFolderOpen, LuPackage } from "react-icons/lu";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <code className="text-xs">{value}</code>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageTitle>Getting Started</PageTitle>
          <PageSubtitle>Your project built with Ascendra UI</PageSubtitle>
        </PageHeaderGroup>
        <SimpleBadge variant="secondary">v1.0.0</SimpleBadge>
      </PageHeader>
      <PageMain>
        <PageWrapper>
          <PageContent>
            <MainContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>
                      <div className="flex items-center gap-2">
                        <LuPackage className="text-primary" />
                        Component Library
                      </div>
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      All components live in{" "}
                      <code className="text-xs">ascendra-ui/</code>. Do not edit
                      this folder — use{" "}
                      <code className="text-xs">npm run upgrade</code> to update
                      it.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <CardPanelItem>
                      <div className="flex flex-col gap-3 text-sm">
                        <InfoRow
                          label="Import"
                          value="import { Button } from '@/ascendra-ui'"
                        />
                        <InfoRow
                          label="Source"
                          value="ascendra-ui/components/"
                        />
                        <InfoRow label="Reference" value="docs/ui-reference.md" />
                        <InfoRow label="Upgrade" value="npm run upgrade" />
                      </div>
                    </CardPanelItem>
                  </CardPanel>
                </Card>

                <Card>
                  <CardHeader>
                    <CardHeaderTitle>
                      <div className="flex items-center gap-2">
                        <LuFlaskConical className="text-primary" />
                        Sandbox
                      </div>
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Test components before integrating them. Delete test code
                      when done — sandbox pages are not part of your app.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <CardPanelItem>
                      <div className="flex flex-col gap-3 text-sm">
                        <InfoRow
                          label="File"
                          value="app/(app)/sandbox/page.tsx"
                        />
                        <InfoRow label="URL" value="/sandbox" />
                      </div>
                    </CardPanelItem>
                  </CardPanel>
                </Card>

                <Card>
                  <CardHeader>
                    <CardHeaderTitle>
                      <div className="flex items-center gap-2">
                        <LuFolderOpen className="text-primary" />
                        Project Structure
                      </div>
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Empty folders are placeholders for your own code. Add
                      files as your project grows.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <CardPanelItem>
                      <div className="flex flex-col gap-3 text-sm">
                        <InfoRow label="Your components" value="components/" />
                        <InfoRow label="Your hooks" value="hooks/" />
                        <InfoRow
                          label="Your utilities"
                          value="lib/  utils/  providers/"
                        />
                      </div>
                    </CardPanelItem>
                  </CardPanel>
                </Card>
              </div>
            </MainContent>
          </PageContent>
        </PageWrapper>
      </PageMain>
    </>
  );
}
