import { Routes } from '@angular/router';
import { HomeComponent } from './templates/home/home.component';
import { IntroductionComponent } from './templates/introduction/introduction.component';
import { ProblematicComponent } from './templates/problematic/problematic.component';
import { TeamComponent } from './templates/team/team.component';
import { SolarRadiationReportComponent } from './templates/reports/solarRadiationReport/solarRadiationReport.component';
import { HistoricalReportAndPredictionOfSolarRadiationComponent } from './templates/reports/historicalReportAndPredictionOfSolarRadiation/historicalReportAndPredictionOfSolarRadiation.component';
import { SimuladorComponent } from './templates/simulador/simulador.component';
import { PercentageOfSolarRadiationComponent } from './templates/reports/percentageOfSolarRadiation/percentageOfSolarRadiation.component';

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
        path: 'reporteDepartamento', component : SolarRadiationReportComponent
    },
    {
        path: 'reporteCircular', component : PercentageOfSolarRadiationComponent
    },
    {
        path: 'reporteHistorico', component : HistoricalReportAndPredictionOfSolarRadiationComponent
    },
    {
        path: 'equipo', component : TeamComponent
    },
    
    {
        path: 'simulador', component : SimuladorComponent
    },

];
