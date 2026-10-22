import { initClinopsHeroBg } from './src/clinops-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';
import { initClinopsProof } from './src/clinops-proof.js';
import { initClinopsWorkflow } from './src/clinops-workflow.js';

document.querySelectorAll('[data-pv="clinops-hero-bg"]').forEach((el) => initClinopsHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
document.querySelectorAll('[data-pv="clinops-proof"]').forEach((el) => initClinopsProof(el));
document.querySelectorAll('[data-pv="clinops-workflow"]').forEach((el) => initClinopsWorkflow(el));
