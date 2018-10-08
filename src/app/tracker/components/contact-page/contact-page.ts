
import {Component} from '@angular/core';
import {FeathersClientService} from '../../services/feathers-client.service';



@Component({
  templateUrl: 'contact-page.html',
  styleUrls: ['contact-page.scss'],
})
export class ContactPageComponent {

  message: string;
  email: string;

    constructor(private feathersClient: FeathersClientService) {
    }

    sendEmail() {

      const emailMessage = `<p>from email: ${this.email}</p><br>
                            <p>${this.message}</p>  `;

      this.feathersClient.service('mailer').create(emailMessage).then(response => {
        console.log(response);
      });

    }

}
