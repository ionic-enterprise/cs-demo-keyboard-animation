import { Injectable } from '@angular/core';

import { ChatMessage } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: Array<ChatMessage> = [];
  private responses: Array<string> = [
    'Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering.',
    'You must unlearn what you have unlearned.',
    'Try not. Do or do not. There is no try.',
    'We must wake.',
    'When you look at the dark side, careful you must be, for the dark side looks back.',
    'Named must be your fear before banish it you can.',
    'You will know good from bad when you are at peace and passive.',
    'Train yourself to let go of everything you fear to lose.',
    'Luminous beings are we, not this crude matter.',
    'Size matters not. Look at me. Judge me by my size, do you?',
    'Always two there are, no more, no less. A master and an apprentice.',
    'Always pass on what you have learned.',
    'A Jedi uses the Force for knowledge and defense, never for attack.',
    'You fail because you don’t believe.',
    'If you end your training now, if you choose the quick and easy path as Vader did, you will become an agent of evil.',
    'Patience you must have.',
    'The dark side clouds everything. Impossible to see the future the future is.',
    'Clear your mind.',
    'Truly wonderful, the mind of a child is.',
    'In the end, cowards are those who follow the dark side.',
  ];

  send(msg: string) {
    this.messages.push({ author: 'me', message: msg });
    this.messages.push({
      author: 'yoda',
      message: this.responses[this.getRandomIdx()],
    });
  }

  history(): Array<ChatMessage> {
    return this.messages;
  }

  private getRandomIdx() {
    return Math.floor(Math.random() * Math.floor(this.responses.length));
  }
}
