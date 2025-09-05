import { Routes } from '@angular/router';
import { HomeComponent } from './templates/home/home.component';
import { IntroductionComponent } from './templates/introduction/introduction.component';
import { ProblematicComponent } from './templates/problematic/problematic.component';
import { TeamComponent } from './templates/team/team.component';
import { ReportsComponent } from './templates/reports/reports.component';

export const routes: Routes = [
    {
        path: '', component : HomeComponent
    },
    {
        path: 'introducción', component : IntroductionComponent
    },
    {
        path: 'problematica', component : ProblematicComponent
    },
    {
        path: 'reporte', component : ReportsComponent
    },
    {
        path: 'equipo', component : TeamComponent
    },
    
];
