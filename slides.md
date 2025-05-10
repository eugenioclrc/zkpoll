---
marp: true
theme: default
paginate: true
header: PollZK
footer: Noir Hackathon 2025
backgroundColor: #fff
---

# **PollZK**

### Trust‑less Political Polling

*Proving public opinion without revealing private data*

*Noir Hackathon 2025*

![Cover – Voting illustration](https://source.unsplash.com/1600x900/?voting)

---

## The Pain Today

![Polling Money Hole](https://source.unsplash.com/800x400/?political,debate)

* Campaigns burn **millions** on closed‑source pollsters
* Citizens share data **for free**
* Privacy breaches & **Sybil attacks**
* Zero public verifiability

---

## Our Solution

![Zero‑Knowledge Proof](https://source.unsplash.com/800x400/?zeroknowledge)

**PollZK** turns every survey into an on‑chain, zero‑knowledge protocol:

1. **zkPassport** credential → proves *unique human*
2. **ElGamal‑encrypted** answers → keeps votes secret
3. **Poseidon Merkle tree** → prevents double voting
4. **Direct payouts** to respondents – *no middlemen*

---

## Architecture

![Architecture diagram](https://source.unsplash.com/800x400/?blockchain,diagram)

```mermaid
flowchart LR
  subgraph Client
    A[User • zkPassport] -->|Answers| C(Prover — Noir)
  end
  C -->|Proof + Ciphertext| D[PollZK Smart Contract]
  D -->|Reward| A
  D -->|Aggregated Proof| E[Public Dashboard]
```

---

## Cryptography in 15 s

![Merkle Tree](https://source.unsplash.com/800x400/?merkle,tree)

* **Poseidon root** commits each identity once
* **Nullifier hash** blocks re‑use
* **ElGamal** keeps responses unlinkable
* Solidity verifier checks the proof in \~240k gas

---

## Incentive Flow

![Mobile micropayments](https://source.unsplash.com/800x400/?mobile,payment)

```mermaid
sequenceDiagram
    participant C as Campaign
    participant U as User
    participant SC as Smart Contract
    C->>SC: Fund survey
    U->>SC: Proof + Cipher
    SC-->>U: Stablecoin reward
    SC-->>C: Final tally proof
```

---

## UX Demo *(GIF)*

![Demo GIF](https://media.giphy.com/media/26u4nJPf0JtQPdStq/giphy.gif)

1. Sign with zkPassport
2. Answer 5 questions
3. Click **Submit** → get paid

---

## Impact

* **90 % cost reduction** vs. legacy polling
* Respondents finally **own their data & revenue**
* Public can verify results → **Trust regained**

---

## Roadmap

|  Milestone                | Deliverable      | ETA        |
| ------------------------- | ---------------- | ---------- |
| MVP circuit & contract    | Testnet live     | **Week 1** |
| Front‑end + payouts       | Mobile‑first UI  | **Week 2** |
| Worldcoin & analytics API | Multi‑ID support | Post‑hack  |

---

## Ask

🏗 **Looking for:**

* Feedback on incentive model
* Beta campaigns & civic partners
* Funding ⇢ scaling gas subsidies

> *Let’s upgrade democracy to proof‑based polling.*

**Thank you!**
Contact: `@PollZK` · Eugenio & Team
