import {hydrateRoot} from 'react-dom/client';
import App from './app';
import './base.css';
import './english.css';
hydrateRoot(document.getElementById('root')!,<App/>);
