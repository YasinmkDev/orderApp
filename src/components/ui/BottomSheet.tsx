import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheetRaw, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { theme } from '../../theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  snapPoints?: string[];
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  snapPoints: customSnapPoints,
  children,
}) => {
  const sheetRef = useRef<BottomSheetRaw>(null);
  const snapPoints = customSnapPoints || ['50%'];

  const handleClose = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  if (!visible) return null;

  return (
    <BottomSheetRaw
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheetRaw>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  handle: {
    paddingTop: theme.spacing.sm,
    paddingBottom: 0,
  },
  handleIndicator: {
    backgroundColor: theme.colors.border,
    width: 36,
    height: 4,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
});
