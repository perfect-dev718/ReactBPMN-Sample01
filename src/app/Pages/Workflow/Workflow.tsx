import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import BPMNModeler from '@app/Components/BPMNModeler/BPMNModeler';

const Workflow: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Workflows Overview</Title>
    <div style={{ marginTop: "40px"}}></div>
    <BPMNModeler 
    />
  </PageSection>
)

export { Workflow };
