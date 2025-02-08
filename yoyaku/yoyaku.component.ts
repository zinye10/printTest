import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-yoyaku',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './yoyaku.component.html',
  styleUrl: './yoyaku.component.css'
})
export class YoyakuComponent {

}
