import { useState, FormEvent } from 'react';
import { useVote } from '@/store/useVote';
import ElGamal from 'elgamal';

interface Candidate {
  id: string;
  name: string;
}

const CANDIDATES: Candidate[] = [
  { id: '1', name: 'Candidate 1' },
  { id: '2', name: 'Candidate 2' },
  { id: '3', name: 'Candidate 3' },
];

export default function VoteForm() {
  const { nullifier, setVote } = useVote();
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoteChange = (candidateId: string, value: boolean) => {
    setVotes(prev => ({
      ...prev,
      [candidateId]: value
    }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nullifier) return;

    setIsSubmitting(true);
    try {
      // Generate ElGamal instance with keys
      const elgamal = await ElGamal.generateAsync(2048);
      
      // Encrypt each vote
      const encryptedVotes = await Promise.all(
        Object.entries(votes).map(async ([candidateId, vote]) => {
          const message = vote ? 1 : 0;
          const encrypted = await elgamal.encryptAsync(message);
          return {
            candidateId,
            encrypted: JSON.stringify(encrypted),
            publicKey: elgamal.y.toString()
          };
        })
      );

      // Store the encrypted votes
      const voteData = {
        nullifier,
        votes: encryptedVotes,
        timestamp: Date.now()
      };

      // Here you would typically send this to your backend
      console.log('Encrypted votes:', voteData);
      
      // Update the vote state
      setVote(nullifier, JSON.stringify(voteData));
      alert('Vote recorded successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        {CANDIDATES.map((candidate) => (
          <div key={candidate.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{candidate.name}</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`vote-${candidate.id}`}
                  checked={votes[candidate.id] === true}
                  onChange={() => handleVoteChange(candidate.id, true)}
                  className="mr-2"
                  disabled={!nullifier || isSubmitting}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`vote-${candidate.id}`}
                  checked={votes[candidate.id] === false}
                  onChange={() => handleVoteChange(candidate.id, false)}
                  className="mr-2"
                  disabled={!nullifier || isSubmitting}
                />
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!nullifier || isSubmitting || Object.keys(votes).length !== CANDIDATES.length}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Vote'}
      </button>
    </form>
  );
} 