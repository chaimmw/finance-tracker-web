
import {Component} from '@angular/core';
import {FeathersClientService} from '../../services/feathers-client.service';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';



@Component({
  templateUrl: 'contact-page.html',
  styleUrls: ['contact-page.scss'],
})
export class ContactPageComponent {

  message = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private feathersClient: FeathersClientService,
              private dialog: MatDialog,
              private router: Router) {
  }

  sendEmail() {

    const emailMessage = {
      message: `<p>from email: ${this.email}</p><br>
                            <p>${this.message}</p>  `
    };

    this.feathersClient.service('mailer').create(emailMessage).then(response => {
      console.log(response);
      this.clearFields();
      this.onSaveMessage();
    });

  }

  clearFields() {
    this.email.setValue('');
    this.message.setValue('');
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

}
