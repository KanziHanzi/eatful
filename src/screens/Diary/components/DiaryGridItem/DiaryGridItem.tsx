import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Image} from 'expo-image';
import {Pressable, View} from 'react-native';

import {ThemedText} from 'src/components/ThemedText';
import type {DiaryEntry} from 'src/types/diary';
import {formatTimestamp} from 'src/utils/dateTime';

import {styles} from './DiaryGridItem.styles';

type AddTile = {
  id: 'add-tile';
  kind: 'add';
};

type GridItem = DiaryEntry | AddTile;

type DiaryGridItemProps = {
  item: GridItem;
  isCapturing: boolean;
  addTileColor: string;
  onAddPress: () => void;
  onEntryPress: (entry: DiaryEntry) => void;
};

export const DiaryGridItem = ({item, isCapturing, addTileColor, onAddPress, onEntryPress}: DiaryGridItemProps) => {
  if ('kind' in item) {
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
        onPress={onAddPress}
      >
        <View style={[styles.image, styles.addTileImage, {borderColor: addTileColor}]}>
          <MaterialIcons
            name="add"
            size={38}
            color={addTileColor}
          />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        onEntryPress(item);
      }}
    >
      <Image
        source={{uri: item.uri}}
        style={styles.image}
        contentFit="cover"
      />
      <ThemedText style={styles.timestamp}>{formatTimestamp(item.takenAt)}</ThemedText>
    </Pressable>
  );
};
