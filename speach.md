### 3-Minute Pitch Script --- "**PollZK: Trust-less Political Polling**"

* * * * *

**0 : 00 -- 0 : 15 Hook**\
"Imagine a world where political polls are **cheap, instant, and cryptographically verifiable**---and where every voter who shares their opinion is paid directly, instead of enriching a polling agency."

* * * * *

**0 : 15 -- 0 : 45 Problem**

-   Campaigns spend **millions** on polling firms that own the raw data and the methodology.

-   Respondents see **zero compensation** and zero proof that their answers remain private.

-   Current digital polls rely on weak KYC and are ripe for **Sybil attacks** and data leaks.

* * * * *

**0 : 45 -- 1 : 30 Solution (High-level)**\
We're building **PollZK**, a **Noir-powered** protocol that turns every poll into a self-contained, zero-knowledge smart contract.

1.  **Identity** -- Each voter proves *uniqueness* with **zkPassport** (Worldcoin optional in future).

2.  **Privacy** -- Answers are **ElGamal-encrypted** inside the circuit; a Poseidon-Merkle root ties one identity to exactly one ciphertext → **no double voting**.

3.  **Ownership of Data** -- The candidate can choose to decrypt aggregated results---or publish the decryption key for full transparency.

4.  **Incentives** -- Payment flows straight from the campaign wallet to respondents' addresses as soon as a valid proof is submitted. *No middlemen.*

5.  **Auditability** -- Anyone can verify on-chain that:

    -   a vote came from a unique identity,

    -   the tally proof is correct,

    -   all payouts match on-chain totals---without ever revealing individual votes.

* * * * *

**1 : 30 -- 2 : 30 Deep Dive (Technical & UX)**

-   **Circuit**: Noir enforces (a) possession of a zkPassport credential, (b) inclusion in the Poseidon tree, (c) non-reused nullifier, (d) correct ElGamal encryption of responses.

-   **Smart Contract**:

    -   Stores Merkle root and survey metadata.

    -   Verifies ZK proof, releases respondent reward, marks their nullifier used.

    -   Holds an optional **view-key registry** so campaigns can selectively publish decryption keys.

-   **Scalability**: Batch proofs allow thousands of votes per rollup block; cost per voter is pennies.

-   **User Flow**: Mobile wallet → "Sign in with zkPassport" → answer questions → submit proof → instant micropayment.

* * * * *

**2 : 30 -- 2 : 45 Impact**

-   Cuts polling costs by **90 %+**.

-   **Friction-less incentives** boost sample size and demographic diversity.

-   Restores **trust**: campaigns cannot manipulate results; voters cannot be profiled.

* * * * *

**2 : 45 -- 3 : 00 Roadmap & Ask**

-   **Week 1**: MVP Noir circuit + Solidity verifier on testnet.

-   **Week 2**: Front-end with zkPassport login and instant stablecoin payout.

-   **Post-Hackathon**: Support Worldcoin, civicDAO integrations, and off-chain analytics API.

"Join us as mentors, partners, or early design partners---so the next election cycle runs on **provable truth, not pricey guesswork**."
