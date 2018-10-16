
import {Component} from '@angular/core';
import {FeathersClientService} from '../../services/feathers-client.service';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {ErrorDialogService} from '../../services/error-dialog.service';



@Component({
  templateUrl: 'contact-page.html',
  styleUrls: ['contact-page.scss'],
})
export class ContactPageComponent {

  message = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private feathersClient: FeathersClientService,
              private dialog: MatDialog,
              private router: Router,
              private errorDialog: ErrorDialogService) {
  }

  sendEmail() {

    const emailMessage = {
      message: `<p>from email: ${this.email.value}</p><br>
                            <p>${this.message.value}</p>  `
    };

    this.feathersClient.service('mailer').create(emailMessage).then(response => {
      console.log(response);
      this.clearFields();
      this.onSaveMessage();
    })
      .catch(error => {
        console.log(error);
        this.errorDialog.displayError(error.message);
      });

  }

  clearFields() {
    this.email.reset('');
    this.message.reset('');
  }

  onSaveMessage() {
    Promise.resolve().then(() => {
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        data: {
          title: 'Message Sent',
          message: 'Your message has been sent, thanks for the feedback',
        },
        panelClass: 'dialog-container'
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/tracker/dashboard']);
      });
    });
  }


  validateFields() {
    if(this.email.hasError('required') || this.message.hasError('required')) {
      this.errorDialog.displayError('Please enter all fields');
    } else if (this.email.invalid){
      this.errorDialog.displayError('Please enter a valid email');
    } else {
      this.sendEmail();
    }
  }

}
