import { Component, forwardRef, Input, ViewChild, ElementRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent } from 'rxjs';

import { TranslationService } from '../translate/translation.service';
import { CheckOption } from 'src/app/check-option';

@Component({
  selector: 'app-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements ControlValueAccessor {

  @Input() label: string;
  @ViewChild('dropdown')
  options: CheckOption[];

  isOpen = false;

  private dropdown: ElementRef;

  constructor(
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  open(event) {
    event.stopPropagation();
    this.isOpen = true;
    const listener = fromEvent(document, 'click').subscribe(ev => {
      if (!this.elementRef.nativeElement.querySelector('.dropdown')
        || !this.elementRef.nativeElement.querySelector('.dropdown').contains(ev.target)) {
        this.isOpen = false;
        listener.unsubscribe();
      }
    });
  }

  writeValue(value) {
    if (!value || !Array.isArray(value)) {
      return;
    }
    this.options = value;

    this.onChange(this.options);
  }

  onCheckboxChange() {
    this.onChange(this.options);
  }

  getValueString() {
    if (this.options) {
      return this.options.filter((val: CheckOption) => val.checked).map((val: CheckOption) => {
        if (val.name) {
          return val.name;
        }
        if (val.translation) {
          return this.translationService.translate(val.translation);
        }
      }).join(', ');
    }
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
