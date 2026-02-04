import { Routes } from '@angular/router';
import { Jokelist } from './pages/jokelist/jokelist';
import { Jokeform } from './pages/jokeform/jokeform';

export const routes: Routes = [
    {
        path: '',
        component: Jokelist,
        title: 'Home page',
    },
    {
        path: 'upsert',
        component: Jokeform,
        title: 'Add new joke',
    },
    {
        path: ':id/upsert',
        component: Jokeform,
        title: 'Modify joke',
    }
];
