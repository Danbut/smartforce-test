import {
  LOAD_REPOSITORIES_LOADING,
  LOAD_REPOSITORIES_SUCCESS,
  LOAD_REPOSITORIES_FAILURE,
  SET_PAGE,
  SET_QUERY,
} from './actions/types';

const initialState = {
  items: [],
  loading: false,
  error: '',
  page: 1,
  perPage: 10,
  totalPage: 0,
  query: '',
};

export default function reducer(
  state = initialState,
  action: {
    type: string;
    data: any;
    error: string;
    page: number;
    query: string;
  }
) {
  switch (action.type) {
    case LOAD_REPOSITORIES_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case LOAD_REPOSITORIES_SUCCESS: {
      return {
        ...state,
        items: action.data.items,
        totalPage: Math.ceil(action.data.total_count / state.perPage),
        loading: false,
      };
    }
    case LOAD_REPOSITORIES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.page,
      };
    }
    case SET_QUERY: {
      return {
        ...state,
        query: action.query,
      };
    }
    default: {
      return state;
    }
  }
}
