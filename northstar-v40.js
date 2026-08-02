/* Project 52 v42
 * Private, local-first command center:
 * - permanent lifetime history/XP/levels plus a reversible Momentum stake
 * - adaptive, calendar-aware daily command
 * - one calendar-aware Weekly Project 52 Mission
 * - on-device natural-language logging router
 * - sealed-reward reset history
 * - checksum backups and transactional photo restore
 */
(() => {
  'use strict';

  const PRIVATE_VERSION = 42;
  const AUGUST_PHASE_ID = 'project-52-total-rebuild-2026';
  const AUGUST_PHASE_RESET_ID = 'project-52-v42-total-rebuild-reset';
  const AUGUST_PHASE_START = '2026-08-01';
  const AUGUST_PHASE_END = '2026-12-31';
  const AUGUST_ATTENTION_TARGET = '2026-10-29';
  const JOURNEY_PROMPT_VERSION = 'meaning-compassion-intention-v1';
  const JOURNEY_PROMPT = 'Tell the truth about today. What happened, what feeling or body signal is strongest, what did you do that helped move the rebuild forward, and what is the single most important action for tomorrow? Finish with: “If ___ happens, then I will ___ at ___.”';
  const TOTAL_REBUILD_PHASES = {
    '2026-08': { name: 'Reconnect', directive: 'Re-establish honest contact with body, priorities, and people.' },
    '2026-09': { name: 'Build', directive: 'Repeat the correct minimum until the structure is dependable.' },
    '2026-10': { name: 'Strengthen', directive: 'Add responsible load, skill, and life leverage.' },
    '2026-11': { name: 'Intensify', directive: 'Use earned capacity without abandoning recovery.' },
    '2026-12': { name: 'Prove It', directive: 'Finish with objective evidence and a life you can trust.' }
  };
  const PAIN_AREAS = {
    knee: 'Left knee',
    ankle: 'Right foot / ankle',
    neck: 'Left neck / scapula',
    wrist: 'Right wrist'
  };
  const TRAINING_SESSIONS = {
    chinStrength: { area: 'chinUp', label: 'Weighted maximum-strength chin-up', short: 'Strength', detail: 'Low-repetition, high-quality work with RIR; no routine failure testing.' },
    chinVolume: { area: 'chinUp', label: 'Chin-up volume + technique', short: 'Volume', detail: 'Controlled submaximal volume, consistent range and strict form.' },
    chinSpeed: { area: 'chinUp', label: 'Chin-up speed / density / record-specific', short: 'Speed', detail: 'Fast, technically clean work or approved record-specific practice.' },
    quadStrength: { area: 'lowerBody', label: 'Left quadriceps strength', short: 'Left quad', detail: 'Clinician-permitted strength work with pain and next-day swelling limits.' },
    posteriorChain: { area: 'lowerBody', label: 'Posterior-chain + hip strength', short: 'Posterior chain', detail: 'Hamstring, glute and hip work within current restrictions.' },
    singleLeg: { area: 'lowerBody', label: 'Single-leg control + pistol progression', short: 'Single leg', detail: 'Precision, controlled depth and alignment; no loading unlocked by time alone.' }
  };
  const V41_RESET_DATE = '2026-07-29';
  const V41_RESET_ID = 'project-52-v41-user-reset';
  const USER_REPORTED_PRIOR_STREAK = 14;
  const V37_PHASE_START = '2026-07-29';
  const V37_LAPSE_DATE = '2026-07-28';
  const PRE_IMPORT_STATE_KEY = 'sixMonthForge.preImportRollback.v2';
  const PRE_AUGUST_RESET_BACKUP_KEY = 'sixMonthForge.preAugustTotalRebuild.v1';
  const ZERO_TOLERANCE_AWARD = 100;
  const ZERO_TOLERANCE_CONSEQUENCE = 200;
  const MISSION_DAY_CREDIT = 250;
  const LEGACY_BRAND_PATTERN = /Project Northstar|PROJECT NORTHSTAR|Northstar|NORTHSTAR/g;
  const DEFAULT_PRAYER = 'God, give me clarity for the next right action, discipline to protect what matters, humility to tell the truth, and patience to rebuild without shame. Help me care for my body, serve people well, and choose real life over escape. Amen.';
  const LEGACY_ZERO_TOLERANCE = 'No intentional Slither. No loopholes, hidden use, or bargaining. An urge is not a failure. If a lapse happens, log it once, reset the active streak and affected reward qualification, restore the blocker, and begin the next right action immediately. Project 52, earned XP, permanent levels, rehabilitation, goals, finances, photos, and history never reset.';
  const DEFAULT_ZERO_TOLERANCE = 'No intentional Slither. No loopholes, hidden use, or bargaining. An urge is not a failure. When the day is explicitly closed, checking the Zero-Tolerance Standard earns 100 XP; leaving it unchecked records the lapse, subtracts 200 active Momentum XP, and lowers the active Momentum level by one. The active streak and affected reward qualification reset, but lifetime XP, permanent rank, Project 52, rehabilitation, goals, finances, photos, and history remain protected. Restore the blocker and begin the next right action without shame.';

  function project52Copy(value) {
    return String(value ?? '').replace(LEGACY_BRAND_PATTERN, match => {
      if (match === 'PROJECT NORTHSTAR' || match === 'NORTHSTAR') return 'PROJECT 52';
      return 'Project 52';
    });
  }

  function brandTextNode(node) {
    if (!node?.nodeValue || /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(node.parentElement?.tagName || '')) return;
    const branded = project52Copy(node.nodeValue);
    if (branded !== node.nodeValue) node.nodeValue = branded;
  }

  function applyProject52Branding(root = document.body) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      brandTextNode(root);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) brandTextNode(walker.currentNode);
    const elements = root.nodeType === Node.ELEMENT_NODE
      ? [root, ...root.querySelectorAll('[aria-label],[title],[placeholder],[alt]')]
      : [];
    elements.forEach(element => {
      ['aria-label', 'title', 'placeholder', 'alt'].forEach(attribute => {
        if (!element.hasAttribute?.(attribute)) return;
        const value = element.getAttribute(attribute);
        const branded = project52Copy(value);
        if (branded !== value) element.setAttribute(attribute, branded);
      });
    });
    document.title = project52Copy(document.title);
  }

  function startProject52Branding() {
    if (globalThis.__project52BrandingStarted) return;
    globalThis.__project52BrandingStarted = true;
    applyProject52Branding();
    new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'characterData') brandTextNode(record.target);
        if (record.type === 'attributes') applyProject52Branding(record.target);
        record.addedNodes?.forEach(node => applyProject52Branding(node));
      });
    }).observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title', 'placeholder', 'alt']
    });
  }
  const EVIDENCE_MILESTONES = {
    fullDuty: {
      title: 'Full-duty return',
      detail: 'Document the confirmed work status and supporting clinical evidence.',
      requiresClearance: true
    },
    hiking: {
      title: 'Hiking return',
      detail: 'Link objective trail evidence, symptom response, and current restrictions.',
      requiresClearance: true
    },
    strength: {
      title: 'Strength rebuilt',
      detail: 'Record objective strength, control, and symmetry evidence.',
      requiresClearance: false
    },
    returnSport: {
      title: 'Return to sport',
      detail: 'Requires explicit clinician clearance plus objective return-to-sport evidence.',
      requiresClearance: true
    }
  };
  const RETURN_TO_SPORT_MILESTONES = [
    {
      id: 'quietKneeWeek',
      phase: 'Calm the joint',
      title: 'Quiet Knee Week',
      icon: '<3',
      color: '#52d47e',
      rarity: 'Foundation',
      xp: 50,
      gate: 'quiet-knee',
      criteria: 'Seven consecutive explicitly closed calendar days with left-knee pain logged at 0–2/10.',
      reward: 'A recovery-friendly mini celebration and a “quiet knee” progress photo.'
    },
    {
      id: 'fullRom',
      phase: 'Calm the joint',
      title: 'Functional ROM Restored',
      icon: 'ROM',
      color: '#52d47e',
      rarity: 'Foundation',
      xp: 75,
      gate: 'manual',
      criteria: 'Clinician/PT verifies the functional extension and flexion target for the current plan.',
      reward: 'A favorite high-protein meal and a protected recovery evening.'
    },
    {
      id: 'quietEffusion',
      phase: 'Calm the joint',
      title: 'Effusion Quiet',
      icon: 'Q',
      color: '#52d47e',
      rarity: 'Foundation',
      xp: 75,
      gate: 'manual',
      criteria: 'Clinician/PT verifies the swelling or effusion target required for the next stage.',
      reward: 'A small recovery-setup upgrade that fits the clinical plan.'
    },
    {
      id: 'lsi70',
      phase: 'Rebuild force',
      title: 'LSI 70',
      icon: '70',
      color: '#74c4ff',
      rarity: 'Trail',
      xp: 50,
      gate: 'quad-lsi',
      threshold: 70,
      criteria: 'A clinician/PT-verified quadriceps Limb Symmetry Index reaches at least 70%.',
      reward: 'A new training playlist and a guilt-free recharge block.'
    },
    {
      id: 'lsi80',
      phase: 'Rebuild force',
      title: 'LSI 80',
      icon: '80',
      color: '#74c4ff',
      rarity: 'Trail',
      xp: 75,
      gate: 'quad-lsi',
      threshold: 80,
      criteria: 'A clinician/PT-verified quadriceps Limb Symmetry Index reaches at least 80%.',
      reward: 'A training shirt or small gym-quality upgrade.'
    },
    {
      id: 'lsi90',
      phase: 'Rebuild force',
      title: 'LSI 90',
      icon: '90',
      color: '#e7bd69',
      rarity: 'Summit',
      xp: 125,
      gate: 'quad-lsi',
      threshold: 90,
      criteria: 'A clinician/PT-verified quadriceps Limb Symmetry Index reaches at least 90%.',
      reward: 'Choose one premium recovery, training, or style reward.'
    },
    {
      id: 'lsi95',
      phase: 'Rebuild force',
      title: 'LSI 95',
      icon: '95',
      color: '#e7bd69',
      rarity: 'Summit',
      xp: 150,
      gate: 'quad-lsi',
      threshold: 95,
      criteria: 'A clinician/PT-verified quadriceps Limb Symmetry Index reaches at least 95%. This is a stretch evidence marker, not clearance by itself.',
      reward: 'A bigger symmetry celebration chosen inside the Reward Center.'
    },
    {
      id: 'singleLegControl',
      phase: 'Own movement',
      title: 'Single-Leg Control',
      icon: 'SL',
      color: '#55d6d0',
      rarity: 'Field',
      xp: 75,
      gate: 'manual',
      criteria: 'Clinician/PT verifies controlled single-leg loading and the relevant step-down or balance standard.',
      reward: 'A favorite meal or low-key experience that supports recovery.'
    },
    {
      id: 'decelerationControl',
      phase: 'Own movement',
      title: 'Deceleration Control',
      icon: 'DC',
      color: '#55d6d0',
      rarity: 'Field',
      xp: 100,
      gate: 'manual',
      criteria: 'Clinician/PT verifies controlled deceleration and landing mechanics at the currently cleared level.',
      reward: 'A sport-confidence clothing or equipment upgrade.'
    },
    {
      id: 'returnRun',
      phase: 'Reintroduce impact',
      title: 'Return-to-Run Cleared',
      icon: 'RUN',
      color: '#ffa657',
      rarity: 'Expedition',
      xp: 100,
      gate: 'manual',
      criteria: 'The prescribed return-to-run entry criteria are verified and the progression is explicitly cleared.',
      reward: 'A clinician-compatible footwear fitting or equivalent training reward.'
    },
    {
      id: 'jumpLand',
      phase: 'Reintroduce impact',
      title: 'Jump + Land Cleared',
      icon: 'JL',
      color: '#ffa657',
      rarity: 'Expedition',
      xp: 100,
      gate: 'manual',
      criteria: 'Clinician/PT verifies the required bilateral and single-leg jump-and-land quality.',
      reward: 'A protected outdoor experience or recovery day trip.'
    },
    {
      id: 'hop90',
      phase: 'Prove capacity',
      title: 'Hop Battery 90',
      icon: 'H90',
      color: '#b7a0ff',
      rarity: 'Expedition',
      xp: 125,
      gate: 'hop-lsi',
      threshold: 90,
      criteria: 'Clinician/PT-verified hop-battery LSI reaches at least 90% with good landing mechanics documented.',
      reward: 'A meaningful training-gear upgrade.'
    },
    {
      id: 'changeDirection',
      phase: 'Prove capacity',
      title: 'Change of Direction',
      icon: 'COD',
      color: '#b7a0ff',
      rarity: 'Expedition',
      xp: 125,
      gate: 'manual',
      criteria: 'Clinician/PT verifies the cleared cutting or change-of-direction standard for the intended sport.',
      reward: 'A contribution to a sport-specific gear or experience fund.'
    },
    {
      id: 'nonContactPractice',
      phase: 'Return to play',
      title: 'Noncontact Practice',
      icon: 'NP',
      color: '#85b8ff',
      rarity: 'Summit',
      xp: 100,
      gate: 'manual',
      criteria: 'Complete the clinician-approved noncontact practice stage with acceptable symptoms and recovery.',
      reward: 'A celebration meal and a written return-to-sport reflection.'
    },
    {
      id: 'fullPractice',
      phase: 'Return to play',
      title: 'Full Practice',
      icon: 'FP',
      color: '#85b8ff',
      rarity: 'Summit',
      xp: 125,
      gate: 'manual',
      criteria: 'Complete the clinician-approved full-practice stage with acceptable symptoms and next-day response.',
      reward: 'A full-practice milestone experience chosen in the Reward Center.'
    },
    {
      id: 'fullSport',
      phase: 'Return to play',
      title: 'Full Return to Sport',
      icon: 'RTS',
      color: '#ffeab8',
      rarity: 'Legendary',
      xp: 200,
      gate: 'manual',
      criteria: 'All Project 52 return-to-sport evidence is complete, the intended sport is explicitly cleared, and both the left knee and right ankle/foot are ready.',
      reward: 'The major Return-to-Sport reward: a meaningful experience or item you will remember.'
    }
  ];

  const WEEKLY_MISSION_POOL = {
    physical: [
      {
        id: 'physical-fast-24',
        title: '24-Hour Clinician-Planned Fast',
        completion: 'Complete the planned 24-hour window while following the documented Type 1 diabetes protocol and every stop criterion.',
        preparation: 'Have the clinician-approved insulin/CGM, hydration, ketone, rescue-carbohydrate, stop-criteria, and emergency plan physically available.',
        safety: 'GREEN Off Day only. Never invent insulin changes. Stop and follow the clinical plan for unsafe glucose, ketones, illness, dehydration, or any listed stop criterion.',
        evidence: 'Start/end time, CGM summary, hydration/ketone checks required by the plan, and one note confirming the protocol—not willpower—governed the mission.',
        recovery: 'Resume nutrition according to the approved plan, hydrate, and do not stack another hard challenge.',
        gate: 'fastPlan'
      },
      {
        id: 'physical-pullups-500',
        title: '500-Pull-Up Precision Day',
        completion: 'Complete 500 cleared pull-ups using the approved rep structure without technique breakdown or abnormal wrist, elbow, or shoulder pain.',
        preparation: 'Record the rep structure, recent pulling-volume check, grip options, rest plan, and joint stop criteria.',
        safety: 'GREEN Off Day only. Current wrist/shoulder/elbow clearance and supporting recent volume are mandatory. Scale or replace rather than force a dangerous workload spike.',
        evidence: 'Timestamped set ledger totaling the approved volume plus a pre/post wrist, elbow, and shoulder symptom check.',
        recovery: 'No additional pulling challenge; eat, hydrate, and reassess joints the following morning.',
        gate: 'pullupReady'
      },
      {
        id: 'physical-rehab-precision',
        title: 'Rehab Precision Gauntlet',
        completion: 'Complete the full currently prescribed rehabilitation session with every cleared set, tempo, rest period, and modification documented.',
        preparation: 'Confirm the current PT/surgeon program, prepare equipment, and record baseline pain, swelling, and energy.',
        safety: 'No added loading, running, jumping, cutting, or progression outside current restrictions. Quality and documentation—not pain—create the difficulty.',
        evidence: 'Completed exercise ledger, one short form video or written technique audit, and pre/post symptoms.',
        recovery: 'Use the prescribed recovery plan and review the next-day symptom response before further loading.',
        gate: 'rehabAvailable'
      },
      {
        id: 'physical-recovery-discipline',
        title: 'Full Recovery-Discipline Day',
        completion: 'Execute every scheduled cleared recovery action for one full day: sleep window, approved rehabilitation, nutrition/protein, glucose care, hydration, and planned outside/connection action.',
        preparation: 'Write the time-blocked plan the night before and stage meals, medications/supplies, and approved rehab equipment.',
        safety: 'Difficulty comes from precision and consistency. No unsafe volume, sleep loss, dehydration, or compensatory exercise.',
        evidence: 'Completed time-block checklist with glucose/recovery notes and one end-of-day summary.',
        recovery: 'Return to the normal plan the next day; do not repeat as a compensatory challenge.',
        gate: 'rehabAvailable'
      }
    ],
    mental: [
      {
        id: 'mental-reading-prayer',
        title: 'Sixty Minutes of Reading and Prayer',
        completion: 'Complete 60 uninterrupted minutes with the phone physically unavailable and produce one written reflection or decision.',
        preparation: 'Choose the reading, notebook, location, and exact question before starting.',
        safety: 'Protect sleep and glucose needs; interruption for medical safety does not invalidate the mission.',
        evidence: 'Start/end time plus the written reflection or decision.',
        recovery: 'Take a brief walk, meal, or calm transition before returning to screens.'
      },
      {
        id: 'mental-cash-staircase',
        title: '$100K Cash Staircase Decision Session',
        completion: 'Reconcile liquid cash, set the next staircase target, and produce a dated 90-day transfer/spending plan with three exact actions.',
        preparation: 'Gather current balances, expected pay, known obligations, and the existing staircase.',
        safety: 'Do not move money impulsively during the session; the deliverable is a verified plan and scheduled actions.',
        evidence: 'Reconciled worksheet, written decision, and three scheduled next actions.',
        recovery: 'Close the accounts and stop reviewing once the plan is complete.'
      },
      {
        id: 'mental-dexcom-analysis',
        title: 'Dexcom Pattern Analysis',
        completion: 'Export and upload the recent Dexcom report, identify the three most important repeatable glucose patterns, and finish a written correction plan with exact questions or proposals to review with the diabetes clinician.',
        preparation: 'Export at least seven representative days from Dexcom Clarity, note unusual illness/work/travel days, and gather the current clinician-approved diabetes plan. Remove anything you do not want to share before upload.',
        safety: 'Analysis is decision support, not independent insulin prescribing. Do not change basal rates, ratios, correction factors, medications, or safety thresholds solely from the app or chat output.',
        evidence: 'Uploaded Dexcom report, three dated pattern findings, three highest-leverage behavior/system changes, and a clinician-review list.',
        recovery: 'Stop after the written plan. Schedule follow-up instead of repeatedly rechecking the same graphs.'
      },
      {
        id: 'mental-career-leverage',
        title: 'ICU and Nursing Leverage Sprint',
        completion: 'Finish one concrete career deliverable: a completed education module, submitted application, finalized ICU pathway map, or finished credential study packet.',
        preparation: 'Select one deliverable and define “submitted” or “finished” before the timer begins.',
        safety: 'Do not borrow from post-shift sleep or rush clinical education merely to claim completion.',
        evidence: 'Completion certificate, submitted application, finalized document, or saved study packet.',
        recovery: 'Write the next action, then end the session instead of expanding its scope.'
      },
      {
        id: 'mental-life-command',
        title: 'Project 52 Life Command Review',
        completion: 'Review every active 2026 goal, make written keep/change/drop decisions, and finish or schedule the five highest-leverage administration items.',
        preparation: 'Open Goals, the master task list, calendar, and a blank decision page.',
        safety: 'Make decisions; do not create an endless planning project or sacrifice required recovery.',
        evidence: 'Dated decision page plus five completed or calendar-scheduled actions.',
        recovery: 'Leave the remaining backlog closed until its scheduled review.'
      }
    ]
  };

  const EXTRA_PATCHES = [
    {
      id: 'zeroTolerance52',
      icon: '52',
      title: '52-Day Wall',
      desc: 'Hold the Zero-Tolerance check for 52 consecutive explicitly closed days. Once earned, this badge is permanent.',
      color: '#e7bd69',
      value: () => typeof noSlitherStats === 'function' ? noSlitherStats().best : 0,
      target: 52
    },
    {
      id: 'projectDays52',
      icon: '▰',
      title: '52 Stones Laid',
      desc: 'Complete 52 legitimate Project days. Correctly completed Recovery Days count.',
      color: '#c9b48a',
      value: () => typeof complianceStats === 'function' ? complianceStats().completed : 0,
      target: 52
    },
    {
      id: 'weeklyMissions4',
      icon: 'IV',
      title: 'Four Cornerstones',
      desc: 'Complete four evidence-backed Weekly Project 52 Missions with an identity reflection.',
      color: '#74c4ff',
      value: () => (state.weeklyMissions?.history || [])
        .filter(item => item.completedAt && item.evidenceRecorded && item.identityReflection).length,
      target: 4
    },
    {
      id: 'fullDuty',
      icon: 'RN',
      title: 'Full Duty',
      desc: 'Document a clinically cleared full-duty return.',
      color: '#74c4ff',
      value: () => milestoneComplete('fullDuty'),
      target: 1
    },
    {
      id: 'nihssComplete',
      icon: 'NI',
      title: 'Neuro Ready',
      desc: 'Complete and document NIHSS education.',
      color: '#74c4ff',
      value: () => adminComplete('nihss'),
      target: 1
    },
    {
      id: 'violenceComplete',
      icon: 'WP',
      title: 'Safer Unit',
      desc: 'Complete workplace-violence prevention education.',
      color: '#74c4ff',
      value: () => adminComplete('violence') || adminComplete('violence-workshop'),
      target: 1
    },
    {
      id: 'cash50',
      icon: '$',
      title: 'Cash Basecamp',
      desc: 'Reach $50,000 in the separate liquid-cash staircase.',
      color: '#e7bd69',
      value: () => Number(state.goals?.cashReserve?.current || 0),
      target: 50000
    },
    {
      id: 'strengthRebuilt',
      icon: 'STR',
      title: 'Strength Rebuilt',
      desc: 'Document the strength-rebuilt evidence milestone.',
      color: '#52d47e',
      value: () => milestoneComplete('strength'),
      target: 1
    },
    {
      id: 'connection30',
      icon: '30',
      title: 'Real-World Thirty',
      desc: 'Log thirty days with meaningful connection or outside time.',
      color: '#55d6d0',
      value: () => typeof v29CountAction === 'function' ? v29CountAction('outsideConnection') : 0,
      target: 30
    },
    {
      id: 'hiking3',
      icon: '▲3',
      title: 'Trail Builder',
      desc: 'Pass three evidence-based Return-to-Mountains stages.',
      color: '#ffa657',
      value: () => typeof mountainCompletedCount === 'function' ? mountainCompletedCount() : 0,
      target: 3
    },
    {
      id: 'returnSport',
      icon: 'RTS',
      title: 'Return to Sport',
      desc: 'Document clinician clearance and objective return-to-sport evidence.',
      color: '#e7bd69',
      value: () => milestoneComplete('returnSport') || rtsMilestoneComplete('fullSport'),
      target: 1
    },
    ...RETURN_TO_SPORT_MILESTONES
      .filter(milestone => milestone.id !== 'fullSport')
      .map(milestone => ({
        id: `rts-${milestone.id}`,
        icon: milestone.icon,
        title: milestone.title,
        desc: milestone.criteria,
        color: milestone.color,
        value: () => rtsMilestoneComplete(milestone.id),
        target: 1
      }))
  ];

  let pendingSmartLog = null;
  let deferredInstallPrompt = null;

  function adminComplete(id) {
    return state.admin?.some(item => item.id === id && item.complete) ? 1 : 0;
  }

  function milestoneComplete(key) {
    const row = state.evidenceMilestones?.[key];
    if (!row || row.status !== 'Complete') return 0;
    return EVIDENCE_MILESTONES[key]?.requiresClearance && !row.clearance ? 0 : 1;
  }

  function rtsMilestoneComplete(id) {
    return state.returnToSportTrail?.milestones?.[id]?.completedAt ? 1 : 0;
  }

  function ensureReturnToSportTrail(target) {
    const existing = target.returnToSportTrail || {};
    const trail = {
      version: 1,
      lsiHistory: [],
      milestones: {},
      rewardLedger: [],
      currentSport: '',
      lastUpdatedAt: null,
      ...existing
    };
    trail.lsiHistory = Array.isArray(trail.lsiHistory) ? trail.lsiHistory : [];
    trail.rewardLedger = Array.isArray(trail.rewardLedger) ? trail.rewardLedger : [];
    trail.milestones = trail.milestones || {};
    RETURN_TO_SPORT_MILESTONES.forEach(def => {
      const defaults = {
        status: 'Not started',
        date: '',
        evidence: '',
        clinicianVerified: false,
        rightAnkleCleared: false,
        completedAt: null,
        rewardClaimedAt: null,
        reward: def.reward
      };
      const row = trail.milestones[def.id];
      if (!row || typeof row !== 'object') {
        trail.milestones[def.id] = defaults;
      } else {
        Object.entries(defaults).forEach(([key, value]) => {
          if (row[key] === undefined) row[key] = value;
        });
      }
    });
    target.returnToSportTrail = trail;
    return trail;
  }

  function ensureMilestones(target) {
    target.evidenceMilestones = target.evidenceMilestones || {};
    Object.entries(EVIDENCE_MILESTONES).forEach(([key, def]) => {
      target.evidenceMilestones[key] = {
        status: 'Not started',
        date: '',
        evidence: '',
        next: '',
        clearance: false,
        ...target.evidenceMilestones[key],
        title: def.title
      };
    });
  }

  function ensureCalendar(target) {
    target.calendar = {
      timezone: LA_TZ,
      source: 'Local import',
      events: [],
      lastSyncAt: null,
      ...target.calendar
    };
    target.calendar.events = Array.isArray(target.calendar.events) ? target.calendar.events : [];
  }

  function ensureMomentum(target) {
    target.momentum = {
      awardWhenKept: ZERO_TOLERANCE_AWARD,
      consequenceWhenUnchecked: ZERO_TOLERANCE_CONSEQUENCE,
      currentXP: null,
      activeLevel: null,
      ledger: [],
      ...target.momentum
    };
    target.momentum.ledger = Array.isArray(target.momentum.ledger) ? target.momentum.ledger : [];
    if (target.momentum.currentXP === null || target.momentum.currentXP === '' || !Number.isFinite(Number(target.momentum.currentXP))) {
      target.momentum.currentXP = xpTarget(Math.max(1, Number(target.levelSystem?.highestEarned || 1)));
    }
    if (target.momentum.activeLevel === null || target.momentum.activeLevel === '' || !Number.isFinite(Number(target.momentum.activeLevel))) {
      target.momentum.activeLevel = Math.max(1, Number(target.levelSystem?.highestEarned || 1));
    }
  }

  function streakBeforeReset(target, resetDate) {
    let current = 0;
    let best = 0;
    let compliant = 0;
    const days = target.days || {};
    for (let date = target.settings?.programStart || '2026-07-15'; date < resetDate; date = addDays(date, 1)) {
      const day = days[date];
      if (!completedDay(day)) continue;
      if (day.actions?.noSlither) {
        current += 1;
        compliant += 1;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    }
    return { current, best, compliant };
  }

  function applyV41UserReset(target) {
    target.privateBuild = target.privateBuild || {};
    if (target.privateBuild.v41UserResetAppliedAt) return;
    ensureMomentum(target);
    const measuredPrior = streakBeforeReset(target, V41_RESET_DATE);
    const prior = {
      ...measuredPrior,
      current: Math.max(USER_REPORTED_PRIOR_STREAK, measuredPrior.current),
      best: Math.max(USER_REPORTED_PRIOR_STREAK, measuredPrior.best)
    };
    const beforeXP = Math.max(0, Number(target.momentum.currentXP || 0));
    const beforeLevel = Math.max(1, Number(target.momentum.activeLevel || target.levelSystem?.highestEarned || 1));
    const afterXP = Math.max(0, beforeXP - ZERO_TOLERANCE_CONSEQUENCE);
    const afterLevel = Math.max(1, beforeLevel - 1);
    const at = new Date().toISOString();

    target.attentionManualReset = {
      id: V41_RESET_ID,
      date: V41_RESET_DATE,
      reason: 'User-requested honest lapse reset',
      priorStreak: prior.current,
      historicalBest: Math.max(prior.best, Number(target.attentionAttempts?.historicalBest || 0)),
      recordedAt: at
    };
    target.resetHistory = Array.isArray(target.resetHistory) ? target.resetHistory : [];
    if (!target.resetHistory.includes(V41_RESET_DATE)) target.resetHistory.push(V41_RESET_DATE);
    target.momentum.currentXP = afterXP;
    target.momentum.activeLevel = afterLevel;
    if (!target.momentum.ledger.some(entry => entry.id === V41_RESET_ID)) {
      target.momentum.ledger.push({
        id: V41_RESET_ID,
        type: 'user-requested-streak-reset',
        date: V41_RESET_DATE,
        outcome: 'unchecked',
        xpDelta: -ZERO_TOLERANCE_CONSEQUENCE,
        permanentXP: 0,
        beforeXP,
        afterXP,
        beforeLevel,
        afterLevel,
        priorStreak: prior.current,
        at
      });
    }
    target.privateBuild.v41UserResetAppliedAt = at;
  }

  function ensureV41ResetEvidence(target) {
    const activeAttemptStart = addDays(V41_RESET_DATE, 1);
    const activeAttemptTarget = addDays(activeAttemptStart, 89);
    target.settings = target.settings || {};
    target.settings.slitherStart = activeAttemptStart;
    target.settings.slitherTarget = activeAttemptTarget;

    target.attentionAttempts = target.attentionAttempts && typeof target.attentionAttempts === 'object'
      ? target.attentionAttempts
      : { attempts: [], historicalBest: 0 };
    target.attentionAttempts.attempts = Array.isArray(target.attentionAttempts.attempts)
      ? target.attentionAttempts.attempts
      : [];
    target.attentionAttempts.historicalBest = Math.max(
      USER_REPORTED_PRIOR_STREAK,
      Number(target.attentionAttempts.historicalBest || 0)
    );

    let archived = target.attentionAttempts.attempts.find(item => item.lapseDate === V41_RESET_DATE);
    if (!archived) {
      archived = {
        id: `attempt-user-reset-${V41_RESET_DATE}`,
        start: target.settings.programStart || '2026-07-15',
        end: V41_RESET_DATE,
        lapseDate: V41_RESET_DATE,
        best: Math.max(0, streakBeforeReset(target, V41_RESET_DATE).best),
        outcome: 'lapse',
        recordedAt: target.attentionManualReset?.recordedAt || new Date().toISOString()
      };
      target.attentionAttempts.attempts.push(archived);
    }
    archived.reportedBest = Math.max(USER_REPORTED_PRIOR_STREAK, Number(archived.reportedBest || 0));
    archived.note = archived.note || 'User-reported 14-day no-slip run; archived during the full reset.';
    target.attentionAttempts.attempts.sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')));

    if (target.attentionManualReset?.id === V41_RESET_ID) {
      target.attentionManualReset.priorStreak = Math.max(
        USER_REPORTED_PRIOR_STREAK,
        Number(target.attentionManualReset.priorStreak || 0)
      );
      target.attentionManualReset.historicalBest = Math.max(
        USER_REPORTED_PRIOR_STREAK,
        Number(target.attentionManualReset.historicalBest || 0)
      );
      target.attentionManualReset.activeAttemptStart = activeAttemptStart;
      target.attentionManualReset.activeAttemptTarget = activeAttemptTarget;
    }
  }

  function ensureWeeklyMissions(target) {
    target.weeklyMissions = {
      poolVersion: 1,
      permanentCreditXP: MISSION_DAY_CREDIT,
      history: [],
      current: null,
      reminders: [],
      categoryNext: 'physical',
      medical: {
        fastingClinicianClearance: true,
        fastingPlanDocumented: false,
        pullupClinicianClearance: true,
        pullupReadinessDocumented: false
      },
      ...target.weeklyMissions
    };
    target.weeklyMissions.history = Array.isArray(target.weeklyMissions.history) ? target.weeklyMissions.history : [];
    target.weeklyMissions.reminders = Array.isArray(target.weeklyMissions.reminders) ? target.weeklyMissions.reminders : [];
    target.weeklyMissions.medical = {
      fastingClinicianClearance: true,
      fastingPlanDocumented: false,
      pullupClinicianClearance: true,
      pullupReadinessDocumented: false,
      ...(target.weeklyMissions.medical || {})
    };
  }

  function ensureCashViews(target) {
    target.goals = mergeGoalSystem(target.goals);
    target.goals.cash.target = 115000;
    target.goals.cash.targetDate = '2026-12-31';
    target.goals.cashReserve = {
      current: '',
      target: 100000,
      targetDate: '2026-12-31',
      history: [],
      note: 'Liquid cash only. Keep this separate from net worth.',
      ...target.goals.cashReserve
    };
    target.goals.cashReserve.history = Array.isArray(target.goals.cashReserve.history)
      ? target.goals.cashReserve.history
      : [];
  }

  function resetTwoEarlyRewards(target) {
    target.rewardHistory = Array.isArray(target.rewardHistory) ? target.rewardHistory : [];
    if (target.privateBuild?.rewardResetAppliedAt) return;
    ['rw1', 'rw2'].forEach(id => {
      const reward = target.rewards?.find(item => item.id === id);
      if (!reward) return;
      target.rewardHistory.push({
        id: `reward-reset-${id}-${V37_LAPSE_DATE}`,
        rewardId: id,
        title: reward.reward,
        previous: {
          revealed: !!reward.revealed,
          revealedAt: reward.revealedAt || null,
          claimed: !!reward.claimed,
          claimedAt: reward.claimedAt || null,
          integrity: !!reward.integrity
        },
        source: id === 'rw2' && !reward.revealed && !reward.claimed ? 'user-reported unlock' : 'saved app state',
        action: 'qualification reset; historical evidence preserved',
        lapseDate: V37_LAPSE_DATE,
        recordedAt: new Date().toISOString()
      });
      Object.assign(reward, {
        revealed: false,
        revealedAt: null,
        claimed: false,
        claimedAt: null,
        integrity: false,
        qualificationResetAt: V37_LAPSE_DATE,
        qualificationStatus: 'Reset after logged lapse'
      });
    });
  }

  function archivedPeak(target) {
    return Math.max(
      1,
      Number(target.levelSystem?.highestEarned || 1),
      Number(target.levelSystem?.activeLevel || 0),
      Number(target.momentum?.activeLevel || 0)
    );
  }

  function archivedAttentionBest(target) {
    const attemptBest = (target.attentionAttempts?.attempts || []).reduce(
      (best, attempt) => Math.max(best, Number(attempt.best || 0), Number(attempt.reportedBest || 0)),
      0
    );
    const personalBest = Number(target.gamification?.v34?.personalRecords?.noSlither?.value || 0);
    return Math.max(
      USER_REPORTED_PRIOR_STREAK,
      Number(target.attentionAttempts?.historicalBest || 0),
      Number(target.attentionManualReset?.historicalBest || 0),
      attemptBest,
      personalBest
    );
  }

  function targetMountainCount(target) {
    return (target.mountains?.milestones || []).filter(item => item?.status === 'Passed').length;
  }

  function targetEvidenceComplete(target, key) {
    const row = target.evidenceMilestones?.[key];
    if (!row || row.status !== 'Complete') return 0;
    return EVIDENCE_MILESTONES[key]?.requiresClearance && !row.clearance ? 0 : 1;
  }

  function targetAdminComplete(target, ids) {
    return target.admin?.some(item => ids.includes(item.id) && item.complete) ? 1 : 0;
  }

  function activeStickerBaselines(target) {
    const netWorth = Math.max(0, Number(target.goals?.cash?.current || 0));
    const liquidCash = Math.max(0, Number(target.goals?.cashReserve?.current || 0));
    const careerBlocks = Object.values(target.weeklyGoals || {})
      .reduce((sum, record) => sum + Number(record?.manual?.career || 0), 0);
    const careerEvidence = target.admin?.filter(item => ['nihss', 'violence', 'ubt'].includes(item.id) && item.complete).length
      || (Number(target.goals?.items?.find(item => item.id === 'goal-icu')?.progress || 0) >= 50 ? 1 : 0);
    const baselines = {
      career1: Math.max(careerEvidence, careerBlocks),
      admin10: target.admin?.filter(item => item.complete).length || 0,
      cash1: Math.min(10, Math.floor(netWorth / 10000)),
      mountain1: targetMountainCount(target),
      physique1: Number(target.levelSystem?.photoMonths || 0),
      fullDuty: targetEvidenceComplete(target, 'fullDuty'),
      nihssComplete: targetAdminComplete(target, ['nihss']),
      violenceComplete: targetAdminComplete(target, ['violence', 'violence-workshop']),
      cash50: liquidCash,
      strengthRebuilt: targetEvidenceComplete(target, 'strength'),
      hiking3: targetMountainCount(target),
      returnSport: Math.max(
        targetEvidenceComplete(target, 'returnSport'),
        target.returnToSportTrail?.milestones?.fullSport?.completedAt ? 1 : 0
      )
    };
    RETURN_TO_SPORT_MILESTONES
      .filter(milestone => milestone.id !== 'fullSport')
      .forEach(milestone => {
        baselines[`rts-${milestone.id}`] = target.returnToSportTrail?.milestones?.[milestone.id]?.completedAt ? 1 : 0;
      });
    return baselines;
  }

  function rebaseActiveRewards(target, resetStatus = false) {
    const current = new Map((target.rewards || []).map(reward => [reward.id, reward]));
    target.rewards = REWARD_BLUEPRINTS.map(blueprint => {
      const previous = current.get(blueprint.id) || {};
      return {
        ...previous,
        id: blueprint.id,
        start: blueprint.start,
        end: blueprint.end,
        reward: previous.reward || blueprint.reward,
        editable: blueprint.editable,
        integrity: resetStatus ? false : !!previous.integrity,
        revealed: resetStatus ? false : !!previous.revealed,
        revealedAt: resetStatus ? null : (previous.revealedAt || null),
        claimed: resetStatus ? false : !!previous.claimed,
        claimedAt: resetStatus ? null : (previous.claimedAt || null),
        qualificationResetAt: resetStatus ? null : (previous.qualificationResetAt || null),
        qualificationStatus: resetStatus ? 'Fresh August rebuild window' : (previous.qualificationStatus || 'Fresh August rebuild window')
      };
    });
  }

  function ensureTotalRebuildState(target) {
    const existing = target.totalRebuild || {};
    const existingTraining = existing.training || {};
    target.totalRebuild = {
      mode: 'REGULAR MAX MODE',
      campaignTitle: 'PROJECT 52: THE TOTAL REBUILD',
      identity: 'I am not starting from nothing. I am starting again with experience.',
      phases: deepClone(TOTAL_REBUILD_PHASES),
      weeklyReviews: {},
      ...existing,
      training: {
        ...existingTraining,
        rollingTarget: { chinUp: 3, lowerBody: 3, ...(existingTraining.rollingTarget || {}) },
        logs: Array.isArray(existingTraining.logs) ? existingTraining.logs : [],
        chinUp: {
          baselinePR: 110,
          foundationTarget: 130,
          primaryTarget: 150,
          stretchTarget: 165,
          currentPhase: 'Foundation',
          nextBenchmark: '+115 lb with strict video-verified form',
          rules: ['Three exposures per rolling seven days', 'Use repetitions in reserve', 'No routine failure training', 'Small load increases', 'Full, compressed, and minimum-effective versions', 'Pain/readiness modification and deloads', 'Video verification for major lifts'],
          ...(existingTraining.chinUp || {})
        },
        lowerBody: {
          pistolBaselineReps: 6,
          pistolTargetReps: 10,
          weightedPistolTarget: '20–25 lb × 5',
          quadSymmetryTarget: 95,
          minimumSymmetry: 90,
          currentPhase: 'Rebuild control',
          nextBenchmark: 'Seven pristine bodyweight pistol squats with stable alignment',
          rules: ['Three medically permitted exposures per rolling seven days', 'Left quadriceps strength', 'Posterior-chain and hip strength', 'Single-leg control and pistol progression', 'Track pain, swelling, gait, balance and dorsiflexion', 'No running, jumping, cutting or unsupported loading without clearance'],
          ...(existingTraining.lowerBody || {})
        }
      }
    };
    target.totalRebuild.mode = 'REGULAR MAX MODE';
    target.totalRebuild.campaignTitle = 'PROJECT 52: THE TOTAL REBUILD';
    target.totalRebuild.identity = 'I am not starting from nothing. I am starting again with experience.';
    target.totalRebuild.phases = { ...TOTAL_REBUILD_PHASES, ...(target.totalRebuild.phases || {}) };
    target.totalRebuild.weeklyReviews = target.totalRebuild.weeklyReviews || {};
    target.totalRebuild.training.logs = Array.isArray(target.totalRebuild.training.logs) ? target.totalRebuild.training.logs : [];
    return target.totalRebuild;
  }

  function enforceAugustPhase(target) {
    target.settings = target.settings || {};
    target.settings.programStart = AUGUST_PHASE_START;
    target.settings.programEnd = AUGUST_PHASE_END;
    target.settings.slitherStart = AUGUST_PHASE_START;
    target.settings.slitherTarget = AUGUST_ATTENTION_TARGET;
    target.activePhase = {
      id: AUGUST_PHASE_ID,
      name: 'Project 52 · August–December Rebuild',
      start: AUGUST_PHASE_START,
      end: AUGUST_PHASE_END,
      totalDays: daysBetween(AUGUST_PHASE_START, AUGUST_PHASE_END) + 1,
      levelFloor: 0,
      xpTarget: 14000,
      journalPromptVersion: JOURNEY_PROMPT_VERSION,
      journalPrompt: JOURNEY_PROMPT,
      ...target.activePhase
    };
    target.activePhase.start = AUGUST_PHASE_START;
    target.activePhase.end = AUGUST_PHASE_END;
    target.activePhase.totalDays = daysBetween(AUGUST_PHASE_START, AUGUST_PHASE_END) + 1;
    target.activePhase.levelFloor = 0;
    target.activePhase.xpTarget = 14000;
    target.activePhase.journalPromptVersion = JOURNEY_PROMPT_VERSION;
    target.activePhase.journalPrompt = JOURNEY_PROMPT;
    target.activePhase.mode = 'REGULAR MAX MODE';
    target.activePhase.campaignTitle = 'PROJECT 52: THE TOTAL REBUILD';
    globalThis.__northstarProgramStart = AUGUST_PHASE_START;
  }

  function ensureAugustFinalReset(target) {
    target.privateBuild = target.privateBuild || {};
    enforceAugustPhase(target);
    const alreadyApplied = !!target.privateBuild.totalRebuildResetAppliedAt;
    if (!alreadyApplied) {
      const at = new Date().toISOString();
      const priorDays = deepClone(target.days || {});
      const priorPeak = archivedPeak(target);
      const priorBest = archivedAttentionBest(target);
      const priorPatchUnlocks = deepClone(target.gamification?.patchUnlocks || {});
      const priorRewardHistory = deepClone(target.rewardHistory || []);
      const priorCash = deepClone(target.goals?.cash || {});
      const priorCashReserve = deepClone(target.goals?.cashReserve || {});
      const completedMissionIds = (target.weeklyMissions?.history || [])
        .filter(mission => mission.completedAt && mission.poolId)
        .map(mission => mission.poolId);
      const archivedActiveDates = Object.keys(priorDays).sort();

      safeSet(PRE_AUGUST_RESET_BACKUP_KEY, JSON.stringify({
        app: 'Project 52',
        version: PRIVATE_VERSION,
        exportedAt: at,
        type: 'automatic-pre-reset-data-backup',
        state: deepClone(target),
        photosPreservedInDeviceDatabase: true
      }));

      target.phaseArchives = Array.isArray(target.phaseArchives) ? target.phaseArchives : [];
      if (!target.phaseArchives.some(archive => archive.id === AUGUST_PHASE_RESET_ID)) {
        target.phaseArchives.push({
          id: AUGUST_PHASE_RESET_ID,
          name: 'PREVIOUS PROJECT 52 ARCHIVE',
          createdAt: at,
          sourceWindow: {
            start: target.privateBuild?.phaseStart || target.settings?.programStart || '2026-07-15',
            end: addDays(AUGUST_PHASE_START, -1)
          },
          summary: {
            dailyRecords: Object.keys(priorDays).length,
            completedDailyRecords: Object.values(priorDays).filter(day => completedDay(day)).length,
            datesClearedFromActivePhase: archivedActiveDates,
            historicalPeakLevel: priorPeak,
            historicalBestAttentionStreak: priorBest,
            stickerUnlocks: Object.keys(priorPatchUnlocks).length,
            rewardHistoryEntries: priorRewardHistory.length,
            calendarEventsPreserved: target.calendar?.events?.length || 0,
            recoveryMeasurementsPreserved: target.recovery?.measurements?.length || 0,
            mountainMilestonesPreserved: target.mountains?.milestones?.length || 0
          },
          data: {
            days: priorDays,
            goals: deepClone(target.goals || {}),
            weeklyGoals: deepClone(target.weeklyGoals || {}),
            weeklyMissions: deepClone(target.weeklyMissions || {}),
            rewards: deepClone(target.rewards || []),
            rewardHistory: priorRewardHistory,
            levelSystem: deepClone(target.levelSystem || {}),
            momentum: deepClone(target.momentum || {}),
            attentionAttempts: deepClone(target.attentionAttempts || {}),
            attentionManualReset: deepClone(target.attentionManualReset || {}),
            resetHistory: deepClone(target.resetHistory || []),
            gamification: deepClone(target.gamification || {}),
            totalRebuild: deepClone(target.totalRebuild || {}),
            recovery: deepClone(target.recovery || {}),
            mountains: deepClone(target.mountains || {}),
            returnToSportTrail: deepClone(target.returnToSportTrail || {}),
            evidenceMilestones: deepClone(target.evidenceMilestones || {}),
            finances: {
              cash: deepClone(target.goals?.cash || {}),
              cashReserve: deepClone(target.goals?.cashReserve || {})
            },
            admin: deepClone(target.admin || []),
            calendar: deepClone(target.calendar || {}),
            reviews: deepClone(target.reviews || {}),
            physiqueMonthly: deepClone(target.physiqueMonthly || {}),
            augustFoundation: deepClone(target.augustFoundation || {}),
            healthBridge: deepClone(target.healthBridge || {}),
            dexcomMission: deepClone(target.dexcomMission || {}),
            workSchedule: deepClone(target.workSchedule || {}),
            coachHistory: {
              smartLogHistory: deepClone(target.coach?.smartLogHistory || []),
              commandHistory: deepClone(target.coach?.commandHistory || [])
            }
          }
        });
      }

      target.days = {};

      target.goals = mergeGoalSystem(target.goals);
      target.goals.cash = priorCash;
      target.goals.cashReserve = priorCashReserve;
      target.goals.items.forEach(goal => {
        goal.status = 'Active';
        goal.progress = 0;
        goal.activePhase = AUGUST_PHASE_ID;
        delete goal.completedAt;
        delete goal.startedAt;
      });
      const attentionGoal = target.goals.items.find(goal => goal.id === 'goal-no-slither');
      if (attentionGoal) attentionGoal.targetDate = AUGUST_ATTENTION_TARGET;
      const projectGoal = target.goals.items.find(goal => goal.id === 'goal-forge');
      if (projectGoal) {
        projectGoal.title = 'Complete Project 52 with logged proof';
        projectGoal.targetDate = AUGUST_PHASE_END;
      }

      target.weeklyGoals = {};
      const priorMedical = deepClone(target.weeklyMissions?.medical || {});
      target.weeklyMissions = {
        poolVersion: 1,
        permanentCreditXP: MISSION_DAY_CREDIT,
        history: [],
        current: null,
        reminders: [],
        categoryNext: 'physical',
        rotationArchiveIds: [...new Set(completedMissionIds)],
        medical: priorMedical
      };
      ensureWeeklyMissions(target);

      target.attentionAttempts = { attempts: [], historicalBest: 0 };
      target.resetHistory = [];
      target.attentionManualReset = {
        id: AUGUST_PHASE_RESET_ID,
        date: AUGUST_PHASE_START,
        reason: 'User-requested August–December rebuild reset',
        activeStreak: 0,
        activeBest: 0,
        archivedHistoricalBest: priorBest,
        recordedAt: at
      };

      target.levelSystem = defaultLevelSystem(target.levelSystem || {});
      target.levelSystem.highestEarned = priorPeak;
      target.levelSystem.activeLevel = 0;
      target.levelSystem.activePhaseId = AUGUST_PHASE_ID;
      target.levelSystem.integrity = {};
      target.levelSystem.claimed = {};
      target.levelSystem.claimedAt = {};
      target.levelSystem.revealed = {};
      target.levelSystem.revealedAt = {};
      target.levelSystem.finalIntegrity = false;
      target.levelSystem.photoMonths = 0;
      target.levelSystem.lossHistory = [];
      target.levelSystem.rankHistory = [];
      target.levelSystem.lastCalculated = at;

      target.momentum = {
        awardWhenKept: ZERO_TOLERANCE_AWARD,
        consequenceWhenUnchecked: ZERO_TOLERANCE_CONSEQUENCE,
        currentXP: 0,
        activeLevel: 0,
        ledger: [],
        levelOverride: null,
        activePhaseId: AUGUST_PHASE_ID
      };

      target.gamification = {
        feedback: target.gamification?.feedback !== false,
        patchUnlocks: {},
        bossHistory: {},
        peakCombo: 0,
        v34: { comebackByDate: {}, personalRecords: {}, manualComeback: {} },
        activePhaseId: AUGUST_PHASE_ID
      };

      target.coach = target.coach || {};
      target.coach.smartLogHistory = [];
      target.coach.commandHistory = [];

      target.reviews = target.reviews || {};
      target.reviews.weekly = {};
      target.reviews.monthly = {};
      target.physiqueMonthly = {};

      if (target.totalRebuild?.training) target.totalRebuild.training.logs = [];
      if (target.totalRebuild) target.totalRebuild.weeklyReviews = {};

      rebaseActiveRewards(target, true);
      target.rewardHistory = Array.isArray(target.rewardHistory) ? target.rewardHistory : [];
      target.rewardHistory.push({
        id: `reward-phase-reset-${AUGUST_PHASE_START}`,
        action: 'All active weekly and Summit reward qualifications reset; prior reward evidence archived.',
        date: AUGUST_PHASE_START,
        recordedAt: at,
        previousEntriesPreserved: priorRewardHistory.length
      });

      target.admin = Array.isArray(target.admin) ? target.admin : [];
      V27_REWARD_TASKS.forEach(template => {
        const task = target.admin.find(item => item.id === template.id);
        if (task) Object.assign(task, template, { complete: false });
      });
      ['monthly-review', 'cash-monthly', 'physique-monthly'].forEach(id => {
        const task = target.admin.find(item => item.id === id);
        if (task && !task.complete && (!task.due || task.due < AUGUST_PHASE_START)) task.due = '2026-08-31';
      });

      target.activePhase.stickerBaselines = activeStickerBaselines(target);
      target.activePhase.archivedPeakLevel = priorPeak;
      target.activePhase.archivedBestAttentionStreak = priorBest;
      target.activePhase.archivedStickerUnlocks = Object.keys(priorPatchUnlocks).length;
      target.activePhase.resetAppliedAt = at;

      target.phaseHistory = Array.isArray(target.phaseHistory) ? target.phaseHistory : [];
      target.phaseHistory.push({
        id: AUGUST_PHASE_ID,
        action: 'Active phase reset to Level 0 with prior evidence archived',
        start: AUGUST_PHASE_START,
        end: AUGUST_PHASE_END,
        totalDays: daysBetween(AUGUST_PHASE_START, AUGUST_PHASE_END) + 1,
        reset: ['active XP', 'active level', 'active streak', 'active daily logs from August onward', 'weekly goals', 'weekly missions', 'reward qualifications', 'stickers'],
        preserved: ['pre-August daily history', 'historical Level peak', 'historical attention best', 'finances', 'recovery', 'mountains', 'photos', 'calendar', 'reviews', 'administration', 'Return-to-Sport evidence'],
        recordedAt: at
      });
      target.privateBuild.totalRebuildResetAppliedAt = at;
      target.privateBuild.totalRebuildResetId = AUGUST_PHASE_RESET_ID;
      target.privateBuild.automaticPreResetBackupKey = PRE_AUGUST_RESET_BACKUP_KEY;
    }

    enforceAugustPhase(target);
    target.momentum = target.momentum || { currentXP: 0, activeLevel: 0, ledger: [] };
    target.momentum.currentXP = Math.max(0, Number(target.momentum.currentXP || 0));
    target.momentum.activeLevel = clamp(Number(target.momentum.activeLevel ?? 0), 0, 50);
    target.momentum.ledger = Array.isArray(target.momentum.ledger) ? target.momentum.ledger : [];
    target.levelSystem = target.levelSystem || {};
    target.levelSystem.highestEarned = Math.max(1, Number(target.levelSystem.highestEarned || target.activePhase.archivedPeakLevel || 1));
    target.levelSystem.activeLevel = target.momentum.activeLevel;
    target.levelSystem.activePhaseId = AUGUST_PHASE_ID;
    rebaseActiveRewards(target, false);
    ensureTotalRebuildState(target);
    return target;
  }

  function ensureV37State(target = state) {
    target.version = PRIVATE_VERSION;
    target.settings = target.settings || {};
    target.settings.programStart = AUGUST_PHASE_START;
    target.settings.programEnd = AUGUST_PHASE_END;
    target.settings.weights = {
      body: 30,
      career: 25,
      admin: 20,
      attention: 15,
      connection: 10
    };
    target.privateBuild = {
      channel: 'private',
      phaseStart: V37_PHASE_START,
      originalVersion: 35,
      publicTrackerUntouched: true,
      ...target.privateBuild
    };
    const existingPolicy = target.policy?.zeroTolerance;
    target.policy = {
      prayer: DEFAULT_PRAYER,
      zeroTolerance: DEFAULT_ZERO_TOLERANCE,
      ...target.policy
    };
    if (!existingPolicy || existingPolicy === LEGACY_ZERO_TOLERANCE) {
      target.policy.zeroTolerance = DEFAULT_ZERO_TOLERANCE;
    }
    target.coach = {
      engine: 'local-adaptive-v1',
      smartLogHistory: [],
      commandHistory: [],
      ...target.coach
    };
    target.coach.smartLogHistory = Array.isArray(target.coach.smartLogHistory) ? target.coach.smartLogHistory : [];
    target.coach.commandHistory = Array.isArray(target.coach.commandHistory) ? target.coach.commandHistory : [];
    ensureCalendar(target);
    const cashBeforeNormalization = deepClone(target.goals?.cash || {});
    const cashReserveBeforeNormalization = deepClone(target.goals?.cashReserve || {});
    ensureCashViews(target);
    if (Object.keys(cashBeforeNormalization).length) target.goals.cash = cashBeforeNormalization;
    if (Object.keys(cashReserveBeforeNormalization).length) target.goals.cashReserve = cashReserveBeforeNormalization;
    const forgeGoal = target.goals?.items?.find(item => item.id === 'goal-forge');
    if (forgeGoal) {
      forgeGoal.title = 'Complete Project 52 with logged proof';
      forgeGoal.targetDate = '2026-12-31';
    }
    const mountainsGoal = target.goals?.items?.find(item => item.id === 'goal-mountains');
    if (mountainsGoal) mountainsGoal.targetDate = '2026-12-31';
    ensureMilestones(target);
    resetTwoEarlyRewards(target);
    target.privateBuild.rewardResetAppliedAt = target.privateBuild.rewardResetAppliedAt || new Date().toISOString();
    target.privateBuild.rewardResetIds = ['rw1', 'rw2'];
    target.levelSystem = defaultLevelSystem(target.levelSystem || {});
    target.levelSystem.permanent = true;
    target.levelSystem.highestEarned = Math.max(1, Number(target.levelSystem.highestEarned || 1), Number(target.levelSystem.activeLevel || 1));
    target.levelSystem.activeLevel = target.levelSystem.highestEarned;
    target.levelSystem.penaltiesDisabledAt = target.levelSystem.penaltiesDisabledAt || new Date().toISOString();
    ensureMomentum(target);
    if (!target.privateBuild?.totalRebuildResetAppliedAt) {
      applyV41UserReset(target);
      ensureV41ResetEvidence(target);
    }
    ensureWeeklyMissions(target);
    ensureAugustFoundation(target);
    ensureReturnToSportTrail(target);
    target.admin = Array.isArray(target.admin) ? target.admin : [];
    [
      {
        id: 'full-duty-return',
        title: 'Document confirmed full-duty return and supporting evidence',
        category: 'Recovery',
        priority: 'High',
        due: ''
      },
      {
        id: 'return-to-sport-clearance',
        title: 'Document explicit return-to-sport clearance and test evidence',
        category: 'Recovery',
        priority: 'High',
        due: ''
      }
    ].forEach(seed => {
      if (!target.admin.some(item => item.id === seed.id)) target.admin.push({ ...seed, complete: false });
    });
    return ensureAugustFinalReset(target);
  }

  const mergeGoalSystemV36 = mergeGoalSystem;
  mergeGoalSystem = function (existing) {
    const merged = mergeGoalSystemV36(existing);
    merged.cashReserve = {
      current: '',
      target: 100000,
      targetDate: '2026-12-31',
      history: [],
      note: 'Liquid cash only. Keep this separate from net worth.',
      ...(existing?.cashReserve || {})
    };
    merged.cashReserve.history = Array.isArray(existing?.cashReserve?.history)
      ? existing.cashReserve.history
      : [];
    return merged;
  };

  const defaultLevelSystemV36Private = defaultLevelSystem;
  defaultLevelSystem = function (existing = {}) {
    const merged = defaultLevelSystemV36Private(existing);
    const next = {
      ...merged,
      permanent: existing.permanent !== false,
      penaltiesDisabledAt: existing.penaltiesDisabledAt || null
    };
    if (Number(existing.activeLevel) === 0 || existing.activePhaseId === AUGUST_PHASE_ID) {
      next.activeLevel = clamp(Number(existing.activeLevel ?? 0), 0, 50);
    }
    return next;
  };

  ensureV37State(state);
  safeSet(STORE_KEY, JSON.stringify(state));

  const weekSundayBeforeTotalRebuild = weekSunday;
  weekSunday = function (date = activeDate()) {
    const original = weekSundayBeforeTotalRebuild(date);
    return state.activePhase?.id === AUGUST_PHASE_ID && original < AUGUST_PHASE_START
      ? AUGUST_PHASE_START
      : original;
  };

  if (Array.isArray(V29_PATCHES)) {
    EXTRA_PATCHES.forEach(def => {
      if (!V29_PATCHES.some(existing => existing.id === def.id)) V29_PATCHES.push(def);
    });
  }

  const v29PatchStatusBeforeAugustReset = v29PatchStatus;
  v29PatchStatus = function (def, metrics = v29PatchMetrics()) {
    const result = v29PatchStatusBeforeAugustReset(def, metrics);
    if (state.activePhase?.id !== AUGUST_PHASE_ID) return result;
    const baseline = Number(state.activePhase?.stickerBaselines?.[def.id] || 0);
    if (!baseline) return result;
    const value = Math.max(0, Number(result.value || 0) - baseline);
    return {
      ...result,
      value,
      ratio: clamp(value / Math.max(1, Number(result.target || 1)), 0, 1),
      met: value >= Number(result.target || 1),
      archivedBaseline: baseline
    };
  };

  const migrateV36 = migrate;
  migrate = function (raw) {
    return ensureV37State(migrateV36(raw));
  };

  const defaultStateV36 = defaultState;
  defaultState = function () {
    return ensureV37State(defaultStateV36());
  };

  const rankPenaltyLedgerV36 = rankPenaltyLedger;
  rankPenaltyLedger = function () {
    const previous = typeof rankPenaltyLedgerV36 === 'function' ? rankPenaltyLedgerV36() : {};
    return {
      ...previous,
      events: [],
      total: 0,
      recent: [],
      recentSevere: false,
      unresolved: 0
    };
  };

  const levelMetricsV36 = levelMetrics;
  levelMetrics = function () {
    const metrics = levelMetricsV36();
    const zeroToleranceBonus = (state.momentum?.ledger || [])
      .filter(item => item.type === 'zero-tolerance-kept')
      .reduce((sum, item) => sum + Math.max(0, Number(item.permanentXP || 0)), 0);
    const missionDayBonus = (state.weeklyMissions?.history || [])
      .filter(item => item.completedAt)
      .reduce((sum, item) => sum + Math.max(0, Number(item.permanentXP || 0)), 0);
    const returnToSportBonus = (state.returnToSportTrail?.rewardLedger || [])
      .filter(item => item.type === 'return-to-sport-milestone')
      .reduce((sum, item) => sum + Math.max(0, Number(item.permanentXP || 0)), 0);
    const baseGrossXP = Number(metrics.grossXP ?? metrics.totalXP ?? 0);
    const grossXP = baseGrossXP + zeroToleranceBonus + missionDayBonus + returnToSportBonus;
    return {
      ...metrics,
      baseGrossXP,
      zeroToleranceBonus,
      missionDayBonus,
      returnToSportBonus,
      grossXP,
      penaltyXP: 0,
      totalXP: grossXP
    };
  };

  const levelRequirementsV36 = levelRequirements;
  function xpTarget(level) {
    if (level <= 1) return 0;
    return Math.round(((level - 1) / 49) * 14000);
  }
  function activeXpTarget(level) {
    if (level <= 0) return 0;
    return Math.round((level / 50) * 14000);
  }

  const levelTierBeforeAugustReset = levelTier;
  levelTier = function (level) {
    if (Number(level) <= 0) {
      return { name: 'Rebuild', min: 0, max: 0, color: '#c9b48a', line: 'Lay the first honest stone.' };
    }
    return levelTierBeforeAugustReset(level);
  };

  const levelMetricsBeforeAugustReset = levelMetrics;
  levelMetrics = function () {
    const metrics = levelMetricsBeforeAugustReset();
    if (state.activePhase?.id !== AUGUST_PHASE_ID) return metrics;
    const activeXP = Math.max(0, Number(state.momentum?.currentXP || 0));
    const stakeLoss = (state.momentum?.ledger || [])
      .filter(entry => entry.type === 'zero-tolerance-unchecked')
      .reduce((sum, entry) => sum + Math.abs(Math.min(0, Number(entry.stakeXP ?? entry.xpDelta ?? 0))), 0);
    return {
      ...metrics,
      lifetimeXP: Number(metrics.totalXP || 0),
      grossXP: activeXP + stakeLoss,
      penaltyXP: stakeLoss,
      totalXP: activeXP,
      activePhaseXP: activeXP
    };
  };

  levelRequirements = function (level, metrics = levelMetrics()) {
    const result = levelRequirementsV36(level, metrics);
    if (state.activePhase?.id === AUGUST_PHASE_ID && level <= 1) {
      const requirements = [
        { label: 'Forge XP', value: Number(state.momentum?.currentXP || 0), target: activeXpTarget(1) },
        { label: 'Logged days', value: Number(metrics.logged || 0), target: 1 }
      ];
      requirements.forEach(requirement => {
        requirement.met = Number(requirement.value) >= Number(requirement.target);
      });
      return { met: requirements.every(requirement => requirement.met), requirements };
    }
    const forge = result.requirements.find(item => item.label === 'Forge XP');
    if (forge) {
      forge.target = state.activePhase?.id === AUGUST_PHASE_ID ? activeXpTarget(level) : xpTarget(level);
      if (state.activePhase?.id === AUGUST_PHASE_ID) forge.value = Number(state.momentum?.currentXP || 0);
      forge.met = Number(forge.value) >= forge.target;
    }
    result.met = result.requirements.every(item => item.met);
    return result;
  };

  updateLevelProgress = function () {
    state.levelSystem = defaultLevelSystem(state.levelSystem);
    const metrics = levelMetrics();
    let eligible = state.activePhase?.id === AUGUST_PHASE_ID ? 0 : 1;
    const first = state.activePhase?.id === AUGUST_PHASE_ID ? 1 : 2;
    for (let level = first; level <= 50; level += 1) {
      if (levelRequirements(level, metrics).met) eligible = level;
      else break;
    }
    if (state.activePhase?.id === AUGUST_PHASE_ID) {
      const ceiling = state.momentum?.levelOverride?.ceiling;
      if (Number.isFinite(Number(ceiling))) eligible = Math.min(eligible, clamp(Number(ceiling), 0, 50));
      state.momentum.activeLevel = clamp(eligible, 0, 50);
      state.levelSystem.activeLevel = state.momentum.activeLevel;
      state.levelSystem.highestEarned = Math.max(1, Number(state.levelSystem.highestEarned || 1), eligible);
      state.levelSystem.lastCalculated = new Date().toISOString();
      return eligible;
    }
    const permanent = Math.max(1, eligible, Number(state.levelSystem.highestEarned || 1), Number(state.levelSystem.activeLevel || 1));
    state.levelSystem.highestEarned = permanent;
    state.levelSystem.activeLevel = permanent;
    state.levelSystem.lastCalculated = new Date().toISOString();
    return permanent;
  };

  levelSnapshot = function () {
    const metrics = levelMetrics();
    const current = updateLevelProgress();
    const next = Math.min(50, current + 1);
    const requirements = levelRequirements(next, metrics);
    const nextMissing = requirements.requirements
      .filter(item => !item.met)
      .map(item => `${item.label}: ${item.value}/${item.target}`);
    const previousXP = state.activePhase?.id === AUGUST_PHASE_ID ? activeXpTarget(current) : xpTarget(current);
    const nextXP = state.activePhase?.id === AUGUST_PHASE_ID ? activeXpTarget(next) : xpTarget(next);
    const nextRatio = current >= 50
      ? 1
      : clamp((metrics.totalXP - previousXP) / Math.max(1, nextXP - previousXP), 0, 1);
    return {
      current,
      peak: Math.max(current, Number(state.levelSystem.highestEarned || current)),
      tier: levelTier(current),
      metrics,
      next,
      nextMissing,
      nextRatio
    };
  };

  const rewardMetricsV36 = rewardMetricsWithoutIntegrity;
  rewardMetricsWithoutIntegrity = function (reward) {
    const metrics = rewardMetricsV36(reward);
    const closed = daysBetween(reward.end, activeDate()) > 0;
    const reset = !!reward.qualificationResetAt;
    return {
      ...metrics,
      closed,
      gateReady: closed && metrics.logged >= 5 && metrics.average >= 70 && !metrics.lapse && !reset,
      reset
    };
  };

  function dateKeyInLA(date) {
    const parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: LA_TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date).forEach(part => {
      if (part.type !== 'literal') parts[part.type] = part.value;
    });
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function calendarEventsFor(date) {
    return (state.calendar?.events || [])
      .filter(event => {
        if (event.date) return event.date === date;
        if (!event.start) return false;
        const parsed = new Date(event.start);
        return !Number.isNaN(parsed.valueOf()) && dateKeyInLA(parsed) === date;
      })
      .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')));
  }

  function agendaDateFor(logDate = activeDate(), calendarToday = dateKeyInLA(new Date())) {
    return daysBetween(logDate, calendarToday) === 1 ? calendarToday : logDate;
  }

  function eventTime(event) {
    if (event.allDay) return 'All day';
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;
    if (Number.isNaN(start.valueOf())) return event.time || 'Scheduled';
    const format = value => value.toLocaleTimeString('en-US', {
      timeZone: LA_TZ,
      hour: 'numeric',
      minute: '2-digit'
    });
    return end && !Number.isNaN(end.valueOf()) ? `${format(start)}–${format(end)}` : format(start);
  }

  function inferredMode(date, day, events) {
    if (day?.schedule?.userSelected && day.dayType) return day.dayType;
    const titles = events.map(event => `${event.title || event.summary || ''} ${event.description || ''}`).join(' ');
    if (/post[- ]shift|protected sleep|sleep \/ recovery/i.test(titles)) return 'Post-Shift Recovery';
    if (/night shift|noc shift|22:45|work night/i.test(titles)) return 'Work Night';
    return typeof suggestedDayTypeFor === 'function' ? suggestedDayTypeFor(date) : 'Off Day';
  }

  function capacityFor(day, mode) {
    const context = day?.context || {};
    const unsafeBG = ['Unstable', 'Needs attention'].includes(context.bg);
    const highSymptoms = Math.max(
      Number(context.kneePain || 0),
      Number(context.anklePain || 0),
      Number(context.swelling || 0)
    ) >= 7;
    if (unsafeBG || highSymptoms || Number(context.energy || 5) <= 2) {
      return {
        level: 'RED',
        className: 'red',
        reason: unsafeBG
          ? 'Blood-glucose safety overrides productivity.'
          : highSymptoms
            ? 'Symptoms require a protected, restriction-led plan.'
            : 'Very low energy calls for the minimum effective day.'
      };
    }
    const green = mode !== 'Post-Shift Recovery'
      && Number(context.sleep || 5) >= 7
      && Number(context.energy || 5) >= 7
      && Number(context.stress || 5) <= 5
      && Math.max(Number(context.kneePain || 0), Number(context.anklePain || 0), Number(context.swelling || 0)) <= 4;
    if (green) {
      return {
        level: 'GREEN',
        className: 'green',
        reason: 'Recovery and energy support one optional stretch action.'
      };
    }
    return {
      level: 'YELLOW',
      className: 'yellow',
      reason: mode === 'Post-Shift Recovery'
        ? 'Post-shift recovery keeps the plan deliberately narrow.'
        : 'Use a focused plan and protect the floor.'
    };
  }

  function nextOpenAdmin() {
    const rows = (state.admin || []).filter(item => !item.complete);
    return rows.sort((a, b) => {
      const priority = { High: 0, Normal: 1, Someday: 2 };
      return (priority[a.priority] ?? 1) - (priority[b.priority] ?? 1)
        || String(a.due || '9999-12-31').localeCompare(String(b.due || '9999-12-31'));
    })[0] || null;
  }

  function eventBy(events, pattern) {
    return events.find(event => pattern.test(`${event.title || event.summary || ''} ${event.description || ''}`));
  }

  function commandFor(date = activeDate(), calendarDate = agendaDateFor(date)) {
    const day = getDay(date);
    const events = calendarEventsFor(calendarDate);
    const mode = inferredMode(calendarDate, day, events);
    const capacity = capacityFor(day, mode);
    const sleep = eventBy(events, /sleep|post[- ]shift recovery/i);
    const rehab = eventBy(events, /rehab|physical therapy|\bPT\b/i);
    const augustAnkle = scheduledAugustHabits(calendarDate).ankle;
    const review = eventBy(events, /midweek review|daily check[- ]in|review/i);
    const work = eventBy(events, /night shift|noc|\bwork\b/i);
    const openAdmin = nextOpenAdmin();
    const dexcomMissionDay = calendarDate === state.dexcomMission?.recommendedMissionDate
      || eventBy(events, /dexcom|glucose pattern analysis/i);
    let critical;
    let body;
    let life;

    if (mode === 'Post-Shift Recovery') {
      critical = sleep
        ? `Protect ${eventTime(sleep)} for ${sleep.title || sleep.summary}.`
        : 'Protect the main post-shift sleep block before adding productivity.';
      body = augustAnkle
        ? 'Complete the scheduled 20-minute approved right-ankle rehabilitation, or its approved Recovery version when capacity/symptoms require it. Do not add a competing Body Mission.'
        : rehab
        ? `Complete or appropriately modify ${rehab.title || rehab.summary} at ${eventTime(rehab)} within current restrictions.`
        : 'Use the clinician-approved recovery minimum; legitimate rest counts when it is the correct intervention.';
      const reviewEvents = events.filter(event => /review|check[- ]in/i.test(event.title || event.summary || ''));
      life = reviewEvents.length
        ? `Complete the scheduled ${reviewEvents.map(event => `${event.title || event.summary} (${eventTime(event)})`).join(' and ')}.`
        : 'Close one tiny life loop after the main recovery block.';
    } else if (mode === 'Work Night') {
      critical = work
        ? `Prepare for and complete ${work.title || work.summary} at ${eventTime(work)} safely and professionally.`
        : 'Prepare for and complete the RN night shift safely and professionally.';
      body = augustAnkle
        ? 'Complete the scheduled 20-minute approved right-ankle rehabilitation, or its approved Recovery version, without borrowing from pre-shift sleep. This is the only Body Mission.'
        : rehab
        ? `Complete or modify ${rehab.title || rehab.summary} before the shift without borrowing from sleep.`
        : 'Complete only the minimum effective recovery work; do not borrow from pre-shift sleep.';
      life = openAdmin
        ? `Close one small loop: ${openAdmin.title}.`
        : 'Complete one small preparation or administrative action.';
    } else {
      const primaryEvent = events.find(event => !/reward gate|daily check[- ]in/i.test(event.title || event.summary || ''));
      critical = primaryEvent
        ? `Honor the day’s highest-value commitment: ${primaryEvent.title || primaryEvent.summary} at ${eventTime(primaryEvent)}.`
        : openAdmin
          ? `Complete the highest-leverage open task: ${openAdmin.title}.`
          : 'Complete one meaningful avoided or high-leverage task.';
      body = augustAnkle
        ? 'Complete the scheduled 20-minute approved right-ankle rehabilitation at 3:00 PM, or the approved Recovery version if readiness is RED. This replaces any other Body Mission.'
        : rehab
        ? `Complete ${rehab.title || rehab.summary} at ${eventTime(rehab)} within current restrictions.`
        : 'Complete planned rehabilitation or training within current surgeon and PT restrictions.';
      life = dexcomMissionDay
        ? 'Complete the Dexcom Pattern Analysis: upload the report, identify three repeatable patterns, and produce a concrete clinician-review plan without independently changing insulin.'
        : review
        ? `Complete ${review.title || review.summary} at ${eventTime(review)}.`
        : openAdmin
          ? `Move one life-administration loop: ${openAdmin.title}.`
          : 'Complete one administration, relationship, career, or outside-time action.';
    }

    if (state.activePhase?.id === AUGUST_PHASE_ID) {
      const dayIndex = new Date(`${date}T12:00:00Z`).getUTCDay();
      const totalRebuildBody = {
        0: 'Arms + chin-up volume',
        1: 'Left quadriceps + chin-up speed',
        2: 'Chest support + approved recovery',
        3: 'Posterior-chain + hip strength',
        4: 'Weighted chin-up + back / biceps',
        5: 'Single-leg control + left quadriceps',
        6: 'Legitimate recovery + optional short core'
      }[dayIndex];
      const workoutVersion = mode === 'Post-Shift Recovery' || capacity.level === 'RED'
        ? 'Recovery'
        : mode === 'Work Night'
          ? 'Minimum effective'
          : capacity.level === 'GREEN' ? 'Full' : 'Compressed';
      const rehabAddition = augustAnkle
        ? ' Include the scheduled approved right-ankle rehabilitation only within current limits.'
        : '';
      body = `${workoutVersion} version — ${totalRebuildBody}.${rehabAddition} Open Today’s Body Order for the exact cleared sequence; current restrictions override the template.`;
    }

    const optional = capacity.level === 'GREEN' && mode !== 'Post-Shift Recovery'
      ? 'Use the best remaining energy for one extra high-value action, then stop.'
      : null;
    const dopamine = mode === 'Post-Shift Recovery'
      ? 'Phone away from bed; use brief prayer, reading, calm audio, or a low-stimulation reset.'
      : 'Use prayer, reading, outside time, meaningful work, or real connection instead of the avoidance loop.';
    let definition = mode === 'Post-Shift Recovery'
      ? 'Main sleep protected, recovery handled honestly, scheduled review/check-in completed, attention protected or accurately logged, and the day closed.'
      : mode === 'Work Night'
        ? 'Shift prepared for safely, recovery minimum respected, one life loop moved, attention protected or accurately logged, and the day closed.'
        : 'One meaningful mission completed, body work matched to restrictions, one life action finished, attention protected or accurately logged, and the day closed.';
    if (state.activePhase?.id === AUGUST_PHASE_ID) {
      definition = 'Critical Mission + Body Mission + Life Mission + saved four-area pain check + one meaningful Rebuild Entry. Optional Power Move is never required. Legitimate Recovery counts when it is the correct assignment.';
    }
    return { date, calendarDate, day, events, mode, capacity, critical, body, life, optional, dopamine, definition };
  }

  function momentumLevelForXP(xp, cap = 50) {
    let level = state.activePhase?.id === AUGUST_PHASE_ID ? 0 : 1;
    const first = state.activePhase?.id === AUGUST_PHASE_ID ? 1 : 2;
    for (let candidate = first; candidate <= Math.min(50, cap); candidate += 1) {
      const target = state.activePhase?.id === AUGUST_PHASE_ID ? activeXpTarget(candidate) : xpTarget(candidate);
      if (Number(xp) >= target) level = candidate;
      else break;
    }
    return level;
  }

  function settleZeroTolerance(date, day) {
    ensureMomentum(state);
    if (day.zeroToleranceSettlement) return day.zeroToleranceSettlement;
    const kept = !!day.actions?.noSlither;
    const beforeXP = Math.max(0, Number(state.momentum.currentXP || 0));
    const beforeLevel = state.activePhase?.id === AUGUST_PHASE_ID
      ? clamp(Number(state.momentum.activeLevel ?? 0), 0, 50)
      : Math.max(1, Number(state.momentum.activeLevel || state.levelSystem.highestEarned || 1));
    const dailyXP = Math.max(0, Number(day.adaptive?.xp ?? adaptiveComponents(day).total ?? 0));
    const stakeXP = kept ? ZERO_TOLERANCE_AWARD : -ZERO_TOLERANCE_CONSEQUENCE;
    const xpDelta = dailyXP + stakeXP;
    const afterXP = Math.max(0, beforeXP + xpDelta);
    const afterLevel = kept
      ? Math.max(beforeLevel, momentumLevelForXP(afterXP, 50))
      : Math.max(state.activePhase?.id === AUGUST_PHASE_ID ? 0 : 1, beforeLevel - 1);
    const settlement = {
      id: `zero-tolerance-${date}`,
      date,
      outcome: kept ? 'kept' : 'unchecked',
      xpDelta,
      dailyXP,
      stakeXP,
      permanentXP: 0,
      beforeXP,
      afterXP,
      beforeLevel,
      afterLevel,
      at: new Date().toISOString()
    };
    day.zeroToleranceSettlement = settlement;
    state.momentum.currentXP = afterXP;
    state.momentum.activeLevel = afterLevel;
    state.momentum.levelOverride = kept ? null : { ceiling: afterLevel, date, reason: 'Unchecked Zero-Tolerance close' };
    state.momentum.ledger.push({
      ...settlement,
      type: kept ? 'zero-tolerance-kept' : 'zero-tolerance-unchecked'
    });
    return settlement;
  }

  function missionWeekStart(date = activeDate()) {
    return typeof weekSunday === 'function' ? weekSunday(date) : addDays(date, -new Date(`${date}T12:00:00`).getDay());
  }

  function isMissionWorkDate(date) {
    const events = calendarEventsFor(date);
    return inferredMode(date, getDay(date), events) === 'Work Night'
      || (typeof isScheduledWorkDate === 'function' && isScheduledWorkDate(date));
  }

  function missionBlockLength(date) {
    let before = 0;
    let after = 0;
    for (let offset = 1; offset <= 6 && !isMissionWorkDate(addDays(date, -offset)); offset += 1) before += 1;
    for (let offset = 1; offset <= 6 && !isMissionWorkDate(addDays(date, offset)); offset += 1) after += 1;
    return { total: before + 1 + after, balance: Math.abs(before - after), before, after };
  }

  function hasDemandingConflict(date) {
    return calendarEventsFor(date).some(event => /surgery|procedure|medical|appointment|rehab|physical therapy|demanding|training|inservice/i.test(
      `${event.title || event.summary || ''} ${event.description || ''}`
    ));
  }

  function physicalWindow(date) {
    const day = getDay(date);
    const events = calendarEventsFor(date);
    const mode = inferredMode(date, day, events);
    const capacity = capacityFor(day, mode);
    if (mode !== 'Off Day' || capacity.level !== 'GREEN' || hasDemandingConflict(date)) return null;
    let previousWork = null;
    let nextWork = null;
    for (let offset = 1; offset <= 7; offset += 1) {
      if (!previousWork && isMissionWorkDate(addDays(date, -offset))) previousWork = offset;
      if (!nextWork && isMissionWorkDate(addDays(date, offset))) nextWork = offset;
    }
    if (previousWork !== null && previousWork < 3) return null;
    if (nextWork !== null && nextWork < 2) return null;
    const block = missionBlockLength(date);
    return {
      date,
      time: '14:00',
      mode,
      capacity: capacity.level,
      block,
      score: block.total * 10 - block.balance - calendarEventsFor(date).length
    };
  }

  function mentalWindow(date) {
    const day = getDay(date);
    const events = calendarEventsFor(date);
    const mode = inferredMode(date, day, events);
    const capacity = capacityFor(day, mode);
    if (mode === 'Work Night' || hasDemandingConflict(date)) return null;
    const block = missionBlockLength(date);
    const time = mode === 'Post-Shift Recovery' ? '18:00' : '14:00';
    return {
      date,
      time,
      mode,
      capacity: capacity.level,
      block,
      score: block.total * 10 - block.balance - events.length - (mode === 'Post-Shift Recovery' ? 8 : 0)
    };
  }

  function missionPoolAvailable(category) {
    const medical = state.weeklyMissions.medical || {};
    return WEEKLY_MISSION_POOL[category].filter(mission => {
      if (mission.gate === 'fastPlan') {
        return medical.fastingClinicianClearance && medical.fastingPlanDocumented;
      }
      if (mission.gate === 'pullupReady') {
        return medical.pullupClinicianClearance && medical.pullupReadinessDocumented;
      }
      return true;
    });
  }

  function nextMissionFromPool(category) {
    const available = missionPoolAvailable(category);
    const used = new Set([
      ...(state.weeklyMissions.rotationArchiveIds || []),
      ...(state.weeklyMissions.history || [])
        .filter(item => item.category === category)
        .map(item => item.poolId)
    ]);
    return available.find(item => !used.has(item.id)) || available[0] || null;
  }

  function scheduledMissionForWeek(weekStart = missionWeekStart()) {
    if (state.weeklyMissions.current?.weekStart === weekStart) return state.weeklyMissions.current;
    return (state.weeklyMissions.history || []).find(item => item.weekStart === weekStart) || null;
  }

  function recommendWeeklyMission(force = false) {
    ensureWeeklyMissions(state);
    const weekStart = missionWeekStart();
    const existing = scheduledMissionForWeek(weekStart);
    if (existing && !force) return existing;
    const dates = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
      .filter(date => daysBetween(activeDate(), date) >= 0);
    const requested = state.weeklyMissions.categoryNext === 'mental' ? 'mental' : 'physical';
    const physicalWindows = dates.map(physicalWindow).filter(Boolean).sort((a, b) => b.score - a.score);
    let category = requested;
    let window = category === 'physical' ? physicalWindows[0] : null;
    if (!window) {
      category = 'mental';
      window = dates.map(mentalWindow).filter(Boolean).sort((a, b) => b.score - a.score)[0] || {
        date: dates[0] || activeDate(),
        time: '18:00',
        mode: 'Off Day',
        capacity: 'RED',
        block: { total: 1 },
        score: 0
      };
    }
    const mission = nextMissionFromPool(category);
    if (!mission) return null;
    const recommendation = {
      id: `weekly-mission-${weekStart}-${mission.id}`,
      weekStart,
      category,
      poolId: mission.id,
      mission: mission.title,
      date: window.date,
      time: window.time,
      why: category === 'physical'
        ? `This is the strongest GREEN Off-Day window in the longest usable free block, with the work/recovery buffers and appointment checks satisfied.`
        : window.capacity === 'RED'
          ? 'Physical readiness is RED or no safe physical window exists, so this controlled mental mission protects recovery while still producing leverage.'
          : 'This is the strongest non-work focus window in the current free block without borrowing from post-shift recovery.',
      goal: mission.id.includes('cash')
        ? '$100K cash staircase'
        : mission.id.includes('career')
          ? 'Career leverage and ICU readiness'
          : mission.id.includes('reading')
            ? 'Faith, attention control, and identity'
            : mission.id.includes('life')
              ? 'Life administration and 2026 goals'
              : mission.id.includes('rehab') || mission.id.includes('recovery')
                ? 'Rehabilitation and return-to-mountains'
                : 'Physique, work capacity, and disciplined execution',
      completion: mission.completion,
      preparation: mission.preparation,
      safety: mission.safety,
      evidence: mission.evidence,
      recovery: mission.recovery,
      reminders: [
        `Preparation reminder: ${fmtDate(addDays(window.date, -1))} at 7:00 PM`,
        `Start reminder: ${fmtDate(window.date)} at ${formatMissionTime(window.time)}`,
        `Completion check: ${fmtDate(window.date)} at 8:30 PM`
      ],
      status: 'Recommended',
      reschedules: 0,
      generatedAt: new Date().toISOString()
    };
    state.weeklyMissions.current = recommendation;
    save();
    return recommendation;
  }

  function missionLocalDateTime(date, time) {
    return `${date}T${time}:00`;
  }

  function formatMissionTime(time) {
    const [hour, minute] = String(time || '14:00').split(':').map(Number);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${String(minute || 0).padStart(2, '0')} ${suffix}`;
  }

  function missionReminderEvents(mission) {
    const prior = addDays(mission.date, -1);
    return [
      {
        id: `${mission.id}-prep`,
        title: `Prepare: ${mission.mission}`,
        date: prior,
        start: missionLocalDateTime(prior, '19:00'),
        end: missionLocalDateTime(prior, '19:15'),
        description: mission.preparation,
        source: 'Project 52 Mission'
      },
      {
        id: `${mission.id}-start`,
        title: `WEEKLY PROJECT 52 MISSION: ${mission.mission}`,
        date: mission.date,
        start: missionLocalDateTime(mission.date, mission.time),
        end: missionLocalDateTime(mission.date, mission.time === '18:00' ? '19:30' : '16:00'),
        description: `${mission.completion}\n\nSafety: ${mission.safety}`,
        source: 'Project 52 Mission'
      },
      {
        id: `${mission.id}-check`,
        title: 'Project 52 Mission completion check',
        date: mission.date,
        start: missionLocalDateTime(mission.date, '20:30'),
        end: missionLocalDateTime(mission.date, '20:40'),
        description: 'Record evidence and answer: What did completing this prove about the person I am becoming?',
        source: 'Project 52 Mission'
      }
    ];
  }

  function icsStamp(value) {
    return String(value || '').replace(/[-:]/g, '').replace('.000', '');
  }

  function escapeIcs(value = '') {
    return String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }

  function downloadMissionReminders(events, mission) {
    const body = events.map(event => [
      'BEGIN:VEVENT',
      `UID:${escapeIcs(event.id)}@project-52`,
      `DTSTART:${icsStamp(event.start)}`,
      `DTEND:${icsStamp(event.end)}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      'END:VEVENT'
    ].join('\r\n')).join('\r\n');
    downloadFile(
      `project-52-mission-${mission.weekStart}.ics`,
      `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Project 52//Weekly Mission//EN\r\n${body}\r\nEND:VCALENDAR\r\n`,
      'text/calendar'
    );
  }

  function confirmWeeklyMission() {
    const mission = state.weeklyMissions.current || recommendWeeklyMission();
    if (!mission || mission.status === 'Completed') return;
    if (mission.status === 'Confirmed') return toast('This week’s mission is already confirmed');
    mission.status = 'Confirmed';
    mission.confirmedAt = new Date().toISOString();
    const reminders = missionReminderEvents(mission);
    const ids = new Set(reminders.map(item => item.id));
    state.calendar.events = (state.calendar.events || []).filter(item => !ids.has(item.id)).concat(reminders);
    state.weeklyMissions.reminders = (state.weeklyMissions.reminders || []).filter(item => !ids.has(item.id)).concat(reminders);
    save();
    downloadMissionReminders(reminders, mission);
    renderWeeklyMission();
    renderCoach();
    toast('Mission confirmed · three calendar reminders prepared');
  }

  function rescheduleWeeklyMission() {
    const mission = state.weeklyMissions.current;
    if (!mission || mission.status !== 'Confirmed') return;
    if (mission.reschedules >= 1) return toast('Only one safe reschedule is allowed in the same week');
    const weekEnd = addDays(mission.weekStart, 6);
    const candidates = [];
    for (let date = addDays(mission.date, 1); daysBetween(date, weekEnd) >= 0; date = addDays(date, 1)) {
      const slot = mission.category === 'physical' ? physicalWindow(date) : mentalWindow(date);
      if (slot) candidates.push(slot);
    }
    if (!candidates.length) return toast('No safe remaining window exists this week; defer without penalty');
    candidates.sort((a, b) => b.score - a.score);
    const previousIds = new Set(missionReminderEvents(mission).map(item => item.id));
    state.calendar.events = (state.calendar.events || []).filter(item => !previousIds.has(item.id));
    mission.date = candidates[0].date;
    mission.time = candidates[0].time;
    mission.reschedules += 1;
    mission.rescheduledAt = new Date().toISOString();
    const reminders = missionReminderEvents(mission);
    state.calendar.events.push(...reminders);
    state.weeklyMissions.reminders = reminders;
    save();
    downloadMissionReminders(reminders, mission);
    renderWeeklyMission();
    toast('Mission safely rescheduled once within this week');
  }

  function completeWeeklyMission() {
    const mission = state.weeklyMissions.current;
    if (!mission || mission.status !== 'Confirmed') return;
    const evidence = $('v38MissionEvidence').value.trim();
    const reflection = $('v38MissionReflection').value.trim();
    if (evidence.length < 12) return toast('Record concrete completion evidence first');
    if (reflection.length < 8) return toast('Answer the identity question in one honest sentence');
    mission.status = 'Completed';
    mission.completedAt = new Date().toISOString();
    mission.evidenceRecorded = evidence;
    mission.identityReflection = reflection;
    mission.permanentXP = MISSION_DAY_CREDIT;
    state.weeklyMissions.history.push(deepClone(mission));
    state.weeklyMissions.categoryNext = mission.category === 'physical' ? 'mental' : 'physical';
    ensureMomentum(state);
    state.momentum.currentXP = Math.max(0, Number(state.momentum.currentXP || 0)) + MISSION_DAY_CREDIT;
    state.momentum.levelOverride = null;
    state.momentum.activeLevel = Math.max(
      Number(state.momentum.activeLevel ?? 0),
      momentumLevelForXP(state.momentum.currentXP)
    );
    updateLevelProgress();
    save();
    renderAll();
    navigator.vibrate?.([30, 30, 90]);
    toast(`Mission evidence locked · +${MISSION_DAY_CREDIT} permanent XP`);
  }

  function coachMission(label, text, className = '') {
    return `<div class="v37Mission ${className}"><b>${escapeHtml(label)}</b><span>${escapeHtml(text)}</span></div>`;
  }

  function agendaHtml(events) {
    if (!events.length) {
      return '<div class="notice">No events are stored for this day yet. Import an .ics file in Data, or use the future native Calendar bridge.</div>';
    }
    return events.map(event => `
      <div class="v37AgendaItem">
        <time>${escapeHtml(eventTime(event))}</time>
        <div>
          <b>${escapeHtml(event.title || event.summary || 'Calendar event')}</b>
          ${event.description ? `<small>${escapeHtml(String(event.description).split('\n')[0])}</small>` : ''}
        </div>
      </div>
    `).join('');
  }

  function hideDuplicateSurfaces() {
    const home = $('home');
    const head = [...(home?.querySelectorAll(':scope > .sectionHead') || [])]
      .find(node => /Today’s Command/i.test(node.textContent || ''));
    if (head) {
      head.classList.add('v37OriginalCommandHidden');
      head.nextElementSibling?.classList.add('v37OriginalCommandHidden');
    }
    const checklistSummary = $('dailyChecklistPanel')?.querySelector('summary b');
    if (checklistSummary) checklistSummary.textContent = 'Support Checklist';
    const checklistNote = $('dailyChecklistPanel')?.querySelector('.notice');
    if (checklistNote) checklistNote.textContent = 'Only non-duplicated support checks live here. Core missions, attention, nutrition, prayer, and recovery stay in their primary sections.';
  }

  function restoreFamiliarHomeOrder() {
    const home = $('home');
    const evidence = $('homeEvidencePanel');
    if (!home || !evidence) return;

    let heading = $('v40SpecialOperationsHead');
    if (!heading) {
      heading = document.createElement('div');
      heading.className = 'sectionHead';
      heading.id = 'v40SpecialOperationsHead';
      heading.innerHTML = '<h2>Special Operations</h2><div class="mini">weekly mission · August foundation · modality balance</div>';
    }

    let cursor = evidence;
    [heading, $('v38WeeklyMission'), $('v39AugustMission'), $('v39ModalityWeb')].forEach(node => {
      if (!node) return;
      cursor.insertAdjacentElement('afterend', node);
      cursor = node;
    });
  }

  function ensureCoachPanel() {
    if ($('v37Coach')) return;
    const hero = $('home')?.querySelector('.hero');
    hero?.insertAdjacentHTML('afterend', `
      <section class="card v37Coach" id="v37Coach" aria-labelledby="v37CoachTitle">
        <div class="v37CoachTop">
          <div>
            <div class="eyebrow">Project 52 Coach · adaptive field command</div>
            <h2 id="v37CoachTitle">Today’s Command</h2>
            <div class="mini" id="v37CoachReason">Uses the saved day, calendar agenda, shift rhythm, recovery, and open commitments.</div>
          </div>
          <span class="v37Capacity yellow" id="v37Capacity">YELLOW</span>
        </div>
        <div class="v37CoachQuestion">What kind of day is this?</div>
        <div class="v37ModeGrid" role="group" aria-label="Day type">
          <button class="v37Mode" data-v37-mode="Work Night" type="button"><b>Work Night</b><small>Shift safety and the recovery minimum</small></button>
          <button class="v37Mode" data-v37-mode="Off Day" type="button"><b>Off Day</b><small>One meaningful build window</small></button>
          <button class="v37Mode" data-v37-mode="Post-Shift Recovery" type="button"><b>Post-Shift Recovery</b><small>Sleep is productive work</small></button>
        </div>
        <div class="sectionHead"><h2>Today’s calendar</h2><div class="mini" id="v37CalendarSource">Local agenda</div></div>
        <div class="v37Agenda" id="v37Agenda"></div>
        <div class="sectionHead"><h2>Mission orders</h2><div class="mini">one decision per category</div></div>
        <div class="v37MissionGrid" id="v37MissionGrid"></div>
        <div class="spacer"></div>
        <div class="actions">
          <button type="button" class="action primary" id="v37UseCommand">Use this command</button>
          <button type="button" class="action" data-jump="today">Open two-minute check-in</button>
        </div>
        <div class="spacer"></div>
        <details id="v37SmartLogPanel">
          <summary><span class="summaryStack"><b>Smart Log</b><span>Say what happened; review where it will be filed.</span></span><span class="pill blue">On device</span></summary>
          <div class="detailsBody">
            <div class="v37SmartLogGrid">
              <div>
                <label class="formLabel" for="v37SmartLogInput">Natural-language log</label>
                <textarea id="v37SmartLogInput" placeholder="Example: Slept 6.5 hours. Knee 3, ankle 5, swelling 4. Protein 185g, took creatine, did rehab and prayer, no Slither. Avoided calling about NIHSS. Todo: schedule NIHSS."></textarea>
                <div class="spacer"></div>
                <div class="actions">
                  <button type="button" class="action blue" id="v37AnalyzeLog">Review routing</button>
                  <button type="button" class="action green" id="v37ApplyLog" disabled>Apply reviewed fields</button>
                </div>
              </div>
              <div class="v37SmartPreview" id="v37SmartPreview">
                <b>Nothing changes until you review and apply.</b>
                <div class="mini">The local router never diagnoses, completes a day, or sends data to a cloud model.</div>
              </div>
            </div>
          </div>
        </details>
      </section>
    `);
  }

  function ensureWeeklyMissionPanel() {
    if ($('v38WeeklyMission')) return;
    $('v37Coach')?.insertAdjacentHTML('afterend', `
      <section class="card v38WeeklyMission" id="v38WeeklyMission" aria-labelledby="v38WeeklyMissionTitle">
        <div class="v37PanelTop">
          <div>
            <div class="eyebrow">Identity-building ritual · one per calendar week</div>
            <h2 id="v38WeeklyMissionTitle">Weekly Project 52 Mission</h2>
            <div class="mini">Calendar-aware, evidence-based, medically responsible. The mission is proof—not penance.</div>
          </div>
          <span class="pill gold" id="v38MissionStatus">Not selected</span>
        </div>
        <div class="v38MissionSafety">
          <label class="tap">
            <input type="checkbox" id="v38FastPlanDocumented"/>
            <span><b>Detailed Type 1 diabetes fasting plan documented</b><small>Clinician clearance is recorded; this separate gate confirms the insulin/CGM, hydration, ketone, rescue-carb, stop, and emergency plan is available.</small></span>
          </label>
          <label class="tap">
            <input type="checkbox" id="v38PullupReadyDocumented"/>
            <span><b>500-pull-up readiness documented</b><small>Clinician clearance is recorded; this gate confirms current wrist/shoulder/elbow status and recent pulling volume support the workload.</small></span>
          </label>
        </div>
        <div class="v38MissionOutput" id="v38MissionOutput">
          <div class="notice">No mission has been generated or scheduled. Review the readiness gates, then ask for this week’s recommendation.</div>
        </div>
        <div class="actions">
          <button type="button" class="action blue" id="v38RecommendMission">Recommend this week’s mission</button>
          <button type="button" class="action primary" id="v38ConfirmMission" disabled>Confirm + prepare reminders</button>
          <button type="button" class="action" id="v38RescheduleMission" disabled>Reschedule once</button>
        </div>
        <div class="v38MissionCompletion hidden" id="v38MissionCompletion">
          <div class="spacer"></div>
          <label class="formLabel" for="v38MissionEvidence">Required evidence</label>
          <textarea id="v38MissionEvidence" placeholder="Record the measurable proof—not just “done.”"></textarea>
          <div class="spacer"></div>
          <label class="formLabel" for="v38MissionReflection">What did completing this prove about the person I am becoming?</label>
          <textarea id="v38MissionReflection" placeholder="One honest sentence."></textarea>
          <div class="spacer"></div>
          <button type="button" class="action green" id="v38CompleteMission">Lock evidence + award Mission-Day credit</button>
        </div>
      </section>
    `);
  }

  function ensureAvoidedField() {
    if ($('avoidedToday')) return;
    const capacityHead = [...($('today')?.querySelectorAll(':scope > .sectionHead') || [])]
      .find(node => /Capacity Context/i.test(node.textContent || ''));
    const card = capacityHead?.nextElementSibling;
    card?.insertAdjacentHTML('beforeend', `
      <div class="spacer"></div>
      <label class="formLabel" for="avoidedToday">What did you avoid?</label>
      <input id="avoidedToday" maxlength="240" placeholder="One honest phrase; blank is allowed."/>
    `);
  }

  function ensurePolicyPanel() {
    if ($('v37PolicyPanel')) return;
    $('dailyReflectionPanel')?.insertAdjacentHTML('afterend', `
      <details id="v37PolicyPanel">
        <summary><span class="summaryStack"><b>Prayer + Zero-Tolerance Covenant</b><span>Firm boundary, honest recovery, no shame spiral.</span></span></summary>
        <div class="detailsBody">
          <div class="label">Prayer</div>
          <div class="v37PolicyText" id="v37PrayerText"></div>
          <div class="spacer"></div>
          <div class="label">Zero-tolerance policy</div>
          <div class="v37PolicyText" id="v37PolicyText"></div>
          <div class="spacer"></div>
          <details>
            <summary>Edit wording</summary>
            <div class="detailsBody">
              <label class="formLabel" for="v37PrayerInput">Prayer</label>
              <textarea id="v37PrayerInput"></textarea>
              <div class="spacer"></div>
              <label class="formLabel" for="v37PolicyInput">Zero-tolerance policy</label>
              <textarea id="v37PolicyInput"></textarea>
              <div class="spacer"></div>
              <button type="button" class="action green" id="v37SavePolicy">Save wording</button>
            </div>
          </details>
        </div>
      </details>
    `);
  }

  function ensureZeroToleranceStake() {
    if ($('v38ZeroToleranceStake')) return;
    const completeCard = $('completeDay')?.closest('.card');
    completeCard?.insertAdjacentHTML('beforebegin', `
      <div class="sectionHead" id="v38ZeroToleranceStake"><h2>Zero-Tolerance Stake</h2><div class="mini">one checkbox · settled only when the day is closed</div></div>
      <div class="card v38StakeCard">
        <div class="v38StakeGrid">
          <div><div class="label">Permanent rank</div><div class="smallNum" id="v38PermanentRank">—</div><div class="mini">Lifetime evidence never goes backward.</div></div>
          <div><div class="label">Momentum rank</div><div class="smallNum" id="v38MomentumRank">—</div><div class="mini" id="v38MomentumXP">—</div></div>
          <div><div class="label">Checked at close</div><div class="smallNum positive">+${ZERO_TOLERANCE_AWARD} XP</div><div class="mini">Permanent and Momentum credit.</div></div>
          <div><div class="label">Unchecked at close</div><div class="smallNum negative">−${ZERO_TOLERANCE_CONSEQUENCE} XP · −1 level</div><div class="mini">Momentum only; permanent proof remains.</div></div>
        </div>
        <div class="notice" id="v38StakeNotice">An unlogged day remains pending. The stake settles only when you explicitly save the Daily Quest.</div>
      </div>
    `);
  }

  function ensureEvidencePanel() {
    if ($('v37EvidencePanel')) return;
    const firstHead = $('mountains')?.querySelector(':scope > .sectionHead');
    firstHead?.insertAdjacentHTML('beforebegin', `
      <div class="sectionHead" id="v37EvidencePanel"><h2>Return Evidence</h2><div class="mini">full duty, hiking, strength, and sport</div></div>
      <div class="card">
        <div class="v37EvidenceGrid" id="v37EvidenceGrid"></div>
      </div>
    `);
  }

  function ensureCashPanel() {
    if ($('v37CashReservePanel')) return;
    $('cashGoalPanel')?.insertAdjacentHTML('beforebegin', `
      <div class="sectionHead" id="v37CashReservePanel"><h2>$100K Cash Staircase</h2><div class="mini">liquid cash only · separate from net worth</div></div>
      <div class="card gold">
        <div class="v37FinanceGrid">
          <div>
            <div class="label">Liquid cash</div>
            <div class="num" id="v37CashReserveCurrent">$0</div>
            <div class="mini" id="v37CashReserveRemaining">—</div>
          </div>
          <div>
            <div class="label">Ten-step staircase</div>
            <div class="cashMilestoneGrid" id="v37CashReserveSteps"></div>
          </div>
        </div>
        <div class="spacer"></div>
        <details>
          <summary>Update liquid cash</summary>
          <div class="detailsBody">
            <div class="formGrid">
              <div class="field"><label class="formLabel" for="v37CashReserveInput">Current liquid cash</label><input id="v37CashReserveInput" type="number" min="0" step="100"/></div>
              <div class="field"><label class="formLabel" for="v37CashReserveNote">Change note</label><input id="v37CashReserveNote" placeholder="Transfer, paycheck, expense, or reconciliation"/></div>
            </div>
            <div class="spacer"></div>
            <button type="button" class="action green" id="v37SaveCashReserve">Save cash snapshot</button>
          </div>
        </details>
      </div>
    `);
  }

  function ensureDataPanels() {
    if ($('v37CalendarBridge')) return;
    $('attentionAttemptPanel')?.insertAdjacentHTML('beforebegin', `
      <div class="sectionHead" id="v37CalendarBridge"><h2>Calendar + Updates</h2><div class="mini">private adapters</div></div>
      <div class="card">
        <div class="v37PanelTop">
          <div>
            <div class="label">Calendar bridge</div>
            <div class="smallNum" id="v37CalendarStatus">No events imported</div>
            <div class="mini">The PWA can import .ics files. Automatic Google Calendar sync needs OAuth/backend authorization; the native iPhone phase can use EventKit.</div>
          </div>
          <label class="action blue" for="v37CalendarFile">Import .ics</label>
          <input class="hidden" id="v37CalendarFile" type="file" accept=".ics,text/calendar"/>
        </div>
        <div class="spacer"></div>
        <div class="v37PanelTop">
          <div>
            <div class="label">Private update channel</div>
            <div class="smallNum" id="v37UpdateStatus">Installed v42</div>
            <div class="mini">Checks the deployed private build manifest and asks the service worker for a fresh version.</div>
          </div>
          <button type="button" class="action" id="v37CheckUpdate">Check for update</button>
        </div>
        <div class="spacer"></div>
        <div class="actions">
          <button type="button" class="action green" id="v37ShareBackup">Share full backup</button>
          <button type="button" class="action" id="v37RestoreRollback">Restore pre-import rollback</button>
        </div>
        <div class="mini" id="v37RollbackStatus" style="margin-top:8px"></div>
        <div class="spacer"></div>
        <details id="v41SystemCheckPanel">
          <summary><span class="summaryStack"><b>V42 System Check</b><span>Storage, photos, backup, journal, pain, training, offline shell, reset safety, and interface integrity</span></span><span class="pill blue" id="v41SystemCheckBadge">Ready</span></summary>
          <div class="detailsBody">
            <div class="notice">This is read-only except for a temporary storage probe that is immediately removed. It never uploads personal data.</div>
            <div class="spacer"></div>
            <div class="v41SystemGrid" id="v41SystemCheckResults">
              <div class="v41SystemItem"><span>—</span><div><b>Not run yet</b><small>Run after an app update or whenever something looks wrong.</small></div></div>
            </div>
            <div class="spacer"></div>
            <div class="actions">
              <button type="button" class="action green" id="v41RunSystemCheck">Run system check</button>
              <button type="button" class="action" id="v41ResetMobileLayout">Reset mobile layout</button>
            </div>
            <div class="mini" style="margin-top:8px">Reset mobile layout clears collapse/expand preferences only. It does not alter entries, photos, XP, ranks, goals, rewards, or backups.</div>
          </div>
        </details>
        <div class="spacer"></div>
        <details id="v41ArchivePanel" open>
          <summary><span class="summaryStack"><b>PREVIOUS PROJECT 52 ARCHIVE</b><span>Old proof is read-only; the live scoreboard starts clean</span></span><span class="pill green" id="v41ArchiveBadge">Preserved</span></summary>
          <div class="detailsBody">
            <div class="notice">The August reset changes the active scoreboard only. Earlier days, journal entries, Level history, streak evidence, goals, rewards, stickers, recovery, finances, mountains, calendar, career, and life evidence remain frozen inside this archive. Device-local photos remain preserved separately and are included in full backups.</div>
            <div class="spacer"></div>
            <div class="statusCountGrid" id="v41ArchiveSummary"></div>
            <div class="spacer"></div><div class="actions"><button type="button" class="action" id="v42DownloadArchive">Download read-only archive</button><button type="button" class="action blue" id="v42DownloadAutoBackup">Download automatic pre-reset backup</button></div>
          </div>
        </details>
      </div>
    `);
  }

  const AUGUST_DATES = {
    whitening: ['2026-08-03','2026-08-05','2026-08-07','2026-08-10','2026-08-12','2026-08-14','2026-08-17','2026-08-19','2026-08-21','2026-08-24','2026-08-26','2026-08-28'],
    jaw: ['2026-08-04','2026-08-06','2026-08-08','2026-08-11','2026-08-13','2026-08-15','2026-08-18','2026-08-20','2026-08-22','2026-08-25','2026-08-27','2026-08-29'],
    ankle: ['2026-08-03','2026-08-05','2026-08-07','2026-08-10','2026-08-12','2026-08-14','2026-08-17','2026-08-19','2026-08-21','2026-08-24','2026-08-26','2026-08-28','2026-08-31']
  };
  const BASELINE_VIEWS = [
    'Physique front','Physique back','Physique left side','Physique right side',
    'Face front neutral','Face front smile','Face left profile','Face right profile',
    'Face left 45°','Face right 45°','Teeth smile','Bite front','Bite left','Bite right'
  ];

  function ensureAugustFoundation(target = state) {
    target.augustFoundation = {
      title: 'LOOK MAXED — FOUNDATION PHASE',
      baseline: { label: 'July 2026 Baseline', due: '2026-07-31', views: {}, weight: '', waist: '', completeAt: null },
      cholesterol: {
        start: '2026-08-01', end: '2026-08-14',
        reviews: ['2026-08-05T16:15:00-07:00','2026-08-12T16:15:00-07:00'],
        retest: '2026-08-18T07:30:00-07:00', decision: '2026-08-20T09:45:00-07:00',
        prior: { ldlC: '', nonHdlC: '', triglycerides: '', hdlC: '' },
        current: { ldlC: '', nonHdlC: '', triglycerides: '', hdlC: '' },
        retestCompleted: false, valuesRemainElevated: 'Review needed',
        clinicianContacted: false, documentedDecision: '', decisionCompletedAt: null
      },
      calendarSource: 'Google Calendar verified 2026-07-29',
      ...target.augustFoundation
    };
    target.augustFoundation.baseline = {
      label: 'July 2026 Baseline', due: '2026-07-31', views: {}, weight: '', waist: '', completeAt: null,
      ...(target.augustFoundation.baseline || {})
    };
    target.augustFoundation.cholesterol = {
      start: '2026-08-01', end: '2026-08-14',
      reviews: ['2026-08-05T16:15:00-07:00','2026-08-12T16:15:00-07:00'],
      retest: '2026-08-18T07:30:00-07:00', decision: '2026-08-20T09:45:00-07:00',
      prior: {}, current: {}, retestCompleted: false, valuesRemainElevated: 'Review needed',
      clinicianContacted: false, documentedDecision: '', decisionCompletedAt: null,
      ...(target.augustFoundation.cholesterol || {})
    };
    target.healthBridge = {
      mode: 'Archived — feature not enabled in v42',
      lastImportAt: null,
      sourceName: '',
      daily: {},
      recordCount: 0,
      selectedMetrics: [],
      nativeSync: { status: 'Not included', lastSyncAt: null },
      featureEnabled: false,
      archivedAt: target.healthBridge?.archivedAt || new Date().toISOString(),
      privacy: 'Any previously imported records remain in backups, but Apple Health is not shown or synced in this build.',
      ...target.healthBridge,
      featureEnabled: false
    };
    target.healthBridge.daily = target.healthBridge.daily || {};
    target.healthBridge.nativeSync = {
      status: 'Not included',
      lastSyncAt: null,
      ...(target.healthBridge.nativeSync || {})
    };
    target.healthBridge.mode = 'Archived — feature not enabled in v42';
    target.healthBridge.nativeSync.status = 'Not included';
    target.dexcomMission = {
      title: 'Dexcom Pattern Analysis',
      reminderDate: '2026-08-08',
      recommendedMissionDate: '2026-08-10',
      status: 'Planned',
      exported: false,
      uploaded: false,
      patterns: '',
      fixes: '',
      clinicianQuestions: '',
      completedAt: null,
      ...target.dexcomMission
    };
  }

  function ensureAugustDay(day) {
    day.august = {
      heartHealthNutrition: false,
      whitening: false,
      jawTraining: false,
      ankleRehab: false,
      ankleRecoveryVersion: false,
      ankleMinutes: '',
      ...day.august
    };
    return day.august;
  }

  function dateInRange(date, start, end) {
    return date >= start && date <= end;
  }

  function countAugustAction(key, dates) {
    return dates.filter(date => !!state.days?.[date]?.august?.[key]).length;
  }

  function ankleWeekProgress(date = activeDate()) {
    const cursor = new Date(`${date}T12:00:00Z`);
    const day = cursor.getUTCDay();
    cursor.setUTCDate(cursor.getUTCDate() - ((day + 6) % 7));
    const start = cursor.toISOString().slice(0, 10);
    const end = addDays(start, 6);
    const scheduled = AUGUST_DATES.ankle.filter(value => value >= start && value <= end);
    return {
      done: scheduled.filter(value => !!state.days?.[value]?.august?.ankleRehab || !!state.days?.[value]?.august?.ankleRecoveryVersion).length,
      target: Math.min(3, scheduled.length || 3)
    };
  }

  function ensureAugustPanels() {
    ensureAugustFoundation(state);
    if (!$('v39AugustMission')) {
      $('v37Coach')?.insertAdjacentHTML('afterend', `
        <section class="card v39August" id="v39AugustMission" aria-labelledby="v39AugustTitle">
          <div class="v37PanelTop">
            <div><div class="eyebrow">August primary mission</div><h2 id="v39AugustTitle">LOOK MAXED — FOUNDATION PHASE</h2>
            <div class="mini">One consolidated foundation card. Appearance evidence is private and separate from the Project 52 Score.</div></div>
            <span class="pill gold">Aug 1–31</span>
          </div>
          <div class="v39ProgressGrid" id="v39AugustProgress"></div>
          <details>
            <summary><span class="summaryStack"><b>July 2026 Baseline</b><span>Standardized original physique, face/jaw, and teeth/bite evidence</span></span><span class="pill blue">Due Jul 31</span></summary>
            <div class="detailsBody">
              <div class="notice">Use consistent lighting, distance, clothing, posture, and camera height. Do not force bite alignment. Original photos remain in the existing device-local photo archive and full backups.</div>
              <div class="v39BaselineGrid" id="v39BaselineGrid"></div>
              <div class="formGrid">
                <div class="field"><label class="formLabel">Optional weight</label><input id="v39BaselineWeight" type="number" step=".1"/></div>
                <div class="field"><label class="formLabel">Optional waist</label><input id="v39BaselineWaist" type="number" step=".1"/></div>
              </div>
              <div class="spacer"></div><button type="button" class="action green" id="v39SaveBaseline">Save baseline status</button>
            </div>
          </details>
          <details>
            <summary><span class="summaryStack"><b>Cholesterol correction sprint</b><span>Aug 1–14 · sustainable heart-health nutrition with safe Type 1 diabetes management</span></span></summary>
            <div class="detailsBody">
              <div class="v39Schedule">Aug 5 4:15 PM review · Aug 12 4:15 PM review · Aug 18 7:30 AM fasting lipids · Aug 20 9:45 AM decision checkpoint</div>
              <div class="notice">Medication decisions stay clinician-guided. The app never recommends a self-directed statin start, stop, dose, or insulin change.</div>
              <div class="label">Prior panel</div><div class="v39LipidGrid" id="v39PriorLipids"></div>
              <div class="label">Aug 18 panel</div><div class="v39LipidGrid" id="v39CurrentLipids"></div>
              <div class="formGrid">
                <label class="tap"><input id="v39RetestComplete" type="checkbox"><span><b>Fasting lipid retest completed</b><small>Use your clinician’s fasting and Type 1 diabetes plan.</small></span></label>
                <div class="field"><label class="formLabel">Substantially elevated?</label><select id="v39Elevated"><option>Review needed</option><option>Yes</option><option>No</option></select></div>
              </div>
              <label class="tap"><input id="v39ClinicianContacted" type="checkbox"><span><b>Treating clinician contacted</b><small>Required before closing an elevated-results decision.</small></span></label>
              <label class="formLabel">Documented shared decision / next action</label><textarea id="v39TreatmentDecision" placeholder="Clinician contact, shared statin/lifestyle decision, and next follow-up."></textarea>
              <div class="spacer"></div><button type="button" class="action green" id="v39SaveLipids">Save results checkpoint</button>
            </div>
          </details>
        </section>
      `);
    }
    if (!$('v39ModalityWeb')) {
      $('v39AugustMission')?.insertAdjacentHTML('afterend', `
        <section class="card v39Web" id="v39ModalityWeb">
          <div class="v37PanelTop"><div><div class="eyebrow">Balanced progress</div><h2>Project 52 Modality Web</h2>
          <div class="mini">A balance view, not another score or appearance grade.</div></div>
          <select id="v39WebRange" aria-label="Radar chart period"><option value="today">Today</option><option value="week">Last 7 completed days</option><option value="july">July</option><option value="august">August</option></select></div>
          <div class="v39WebLayout"><svg id="v39Radar" viewBox="0 0 320 300" role="img" aria-label="Six-modality Project 52 radar chart"></svg><div id="v39RadarLegend"></div></div>
        </section>
      `);
    }
    const missionGrid = $('missionTaps')?.closest('.grid');
    if (!$('v39AugustDaily')) {
      missionGrid?.insertAdjacentHTML('afterend', `
        <div class="sectionHead" id="v39AugustDaily"><h2>August Supporting Habits</h2><div class="mini">calendar-aware · no duplicate missions</div></div>
        <div class="card"><div id="v39AugustDailyChecks"></div></div>
      `);
    } else if (missionGrid?.contains($('v39AugustDaily'))) {
      const dailyHead = $('v39AugustDaily');
      const dailyCard = dailyHead?.nextElementSibling;
      if (dailyHead && dailyCard) missionGrid.after(dailyHead, dailyCard);
    }
    if (!$('v40DexcomMission')) {
      $('v39AugustMission')?.insertAdjacentHTML('beforeend', `
        <details id="v40DexcomMission" class="v40DexcomMission">
          <summary><span class="summaryStack"><b>DIFFICULT LIFE MISSION — Dexcom Pattern Analysis</b><span>Reminder Aug 8 · recommended deep-work window Aug 10</span></span><span class="pill blue" id="v40DexcomStatus">Planned</span></summary>
          <div class="detailsBody">
            <div class="notice">Export and upload at least seven representative days to this chat. The result must be a tangible pattern-and-correction plan for clinician review—not an independent insulin change.</div>
            <div class="v40DexcomSteps">
              <label class="tap"><input id="v40DexcomExported" type="checkbox"><span><b>Dexcom report exported</b><small>Include enough days to capture work nights, recovery days, and off days.</small></span></label>
              <label class="tap"><input id="v40DexcomUploaded" type="checkbox"><span><b>Report uploaded in ChatGPT</b><small>Attach the Clarity PDF/CSV here and ask for pattern analysis and highest-leverage fixes.</small></span></label>
            </div>
            <label class="formLabel">Three repeatable patterns</label><textarea id="v40DexcomPatterns" placeholder="Time, context, direction, frequency, and supporting evidence."></textarea>
            <label class="formLabel">Highest-leverage fixes</label><textarea id="v40DexcomFixes" placeholder="Food timing, pre-bolus consistency, shift routines, exercise effects, alerts, or other system changes to evaluate."></textarea>
            <label class="formLabel">Clinician questions / proposed changes to review</label><textarea id="v40DexcomQuestions" placeholder="No independent basal, ratio, correction-factor, medication, or safety-threshold changes."></textarea>
            <div class="spacer"></div><button type="button" class="action green" id="v40SaveDexcomMission">Save mission evidence</button>
          </div>
        </details>
      `);
    }
    if (!$('v40InstallCard')) {
      $('v37CalendarBridge')?.parentElement?.insertAdjacentHTML('beforeend', `
        <div class="sectionHead" id="v40InstallCard"><h2>Install Project 52</h2><div class="mini">full-screen app mode</div></div>
        <div class="card v40InstallCard">
          <div><div class="smallNum" id="v40InstallStatus">Ready to install</div><div class="mini" id="v40InstallHelp">On iPhone: Safari → Share → Add to Home Screen. On desktop: use the browser’s Install button.</div></div>
          <button type="button" class="action primary" id="v40InstallApp">Install app</button>
        </div>
      `);
    }
    const select = $('photoCategory');
    BASELINE_VIEWS.forEach(label => {
      if (select && ![...select.options].some(option => option.value === label)) select.add(new Option(label, label));
    });
  }

  function quietKneeEvidence() {
    const dates = Object.keys(state.days || {})
      .filter(date => date >= state.settings.programStart && completedDay(state.days[date]))
      .sort();
    let current = 0;
    let best = 0;
    let currentStart = '';
    let bestStart = '';
    let bestEnd = '';
    let previous = '';
    dates.forEach(date => {
      const pain = Number(state.days[date]?.context?.kneePain);
      const qualifies = Number.isFinite(pain) && pain >= 0 && pain < 3;
      if (qualifies) {
        if (previous && daysBetween(previous, date) === 1 && current > 0) {
          current += 1;
        } else {
          current = 1;
          currentStart = date;
        }
        if (current > best) {
          best = current;
          bestStart = currentStart;
          bestEnd = date;
        }
      } else {
        current = 0;
        currentStart = '';
      }
      previous = date;
    });
    return {
      current,
      best,
      currentStart,
      bestStart,
      bestEnd,
      eligible: best >= 7
    };
  }

  function verifiedLsiRows() {
    return (state.returnToSportTrail?.lsiHistory || [])
      .filter(row => row.clinicianVerified)
      .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')) || String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
  }

  function bestVerifiedLsi(key, requireLanding = false) {
    return verifiedLsiRows().reduce((best, row) => {
      if (requireLanding && !row.landingQuality) return best;
      const value = Number(row[key]);
      return Number.isFinite(value) && value > Number(best?.value || -1)
        ? { value, row }
        : best;
    }, null);
  }

  function rtsEligibility(def) {
    const trail = ensureReturnToSportTrail(state);
    const row = trail.milestones[def.id];
    if (row.completedAt) return { eligible: true, complete: true, progress: 'Earned' };
    if (def.gate === 'quiet-knee') {
      const evidence = quietKneeEvidence();
      return {
        eligible: evidence.eligible,
        complete: false,
        progress: `${evidence.current}/7 current · best ${evidence.best}/7`,
        evidence
      };
    }
    if (def.gate === 'quad-lsi') {
      const best = bestVerifiedLsi('quadLsi');
      return {
        eligible: Number(best?.value || 0) >= def.threshold,
        complete: false,
        progress: best ? `${best.value.toFixed(1)}% verified · target ${def.threshold}%` : `No verified test · target ${def.threshold}%`,
        source: best?.row || null
      };
    }
    if (def.gate === 'hop-lsi') {
      const best = bestVerifiedLsi('hopLsi', true);
      return {
        eligible: Number(best?.value || 0) >= def.threshold,
        complete: false,
        progress: best ? `${best.value.toFixed(1)}% + mechanics · target ${def.threshold}%` : `No verified hop test with mechanics · target ${def.threshold}%`,
        source: best?.row || null
      };
    }
    return {
      eligible: false,
      complete: false,
      progress: row.status === 'In progress' ? 'Evidence in progress' : 'Awaiting verified evidence'
    };
  }

  function completedRtsCount() {
    const trail = ensureReturnToSportTrail(state);
    return RETURN_TO_SPORT_MILESTONES.filter(def => trail.milestones[def.id].completedAt).length;
  }

  function nextRtsMilestone() {
    const trail = ensureReturnToSportTrail(state);
    const unlocked = RETURN_TO_SPORT_MILESTONES.find(def => !trail.milestones[def.id].completedAt && rtsEligibility(def).eligible);
    return unlocked || RETURN_TO_SPORT_MILESTONES.find(def => !trail.milestones[def.id].completedAt) || null;
  }

  function ensureReturnToSportPanels() {
    ensureReturnToSportTrail(state);
    if (!$('v40RtsHome')) {
      const recoveryGrid = $('homeKneeStatus')?.closest('.grid');
      recoveryGrid?.insertAdjacentHTML('afterend', `
        <section class="card v40RtsHome" id="v40RtsHome" aria-labelledby="v40RtsHomeTitle">
          <div class="v40RtsHomeTop">
            <div>
              <div class="eyebrow">Criteria-based recovery trail</div>
              <h2 id="v40RtsHomeTitle">Return-to-Sport Milestones</h2>
              <div class="mini">Left-knee progress stays separate from right ankle/foot recovery. Final return requires both.</div>
            </div>
            <div class="v40RtsCount" id="v40RtsHomeCount">0 / 16</div>
          </div>
          <div class="progress"><div class="bar" id="v40RtsHomeBar"></div></div>
          <div class="v40RtsHomeGrid">
            <div><span>Next marker</span><b id="v40RtsHomeNext">Quiet Knee Week</b><small id="v40RtsHomeNextDetail">Seven completed days below 3/10.</small></div>
            <div><span>Quiet knee</span><b id="v40RtsHomeQuiet">0 / 7</b><small>Closed days with pain 0–2/10</small></div>
            <div><span>Verified quad LSI</span><b id="v40RtsHomeLsi">—</b><small id="v40RtsHomeLsiDetail">The saved 62.4% note remains baseline context.</small></div>
          </div>
          <div class="spacer"></div>
          <button type="button" class="action primary" data-jump="recovery" data-scroll="v40RtsTrail">Open milestone trail</button>
        </section>
      `);
    }
    if (!$('v40RtsTrail')) {
      $('kneePanel')?.insertAdjacentHTML('beforebegin', `
        <div class="sectionHead" id="v40RtsTrail"><h2>Return-to-Sport Milestone Trail</h2><div class="mini">16 evidence gates · permanent badges + XP</div></div>
        <section class="card v40RtsCommand" aria-labelledby="v40RtsTitle">
          <div class="v40RtsHero">
            <div>
              <div class="eyebrow">The route back</div>
              <h2 id="v40RtsTitle">Earn every marker. Keep every proof.</h2>
              <div class="mini">No date can complete a stage. LSI is one piece of evidence, not permission by itself.</div>
            </div>
            <div class="v40RtsHeroCount"><b id="v40RtsCount">0</b><span>/ 16 complete</span></div>
          </div>
          <div class="progress v40RtsMainProgress"><div class="bar" id="v40RtsBar"></div></div>
          <div class="notice safety">Clinician/PT verification, absolute strength, movement quality, symptoms, confidence, and current restrictions still govern progression. Symmetry can look good while both legs remain weak. Running, jumping, cutting, and sport practice stay locked until explicitly cleared.</div>
          <div class="v40RtsSnapshot" id="v40RtsSnapshot"></div>
          <div class="v40RtsTrailGrid" id="v40RtsTrailGrid"></div>
          <details class="v40RtsRecorder" id="v40LsiRecorder">
            <summary><span class="summaryStack"><b>Record LSI testing</b><span>Append the verified result; never overwrite old tests</span></span><span class="pill blue">Objective evidence</span></summary>
            <div class="detailsBody">
              <div class="formGrid">
                <div class="field"><label class="formLabel" for="v40LsiDate">Test date</label><input id="v40LsiDate" type="date"/></div>
                <div class="field"><label class="formLabel" for="v40QuadLsi">Quadriceps LSI %</label><input id="v40QuadLsi" type="number" min="0" max="150" step=".1" placeholder="e.g. 80.5"/></div>
                <div class="field"><label class="formLabel" for="v40HamstringLsi">Hamstring LSI %</label><input id="v40HamstringLsi" type="number" min="0" max="150" step=".1" placeholder="optional"/></div>
                <div class="field"><label class="formLabel" for="v40GluteLsi">Glute LSI %</label><input id="v40GluteLsi" type="number" min="0" max="150" step=".1" placeholder="optional"/></div>
                <div class="field"><label class="formLabel" for="v40HopLsi">Hop-battery LSI %</label><input id="v40HopLsi" type="number" min="0" max="150" step=".1" placeholder="only when cleared"/></div>
                <div class="field"><label class="formLabel" for="v40LsiAbsolute">Absolute strength / testing context</label><input id="v40LsiAbsolute" placeholder="Torque, device, body-weight ratio, test protocol"/></div>
              </div>
              <div class="v40RtsChecks">
                <label class="tap"><input id="v40LsiVerified" type="checkbox"><span><b>Clinician/PT verified</b><small>Only verified results can unlock LSI milestones.</small></span></label>
                <label class="tap"><input id="v40LandingQuality" type="checkbox"><span><b>Good landing mechanics documented</b><small>Required with a 90%+ hop battery.</small></span></label>
              </div>
              <label class="formLabel" for="v40LsiEvidence">Evidence note</label>
              <textarea id="v40LsiEvidence" placeholder="Who tested it, method, relevant symptoms, and what the result permits next."></textarea>
              <div class="spacer"></div><button type="button" class="action green" id="v40SaveLsi">Append LSI result</button>
              <div class="v40LsiHistory" id="v40LsiHistory"></div>
            </div>
          </details>
          <details class="v40RtsRecorder" id="v40RtsEvidenceRecorder">
            <summary><span class="summaryStack"><b>Record a stage gate</b><span>ROM, control, impact, practice, and final clearance</span></span><span class="pill gold">Verified progression</span></summary>
            <div class="detailsBody">
              <div class="formGrid">
                <div class="field"><label class="formLabel" for="v40RtsMilestoneSelect">Milestone</label><select id="v40RtsMilestoneSelect"></select></div>
                <div class="field"><label class="formLabel" for="v40RtsMilestoneStatus">Status</label><select id="v40RtsMilestoneStatus"><option>In progress</option><option>Complete</option></select></div>
                <div class="field"><label class="formLabel" for="v40RtsMilestoneDate">Evidence date</label><input id="v40RtsMilestoneDate" type="date"/></div>
                <div class="field"><label class="formLabel" for="v40RtsSport">Intended sport / activity</label><input id="v40RtsSport" placeholder="Sport or performance target"/></div>
              </div>
              <div class="v40RtsChecks">
                <label class="tap"><input id="v40RtsClinicianVerified" type="checkbox"><span><b>Clinician/PT verified</b><small>Required before a physical stage becomes complete.</small></span></label>
                <label class="tap"><input id="v40RtsAnkleCleared" type="checkbox"><span><b>Right ankle/foot cleared for intended sport</b><small>Required only for the final full-sport milestone.</small></span></label>
              </div>
              <label class="formLabel" for="v40RtsEvidence">Objective evidence and next permission</label>
              <textarea id="v40RtsEvidence" placeholder="Test/result, quality, symptoms, verifier, and exactly what is cleared next."></textarea>
              <div class="spacer"></div><button type="button" class="action green" id="v40SaveRtsEvidence">Save stage evidence</button>
            </div>
          </details>
        </section>
      `);
    }
    if (!$('v40RtsRewardsPanel')) {
      $('rewardVaultPanel')?.nextElementSibling?.insertAdjacentHTML('afterend', `
        <div class="sectionHead" id="v40RtsRewardsPanel"><h2>Recovery Milestone Rewards</h2><div class="mini">inside the Reward Center · separate from the 19 sealed rewards</div></div>
        <section class="card v40RtsRewardCenter" aria-labelledby="v40RtsRewardTitle">
          <div class="rewardVaultHeader">
            <div><div class="eyebrow">Proof creates the unlock</div><h2 id="v40RtsRewardTitle">Return-to-Sport Caches</h2>
            <div class="mini">The gate, category, rarity, and XP stay visible. The actual reward remains sealed until the evidence milestone is earned.</div></div>
            <span class="pill gold" id="v40RtsRewardCount">0 / 16 celebrated</span>
          </div>
          <div class="v40RtsRewardGrid" id="v40RtsRewardGrid"></div>
        </section>
      `);
    }
    const select = $('v40RtsMilestoneSelect');
    if (select && !select.options.length) {
      RETURN_TO_SPORT_MILESTONES
        .filter(def => def.gate === 'manual')
        .forEach(def => select.add(new Option(def.title, def.id)));
      loadRtsStageForm();
    }
  }

  function progressTile(label, value, detail = '') {
    return `<div class="v39Progress"><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b>${detail ? `<small>${escapeHtml(detail)}</small>` : ''}</div>`;
  }

  function renderAugustFoundation() {
    if (!$('v39AugustMission')) return;
    ensureAugustFoundation(state);
    const foundation = state.augustFoundation;
    const baselineDone = BASELINE_VIEWS.every(view => !!foundation.baseline.views?.[view]);
    const nutrition = countAugustAction('heartHealthNutrition', Array.from({length:14}, (_, i) => `2026-08-${pad(i + 1)}`));
    const whitening = countAugustAction('whitening', AUGUST_DATES.whitening);
    const jaw = countAugustAction('jawTraining', AUGUST_DATES.jaw);
    const ankle = ankleWeekProgress();
    $('v39AugustProgress').innerHTML = [
      progressTile('July baseline', baselineDone ? 'Complete' : 'Pending', `${Object.values(foundation.baseline.views || {}).filter(Boolean).length}/${BASELINE_VIEWS.length} views`),
      progressTile('Cholesterol sprint', `${nutrition} / 14 days`),
      progressTile('Whitening', `${whitening} / 12`),
      progressTile('Jaw training', `${jaw} / 12`),
      progressTile('Ankle rehabilitation', `${ankle.done} / ${ankle.target}`, 'current calendar week'),
      progressTile('Fasting lipids', foundation.cholesterol.retestCompleted ? 'Completed' : 'Scheduled', 'Aug 18 · 7:30 AM'),
      progressTile('Treatment decision', foundation.cholesterol.decisionCompletedAt ? 'Completed' : 'Pending', 'Aug 20 · 9:45 AM')
    ].join('');
    $('v39BaselineGrid').innerHTML = BASELINE_VIEWS.map(view => `<label class="tap"><input type="checkbox" data-v39-baseline="${escapeAttr(view)}" ${foundation.baseline.views?.[view] ? 'checked' : ''}><span><b>${escapeHtml(view)}</b><small>Original stored under “July 2026 Baseline.”</small></span></label>`).join('');
    $('v39BaselineWeight').value = foundation.baseline.weight || '';
    $('v39BaselineWaist').value = foundation.baseline.waist || '';
    const lipidFields = (prefix, object) => ['ldlC','nonHdlC','triglycerides','hdlC'].map(key => {
      const labels = { ldlC: 'LDL-C', nonHdlC: 'Non-HDL-C', triglycerides: 'Triglycerides', hdlC: 'HDL-C' };
      return `<div class="field"><label class="formLabel">${labels[key]}</label><input type="number" step=".1" data-v39-lipid="${prefix}.${key}" value="${escapeAttr(object?.[key] || '')}"></div>`;
    }).join('');
    $('v39PriorLipids').innerHTML = lipidFields('prior', foundation.cholesterol.prior);
    $('v39CurrentLipids').innerHTML = lipidFields('current', foundation.cholesterol.current);
    $('v39RetestComplete').checked = !!foundation.cholesterol.retestCompleted;
    $('v39Elevated').value = foundation.cholesterol.valuesRemainElevated || 'Review needed';
    $('v39ClinicianContacted').checked = !!foundation.cholesterol.clinicianContacted;
    $('v39TreatmentDecision').value = foundation.cholesterol.documentedDecision || '';
  }

  function scheduledAugustHabits(date) {
    const events = calendarEventsFor(date).map(event => `${event.title || event.summary || ''} ${event.description || ''}`).join(' ');
    return {
      nutrition: dateInRange(date, '2026-08-01', '2026-08-14'),
      whitening: /teeth whitening/i.test(events) || AUGUST_DATES.whitening.includes(date),
      jaw: /jaw training/i.test(events) || AUGUST_DATES.jaw.includes(date),
      ankle: /20-min ankle|ankle minimum|rehab workout/i.test(events) || AUGUST_DATES.ankle.includes(date)
    };
  }

  function renderAugustDaily() {
    if (!$('v39AugustDailyChecks')) return;
    const date = logDate();
    const schedule = scheduledAugustHabits(date);
    const day = getDay(date);
    const values = day?.august || {};
    const rows = [];
    if (schedule.nutrition) rows.push(`<label class="tap"><input data-v39-day="heartHealthNutrition" type="checkbox" ${values.heartHealthNutrition ? 'checked' : ''}><span><b>Heart-health nutrition completed</b><small>Legitimate effort: less saturated-fat-heavy food, more lean/plant protein, unsaturated fats and fiber, with safe Type 1 diabetes care. No crash dieting.</small></span></label>`);
    if (schedule.whitening) rows.push(`<label class="tap"><input data-v39-day="whitening" type="checkbox" ${values.whitening ? 'checked' : ''}><span><b>Teeth whitening session</b><small>Follow product/dentist wear time. Never double. Pause for significant sensitivity or gum irritation.</small></span></label>`);
    if (schedule.jaw) rows.push(`<label class="tap"><input data-v39-day="jawTraining" type="checkbox" ${values.jawTraining ? 'checked' : ''}><span><b>Gentle 15-minute jaw routine</b><small>Posture, symmetry and control. Stop for pain, locking, or worsening clicking; never force alignment.</small></span></label>`);
    if (schedule.ankle) rows.push(`
      <div class="v41AnkleMission">
        <div class="v41AnkleMissionTop">
          <div><b>Today’s Body Mission · right ankle</b><small>Choose the version actually completed. Either choice credits the single Body Mission—there is no duplicate rehab requirement.</small></div>
          <span class="pill blue">${values.ankleRehab || values.ankleRecoveryVersion ? 'Recorded' : 'Choose one'}</span>
        </div>
        <div class="v41AnkleChoices">
          <label class="tap"><input data-v39-day="ankleRehab" type="checkbox" ${values.ankleRehab ? 'checked' : ''}><span><b>Full 20-minute approved rehabilitation</b><small>Check pain, swelling, gait/limp, instability, sleep, energy, glucose readiness, and current restrictions first.</small></span></label>
          <label class="tap"><input data-v39-day="ankleRecoveryVersion" type="checkbox" ${values.ankleRecoveryVersion ? 'checked' : ''}><span><b>Approved Recovery version</b><small>Use when capacity is RED or symptoms exceed approved limits. It counts fully; never double a missed session.</small></span></label>
        </div>
      </div>`);
    $('v39AugustDailyChecks').innerHTML = rows.length ? rows.join('') : '<div class="notice">No August Foundation habit is scheduled for this date. The normal Project 52 command remains active.</div>';
  }

  function renderMissionCompletionV41() {
    const mount = $('missionTaps');
    if (!mount) return;
    const day = getDay(logDate());
    if (!day) return;
    const actions = day.actions || {};
    const missions = day.missions || {};
    const optional = actions.powerAssigned
      ? tapHtml('power', 'Optional Power Move', missions.power || 'One additional high-value action.', actions.power)
      : `<div class="v41NotAssigned" role="status"><span class="v41MissionMark">—</span><span><b>Optional Power Move</b><small>${day.dayType === 'Post-Shift Recovery' ? 'Not assigned. Recovery is the assignment.' : 'Not assigned at this capacity. It is not required for a completed day.'}</small></span></div>`;
    mount.innerHTML = [
      tapHtml('critical', 'Critical Mission', missions.critical, actions.critical),
      tapHtml('body', 'Body Mission', missions.body, actions.body),
      tapHtml('life', 'Life Mission', missions.life, actions.life),
      optional
    ].join('');
    mount.querySelectorAll('[data-action]').forEach(input => input.addEventListener('change', () => {
      const current = ensureDay(logDate());
      current.actions[input.dataset.action] = input.checked;
      save();
      renderToday();
      renderHome();
    }));
  }

  function radarValues(range) {
    const dates = range === 'today' ? [activeDate()] : range === 'week'
      ? historyDates().filter(date => completedDay(state.days[date])).slice(0, 7)
      : historyDates().filter(date => date.startsWith(range === 'july' ? '2026-07' : '2026-08'));
    const rows = dates.map(date => state.days?.[date]).filter(Boolean);
    const average = fn => rows.length ? Math.round(rows.reduce((sum, row) => sum + fn(row), 0) / rows.length) : 0;
    return [
      ['Body / Rehab', average(day => Math.round(categoryScores(day).body * 100))],
      ['Career / RN', average(day => Math.round(categoryScores(day).career * 100))],
      ['Money / Discipline', average(day => day.fullChecklist?.moneyDiscipline || day.fullChecklist?.financial ? 100 : Math.round(categoryScores(day).admin * 65))],
      ['Attention Control', average(day => Math.round(categoryScores(day).attention * 100))],
      ['Life Admin', average(day => Math.round(categoryScores(day).admin * 100))],
      ['Connection / Outdoors', average(day => Math.round(categoryScores(day).connection * 100))]
    ];
  }

  function radarPoint(index, value, radius = 112) {
    const angle = (-90 + index * 60) * Math.PI / 180;
    const r = radius * value / 100;
    return [160 + Math.cos(angle) * r, 145 + Math.sin(angle) * r];
  }

  function renderRadar() {
    if (!$('v39Radar')) return;
    const values = radarValues($('v39WebRange')?.value || 'today');
    const rings = [25, 50, 75, 100].map(level => `<polygon points="${values.map((_, i) => radarPoint(i, level).join(',')).join(' ')}" class="v39RadarRing"/>`).join('');
    const axes = values.map((_, i) => {
      const [x, y] = radarPoint(i, 100);
      return `<line x1="160" y1="145" x2="${x}" y2="${y}" class="v39RadarAxis"/>`;
    }).join('');
    const shape = `<polygon points="${values.map(([, value], i) => radarPoint(i, value).join(',')).join(' ')}" class="v39RadarShape"/>`;
    const labels = values.map(([label], i) => {
      const [x, y] = radarPoint(i, 124);
      return `<text x="${x}" y="${y}" text-anchor="middle" class="v39RadarLabel">${escapeHtml(label.replace(' / ', '/'))}</text>`;
    }).join('');
    $('v39Radar').innerHTML = `${rings}${axes}${shape}${labels}`;
    $('v39RadarLegend').innerHTML = values.map(([label, value]) => `<div class="v39RadarMetric"><span>${escapeHtml(label)}</span><b>${value}</b></div>`).join('');
  }

  function rtsMilestoneCard(def) {
    const row = state.returnToSportTrail.milestones[def.id];
    const gate = rtsEligibility(def);
    const status = row.completedAt ? 'complete' : gate.eligible ? 'ready' : row.status === 'In progress' ? 'active' : 'locked';
    const reward = row.completedAt
      ? `<div class="v40RtsReward revealed"><span>Reward unlocked</span><b>${escapeHtml(row.reward || def.reward)}</b></div>`
      : `<div class="v40RtsReward"><span>${escapeHtml(def.rarity)} Recovery Cache</span><b>Sealed until earned</b></div>`;
    const action = row.completedAt
      ? row.rewardClaimedAt
        ? `<span class="pill green">Celebrated</span>`
        : '<button type="button" class="action small" data-jump="goals" data-scroll="v40RtsRewardsPanel">Open Reward Center</button>'
      : gate.eligible && def.gate !== 'manual'
        ? `<button type="button" class="action green small" data-v40-rts-claim="${def.id}">Verify milestone · +${def.xp} XP</button>`
        : `<span class="pill ${row.status === 'In progress' ? 'blue' : ''}">${row.status === 'In progress' ? 'In progress' : 'Locked'}</span>`;
    return `
      <article class="v40RtsMilestone ${status}">
        <div class="v40RtsMilestoneTop">
          <span class="v40RtsBadge" style="--rts-color:${escapeAttr(def.color)}">${escapeHtml(def.icon)}</span>
          <div><span>${escapeHtml(def.phase)}</span><h3>${escapeHtml(def.title)}</h3></div>
          <b>+${def.xp} XP</b>
        </div>
        <p>${escapeHtml(def.criteria)}</p>
        <div class="v40RtsGate">${escapeHtml(gate.progress)}</div>
        ${reward}
        <div class="v40RtsAction">${action}</div>
      </article>
    `;
  }

  function renderReturnToSport() {
    if (!$('v40RtsTrailGrid')) return;
    const trail = ensureReturnToSportTrail(state);
    const complete = completedRtsCount();
    const total = RETURN_TO_SPORT_MILESTONES.length;
    const quiet = quietKneeEvidence();
    const quad = bestVerifiedLsi('quadLsi');
    const hop = bestVerifiedLsi('hopLsi', true);
    const next = nextRtsMilestone();
    const earnedXp = trail.rewardLedger
      .filter(item => item.type === 'return-to-sport-milestone')
      .reduce((sum, item) => sum + Number(item.permanentXP || 0), 0);
    $('v40RtsCount').textContent = complete;
    $('v40RtsBar').style.width = `${Math.round(complete / total * 100)}%`;
    $('v40RtsHomeCount').textContent = `${complete} / ${total}`;
    $('v40RtsHomeBar').style.width = `${Math.round(complete / total * 100)}%`;
    $('v40RtsHomeNext').textContent = next?.title || 'Trail complete';
    $('v40RtsHomeNextDetail').textContent = next?.criteria || 'Every evidence gate is complete.';
    $('v40RtsHomeQuiet').textContent = `${quiet.current} / 7`;
    $('v40RtsHomeLsi').textContent = quad ? `${quad.value.toFixed(1)}%` : '—';
    $('v40RtsHomeLsiDetail').textContent = quad
      ? `Best verified test · ${fmtDate(quad.row.date)}`
      : 'The saved February 62.4% note remains baseline context until retested.';
    $('v40RtsSnapshot').innerHTML = [
      progressTile('Quiet-knee evidence', `${quiet.current} / 7`, `best ${quiet.best}/7 · unlogged days remain pending`),
      progressTile('Verified quad LSI', quad ? `${quad.value.toFixed(1)}%` : 'Pending', quad ? fmtDate(quad.row.date) : '62.4% remains a historical note, not a current unlock'),
      progressTile('Verified hop battery', hop ? `${hop.value.toFixed(1)}%` : 'Pending', hop ? 'good mechanics documented' : 'only after impact testing is cleared'),
      progressTile('Milestone XP', `${earnedXp.toLocaleString()} XP`, 'permanent · never deducted')
    ].join('');
    let phase = '';
    $('v40RtsTrailGrid').innerHTML = RETURN_TO_SPORT_MILESTONES.map(def => {
      const heading = phase === def.phase ? '' : `<div class="v40RtsPhase"><span>${escapeHtml(def.phase)}</span></div>`;
      phase = def.phase;
      return `${heading}${rtsMilestoneCard(def)}`;
    }).join('');
    if ($('v40RtsRewardGrid')) {
      const celebrated = RETURN_TO_SPORT_MILESTONES.filter(def => trail.milestones[def.id].rewardClaimedAt).length;
      $('v40RtsRewardCount').textContent = `${celebrated} / ${total} celebrated`;
      $('v40RtsRewardGrid').innerHTML = RETURN_TO_SPORT_MILESTONES.map(def => {
        const row = trail.milestones[def.id];
        const gate = rtsEligibility(def);
        const unlocked = !!row.completedAt;
        const claimed = !!row.rewardClaimedAt;
        return `
          <article class="v40RtsRewardItem ${unlocked ? 'unlocked' : ''} ${claimed ? 'claimed' : ''}">
            <div class="v40RtsRewardIndex">${escapeHtml(def.icon)}</div>
            <div class="v40RtsRewardBody">
              <div><span class="pill ${unlocked ? 'green' : ''}">${escapeHtml(def.rarity)}</span><small>${escapeHtml(def.phase)} · +${def.xp} XP</small></div>
              <b>${unlocked ? escapeHtml(row.reward || def.reward) : 'Classified recovery reward'}</b>
              <span>${escapeHtml(def.title)} · ${escapeHtml(gate.progress)}</span>
              ${unlocked ? `<input data-v40-rts-reward-text="${def.id}" value="${escapeAttr(row.reward || def.reward)}" aria-label="${escapeAttr(`${def.title} reward`)}">` : ''}
            </div>
            <div class="v40RtsRewardActions">
              ${unlocked && !claimed ? `<button type="button" class="action small" data-v40-rts-reward-save="${def.id}">Save choice</button><button type="button" class="action green small" data-v40-rts-reward="${def.id}">Mark celebrated</button>` : `<span class="rewardState">${claimed ? 'Celebrated' : unlocked ? 'Unlocked' : 'Locked'}</span>`}
            </div>
          </article>
        `;
      }).join('');
    }
    $('v40LsiHistory').innerHTML = trail.lsiHistory.length
      ? `<div class="label">LSI history</div>${[...trail.lsiHistory].reverse().map(row => `
          <div class="v40LsiRow">
            <div><b>${escapeHtml(fmtDate(row.date))}</b><span class="pill ${row.clinicianVerified ? 'green' : ''}">${row.clinicianVerified ? 'Verified' : 'Unverified'}</span></div>
            <span>Quad ${row.quadLsi ?? '—'}% · Hamstring ${row.hamstringLsi ?? '—'}% · Glute ${row.gluteLsi ?? '—'}% · Hop ${row.hopLsi ?? '—'}%</span>
            <small>${escapeHtml(row.absoluteContext || row.evidence || 'No context note')}</small>
          </div>
        `).join('')}`
      : '<div class="notice">No LSI tests are stored yet. The February 2026 62.4% quad-symmetry note remains preserved in the original knee record.</div>';
    $('v40RtsSport').value = trail.currentSport || '';
  }

  function completeRtsMilestone(def, evidence, date) {
    const trail = ensureReturnToSportTrail(state);
    const row = trail.milestones[def.id];
    if (row.completedAt) return false;
    const gate = rtsEligibility(def);
    if (def.gate !== 'manual' && !gate.eligible) {
      toast('That milestone still needs its full verified evidence');
      return false;
    }
    if (def.gate === 'manual' && (!row.clinicianVerified || !row.date || String(row.evidence || '').trim().length < 12)) {
      row.status = 'In progress';
      toast('Add the evidence date, clinician/PT verification, and an objective note before completing this stage');
      save();
      renderReturnToSport();
      return false;
    }
    if (def.id === 'fullSport') {
      const missing = RETURN_TO_SPORT_MILESTONES
        .filter(item => item.id !== 'fullSport' && !trail.milestones[item.id].completedAt)
        .map(item => item.title);
      if (missing.length || !row.rightAnkleCleared) {
        row.status = 'In progress';
        save();
        renderReturnToSport();
        toast(missing.length ? 'Complete every earlier return-to-sport marker first' : 'Document right ankle/foot clearance for the intended sport');
        return false;
      }
    }
    row.status = 'Complete';
    row.date = row.date || date || activeDate();
    row.evidence = row.evidence || evidence || '';
    row.completedAt = new Date().toISOString();
    row.reward = row.reward || def.reward;
    if (!trail.rewardLedger.some(item => item.milestoneId === def.id)) {
      trail.rewardLedger.push({
        id: `rts-milestone-${def.id}`,
        type: 'return-to-sport-milestone',
        milestoneId: def.id,
        title: def.title,
        date: row.date,
        permanentXP: def.xp,
        awardedAt: row.completedAt
      });
    }
    if (def.id === 'fullSport') {
      const legacy = state.evidenceMilestones.returnSport;
      Object.assign(legacy, {
        status: 'Complete',
        date: row.date,
        evidence: row.evidence,
        clearance: true
      });
    }
    trail.lastUpdatedAt = row.completedAt;
    updateLevelProgress();
    save();
    syncV29Patches();
    renderV29Patches();
    renderReturnToSport();
    renderZeroToleranceStake();
    toast(`${def.title} earned · +${def.xp} permanent XP`);
    return true;
  }

  function claimRtsMilestone(id) {
    const def = RETURN_TO_SPORT_MILESTONES.find(item => item.id === id);
    if (!def || def.gate === 'manual') return;
    const gate = rtsEligibility(def);
    const row = state.returnToSportTrail.milestones[id];
    if (def.gate === 'quiet-knee') {
      row.evidence = `Seven consecutive closed days with left-knee pain 0–2/10, ending ${gate.evidence.bestEnd}.`;
      row.date = gate.evidence.bestEnd;
    } else if (gate.source) {
      row.evidence = `${def.title} supported by the verified ${gate.source.date} test. ${gate.source.evidence || gate.source.absoluteContext || ''}`.trim();
      row.date = gate.source.date;
      row.clinicianVerified = true;
    }
    completeRtsMilestone(def, row.evidence, row.date);
  }

  function claimRtsReward(id) {
    const row = state.returnToSportTrail?.milestones?.[id];
    if (!row?.completedAt || row.rewardClaimedAt) return;
    const input = document.querySelector(`[data-v40-rts-reward-text="${id}"]`);
    if (input?.value.trim()) row.reward = input.value.trim();
    row.rewardClaimedAt = new Date().toISOString();
    save();
    renderReturnToSport();
    toast('Milestone reward marked celebrated');
  }

  function saveRtsRewardChoice(id) {
    const row = state.returnToSportTrail?.milestones?.[id];
    const input = document.querySelector(`[data-v40-rts-reward-text="${id}"]`);
    if (!row?.completedAt || !input) return;
    row.reward = input.value.trim() || row.reward;
    save();
    renderReturnToSport();
    toast('Recovery milestone reward updated');
  }

  function numericInput(id) {
    const value = $(id)?.value;
    return value === '' || value == null ? null : Number(value);
  }

  function saveLsiResult() {
    const values = {
      quadLsi: numericInput('v40QuadLsi'),
      hamstringLsi: numericInput('v40HamstringLsi'),
      gluteLsi: numericInput('v40GluteLsi'),
      hopLsi: numericInput('v40HopLsi')
    };
    const entered = Object.values(values).filter(value => value !== null);
    if (!$('v40LsiDate').value || !entered.length) return toast('Add a test date and at least one LSI result');
    if (entered.some(value => !Number.isFinite(value) || value < 0 || value > 150)) return toast('LSI values must be between 0% and 150%');
    const verified = $('v40LsiVerified').checked;
    const evidence = $('v40LsiEvidence').value.trim();
    if (verified && evidence.length < 8) return toast('Add who verified the test and enough context to identify the evidence');
    const row = {
      id: `lsi-${Date.now()}`,
      date: $('v40LsiDate').value,
      ...values,
      absoluteContext: $('v40LsiAbsolute').value.trim(),
      evidence,
      clinicianVerified: verified,
      landingQuality: $('v40LandingQuality').checked,
      createdAt: new Date().toISOString()
    };
    state.returnToSportTrail.lsiHistory.push(row);
    if (values.quadLsi !== null) state.recovery.knee.quadSymmetry = values.quadLsi;
    state.returnToSportTrail.lastUpdatedAt = row.createdAt;
    ['v40QuadLsi','v40HamstringLsi','v40GluteLsi','v40HopLsi','v40LsiAbsolute','v40LsiEvidence'].forEach(id => { $(id).value = ''; });
    $('v40LsiVerified').checked = false;
    $('v40LandingQuality').checked = false;
    save();
    renderRecovery();
    renderReturnToSport();
    toast(verified ? 'Verified LSI result appended; eligible milestones are ready to claim' : 'LSI result saved as unverified history');
  }

  function loadRtsStageForm() {
    const id = $('v40RtsMilestoneSelect')?.value;
    const row = state.returnToSportTrail?.milestones?.[id];
    if (!row) return;
    $('v40RtsMilestoneStatus').value = row.status === 'Complete' ? 'Complete' : 'In progress';
    $('v40RtsMilestoneDate').value = row.date || '';
    $('v40RtsClinicianVerified').checked = !!row.clinicianVerified;
    $('v40RtsAnkleCleared').checked = !!row.rightAnkleCleared;
    $('v40RtsEvidence').value = row.evidence || '';
  }

  function saveRtsStageEvidence() {
    const id = $('v40RtsMilestoneSelect').value;
    const def = RETURN_TO_SPORT_MILESTONES.find(item => item.id === id && item.gate === 'manual');
    if (!def) return;
    const row = state.returnToSportTrail.milestones[id];
    row.status = $('v40RtsMilestoneStatus').value;
    row.date = $('v40RtsMilestoneDate').value;
    row.evidence = $('v40RtsEvidence').value.trim();
    row.clinicianVerified = $('v40RtsClinicianVerified').checked;
    row.rightAnkleCleared = $('v40RtsAnkleCleared').checked;
    state.returnToSportTrail.currentSport = $('v40RtsSport').value.trim();
    state.returnToSportTrail.lastUpdatedAt = new Date().toISOString();
    if (row.status === 'Complete') return completeRtsMilestone(def, row.evidence, row.date);
    save();
    renderReturnToSport();
    toast('Return-to-sport stage evidence saved in progress');
  }

  function renderDexcomMission() {
    if (!$('v40DexcomMission')) return;
    const mission = state.dexcomMission;
    $('v40DexcomStatus').textContent = mission.completedAt ? 'Completed' : mission.status || 'Planned';
    $('v40DexcomStatus').className = `pill ${mission.completedAt ? 'green' : 'blue'}`;
    $('v40DexcomExported').checked = !!mission.exported;
    $('v40DexcomUploaded').checked = !!mission.uploaded;
    $('v40DexcomPatterns').value = mission.patterns || '';
    $('v40DexcomFixes').value = mission.fixes || '';
    $('v40DexcomQuestions').value = mission.clinicianQuestions || '';
  }

  function saveDexcomMission() {
    const mission = state.dexcomMission;
    mission.exported = $('v40DexcomExported').checked;
    mission.uploaded = $('v40DexcomUploaded').checked;
    mission.patterns = $('v40DexcomPatterns').value.trim();
    mission.fixes = $('v40DexcomFixes').value.trim();
    mission.clinicianQuestions = $('v40DexcomQuestions').value.trim();
    const complete = mission.exported && mission.uploaded
      && mission.patterns.length >= 20 && mission.fixes.length >= 20
      && mission.clinicianQuestions.length >= 8;
    mission.status = complete ? 'Completed' : 'In progress';
    mission.completedAt = complete ? (mission.completedAt || new Date().toISOString()) : null;
    save();
    renderDexcomMission();
    toast(complete ? 'Dexcom Life Mission evidence complete' : 'Dexcom mission progress saved');
  }

  const savePhotoV39 = savePhoto;
  savePhoto = async function () {
    const date = $('photoDate')?.value || activeDate();
    const category = $('photoCategory')?.value || '';
    const isBaselineView = date >= '2026-07-01' && date <= '2026-07-31' && BASELINE_VIEWS.includes(category);
    if (isBaselineView && $('photoCaption') && !$('photoCaption').value.trim()) {
      $('photoCaption').value = `July 2026 Baseline · ${category}`;
    }
    await savePhotoV39();
    if (!isBaselineView) return;
    ensureAugustFoundation(state);
    state.augustFoundation.baseline.views[category] = true;
    state.augustFoundation.baseline.completeAt = BASELINE_VIEWS.every(view => state.augustFoundation.baseline.views[view])
      ? (state.augustFoundation.baseline.completeAt || new Date().toISOString())
      : null;
    save();
    renderAugustFoundation();
  };

  function ensurePanels() {
    ensureCoachPanel();
    ensureWeeklyMissionPanel();
    ensureAvoidedField();
    ensurePolicyPanel();
    ensureZeroToleranceStake();
    ensureEvidencePanel();
    ensureCashPanel();
    ensureDataPanels();
    ensureAugustPanels();
    ensureReturnToSportPanels();
    hideDuplicateSurfaces();
    restoreFamiliarHomeOrder();
  }

  function missionOutputRow(label, value) {
    return `<div class="v38MissionRow"><b>${escapeHtml(label)}</b><span>${escapeHtml(value || '—')}</span></div>`;
  }

  function renderWeeklyMission() {
    if (!$('v38WeeklyMission')) return;
    ensureWeeklyMissions(state);
    $('v38FastPlanDocumented').checked = !!state.weeklyMissions.medical.fastingPlanDocumented;
    $('v38PullupReadyDocumented').checked = !!state.weeklyMissions.medical.pullupReadinessDocumented;
    const mission = state.weeklyMissions.current;
    if (!mission) {
      $('v38MissionStatus').textContent = 'Not selected';
      $('v38MissionStatus').className = 'pill gold';
      $('v38MissionOutput').innerHTML = '<div class="notice">No mission has been generated or scheduled. Review the readiness gates, then ask for this week’s recommendation.</div>';
      $('v38ConfirmMission').disabled = true;
      $('v38RescheduleMission').disabled = true;
      $('v38MissionCompletion').classList.add('hidden');
      return;
    }
    $('v38MissionStatus').textContent = mission.status;
    $('v38MissionStatus').className = `pill ${mission.status === 'Completed' ? 'green' : mission.status === 'Confirmed' ? 'blue' : 'gold'}`;
    $('v38MissionOutput').innerHTML = [
      missionOutputRow('WEEKLY PROJECT 52 MISSION', mission.mission),
      missionOutputRow('Category:', mission.category === 'physical' ? 'Physical' : 'Mental'),
      missionOutputRow('Mission:', mission.mission),
      missionOutputRow('Recommended date and time:', `${fmtDate(mission.date, { weekday: 'long', month: 'long', day: 'numeric' })} at ${formatMissionTime(mission.time)}`),
      missionOutputRow('Why this is the best schedule window:', mission.why),
      missionOutputRow('Project 52 goal advanced:', mission.goal),
      missionOutputRow('Exact completion standard:', mission.completion),
      missionOutputRow('Preparation required:', mission.preparation),
      missionOutputRow('Safety and modification rules:', mission.safety),
      missionOutputRow('Required evidence:', mission.evidence),
      missionOutputRow('Recovery afterward:', mission.recovery),
      missionOutputRow('Calendar reminders to create:', mission.reminders.join(' · '))
    ].join('');
    $('v38ConfirmMission').disabled = mission.status !== 'Recommended';
    $('v38RescheduleMission').disabled = mission.status !== 'Confirmed' || mission.reschedules >= 1;
    $('v38MissionCompletion').classList.toggle('hidden', mission.status !== 'Confirmed');
    if (mission.status === 'Completed') {
      $('v38MissionOutput').insertAdjacentHTML('beforeend', `
        <div class="v38MissionProof">
          <b>Permanent Mission-Day credit: +${Number(mission.permanentXP || MISSION_DAY_CREDIT)} XP</b>
          <span>${escapeHtml(mission.evidenceRecorded || '')}</span>
          <i>“${escapeHtml(mission.identityReflection || '')}”</i>
        </div>
      `);
    }
  }

  function renderCoach() {
    if (!$('v37Coach')) return;
    const command = commandFor();
    $('v37Capacity').textContent = command.capacity.level;
    $('v37Capacity').className = `v37Capacity ${command.capacity.className}`;
    $('v37CoachReason').textContent = command.capacity.reason;
    $$('[data-v37-mode]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.v37Mode === command.mode));
    });
    const source = state.calendar?.lastSyncAt
      ? `${state.calendar.source || 'Calendar'} · synced ${new Date(state.calendar.lastSyncAt).toLocaleString()}`
      : 'Local agenda · no automatic sync configured';
    $('v37CalendarSource').textContent = command.calendarDate === command.date
      ? `${source} · ${fmtDate(command.calendarDate, { month: 'short', day: 'numeric' })}`
      : `${source} · ${fmtDate(command.calendarDate, { month: 'short', day: 'numeric' })} agenda / ${fmtDate(command.date, { month: 'short', day: 'numeric' })} active log`;
    $('v37Agenda').innerHTML = agendaHtml(command.events);
    const missions = [
      coachMission('Critical Mission', command.critical),
      coachMission('Body Mission', command.body),
      coachMission('Life Mission', command.life)
    ];
    if (command.optional) missions.push(coachMission('Optional Power Move', command.optional));
    missions.push(coachMission('Dopamine Replacement', command.dopamine));
    missions.push(coachMission('Completed-Day Definition', command.definition, 'definition'));
    $('v37MissionGrid').innerHTML = missions.join('');
  }

  function renderPolicy() {
    if (!$('v37PolicyPanel')) return;
    $('v37PrayerText').textContent = state.policy.prayer;
    $('v37PolicyText').textContent = state.policy.zeroTolerance;
    $('v37PrayerInput').value = state.policy.prayer;
    $('v37PolicyInput').value = state.policy.zeroTolerance;
  }

  function renderZeroToleranceStake() {
    if (!$('v38ZeroToleranceStake')) return;
    ensureMomentum(state);
    $('v38PermanentRank').textContent = `Level ${state.levelSystem.highestEarned}`;
    $('v38MomentumRank').textContent = `Level ${state.momentum.activeLevel}`;
    $('v38MomentumXP').textContent = `${Math.max(0, Number(state.momentum.currentXP || 0))} active Momentum XP`;
    const checkbox = document.querySelector('[data-action="noSlither"]');
    const tap = checkbox?.closest('.tap');
    const title = tap?.querySelector('b');
    const detail = tap?.querySelector('small');
    if (title) title.textContent = 'Zero-Tolerance Standard Kept';
    if (detail) detail.textContent = `Checked when closing: +${ZERO_TOLERANCE_AWARD} XP. Unchecked when closing: −${ZERO_TOLERANCE_CONSEQUENCE} Momentum XP and one Momentum level.`;
    const day = getDay(logDate());
    const settlement = day?.zeroToleranceSettlement;
    $('v38StakeNotice').textContent = settlement
      ? `${fmtDate(logDate())} settled: ${Number(settlement.dailyXP || 0)} day XP ${settlement.outcome === 'kept' ? `+ ${ZERO_TOLERANCE_AWARD} standard XP` : `− ${ZERO_TOLERANCE_CONSEQUENCE} standard XP`} = ${Number(settlement.xpDelta) >= 0 ? '+' : ''}${settlement.xpDelta} active XP · Level ${settlement.afterLevel}. Re-saving will not apply it twice.`
      : day?.completeDayAt
        ? 'This day was closed before the v38 stake existed. No consequence or bonus is applied retroactively.'
        : 'An unlogged day remains pending. The stake settles only when you explicitly save the Daily Quest.';
  }

  function renderEvidenceMilestones() {
    if (!$('v37EvidenceGrid')) return;
    $('v37EvidenceGrid').innerHTML = Object.entries(EVIDENCE_MILESTONES).map(([key, def]) => {
      const row = state.evidenceMilestones[key];
      return `
        <div class="v37EvidenceItem">
          <b>${escapeHtml(def.title)}</b>
          <small>${escapeHtml(def.detail)}</small>
          <div class="spacer"></div>
          <div class="formGrid">
            <select data-v37-evidence-status="${key}">
              ${['Not started', 'In progress', 'Complete'].map(status => `<option ${row.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
            <input data-v37-evidence-date="${key}" type="date" value="${escapeAttr(row.date || '')}"/>
          </div>
          <div class="spacer"></div>
          <textarea data-v37-evidence-note="${key}" placeholder="Objective evidence and next step">${escapeHtml(row.evidence || '')}</textarea>
          ${def.requiresClearance ? `<label class="tap"><input data-v37-evidence-clearance="${key}" type="checkbox" ${row.clearance ? 'checked' : ''}><span><b>Clinician clearance documented</b><small>Elapsed time never grants clearance.</small></span></label>` : ''}
          <div class="spacer"></div>
          <button type="button" class="action green" data-v37-evidence-save="${key}">Save milestone</button>
        </div>
      `;
    }).join('');
  }

  function renderCashReserve() {
    if (!$('v37CashReservePanel')) return;
    ensureCashViews(state);
    const cash = state.goals.cashReserve;
    const current = Number(cash.current || 0);
    $('v37CashReserveCurrent').textContent = money(current);
    $('v37CashReserveRemaining').textContent = `${money(Math.max(0, Number(cash.target || 100000) - current))} to the $100K liquid-cash target. Net worth is tracked separately below.`;
    $('v37CashReserveInput').value = cash.current === '' ? '' : current;
    $('v37CashReserveSteps').innerHTML = Array.from({ length: 10 }, (_, index) => {
      const target = (index + 1) * 10000;
      return `<div class="cashMilestone ${current >= target ? 'reached' : ''}"><b>${index + 1}</b><span>${money(target)}</span></div>`;
    }).join('');
  }

  function renderRewardReset() {
    const rows = $$('.rewardWeek');
    state.rewards?.forEach((reward, index) => {
      if (!reward.qualificationResetAt || !rows[index]) return;
      const top = rows[index].querySelector('.rewardWeekTop .pill');
      if (top) top.textContent = `Week ${index + 1} · Reset`;
      if (!rows[index].querySelector('.v37Warning')) {
        rows[index].insertAdjacentHTML('beforeend', `<div class="v37Warning"><b>Qualification reset after the ${fmtDate(reward.qualificationResetAt)} lapse.</b><div class="mini">The prior unlock record remains in history; XP, levels, and project evidence were not removed.</div></div>`);
      }
    });
    $$('.rewardVaultItem').forEach(item => {
      const index = item.querySelector('.rewardVaultIndex')?.textContent?.trim();
      if (!['W1', 'W2'].includes(index)) return;
      const status = item.querySelector('.rewardState');
      if (status) status.textContent = 'Reset';
      item.classList.remove('revealed', 'claimed');
    });
  }

  function renderDataStatus() {
    if (!$('v37CalendarStatus')) return;
    const count = state.calendar?.events?.length || 0;
    $('v37CalendarStatus').textContent = `${count} stored event${count === 1 ? '' : 's'} · ${calendarEventsFor(agendaDateFor()).length} today`;
    const hasRollback = !!safeGet(PRE_IMPORT_STATE_KEY);
    $('v37RestoreRollback').disabled = !hasRollback;
    $('v37RollbackStatus').textContent = hasRollback
      ? 'A pre-import state and photo rollback point is available.'
      : 'No pre-import rollback point is currently stored.';
    renderAugustArchive();
  }

  function renderAugustArchive() {
    if (!$('v41ArchiveSummary')) return;
    const archive = (state.phaseArchives || []).find(item => item.id === AUGUST_PHASE_RESET_ID);
    const summary = archive?.summary || {};
    const activeDays = Object.keys(state.days || {}).filter(date => date >= AUGUST_PHASE_START).length;
    const archivedRecords = Number(summary.dailyRecords || 0);
    const peak = Number(summary.historicalPeakLevel || state.activePhase?.archivedPeakLevel || 1);
    const best = Number(summary.historicalBestAttentionStreak || state.activePhase?.archivedBestAttentionStreak || 0);
    const stickers = Number(summary.stickerUnlocks || state.activePhase?.archivedStickerUnlocks || 0);
    const tile = (label, value, detail) => `<div class="metric"><div class="label">${escapeHtml(label)}</div><div class="smallNum">${escapeHtml(value)}</div><div class="mini">${escapeHtml(detail)}</div></div>`;
    $('v41ArchiveSummary').innerHTML = [
      tile('Archived daily records', String(archivedRecords), `${Number(summary.completedDailyRecords || 0)} completed records preserved`),
      tile('Historical peak', `Level ${peak}`, 'Live level starts at 0'),
      tile('Historical attention best', `${best} days`, 'Live streak and best start at 0'),
      tile('Archived stickers', String(stickers), 'Live sticker board starts locked'),
      tile('Live rebuild records', String(activeDays), `${AUGUST_PHASE_START} through ${AUGUST_PHASE_END}`),
      tile('Project window', '153 days', 'August 1–December 31, 2026')
    ].join('');
    $('v41ArchiveBadge').textContent = archive ? 'Preserved' : 'Archive pending';
    $('v41ArchiveBadge').className = `pill ${archive ? 'green' : 'gold'}`;
  }

  function renderWallBuild() {
    const course = $('v40StoneCourse');
    if (!course || typeof noSlitherStats !== 'function') return;
    const stats = noSlitherStats();
    const current = Math.max(0, Number(stats.current || 0));
    const best = Math.max(current, Number(stats.best || 0));
    const laid = Math.min(52, current);
    const earned = best >= 52 || !!state.gamification?.patchUnlocks?.zeroTolerance52;
    course.innerHTML = Array.from({ length: 52 }, (_, index) =>
      `<i class="${index < laid ? 'laid' : ''}" aria-hidden="true"></i>`
    ).join('');
    course.setAttribute('aria-valuenow', String(laid));
    course.setAttribute('aria-valuetext', `${current}-day current Zero-Tolerance streak; ${best}-day best; 52-day badge ${earned ? 'earned permanently' : 'not yet earned'}.`);
    course.classList.toggle('complete', current >= 52);
    course.classList.toggle('historic', earned && current < 52);
    $('v40WallCount').textContent = `${Math.min(current, 52)} / 52`;
    $('v40WallMeta').textContent = `Current ${current} · best ${best}`;
    $('v40WallBadge').textContent = earned
      ? '52-Day Wall earned permanently'
      : `${52 - Math.min(best, 52)} stone${52 - Math.min(best, 52) === 1 ? '' : 's'} to the badge`;
    $('v40WallBuild')?.classList.toggle('earned', earned);
  }

  function renderV37() {
    ensurePanels();
    renderWallBuild();
    renderCoach();
    renderWeeklyMission();
    renderPolicy();
    renderZeroToleranceStake();
    renderEvidenceMilestones();
    renderCashReserve();
    renderRewardReset();
    renderDataStatus();
    renderAugustFoundation();
    renderAugustDaily();
    renderRadar();
    renderReturnToSport();
    renderDexcomMission();
    if ($('avoidedToday')) $('avoidedToday').value = getDay(logDate())?.avoided || '';
    if ($('appVersion')) $('appVersion').textContent = 'v42 · Total Rebuild';
    const penaltyMetric = $('summitPenaltyXP')?.closest('.metric');
    if (penaltyMetric) penaltyMetric.classList.add('hidden');
    if ($('summitPeakLevel')) $('summitPeakLevel').textContent = state.levelSystem.highestEarned;
    if ($('homeLevelPeak')) $('homeLevelPeak').textContent = `Permanent Level ${state.levelSystem.highestEarned}`;
    if ($('homeRankPenalty')) $('homeRankPenalty').textContent = `Momentum ${state.momentum.activeLevel} · ${state.momentum.currentXP} XP`;
    if ($('homeRankShield')) $('homeRankShield').textContent = 'Recovery days count';
  }

  const FULL_CHECKS_V37 = FULL_CHECKS.filter(item => !item.core && !item.derived);
  renderFullChecklist = function (day) {
    let group = '';
    $('fullChecklistGrid').innerHTML = FULL_CHECKS_V37.map(item => {
      let heading = '';
      if (group !== item.group) {
        group = item.group;
        heading = `<div class="checkGroup" style="grid-column:1/-1">${escapeHtml(group)}</div>`;
      }
      const checked = checklistValue(day, item);
      return `${heading}<label class="tap lifeCheck"><input type="checkbox" data-full-check="${item.key}" ${checked ? 'checked' : ''}><span><b>${escapeHtml(item.label)}</b><small>${escapeHtml(item.desc)}</small></span></label>`;
    }).join('');
    const done = FULL_CHECKS_V37.filter(item => checklistValue(day, item)).length;
    $('dailyChecklistSummary').textContent = `${done}/${FULL_CHECKS_V37.length} non-duplicated support checks`;
    $$('[data-full-check]').forEach(input => input.addEventListener('change', () => {
      const item = FULL_CHECKS_V37.find(candidate => candidate.key === input.dataset.fullCheck);
      setChecklistValue(day, item, input.checked);
      save();
      renderFullChecklist(day);
      updateTodayScores();
      renderAdaptiveHome();
    }));
  };

  function smartUpdates(text) {
    const updates = [];
    const add = (kind, key, value, label) => updates.push({ kind, key, value, label });
    const number = pattern => {
      const match = text.match(pattern);
      return match ? Number(match[1]) : null;
    };
    const sleepHours = number(/\b(?:slept|sleep)\s*(\d+(?:\.\d+)?)\s*(?:h|hours?)\b/i);
    const sleepScore = number(/\bsleep(?:\s*(?:quality|score))?\s*[:=]?\s*(10|[1-9])\b/i);
    const energy = number(/\benergy\s*[:=]?\s*(10|[0-9])\b/i);
    const stress = number(/\bstress\s*[:=]?\s*(10|[0-9])\b/i);
    const knee = number(/\b(?:left\s+)?knee(?:\s+pain)?\s*[:=]?\s*(10|[0-9])\b/i);
    const ankle = number(/\b(?:right\s+)?(?:ankle|foot)(?:\s+pain)?\s*[:=]?\s*(10|[0-9])\b/i);
    const swelling = number(/\bswelling\s*[:=]?\s*(10|[0-9])\b/i);
    const protein = number(/\bprotein\s*[:=]?\s*(\d+(?:\.\d+)?)\s*g?\b/i);
    const junk = number(/\b(?:junk(?:[- ]food)?(?:\s+calories)?|junk cals?)\s*[:=]?\s*(\d+)\b/i);
    if (sleepHours !== null) add('context', 'sleepHours', sleepHours, `Sleep hours → ${sleepHours}`);
    if (sleepScore !== null) add('context', 'sleep', clamp(sleepScore, 1, 10), `Sleep quality → ${sleepScore}/10`);
    if (energy !== null) add('context', 'energy', clamp(energy, 0, 10), `Energy → ${energy}/10`);
    if (stress !== null) add('context', 'stress', clamp(stress, 0, 10), `Stress → ${stress}/10`);
    if (knee !== null) add('context', 'kneePain', clamp(knee, 0, 10), `Left knee pain → ${knee}/10`);
    if (ankle !== null) add('context', 'anklePain', clamp(ankle, 0, 10), `Right ankle/foot pain → ${ankle}/10`);
    if (swelling !== null) add('context', 'swelling', clamp(swelling, 0, 10), `Swelling → ${swelling}/10`);
    if (protein !== null) add('nutrition', 'protein', Math.max(0, protein), `Protein → ${protein}g`);
    if (junk !== null) add('nutrition', 'junkCalories', Math.max(0, junk), `Junk-food calories → ${junk}`);
    if (/\b(?:took|had|yes)\s+creatine\b|\bcreatine\s+(?:done|yes|taken)\b/i.test(text)) add('nutrition', 'creatine', true, 'Creatine → taken');
    if (/\b(?:did|completed|finished)\s+(?:my\s+)?rehab\b|\brehab\s+(?:done|complete)\b/i.test(text)) add('action', 'rehab', true, 'Recovery → rehab completed');
    if (/\b(?:prayed|prayer done|did prayer|read and prayed)\b/i.test(text) || /\bdid\b[^.!?\n]{0,48}\bprayer\b/i.test(text)) add('action', 'readingPrayer', true, 'Grounding → prayer/reading completed');
    if (/\b(?:went outside|outside time|walked outside|connected with|called a friend|saw family)\b/i.test(text)) add('action', 'outsideConnection', true, 'Connection/outside → completed');
    if (/\b(?:slipped|lapse|used slither|slither lapse)\b/i.test(text)) add('action', 'noSlither', false, 'Attention → lapse recorded');
    else if (/\b(?:no slither|slither[- ]free|attention protected)\b/i.test(text)) add('action', 'noSlither', true, 'Attention → protected');
    if (/\bwork(?:ing)? tonight\b|\bnight shift\b/i.test(text)) add('dayType', 'dayType', 'Work Night', 'Day type → Work Night');
    else if (/\bpost[- ]shift\b|\bjust finished (?:a )?shift\b/i.test(text)) add('dayType', 'dayType', 'Post-Shift Recovery', 'Day type → Post-Shift Recovery');
    else if (/\boff day\b|\bday off\b/i.test(text)) add('dayType', 'dayType', 'Off Day', 'Day type → Off Day');
    const avoided = text.match(/\bavoided\s*[:\-]?\s*([^.!?\n]+)/i);
    if (avoided) add('day', 'avoided', avoided[1].trim(), `Avoided → ${avoided[1].trim()}`);
    const bg = text.match(/\b(?:blood (?:glucose|sugar)|bg)\s*[:=]?\s*(good|fair|unstable|needs attention)\b/i);
    if (bg) {
      const value = bg[1].replace(/\b\w/g, char => char.toUpperCase());
      add('context', 'bg', value, `Blood sugar status → ${value}`);
    }
    const taskPatterns = [...text.matchAll(/(?:^|\n)\s*(?:todo|task|remember to|need to)\s*[:\-]?\s*([^\n]+)/gi)];
    taskPatterns.forEach(match => add('task', 'title', match[1].trim(), `Action list → ${match[1].trim()}`));
    return updates;
  }

  function renderSmartPreview(result) {
    const preview = $('v37SmartPreview');
    if (!result.updates.length) {
      preview.innerHTML = '<b>No confident field matches.</b><div class="mini">The text will not be discarded; revise it or add explicit labels such as “knee 4,” “protein 180g,” or “todo: schedule NIHSS.”</div>';
      $('v37ApplyLog').disabled = true;
      return;
    }
    preview.innerHTML = `<b>${result.updates.length} reviewed route${result.updates.length === 1 ? '' : 's'}</b><div class="v37RouteList">${result.updates.map(update => `<div class="v37Route">${escapeHtml(update.label)}</div>`).join('')}</div><div class="mini" style="margin-top:8px">Applying never completes the day automatically.</div>`;
    $('v37ApplyLog').disabled = false;
  }

  function applySmartLog() {
    if (!pendingSmartLog?.updates?.length) return;
    const day = ensureDay(activeDate());
    normalizeV21Day(day, activeDate());
    pendingSmartLog.updates.forEach(update => {
      if (update.kind === 'context') day.context[update.key] = update.value;
      else if (update.kind === 'nutrition') day.nutrition[update.key] = update.value;
      else if (update.kind === 'action') day.actions[update.key] = update.value;
      else if (update.kind === 'day') day[update.key] = update.value;
      else if (update.kind === 'dayType') {
        applyDayType(day, update.value, true);
        day.schedule.userSelected = true;
      } else if (update.kind === 'task') {
        state.admin.push({
          id: `smart-task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          title: update.value,
          due: '',
          category: 'Life Admin',
          priority: 'Normal',
          complete: false,
          source: 'Smart Log'
        });
      }
    });
    day.smartLogNote = pendingSmartLog.text;
    state.coach.smartLogHistory.push({
      id: `smart-log-${Date.now()}`,
      date: activeDate(),
      at: new Date().toISOString(),
      text: pendingSmartLog.text,
      updates: pendingSmartLog.updates.map(({ kind, key, value, label }) => ({ kind, key, value, label }))
    });
    save();
    $('v37SmartLogInput').value = '';
    pendingSmartLog = null;
    $('v37ApplyLog').disabled = true;
    $('v37SmartPreview').innerHTML = '<b>Applied.</b><div class="mini">Review the Today page and close the day only when the evidence is honest.</div>';
    renderToday();
    renderHome();
    renderV37();
    toast('Smart Log routed to reviewed fields');
  }

  function useCoachCommand() {
    const command = commandFor();
    const day = ensureDay(activeDate());
    normalizeV21Day(day, activeDate());
    applyDayType(day, command.mode, true);
    day.schedule.userSelected = true;
    day.missions = {
      ...day.missions,
      critical: command.critical,
      body: command.body,
      life: command.life,
      power: command.optional || 'Not assigned for this capacity.',
      dopamine: command.dopamine,
      definition: command.definition
    };
    day.actions.powerAssigned = !!command.optional;
    if (!command.optional) day.actions.power = false;
    state.coach.commandHistory.push({
      id: `command-${Date.now()}`,
      date: activeDate(),
      calendarDate: command.calendarDate,
      at: new Date().toISOString(),
      mode: command.mode,
      capacity: command.capacity.level,
      calendarEventIds: command.events.map(event => event.id)
    });
    save();
    renderHome();
    renderToday();
    renderV37();
    navigator.vibrate?.(20);
    toast('Adaptive command applied');
  }

  function unescapeIcs(value = '') {
    return value
      .replace(/\\n/gi, '\n')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\\\/g, '\\');
  }

  function parseIcsValue(raw, params = '') {
    const value = String(raw || '').trim();
    if (/VALUE=DATE/i.test(params) || /^\d{8}$/.test(value)) {
      return {
        allDay: true,
        date: `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`,
        iso: null
      };
    }
    const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/);
    if (!match) return { allDay: false, date: '', iso: value };
    const [, year, month, day, hour, minute, second = '00', zulu] = match;
    if (zulu) {
      const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
      return { allDay: false, date: dateKeyInLA(date), iso: date.toISOString() };
    }
    return {
      allDay: false,
      date: `${year}-${month}-${day}`,
      iso: `${year}-${month}-${day}T${hour}:${minute}:${second}`
    };
  }

  function parseIcs(text) {
    const unfolded = String(text).replace(/\r?\n[ \t]/g, '');
    const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
    return blocks.map((block, index) => {
      const props = {};
      block.split(/\r?\n/).forEach(line => {
        const split = line.indexOf(':');
        if (split < 0) return;
        const left = line.slice(0, split);
        const value = line.slice(split + 1);
        const [name, ...params] = left.split(';');
        props[name.toUpperCase()] = { value, params: params.join(';') };
      });
      const start = parseIcsValue(props.DTSTART?.value, props.DTSTART?.params);
      const end = parseIcsValue(props.DTEND?.value, props.DTEND?.params);
      return {
        id: unescapeIcs(props.UID?.value) || `ics-${Date.now()}-${index}`,
        title: unescapeIcs(props.SUMMARY?.value) || 'Calendar event',
        description: unescapeIcs(props.DESCRIPTION?.value),
        location: unescapeIcs(props.LOCATION?.value),
        start: start.iso,
        end: end.iso,
        date: start.date,
        allDay: start.allDay,
        source: 'ICS import',
        recurrence: props.RRULE?.value || null,
        importedAt: new Date().toISOString()
      };
    }).filter(event => event.date || event.start);
  }

  function importCalendarFile(file) {
    file.text().then(text => {
      const incoming = parseIcs(text);
      if (!incoming.length) throw new Error('No events');
      const byId = new Map((state.calendar.events || []).map(event => [event.id, event]));
      incoming.forEach(event => byId.set(event.id, { ...byId.get(event.id), ...event }));
      state.calendar.events = [...byId.values()];
      state.calendar.lastSyncAt = new Date().toISOString();
      state.calendar.source = 'ICS import';
      save();
      renderV37();
      toast(`${incoming.length} calendar event${incoming.length === 1 ? '' : 's'} imported`);
    }).catch(() => toast('Could not read events from that .ics file'));
  }

  async function sha256(text) {
    if (!globalThis.crypto?.subtle) throw new Error('Secure checksum is unavailable in this browser context');
    const bytes = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(hash)].map(value => value.toString(16).padStart(2, '0')).join('');
  }

  function checksumPayload(data) {
    return JSON.stringify({ state: data.state, photos: data.photos || [] });
  }

  fullExport = async function () {
    const photos = await getPhotos();
    const now = new Date().toISOString();
    state.lastBackup = now;
    state.lastBackupMeta = {
      type: 'full',
      photoCount: photos.length,
      version: PRIVATE_VERSION,
      createdAt: now,
      checksum: 'SHA-256'
    };
    state.version = PRIVATE_VERSION;
    state.lastSaved = now;
    safeSet(STORE_KEY, JSON.stringify(state));
    const data = {
      app: 'Project 52',
      version: PRIVATE_VERSION,
      exportedAt: now,
      state: deepClone(state),
      photos: deepClone(photos)
    };
    data.manifest = {
      format: 'northstar-full-v2',
      algorithm: 'SHA-256',
      checksum: await sha256(checksumPayload(data)),
      photoCount: photos.length,
      storage: [STORE_KEY, PHOTO_DB, ARCHIVE_DB]
    };
    return data;
  };

  exportAll = async function () {
    try {
      const data = await fullExport();
      downloadFile(`project-52-v${PRIVATE_VERSION}-${activeDate()}.json`, JSON.stringify(data, null, 2));
      renderSaveMeta();
      renderEvidenceSummary();
      renderDataStatus();
      toast('Verified full backup exported');
    } catch (error) {
      toast(error.message || 'Could not create a verified backup');
    }
  };

  openPhotoDB = function () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(PHOTO_DB, 2);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('rollback')) db.createObjectStore('rollback', { keyPath: 'id' });
      };
      request.onsuccess = event => resolve(event.target.result);
      request.onerror = () => reject(request.error);
    });
  };

  function validatePhotos(photos) {
    if (!Array.isArray(photos)) throw new Error('Photo archive is not an array');
    photos.forEach(photo => {
      if (!photo || typeof photo.id !== 'string' || !photo.id) throw new Error('A photo record has no stable ID');
      if (typeof photo.dataUrl !== 'string' || !photo.dataUrl.startsWith('data:image/')) throw new Error(`Photo ${photo.id} is incomplete`);
    });
  }

  async function replacePhotosTransactionally(incoming) {
    validatePhotos(incoming);
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['photos', 'rollback'], 'readwrite');
      const photosStore = transaction.objectStore('photos');
      const rollbackStore = transaction.objectStore('rollback');
      const read = photosStore.getAll();
      read.onsuccess = () => {
        rollbackStore.clear();
        (read.result || []).forEach(photo => rollbackStore.put(photo));
        photosStore.clear();
        incoming.forEach(photo => photosStore.put(photo));
      };
      read.onerror = () => transaction.abort();
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('Photo restore failed'));
      transaction.onabort = () => reject(transaction.error || new Error('Photo restore aborted'));
    });
  }

  async function restorePhotoRollback() {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['photos', 'rollback'], 'readwrite');
      const photosStore = transaction.objectStore('photos');
      const rollbackStore = transaction.objectStore('rollback');
      const read = rollbackStore.getAll();
      read.onsuccess = () => {
        photosStore.clear();
        (read.result || []).forEach(photo => photosStore.put(photo));
      };
      read.onerror = () => transaction.abort();
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('Photo rollback failed'));
      transaction.onabort = () => reject(transaction.error || new Error('Photo rollback aborted'));
    });
  }

  importObject = async function (object) {
    if (!object || typeof object !== 'object') throw new Error('No backup data');
    const incomingRaw = object.state || object;
    if (!incomingRaw.days || typeof incomingRaw.days !== 'object') throw new Error('Backup has no daily-history object');
    if (object.manifest?.checksum) {
      const actual = await sha256(checksumPayload(object));
      if (actual !== object.manifest.checksum) throw new Error('Backup checksum does not match');
    } else if (!confirm('This is a compatible legacy backup without a checksum. A rollback point will be created before import. Continue?')) {
      throw new Error('Import cancelled');
    }
    const oldStateRaw = safeGet(STORE_KEY) || JSON.stringify(state);
    safeSet(PRE_IMPORT_STATE_KEY, oldStateRaw);
    const incomingState = ensureV37State(migrateV36(JSON.stringify(incomingRaw)));
    try {
      if (Array.isArray(object.photos)) await replacePhotosTransactionally(object.photos);
      state = incomingState;
      state.lastSaved = new Date().toISOString();
      if (!safeSet(STORE_KEY, JSON.stringify(state))) throw new Error('Could not commit restored state');
      await archiveState(true);
      renderAll();
      renderV37();
      toast('Backup verified and restored transactionally');
    } catch (error) {
      state = migrateV36(oldStateRaw);
      safeSet(STORE_KEY, oldStateRaw);
      if (Array.isArray(object.photos)) await restorePhotoRollback().catch(() => {});
      throw error;
    }
  };

  importFile = async function (file) {
    try {
      await importObject(JSON.parse(await file.text()));
    } catch (error) {
      toast(error.message || 'Could not import that backup');
    }
  };

  async function restorePreImportRollback() {
    const raw = safeGet(PRE_IMPORT_STATE_KEY);
    if (!raw) return toast('No pre-import rollback is stored');
    if (!confirm('Restore the state and photos from immediately before the last import?')) return;
    try {
      await restorePhotoRollback();
      state = ensureV37State(migrateV36(raw));
      safeSet(STORE_KEY, JSON.stringify(state));
      await archiveState(true);
      renderAll();
      renderV37();
      toast('Pre-import rollback restored');
    } catch {
      toast('Could not restore the rollback point');
    }
  }

  async function shareBackup() {
    try {
      const data = await fullExport();
      const file = new File(
        [JSON.stringify(data, null, 2)],
        `project-52-v${PRIVATE_VERSION}-${activeDate()}.json`,
        { type: 'application/json' }
      );
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: 'Project 52 backup', files: [file] });
        toast('Backup handed to the share sheet');
      } else {
        downloadFile(file.name, await file.text());
        toast('Share sheet unavailable; backup downloaded');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') toast(error.message || 'Could not share the backup');
    }
  }

  async function checkForUpdate() {
    const status = $('v37UpdateStatus');
    status.textContent = 'Checking…';
    try {
      const registration = await navigator.serviceWorker?.getRegistration?.();
      await registration?.update?.();
      const response = await fetch(`version.json?check=${Date.now()}`, { cache: 'no-store' });
      const latest = await response.json();
      status.textContent = Number(latest.version) > PRIVATE_VERSION
        ? `v${latest.version} is available`
        : `v${PRIVATE_VERSION} is current`;
    } catch {
      status.textContent = `Offline · installed v${PRIVATE_VERSION} remains available`;
    }
  }

  function systemCheckItem(status, title, detail) {
    const symbol = status === 'pass' ? '✓' : status === 'warn' ? '!' : '×';
    return `<div class="v41SystemItem ${status}"><span>${symbol}</span><div><b>${escapeHtml(title)}</b><small>${escapeHtml(detail)}</small></div></div>`;
  }

  async function runV41SystemCheck() {
    const results = $('v41SystemCheckResults');
    const badge = $('v41SystemCheckBadge');
    if (!results || !badge) return;
    badge.textContent = 'Running…';
    badge.className = 'pill blue';
    const checks = [];
    checks.push({
      status: PRIVATE_VERSION === 42 && Number(state.version) === 42 ? 'pass' : 'fail',
      title: 'Application version',
      detail: `Installed V${PRIVATE_VERSION}; saved state V${Number(state.version || 0)}.`
    });

    const pages = $$('.page');
    checks.push({
      status: pages.length === 7 ? 'pass' : 'fail',
      title: 'Seven-section framework',
      detail: `${pages.length}/7 sections detected.`
    });

    const ids = $$('[id]').map(node => node.id);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    checks.push({
      status: duplicates.length ? 'fail' : 'pass',
      title: 'Interface identity',
      detail: duplicates.length ? `Duplicate controls: ${duplicates.join(', ')}` : 'No duplicate control IDs detected.'
    });

    const missionGrid = $('missionTaps')?.closest('.grid');
    const augustDaily = $('v39AugustDaily');
    const misplacedAugust = !!(missionGrid && augustDaily && missionGrid.contains(augustDaily));
    const hasHorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    checks.push({
      status: misplacedAugust ? 'fail' : hasHorizontalOverflow ? 'warn' : 'pass',
      title: 'Responsive layout integrity',
      detail: misplacedAugust
        ? 'August Supporting Habits is trapped inside the Mission Completion grid.'
        : hasHorizontalOverflow
          ? 'Horizontal overflow is present at this screen size; try Reset Mobile Layout, then rerun this check.'
          : 'Daily missions and supporting habits are in separate full-width layout regions.'
    });

    let storageOkay = false;
    try {
      const key = 'project52.v42.storageProbe';
      localStorage.setItem(key, 'ok');
      storageOkay = localStorage.getItem(key) === 'ok';
      localStorage.removeItem(key);
    } catch {}
    checks.push({
      status: storageOkay ? 'pass' : 'fail',
      title: 'Local record storage',
      detail: storageOkay ? 'Browser-local state can be written and read.' : 'Local storage is blocked or unavailable.'
    });

    let photos = [];
    let photosOkay = false;
    try {
      photos = await getPhotos();
      photosOkay = Array.isArray(photos);
    } catch {}
    checks.push({
      status: photosOkay ? 'pass' : 'fail',
      title: 'Photo archive',
      detail: photosOkay ? `${photos.length} locally stored photo record${photos.length === 1 ? '' : 's'} accessible.` : 'The local photo archive could not be opened.'
    });

    const resetArchives = (state.phaseArchives || []).filter(entry => entry.id === AUGUST_PHASE_RESET_ID);
    checks.push({
      status: resetArchives.length === 1 && !!state.privateBuild?.totalRebuildResetAppliedAt ? 'pass' : 'fail',
      title: 'One-time reset protection',
      detail: resetArchives.length === 1
        ? 'One pre-August preservation archive is stored; repeated launches cannot apply the reset again.'
        : `${resetArchives.length} final-reset archives detected; review before continuing.`
    });

    const phaseDatesValid = state.settings?.programStart === AUGUST_PHASE_START
      && state.settings?.programEnd === AUGUST_PHASE_END
      && daysBetween(AUGUST_PHASE_START, AUGUST_PHASE_END) + 1 === 153;
    checks.push({
      status: phaseDatesValid ? 'pass' : 'fail',
      title: 'August–December rebuild window',
      detail: phaseDatesValid
        ? 'August 1–December 31, 2026 is fixed at 153 calendar days.'
        : `Saved window is ${state.settings?.programStart || '—'} through ${state.settings?.programEnd || '—'}.`
    });

    const activeLevelValid = Number(state.levelSystem?.activeLevel ?? -1) === Number(state.momentum?.activeLevel ?? -2)
      && Number(state.levelSystem?.activeLevel ?? -1) >= 0;
    checks.push({
      status: activeLevelValid ? 'pass' : 'fail',
      title: 'Active Level 0 compatibility',
      detail: activeLevelValid
        ? `Active Level ${Number(state.levelSystem.activeLevel)} · historical peak Level ${Number(state.levelSystem.highestEarned || 1)}.`
        : 'Active Momentum and displayed level are out of sync.'
    });

    const journalControls = ['rebuildTruth', 'rebuildEvidence', 'rebuildTomorrow', 'rebuildIfThen', 'dailyReflectionNote']
      .filter(id => !!$(id)).length;
    const workoutChoices = $$('[data-v42-workout]').length;
    const v42Panels = ['v42CampaignDeck', 'v42PainPanel', 'v42WorkoutPanel', 'v42TrainingBoard', 'v42VisionPanel', 'v42WeeklyReviewPanel']
      .filter(id => !!$(id)).length;
    checks.push({
      status: journalControls === 5 && workoutChoices === 5 && v42Panels === 6 ? 'pass' : 'fail',
      title: 'Total Rebuild controls',
      detail: `${journalControls}/5 journal fields · ${workoutChoices}/5 workout outcomes · ${v42Panels}/6 command panels.`
    });

    const activeDates = Object.keys(state.days || {});
    const leakedPriorDates = activeDates.filter(date => date < AUGUST_PHASE_START);
    const preResetBackup = safeGet(PRE_AUGUST_RESET_BACKUP_KEY);
    checks.push({
      status: resetArchives.length === 1 && !leakedPriorDates.length && !!preResetBackup ? 'pass' : 'fail',
      title: 'Archive boundary and rollback',
      detail: resetArchives.length !== 1
        ? 'The read-only phase archive is missing or duplicated.'
        : leakedPriorDates.length
          ? `${leakedPriorDates.length} pre-August day record${leakedPriorDates.length === 1 ? '' : 's'} leaked into the active phase.`
          : preResetBackup
            ? 'Earlier logs are read-only, active logs start August 1, and an automatic rollback copy exists.'
            : 'The automatic pre-reset rollback copy is missing.'
    });

    const targets = state.totalRebuild?.training?.rollingTarget || {};
    const missionDefinitionReady = typeof globalThis.Project52V42Diagnostics?.completedDayRequirements === 'function';
    checks.push({
      status: Number(targets.chinUp) === 3 && Number(targets.lowerBody) === 3 && missionDefinitionReady ? 'pass' : 'fail',
      title: 'Training rhythm and completion gate',
      detail: `Chin-up target ${Number(targets.chinUp || 0)}/3 · lower-body target ${Number(targets.lowerBody || 0)}/3 · five-part close gate ${missionDefinitionReady ? 'active' : 'missing'}.`
    });

    const lastBackup = state.lastBackup ? new Date(state.lastBackup) : null;
    const backupAge = lastBackup && !Number.isNaN(lastBackup.valueOf())
      ? Math.floor((Date.now() - lastBackup.valueOf()) / 86400000)
      : null;
    checks.push({
      status: backupAge === null || backupAge > 7 ? 'warn' : 'pass',
      title: 'Backup health',
      detail: backupAge === null
        ? 'No completed full-backup timestamp is stored yet.'
        : backupAge > 7
          ? `Last full backup was ${backupAge} days ago.`
          : `Last full backup was ${backupAge === 0 ? 'today' : `${backupAge} day${backupAge === 1 ? '' : 's'} ago`}.`
    });

    const swSupported = 'serviceWorker' in navigator;
    let registration = null;
    if (swSupported) {
      try {
        registration = await navigator.serviceWorker?.getRegistration?.();
      } catch {}
    }
    checks.push({
      status: !swSupported ? 'warn' : registration || navigator.serviceWorker.controller ? 'pass' : 'warn',
      title: 'Offline shell',
      detail: !swSupported
        ? 'This browser does not support installable offline apps.'
        : registration || navigator.serviceWorker.controller
          ? 'Offline worker is registered.'
          : 'Supported but not active here; reload once on the deployed HTTPS app.'
    });

    const failed = checks.filter(check => check.status === 'fail').length;
    const warnings = checks.filter(check => check.status === 'warn').length;
    results.innerHTML = checks.map(check => systemCheckItem(check.status, check.title, check.detail)).join('');
    badge.textContent = failed ? `${failed} issue${failed === 1 ? '' : 's'}` : warnings ? `${warnings} warning${warnings === 1 ? '' : 's'}` : 'All clear';
    badge.className = `pill ${failed ? 'red' : warnings ? 'gold' : 'green'}`;
    state.privateBuild.lastSystemCheckAt = new Date().toISOString();
    state.privateBuild.lastSystemCheck = { failed, warnings };
    save();
    toast(failed ? 'System check found an issue' : warnings ? 'System check complete with a warning' : 'V42 system check passed');
  }

  function resetMobileLayout() {
    if (!confirm('Reset saved collapse/expand preferences and reload the interface? Your Project 52 data will not change.')) return;
    try {
      localStorage.removeItem('sixMonthForge.mobilePanels.v1');
      sessionStorage.setItem('project52.layoutReset', '1');
    } catch {}
    location.reload();
  }

  function saveEvidence(key) {
    const def = EVIDENCE_MILESTONES[key];
    const row = state.evidenceMilestones[key];
    row.status = document.querySelector(`[data-v37-evidence-status="${key}"]`).value;
    row.date = document.querySelector(`[data-v37-evidence-date="${key}"]`).value;
    row.evidence = document.querySelector(`[data-v37-evidence-note="${key}"]`).value.trim();
    const clearance = document.querySelector(`[data-v37-evidence-clearance="${key}"]`);
    if (clearance) row.clearance = clearance.checked;
    if (row.status === 'Complete' && def.requiresClearance && !row.clearance) {
      row.status = 'In progress';
      toast('Clinician clearance is required before this milestone can be complete');
    } else {
      toast('Evidence milestone saved');
    }
    save();
    renderEvidenceMilestones();
    syncV29Patches();
    renderV29Patches();
  }

  function saveCashReserve() {
    const cash = state.goals.cashReserve;
    const current = Math.max(0, Number($('v37CashReserveInput').value) || 0);
    const note = $('v37CashReserveNote').value.trim();
    const changed = String(cash.current) !== String(current);
    cash.current = current;
    if (changed || note || !cash.history.length) {
      cash.history.push({
        id: `cash-reserve-${Date.now()}`,
        date: activeDate(),
        amount: current,
        note,
        at: new Date().toISOString()
      });
    }
    $('v37CashReserveNote').value = '';
    save();
    renderCashReserve();
    syncV29Patches();
    renderV29Patches();
    toast('Liquid-cash staircase updated');
  }

  completeToday = function () {
    saveTodayInputs();
    const date = logDate();
    const day = ensureDay(date);
    if (needsSymptomDetail(day) && (day.symptoms.detail || '').trim().length < 12) {
      $('symptomDetailPanel').classList.remove('hidden');
      $('symptomDetail').focus();
      toast('Add brief symptom context before completing.');
      return;
    }
    const firstClose = !day.completeDayAt;
    if (firstClose && !day.actions.noSlither && !confirm(
      `The Zero-Tolerance Standard is unchecked. Closing this day will record the lapse, subtract ${ZERO_TOLERANCE_CONSEQUENCE} Momentum XP, and lower the active Momentum level by one. Permanent lifetime XP and rank remain protected. Close honestly?`
    )) return;
    day.completeDayAt = new Date().toISOString();
    const adaptive = adaptiveComponents(day);
    day.adaptive = {
      ...day.adaptive,
      xp: adaptive.total,
      status: adaptive.status,
      completedProjectDay: adaptive.total >= 50,
      lastCalculated: day.completeDayAt
    };
    if (!day.actions.noSlither && !state.resetHistory.includes(date)) state.resetHistory.push(date);
    const settlement = firstClose ? settleZeroTolerance(date, day) : day.zeroToleranceSettlement;
    updateLevelProgress();
    save();
    renderAll();
    const stake = settlement
      ? settlement.outcome === 'kept'
        ? ` · ${adaptive.total} day XP + ${ZERO_TOLERANCE_AWARD} standard = +${settlement.xpDelta} active XP`
        : ` · ${adaptive.total} day XP − ${ZERO_TOLERANCE_CONSEQUENCE} standard = ${settlement.xpDelta} active XP · Level ${settlement.afterLevel}`
      : ' · original settlement preserved';
    toast(`Daily Quest complete · ${adaptive.status}${stake}`);
  };

  function bindV37() {
    if (globalThis.__northstarV37Bound) return;
    globalThis.__northstarV37Bound = true;
    document.addEventListener('click', event => {
      if (event.target.closest('#saveMissions')) {
        ensureDay(activeDate()).commandEdited = true;
      }
      const mode = event.target.closest('[data-v37-mode]');
      if (mode) {
        const day = ensureDay(activeDate());
        normalizeV21Day(day, activeDate());
        applyDayType(day, mode.dataset.v37Mode, true);
        day.schedule.userSelected = true;
        save();
        renderV37();
        renderToday();
        return;
      }
      if (event.target.closest('#v37UseCommand')) return useCoachCommand();
      if (event.target.closest('#v38RecommendMission')) {
        const existing = scheduledMissionForWeek();
        if (['Confirmed', 'Completed'].includes(existing?.status)) return toast('This calendar week already has one confirmed Mission Day');
        if (existing && existing !== state.weeklyMissions.current) return toast('This calendar week already has one Mission Day');
        recommendWeeklyMission(true);
        renderWeeklyMission();
        toast('One weekly mission recommended for confirmation');
        return;
      }
      if (event.target.closest('#v38ConfirmMission')) return confirmWeeklyMission();
      if (event.target.closest('#v38RescheduleMission')) return rescheduleWeeklyMission();
      if (event.target.closest('#v38CompleteMission')) return completeWeeklyMission();
      if (event.target.closest('#v37AnalyzeLog')) {
        const text = $('v37SmartLogInput').value.trim();
        pendingSmartLog = { text, updates: smartUpdates(text) };
        renderSmartPreview(pendingSmartLog);
        return;
      }
      if (event.target.closest('#v37ApplyLog')) return applySmartLog();
      if (event.target.closest('#v37SavePolicy')) {
        state.policy.prayer = $('v37PrayerInput').value.trim() || DEFAULT_PRAYER;
        state.policy.zeroTolerance = $('v37PolicyInput').value.trim() || DEFAULT_ZERO_TOLERANCE;
        save();
        renderPolicy();
        toast('Prayer and policy saved');
        return;
      }
      const evidence = event.target.closest('[data-v37-evidence-save]');
      if (evidence) return saveEvidence(evidence.dataset.v37EvidenceSave);
      if (event.target.closest('#v37SaveCashReserve')) return saveCashReserve();
      if (event.target.closest('#v37CheckUpdate')) return checkForUpdate();
      if (event.target.closest('#v41RunSystemCheck')) return runV41SystemCheck();
      if (event.target.closest('#v41ResetMobileLayout')) return resetMobileLayout();
      if (event.target.closest('#v37ShareBackup')) return shareBackup();
      if (event.target.closest('#v37RestoreRollback')) return restorePreImportRollback();
      if (event.target.closest('#v40SaveDexcomMission')) return saveDexcomMission();
      if (event.target.closest('#v40SaveLsi')) return saveLsiResult();
      if (event.target.closest('#v40SaveRtsEvidence')) return saveRtsStageEvidence();
      const rtsClaim = event.target.closest('[data-v40-rts-claim]');
      if (rtsClaim) return claimRtsMilestone(rtsClaim.dataset.v40RtsClaim);
      const rtsRewardSave = event.target.closest('[data-v40-rts-reward-save]');
      if (rtsRewardSave) return saveRtsRewardChoice(rtsRewardSave.dataset.v40RtsRewardSave);
      const rtsReward = event.target.closest('[data-v40-rts-reward]');
      if (rtsReward) return claimRtsReward(rtsReward.dataset.v40RtsReward);
      if (event.target.closest('#v40InstallApp')) {
        if (!deferredInstallPrompt) {
          toast('On iPhone use Safari Share → Add to Home Screen');
          return;
        }
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.finally(() => {
          deferredInstallPrompt = null;
          $('v40InstallStatus').textContent = 'Install prompt completed';
          $('v40InstallApp').disabled = true;
        });
        return;
      }
      if (event.target.closest('#v39SaveBaseline')) {
        ensureAugustFoundation(state);
        $$('[data-v39-baseline]').forEach(input => {
          state.augustFoundation.baseline.views[input.dataset.v39Baseline] = input.checked;
        });
        state.augustFoundation.baseline.weight = $('v39BaselineWeight').value;
        state.augustFoundation.baseline.waist = $('v39BaselineWaist').value;
        state.augustFoundation.baseline.completeAt = BASELINE_VIEWS.every(view => state.augustFoundation.baseline.views[view])
          ? (state.augustFoundation.baseline.completeAt || new Date().toISOString())
          : null;
        save();
        renderAugustFoundation();
        toast('July 2026 Baseline status saved');
        return;
      }
      if (event.target.closest('#v39SaveLipids')) {
        ensureAugustFoundation(state);
        $$('[data-v39-lipid]').forEach(input => {
          const [panel, key] = input.dataset.v39Lipid.split('.');
          state.augustFoundation.cholesterol[panel][key] = input.value;
        });
        const lipids = state.augustFoundation.cholesterol;
        lipids.retestCompleted = $('v39RetestComplete').checked;
        lipids.valuesRemainElevated = $('v39Elevated').value;
        lipids.clinicianContacted = $('v39ClinicianContacted').checked;
        lipids.documentedDecision = $('v39TreatmentDecision').value.trim();
        if (lipids.valuesRemainElevated === 'Yes' && (!lipids.clinicianContacted || lipids.documentedDecision.length < 8)) {
          toast('For elevated results, document clinician contact and the shared next action before completing the checkpoint');
          save();
          renderAugustFoundation();
          return;
        }
        lipids.decisionCompletedAt = lipids.retestCompleted && lipids.valuesRemainElevated !== 'Review needed' && lipids.documentedDecision.length >= 8
          ? (lipids.decisionCompletedAt || new Date().toISOString())
          : null;
        save();
        renderAugustFoundation();
        toast('Lipid results checkpoint saved');
        return;
      }
    }, true);
    document.addEventListener('change', event => {
      if (event.target?.id === 'v37CalendarFile' && event.target.files?.[0]) importCalendarFile(event.target.files[0]);
      if (event.target?.id === 'v39WebRange') renderRadar();
      if (event.target?.id === 'v40RtsMilestoneSelect') loadRtsStageForm();
      if (event.target?.matches?.('[data-v39-day]')) {
        const day = ensureDay(logDate());
        const august = ensureAugustDay(day);
        august[event.target.dataset.v39Day] = event.target.checked;
        if (event.target.dataset.v39Day === 'ankleRehab' && event.target.checked) august.ankleRecoveryVersion = false;
        if (event.target.dataset.v39Day === 'ankleRecoveryVersion' && event.target.checked) august.ankleRehab = false;
        if (['ankleRehab', 'ankleRecoveryVersion'].includes(event.target.dataset.v39Day)) {
          const completed = !!august.ankleRehab || !!august.ankleRecoveryVersion;
          if (completed) {
            day.actions.body = true;
            day.actions.rehab = true;
            day.actions.restrictions = true;
            august.bodyMissionAutoCredited = true;
          } else if (august.bodyMissionAutoCredited) {
            day.actions.body = false;
            day.actions.rehab = false;
            august.bodyMissionAutoCredited = false;
          }
        }
        save();
        renderAugustDaily();
        renderAugustFoundation();
        renderRadar();
        renderToday();
        renderHome();
      }
      if (event.target?.id === 'v38FastPlanDocumented') {
        state.weeklyMissions.medical.fastingPlanDocumented = event.target.checked;
        if (state.weeklyMissions.current?.status === 'Recommended') state.weeklyMissions.current = null;
        save();
        renderWeeklyMission();
      }
      if (event.target?.id === 'v38PullupReadyDocumented') {
        state.weeklyMissions.medical.pullupReadinessDocumented = event.target.checked;
        if (state.weeklyMissions.current?.status === 'Recommended') state.weeklyMissions.current = null;
        save();
        renderWeeklyMission();
      }
    }, true);
    document.addEventListener('input', event => {
      if (event.target?.id !== 'avoidedToday') return;
      const day = ensureDay(logDate());
      day.avoided = event.target.value;
      save();
    }, true);
    window.addEventListener('hashchange', () => {
      const page = location.hash.replace('#', '');
      if (['home', 'today', 'recovery', 'mountains', 'goals', 'reviews', 'data'].includes(page)) showPage(page);
    });
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      if ($('v40InstallStatus')) $('v40InstallStatus').textContent = 'Install available';
      if ($('v40InstallApp')) $('v40InstallApp').disabled = false;
    });
    window.addEventListener('appinstalled', () => {
      if ($('v40InstallStatus')) $('v40InstallStatus').textContent = 'Installed';
      if ($('v40InstallApp')) $('v40InstallApp').disabled = true;
      deferredInstallPrompt = null;
    });
  }

  const showPageV36 = showPage;
  showPage = function (page, scroll) {
    showPageV36(page, scroll);
    if (location.hash !== `#${page}`) history.replaceState(null, '', `#${page}`);
    setTimeout(renderV37, 0);
  };

  function hasMeaningfulDayEvidence(day, date) {
    if (!day) return false;
    if (completedDay(day)) return true;
    const defaults = defaultDay(date);
    const contextChanged = Object.keys(defaults.context).some(key => String(day.context?.[key] ?? '') !== String(defaults.context[key] ?? ''))
      || Number.isFinite(Number(day.context?.sleepHours));
    const missionChanged = !!day.commandEdited;
    return Object.values(day.actions || {}).some(Boolean)
      || contextChanged
      || day.schedule?.userSelected
      || missionChanged
      || !!day.avoided
      || !!day.reflectionNote
      || !!day.smartLogNote
      || !!day.protocolNote
      || !!day.nutrition?.creatine
      || (day.nutrition?.protein !== undefined && day.nutrition?.protein !== '')
      || (day.nutrition?.junkCalories !== undefined && day.nutrition?.junkCalories !== '')
      || Object.values(day.fullChecklist || {}).some(Boolean)
      || Object.values(day.august || {}).some(value => value === true || value !== '' && value !== false);
  }

  function removeTransientDay(date, existedBeforeRender) {
    if (existedBeforeRender || !state.days?.[date] || hasMeaningfulDayEvidence(state.days[date], date)) return;
    delete state.days[date];
    safeSet(STORE_KEY, JSON.stringify(state));
  }

  const renderHomeV36 = renderHome;
  renderHome = function () {
    const date = activeDate();
    const existedBeforeRender = Object.prototype.hasOwnProperty.call(state.days || {}, date);
    renderHomeV36();
    removeTransientDay(date, existedBeforeRender);
    renderV37();
  };

  const renderTodayV36 = renderToday;
  renderToday = function () {
    ensurePanels();
    renderTodayV36();
    renderMissionCompletionV41();
    renderAugustDaily();
    if ($('avoidedToday')) $('avoidedToday').value = getDay(logDate())?.avoided || '';
    renderPolicy();
    renderZeroToleranceStake();
    renderCoach();
    renderWeeklyMission();
  };

  const renderRecoveryV36Private = renderRecovery;
  renderRecovery = function () {
    const value = renderRecoveryV36Private();
    renderReturnToSport();
    return value;
  };

  const renderGoalsV36 = renderGoals;
  renderGoals = async function () {
    const value = await renderGoalsV36();
    renderCashReserve();
    renderRewardReset();
    renderReturnToSport();
    return value;
  };

  const renderMountainsV36 = renderMountains;
  renderMountains = function () {
    renderMountainsV36();
    renderEvidenceMilestones();
  };

  const renderReviewsV36 = renderReviews;
  renderReviews = function () {
    renderReviewsV36();
    renderRewardReset();
  };

  const renderSettingsV36Private = renderSettings;
  renderSettings = function () {
    renderSettingsV36Private();
    renderDataStatus();
  };

  const renderAllV36Private = renderAll;
  renderAll = function () {
    ensureV37State(state);
    ensurePanels();
    const date = activeDate();
    const existedBeforeRender = Object.prototype.hasOwnProperty.call(state.days || {}, date);
    renderAllV36Private();
    if ((document.body.dataset.currentPage || 'home') !== 'today') removeTransientDay(date, existedBeforeRender);
    renderV37();
  };

  const bindV36 = bind;
  bind = function () {
    ensurePanels();
    bindV36();
    bindV37();
  };

  exportHistoryCsv = function () {
    const head = [
      'Date', 'Day Type', 'Completed', 'Adaptive XP', 'Adaptive Status', 'Project 52 Score',
      'Sleep Quality', 'Sleep Hours', 'Energy', 'Stress', 'Work', 'Blood Sugar',
      'Left Knee Pain', 'Right Ankle/Foot Pain', 'Swelling', 'Protein g',
      'Junk-food Calories', 'Creatine', 'No Slither', 'Rehab/Recovery',
      'Restrictions Followed', 'Critical Completed', 'Body Completed', 'Life Completed',
      'Prayer/Reading', 'Outside/Connection', 'What Was Avoided', 'Daily Reflection',
      'Heart-health Nutrition', 'Whitening', 'Jaw Training', 'Ankle Rehab',
      'Approved Ankle Recovery Version', 'Symptom Detail', 'Protocol Note', 'Calendar Events'
    ];
    const rows = historyDates().reverse().map(date => {
      const day = getDay(date);
      const score = categoryScores(day);
      const adaptive = adaptiveComponents(day);
      return [
        date, day.dayType, !!day.completeDayAt, adaptive.total, adaptive.status,
        Math.round(score.total * 100), day.context?.sleep, day.context?.sleepHours || '',
        day.context?.energy, day.context?.stress, day.context?.work, day.context?.bg,
        day.context?.kneePain, day.context?.anklePain, day.context?.swelling,
        day.nutrition?.protein ?? '', day.nutrition?.junkCalories ?? '', !!day.nutrition?.creatine,
        !!day.actions?.noSlither, !!day.actions?.rehab, !!day.actions?.restrictions,
        !!day.actions?.critical, !!day.actions?.body, !!day.actions?.life,
        !!day.actions?.readingPrayer, !!day.actions?.outsideConnection,
        day.avoided || '', day.reflectionNote || '',
        !!day.august?.heartHealthNutrition, !!day.august?.whitening,
        !!day.august?.jawTraining, !!day.august?.ankleRehab,
        !!day.august?.ankleRecoveryVersion, day.symptoms?.detail || '',
        day.protocolNote || '', calendarEventsFor(date).map(event => event.title || event.summary).join('; ')
      ];
    });
    downloadFile(
      `project-52-history-v${PRIVATE_VERSION}-${activeDate()}.csv`,
      [head, ...rows].map(row => row.map(csvCell).join(',')).join('\n'),
      'text/csv'
    );
  };

  globalThis.NorthstarV40Diagnostics = Object.freeze({
    scheduledAugustHabits,
    radarValues,
    agendaDateFor,
    quietKneeEvidence,
    rtsEligibility,
    completedRtsCount
  });

  ensurePanels();
  bindV37();
  renderV37();
  startProject52Branding();
  const initialActiveDate = activeDate();
  const initialActiveDayExisted = Object.prototype.hasOwnProperty.call(state.days || {}, initialActiveDate);
  [0, 120, 500, 1500].forEach(delay => setTimeout(() => {
    if ((document.body.dataset.currentPage || 'home') === 'home') {
      removeTransientDay(initialActiveDate, initialActiveDayExisted);
    }
  }, delay));
  const hashPage = location.hash.replace('#', '');
  if (['home', 'today', 'recovery', 'mountains', 'goals', 'reviews', 'data'].includes(hashPage)) {
    setTimeout(() => showPage(hashPage), 0);
  } else if (!location.hash) {
    history.replaceState(null, '', '#home');
  }
  navigator.serviceWorker?.addEventListener?.('controllerchange', () => {
    $('v37UpdateStatus') && ($('v37UpdateStatus').textContent = 'Update installed · reload when ready');
  });
})();

