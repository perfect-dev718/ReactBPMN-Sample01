import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
// import BPMNModeler from '@app/Components/BPMNModeler/BPMNModeler';
import SPTable from '@app/Components/SPTable/SPTable';

const Projects: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Projects Overview</Title>
    <div style={{ marginTop: "40px"}}></div>
    <SPTable />
  </PageSection>
)

export { Projects };
