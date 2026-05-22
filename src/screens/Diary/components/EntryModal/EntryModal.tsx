import DateTimePicker from '@react-native-community/datetimepicker';
import {randomUUID} from 'expo-crypto';
import {Image} from 'expo-image';
import {router, useLocalSearchParams} from 'expo-router';
import {useState} from 'react';
import {Alert, Modal, Platform} from 'react-native';

import {Box, DqsItem, Icon, Pill, Pressable, SafeAreaBox, ScrollBox, Text} from 'src/components';
import {DQS_CATEGORIES} from 'src/constants/dqs';
import type {DqsCategoryId, DqsValue} from 'src/constants/dqs.types';
import {EATING_REASON_ENABLED} from 'src/constants/features';
import {useCameraCapture} from 'src/hooks/useCameraCapture';
import {eatingReasonOptions, useDiaryStore} from 'src/screens/Diary/hooks';
import type {EatingReason, EntryCategory} from 'src/types/diary';

const DQS_VALUE_GROUPS: {value: DqsValue; label: string}[] = [
  {value: 2, label: '+2 · health-boosting'},
  {value: 1, label: '+1 · good'},
  {value: -1, label: '−1 · occasional'},
  {value: -2, label: '−2 · limit'},
];

const EntryModal = () => {
  const {captureImage, pickFromLibrary, capturing} = useCameraCapture();

  const {category: categoryParam} = useLocalSearchParams<{category?: string}>();
  const category: EntryCategory = categoryParam === 'snack' || categoryParam === 'drink' ? categoryParam : 'meal';

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [reason, setReason] = useState<EatingReason | null>(null);
  const [dqsCategoryIds, setDqsCategoryIds] = useState<DqsCategoryId[]>([]);
  const [takenAt, setTakenAt] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDqsCategory = (id: DqsCategoryId) => {
    setDqsCategoryIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const {addEntry} = useDiaryStore(store => ({
    addEntry: store.addEntry,
  }));

  const handleClose = () => {
    router.back();
  };

  const handleImageResult = (uri: string | null) => {
    if (uri) {
      setImageUri(uri);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert('Add Photo', undefined, [
      {text: 'Take Photo', onPress: () => void captureImage().then(handleImageResult)},
      {text: 'Choose from Library', onPress: () => void pickFromLibrary().then(handleImageResult)},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleSave = () => {
    if (EATING_REASON_ENABLED && !reason) {
      Alert.alert('Reason required', 'Choose why you are eating this entry.');
      return;
    }

    addEntry({
      id: randomUUID(),
      uri: imageUri ?? undefined,
      takenAt: takenAt.getTime(),
      eatingReason: reason ?? undefined,
      category,
      dqsCategoryIds: dqsCategoryIds.length > 0 ? dqsCategoryIds : undefined,
    });

    handleClose();
  };

  return (
    <SafeAreaBox flex={1}>
      <Box
        flex={1}
        paddingHorizontal="ml"
        paddingTop="xxxl"
        paddingBottom="ml"
        gap="sm"
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          minHeight={32}
        >
          <Pill
            label="Cancel"
            onPress={handleClose}
          />
          <Text>Add entry</Text>
          <Pressable
            flexDirection="row"
            alignItems="center"
            gap="xs"
            paddingVertical="xxs"
            paddingHorizontal="sm"
            borderRadius="xxl"
            borderWidth={1}
            borderColor="borderSubtle"
            onPress={() => setShowTimePicker(true)}
          >
            <Icon
              name="access-time"
              size={16}
            />
            <Text
              fontSize={15}
              fontWeight="500"
            >
              {takenAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})}
            </Text>
          </Pressable>
        </Box>

        <ScrollBox
          flex={1}
          contentContainerStyle={{gap: 10, paddingBottom: 4}}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            width="100%"
            aspectRatio={1.45}
            borderRadius="m"
            overflow="hidden"
            onPress={handleAddPhoto}
            disabled={capturing}
          >
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={{width: '100%', height: '100%'}}
                contentFit="cover"
              />
            ) : (
              <Box
                width="100%"
                height="100%"
                borderRadius="m"
                borderWidth={1.5}
                borderStyle="dashed"
                borderColor="borderStrong"
                alignItems="center"
                justifyContent="center"
                gap="sm"
              >
                <Icon
                  name="add-a-photo"
                  size={32}
                />
                <Text>Tap to add photo</Text>
              </Box>
            )}
          </Pressable>

          <Box gap="m">
            <DqsItem
              count={0}
              onIncrement={() => {}}
              onDecrement={() => {}}
              category={DQS_CATEGORIES[0]}
              icon="email"
            />
            {DQS_VALUE_GROUPS.map(group => {
              const groupCategories = DQS_CATEGORIES.filter(c => c.value === group.value);
              return (
                <Box
                  key={group.value}
                  gap="xs"
                >
                  <Text
                    fontSize={13}
                    fontWeight="600"
                    opacity={0.75}
                  >
                    {group.label}
                  </Text>
                  <Box
                    flexDirection="row"
                    flexWrap="wrap"
                    gap="s"
                  >
                    {groupCategories.map(c => (
                      <Pill
                        key={c.id}
                        label={c.label}
                        selected={dqsCategoryIds.includes(c.id)}
                        onPress={() => toggleDqsCategory(c.id)}
                      />
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {EATING_REASON_ENABLED && (
            <Box gap="s">
              <Text>why do I eat this?</Text>
              <Box
                flexDirection="row"
                flexWrap="wrap"
                gap="s"
              >
                {eatingReasonOptions.map(option => (
                  <Pill
                    key={option}
                    label={option}
                    selected={reason === option}
                    onPress={() => setReason(option)}
                  />
                ))}
              </Box>
            </Box>
          )}
        </ScrollBox>

        <Modal
          transparent
          visible={showTimePicker}
          animationType="fade"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <Pressable
            flex={1}
            backgroundColor="backdrop"
            justifyContent="center"
            alignItems="center"
            onPress={() => setShowTimePicker(false)}
          >
            <Pressable
              borderRadius="l"
              padding="l"
              alignItems="center"
              minWidth={280}
              backgroundColor="cardBackground"
            >
              <DateTimePicker
                value={takenAt}
                mode="time"
                display="spinner"
                is24Hour
                onChange={(_event, date) => {
                  if (Platform.OS === 'android') setShowTimePicker(false);
                  if (date) setTakenAt(date);
                }}
              />
              {Platform.OS === 'ios' && (
                <Pressable
                  marginTop="s"
                  paddingVertical="s"
                  paddingHorizontal="xl"
                  onPress={() => setShowTimePicker(false)}
                >
                  <Text>Done</Text>
                </Pressable>
              )}
            </Pressable>
          </Pressable>
        </Modal>

        <Pressable
          marginTop="nano"
          borderRadius="m"
          minHeight={44}
          alignItems="center"
          justifyContent="center"
          backgroundColor="accentPrimary"
          onPress={handleSave}
        >
          <Text
            color="accentOnPrimary"
            fontSize={16}
            fontWeight="600"
          >
            Save entry
          </Text>
        </Pressable>
      </Box>
    </SafeAreaBox>
  );
};

export default EntryModal;
