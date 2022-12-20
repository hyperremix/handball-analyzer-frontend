import { League } from '@model';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'environment';

const backendClientConfig = {
  baseURL: environment.BACKEND_URL,
  timeout: 15000,
};

export const backendClient = axios.create(backendClientConfig);

export const getLeagues = async (): Promise<League[]> =>
  backendClient.get<League[]>(`/leagues`).then(getAxiosData);

const getAxiosData = <T>(res: AxiosResponse<T>) => res.data;
