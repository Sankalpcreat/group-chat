export interface GuestLoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: (name: string, age: number) => void;
}
