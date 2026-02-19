import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCaptured, toggleCaptured } from '../store/captureSlice';

export function useCaptureStatus() {
  const dispatch = useAppDispatch();
  const capturedMap = useAppSelector((state) => state.capture.captured);

  const isCaptured = useCallback(
    (id: number) => !!capturedMap[id],
    [capturedMap],
  );

  const setCapturedStatus = useCallback(
    (id: number, captured: boolean) => {
      dispatch(setCaptured({ id, captured }));
    },
    [dispatch],
  );

  const toggleCapturedStatus = useCallback(
    (id: number) => {
      dispatch(toggleCaptured(id));
    },
    [dispatch],
  );

  return {
    isCaptured,
    setCaptured: setCapturedStatus,
    toggleCaptured: toggleCapturedStatus,
  };
}
