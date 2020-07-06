import { Component, OnInit, Input } from '@angular/core';
import { JsonService } from 'src/app/json.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 // [{"name":"name1", "age":"23"}, {"name":"name2", "age":"20"}]
  data;
  headings = [];
  rows = [];
  constructor(
    private jsonService:JsonService
  ) { }
  
  ngOnInit(): void {
    this.jsonService.jsonData$.subscribe(data => {
      //0, {} are valid json but no good for our table format, we use try catch 
      try {
        this.data = JSON.parse(data);
        this.headings = Object.keys(this.data[0]);
        this.rows = this.data.map(item => Object.values(item));
      } catch (error) {
        console.log(error);
        return;
      }
      
    });
  }

  addRow(row:any){
     this.rows.push(Object.values(row))
  }

  edit(event:any, i:number, j:number){
    this.rows[i][j] = event.target.value;
  }

  delete(row:any){
    this.rows = this.rows.filter( r=> r != row);
  }

  // convert [["joe","20"]] to [{name:'joe', age:"20"}]
  send(){
    this.data = [];
    for (let i = 0; i < this.rows.length; i++) {
      let obj = {};
      for (let j = 0; j < this.rows[i].length; j++) {
          obj[this.headings[j]] = this.rows[i][j]
        }
      this.data.push(obj);
      obj = {};
      }
      
    this.jsonService.sendArray(this.data)
  }
  
}
