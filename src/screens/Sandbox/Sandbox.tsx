import {router} from 'expo-router';
import {useState} from 'react';

import {Box, DqsItem, Icon, Pill, SafeAreaBox, ScrollBox, Text} from 'src/components';
import {DQS_CATEGORIES} from 'src/constants/dqs';
import type {DqsValue} from 'src/constants/dqs.types';

const DQS_SAMPLES: DqsValue[] = [2, 1, 0, -1, -2];

const Section = ({title, children}: {title: string; children: React.ReactNode}) => (
  <Box gap="sm">
    <Text
      variant="subtitle"
      color="textMuted"
    >
      {title}
    </Text>
    {children}
  </Box>
);

const SwatchRow = ({label, color}: {label: string; color: 'mainBackground' | 'cardBackground' | 'surfaceMuted' | 'accentPrimary' | 'highlight' | 'borderSubtle' | 'borderStrong' | 'textPrimary' | 'textMuted'}) => (
  <Box
    flexDirection="row"
    alignItems="center"
    gap="m"
  >
    <Box
      width={40}
      height={40}
      borderRadius="m"
      backgroundColor={color}
      borderWidth={1}
      borderColor="borderSubtle"
    />
    <Text variant="description">{label}</Text>
  </Box>
);

export const Sandbox = () => {
  const [pillSelected, setPillSelected] = useState(false);
  const [dqsCounts, setDqsCounts] = useState<Record<DqsValue, number>>({2: 0, 1: 0, 0: 0, [-1]: 0, [-2]: 0});

  const sampleCategoryFor = (value: DqsValue) =>
    DQS_CATEGORIES.find(c => c.value === value) ?? DQS_CATEGORIES[0];

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="mainBackground"
      edges={['top']}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="l"
        paddingVertical="m"
      >
        <Pill
          label="Back"
          icon="arrow-back"
          onPress={() => router.back()}
        />
        <Text variant="subtitle">Sandbox</Text>
        <Box width={80} />
      </Box>

      <ScrollBox
        flex={1}
        paddingHorizontal="l"
        contentContainerStyle={{gap: 24, paddingBottom: 40}}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Text variants">
          <Box gap="xs">
            <Text variant="title">Title 32/32 bold</Text>
            <Text variant="subtitle">Subtitle 20/20 bold</Text>
            <Text variant="description">Description 16/24 normal</Text>
            <Text variant="label">Label 14/14 bold</Text>
            <Text variant="labelCaption">Label caption 12/12 normal</Text>
            <Text variant="link">Link 16/30 accent</Text>
          </Box>
        </Section>

        <Section title="Semantic color swatches">
          <Box gap="s">
            <SwatchRow
              label="mainBackground"
              color="mainBackground"
            />
            <SwatchRow
              label="cardBackground"
              color="cardBackground"
            />
            <SwatchRow
              label="surfaceMuted"
              color="surfaceMuted"
            />
            <SwatchRow
              label="accentPrimary"
              color="accentPrimary"
            />
            <SwatchRow
              label="highlight"
              color="highlight"
            />
            <SwatchRow
              label="borderSubtle"
              color="borderSubtle"
            />
            <SwatchRow
              label="borderStrong"
              color="borderStrong"
            />
            <SwatchRow
              label="textPrimary"
              color="textPrimary"
            />
            <SwatchRow
              label="textMuted"
              color="textMuted"
            />
          </Box>
        </Section>

        <Section title="Icons">
          <Box
            flexDirection="row"
            gap="m"
            alignItems="center"
          >
            <Icon
              name="restaurant"
              size={28}
            />
            <Icon
              name="local-drink"
              size={28}
            />
            <Icon
              name="cookie"
              size={28}
            />
            <Icon
              name="add-a-photo"
              size={28}
            />
            <Icon
              name="access-time"
              size={28}
              color="accentPrimary"
            />
            <Icon
              name="favorite"
              size={28}
              color="highlight"
            />
          </Box>
        </Section>

        <Section title="Pills">
          <Box
            flexDirection="row"
            flexWrap="wrap"
            gap="s"
          >
            <Pill label="Basic" />
            <Pill
              label="With icon"
              icon="check"
            />
            <Pill
              icon="delete"
              onPress={() => {}}
            />
            <Pill
              label="Toggle me"
              selected={pillSelected}
              onPress={() => setPillSelected(p => !p)}
            />
            <Pill
              label="Always selected"
              icon="star"
              selected
            />
          </Box>
        </Section>

        <Section title="DQS items (one per value)">
          <Box gap="s">
            {DQS_SAMPLES.map(value => {
              const category = sampleCategoryFor(value);
              return (
                <DqsItem
                  key={value}
                  category={category}
                  icon="restaurant"
                  count={dqsCounts[value]}
                  onIncrement={() => setDqsCounts(c => ({...c, [value]: c[value] + 1}))}
                  onDecrement={() => setDqsCounts(c => ({...c, [value]: Math.max(0, c[value] - 1)}))}
                />
              );
            })}
          </Box>
        </Section>
      </ScrollBox>
    </SafeAreaBox>
  );
};
