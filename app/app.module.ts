import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import { MainChatComponent } from './main-chat/main-chat.component';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { GroupInfoPopupComponent } from './group-info-popup/group-info-popup.component';
import { MatDialogModule, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { GroupMemberComponent } from './group-member/group-member.component';
import { GroupAddMemberComponent } from './group-add-member/group-add-member.component';
import { ChooseAvatarComponent } from './choose-avatar/choose-avatar.component';
import { MainThreadComponent } from './main-thread/main-thread.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DialogCreateNewChannelComponent } from './dialog-create-new-channel/dialog-create-new-channel.component';
import { DialogEdituserLogoutComponent } from './dialog-edituser-logout/dialog-edituser-logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DialogUserProfilComponent } from './dialog-user-profil/dialog-user-profil.component';
import { DialogEditProfilComponent } from './dialog-edit-profil/dialog-edit-profil.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedService } from './services/shared.service';
import { UserDataService } from './services/user-data.service';
import { DesktopHeaderComponent } from './desktop-header/desktop-header.component';
import { DialogReauthenticateComponent } from './dialog-reauthenticate/dialog-reauthenticate.component';
import { GroupMemberInfoComponent } from './group-member-info/group-member-info.component';
import { Emoji, EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { DirectChatComponent } from './direct-chat/direct-chat.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { IntroAnimationComponent } from './intro-animation/intro-animation.component';


@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    DesktopHeaderComponent,
    SidebarComponent,
    ImprintComponent,
    DataProtectionComponent,
    LoginComponent,
    RegisterComponent,
    MainChatComponent,
    GroupInfoPopupComponent,
    GroupMemberComponent,
    GroupAddMemberComponent,
    ChooseAvatarComponent,
    MainThreadComponent,
    DialogCreateNewChannelComponent,
    DialogEdituserLogoutComponent,
    ForgotPasswordComponent,
    DialogUserProfilComponent,
    DialogEditProfilComponent,
    ChangePasswordComponent,
    DialogReauthenticateComponent,
    GroupMemberInfoComponent,
    DirectChatComponent,
    IntroAnimationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatTreeModule,
    MatButtonModule,
    MatListModule,
    EmojiComponent,
    PickerComponent,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: 
  [{provide:LocationStrategy, useClass:HashLocationStrategy},
  [
    {
      provide:MatDialogRef,
      useValue: {}
    }
  ],
  SharedService,AppComponent,MainChatComponent ],

  bootstrap: [AppComponent]
})
export class AppModule { }
