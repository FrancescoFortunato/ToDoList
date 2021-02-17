import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepicker, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Task, ActionTask } from '@core/models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './date-adapter';
import { CustomDateParserFormatter } from './date-formatter';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ModalTaskComponent implements OnInit {
  @Input() inTask: Task;
  @Input() actionTask: ActionTask;
  @Input() statues: Array<string>;
  public isSubmit: boolean;
  insertDate: string;
  dataForm: Task;
  @Output() outTask: EventEmitter<Task> = new EventEmitter();

  className = 'ModalTaskComponent.';

  @ViewChild('dateFrom') dateFrom: NgbDatepicker;
  @ViewChild('fromDateModel') fromDateModel: NgModel;
  constructor(
    public activeModal: NgbActiveModal,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) { }

  ngOnInit(): void {
    const methodName = 'ngOnInit';
    this.dataForm = {... this.inTask};
    console.log(this.className + methodName + ' - recevide date : ' +  this.dataForm.date);
    console.log(this.className + methodName + ' - recevide date.toString: ' +  this.dataForm.date.toString());
    //console.log(this.className + methodName + ' - recevide date.toISOString : ' +  this.dataForm.date.toISOString());
    const tmpDate = new Date(this.dataForm.date);
    
    console.log(this.className + methodName + ' - year   date : ' +   tmpDate.getFullYear());
    console.log( this.className + methodName + ' - mounth date : ' +  (tmpDate.getMonth() + 1));
    console.log(this.className + methodName + ' - day    date : ' +   tmpDate.getDate());
  
    //this.insertDate = this.dateAdapter.toModel(this.calendar.getPrev(new NgbDate(parseInt(date[2], 10), parseInt(date[0], 10), parseInt(date[1], 10))));
    this.insertDate = this.dateAdapter.toModel(this.calendar.getPrev(
      new NgbDate(
        tmpDate.getFullYear(), 
        tmpDate.getMonth() + 1, 
        tmpDate.getDate() + 1)));
    
    console.log(this.className + methodName + 'ngInInit - inserDate: ' + this.insertDate);
  }
  
  ngAfterViewInit() {


  }

  onFromDateSelected() {
    const methodName = 'onFromDateSelected';
    /*
    if (this.dataForm.date) {
      let date = this.dataForm.date.toString().split('/');
      this.dataForm.date = new Date(  parseInt(date[2], 10), parseInt(date[1], 10), parseInt(date[0], 10));
    }
    */
    console.log(this.className + methodName + ' - parsed: ' + this.dataForm.date);
  }

  getActionTask(): typeof ActionTask {
    return ActionTask; 
  }
  editTask(): void  {
    this.actionTask = ActionTask.EDIT_TASK;
  }
  
  save(form: any) {
    const methodName = 'save';
    // validazione form
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
    const test = this.dateAdapter.fromModel(this.insertDate);
    console.log(this.className + methodName + ' - test: ');
    console.log(test);
    this.dataForm.date = new Date(Date.UTC(test.year, test.month - 1, test.day, 0, 0, 0, 0));
    console.log(this.className + methodName + ' - date create: ' + this.dataForm.date);
    console.log(this.className + methodName + ' - date create timestamp: ' + this.dataForm.date.getTime());
    console.log(this.className + methodName + ' - date create ISO: ' + this.dataForm.date.toISOString()); 
    this.outTask.emit(this.dataForm);
    this.activeModal.close('Close click');
  }

}
