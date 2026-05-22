import {useMemo} from 'react';

import {Box, Text} from 'src/components';
import {useDiaryStore} from 'src/screens/Diary/hooks';

const Insights = () => {
  const {activeDay} = useDiaryStore(store => ({
    activeDay: store.activeDay,
  }));

  const entries = activeDay?.entries ?? [];

  const reasonCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const entry of entries) {
      if (entry.eatingReason) {
        counts[entry.eatingReason] = (counts[entry.eatingReason] ?? 0) + 1;
      }
    }

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [entries]);

  if (entries.length === 0) {
    return null;
  }

  const maxCount = reasonCounts.length > 0 ? reasonCounts[0][1] : 1;

  return (
    <Box
      gap="sm"
      paddingTop="sm"
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="subtitle">Insights</Text>
        <Text>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Text>
      </Box>

      {reasonCounts.map(([reason, count]) => (
        <Box
          key={reason}
          flexDirection="row"
          alignItems="center"
          gap="sm"
        >
          <Text
            width={72}
            textTransform="capitalize"
          >
            {reason}
          </Text>
          <Box
            flex={1}
            height={14}
            borderRadius="s"
            overflow="hidden"
            backgroundColor="borderSubtle"
          >
            <Box
              height="100%"
              borderRadius="s"
              backgroundColor="accentPrimary"
              width={`${(count / maxCount) * 100}%`}
            />
          </Box>
          <Text
            width={24}
            textAlign="right"
          >
            {count}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Insights;
