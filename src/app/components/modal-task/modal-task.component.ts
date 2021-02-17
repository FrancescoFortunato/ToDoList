import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Task, ActionTask } from '@core/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './date-adapter';
import { CustomDateParserFormatter } from './date-formatter';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ModalTaskComponent implements OnInit {
  @Input() inTask: Task;
  @Input() actionTask: ActionTask;
  @Input() statues: Array<string>;
  public isSubmit: boolean;
  insertDate: string;
  dataForm: Task;
  @Output() outTask: EventEmitter<Task> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnInit(): void {
    this.dataForm = { ...this.inTask };
    const tmpDate = new Date(this.dataForm.date);
    this.insertDate = this.dateAdapter.toModel(
      this.calendar.getPrev(new NgbDate(tmpDate.getFullYear(), tmpDate.getMonth() + 1, tmpDate.getDate() + 1))
    );
  }

  getActionTask(): typeof ActionTask {
    return ActionTask;
  }
  editTask(): void {
    this.actionTask = ActionTask.EDIT_TASK;
  }

  save(form: any) {
    // validation form
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
    const test = this.dateAdapter.fromModel(this.insertDate);
    this.dataForm.date = new Date(Date.UTC(test.year, test.month - 1, test.day, 0, 0, 0, 0));
    this.outTask.emit(this.dataForm);
    this.activeModal.close('Close click');
  }
}
