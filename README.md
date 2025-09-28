<div align="center">
	<h1>Porbi</h1>
	<p><strong>A cheaper, programmable, and omnichain stablecoin payment + liquidity infrastructure powered by an Orbital AMM, x402 payment sessions, and compliance-informed risk tooling.</strong></p>
	<p>
		<em>Unified stablecoin liquidity • HTTP 402 Programmatic Payments • Risk‑aware merchant tooling</em><br/>
	</p>
	<p>
		<a href="https://www.paradigm.xyz/2025/06/orbital">Orbital Design</a> ·
		<a href="https://docs.cdp.coinbase.com">Polygon x402 + Pyth Oracle</a> ·
	</p>
</div>

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [High-Level Architecture](#high-level-architecture)
4. [Repository Structure](#repository-structure)
5. [Smart Contracts](#smart-contracts)
6. [On‑Chain Deployment](#on-chain-deployment)
7. [Backend Service](#backend-service)
8. [Frontend Apps](#frontend-apps)
9. [Environment Variables](#environment-variables)
10. [Liquidity Seeding](#liquidity-seeding)
11. [Cross-Chain (CCTP / OFT) Notes](#cross-chain-cctp--oft-notes)
12. [Risk & Compliance Data](#risk--compliance-data)
13. [Payment (x402) Flow](#payment-x402-flow)
14. [Development Workflow](#development-workflow)
15. [Troubleshooting](#troubleshooting)
16. [Roadmap](#roadmap)
17. [Contributing](#contributing)
18. [License](#license)
19. [Acknowledgments](#acknowledgments)

---

## Overview
Porbi provides unified, capital‑efficient stablecoin liquidity and a programmable payment layer. Merchants define what they want to receive (network + stablecoin); users can pay with any supported stablecoin (even from another chain). The system routes + swaps through an Orbital AMM pool and applies payment gating with x402 (HTTP 402 Payment Required) flow. Risk scoring leverages public issuer disclosures (GENIUS Act compliance data) to produce merchant insights.

## Features
* Orbital‑inspired multi‑token stablecoin AMM (single pooled liquidity, concentrated via higher‑dimensional “orbits”).
* x402 programmatic payment sessions (HTTP 402) with future settlement verification hooks.
* Embedded wallet support (Coinbase) for seamless onboarding (smart account ready).
* Risk & compliance ingest (issuer reserve composition → risk score).
* Extensible cross‑chain bridging pattern (LayerZero OFT & CCTP placeholders).
* Liquidity provider mechanics (add/remove; future dynamic tick management).
* Quote + swap endpoints exposed via Node backend.
* Modular frontend hooks for pool state, quotes, swaps, prices, liquidity, risk, and merchant preferences.

## High-Level Architecture
```
User Wallet / Embedded Wallet
				|            
Frontend (Porbit React App)  --(REST)-->  Backend (Express / ethers.js)
				|                                        |
	 x402 Payment Flow <---- Facilitator (future)   |
				|                                        v
 Cross-Chain Bridge (OFT / CCTP) (optional)   OrbitalPool.sol + Support Contracts
																							|  
																Stablecoin Tokens (Mock or Real)
```
Supporting services: risk data ingestion -> scoring (future), price oracles (Pyth integration stub/extension), and seeding script for initial liquidity.

## Repository Structure
```
onchain/          Solidity contracts, deployment scripts, deployment guide
backend-node/     Express + ethers backend (quotes, swaps, payment stubs, seeding)
frontend/         Multiple frontends (Porbit main app, demos)
	Porbit/         Primary React UI (hooks, components, risk + pool dashboards)
CCTP/             Cross-chain transfer sample scripts
media/            Demo GIFs / visuals (ignored in .git)
```

## Smart Contracts
| Contract | Purpose |
|----------|---------|
| `OrbitalPool.sol` | Core multi‑stablecoin AMM, reserves accounting, swaps, liquidity add/remove. |
| `X402PaymentAdapter.sol` | Bridges on-chain swaps and payment/session verification logic. |
| `X402SessionManager.sol` | Manages payment sessions/users (extension for x402). |
| `MockERC20.sol` | Test stablecoins (USDC/PYUSD mocks). |
| `CrossChainSwap.sol` | Placeholder / pattern for omnichain routing. |
| `StablecoinPriceOracle.sol` | Stub/oracle scaffolding for future price/risk usage. |
| `OrbitalPoolX402Extension.sol` | Extended pool with x402‑bound swap methods. |

Core AMM Mechanics (simplified): constant‑product‑like swap using aggregate reserves; radius/planeConstant store geometric concentration meta; tick invariants allow expansion to >2 assets while preserving local price stability near $1.

## On-Chain Deployment
Full details: see `onchain/DEPLOY.md`.

Essential steps:
```bash
export PRIVATE_KEY=...        # funded testnet key
export SEPOLIA_RPC_URL=...
forge script script/DeployAll.s.sol:DeployAll \
	--rpc-url $SEPOLIA_RPC_URL \
	--broadcast
```
Result JSON includes pool + adapter + tokens. Update `backend-node/.env` accordingly:
```
CONTRACT_ADDRESS=<pool>
USDC=<token0>
PYUSD=<token1>
VERIFIER_ADDRESS=<verifier-or-0x0>
```

## Backend Service
Path: `backend-node/`

Scripts:
* `npm run dev` – hot reload
* `npm run seed` – approve & add initial liquidity (USDC/PYUSD)

Key Endpoints (abbrev):
```
GET  /api/pool/info
GET  /api/pool/stats
GET  /api/pool/reserves
GET  /api/quote?tokenIn&tokenOut&amountIn
POST /api/swap/execute
GET  /api/payment/requirements
POST /api/payment/verify
POST /api/payment/settle
```

Backend Env Variables (sample):
```
PORT=3000
CHAIN_RPC_URL=https://...
CONTRACT_ADDRESS=0xPool
USDC=0xToken0
PYUSD=0xToken1
X402_FACILITATOR_URL=https://...
VERIFIER_ADDRESS=0x...
PRIVATE_KEY=...              # for seeding only (never commit)
```

## Frontend Apps
Primary: `frontend/Porbit/`

Install & Run:
```bash
cd frontend/Porbit
npm install
npm run dev
```

Porbit Environment (example `.env.example`):
```
VITE_BACKEND_URL=http://localhost:3000
VITE_CHAIN_ID=11155111
VITE_POOL_ADDRESS=0xPool
```

Hooks Overview:
| Hook | Responsibility |
|------|----------------|
| `usePool` | Fetch pool stats/reserves/info. |
| `usePrices` | Periodic oracle pricing (Pyth integration placeholder). |
| `useQuote` | Get swap quotes for amountIn. |
| `useSwap` | Build + submit swap tx via provider. |
| `useLiquidity` | Add/remove liquidity interactions. |
| `useRisk` | Risk/compliance data exposure. |
| `useMerchant` | Merchant preference scaffold. |
| `useX402` | Payment/session lifecycle (future). |

## Environment Variables
Group by layer (see previous sections). Provide `.env.example` for each sub‑package. Never commit real private keys.

## Liquidity Seeding
Script: `backend-node/scripts/seed-liquidity.js`
Requirements: `PRIVATE_KEY`, `CHAIN_RPC_URL`, `CONTRACT_ADDRESS` (or `ORBITALPOOL_ADDRESS`), token addresses `USDC`, `PYUSD`.

Invoke:
```bash
cd backend-node
npm run seed
```
Defaults seed 1.0 unit (1,000,000 raw w/ 6 decimals) each side. Adjust with:
```
SEED_AMOUNT_USDC=5000000 SEED_AMOUNT_PYUSD=5000000 npm run seed
```

If approvals timeout: verify RPC health, nonce, and token balances. The script logs allowance & final reserves.

## Cross-Chain (CCTP / OFT) Notes
`CCTP/` folder contains experimental scripts (`transfer.js`, etc.) for Circle CCTP style burning/minting or bridging. LayerZero OFT adapter contracts (in `onchain/lib/LayerZero-v2/`) allow omnichain liquidity unification. Integration path:
1. User asset on remote chain -> OFT adapter burn.
2. Message to home chain -> mint canonical representation.
3. Perform swap in OrbitalPool.
4. (Optional) Bridge back out.

## Risk & Compliance Data
File: `backend/genius_compliance_data.json` (source for ingestion — ensure not globally ignored if needed). Data includes issuer reserve composition, audit cadence, and supply metrics. A scoring module (future) will compute: Reserve Quality, Transparency, Volatility Flags → aggregated Risk Score displayed in UI via `useRisk`.

## Payment (x402) Flow
Current backend stubs endpoints for requirements / verify / settle. Production flow:
1. Frontend fetches `/api/payment/requirements` after gating action.
2. Facilitator obtains signed payment header (out of scope here).
3. `/api/payment/verify` validates & returns `paymentId`.
4. Swap or resource access gated until `/api/payment/settle` confirmation.
5. Future: On-chain adapter marks payment ID consumed to prevent replay.

## Development Workflow
```
git clone <repo>
pnpm|npm install (each package as needed)
Set env vars (contracts + RPC)
Deploy contracts (Foundry) -> copy addresses
Run backend: npm run dev
Run frontend: npm run dev
Seed liquidity: npm run seed
Execute swaps via UI or direct contract calls
```

Testing (future): Foundry tests in `onchain/test/` for AMM invariants; Jest for backend quoting/payment; React Testing Library for hooks.

## Troubleshooting
| Symptom | Cause | Fix |
|---------|-------|-----|
| Quote = 0 | No reserves / zero output reserve | Seed liquidity script; verify balances |
| Revert `liq` | poolReserves[target]==0 | Add initial liquidity for both tokens |
| Approval timeout | RPC latency / gas underpriced | Increase gasPrice, check mempool, re-run |
| `idx` revert | Bad token index | Use indices in deployment order (0/1) |
| Payment blocked | x402 required | Disable (deploy with adapter=0) or implement verification |
| Frontend CORS errors | Backend not running / wrong URL | Update `VITE_BACKEND_URL` |

## Roadmap
* Real oracle integration & TWAPs.
* Dynamic risk scoring service + UI surfacing.
* x402 full facilitator integration & session management.
* Multi‑asset expansion: >2 stablecoins & orbit rebalancing.
* LayerZero OFT live bridging + unified omnichain pool accounting.
* Subgraph indexing & analytics dashboard.
* Comprehensive test suite & formal verification paths.

## Contributing
1. Fork & branch: `feat/<name>`
2. Write focused commits; follow conventional style if adding CI later.
3. Add/update `.env.example` when introducing new config.
4. Open PR with description + testing notes.

## License
MIT (see `LICENSE`). Provide attribution to upstream designs (Orbital) where appropriate.

## Acknowledgments
* Paradigm research team for Orbital AMM design inspiration.
* Coinbase for x402 and embedded wallet infrastructure.
* OpenZeppelin for audited ERC20 interfaces.
* Community & contributors.

---
> Feel free to open issues for questions, ideas, or integration help.





>>>>>>> main
