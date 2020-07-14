import { LOAD_REPOSITORIES_LOADING, SET_PAGE, SET_QUERY } from './types';

export const loadRepositories = () => ({ type: LOAD_REPOSITORIES_LOADING });

export const setPage = (page: number) => ({
  type: SET_PAGE,
  page,
});

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query,
});
