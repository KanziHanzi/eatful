import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Alert} from 'react-native';

import {Box, Icon, Pill, SafeAreaBox, Text} from 'src/components';
import {useDiaryStore} from 'src/screens/Diary/hooks';

const EntryDetailModal = () => {
  const {selectedEntry, deleteEntry} = useDiaryStore(store => ({
    selectedEntry: store.selectedEntry,
    deleteEntry: store.deleteEntry,
  }));

  const handleClose = () => router.back();

  const handleDelete = () => {
    if (!selectedEntry) return;

    Alert.alert('Delete entry?', 'This entry will be permanently removed.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteEntry(selectedEntry.id),
      },
    ]);
  };

  return (
    <SafeAreaBox
      flex={1}
      edges={['bottom']}
    >
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
            label="Close"
            onPress={handleClose}
          />
          <Text>Entry details</Text>
          <Pill
            icon="delete"
            onPress={handleDelete}
          />
        </Box>

        {selectedEntry ? (
          <Box
            width="100%"
            aspectRatio={1.45}
            borderRadius="m"
            overflow="hidden"
          >
            {selectedEntry.uri ? (
              <Image
                source={{uri: selectedEntry.uri}}
                style={{width: '100%', height: '100%'}}
                contentFit="cover"
              />
            ) : (
              <Box
                width="100%"
                height="100%"
                borderWidth={1}
                borderColor="borderSubtle"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  name={
                    selectedEntry.category === 'drink'
                      ? 'local-drink'
                      : selectedEntry.category === 'snack'
                        ? 'cookie'
                        : 'restaurant'
                  }
                  size={80}
                />
              </Box>
            )}
          </Box>
        ) : null}

        {selectedEntry?.eatingReason && (
          <Box
            flexDirection="row"
            alignItems="center"
            gap="s"
          >
            <Text>why do I eat this?</Text>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              gap="s"
            >
              <Pill
                label={selectedEntry.eatingReason}
                selected
              />
            </Box>
          </Box>
        )}
      </Box>
    </SafeAreaBox>
  );
};

export default EntryDetailModal;
