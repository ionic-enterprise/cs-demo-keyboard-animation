import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { KeyboardInfo, Plugins, KeyboardResize } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { ChatMessage } from '@app/models';
import { ChatService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  message: string;
  messages: Array<ChatMessage>;

  @ViewChild('messageInput') inp: HTMLIonInputElement;
  @ViewChild('messageFooter') footer: HTMLIonFooterElement;

  constructor(private chat: ChatService, private platform: Platform) {}

  ngOnInit() {
    if (this.platform.is('ios')) {
      const { Keyboard } = Plugins;
      Keyboard.setResizeMode({ mode: KeyboardResize.None });
      Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) =>
        this.animateIn(info.keyboardHeight),
      );
      Keyboard.addListener('keyboardWillHide', () => this.animateOut());
    }
  }

  ngOnDestroy() {
    const { Keyboard } = Plugins;
    Keyboard.removeAllListeners();
  }

  sendMessage(evt: Event) {
    this.inp.setFocus();
    if (this.message) {
      this.chat.send(this.message);
      this.messages = this.chat.history();
      this.message = '';
    }
  }

  private animateIn(keyboardHeight: number) {
    const footerHtmlElement = <HTMLElement>(<any>this.footer).el;
    const toolbarHtmlElement = footerHtmlElement.querySelector('ion-toolbar');
    footerHtmlElement.style.setProperty(
      'transform',
      `translate3d(0, -${keyboardHeight}px, 0)`,
    );
    footerHtmlElement.style.transition =
      'transform 0.3s cubic-bezier(0.1, 0.76, 0.55, 0.9)';
    toolbarHtmlElement.style.paddingBottom = '0px';
  }

  private animateOut() {
    const footerHtmlElement = <HTMLElement>(<any>this.footer).el;
    const toolbarHtmlElement = footerHtmlElement.querySelector('ion-toolbar');
    footerHtmlElement.style.removeProperty('transform');
    toolbarHtmlElement.style.paddingBottom = 'var(--ion-safe-area-bottom, 0)';
  }
}
