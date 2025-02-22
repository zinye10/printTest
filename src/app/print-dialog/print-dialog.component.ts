import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-print-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,FormsModule, ReactiveFormsModule, MatCheckboxModule,JsonPipe, MatFormFieldModule, MatInputModule, MatSelectModule, RouterOutlet],
  templateUrl: './print-dialog.component.html',
  styleUrl: './print-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintDialogComponent {

 
  constructor(private router: Router){
    
  }

  private readonly _formBuilder = inject(FormBuilder);

  readonly toppings = this._formBuilder.group({
    pc1: false,
    pc2: false,
    pc3: false,
    user: "",
    busyo: "",

  });

  print() {
    this.router.navigate(['/print/chohyo']);
  }
}
