import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-columns',
  templateUrl: './table-columns.component.html',
  styleUrls: ['./table-columns.component.scss']
})
export class TableColumnsComponent implements OnInit {

  @Input("columns") tableColumns: any[];
  @Output("columnChecked") columnChecked: EventEmitter<any>;

  constructor() { 
    this.columnChecked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  changedEvent(event: any, column){
    const isChecked = event.target.checked;
    column['showColumn'] = isChecked;
    this.columnChecked.emit({column: column, isChecked: isChecked})
    // console.log("Event is ", isChecked, " Column ", column);
  }
  ngOnChanges(changes: SimpleChanges){
    setTimeout(() => {
      this.initBootstrapProps();    
    }, 200);
  }

  initBootstrapProps(){
    $(".column-selectors .dropdown-menu li").on("click", (e) => {
      e.stopPropagation();
    })
  }

}
