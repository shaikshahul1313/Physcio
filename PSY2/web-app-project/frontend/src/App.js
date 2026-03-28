import React from 'react';
import BodyModel from './components/BodyModel';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>3D Body Model</h1>
      </header>
      <main>
        <BodyModel />
      </main>
    </div>
  );
}

export default App;