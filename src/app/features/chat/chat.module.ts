import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import {
  StreamChatModule,
  StreamAutocompleteTextareaModule,
} from 'stream-chat-angular';

import { ChannelsModule } from '../channels/channels.module';
import { ChatRoutingModule } from './chat-routing.module';

import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ChatRoutingModule,
    StreamAutocompleteTextareaModule,
    ChannelsModule,
    StreamChatModule,
  ],
})
export class ChatModule {}
