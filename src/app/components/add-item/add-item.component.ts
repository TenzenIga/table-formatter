import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() headings:any[];
  @Output() childEvent = new EventEmitter();
  rowForm:any; 
  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    let group = {};
    this.headings.forEach(input => {
      group[input] = ['']
    });
    
    this.rowForm = this.fb.group(
      group
    )
  }
  save(){
    this.childEvent.emit(this.rowForm.value);
  }
}
