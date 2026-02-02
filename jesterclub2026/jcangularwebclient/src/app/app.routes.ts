import { Routes } from '@angular/router';
import { Jokelist } from './pages/jokelist/jokelist';

export const routes: Routes = [
    {
        path: '',
        component: Jokelist,
        title: 'Home page',
    }
];
