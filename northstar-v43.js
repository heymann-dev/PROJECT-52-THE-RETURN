/*
 * Project 52 V40 — original field-command identity bridge.
 *
 * This layer restores the familiar V35 military/expedition presentation while
 * leaving V40 data, scoring, recovery, migration, and safety logic untouched.
 */

:root {
  --v40-field-gold: #e7bd69;
  --v40-field-blue: #74c4ff;
  --v40-field-green: #52d47e;
  --v40-field-steel: #2a3437;
  --v40-field-carbon: #071018;
  --v40-field-khaki: #b8ae82;
}

/* V40 had hidden a few visual-only details from the established design. */
.nav::after {
  display: block !important;
}

.nav button[data-page]::before,
.nav button[data-page]::after {
  display: block !important;
}

.card::after,
.goalHero::after {
  display: block !important;
}

/* Keep the familiar weekly briefing and proximity signals without restoring
   the older duplicate command-entry surface. */
#v34DailyCommand {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) !important;
  margin: 12px 0 !important;
}

#v34DailyCommand > .v34CommandPrimary {
  display: none !important;
}

#v34DailyCommand > .v34CommandIntel {
  display: block !important;
  grid-column: 1 / -1 !important;
}

#v29MomentumHUD,
#v29BossPanel,
#rankMaintenancePanel,
#rankAccountabilityPanel {
  display: none !important;
}

/* New V40 modules use the same rugged plate language as the original app. */
.v37Coach,
.v38WeeklyMission,
.v39August,
.v39Web,
.v40RtsHome,
.v40RtsCommand,
.v40RtsRewardCenter,
.v40InstallCard {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(184, 174, 130, .30) !important;
  border-left: 7px solid var(--page-accent, var(--v40-field-gold)) !important;
  border-radius: 8px !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2' seed='31'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='.12'/%3E%3C/svg%3E"),
    repeating-linear-gradient(97deg, rgba(255, 255, 255, .015) 0, rgba(255, 255, 255, .015) 1px, transparent 1px, transparent 6px),
    linear-gradient(145deg, rgba(42, 52, 55, .96), rgba(8, 16, 11, .99) 66%) !important;
  box-shadow:
    0 15px 34px rgba(0, 0, 0, .44),
    inset 0 1px 0 rgba(255, 255, 255, .08),
    inset 0 -1px 0 rgba(0, 0, 0, .45) !important;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%) !important;
}

.v37Coach::before,
.v38WeeklyMission::before,
.v39August::before,
.v39Web::before,
.v40RtsHome::before,
.v40RtsCommand::before,
.v40RtsRewardCenter::before,
.v40InstallCard::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: var(--page-accent, var(--v40-field-gold));
  box-shadow: 0 0 16px rgba(var(--page-accent-rgb), .42);
  pointer-events: none;
}

.v37Coach::after,
.v38WeeklyMission::after,
.v39August::after,
.v39Web::after,
.v40RtsHome::after,
.v40RtsCommand::after,
.v40RtsRewardCenter::after,
.v40InstallCard::after {
  content: "";
  display: block !important;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #cbd5dc, #586572 43%, #111820 48%, #05090d 70%) !important;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, .55) !important;
  pointer-events: none;
}

.v37Coach {
  margin: 14px 0 12px !important;
  border-color: rgba(231, 189, 105, .46) !important;
}

.v37CoachTop,
.v37PanelTop,
.v40RtsHomeTop,
.v40RtsHero {
  padding-right: 15px;
}

.v37CoachTop h2,
.v37PanelTop h2,
.v40RtsHomeTop h2,
.v40RtsHero h2 {
  letter-spacing: .045em !important;
  text-transform: uppercase !important;
}

.v37CoachQuestion {
  padding: 9px 11px;
  border-left: 5px solid var(--v40-field-gold);
  color: #fff5d8 !important;
  background:
    repeating-linear-gradient(105deg, rgba(255, 255, 255, .018) 0 2px, transparent 2px 8px),
    rgba(231, 189, 105, .065);
  font-family: var(--font-command) !important;
  letter-spacing: .055em;
  text-transform: uppercase;
}

