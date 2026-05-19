import {Image} from 'expo-image';
import {Pressable, View} from 'react-native';
import {Icon, Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {DiaryEntry} from 'src/types/diary';
import {formatTimestamp} from 'src/utils/dateTime';
import {useDiaryStore} from '../../hooks';
import {styles} from './Entry.styles';

type EntryProps = {
  item: DiaryEntry;
};

const Entry = ({item}: EntryProps) => {
  const {palette} = useTheme();

  const {openDetailModal} = useDiaryStore(store => ({
    openDetailModal: store.openDetailModal,
  }));

  const placeholderIcon =
    item.category === 'drink' ? 'local-drink' : item.category === 'snack' ? 'cookie' : 'restaurant';

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        openDetailModal(item);
      }}
    >
      {item.uri ? (
        <Image
          source={{uri: item.uri}}
          style={styles.image}
          contentFit="cover"
        />
      ) : (
        <View style={[styles.imagePlaceholder, {borderColor: palette.inputBorder}]}>
          <Icon
            name={placeholderIcon}
            size={40}
          />
        </View>
      )}

      <Text variant="description">{formatTimestamp(item.takenAt)}</Text>
    </Pressable>
  );
};

export default Entry;
