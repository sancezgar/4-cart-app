import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './components/cart-app.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CartAppComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '4-cart-app';
}
