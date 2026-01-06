import { useState } from 'react';

interface Props {
  onAddTrainer: (name: string, email: string) => void;
}

export default function TrainerForm({ onAddTrainer }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTrainer(name, email);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <button type="submit">Add Trainer</button>
    </form>
  );
}
