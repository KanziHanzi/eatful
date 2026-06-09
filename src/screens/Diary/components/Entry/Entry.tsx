import {DiaryEntry} from '@/src/screens/Diary/Diary.types';
import {getEntryScore} from '@/src/utils/dqs';
import {Image} from 'expo-image';
import {Pressable} from 'react-native';
import {Text, ThemedView} from 'src/components';
import {formatTimestamp} from 'src/utils/dateTime';
import {useDiaryStore} from '../../hooks';
import {styles} from './Entry.styles';

type EntryProps = {
  item: DiaryEntry;
};

const Entry = ({item}: EntryProps) => {
  const {openDetailModal} = useDiaryStore(store => ({
    openDetailModal: store.openDetailModal,
  }));

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        openDetailModal(item);
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
        <Text variant="description">{getEntryScore(item.selectedTiers)}</Text>
      </ThemedView>
    </Pressable>
  );
};

export default Entry;
