import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = ({ children, value, index }: Props) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <>{children}</>}
  </div>
);
