import {useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {useDiaryContext} from 'src/screens/Diary/hooks';
import {styles} from './Insights.styles';

const Insights = () => {
  const {entries} = useDiaryContext();
  const {palette} = useTheme();

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="subtitle">Insights</Text>
        <Text>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Text>
      </View>

      {reasonCounts.map(([reason, count]) => (
        <View key={reason} style={styles.reasonRow}>
          <Text style={styles.reasonLabel}>{reason}</Text>
          <View style={[styles.barTrack, {backgroundColor: palette.inputBorder}]}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: palette.tint,
                },
              ]}
            />
          </View>
          <Text style={styles.countLabel}>{count}</Text>
        </View>
      ))}
    </View>
  );
};

export default Insights;
