import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-button',
  imports: [],
  templateUrl: './input-button.html',
  styleUrl: './input-button.css',
})
export class InputButton {
  name = input.required<string>();
  clicked = output<void>();
}
