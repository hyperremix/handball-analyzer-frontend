import { Game, League, Team } from '@model';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'environment';

const backendClientConfig = {
  baseURL: environment.BACKEND_URL,
  timeout: 15000,
};

export const backendClient = axios.create(backendClientConfig);

export const getLeagues = async (): Promise<League[]> =>
  backendClient.get<League[]>('/leagues').then(getAxiosData);

export const getLeagueGames = async (leagueId?: string): Promise<Game[]> =>
  backendClient.get<Game[]>(`/games${getQueryParams({ leagueId })}`).then(getAxiosData);

export const getLeagueTeams = async (leagueId?: string): Promise<Team[]> =>
  backendClient.get<Team[]>(`/teams${getQueryParams({ leagueId })}`).then(getAxiosData);

export const getLeagueGameEvents = async (leagueId?: string): Promise<Game[]> =>
  backendClient.get<Game[]>(`/game-events${getQueryParams({ leagueId })}`).then(getAxiosData);

const getAxiosData = <T>(res: AxiosResponse<T>) => res.data;

const getQueryParams = (params: Record<string, string | number | boolean | undefined>) => {
  const definedParams = Object.entries(params).filter(([, value]) => value !== undefined);
  return definedParams.length > 0
    ? `?${definedParams.map(([key, value]) => `${key}=${value}`).join('&')}`
    : '';
};
