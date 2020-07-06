import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/data';
import { JsonService } from 'src/app/json.service';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  dataModel = new Data('');
  jsonHasError = true; 
  constructor(
    private jsonService:JsonService,
  ) { }

  ngOnInit(): void {
    this.jsonService.jsData$.subscribe(data => {
      this.dataModel.json = JSON.stringify(data);
    });
  }
 
  onSubmit(){
    let data = this.dataModel.json;
    this.jsonService.sendJson(data)
  }

  isValidJson(str:string) {
    try {
        JSON.parse(str);
    } catch (e) {
      this.jsonHasError = true;
      return;
    }
    this.jsonHasError = false;
  }
  

}
