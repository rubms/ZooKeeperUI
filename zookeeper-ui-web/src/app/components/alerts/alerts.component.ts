import { Component, OnInit, Input } from '@angular/core';

export enum AlertType {
  Warning,
  Error,
  Success
}

export class AlertList {
  alerts: Alert[];

  constructor() {
    this.alerts = [];
  }

  addAlert(alert: Alert){
    this.alerts.push(alert);
    setTimeout(() => {
      this.removeAlert(alert)
    }, alert.timeOut !== undefined ? alert.timeOut : 8000);
  }

  removeAlert(alert: Alert) {
    let index = this.alerts.findIndex(item => item === alert);
    if (index !== undefined)
      this.alerts.splice(index, 1);
  }
}
export interface Alert {
  alertType: AlertType;
  message: string;
  timeOut?: number;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  @Input() alerts: AlertList;

  constructor() {
    this.alerts = new AlertList();
  }

  ngOnInit() {
  }

  isError(alert: Alert) {
    return alert.alertType === AlertType.Error;
  }

  isWarning(alert: Alert) {
    return alert.alertType === AlertType.Warning;
  }

  isSuccess(alert: Alert) {
    return alert.alertType === AlertType.Success;
  }
}