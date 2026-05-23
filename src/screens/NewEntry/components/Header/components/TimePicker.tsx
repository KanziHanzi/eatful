import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useTheme} from 'src/hooks/useTheme';

import {useState} from 'react';
import {Modal, Pressable, TouchableOpacity} from 'react-native';
import {Icon, ThemedText, ThemedView} from 'src/components';

// TODO: replace with expo DateTimePicker after update to Expo 56
const TimePicker = () => {
  const {colors} = useTheme();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const onTimeChange = (_event: DateTimePickerEvent, date: Date | undefined) => {
    if (date) setSelectedTime(date);
  };

  const formattedTime = selectedTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});

  return (
    <>
      <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
        <ThemedView
          flexDirection="row"
          alignItems="center"
          paddingVertical="xxs"
          paddingHorizontal="xs"
          borderWidth={1}
          borderRadius={99}
          borderColor="inputBorder"
        >
          <Icon
            name="access-time"
            size={16}
            color="tint"
          />
          <ThemedText
            variant="description"
            marginLeft="xxs"
          >
            {formattedTime}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <Modal
        transparent
        visible={showDateTimePicker}
        animationType="fade"
        onRequestClose={() => setShowDateTimePicker(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: colors.backdrop,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowDateTimePicker(false)}
        >
          <Pressable>
            <ThemedView
              backgroundColor="modalCard"
              borderRadius={14}
              padding="s"
              alignItems="center"
            >
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                is24Hour
                onChange={onTimeChange}
              />
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default TimePicker;
