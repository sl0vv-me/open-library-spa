import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tags',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsComponent),
      multi: true
    }
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() tags = [];

  value: string;

  writeValue(value) {
    if (!value || typeof value !== 'string') {
      return;
    }
    this.value = value;
    this.onChange(this.value);
  }

  onInput(value) {
    this.writeValue(value);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }


}
