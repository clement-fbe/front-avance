import type { ITrainer } from '../types/trainer.type';

interface Props {
  trainers: ITrainer[];
  onSelectTrainer: (trainer: ITrainer) => void;
}

export default function TrainerSelector({ trainers, onSelectTrainer }: Props) {
  return (
    <>
      <h3>Trainers:</h3>
      <ul>
        {trainers.map((t) => (
          <li
            key={t.id}
            onClick={() => onSelectTrainer(t)}
            style={{ cursor: 'pointer' }}
          >
            {t.name} — {t.email}
          </li>
        ))}
      </ul>
    </>
  );
}
