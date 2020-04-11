import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import { GrudgeProvider } from './GrudgeContext';

import './styles.css';

const rootElement = document.getElementById('root');

// We wrap the App in the GrudgeProvider
ReactDOM.render(
  <GrudgeProvider>
    <Application />
  </GrudgeProvider>,
  rootElement
);
