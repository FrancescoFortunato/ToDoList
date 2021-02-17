export class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  date: Date;
  constructor(id: number) {
    this.id = id;
    this.title = '';
    this.description = '';
    this.status = '';
    this.date = new Date();
    //this.date = new Date().getTime().toString();
  }
}
