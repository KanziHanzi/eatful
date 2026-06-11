import type {IconName} from 'src/components/atoms';
import type {EatingReason} from './Diary.types';

export const eatingReasonIcons: Record<EatingReason, IconName> = {
  hungry: 'restaurant',
  pleasure: 'sentiment-very-satisfied',
  social: 'groups',
  stressed: 'bolt',
  cravings: 'local-pizza',
  sadness: 'sentiment-very-dissatisfied',
  reward: 'emoji-events',
  habit: 'event-repeat',
};
