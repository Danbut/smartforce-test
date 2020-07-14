import _superagent from 'superagent';
const superagentPromise = require('superagent-promise');

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://api.github.com';

const responseBody = (res: { body: any }) => res.body;

let token: null | string = null;
const tokenPlugin = (req: { set: (key: string, value: string) => void }) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Repositories = {
  repositories: (query: string, page: number, perPage: number) =>
    requests.get(
      `/search/repositories?q=${query}&page=${page}&per_page=${perPage}`
    ),
};

export default {
  Repositories,
  setToken: (_token: string) => {
    token = _token;
  },
};
