import {Box, SafeAreaBox, ScrollBox, Text} from 'src/components';
import {STRICT_MODE} from 'src/constants/features';
import type {DiaryEntry} from 'src/types/diary';
import {getDayTimestamp} from 'src/utils/dateTime';

import {DiaryGrid, Header, Insights} from './components';
import {useDiaryStore} from './hooks';

const EMPTY_ENTRIES: DiaryEntry[] = [];

export const Diary = () => {
  const {activeDay, activeDayTimestamp} = useDiaryStore(store => ({
    activeDay: store.activeDay,
    activeDayTimestamp: store.activeDayTimestamp,
  }));

  const entries = activeDay?.entries ?? EMPTY_ENTRIES;
  const isViewingToday = activeDayTimestamp === getDayTimestamp(Date.now());

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="mainBackground"
      edges={['top']}
    >
      <Box
        flex={1}
        paddingHorizontal="l"
        paddingTop="xl"
        paddingBottom="s"
        gap="ml"
      >
        <Header />

        <ScrollBox
          contentContainerStyle={{paddingBottom: 16, gap: 10}}
          showsVerticalScrollIndicator={false}
        >
          <DiaryGrid
            entries={entries}
            isViewingToday={isViewingToday}
          />
          {!STRICT_MODE && <Insights />}
        </ScrollBox>

        {STRICT_MODE && (
          <Box
            paddingVertical="xs"
            alignItems="center"
          >
            <Text
              fontSize={11}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing={1.5}
              opacity={0.3}
            >
              strict mode
            </Text>
          </Box>
        )}
      </Box>
    </SafeAreaBox>
  );
};
