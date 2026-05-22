import {Image} from 'expo-image';

import {Box, Icon, Pressable, Text} from 'src/components';
import {DiaryEntry} from 'src/types/diary';
import {formatTimestamp} from 'src/utils/dateTime';

import {useDiaryStore} from '../../hooks';

type EntryProps = {
  item: DiaryEntry;
};

const Entry = ({item}: EntryProps) => {
  const {openDetailModal} = useDiaryStore(store => ({
    openDetailModal: store.openDetailModal,
  }));

  const placeholderIcon =
    item.category === 'drink' ? 'local-drink' : item.category === 'snack' ? 'cookie' : 'restaurant';

  return (
    <Pressable
      flexGrow={1}
      flexBasis="30%"
      maxWidth="32%"
      gap="xs"
      onPress={() => {
        openDetailModal(item);
      }}
    >
      {item.uri ? (
        <Image
          source={{uri: item.uri}}
          style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
          contentFit="cover"
        />
      ) : (
        <Box
          width="100%"
          aspectRatio={1}
          borderRadius="s"
          borderWidth={1}
          borderColor="borderSubtle"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            name={placeholderIcon}
            size={40}
          />
        </Box>
      )}

      <Text variant="description">{formatTimestamp(item.takenAt)}</Text>
    </Pressable>
  );
};

export default Entry;
