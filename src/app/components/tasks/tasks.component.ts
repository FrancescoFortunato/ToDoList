import { Component, OnInit } from '@angular/core';
import { Task, ActionTask } from '@core/models';
import { TasksService, MessagesService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalTaskComponent } from '../modal-task/modal-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  className = 'TasksComponent.';

  tasks: Task[];
  tasksPage: Task[];
  statuses: string[];
  page: number = 1;
  pageSize: number = 5;
  collectionSize: number;
  viewTasks: Task[];

  constructor(
    private taskService: TasksService,
    private msgService: MessagesService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.tasks = this.statuses = [];
   }

  ngOnInit(): void {
    this.getListTask();
    this.getStatus();
  }

  newTask() {
    this.open(new Task(this.tasks.length));
  }

  open(inTask: Task = new Task(this.tasks.length), actionTask: ActionTask = ActionTask.NEW_TASK): void {
    const methodName = 'open';
    const modalRef = this.modalService.open(ModalTaskComponent);
    //const modalRef = this.modalService.open(ModalTask2Component);
    modalRef.componentInstance.inTask = inTask;
    modalRef.componentInstance.actionTask = actionTask;
    modalRef.componentInstance.statues = this.statuses;
    modalRef.componentInstance.outTask.subscribe((value) => {
      const indexOfValue = this.tasks.findIndex(task => task.id === value.id);
      console.log(this.className + methodName + ' - task[' + indexOfValue + ']: ' + JSON.stringify(this.tasks[indexOfValue]) )
      console.log(this.className + methodName + ' - value: ' + JSON.stringify(value) )
      console.log(this.className + methodName + ' - is equals: ' + (JSON.stringify(this.tasks[indexOfValue]) != JSON.stringify(value)));
      console.log(this.className + methodName + ' - index > -1: ' + (indexOfValue > -1));

      
      if (indexOfValue > -1 && JSON.stringify(this.tasks[indexOfValue]) !== JSON.stringify(value))
        this.changeTask(value, indexOfValue);
      else if(indexOfValue < 0)
        this.addTask(value);
      
    })
  }

  getActionTask(): typeof ActionTask {
    return ActionTask; 
  }

  refreshTasks() {
    this.collectionSize = this.tasks.length;
    this.viewTasks = this.tasks.map((task, i) => ({id: i + 1, ...task}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /* CALL SERVICE TASK*/
  getListTask(): void {
    const methodName = 'getListTask';
    this.spinner.show();
    this.taskService.getListTask().subscribe(
      result => {
        this.spinner.hide();
        this.tasks = result;
        this.tasks.forEach(task => task.date = new Date(task.date));
        console.log(this.className + methodName + ' - tasks;');
        console.log(this.tasks);
        this.refreshTasks();
      }, error => {
        this.spinner.hide();
        this.msgService.showErrorMessage(error.message);
      }
    );
  }

  getStatus(): void {
    this.spinner.show();
    this.taskService.getStatuses().subscribe(
      result => {
        this.spinner.hide();
        this.statuses = result;
      }, error => {
        this.spinner.hide();
        this.msgService.showErrorMessage(error.message);
      }
    );
  }
  addTask(task: Task): void {
    this.spinner.show();
    this.taskService.addTask(task).subscribe(
      result => {
        this.spinner.hide();
        this.tasks.push(task);
        this.refreshTasks();
        this.msgService.showInfoMessage("task successfully added!");
        //uncomment when connecting the backend
        //this.getListTask();
      }, error => {
        this.spinner.hide();
        this.msgService.showErrorMessage(error.message);
      }
    );
  }

  changeTask(task: Task, indexOfValue: number): void {
    this.spinner.show();
    this.taskService.changeTask(task).subscribe(
      result => {
        this.spinner.hide();
        this.tasks[indexOfValue] = task;
        this.refreshTasks();
        this.msgService.showInfoMessage("task modified!");
        //uncomment when connecting the backend
        //this.getListTask();
      }, error => {
        this.spinner.hide();
        this.msgService.showErrorMessage(error.message);
      }
    );
  }

  
  deleteTask(task: Task): void {
    const methodName = 'delete';
    this.msgService.showConfirmMessage('Are you sure you want to delete this task?', () => {
    this.spinner.show();
    this.taskService.deleteTask(task).subscribe(
      result => {
        this.spinner.hide();
        this.msgService.showInfoMessage("task modified!");
        //comment this part when connecting the backend
       // const index = this.tasks.indexOf(task);
        const index = this.tasks.findIndex(checkTask => checkTask.id === task.id);
        console.log(this.className + methodName + ' - index: ' + index);
        console.log(this.className + methodName + ' - task.id: ' + task.id);
        if (index > -1)
          this.tasks.splice(index, 1);
        this.refreshTasks();
        //uncomment when connecting the backend
        //this.getListTask();
      }, error => {
        this.spinner.hide();
        this.msgService.showErrorMessage(error.message);
      }
    )});
  }
}