.v37Mode,
.v37Mission,
.v37AgendaItem,
.v37SmartPreview,
.v37EvidenceItem,
.v38MissionRow,
.v38StakeGrid > div,
.v39Progress,
.v40RtsHomeGrid > div,
.v40RtsMilestone,
.v40LsiRow,
.v40RtsRewardItem {
  border-radius: 6px !important;
  border-color: rgba(184, 174, 130, .23) !important;
  background-image:
    repeating-linear-gradient(112deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 7px),
    linear-gradient(145deg, rgba(35, 46, 45, .80), rgba(4, 11, 8, .82)) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .055),
    inset 0 -2px 0 rgba(0, 0, 0, .32) !important;
}

.v37Mode {
  min-height: 62px;
  padding: 11px;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  font-family: var(--font-command) !important;
  letter-spacing: .035em;
  text-transform: uppercase;
}

.v37Mode[aria-pressed="true"] {
  color: #071009 !important;
  border-color: #eee8d1 !important;
  background-image:
    repeating-linear-gradient(115deg, rgba(0, 0, 0, .08) 0 2px, transparent 2px 7px),
    linear-gradient(180deg, var(--page-accent), rgba(var(--page-accent-rgb), .74)) !important;
  box-shadow:
    0 0 0 2px #f5f1dd,
    0 10px 24px rgba(var(--page-accent-rgb), .34),
    inset 0 2px 0 rgba(255, 255, 255, .32),
    inset 0 -4px 0 rgba(0, 0, 0, .25) !important;
}

.v37Mode small {
  font-family: var(--font-field) !important;
  letter-spacing: .01em;
  text-transform: none;
}

.v37Capacity {
  border-radius: 4px !important;
  background: rgba(0, 0, 0, .34);
  font-family: var(--font-command) !important;
  text-shadow: 1px 1px 0 #000;
}

.v37Mission {
  position: relative;
  min-height: 98px;
  border-left-width: 5px !important;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
}

.v37Mission b,
.v38MissionRow b,
.v39Progress span,
.v40RtsHomeGrid span,
.v40RtsReward span {
  font-family: var(--font-command) !important;
  letter-spacing: .055em;
  text-transform: uppercase;
}

.v37AgendaItem time {
  font-family: var(--font-mono) !important;
}

.v38WeeklyMission {
  border-left-color: var(--v40-field-blue) !important;
}

.v39August {
  border-left-color: var(--v40-field-gold) !important;
}

.v39Web {
  border-left-color: var(--violet) !important;
}

.v40RtsHome,
.v40RtsCommand {
  border-left-color: var(--v40-field-green) !important;
}

.v39Progress,
.v40RtsHomeGrid > div,
.v38StakeGrid > div {
  min-height: 78px;
}

.v39Schedule,
.v40RtsGate {
  border-radius: 0 5px 5px 0 !important;
  background:
    repeating-linear-gradient(112deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 8px),
    rgba(231, 189, 105, .07) !important;
}

.v40RtsMilestone.ready,
.v40RtsRewardItem.unlocked {
  border-color: rgba(231, 189, 105, .58) !important;
  background-image:
    repeating-linear-gradient(112deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 7px),
    linear-gradient(145deg, rgba(93, 72, 33, .34), rgba(4, 11, 8, .86)) !important;
}

.v40RtsMilestone.complete,
.v40RtsRewardItem.claimed {
  border-color: rgba(82, 212, 126, .48) !important;
  background-image:
    repeating-linear-gradient(112deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 7px),
    linear-gradient(145deg, rgba(32, 89, 48, .31), rgba(4, 11, 8, .86)) !important;
}

.v40RtsBadge,
.v40RtsRewardIndex,
.v40RtsHeroCount {
  border-radius: 5px !important;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  font-family: var(--font-command) !important;
}

#v40SpecialOperationsHead {
  margin-top: 22px;
}

#v40SpecialOperationsHead::before {
  content: "V43 THE RETURN";
  display: inline-block;
  margin-right: 10px;
  color: rgba(255, 255, 255, .48);
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .12em;
}

.mobileCardAccordionHeader {
  display: none !important;
}

@media (min-width: 761px) {
  .nav {
    width: auto !important;
  }
}

