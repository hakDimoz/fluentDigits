import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { PracticeComponent } from './features/practice/practice.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'practice',
        component: PracticeComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
