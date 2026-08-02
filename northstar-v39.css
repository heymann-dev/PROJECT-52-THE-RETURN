/* Project 52 v39
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

  const PRIVATE_VERSION = 39;
  const V37_PHASE_START = '2026-07-29';
  const V37_LAPSE_DATE = '2026-07-28';
  const PRE_IMPORT_STATE_KEY = 'sixMonthForge.preImportRollback.v2';
  const ZERO_TOLERANCE_AWARD = 100;
  const ZERO_TOLERANCE_CONSEQUENCE = 200;
  const MISSION_DAY_CREDIT = 250;
  const DEFAULT_PRAYER = 'God, give me clarity for the next right action, discipline to protect what matters, humility to tell the truth, and patience to rebuild without shame. Help me care for my body, serve people well, and choose real life over escape. Amen.';
  const LEGACY_ZERO_TOLERANCE = 'No intentional Slither. No loopholes, hidden use, or bargaining. An urge is not a failure. If a lapse happens, log it once, reset the active streak and affected reward qualification, restore the blocker, and begin the next right action immediately. Project 52, earned XP, permanent levels, rehabilitation, goals, finances, photos, and history never reset.';
  const DEFAULT_ZERO_TOLERANCE = 'No intentional Slither. No loopholes, hidden use, or bargaining. An urge is not a failure. When the day is explicitly closed, checking the Zero-Tolerance Standard earns 100 XP; leaving it unchecked records the lapse, subtracts 200 active Momentum XP, and lowers the active Momentum level by one. The active streak and affected reward qualification reset, but lifetime XP, permanent rank, Project 52, rehabilitation, goals, finances, photos, and history remain protected. Restore the blocker and begin the next right action without shame.';
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
      value: () => milestoneComplete('returnSport'),
      target: 1
    }
  ];

  let pendingSmartLog = null;

  function adminComplete(id) {
    return state.admin?.some(item => item.id === id && item.complete) ? 1 : 0;
  }

  function milestoneComplete(key) {
    const row = state.evidenceMilestones?.[key];
    if (!row || row.status !== 'Complete') return 0;
    return EVIDENCE_MILESTONES[key]?.requiresClearance && !row.clearance ? 0 : 1;
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

  function ensureV37State(target = state) {
    target.version = PRIVATE_VERSION;
    target.settings = target.settings || {};
    target.settings.programStart = '2026-07-15';
    target.settings.programEnd = '2026-12-31';
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
    ensureCashViews(target);
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
    ensureWeeklyMissions(target);
    ensureAugustFoundation(target);
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
    return target;
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
    return {
      ...merged,
      permanent: existing.permanent !== false,
      penaltiesDisabledAt: existing.penaltiesDisabledAt || null
    };
  };

  ensureV37State(state);
  safeSet(STORE_KEY, JSON.stringify(state));

  if (Array.isArray(V29_PATCHES)) {
    EXTRA_PATCHES.forEach(def => {
      if (!V29_PATCHES.some(existing => existing.id === def.id)) V29_PATCHES.push(def);
    });
  }

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
    const baseGrossXP = Number(metrics.grossXP ?? metrics.totalXP ?? 0);
    const grossXP = baseGrossXP + zeroToleranceBonus + missionDayBonus;
    return {
      ...metrics,
      baseGrossXP,
      zeroToleranceBonus,
      missionDayBonus,
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
  levelRequirements = function (level, metrics = levelMetrics()) {
    const result = levelRequirementsV36(level, metrics);
    const forge = result.requirements.find(item => item.label === 'Forge XP');
    if (forge) {
      forge.target = xpTarget(level);
      forge.met = Number(forge.value) >= forge.target;
    }
    result.met = result.requirements.every(item => item.met);
    return result;
  };

  updateLevelProgress = function () {
    state.levelSystem = defaultLevelSystem(state.levelSystem);
    const metrics = levelMetrics();
    let eligible = 1;
    for (let level = 2; level <= 50; level += 1) {
      if (levelRequirements(level, metrics).met) eligible = level;
      else break;
    }
    const permanent = Math.max(
      1,
      eligible,
      Number(state.levelSystem.highestEarned || 1),
      Number(state.levelSystem.activeLevel || 1)
    );
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
    const previousXP = xpTarget(current);
    const nextXP = xpTarget(next);
    const nextRatio = current >= 50
      ? 1
      : clamp((metrics.totalXP - previousXP) / Math.max(1, nextXP - previousXP), 0, 1);
    return {
      current,
      peak: current,
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

  function commandFor(date = activeDate()) {
    const day = getDay(date);
    const events = calendarEventsFor(date);
    const mode = inferredMode(date, day, events);
    const capacity = capacityFor(day, mode);
    const sleep = eventBy(events, /sleep|post[- ]shift recovery/i);
    const rehab = eventBy(events, /rehab|physical therapy|\bPT\b/i);
    const augustAnkle = scheduledAugustHabits(date).ankle;
    const review = eventBy(events, /midweek review|daily check[- ]in|review/i);
    const work = eventBy(events, /night shift|noc|\bwork\b/i);
    const openAdmin = nextOpenAdmin();
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
      life = review
        ? `Complete ${review.title || review.summary} at ${eventTime(review)}.`
        : openAdmin
          ? `Move one life-administration loop: ${openAdmin.title}.`
          : 'Complete one administration, relationship, career, or outside-time action.';
    }

    const optional = capacity.level === 'GREEN' && mode !== 'Post-Shift Recovery'
      ? 'Use the best remaining energy for one extra high-value action, then stop.'
      : null;
    const dopamine = mode === 'Post-Shift Recovery'
      ? 'Phone away from bed; use brief prayer, reading, calm audio, or a low-stimulation reset.'
      : 'Use prayer, reading, outside time, meaningful work, or real connection instead of the avoidance loop.';
    const definition = mode === 'Post-Shift Recovery'
      ? 'Main sleep protected, recovery handled honestly, scheduled review/check-in completed, attention protected or accurately logged, and the day closed.'
      : mode === 'Work Night'
        ? 'Shift prepared for safely, recovery minimum respected, one life loop moved, attention protected or accurately logged, and the day closed.'
        : 'One meaningful mission completed, body work matched to restrictions, one life action finished, attention protected or accurately logged, and the day closed.';
    return { date, day, events, mode, capacity, critical, body, life, optional, dopamine, definition };
  }

  function momentumLevelForXP(xp, cap = Number(state.levelSystem?.highestEarned || 1)) {
    let level = 1;
    for (let candidate = 2; candidate <= Math.min(50, cap); candidate += 1) {
      if (Number(xp) >= xpTarget(candidate)) level = candidate;
      else break;
    }
    return level;
  }

  function settleZeroTolerance(date, day) {
    ensureMomentum(state);
    if (day.zeroToleranceSettlement) return day.zeroToleranceSettlement;
    const kept = !!day.actions?.noSlither;
    const beforeXP = Math.max(0, Number(state.momentum.currentXP || 0));
    const beforeLevel = Math.max(1, Number(state.momentum.activeLevel || state.levelSystem.highestEarned || 1));
    const xpDelta = kept ? ZERO_TOLERANCE_AWARD : -ZERO_TOLERANCE_CONSEQUENCE;
    const afterXP = Math.max(0, beforeXP + xpDelta);
    const afterLevel = kept
      ? Math.max(beforeLevel, momentumLevelForXP(afterXP))
      : Math.max(1, beforeLevel - 1);
    const settlement = {
      id: `zero-tolerance-${date}`,
      date,
      outcome: kept ? 'kept' : 'unchecked',
      xpDelta,
      permanentXP: kept ? ZERO_TOLERANCE_AWARD : 0,
      beforeXP,
      afterXP,
      beforeLevel,
      afterLevel,
      at: new Date().toISOString()
    };
    day.zeroToleranceSettlement = settlement;
    state.momentum.currentXP = afterXP;
    state.momentum.activeLevel = afterLevel;
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
    const used = new Set((state.weeklyMissions.history || [])
      .filter(item => item.category === category)
      .map(item => item.poolId));
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
    state.momentum.activeLevel = Math.max(
      Number(state.momentum.activeLevel || 1),
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

  function ensureCoachPanel() {
    if ($('v37Coach')) return;
    const hero = $('home')?.querySelector('.hero');
    hero?.insertAdjacentHTML('afterend', `
      <section class="card v37Coach" id="v37Coach" aria-labelledby="v37CoachTitle">
        <div class="v37CoachTop">
          <div>
            <div class="eyebrow">Private adaptive command</div>
            <h2 id="v37CoachTitle">Project 52 Coach</h2>
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
        <div class="sectionHead"><h2>Daily command</h2><div class="mini">one decision per category</div></div>
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
            <div class="smallNum" id="v37UpdateStatus">Installed v39</div>
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
      mode: 'Apple Health export import',
      lastImportAt: null,
      sourceName: '',
      daily: {},
      recordCount: 0,
      privacy: 'On-device import; never used for automatic medical or medication decisions.',
      ...target.healthBridge
    };
    target.healthBridge.daily = target.healthBridge.daily || {};
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
    if (!$('v39AugustDaily')) {
      const anchor = $('missionTaps')?.closest('.card');
      anchor?.insertAdjacentHTML('afterend', `
        <div class="sectionHead" id="v39AugustDaily"><h2>August Supporting Habits</h2><div class="mini">calendar-aware · no duplicate missions</div></div>
        <div class="card"><div id="v39AugustDailyChecks"></div></div>
      `);
    }
    if (!$('v39AppleHealth')) {
      $('v37CalendarBridge')?.parentElement?.insertAdjacentHTML('beforeend', `
        <div class="sectionHead" id="v39AppleHealth"><h2>Apple Health Bridge</h2><div class="mini">private export import</div></div>
        <div class="card">
          <div class="v37PanelTop"><div><div class="smallNum" id="v39HealthStatus">No Apple Health data imported</div>
          <div class="mini">The offline PWA imports Apple Health export.xml or a CSV on device. Direct background HealthKit sync belongs in the native iPhone phase and requires explicit Apple permissions.</div></div>
          <label class="action blue" for="v39HealthFile">Import export</label><input class="hidden" id="v39HealthFile" type="file" accept=".xml,.csv,text/xml,text/csv"/>
          </div><div id="v39HealthSummary" class="v39HealthGrid"></div>
        </div>
      `);
    }
    const select = $('photoCategory');
    BASELINE_VIEWS.forEach(label => {
      if (select && ![...select.options].some(option => option.value === label)) select.add(new Option(label, label));
    });
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
    if (schedule.ankle) rows.push(`<label class="tap"><input data-v39-day="ankleRehab" type="checkbox" ${values.ankleRehab ? 'checked' : ''}><span><b>20-minute approved right-ankle rehabilitation</b><small>This is today’s Body Mission. Check pain, swelling, gait/limp, instability, sleep/energy, glucose readiness and restrictions first.</small></span></label>
      <label class="tap"><input data-v39-day="ankleRecoveryVersion" type="checkbox" ${values.ankleRecoveryVersion ? 'checked' : ''}><span><b>Approved Recovery version</b><small>Counts when capacity is RED or symptoms exceed approved limits. Never double a missed session.</small></span></label>`);
    $('v39AugustDailyChecks').innerHTML = rows.length ? rows.join('') : '<div class="notice">No August Foundation habit is scheduled for this date. The normal Project 52 command remains active.</div>';
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

  function parseAppleHealthXml(text) {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('Apple Health XML could not be read');
    const daily = {};
    [...doc.querySelectorAll('Record')].forEach(record => {
      const type = record.getAttribute('type') || '';
      const date = (record.getAttribute('startDate') || '').slice(0, 10);
      const value = Number(record.getAttribute('value'));
      if (!date || !Number.isFinite(value)) return;
      const row = daily[date] ||= { steps: 0, activeEnergy: 0, restingHeartRate: [], weight: [] };
      if (/StepCount$/.test(type)) row.steps += value;
      if (/ActiveEnergyBurned$/.test(type)) row.activeEnergy += value;
      if (/RestingHeartRate$/.test(type)) row.restingHeartRate.push(value);
      if (/BodyMass$/.test(type)) row.weight.push(value);
    });
    Object.values(daily).forEach(row => {
      row.restingHeartRate = row.restingHeartRate.length ? Math.round(avg(row.restingHeartRate)) : null;
      row.weight = row.weight.length ? Number(avg(row.weight).toFixed(1)) : null;
      row.steps = Math.round(row.steps);
      row.activeEnergy = Math.round(row.activeEnergy);
    });
    return daily;
  }

  function parseAppleHealthCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error('Apple Health CSV has no records');
    const headers = lines[0].split(',').map(value => value.trim().replace(/^"|"$/g, '').toLowerCase());
    const daily = {};
    lines.slice(1).forEach(line => {
      const cells = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
      const date = (cells[headers.findIndex(value => /date|start/.test(value))] || '').slice(0, 10);
      if (!date) return;
      const row = daily[date] ||= {};
      headers.forEach((header, index) => {
        const value = Number(cells[index]);
        if (!Number.isFinite(value)) return;
        if (/steps?/.test(header)) row.steps = value;
        if (/active.*energy/.test(header)) row.activeEnergy = value;
        if (/resting.*heart/.test(header)) row.restingHeartRate = value;
        if (/weight|body.*mass/.test(header)) row.weight = value;
      });
    });
    return daily;
  }

  async function importAppleHealth(file) {
    try {
      const text = await file.text();
      const incoming = file.name.toLowerCase().endsWith('.xml') ? parseAppleHealthXml(text) : parseAppleHealthCsv(text);
      ensureAugustFoundation(state);
      state.healthBridge.daily = { ...state.healthBridge.daily, ...incoming };
      state.healthBridge.lastImportAt = new Date().toISOString();
      state.healthBridge.sourceName = file.name;
      state.healthBridge.recordCount = Object.keys(incoming).length;
      save();
      renderHealthBridge();
      toast(`${Object.keys(incoming).length} Apple Health day summaries imported on device`);
    } catch (error) {
      toast(error.message || 'Apple Health import failed');
    }
  }

  function renderHealthBridge() {
    if (!$('v39HealthStatus')) return;
    ensureAugustFoundation(state);
    const bridge = state.healthBridge;
    $('v39HealthStatus').textContent = bridge.lastImportAt
      ? `${Object.keys(bridge.daily).length} daily summaries · ${new Date(bridge.lastImportAt).toLocaleString()}`
      : 'No Apple Health data imported';
    const latestDate = Object.keys(bridge.daily).sort().pop();
    const latest = bridge.daily[latestDate] || {};
    $('v39HealthSummary').innerHTML = latestDate ? [
      progressTile('Latest day', latestDate),
      progressTile('Steps', latest.steps == null ? '—' : String(Math.round(latest.steps))),
      progressTile('Active energy', latest.activeEnergy == null ? '—' : `${Math.round(latest.activeEnergy)} kcal`),
      progressTile('Resting HR', latest.restingHeartRate == null ? '—' : `${Math.round(latest.restingHeartRate)} bpm`),
      progressTile('Weight', latest.weight == null ? '—' : String(latest.weight))
    ].join('') : '';
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
    hideDuplicateSurfaces();
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
    $('v37CalendarSource').textContent = state.calendar?.lastSyncAt
      ? `${state.calendar.source || 'Calendar'} · synced ${new Date(state.calendar.lastSyncAt).toLocaleString()}`
      : 'Local agenda · no automatic sync configured';
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
      ? `${fmtDate(logDate())} settled ${settlement.outcome === 'kept' ? `+${settlement.xpDelta} XP` : `${settlement.xpDelta} Momentum XP and Level ${settlement.afterLevel}`}. Re-saving will not apply it twice.`
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
    $('v37CalendarStatus').textContent = `${count} stored event${count === 1 ? '' : 's'} · ${calendarEventsFor(activeDate()).length} today`;
    const hasRollback = !!safeGet(PRE_IMPORT_STATE_KEY);
    $('v37RestoreRollback').disabled = !hasRollback;
    $('v37RollbackStatus').textContent = hasRollback
      ? 'A pre-import state and photo rollback point is available.'
      : 'No pre-import rollback point is currently stored.';
  }

  function renderV37() {
    ensurePanels();
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
    renderHealthBridge();
    if ($('avoidedToday')) $('avoidedToday').value = getDay(logDate())?.avoided || '';
    if ($('appVersion')) $('appVersion').textContent = 'v39 · August foundation';
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
      ? settlement.xpDelta > 0
        ? ` · Zero-Tolerance +${settlement.xpDelta} XP`
        : ` · Momentum ${settlement.xpDelta} XP · Level ${settlement.afterLevel}`
      : ' · original settlement preserved';
    toast(`Daily Quest complete · ${adaptive.status} · ${adaptive.total} XP${stake}`);
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
      if (event.target.closest('#v37ShareBackup')) return shareBackup();
      if (event.target.closest('#v37RestoreRollback')) return restorePreImportRollback();
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
      if (event.target?.id === 'v39HealthFile' && event.target.files?.[0]) importAppleHealth(event.target.files[0]);
      if (event.target?.id === 'v39WebRange') renderRadar();
      if (event.target?.matches?.('[data-v39-day]')) {
        const day = ensureDay(logDate());
        const august = ensureAugustDay(day);
        august[event.target.dataset.v39Day] = event.target.checked;
        if (event.target.dataset.v39Day === 'ankleRehab' && event.target.checked) august.ankleRecoveryVersion = false;
        if (event.target.dataset.v39Day === 'ankleRecoveryVersion' && event.target.checked) august.ankleRehab = false;
        save();
        renderAugustDaily();
        renderAugustFoundation();
        renderRadar();
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

  function removeTransientDay(date, wasMeaningful) {
    if (wasMeaningful || !state.days?.[date] || hasMeaningfulDayEvidence(state.days[date], date)) return;
    delete state.days[date];
    safeSet(STORE_KEY, JSON.stringify(state));
  }

  const renderHomeV36 = renderHome;
  renderHome = function () {
    const date = activeDate();
    const wasMeaningful = hasMeaningfulDayEvidence(getDay(date), date);
    renderHomeV36();
    removeTransientDay(date, wasMeaningful);
    renderV37();
  };

  const renderTodayV36 = renderToday;
  renderToday = function () {
    ensurePanels();
    renderTodayV36();
    if ($('avoidedToday')) $('avoidedToday').value = getDay(logDate())?.avoided || '';
    renderPolicy();
    renderZeroToleranceStake();
    renderCoach();
    renderWeeklyMission();
  };

  const renderGoalsV36 = renderGoals;
  renderGoals = async function () {
    const value = await renderGoalsV36();
    renderCashReserve();
    renderRewardReset();
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
    const wasMeaningful = hasMeaningfulDayEvidence(getDay(date), date);
    renderAllV36Private();
    if ((document.body.dataset.currentPage || 'home') !== 'today') removeTransientDay(date, wasMeaningful);
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

  ensurePanels();
  bindV37();
  renderV37();
  const initialActiveDate = activeDate();
  const initialActiveDayWasMeaningful = hasMeaningfulDayEvidence(getDay(initialActiveDate), initialActiveDate);
  [0, 120, 500, 1500].forEach(delay => setTimeout(() => {
    if ((document.body.dataset.currentPage || 'home') === 'home') {
      removeTransientDay(initialActiveDate, initialActiveDayWasMeaningful);
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
