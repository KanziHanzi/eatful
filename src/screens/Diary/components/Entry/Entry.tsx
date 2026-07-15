import {DiaryEntry} from 'src/screens/Diary/Diary.types';
import {formatDietaryScore, getEntryScore} from 'src/utils/dqs';
import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Pressable} from 'react-native';
import {Text} from 'src/components/atoms';
import {ThemedView} from 'src/components/primitives';
import {formatTimestamp} from 'src/utils/dateTime';
import {styles} from './Entry.styles';

type EntryProps = {
  item: DiaryEntry;
};

const Entry = ({item}: EntryProps) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push(`/new-entry?entryId=${item.id}`);
      }}
    >
      <Image
        source={{uri: item.imageUri ?? undefined}}
        style={styles.image}
        contentFit="cover"
      />

      <ThemedView
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text variant="description">{formatTimestamp(item.takenAt)}</Text>
        {item.selectedTiers ? (
          <Text variant="description">{formatDietaryScore(getEntryScore(item.selectedTiers))}</Text>
        ) : null}
      </ThemedView>
    </Pressable>
  );
};

export default Entry;
