import { Routes } from '@angular/router';
import { PrintDialogComponent } from './print-dialog/print-dialog.component';
import { HomeComponent } from './home/home.component';
import { ChohyoComponent } from './chohyo/chohyo.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'print', component: PrintDialogComponent,
        children: [
            { path: 'chohyo', component: ChohyoComponent, pathMatch: "full"},
        ]
    },
];
