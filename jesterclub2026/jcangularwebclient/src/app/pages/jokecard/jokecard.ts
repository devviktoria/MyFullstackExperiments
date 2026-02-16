import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { JokeSummary } from '../../interfaces/jokesummary.data';
import { JokeReaction } from '../../types/jokereaction.data';

@Component({
  selector: 'app-jokecard',
  imports: [MatCardModule, MatChipsModule, MatBadgeModule, MatIconModule],
  templateUrl: './jokecard.html',
  styleUrl: './jokecard.scss',
})

export class JokeCard {
  joke = input.required<JokeSummary>();
  jokeReactionEvent = output<JokeReaction>();


  private cardClassNames = ['joke-card-yellow', 'joke-card-red', 'joke-card-blue'];
  emojiCharacters = [
    { emotion: 'sleepy', emoji: '😴' },
    { emotion: 'none', emoji: '😐' },
    { emotion: 'happy', emoji: '😀' },
    { emotion: 'lol', emoji: '😁' },
    { emotion: 'lshic', emoji: '🤣' },
  ];

  cardClassName = this.getCardClassName();

  getCardClassName() {
    var index = Math.floor(Math.random() * this.cardClassNames.length);
    return this.cardClassNames[index];
  }

  getEmojiForEmotion(emotion: string) {
    return this.emojiCharacters.find(char => char.emotion === emotion)?.emoji
  }

  getEmotionCounter(emotion: string) {
    return this.joke().emotionResponses.find(er => er.emotion === emotion)?.counter;
  }

  jokeReaction(emotion: string) {
    this.jokeReactionEvent.emit({ jokeId: this.joke().jokeId, emotion: emotion });
  }
}
