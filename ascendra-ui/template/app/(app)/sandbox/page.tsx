import {
  MainContent,
  PageContent,
  PageHeader,
  PageMain,
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/ascendra-ui";

export default function SandboxPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Sandbox</PageTitle>
          <PageSubtitle>Drop components here to test them</PageSubtitle>
        </div>
      </PageHeader>
      <PageMain>
        <PageWrapper>
          <PageContent>
            <MainContent>
              {/* Add components to test here. Remove when done. */}
            </MainContent>
          </PageContent>
        </PageWrapper>
      </PageMain>
    </>
  );
}
