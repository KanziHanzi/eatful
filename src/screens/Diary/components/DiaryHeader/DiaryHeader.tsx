import {Pressable} from 'react-native';

import {ThemedText} from 'src/components/ThemedText';
import {ThemedView} from 'src/components/ThemedView';

import {styles} from './DiaryHeader.styles';

type DiaryHeaderProps = {
  title: string;
  onPreviousDayPress: () => void;
  onNextDayPress: () => void;
  showNextDayButton: boolean;
  onClearPress: () => void;
};

export const DiaryHeader = ({
  title,
  onPreviousDayPress,
  onNextDayPress,
  showNextDayButton,
  onClearPress,
}: DiaryHeaderProps) => {
  return (
    <ThemedView style={styles.header}>
      <Pressable
        style={styles.clearButton}
        onPress={onClearPress}
      >
        <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
      </Pressable>
      <ThemedView style={styles.titleRow}>
        <Pressable
          style={styles.arrowButton}
          onPress={onPreviousDayPress}
        >
          <ThemedText style={styles.arrowButtonText}>{'<'}</ThemedText>
        </Pressable>

        <ThemedText
          type="title"
          style={styles.title}
        >
          {title}
        </ThemedText>

        {showNextDayButton ? (
          <Pressable
            style={styles.arrowButton}
            onPress={onNextDayPress}
          >
            <ThemedText style={styles.arrowButtonText}>{'>'}</ThemedText>
          </Pressable>
        ) : null}
      </ThemedView>
    </ThemedView>
  );
};
