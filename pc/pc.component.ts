import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-pc',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent {

}
