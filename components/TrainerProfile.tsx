import type { ITrainer } from '../types/trainer.type';

interface Props {
  trainer: ITrainer;
  onLogout: () => void;
}

export default function TrainerProfile({ trainer, onLogout }: Props) {
  return (
    <>
      <h2>Hello Trainer {trainer.name}</h2>
      <p>Email: {trainer.email}</p>
      <p>Status: {trainer.isActive ? 'Active' : 'Inactive'}</p>

      <button onClick={onLogout}>Logout</button>
    </>
  );
}
