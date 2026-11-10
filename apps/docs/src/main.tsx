import { createRoot } from 'react-dom/client';
import { ComponentTesting } from './ComponentTesting';
import '@fontsource/inter/600.css';
import '@mds/react/styles.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(<ComponentTesting />);
