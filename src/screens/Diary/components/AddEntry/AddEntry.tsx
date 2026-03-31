import {router} from 'expo-router';
import {Pressable, View} from 'react-native';
import {Icon} from 'src/components';
import type {EntryCategory} from 'src/types/diary';
import {styles} from './AddEntry.styles';

type AddEntryProps = {
  category?: EntryCategory;
};

const AddEntry = ({category}: AddEntryProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.card,
        styles.addTile,
        {
          backgroundColor: 'transparent',
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={() => router.push(category ? `/add-entry?category=${category}` : '/add-entry')}
    >
      <View style={[styles.image, styles.addTileImage]}>
        <Icon
          name="add"
          size={32}
        />
      </View>
    </Pressable>
  );
};

export default AddEntry;
