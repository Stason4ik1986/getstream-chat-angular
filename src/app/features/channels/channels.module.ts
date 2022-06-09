import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StreamChatModule } from 'stream-chat-angular';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NewChannelComponent, InviteButtonComponent } from '.';

@NgModule({
  declarations: [NewChannelComponent, InviteButtonComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule,
  ],
  exports: [NewChannelComponent, InviteButtonComponent],
})
export class ChannelsModule {}
