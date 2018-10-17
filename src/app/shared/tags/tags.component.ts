import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() enter: EventEmitter<any> = new EventEmitter();
  @Output() tagRemove: EventEmitter<any> = new EventEmitter();

  tags = [];
  value: string;

  writeValue(value) {
    if (!value || !Array.isArray(value)) {
      return;
    }
    this.tags = value;
    this.onChange(this.tags);
  }

  onEnter(value) {
    this.enter.emit(value);
  }

  removeTag(index) {
    const event = {
      tag: this.tags.splice(index, 1),
      index
    };
    this.tagRemove.emit(event);
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
