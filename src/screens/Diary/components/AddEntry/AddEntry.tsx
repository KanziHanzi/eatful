import {Pressable, View} from 'react-native';
import {Icon} from 'src/components';
import {useDiaryContext} from 'src/screens/Diary/hooks';
import {styles} from './AddEntry.styles';

const AddEntry = () => {
  const {isCapturing, openAddEntryModal} = useDiaryContext();

  return (
    <Pressable
      style={({pressed}) => [
        styles.card,
        styles.addTile,
        {
          backgroundColor: 'transparent',
          opacity: pressed || isCapturing ? 0.8 : 1,
        },
      ]}
      disabled={isCapturing}
      onPress={openAddEntryModal}
    >
      <View style={[styles.image, styles.addTileImage]}>
        <Icon
          name="arrow-forward"
          size={32}
        />
      </View>
    </Pressable>
  );
};

export default AddEntry;
