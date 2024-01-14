import { Component, Inject, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { UserDataService } from '../services/user-data.service';
import { Channel } from '../models/channel.class';
import { Message } from '../models/message.class';


@Component({
  selector: 'app-dialog-create-new-channel',
  templateUrl: './dialog-create-new-channel.component.html',
  styleUrls: ['./dialog-create-new-channel.component.scss'],

})
export class DialogCreateNewChannelComponent implements OnInit {

  channelName: string = '';
  channelDescription: string = '';
  currentUser = '';
  newChannel: Channel = new Channel();
  message = new Message();
  errChannelExist = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public appComponent: AppComponent,
    public firestore: Firestore,
    public userDataService: UserDataService) { }


  /**
   * save the currennt active user in variable
   * 
   */
  ngOnInit() {
    this.currentUser = this.userDataService.currentUser['name'];
  }

  /**
   * save the new channel in the Database
   * check if the channel exist
   * check if there are more then three letters
   * 
   */
  async saveNewChannel() {
    this.checkChannelExist();
    if (!this.errChannelExist) {
      if (this.channelName.length >= 3) {
        this.newChannel.name = this.channelName;
        this.newChannel.description = this.channelDescription;
        this.newChannel.created = this.currentUser;
        this.newChannel.members['name'] = this.userDataService.currentUser['name'];
        this.newChannel.members['imgNr'] = this.userDataService.currentUser['imgNr'];
        /* added by hasan to display the channel name in main chat component */
        const docRef = await addDoc(collection(this.firestore, 'channels'),
          this.newChannel.toJSON()
        ).then(async (docRef) => {
          this.channelName = '';
          this.channelDescription = '';
        }).then(() => {
          this.dialogRef.close({ event: 'start' });
        });
        
      }
    }
  }

  /**
   * check if the channel already exist
   * it should not possible to create two times the same channel
   * 
   */
  checkChannelExist() {
    this.errChannelExist = false;
    let currentInput = this.channelName;
    let lowerInput = currentInput.toLowerCase();

    this.data.channels.forEach((element) => {
      let nameToLower = element.name.toLowerCase();
      if (nameToLower == lowerInput) {
        this.errChannelExist = true;
      }
    });


  }
}
