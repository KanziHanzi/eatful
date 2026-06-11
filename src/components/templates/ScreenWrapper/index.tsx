import {ReactNode, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {ThemedSafeAreaView, ThemedScrollView} from 'src/components/primitives';

type ScreenWrapperProps = {
  children: ReactNode;
};

const ScreenWrapper = ({children}: ScreenWrapperProps) => {
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const scrollEnabled = viewportHeight !== null && contentHeight !== null && contentHeight > viewportHeight;

  const handleViewportLayout = (event: LayoutChangeEvent) => {
    setViewportHeight(event.nativeEvent.layout.height);
  };

  const handleContentSizeChange = (_width: number, height: number) => {
    setContentHeight(height);
  };

  return (
    <ThemedSafeAreaView flex={1}>
      <ThemedScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{flexGrow: 1}}
        onLayout={handleViewportLayout}
        onContentSizeChange={handleContentSizeChange}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
};

export {ScreenWrapper};
