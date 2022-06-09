import { environment } from '../../../../environments/environment';

import {
  OnInit,
  AfterViewInit,
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { of, map, from, catchError, switchMap, Observable } from 'rxjs';
import { Channel } from 'stream-chat';
import {
  ChannelService,
  StreamI18nService,
  ChatClientService,
  CustomTemplatesService,
  ChannelActionsContext,
  ChannelPreviewContext,
  DefaultStreamChatGenerics,
} from 'stream-chat-angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  chatIsReady$!: Observable<boolean>;

  @ViewChild('channelActionsTemplate')
  private _channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('_channelPreview')
  private _channelPreview!: TemplateRef<ChannelPreviewContext>;

  constructor(
    private readonly _auth: AuthService,
    private readonly _chatService: ChatClientService,
    private readonly _channelService: ChannelService,
    private readonly _streamI18nService: StreamI18nService,
    private readonly _customTemplatesService: CustomTemplatesService
  ) {}

  ngOnInit(): void {
    this._streamI18nService.setTranslation();
    this.chatIsReady$ = this._auth.getStreamToken().pipe(
      switchMap((streamToken) =>
        this._chatService.init(
          environment.stream.key,
          this._auth.getCurrentUser().uid,
          streamToken
        )
      ),
      switchMap(() =>
        this._channelService.init({
          type: 'messaging',
          members: { $in: [this._auth.getCurrentUser().uid] },
        })
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }
  
  ngAfterViewInit(): void {
    this._customTemplatesService.channelPreviewTemplate$.next(
      this._channelPreview
    );
    this._customTemplatesService.channelActionsTemplate$.next(
      this._channelActionsTemplate
    );
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this._chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: [this._auth.getCurrentUser().uid],
      }
    );
    from(channel.create());
  }

  activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this._channelService.setAsActiveChannel(channel);
  }
}
