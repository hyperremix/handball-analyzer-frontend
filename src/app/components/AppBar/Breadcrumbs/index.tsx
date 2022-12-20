import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export type TBreadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  breadcrumbs: TBreadcrumb[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => (
  <MuiBreadcrumbs separator={<Typography>&gt;</Typography>}>
    {breadcrumbs.map(({ label, href }) =>
      href ? (
        <MuiLink key={label} color="textPrimary" to={href} component={Link} variant="body1">
          {label}
        </MuiLink>
      ) : (
        <Typography key={label}>{label}</Typography>
      ),
    )}
  </MuiBreadcrumbs>
);