@media (max-width: 760px) {
  html {
    scroll-padding-bottom: 84px;
  }

  .shell {
    display: block !important;
    padding: calc(7px + var(--safeTop)) 7px calc(84px + var(--safeBottom)) !important;
  }

  /* One navigation system on phones: retain the familiar color-coded dock. */
  .shell > .nav {
    display: none !important;
  }

  .main {
    width: 100%;
    min-width: 0;
  }

  .page.active {
    padding: 8px !important;
  }

  .v37Coach,
  .v38WeeklyMission,
  .v39August,
  .v39Web,
  .v40RtsHome,
  .v40RtsCommand,
  .v40RtsRewardCenter,
  .v40InstallCard {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%) !important;
  }

  .v37ModeGrid {
    grid-template-columns: 1fr !important;
  }

  .v37MissionGrid,
  .v37EvidenceGrid,
  .v37FinanceGrid,
  .v37SmartLogGrid,
  .v38MissionSafety,
  .v38StakeGrid,
  .v39ProgressGrid,
  .v39LipidGrid,
  .v40RtsSnapshot,
  .v40RtsChecks,
  .v40RtsRewardGrid {
    grid-template-columns: 1fr !important;
  }

  .v40RtsHomeGrid {
    grid-template-columns: 1fr !important;
  }

  .v37Mission.definition,
  .v40RtsHomeGrid > div:first-child {
    grid-column: auto !important;
  }

  .v32MobileDock {
    border-color: rgba(184, 174, 130, .34) !important;
    border-radius: 8px !important;
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' seed='9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E"),
      linear-gradient(180deg, rgba(42, 52, 55, .98), rgba(9, 15, 11, .98)) !important;
    box-shadow:
      0 16px 36px rgba(0, 0, 0, .58),
      inset 0 1px 0 rgba(255, 255, 255, .08),
      inset 0 -3px 0 rgba(0, 0, 0, .48) !important;
  }

  .v32MobileDock button {
    border-radius: 5px !important;
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
    font-family: var(--font-command) !important;
    text-transform: uppercase;
  }
}

.v41SystemGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.v41SystemItem {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  padding: 11px;
  border: 1px solid rgba(220, 236, 247, .13);
  border-radius: 12px;
  background: rgba(255, 255, 255, .03);
}

.v41SystemItem > span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #dcecf7;
  background: rgba(220, 236, 247, .10);
  font-weight: 950;
}

.v41SystemItem b,
.v41SystemItem small {
  display: block;
}

.v41SystemItem small {
  margin-top: 4px;
  color: var(--muted);
}

.v41SystemItem.pass {
  border-color: rgba(82, 212, 126, .30);
}

.v41SystemItem.pass > span {
  color: #07111d;
  background: #52d47e;
}

.v41SystemItem.warn {
  border-color: rgba(231, 189, 105, .38);
}

.v41SystemItem.warn > span {
  color: #07111d;
  background: #e7bd69;
}

.v41SystemItem.fail {
  border-color: rgba(255, 112, 112, .42);
}

.v41SystemItem.fail > span {
  color: #07111d;
  background: #ff7070;
}

