import './styles.css';
import './components/dialog';

import { loadSidebar } from './controllers/sidebar-controller.js';
import { DataController } from './controllers/data-controller.js';

DataController.checkStorage();
loadSidebar();
