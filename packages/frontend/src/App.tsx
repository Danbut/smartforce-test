import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import RepositoriesList from './components/RepositoriesList/RepositoriesList';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <main className="List">
          <RepositoriesList />
        </main>
      </Provider>
    </div>
  );
}

export default App;