@media (max-width: 760px) {
  .v41SystemGrid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 390px) {
  .page.active {
    border-width: 2px !important;
  }

  .v37Coach,
  .v38WeeklyMission,
  .v39August,
  .v39Web,
  .v40RtsHome,
  .v40RtsCommand {
    padding: 12px !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

/* Project 52 V40 mobile sweep — final authority over legacy layout layers. */
@media (max-width: 760px) {
  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    -webkit-text-size-adjust: 100%;
    padding: 0 !important;
  }

  .shell {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 100dvh;
    padding:
      calc(6px + env(safe-area-inset-top))
      calc(6px + env(safe-area-inset-right))
      calc(74px + env(safe-area-inset-bottom))
      calc(6px + env(safe-area-inset-left)) !important;
  }

  .main,
  .page,
  .page.active,
  .card,
  details,
  .detailsBody,
  .hero,
  .sectionHead,
  .actions,
  .formGrid,
  .grid2,
  .grid3,
  .grid4 {
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box;
  }

  .page.active {
    width: 100% !important;
    overflow: clip;
    padding: 7px !important;
  }

  h1 { font-size: clamp(25px, 9vw, 40px) !important; }
  h2 { overflow-wrap: anywhere; }
  p,
  span,
  small,
  .mini,
  .notice { overflow-wrap: anywhere; }

  input,
  select,
  textarea,
  button {
    max-width: 100%;
    font-size: 16px;
  }

  textarea { min-height: 104px; }

  .actions {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }

  .actions > button,
  .actions > .action,
  .action {
    width: 100%;
    min-height: 46px;
    white-space: normal;
  }

  .formGrid,
  .grid,
  .grid2,
  .grid3,
  .grid4,
  .v37ModeGrid,
  .v37MissionGrid,
  .v37EvidenceGrid,
  .v37FinanceGrid,
  .v37SmartLogGrid,
  .v38MissionSafety,
  .v38StakeGrid,
  .v39ProgressGrid,
  .v39LipidGrid,
  .v40RtsSnapshot,
  .v40RtsChecks,
  .v40RtsRewardGrid,
  .v40RtsHomeGrid {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .grid > .span3,
  .grid > .span4,
  .grid > .span5,
  .grid > .span6,
  .grid > .span7,
  .grid > .span8,
  .grid > .span12,
  .grid > .sectionHead {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  .v37AgendaItem,
  .v38MissionRow {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .v37AgendaItem time { margin-bottom: 3px; }

  .tap {
    min-width: 0;
    align-items: flex-start;
  }

  .tap > span { min-width: 0; }

  details > summary {
    min-height: 48px;
    gap: 8px;
    cursor: pointer;
  }

  details > summary > * {
    pointer-events: auto !important;
    min-width: 0;
  }

  .mobileAccordionToolbar {
    position: sticky !important;
    top: calc(4px + env(safe-area-inset-top)) !important;
    z-index: 40 !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin: 0 0 9px !important;
    padding: 6px !important;
    border: 1px solid rgba(184, 174, 130, .32);
    border-radius: 9px;
    background: rgba(8, 14, 13, .94);
    box-shadow: 0 8px 20px rgba(0, 0, 0, .32);
    backdrop-filter: blur(12px);
  }

  .mobileAccordionToolbar button {
    min-height: 40px;
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .035em;
  }

  .v31MobileSection {
    min-height: 50px;
    padding-right: 50px !important;
    cursor: pointer;
  }

  .mobileSectionToggle,
  .mobileCardAccordionToggle {
    width: 40px !important;
    min-width: 40px !important;
    min-height: 40px !important;
    padding: 0 !important;
    font-size: 18px !important;
  }

  .mobileCardAccordionHeader {
    display: flex !important;
    min-width: 0;
    min-height: 48px;
    cursor: pointer;
  }

  .mobileCardAccordionHeader b {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .v37Coach,
  .v38WeeklyMission,
  .v39August,
  .v39Web,
  .v40RtsHome,
  .v40RtsCommand,
  .v40RtsRewardCenter,
  .v40InstallCard {
    padding: 13px !important;
  }

  .v37CoachTop,
  .v37PanelTop,
  .v40RtsHomeTop,
  .v40RtsHero {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .v37Capacity {
    width: fit-content;
    margin-top: 6px;
  }

  .v37Mode {
    width: 100%;
    min-height: 62px;
    padding: 12px;
  }

  .v37Mission {
    min-height: 0;
  }

  .v37SmartPreview {
    min-height: 92px;
  }

  .v32MobileDock {
    left: calc(4px + env(safe-area-inset-left)) !important;
    right: calc(4px + env(safe-area-inset-right)) !important;
    bottom: calc(4px + env(safe-area-inset-bottom)) !important;
    display: grid !important;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 2px !important;
    width: auto !important;
    padding: 4px !important;
    overflow: visible !important;
  }

  .v32MobileDock button {
    width: 100% !important;
    min-width: 0 !important;
    min-height: 48px !important;
    padding: 5px 1px !important;
    font-size: clamp(6px, 1.8vw, 8px) !important;
    line-height: 1.05;
  }

  .v32MobileDock .dockIcon {
    font-size: 15px !important;
  }
}

@media (max-width: 370px) {
  .page.active { padding: 4px !important; }
  .card,
  .v37Coach,
  .v38WeeklyMission,
  .v39August,
  .v39Web,
  .v40RtsHome,
  .v40RtsCommand { padding: 10px !important; }
}

/* V41 daily-command consolidation. */
.v41NotAssigned {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
  padding: 12px;
  border: 1px dashed rgba(220, 236, 247, .18);
  border-radius: 12px;
  background: rgba(255, 255, 255, .025);
  color: var(--muted);
}

.v41NotAssigned b,
.v41NotAssigned small,
.v41AnkleMission b,
.v41AnkleMission small {
  display: block;
}

.v41NotAssigned small,
.v41AnkleMission small {
  margin-top: 4px;
}

.v41MissionMark {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(220, 236, 247, .18);
  border-radius: 50%;
  font-weight: 900;
}

.v41AnkleMission {
  padding: 12px;
  border: 1px solid rgba(116, 196, 255, .28);
  border-radius: 14px;
  background: rgba(116, 196, 255, .055);
}

.v41AnkleMissionTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
}

.v41AnkleChoices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 760px) {
  .v41AnkleMissionTop,
  .v41AnkleChoices {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .v41AnkleMissionTop .pill {
    width: fit-content;
  }
}

/* V43 — The Return. One military command surface, no parallel dashboard. */
.v42CampaignDeck {
  position: relative;
  overflow: hidden;
  margin-top: 14px;
  padding: clamp(16px, 3vw, 26px);
  border: 1px solid rgba(231, 189, 105, .34);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(231, 189, 105, .11), transparent 42%),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 11px),
    linear-gradient(160deg, rgba(16, 38, 62, .98), rgba(7, 20, 34, .98));
  box-shadow: 0 18px 46px rgba(0, 0, 0, .28);
}

.v42CampaignDeck::before {
  content: "THE RETURN · 153 DAYS";
  position: absolute;
  top: 13px;
  right: -42px;
  padding: 5px 48px;
  color: rgba(255, 229, 170, .38);
  border-block: 1px solid rgba(231, 189, 105, .18);
  font-size: 8px;
  font-weight: 950;
  letter-spacing: .16em;
  transform: rotate(34deg);
  pointer-events: none;
}

.v42CampaignHead,
.v42WorkoutTop,
.v42WeekLabel {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.v42CampaignHead h2 {
  max-width: 760px;
  margin: 5px 0 4px;
  font-size: clamp(19px, 3vw, 29px);
  line-height: 1.08;
}

.v42CampaignStats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.v42CampaignStats .metric {
  min-height: 78px;
  background: rgba(255, 255, 255, .035);
}

.v42Readiness.green { color: #bcffcd; }
.v42Readiness.yellow { color: var(--gold2); }
.v42Readiness.red { color: #ffd0d0; }

.v42MissionBriefGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.v42MissionBriefGrid > div {
  min-width: 0;
  padding: 11px;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 14px;
  background: rgba(0, 0, 0, .13);
}

.v42MissionBriefGrid b,
.v42MissionBriefGrid small {
  display: block;
  overflow-wrap: anywhere;
}

.v42MissionBriefGrid b { margin-top: 3px; line-height: 1.3; }
.v42MissionBriefGrid small { margin-top: 4px; color: var(--muted); }

.rebuildEntryGrid,
.v42MajorGrid,
.v42WeeklyQuestions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.rebuildDeepEntry { margin-top: 10px; }
.reflectionCounter { margin-top: 8px; text-align: right; color: var(--muted); font-size: 11px; }

.v42PainGrid { display: grid; gap: 8px; }
.v42PainRow {
  display: grid;
  grid-template-columns: minmax(132px, 1.25fr) 74px 74px 112px 92px minmax(150px, 1.5fr);
  gap: 8px;
  align-items: end;
  padding: 11px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 15px;
  background: rgba(255, 255, 255, .035);
}

.v42PainName { align-self: center; min-width: 0; }
.v42PainName b,
.v42PainName small { display: block; }
.v42PainName small { margin-top: 3px; color: var(--muted); }
.v42Flare { min-height: 44px; padding: 9px; }

.v42WorkoutOrder {
  padding: 14px;
  border: 1px solid rgba(231, 189, 105, .22);
  border-radius: 17px;
  background: linear-gradient(150deg, rgba(231, 189, 105, .075), rgba(255, 255, 255, .025));
}

.v42WorkoutTop h3 { margin: 4px 0; font-size: 19px; }
.v42ExerciseList { display: grid; gap: 7px; margin-top: 10px; }
.v42ExerciseList > div {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, .075);
}
.v42ExerciseList > div:last-child { border-bottom: 0; }
.v42ExerciseList span { color: var(--gold); }
.v42ExerciseList p { margin: 0; line-height: 1.35; }
.v42WorkoutChoices { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 7px; }
.v42WorkoutChoices .action { min-width: 0; padding-inline: 6px; }

.v42MajorGrid { margin-bottom: 10px; }
.v42TargetRow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  margin-top: 10px;
}
.v42TargetRow span {
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 11px;
  color: var(--muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.v42TargetRow b { display: block; margin-top: 2px; color: var(--text); font-size: 14px; }

.v42WeekMap { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.v42WeekDay {
  min-width: 0;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 14px;
  background: rgba(255, 255, 255, .03);
}
.v42WeekDay.today {
  border-color: rgba(231, 189, 105, .4);
  background: linear-gradient(145deg, rgba(231, 189, 105, .13), rgba(255, 255, 255, .025));
  box-shadow: inset 3px 0 0 var(--gold);
}
.v42WeekLabel span {
  color: var(--gold2);
  font-size: 8px;
  font-weight: 950;
  letter-spacing: .1em;
}
.v42WeekDay h3 { margin: 8px 0 5px; }

.v42VisionGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}
.v42VisionCard {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(231, 189, 105, .2);
  border-radius: 15px;
  background: rgba(255, 255, 255, .035);
}
.v42VisionCard img { display: block; width: 100%; height: 250px; object-fit: cover; }
.v42VisionCard.document img { object-fit: contain; background: #d7d3c7; }
.v42VisionCard figcaption { display: grid; gap: 3px; padding: 10px; }
.v42VisionCard small { color: var(--muted); line-height: 1.35; }

.v42WeeklySynthesis { display: grid; gap: 7px; }
.v42SynthesisRow {
  display: grid;
  grid-template-columns: minmax(118px, .42fr) minmax(0, 1fr);
  gap: 10px;
  padding: 10px;
  border-left: 3px solid var(--gold);
  border-radius: 0 12px 12px 0;
  background: rgba(231, 189, 105, .06);
}
.v42SynthesisRow span { color: var(--gold2); font-size: 10px; font-weight: 950; text-transform: uppercase; }
.v42SynthesisRow p { margin: 0; line-height: 1.4; }

.v42ArchiveTimeline { display: grid; gap: 8px; }

@media (max-width: 900px) {
  .v42PainRow {
    grid-template-columns: minmax(120px, 1fr) repeat(3, minmax(72px, .55fr));
  }
  .v42PainNote { grid-column: 2 / -1; }
  .v42Flare { grid-column: 1; }
}

@media (max-width: 760px) {
  .v42CampaignDeck { padding: 14px; border-radius: 18px; }
  .v42CampaignDeck::before { display: none; }
  .v42CampaignHead,
  .v42WorkoutTop { display: grid; grid-template-columns: minmax(0, 1fr); }
  .v42CampaignHead > .pill,
  .v42WorkoutTop > .pill { width: fit-content; }
  .v42CampaignStats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .v42MissionBriefGrid,
  .rebuildEntryGrid,
  .v42MajorGrid,
  .v42WeeklyQuestions,
  .v42WeekMap,
  .v42VisionGrid { grid-template-columns: minmax(0, 1fr); }
  .v42PainRow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
  .v42PainName,
  .v42PainNote { grid-column: 1 / -1; }
  .v42Flare { grid-column: auto; align-self: end; }
  .v42WorkoutChoices { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .v42WorkoutChoices .action:last-child { grid-column: 1 / -1; }
  .v42VisionCard img { height: min(68vw, 330px); }
  .v42SynthesisRow { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 390px) {
  .v42CampaignStats,
  .v42PainRow,
  .v42WorkoutChoices,
  .v42TargetRow { grid-template-columns: minmax(0, 1fr); }
  .v42PainName,
  .v42PainNote,
  .v42WorkoutChoices .action:last-child { grid-column: auto; }
  .v42CampaignStats .metric { min-height: 68px; }
}
