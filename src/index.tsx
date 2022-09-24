import React from 'react';
import ReactDOM from 'react-dom/client';
import {SimpleExample} from './__examples__/ExamplesPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <SimpleExample/>
    </React.StrictMode>
);

