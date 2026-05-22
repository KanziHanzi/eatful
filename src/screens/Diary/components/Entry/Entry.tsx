import {Image} from 'expo-image';
import {Pressable} from 'react-native';
import {Text} from 'src/components';
import {DiaryEntry} from '@/src/screens/Diary/Diary.types';
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
        source={{uri: item.uri}}
        style={styles.image}
        contentFit="cover"
      />

      <Text variant="description">{formatTimestamp(item.takenAt)}</Text>
    </Pressable>
  );
};

export default Entry;