/* Project 52 V42 — The Total Rebuild
 * August 1–December 31, 2026 active campaign.
 * Adds the low-friction Rebuild Entry, four-area pain review, exact workout
 * versioning, private Vision Compass, and evidence-backed weekly review.
 */
(() => {
  'use strict';

  const V42_VERSION = 42;
  const V42_START = '2026-08-01';
  const V42_END = '2026-12-31';
  const V42_RESET_ID = 'project-52-v42-total-rebuild-reset';
  const V42_PRE_RESET_KEY = 'sixMonthForge.preAugustTotalRebuild.v1';
  const V42_PHASES = {
    '2026-08': ['Reconnect', 'Re-establish honest contact with body, priorities, and people.'],
    '2026-09': ['Build', 'Repeat the correct minimum until the structure is dependable.'],
    '2026-10': ['Strengthen', 'Add responsible load, skill, and life leverage.'],
    '2026-11': ['Intensify', 'Use earned capacity without abandoning recovery.'],
    '2026-12': ['Prove It', 'Finish with objective evidence and a life you can trust.']
  };
  const V42_PAIN_AREAS = {
    knee: 'Left knee',
    ankle: 'Right foot / ankle',
    neck: 'Left neck / scapula',
    wrist: 'Right wrist'
  };
  const V42_WEEK = {
    0: {
      day: 'Sunday', title: 'Arms + chin-up volume', areas: ['chinUp'],
      sessions: ['Chin-up volume + technique', 'Arms emphasis', 'BFR TKE only when specifically cleared'],
      full: ['Submaximal chin-up volume with strict range', 'Skull crushers / curls / forearms from the established arm plan', 'Optional BFR TKE only within the current PT plan']
    },
    1: {
      day: 'Monday', title: 'Left quadriceps + chin-up speed', areas: ['chinUp', 'lowerBody'],
      sessions: ['Left quadriceps strength', 'Chin-up speed / technique exposure'],
      full: ['TKE, heel slides, glute bridge warm-up', 'Seated single-leg knee extension · 5 × 10', 'Heavy TKE · 5 × 12–15', 'Barbell hip thrust · 4 × 10', 'Heel sliders · 4 × 10', 'Hip abduction · 3 × 15; band clamshells · 3 × 12; Copenhagen · 3 × 8', 'Low-fatigue chin-up speed / technique work', 'Calf loading and BFR remain locked unless cleared']
    },
    2: {
      day: 'Tuesday', title: 'Chest support + recovery', areas: ['support'],
      sessions: ['Upper-body pressing support', 'Approved ankle / knee recovery minimum'],
      full: ['Incline barbell press · established working sets', 'Dumbbell fly and press · controlled volume', 'Push-ups · submaximal quality sets', 'Complete only the currently approved lower-body recovery minimum']
    },
    3: {
      day: 'Wednesday', title: 'Posterior chain + hip strength', areas: ['lowerBody'],
      sessions: ['Posterior-chain + hip strength'],
      full: ['Hip thrust · high-repetition working sets', 'Unilateral hip thrust · controlled sets', 'Single-leg hamstring roll / curl', 'Hamstring bridge isometric · 30-second holds', 'Green-band hamstring curl · 3 × 12', 'Hip abduction and Copenhagen work within clearance']
    },
    4: {
      day: 'Thursday', title: 'Weighted chin-up + back / biceps', areas: ['chinUp'],
      sessions: ['Weighted maximum-strength chin-up', 'Back and biceps support'],
      full: ['Weighted chin-up strength sets with repetitions in reserve', 'Video-verify major benchmark attempts', 'Straight-arm pulldown and cable-row support', 'Skull crushers, Arnold curls, incline curls, and seated raises from the written plan', 'No routine failure testing']
    },
    5: {
      day: 'Friday', title: 'Single-leg control + left quad', areas: ['lowerBody'],
      sessions: ['Single-leg control + pistol progression'],
      full: ['Single-leg RDL only when right-foot loading is cleared', 'Supported Bulgarian split squat only when cleared', 'TKE · controlled sets', 'Three-second eccentric step-down', 'Wall-sit hold within pain and swelling limits', 'Pistol progression only with stable knee, hip, foot, and pelvis']
    },
    6: {
      day: 'Saturday', title: 'Recovery + short core', areas: ['recovery'],
      sessions: ['Legitimate recovery', 'Optional short core / serratus work'],
      full: ['Rest or prescribed recovery', 'Optional hanging leg raise, bicycle, and plank sequence', 'Banded serratus drives with controlled eccentric and hold', 'No missed-session doubling']
    }
  };
  const V42_VERSION_NOTES = {
    Full: 'Complete the full cleared plan with clean form, appropriate RIR, and no routine failure work.',
    Compressed: 'Keep the primary work and one supporting movement; reduce total volume while preserving intent.',
    'Minimum effective': 'Complete the warm-up or readiness check plus the highest-value cleared work, then stop.',
    Recovery: 'Recovery is the Body Mission: prescribed rehabilitation, swelling control, mobility, sleep, nutrition, hydration, and glucose safety as appropriate.',
    Skipped: 'No Body Mission credit. If restriction-led recovery was the correct action, record Recovery instead.'
  };

  const meaningful = value => String(value || '').trim().length >= 8;
  const activePhaseArchive = () => (state.phaseArchives || []).find(item => item.id === V42_RESET_ID);
  const safeDate = date => /^\d{4}-\d{2}-\d{2}$/.test(String(date || '')) ? date : V42_START;
  const dayOfWeek = date => new Date(`${safeDate(date)}T12:00:00Z`).getUTCDay();

  function ensureV42State() {
    state.version = V42_VERSION;
    state.totalRebuild = state.totalRebuild || {};
    state.totalRebuild.mode = 'REGULAR MAX MODE';
    state.totalRebuild.campaignTitle = 'PROJECT 52: THE TOTAL REBUILD';
    state.totalRebuild.identity = 'I am not starting from nothing. I am starting again with experience.';
    state.totalRebuild.weeklyReviews = state.totalRebuild.weeklyReviews || {};
    state.totalRebuild.training = state.totalRebuild.training || {};
    state.totalRebuild.training.rollingTarget = { chinUp: 3, lowerBody: 3, ...(state.totalRebuild.training.rollingTarget || {}) };
    state.totalRebuild.training.logs = Array.isArray(state.totalRebuild.training.logs) ? state.totalRebuild.training.logs : [];
    state.totalRebuild.training.templateVersion = 'hudson-handwritten-august-v1';
    state.totalRebuild.training.template = deepClone(V42_WEEK);
    state.totalRebuild.training.chinUp = {
      baselinePR: 110, foundationTarget: 130, primaryTarget: 150, stretchTarget: 165,
      currentPhase: 'Foundation', nextBenchmark: '+115 lb with strict video-verified form',
      ...(state.totalRebuild.training.chinUp || {})
    };
    state.totalRebuild.training.lowerBody = {
      pistolBaselineReps: 6, pistolTargetReps: 10, weightedPistolTarget: '20–25 lb × 5',
      minimumSymmetry: 90, quadSymmetryTarget: 95, currentPhase: 'Rebuild control',
      nextBenchmark: 'Seven pristine bodyweight pistol squats with stable alignment',
      ...(state.totalRebuild.training.lowerBody || {})
    };
    state.privateBuild = state.privateBuild || {};
    state.privateBuild.release = 'v42-total-rebuild';
    state.privateBuild.journalPromptEvidence = ['expressive writing', 'self-compassionate meaning-making', 'implementation intentions'];
    safeSet(STORE_KEY, JSON.stringify(state));
  }

  function ensureV42Day(day, date = logDate()) {
    day.rebuildEntry = {
      truth: '', evidence: '', tomorrow: '', ifThen: '', deep: '',
      promptVersion: 'truth-progress-intention-v1', updatedAt: null,
      ...(day.rebuildEntry || {})
    };
    if (!day.rebuildEntry.deep && day.reflectionNote && !/The Truth:/i.test(day.reflectionNote)) {
      day.rebuildEntry.deep = day.reflectionNote;
    }
    const areas = day.painCheck?.areas || {};
    day.painCheck = {
      version: 1, date, recordedAt: day.painCheck?.recordedAt || null,
      copiedFrom: day.painCheck?.copiedFrom || null, areas: {}
    };
    Object.keys(V42_PAIN_AREAS).forEach(key => {
      const fallback = key === 'knee' ? Number(day.context?.kneePain || 0) : key === 'ankle' ? Number(day.context?.anklePain || 0) : 0;
      day.painCheck.areas[key] = {
        rest: fallback, load: fallback, trend: 'Same', flare: false, note: '',
        ...(areas[key] || {})
      };
    });
    day.training = {
      planDate: date, recommendedVersion: '', completedVersion: '', completedAt: null,
      autoCreditedBody: false, sessions: [],
      ...(day.training || {})
    };
    return day;
  }

  function rebuildEntryText(entry) {
    return [
      entry.truth && `The Truth: ${entry.truth}`,
      entry.evidence && `Evidence of Progress: ${entry.evidence}`,
      entry.tomorrow && `Tomorrow's Move: ${entry.tomorrow}`,
      entry.ifThen && `If–Then Plan: ${entry.ifThen}`,
      entry.deep && `Deep Entry: ${entry.deep}`
    ].filter(Boolean).join('\n');
  }

  function rebuildEntryComplete(day) {
    const entry = day?.rebuildEntry || {};
    return ['truth', 'evidence', 'tomorrow', 'ifThen', 'deep'].some(key => meaningful(entry[key]));
  }

  function readinessFor(day) {
    const context = day?.context || {};
    const areas = day?.painCheck?.areas || {};
    const loadingPain = Math.max(0, ...Object.values(areas).map(area => Number(area?.load || 0)));
    const fallbackPain = Math.max(Number(context.kneePain || 0), Number(context.anklePain || 0), Number(context.swelling || 0));
    const pain = Math.max(loadingPain, fallbackPain);
    const unsafeBG = ['Unstable', 'Needs attention'].includes(context.bg);
    if (unsafeBG || pain >= 7 || Number(context.energy || 5) <= 2) {
      return { level: 'RED', reason: unsafeBG ? 'Blood-glucose safety overrides productivity.' : pain >= 7 ? 'Symptoms require a restriction-led recovery plan.' : 'Very low energy makes the minimum recovery action the correct action.' };
    }
    const green = day?.dayType !== 'Post-Shift Recovery'
      && Number(context.sleep || 5) >= 7
      && Number(context.energy || 5) >= 7
      && Number(context.stress || 5) <= 5
      && pain <= 4;
    return green
      ? { level: 'GREEN', reason: 'Capacity supports the full or compressed cleared plan.' }
      : { level: 'YELLOW', reason: 'Protect the floor; reduce volume or use the minimum-effective version.' };
  }

  function trainingPlanFor(date = logDate(), sourceDay = getDay(date)) {
    const day = sourceDay || defaultDay(date);
    const template = V42_WEEK[dayOfWeek(date)];
    const readiness = readinessFor(day);
    const mode = day.dayType || (typeof suggestedDayTypeFor === 'function' ? suggestedDayTypeFor(date) : 'Off Day');
    let version = readiness.level === 'RED' || mode === 'Post-Shift Recovery'
      ? 'Recovery'
      : mode === 'Work Night'
        ? 'Minimum effective'
        : readiness.level === 'GREEN' ? 'Full' : 'Compressed';
    if (template.areas.includes('recovery') && version === 'Full') version = 'Recovery';
    return { date, day, template, readiness, mode, version };
  }

  function bodyMissionFor(plan) {
    if (plan.version === 'Recovery') return `Recovery version — ${V42_VERSION_NOTES.Recovery}`;
    return `${plan.version} ${plan.template.title}: ${plan.template.sessions.join(' + ')}. Use only currently cleared work.`;
  }

  function exerciseItemsFor(plan) {
    if (plan.version === 'Recovery') {
      return [
        'Complete prescribed rehabilitation, symptom management, mobility, or legitimate rest within current instructions.',
        'Protect sleep, nutrition, hydration, medication, and glucose safety as applicable.',
        'Do not double a missed session or unlock restricted loading because time has passed.'
      ];
    }
    if (plan.version === 'Minimum effective') {
      return plan.template.full.slice(0, Math.min(2, plan.template.full.length));
    }
    if (plan.version === 'Compressed') {
      return plan.template.full.slice(0, Math.min(3, plan.template.full.length));
    }
    return plan.template.full;
  }

  function syncPlannedBodyMission(day, plan) {
    day.missions = day.missions || {};
    const generic = !day.missions.body || /planned rehabilitation|minimum effective|recovery minimum|clinician-approved recovery|scheduled 20-minute approved/i.test(day.missions.body);
    if (!day.commandEdited || generic) day.missions.body = bodyMissionFor(plan);
    day.training.planDate = plan.date;
    day.training.recommendedVersion = plan.version;
    day.training.sessions = [...plan.template.sessions];
  }

  function rollingTraining(date = activeDate()) {
    const start = addDays(date, -6);
    const logs = (state.totalRebuild?.training?.logs || []).filter(log => log.date >= start && log.date <= date && !['', 'Skipped'].includes(log.completedVersion));
    return {
      chinUp: logs.filter(log => (log.areas || []).includes('chinUp')).length,
      lowerBody: logs.filter(log => (log.areas || []).includes('lowerBody')).length,
      logs
    };
  }

  function renderV42Pain() {
    const grid = $('v42PainGrid');
    if (!grid || !document.getElementById('today')?.classList.contains('active')) return;
    const date = logDate();
    const day = ensureV42Day(ensureDay(date), date);
    grid.innerHTML = Object.entries(V42_PAIN_AREAS).map(([key, label]) => {
      const row = day.painCheck.areas[key];
      return `<div class="v42PainRow" data-v42-pain-row="${key}">
        <div class="v42PainName"><b>${escapeHtml(label)}</b><small>${row.flare ? 'Flare logged' : 'No flare'}</small></div>
        <div class="field"><label class="formLabel" for="v42-${key}-rest">Rest</label><input id="v42-${key}-rest" data-v42-pain="${key}.rest" type="number" min="0" max="10" inputmode="numeric" value="${Number(row.rest || 0)}"></div>
        <div class="field"><label class="formLabel" for="v42-${key}-load">Loading</label><input id="v42-${key}-load" data-v42-pain="${key}.load" type="number" min="0" max="10" inputmode="numeric" value="${Number(row.load || 0)}"></div>
        <div class="field"><label class="formLabel" for="v42-${key}-trend">Trend</label><select id="v42-${key}-trend" data-v42-pain="${key}.trend">${['Better', 'Same', 'Worse'].map(value => `<option ${row.trend === value ? 'selected' : ''}>${value}</option>`).join('')}</select></div>
        <label class="tap v42Flare"><input data-v42-pain="${key}.flare" type="checkbox" ${row.flare ? 'checked' : ''}><span><b>Flare</b></span></label>
        <div class="field v42PainNote"><label class="formLabel" for="v42-${key}-note">Optional note</label><input id="v42-${key}-note" data-v42-pain="${key}.note" maxlength="180" value="${escapeAttr(row.note || '')}" placeholder="Trigger, location, response"></div>
      </div>`;
    }).join('');
    const maxLoad = Math.max(...Object.values(day.painCheck.areas).map(area => Number(area.load || 0)));
    $('v42PainSummary').textContent = day.painCheck.recordedAt
      ? `Saved for ${fmtDate(date)} · highest loading pain ${maxLoad}/10`
      : 'Review the four rows, then save once.';
  }

  function previousPainFor(date) {
    const active = Object.keys(state.days || {}).filter(key => key < date && state.days[key]?.painCheck?.recordedAt).sort().pop();
    if (active) return { date: active, areas: deepClone(state.days[active].painCheck.areas) };
    const archivedDays = activePhaseArchive()?.data?.days || {};
    const prior = Object.keys(archivedDays).filter(key => key < date).sort().pop();
    if (!prior) return null;
    const day = archivedDays[prior] || {};
    return {
      date: prior,
      areas: {
        knee: { rest: Number(day.context?.kneePain || 0), load: Number(day.context?.kneePain || 0), trend: 'Same', flare: false, note: '' },
        ankle: { rest: Number(day.context?.anklePain || 0), load: Number(day.context?.anklePain || 0), trend: 'Same', flare: false, note: '' },
        neck: { rest: 0, load: 0, trend: 'Same', flare: false, note: '' },
        wrist: { rest: 0, load: 0, trend: 'Same', flare: false, note: '' }
      }
    };
  }

  function renderV42Journal() {
    if (!$('rebuildTruth') || !document.getElementById('today')?.classList.contains('active')) return;
    const day = ensureV42Day(ensureDay(logDate()), logDate());
    const map = { rebuildTruth: 'truth', rebuildEvidence: 'evidence', rebuildTomorrow: 'tomorrow', rebuildIfThen: 'ifThen', dailyReflectionNote: 'deep' };
    Object.entries(map).forEach(([id, key]) => {
      const input = $(id);
      if (input && input.value !== String(day.rebuildEntry[key] || '')) input.value = day.rebuildEntry[key] || '';
    });
    const count = Object.values(day.rebuildEntry).filter(value => typeof value === 'string').join('').length;
    $('dailyReflectionCounter').textContent = `${count} / 4100`;
    $('dailyReflectionSummary').textContent = rebuildEntryComplete(day)
      ? 'Minimum Rebuild Entry complete.'
      : 'One meaningful sentence or one if–then plan counts.';
  }

  function renderV42Workout() {
    const mount = $('v42WorkoutOrder');
    if (!mount || !document.getElementById('today')?.classList.contains('active')) return;
    const date = logDate();
    const day = ensureV42Day(ensureDay(date), date);
    const plan = trainingPlanFor(date, day);
    const planBefore = JSON.stringify([day.missions?.body || '', day.training?.planDate || '', day.training?.recommendedVersion || '']);
    syncPlannedBodyMission(day, plan);
    const planChanged = planBefore !== JSON.stringify([day.missions?.body || '', day.training?.planDate || '', day.training?.recommendedVersion || '']);
    const completed = day.training.completedVersion;
    $('v42WorkoutBadge').textContent = completed ? `${completed} logged` : `${plan.version} recommended`;
    $('v42WorkoutBadge').className = `pill ${plan.readiness.level === 'GREEN' ? 'green' : plan.readiness.level === 'RED' ? 'red' : 'gold'}`;
    $('v42WorkoutSummary').textContent = `${plan.template.day} · ${plan.template.title} · ${plan.readiness.level}`;
    mount.innerHTML = `<div class="v42WorkoutTop"><div><div class="eyebrow">${escapeHtml(plan.readiness.level)} DAY · ${escapeHtml(plan.mode)}</div><h3>${escapeHtml(plan.template.title)}</h3><div class="mini">${escapeHtml(plan.readiness.reason)}</div></div><span class="pill">${escapeHtml(plan.version)}</span></div>
      <div class="notice">${escapeHtml(V42_VERSION_NOTES[plan.version])}</div>
      <div class="v42ExerciseList">${exerciseItemsFor(plan).map(item => `<div><span>▰</span><p>${escapeHtml(item)}</p></div>`).join('')}</div>`;
    $$('[data-v42-workout]').forEach(button => {
      button.classList.toggle('primary', button.dataset.v42Workout === completed);
      button.setAttribute('aria-pressed', String(button.dataset.v42Workout === completed));
    });
    if (planChanged) {
      state.lastSaved = new Date().toISOString();
      safeSet(STORE_KEY, JSON.stringify(state));
    }
  }

  function renderV42Campaign() {
    if (!$('v42CampaignDeck')) return;
    const date = activeDate();
    const day = getDay(date) || defaultDay(date);
    if (getDay(date)) ensureV42Day(day, date);
    const index = clamp(daysBetween(V42_START, date) + 1, 1, 153);
    const completed = Object.entries(state.days || {}).filter(([key, value]) => key >= V42_START && key <= V42_END && completedDay(value)).length;
    const elapsedStart = date < V42_START ? V42_START : addDays(date, -Math.min(6, index - 1));
    const weeklyDates = Object.keys(state.days || {}).filter(key => key >= elapsedStart && key <= date);
    const weeklyDone = weeklyDates.filter(key => completedDay(state.days[key])).length;
    const lifeDone = Object.entries(state.days || {}).filter(([key, value]) => key >= V42_START && key <= date && value.actions?.life).length;
    const rolling = rollingTraining(date);
    const physicalRatio = clamp((Math.min(3, rolling.chinUp) + Math.min(3, rolling.lowerBody)) / 6, 0, 1);
    const readiness = readinessFor(day);
    const phase = V42_PHASES[date.slice(0, 7)] || V42_PHASES['2026-12'];
    const plan = trainingPlanFor(date, day);
    const painSaved = !!day.painCheck?.recordedAt;
    const painMax = painSaved ? Math.max(...Object.values(day.painCheck.areas || {}).map(area => Number(area.load || 0))) : 0;
    $('v42CampaignDirective').textContent = `${date.slice(0, 7) === '2026-08' ? 'August' : fmtDate(`${date.slice(0, 7)}-01`, { month: 'long' })} — ${phase[0]} · ${phase[1]}`;
    $('v42CampaignDay').textContent = `${index} / 153`;
    $('v42CampaignCompleted').textContent = String(completed);
    $('v42CampaignRemaining').textContent = String(Math.max(0, 153 - index));
    $('v42CampaignPct').textContent = `${Math.round((completed / 153) * 100)}%`;
    $('v42CampaignLevel').textContent = `Level ${Number(state.momentum?.activeLevel || 0)}`;
    $('v42CampaignReadiness').textContent = readiness.level;
    $('v42CampaignReadiness').className = `smallNum v42Readiness ${readiness.level.toLowerCase()}`;
    if ($('v42WeeklyConsistency')) $('v42WeeklyConsistency').textContent = `${weeklyDone} / ${Math.max(1, daysBetween(elapsedStart, date) + 1)}`;
    if ($('v42PhysicalProgress')) $('v42PhysicalProgress').textContent = `${Math.round(physicalRatio * 100)}%`;
    if ($('v42LifeProgress')) $('v42LifeProgress').textContent = `${lifeDone} days`;
    $('v42HomeWorkout').textContent = `${plan.version} · ${plan.template.title}`;
    $('v42HomeWorkoutDetail').textContent = plan.readiness.reason;
    $('v42HomePain').textContent = painSaved ? `Saved · high load ${painMax}/10` : 'Not reviewed';
    $('v42HomeJournal').textContent = rebuildEntryComplete(day) ? 'Minimum complete' : 'Not started';
  }

  function renderV42MajorMissions() {
    if (!$('v42WeekMap')) return;
    const rolling = rollingTraining(activeDate());
    const training = state.totalRebuild.training;
    $('v42ChinMissionStatus').textContent = `${training.chinUp.currentPhase} · ${rolling.chinUp} / 3 rolling exposures`;
    $('v42ChinMissionBar').style.width = `${Math.min(100, rolling.chinUp / 3 * 100)}%`;
    $('v42ChinNext').textContent = `Next benchmark: ${training.chinUp.nextBenchmark}.`;
    $('v42LowerMissionStatus').textContent = `${training.lowerBody.currentPhase} · ${rolling.lowerBody} / 3 rolling exposures`;
    $('v42LowerMissionBar').style.width = `${Math.min(100, rolling.lowerBody / 3 * 100)}%`;
    $('v42LowerNext').textContent = `Next benchmark: ${training.lowerBody.nextBenchmark}.`;
    const todayDow = dayOfWeek(activeDate());
    $('v42WeekMap').innerHTML = Object.entries(V42_WEEK).map(([dow, item]) => `<div class="v42WeekDay ${Number(dow) === todayDow ? 'today' : ''}"><div class="v42WeekLabel"><b>${escapeHtml(item.day)}</b><span>${Number(dow) === todayDow ? 'TODAY' : item.areas.includes('chinUp') && item.areas.includes('lowerBody') ? 'CHIN + LOWER' : item.areas.includes('chinUp') ? 'CHIN' : item.areas.includes('lowerBody') ? 'LOWER' : 'SUPPORT'}</span></div><h3>${escapeHtml(item.title)}</h3><div class="mini">${escapeHtml(item.sessions.join(' · '))}</div></div>`).join('');
  }

  async function renderV42Vision() {
    const mount = $('v42VisionGrid');
    if (!mount) return;
    const photos = await getPhotos();
    const selected = photos.filter(photo => /Vision reference|Training plan|Right ankle\/foot/i.test(photo.category || '') && /Total Rebuild|supplied|vision|handwritten|current recovery/i.test(`${photo.caption || ''} ${photo.note || ''}`));
    const archive = activePhaseArchive();
    if (archive && !archive.photoManifest?.length && photos.length) {
      archive.photoManifest = photos.map(({ id, date, category, caption, weight, pain, officialMonthly, createdAt }) => ({ id, date, category, caption, weight, pain, officialMonthly, createdAt }));
      safeSet(STORE_KEY, JSON.stringify(state));
    }
    mount.innerHTML = selected.length ? selected.map(photo => `<figure class="v42VisionCard ${photo.category === 'Training plan' ? 'document' : ''}"><img src="${escapeAttr(photo.dataUrl)}" alt="${escapeAttr(photo.category)} private Project 52 reference" loading="lazy"><figcaption><b>${escapeHtml(photo.category)}</b><small>${escapeHtml(photo.caption || '')}</small></figcaption></figure>`).join('') : '<div class="notice">Import the private Total Rebuild backup to load the supplied physique, ankle, and handwritten training references. They are never included in the public upload package.</div>';
  }

  function weeklyEvidence(start = typeof weekSunday === 'function' ? weekSunday(activeDate()) : addDays(activeDate(), -dayOfWeek(activeDate()))) {
    const end = addDays(start, 6);
    const rows = Object.entries(state.days || {}).filter(([date]) => date >= start && date <= end).map(([date, day]) => ({ date, day }));
    const loads = rows.flatMap(({ day }) => Object.values(day.painCheck?.areas || {}).map(area => Number(area.load || 0)));
    const averageSleep = avg(rows.map(({ day }) => Number(day.context?.sleep || 0)).filter(Number.isFinite));
    const lapses = rows.filter(({ day }) => day.completeDayAt && !day.actions?.noSlither).length;
    const lifeDays = rows.filter(({ day }) => day.actions?.life).length;
    const physical = rollingTraining(end);
    return { start, end, rows, maxLoad: loads.length ? Math.max(...loads) : 0, averageSleep, lapses, lifeDays, physical };
  }

  function buildWeeklySynthesis() {
    const evidence = weeklyEvidence();
    const openAdmin = (state.admin || []).filter(item => !item.complete).sort((a, b) => String(a.due || '9999').localeCompare(String(b.due || '9999')))[0];
    const physicalPriority = evidence.maxLoad >= 6
      ? 'Settle the highest-loading pain area and complete only the clinician-approved Recovery or rehabilitation version.'
      : evidence.physical.lowerBody < 3
        ? 'Complete the next cleared lower-body exposure and document next-day pain or swelling.'
        : evidence.physical.chinUp < 3
          ? 'Complete the next technically clean chin-up exposure without routine failure testing.'
          : 'Repeat the current 3 + 3 rolling physical rhythm without adding load prematurely.';
    const lifePriority = openAdmin ? `Close this highest-leverage open loop: ${openAdmin.title}.` : 'Choose one relationship, career, finance, or administration action and finish it completely.';
    const stop = evidence.lapses ? 'Stop bargaining with the attention boundary after the first urge.' : evidence.averageSleep && evidence.averageSleep < 6 ? 'Stop borrowing from the protected sleep block.' : evidence.lifeDays < 3 ? 'Stop carrying avoidable two-minute tasks into the next day.' : 'Stop adding low-value work after the completed-day definition is already met.';
    const repeat = evidence.rows.filter(({ day }) => day.actions?.noSlither).length >= Math.max(1, evidence.rows.length - 1)
      ? 'Repeat the environment and blocker setup that protected attention.'
      : evidence.rows.filter(({ day }) => day.actions?.body).length >= Math.max(1, evidence.rows.length / 2)
        ? 'Repeat matching the Body Mission to actual capacity instead of emotion.'
        : 'Repeat one honest check-in and one next action before seeking motivation.';
    const bottleneck = String($('weeklyBottleneck')?.value || '').trim();
    const obstacle = bottleneck ? bottleneck.replace(/[.?!]+$/, '').slice(0, 110) : 'I notice avoidance or the urge to escape';
    const ifThen = `If ${obstacle}, then I will put the phone away and begin the smallest valid mission for five minutes at the next planned work block.`;
    return { ...evidence, physicalPriority, lifePriority, stop, repeat, ifThen, generatedAt: new Date().toISOString() };
  }

  function synthesisHtml(plan) {
    const rows = [
      ['Physical priority', plan.physicalPriority], ['Life priority', plan.lifePriority],
      ['Behavior to stop', plan.stop], ['Behavior to repeat', plan.repeat], ['If–then plan', plan.ifThen]
    ];
    return rows.map(([label, value]) => `<div class="v42SynthesisRow"><span>${escapeHtml(label)}</span><p>${escapeHtml(value)}</p></div>`).join('');
  }

  function renderV42Weekly() {
    const mount = $('v42WeeklySynthesis');
    if (!mount) return;
    const start = typeof weekSunday === 'function' ? weekSunday(activeDate()) : addDays(activeDate(), -dayOfWeek(activeDate()));
    const saved = state.totalRebuild?.weeklyReviews?.[start]?.synthesis;
    mount.innerHTML = saved ? synthesisHtml(saved) : '<div class="notice">Save the three answers to generate one physical priority, one life priority, one behavior to stop, one behavior to repeat, and one if–then plan from this week’s actual evidence.</div>';
  }

  function saveV42WeeklyReview() {
    const start = typeof weekSunday === 'function' ? weekSunday(activeDate()) : addDays(activeDate(), -dayOfWeek(activeDate()));
    const synthesis = buildWeeklySynthesis();
    state.totalRebuild.weeklyReviews[start] = {
      start, end: addDays(start, 6),
      movedForward: $('weeklyWin')?.value.trim() || '',
      pulledBackward: $('weeklyBottleneck')?.value.trim() || '',
      adjustment: $('weeklyPriority')?.value.trim() || '',
      synthesis,
      savedAt: new Date().toISOString()
    };
    save();
    renderV42Weekly();
  }

  function renderV42Archive() {
    const panel = $('v41ArchivePanel');
    if (!panel) return;
    let mount = $('v42ArchiveTimeline');
    if (!mount) {
      $('v41ArchiveSummary')?.insertAdjacentHTML('afterend', '<div class="spacer"></div><details><summary>View read-only archived day ledger</summary><div class="detailsBody"><div class="v42ArchiveTimeline" id="v42ArchiveTimeline"></div></div></details>');
      mount = $('v42ArchiveTimeline');
    }
    const archive = activePhaseArchive();
    const days = Object.entries(archive?.data?.days || {}).sort(([a], [b]) => b.localeCompare(a));
    mount.innerHTML = days.length ? days.map(([date, day]) => {
      const journal = day.reflectionNote || day.rebuildEntry?.truth || '';
      return `<details class="historyDay"><summary><b>${fmtDate(date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</b><span class="pill">${day.completeDayAt ? 'Completed' : 'Saved'}</span><span class="mini">${escapeHtml(day.dayType || '—')}</span></summary><div class="historyBody"><div class="small"><b>Body:</b> ${day.actions?.body ? 'completed' : 'not checked'} · <b>Life:</b> ${day.actions?.life ? 'completed' : 'not checked'} · <b>Attention:</b> ${day.actions?.noSlither ? 'protected' : 'not protected'}</div><div class="small"><b>Pain:</b> knee ${Number(day.context?.kneePain || 0)} · ankle ${Number(day.context?.anklePain || 0)} · swelling ${Number(day.context?.swelling || 0)}</div>${journal ? `<div class="small"><b>Journal:</b> ${escapeHtml(journal)}</div>` : ''}<div class="mini">Read-only archived evidence</div></div></details>`;
    }).join('') : '<div class="notice">No pre-reset daily records were present.</div>';
  }

  function downloadV42Archive() {
    const archive = activePhaseArchive();
    if (!archive) return toast('The preservation archive is not available');
    downloadFile(`project-52-v42-previous-project-archive-${activeDate()}.json`, JSON.stringify({ app: 'Project 52', version: V42_VERSION, exportedAt: new Date().toISOString(), readOnly: true, archive }, null, 2));
  }

  function downloadV42AutoBackup() {
    const raw = safeGet(V42_PRE_RESET_KEY);
    if (!raw) return toast('No automatic pre-reset backup is stored in this browser');
    downloadFile(`project-52-v42-automatic-pre-reset-backup-${activeDate()}.json`, raw);
  }

  function logWorkout(version) {
    const date = logDate();
    const day = ensureV42Day(ensureDay(date), date);
    const plan = trainingPlanFor(date, day);
    day.training.recommendedVersion = plan.version;
    day.training.completedVersion = version;
    day.training.completedAt = new Date().toISOString();
    day.training.sessions = [...plan.template.sessions];
    day.training.areas = [...plan.template.areas];
    const valid = version !== 'Skipped';
    if (valid) {
      day.actions.body = true;
      if (plan.template.areas.some(area => ['lowerBody', 'recovery'].includes(area)) || version === 'Recovery') day.actions.rehab = true;
      day.actions.restrictions = true;
      day.training.autoCreditedBody = true;
    } else if (day.training.autoCreditedBody) {
      day.actions.body = false;
      day.training.autoCreditedBody = false;
    }
    const logs = state.totalRebuild.training.logs;
    const existing = logs.findIndex(log => log.date === date);
    const record = { date, completedVersion: version, recommendedVersion: plan.version, sessions: [...plan.template.sessions], areas: [...plan.template.areas], at: day.training.completedAt };
    if (existing >= 0) logs.splice(existing, 1, record); else logs.push(record);
    save();
    renderToday();
    renderHome();
    renderV42MajorMissions();
    toast(`${version} Body Mission logged`);
  }

  function savePainReview() {
    const date = logDate();
    const day = ensureV42Day(ensureDay(date), date);
    day.painCheck.recordedAt = new Date().toISOString();
    day.context.kneePain = Math.max(Number(day.painCheck.areas.knee.rest || 0), Number(day.painCheck.areas.knee.load || 0));
    day.context.anklePain = Math.max(Number(day.painCheck.areas.ankle.rest || 0), Number(day.painCheck.areas.ankle.load || 0));
    save();
    renderToday();
    renderHome();
    toast('Four-area pain check saved');
  }

  function usePreviousPain() {
    const date = logDate();
    const prior = previousPainFor(date);
    if (!prior) return toast('No earlier pain check is available');
    const day = ensureV42Day(ensureDay(date), date);
    day.painCheck.areas = deepClone(prior.areas);
    day.painCheck.copiedFrom = prior.date;
    day.painCheck.recordedAt = null;
    save();
    renderV42Pain();
    toast(`Loaded ${fmtDate(prior.date)} values · review and save`);
  }

  function saveJournalInput(input) {
    const keys = { rebuildTruth: 'truth', rebuildEvidence: 'evidence', rebuildTomorrow: 'tomorrow', rebuildIfThen: 'ifThen', dailyReflectionNote: 'deep' };
    const key = keys[input.id];
    if (!key) return;
    const day = ensureV42Day(ensureDay(logDate()), logDate());
    day.rebuildEntry[key] = input.value.trim();
    day.rebuildEntry.updatedAt = new Date().toISOString();
    day.reflectionNote = rebuildEntryText(day.rebuildEntry);
    save();
    renderV42Journal();
  }

  function completedDayRequirements(day) {
    return [
      { key: 'critical', met: !!day.actions?.critical, label: 'Complete or appropriately modify the Critical Mission', target: 'missionTaps' },
      { key: 'body', met: !!day.actions?.body, label: 'Complete the assigned Body Mission', target: 'v42WorkoutPanel' },
      { key: 'life', met: !!day.actions?.life, label: 'Complete one meaningful Life Mission', target: 'missionTaps' },
      { key: 'pain', met: !!day.painCheck?.recordedAt, label: 'Review and save the four-area pain check', target: 'v42PainPanel' },
      { key: 'journal', met: rebuildEntryComplete(day), label: 'Complete the minimum Rebuild Entry', target: 'dailyReflectionPanel' }
    ];
  }

  function guardDayClose(event) {
    if (!event.target.closest('#completeDay')) return;
    const day = ensureV42Day(ensureDay(logDate()), logDate());
    const missing = completedDayRequirements(day).filter(item => !item.met);
    if (!missing.length) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const first = missing[0];
    const target = $(first.target);
    if (target?.tagName === 'DETAILS') target.open = true;
    target?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    toast(`Day remains open: ${first.label}`);
  }

  function handleV42Input(event) {
    if (['rebuildTruth', 'rebuildEvidence', 'rebuildTomorrow', 'rebuildIfThen', 'dailyReflectionNote'].includes(event.target?.id)) {
      saveJournalInput(event.target);
      return;
    }
    const descriptor = event.target?.dataset?.v42Pain;
    if (!descriptor) return;
    const [area, key] = descriptor.split('.');
    const day = ensureV42Day(ensureDay(logDate()), logDate());
    const value = key === 'flare' ? !!event.target.checked : ['rest', 'load'].includes(key) ? clamp(Number(event.target.value || 0), 0, 10) : event.target.value;
    day.painCheck.areas[area][key] = value;
    day.painCheck.recordedAt = null;
    save();
  }

  function bindV42() {
    if (globalThis.__project52V42Bound) return;
    globalThis.__project52V42Bound = true;
    document.addEventListener('click', guardDayClose, true);
    document.addEventListener('input', handleV42Input);
    document.addEventListener('change', handleV42Input);
    document.addEventListener('click', event => {
      const workout = event.target.closest('[data-v42-workout]');
      if (workout) return logWorkout(workout.dataset.v42Workout);
      if (event.target.closest('#v42SavePain')) return savePainReview();
      if (event.target.closest('#v42UsePreviousPain')) return usePreviousPain();
      if (event.target.closest('#v42DownloadArchive')) return downloadV42Archive();
      if (event.target.closest('#v42DownloadAutoBackup')) return downloadV42AutoBackup();
      if (event.target.closest('#saveWeekly')) setTimeout(saveV42WeeklyReview, 0);
    });
  }

  officialPhotoMonths = function (photos) {
    return new Set((photos || []).filter(photo => photo.officialMonthly && String(photo.category || '').startsWith('Physique') && String(photo.date || '') >= V42_START).map(photo => String(photo.date).slice(0, 7))).size;
  };

  const weeklyPacketV42Base = weeklyPacket;
  weeklyPacket = function () {
    const base = weeklyPacketV42Base();
    const start = typeof weekSunday === 'function' ? weekSunday(activeDate()) : addDays(activeDate(), -dayOfWeek(activeDate()));
    const row = state.totalRebuild?.weeklyReviews?.[start];
    const plan = row?.synthesis || buildWeeklySynthesis();
    return `${base}\n\nWEEKLY REBUILD REVIEW\n- What moved me forward: ${row?.movedForward || $('weeklyWin')?.value || '—'}\n- What repeatedly pulled me backward: ${row?.pulledBackward || $('weeklyBottleneck')?.value || '—'}\n- One adjustment to test: ${row?.adjustment || $('weeklyPriority')?.value || '—'}\n\nFIELD PLAN\n- Physical priority: ${plan.physicalPriority}\n- Life priority: ${plan.lifePriority}\n- Stop: ${plan.stop}\n- Repeat: ${plan.repeat}\n- If–then: ${plan.ifThen}`;
  };

  const renderHomeV42Base = renderHome;
  renderHome = function () {
    const value = renderHomeV42Base();
    renderV42Campaign();
    return value;
  };

  const renderTodayV42Base = renderToday;
  renderToday = function () {
    const value = renderTodayV42Base();
    renderV42Pain();
    renderV42Journal();
    renderV42Workout();
    return value;
  };

  const renderGoalsV42Base = renderGoals;
  renderGoals = async function () {
    const value = await renderGoalsV42Base();
    renderV42MajorMissions();
    await renderV42Vision();
    return value;
  };

  const renderReviewsV42Base = renderReviews;
  renderReviews = function () {
    const value = renderReviewsV42Base();
    renderV42Weekly();
    if ($('weeklyPacket')) $('weeklyPacket').value = weeklyPacket();
    return value;
  };

  const renderSettingsV42Base = renderSettings;
  renderSettings = function () {
    const value = renderSettingsV42Base();
    if ($('appVersion')) $('appVersion').textContent = 'v42 · Total Rebuild';
    renderV42Archive();
    return value;
  };

  ensureV42State();
  bindV42();
  renderV42Campaign();
  renderV42MajorMissions();
  renderV42Archive();
  if (document.getElementById('today')?.classList.contains('active')) {
    renderV42Pain();
    renderV42Journal();
    renderV42Workout();
  }
  renderV42Weekly();
  renderV42Vision().catch(() => {});
  globalThis.Project52V42Diagnostics = Object.freeze({
    trainingPlanFor,
    rollingTraining,
    rebuildEntryComplete,
    completedDayRequirements,
    readinessFor,
    buildWeeklySynthesis,
    activePhaseArchive
  });
})();
