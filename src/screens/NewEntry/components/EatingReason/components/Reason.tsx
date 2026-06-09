import {ThemedText, ThemedView} from '@/src/components';
import Icon, {IconName} from '@/src/components/globals/Icon/Icon';
import {EatingReason} from '@/src/screens/Diary/Diary.types';
import {Pressable} from 'react-native';
import {useTheme} from 'src/hooks/useTheme';
import {useEntryStore} from '../../../hooks/entryStore';

type ReasonProps = {
  label: EatingReason;
  icon: IconName;
  width: number;
};

const Reason = ({label, icon, width}: ReasonProps) => {
  const theme = useTheme();

  const {eatingReason, setAttributes} = useEntryStore();

  const selected = eatingReason === label;

  const onPress = () => {
    if (!selected) {
      setAttributes('eatingReason', label);
    }
  };

  return (
    <Pressable
      style={{width}}
      onPress={onPress}
      disabled={selected}
    >
      <ThemedView
        variant="elevated"
        padding="s"
        alignItems="center"
        backgroundColor={selected ? 'selectedSurface' : 'modalCard'}
        borderRadius={theme.borderRadius.m}
      >
        <Icon
          name={icon}
          size={24}
          color={selected ? 'selected' : 'icon'}
        />
        <ThemedText
          variant="caption"
          marginTop='xxs'
          color={selected ? 'selected' : 'text'}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

export default Reason;
