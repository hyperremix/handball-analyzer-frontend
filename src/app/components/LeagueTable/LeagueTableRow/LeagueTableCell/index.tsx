import { TableCell, TableCellProps, Theme, useMediaQuery } from '@mui/material';
import * as React from 'react';

export const LeagueTableCell = (props: TableCellProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <TableCell
      {...props}
      sx={{
        width: '0.1%',
        whiteSpace: 'nowrap',
        border: 0,
        lineHeight: 1,
        px: (theme) => (isSmallScreen ? theme.spacing(1) : theme.spacing(2)),
        ...props.sx,
      }}
    >
      {props.children}
    </TableCell>
  );
};
