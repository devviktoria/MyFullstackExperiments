import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { JokeSummary } from '../../interfaces/jokesummary.data';

@Component({
  selector: 'app-jokecard',
  imports: [MatCardModule, MatChipsModule, MatBadgeModule, MatIconModule],
  templateUrl: './jokecard.html',
  styleUrl: './jokecard.scss',
})

export class JokeCard {
  joke = input.required<JokeSummary>();


  private cardClassNames = ['joke-card-yellow', 'joke-card-red', 'joke-card-blue']
  private emojiCharacters = [
    { emotion: 'sleepy', emoji: '😴' },
    { emotion: 'none', emoji: '😐' },
    { emotion: 'happy', emoji: '😀' },
    { emotion: 'lol', emoji: '😁' },
    { emotion: 'lshic', emoji: '🤣' },
  ]

  cardClassName = this.getCardClassName();

  getCardClassName() {
    var index = Math.floor(Math.random() * this.cardClassNames.length);
    return this.cardClassNames[index];
  }

  getEmojiForEmotion(emotion: string) {
    return this.emojiCharacters.find(char => char.emotion === emotion)?.emoji
  }
}
