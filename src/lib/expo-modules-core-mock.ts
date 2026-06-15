import { Platform } from 'react-native';

export class EventEmitter {
  addListener() { return { remove: () => {} }; }
  removeListener() {}
  removeAllListeners() {}
  emit() {}
}
export class NativeModule {}
export class SharedObject {}
export class SharedRef {}

export { Platform };
export const createSnapshotFriendlyRef = (ref: any) => ref;
export const registerWebModule = () => {};
export const requireNativeViewManager = () => null;
export const requireNativeModule = () => ({});
export const requireOptionalNativeModule = () => ({});
export const reloadAppAsync = async () => {};
export const installOnUIRuntime = () => {};
export const NativeModulesProxy = {};

export enum PermissionStatus {
  DENIED = 'denied',
  GRANTED = 'granted',
  UNDETERMINED = 'undetermined',
}

export const createPermissionHook = () => {
  return () => [null, () => Promise.resolve(), () => Promise.resolve()];
};

export default {
  EventEmitter,
  NativeModule,
  SharedObject,
  SharedRef,
  Platform,
  createSnapshotFriendlyRef,
  registerWebModule,
  requireNativeViewManager,
  requireNativeModule,
  requireOptionalNativeModule,
  reloadAppAsync,
  installOnUIRuntime,
  NativeModulesProxy,
  PermissionStatus,
  createPermissionHook,
};
