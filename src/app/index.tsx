import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { Dashboard } from './pages/Dashboard';
import { LeaguePage } from './pages/LeaguePage';
import { SeasonPage } from './pages/SeasonPage';

export const App = () => {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/seasons/:seasonId" element={<SeasonPage />} />
        <Route path="/seasons/:seasonId/leagues/:leagueId" element={<LeaguePage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
};
