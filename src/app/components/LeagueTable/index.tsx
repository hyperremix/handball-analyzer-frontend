import { Team } from '@model';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LeagueTableRow } from './LeagueTableRow';

type Props = {
  teams: Team[];
};

export const LeagueTable = ({ teams }: Props) => {
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <Stack gap={2}>
      <Typography variant="h4">{t(translations.leagueTableHeader)}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <LeagueTableCell sx={{ pt: 0 }} />
              <TableCell
                sx={{
                  border: 0,
                  px: (theme) => (isSmallScreen ? theme.spacing(1) : theme.spacing(2)),
                  pt: 0,
                }}
              />
              <LeagueTableCell align="right" sx={{ pt: 0 }}>
                <Typography>
                  {isSmallScreen
                    ? t(translations.gamesShortTableHeader)
                    : t(translations.gamesTableHeader)}
                </Typography>
              </LeagueTableCell>
              <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1), pt: 0 }}>
                <Typography>{t(translations.winsTableHeader)}</Typography>
              </LeagueTableCell>
              <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1), pt: 0 }}>
                <Typography>{t(translations.drawsTableHeader)}</Typography>
              </LeagueTableCell>
              <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1), pt: 0 }}>
                <Typography>{t(translations.lossesTableHeader)}</Typography>
              </LeagueTableCell>
              <LeagueTableCell align="center" sx={{ pt: 0 }}>
                <Typography>
                  {isSmallScreen
                    ? t(translations.goalsShortTableHeader)
                    : t(translations.goalsTableHeader)}
                </Typography>
              </LeagueTableCell>
              {!isSmallScreen && (
                <LeagueTableCell align="center" sx={{ pt: 0 }}>
                  <Typography></Typography>
                  {t(translations.diffTableHeader)}
                </LeagueTableCell>
              )}
              <LeagueTableCell align="right" sx={{ pt: 0 }}>
                <Typography>
                  {isSmallScreen
                    ? t(translations.pointsShortTableHeader)
                    : t(translations.pointsTableHeader)}
                </Typography>
              </LeagueTableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper}>
            {teams.map((team, index) => (
              <LeagueTableRow key={team.id} index={index} team={team} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

const LeagueTableCell = (props: TableCellProps) => {
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
