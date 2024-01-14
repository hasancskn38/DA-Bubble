import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDataService } from '../services/user-data.service';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-group-add-member',
  templateUrl: './group-add-member.component.html',
  styleUrls: ['./group-add-member.component.scss'],
  animations: [trigger("dropDownMenu", [
    transition(":enter", [
      style({ height: 0, overflow: "hidden" }),
      sequence([
        animate("200ms", style({ height: "*" })),
      ])
    ]),
    transition(":leave", [
      style({ height: "*", overflow: "hidden" }),
      sequence([
        animate("200ms", style({ height: 0 }))
      ])
    ])
  ]),
  ]
})
export class GroupAddMemberComponent implements OnInit {
  messageDropdown: boolean = false;
  actMembers = this.userDataService.usersFromDatabase;
  actAddMembers = [];
  addSuccess = false ;

  currentChannel = {
    info: {
      name: '',
      members: [],
      created: '',
      description: ''
    },
    id: ''
  };

  /**
   * run when class created
   * 
   * @param dialogRef 
   * @param userDataService 
   * @param sharedService 
   * @param dialogData 
   */
  constructor(
    public dialogRef: MatDialogRef<GroupAddMemberComponent>,
    public userDataService: UserDataService,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  /**
   * init component
   * 
   */
  ngOnInit(): void {
    this.currentChannel.info = this.dialogData[0];
    this.currentChannel.id = this.dialogData[1];
    this.filterUsersNoMembers();
  }

  /**
   * close the dialog and push the members back to the selectable users
   * 
   */
  closeDialog() {
    if (this.actAddMembers) {
      this.actAddMembers.forEach((member) => {
        this.actMembers.push(member);
      });
    }
    this.actAddMembers = [];
    this.dialogRef.close();
  }

  filterUsersNoMembers() {
    
    this.actMembers = this.actMembers.filter(user => {
      const isUserInChannel = this.currentChannel.info.members.some(member => member.name === user.name);
      return !isUserInChannel; // Behalte Benutzer, die nicht in currentChannel.info.members enthalten sind
    });

  }

  /**
  * open drop down for direct messages
  * 
  */
  openDropdownMessages() {
    this.messageDropdown = !this.messageDropdown;
  }

  /**
   * add meber to an array and splice in the available member array
   * 
   * @param userPosition {number} - to add the correct member
   */
  addMember(userPosition: number) {
    this.actAddMembers.push(this.actMembers[userPosition]);
    this.actMembers.splice(userPosition, 1);
  }

  /**
   * push to available members and splice from members you want to add
   * 
   * @param userPosition {number} - to remove the correct user
   */
  removeUser(userPosition: number) {
    this.actMembers.push(this.actAddMembers[userPosition]);
    this.actAddMembers.splice(userPosition, 1);
  }

  /**
   * save users in the channel member info
   * 
   */
  async saveNewUsers() {
    if (this.actAddMembers.length >= 1) {
      this.sharedService.templateIsReady = false;
      this.actAddMembers.forEach(async (user) => {
        let userInfo = {
          name: user.name,
          imgNr: user.avatar,
          email: user.email,
        }
        await this.sharedService.updateMembersInDatabase(userInfo, this.currentChannel.id);
      });
      await this.sharedService.getChannelsFromDataBase(this.currentChannel.info.name);
      if (this.actAddMembers) {
        this.actAddMembers.forEach((member) => {
          this.actMembers.push(member);
        });
      }
      this.sharedService.templateIsReady = false ;
      this.sharedService.getChannelsFromDataBase(this.currentChannel.info.name);
      this.addSuccess = true ;
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
      
    }
  }


}
