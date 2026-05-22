import {router} from 'expo-router';

import {Box, Icon, Pressable} from 'src/components';
import type {EntryCategory} from 'src/types/diary';

type AddEntryProps = {
  category?: EntryCategory;
};

const AddEntry = ({category}: AddEntryProps) => {
  return (
    <Pressable
      flexGrow={1}
      flexBasis="30%"
      maxWidth="32%"
      onPress={() => router.push(category ? `/add-entry?category=${category}` : '/add-entry')}
    >
      <Box
        width="100%"
        aspectRatio={1}
        borderRadius="s"
        borderWidth={1.5}
        borderColor="borderStrong"
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          name="add"
          size={32}
        />
      </Box>
    </Pressable>
  );
};

export default AddEntry;
