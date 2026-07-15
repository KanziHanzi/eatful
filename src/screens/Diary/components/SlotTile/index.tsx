import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Pressable, View} from 'react-native';
import {Icon} from 'src/components/atoms';
import {ThemedText, ThemedView} from 'src/components/primitives';
import type {DiaryEntry} from 'src/screens/Diary/Diary.types';
import type {MealSlot} from 'src/screens/Diary/slots';
import {formatTimestamp} from 'src/utils/dateTime';
import {formatDietaryScore, getEntryScore} from 'src/utils/dqs';
import {styles} from './SlotTile.styles';

type SlotTileProps = {
  slot: MealSlot;
  entry?: DiaryEntry;
  canLog: boolean;
};

const SlotTile = ({slot, entry, canLog}: SlotTileProps) => {
  if (entry) {
    return (
      <View style={styles.tile}>
        <ThemedText variant="description" style={styles.label} numberOfLines={1}>
          {slot.label}
        </ThemedText>

        <Pressable onPress={() => router.push(`/new-entry?entryId=${entry.id}`)}>
          <Image
            source={{uri: entry.imageUri ?? undefined}}
            style={styles.image}
            contentFit="cover"
          />

          <ThemedView style={styles.meta}>
            <ThemedText variant="description">{formatTimestamp(entry.takenAt)}</ThemedText>
            <ThemedText variant="description">{formatDietaryScore(getEntryScore(entry.selectedTiers))}</ThemedText>
          </ThemedView>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.tile}>
      <ThemedText variant="description" style={styles.label} numberOfLines={1}>
        {slot.label}
      </ThemedText>

      <Pressable
        disabled={!canLog}
        onPress={() => router.push(`/new-entry?category=${slot.category}`)}
        style={({pressed}) => ({opacity: !canLog ? 0.3 : pressed ? 0.8 : 1})}
      >
        <ThemedView
          style={styles.emptyBox}
          borderColor="addTileBorder"
        >
          <Icon
            name="add"
            size={32}
          />
        </ThemedView>
      </Pressable>
    </View>
  );
};

export default SlotTile;
