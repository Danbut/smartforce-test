import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Pagination from '@material-ui/lab/Pagination';
import {
  loadRepositories,
  setPage,
  setQuery,
} from '../../redux/actions/creators';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

interface RepositoriesListProps {
  items: { full_name: string; description: string }[];
  totalPage: number;
  page: number;
  dispatchSetPage: (page: number) => void;
  dispatchSetQuery: (query: string) => void;
  dispatchLoadRepo: () => void;
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({
  items,
  totalPage,
  page,
  dispatchSetPage,
  dispatchSetQuery,
  dispatchLoadRepo,
}) => {
  const handleChangePage = (event: any, newPage: number) => {
    dispatchSetPage(newPage);
    dispatchLoadRepo();
  };

  const handleChange = (event: { target: { value: string } }) => {
    if (event.target.value.length > 3) {
      dispatchSetQuery(event.target.value);
      dispatchLoadRepo();
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div">Smartforce Test</Typography>
        <TextField
          id="standard-basic"
          label="Поиск репозитория"
          fullWidth
          onChange={handleChange}
        />
        <Typography variant="h6" className={classes.title}>
          Репозитории
        </Typography>
        <div className={classes.demo}>
          <List>
            {items.map((item) => (
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.full_name}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <Pagination
          count={totalPage}
          color="primary"
          page={page}
          onChange={handleChangePage}
        />
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  items: state.items,
  loading: state.loading,
  error: state.error,
  totalPage: state.totalPage,
  page: state.page,
});

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; page?: number; query?: string }) => any
) => {
  return {
    // dispatching plain actions
    dispatchLoadRepo: () => dispatch(loadRepositories()),
    dispatchSetPage: (page: number) => dispatch(setPage(page)),
    dispatchSetQuery: (query: string) => dispatch(setQuery(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesList);
