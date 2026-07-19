import { Component, inject, input, forwardRef, Optional, Self, signal} from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => InputField),
  //     multi: true
  //   }
  // ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField implements ControlValueAccessor {
  themeService = inject(ThemeService);
  // control = inject(NgControl, {optional:true,self:true});

  name = input.required<string>();
  type = input.required<string>();
  error = signal("");
  value = '';
  
  constructor(@Optional() @Self() public ngControl: NgControl){
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  checkErrors(): void{
    const control = this.ngControl?.control;

    if(control?.hasError("required")){
      this.error.update(()=>"This is required");
      return;
    }
  }

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
    this.error.update(()=>"");
  }
}
