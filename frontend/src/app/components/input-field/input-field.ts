import { Component, inject, input, forwardRef } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true
    }
  ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField implements ControlValueAccessor {
  themeService = inject(ThemeService);

  name = input.required<string>();
  type = input.required<string>();

  value = '';

  private onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
  }
}
