/* Project 52 v40 — private command-center refinement */
:root {
  --v37-navy: #071521;
  --v37-navy-2: #0c2233;
  --v37-gold: #e7bd69;
  --v37-ice: #dcecf7;
}

.v40WallBuild {
  width: min(100%, 560px);
  margin-top: 18px;
  padding: 11px 12px 10px;
  border: 1px solid rgba(231, 189, 105, .30);
  border-left: 5px solid var(--v37-gold);
  border-radius: 8px;
  background:
    repeating-linear-gradient(102deg, rgba(255, 255, 255, .018) 0 1px, transparent 1px 7px),
    linear-gradient(145deg, rgba(4, 13, 20, .78), rgba(26, 34, 34, .72));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 12px 30px rgba(0, 0, 0, .24);
  backdrop-filter: blur(4px);
}
.v40WallTop,
.v40WallFoot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}
.v40WallTop div {
  display: grid;
  gap: 2px;
}
.v40WallTop span,
.v40WallFoot {
  color: #b6c4ca;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.v40WallTop b {
  color: #fff1ca;
  font-size: 14px;
  letter-spacing: .035em;
  text-transform: uppercase;
}
.v40WallTop strong {
  color: var(--v37-gold);
  font: 950 19px/1 var(--display);
  white-space: nowrap;
}
.v40StoneCourse {
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  gap: 3px;
  margin: 9px 0 8px;
}
.v40StoneCourse i {
  display: block;
  height: 9px;
  border: 1px solid rgba(171, 186, 186, .18);
  border-radius: 2px;
  background: linear-gradient(145deg, rgba(116, 132, 132, .20), rgba(22, 31, 32, .64));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .035);
  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;
}
.v40StoneCourse i.laid {
  border-color: rgba(255, 225, 154, .64);
  background: linear-gradient(145deg, #f0cd83, #a97d3c);
  box-shadow: 0 0 8px rgba(231, 189, 105, .22), inset 0 1px 0 rgba(255, 255, 255, .30);
}
.v40StoneCourse.historic i:not(.laid) {
  border-color: rgba(231, 189, 105, .30);
  box-shadow: inset 0 0 0 1px rgba(231, 189, 105, .07);
}
.v40WallBuild.earned {
  border-color: rgba(231, 189, 105, .56);
}
.v40WallFoot {
  align-items: center;
  letter-spacing: .025em;
  text-transform: none;
}
.v40WallFoot span:last-child {
  color: #ffe6a3;
  text-align: right;
}
@media(max-width:560px) {
  .v40WallBuild { margin-top: 14px; padding: 9px 10px; }
  .v40StoneCourse { gap: 2px; }
  .v40StoneCourse i { height: 8px; }
  .v40WallFoot { align-items: flex-start; flex-direction: column; gap: 3px; }
  .v40WallFoot span:last-child { text-align: left; }
}
@media(prefers-reduced-motion:reduce) {
  .v40StoneCourse i { transition: none; }
}

.v39August{border-color:rgba(231,189,105,.48);background:linear-gradient(145deg,rgba(231,189,105,.09),rgba(10,29,46,.97))}
.v39ProgressGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0}
.v39Progress{min-height:82px;padding:11px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.04);display:flex;flex-direction:column;gap:4px}
.v39Progress span{font-size:9px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.v39Progress b{font-size:17px;color:#fff}.v39Progress small{font-size:9px;color:var(--gold2)}
.v39BaselineGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:10px 0}
.v39LipidGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:8px 0 16px}
.v39Schedule{padding:10px;margin-bottom:10px;border-left:3px solid var(--gold);background:rgba(231,189,105,.08);color:#f3dfb3;font-size:11px;line-height:1.5}
.v39WebLayout{display:grid;grid-template-columns:minmax(260px,420px) 1fr;align-items:center;gap:18px}
#v39Radar{width:100%;max-height:390px;overflow:visible}
.v39RadarRing{fill:none;stroke:rgba(255,255,255,.13);stroke-width:1}
.v39RadarAxis{stroke:rgba(255,255,255,.12);stroke-width:1}
.v39RadarShape{fill:rgba(231,189,105,.25);stroke:#e7bd69;stroke-width:3;filter:drop-shadow(0 0 8px rgba(231,189,105,.25))}
.v39RadarLabel{fill:#cbd9e8;font-size:8px;font-weight:800}
.v39RadarMetric{display:grid;grid-template-columns:1fr auto;gap:12px;padding:9px;border-bottom:1px solid var(--line)}
.v39RadarMetric span{font-size:11px;color:var(--muted)}.v39RadarMetric b{color:var(--gold2)}
.v39HealthGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:12px}
@media(max-width:780px){.v39ProgressGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.v39LipidGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.v39WebLayout{grid-template-columns:1fr}.v39HealthGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:520px){.v39BaselineGrid,.v39ProgressGrid,.v39LipidGrid{grid-template-columns:1fr}}

.v40DexcomMission{margin-top:14px;border-color:rgba(116,196,255,.35);background:linear-gradient(145deg,rgba(116,196,255,.08),rgba(255,255,255,.025))}
.v40DexcomSteps{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v40InstallCard{display:flex;align-items:center;justify-content:space-between;gap:16px;background:linear-gradient(135deg,rgba(231,189,105,.1),rgba(116,196,255,.06))}
.v40InstallCard .action{min-width:150px}
@media(max-width:560px){.v40DexcomSteps{grid-template-columns:1fr}.v40InstallCard{align-items:stretch;flex-direction:column}.v40InstallCard .action{width:100%}}

.v40RtsHome {
  margin: 14px 0 18px;
  overflow: hidden;
  border-color: rgba(231, 189, 105, .38) !important;
  background:
    radial-gradient(circle at 100% 0, rgba(116, 196, 255, .13), transparent 23rem),
    linear-gradient(145deg, rgba(18, 43, 62, .98), rgba(5, 18, 29, .99) 70%) !important;
}
.v40RtsHomeTop,
.v40RtsHero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.v40RtsHomeTop h2,
.v40RtsHero h2 { margin: 4px 0; }
.v40RtsCount {
  min-width: 94px;
  color: var(--gold2);
  font: 900 22px/1 var(--display);
  text-align: right;
}
.v40RtsHomeGrid {
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}
.v40RtsHomeGrid > div {
  display: grid;
  gap: 4px;
  min-height: 92px;
  padding: 11px;
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 13px;
  background: rgba(255, 255, 255, .035);
}
.v40RtsHomeGrid span,
.v40RtsReward span {
  color: var(--muted);
  font-size: 9px;
  font-weight: 950;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.v40RtsHomeGrid b { color: #fff; font-size: 15px; }
.v40RtsHomeGrid small { color: var(--muted); line-height: 1.4; }

.v40RtsCommand {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  border-color: rgba(116, 196, 255, .32) !important;
  background:
    radial-gradient(circle at 88% -5%, rgba(231, 189, 105, .16), transparent 26rem),
    linear-gradient(145deg, rgba(15, 39, 58, .99), rgba(4, 15, 25, .99) 72%) !important;
}
.v40RtsHeroCount {
  display: grid;
  min-width: 118px;
  padding: 12px;
  border: 1px solid rgba(231, 189, 105, .28);
  border-radius: 14px;
  background: rgba(231, 189, 105, .07);
  text-align: center;
}
.v40RtsHeroCount b { color: var(--gold2); font: 900 34px/1 var(--display); }
.v40RtsHeroCount span { margin-top: 4px; color: var(--muted); font-size: 9px; text-transform: uppercase; }
.v40RtsMainProgress { margin: 14px 0; }
.v40RtsSnapshot {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 14px 0 18px;
}
.v40RtsSnapshot .v39Progress { min-height: 96px; }
.v40RtsTrailGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.v40RtsPhase {
  grid-column: 1 / -1;
  margin-top: 8px;
  padding: 8px 2px 2px;
  border-bottom: 1px solid rgba(231, 189, 105, .18);
}
.v40RtsPhase span {
  color: var(--gold2);
  font-size: 10px;
  font-weight: 950;
  letter-spacing: .11em;
  text-transform: uppercase;
}
.v40RtsMilestone {
  display: grid;
  align-content: start;
  gap: 9px;
  min-height: 290px;
  padding: 13px;
  border: 1px solid rgba(255, 255, 255, .11);
  border-radius: 16px;
  background: rgba(255, 255, 255, .032);
}
.v40RtsMilestone.locked { opacity: .74; }
.v40RtsMilestone.active { border-color: rgba(116, 196, 255, .36); }
.v40RtsMilestone.ready {
  border-color: rgba(231, 189, 105, .62);
  background: linear-gradient(145deg, rgba(231, 189, 105, .10), rgba(255, 255, 255, .035));
  box-shadow: 0 0 0 1px rgba(231, 189, 105, .08), 0 14px 34px rgba(0, 0, 0, .2);
}
.v40RtsMilestone.complete {
  border-color: rgba(82, 212, 126, .48);
  background: linear-gradient(145deg, rgba(82, 212, 126, .10), rgba(255, 255, 255, .035));
}
.v40RtsMilestoneTop {
  display: grid;
  grid-template-columns: 46px 1fr auto;
  gap: 10px;
  align-items: center;
}
.v40RtsMilestoneTop > div > span {
  display: block;
  color: var(--muted);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.v40RtsMilestoneTop h3 {
  margin: 2px 0 0;
  color: #fff;
  font-size: 14px;
}
.v40RtsMilestoneTop > b { color: var(--gold2); font-size: 11px; white-space: nowrap; }
.v40RtsBadge {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(116, 196, 255, .34);
  border-color: color-mix(in srgb, var(--rts-color), transparent 30%);
  border-radius: 14px;
  color: var(--rts-color);
  background: rgba(116, 196, 255, .10);
  background: color-mix(in srgb, var(--rts-color), transparent 88%);
  font-size: 11px;
  font-weight: 1000;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07);
}
.v40RtsMilestone p {
  min-height: 54px;
  margin: 0;
  color: #dbe9f2;
  font-size: 11px;
  line-height: 1.5;
}
.v40RtsGate {
  padding: 8px 9px;
  border-left: 3px solid rgba(116, 196, 255, .62);
  border-radius: 8px;
  color: #bcd4e5;
  background: rgba(116, 196, 255, .06);
  font-size: 10px;
}
.v40RtsReward {
  display: grid;
  gap: 4px;
  padding: 9px;
  border: 1px dashed rgba(231, 189, 105, .24);
  border-radius: 11px;
  background: rgba(231, 189, 105, .035);
}
.v40RtsReward b { color: #bdc7cf; font-size: 11px; }
.v40RtsReward.revealed {
  border-style: solid;
  border-color: rgba(231, 189, 105, .42);
  background: rgba(231, 189, 105, .09);
}
.v40RtsReward.revealed b { color: #ffe8b4; }
.v40RtsAction { display: flex; align-items: center; margin-top: auto; min-height: 44px; }
.v40RtsAction .action { width: 100%; }
.v40RtsRecorder { margin-top: 14px; }
.v40RtsChecks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 10px 0;
}
.v40LsiHistory { display: grid; gap: 8px; margin-top: 16px; }
.v40LsiRow {
  display: grid;
  gap: 5px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 12px;
  background: rgba(255, 255, 255, .035);
}
.v40LsiRow > div { display: flex; align-items: center; gap: 8px; }
.v40LsiRow > span { color: #dcecf7; font-size: 11px; }
.v40LsiRow small { color: var(--muted); }
.v40RtsRewardCenter {
  border-color: rgba(231, 189, 105, .38) !important;
  background:
    radial-gradient(circle at 92% 0, rgba(231, 189, 105, .13), transparent 22rem),
    linear-gradient(145deg, rgba(41, 33, 22, .28), rgba(5, 18, 29, .99) 56%) !important;
}
.v40RtsRewardGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin-top: 14px;
}
.v40RtsRewardItem {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 10px;
  padding: 11px;
  border: 1px solid rgba(255, 255, 255, .11);
  border-left: 4px solid rgba(116, 196, 255, .34);
  border-radius: 14px;
  background: rgba(3, 11, 18, .62);
}
.v40RtsRewardItem.unlocked { border-left-color: var(--gold); background: rgba(231, 189, 105, .07); }
.v40RtsRewardItem.claimed { border-color: rgba(82, 212, 126, .36); background: rgba(82, 212, 126, .07); }
.v40RtsRewardIndex {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  color: var(--gold2);
  background: rgba(231, 189, 105, .09);
  font-size: 11px;
  font-weight: 1000;
}
.v40RtsRewardBody { display: grid; gap: 5px; min-width: 0; }
.v40RtsRewardBody > div { display: flex; align-items: center; gap: 7px; }
.v40RtsRewardBody > div small,
.v40RtsRewardBody > span { color: var(--muted); font-size: 9px; line-height: 1.4; }
.v40RtsRewardBody > b { color: #fff; font-size: 12px; line-height: 1.35; }
.v40RtsRewardBody input { width: 100%; margin-top: 3px; }
.v40RtsRewardActions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
}

.skipLink {
  position: fixed;
  z-index: 20000;
  top: 10px;
  left: 10px;
  padding: 10px 14px;
  color: #07111d;
  background: #fff;
  border-radius: 10px;
  transform: translateY(-180%);
  transition: transform .16s ease;
}
.skipLink:focus { transform: translateY(0); }

body {
  background:
    radial-gradient(circle at 74% -8%, rgba(231, 189, 105, .10), transparent 28rem),
    linear-gradient(180deg, #06131f, #081a28 52%, #05111b) !important;
}
body::before { opacity: .12 !important; }
body::after { opacity: .16 !important; }

.nav {
  background: rgba(6, 19, 31, .94) !important;
  border: 1px solid rgba(231, 189, 105, .20) !important;
  border-radius: 18px !important;
  padding: 7px !important;
}
.nav::after { display: none !important; }
.nav button[data-page] {
  min-height: 48px !important;
  border-radius: 12px !important;
  clip-path: none !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
}
.nav button[data-page]::before,
.nav button[data-page]::after { display: none !important; }
.nav button[data-page].active {
  outline: none !important;
  color: #07111d !important;
  background: var(--tab) !important;
  transform: none !important;
  box-shadow: 0 9px 22px rgba(var(--tab-rgb), .24) !important;
}

.page.active {
  padding: clamp(9px, 2vw, 16px) !important;
  border: 1px solid rgba(var(--page-accent-rgb), .30) !important;
  border-radius: 24px !important;
  background: rgba(5, 16, 26, .72) !important;
}
.page.active::before {
  border: 0 !important;
  border-left: 5px solid var(--page-accent) !important;
  border-radius: 14px !important;
  clip-path: none !important;
  font-size: 12px !important;
  box-shadow: none !important;
}
.page.active .sectionHead {
  border: 0 !important;
  border-left: 4px solid var(--page-accent) !important;
  border-radius: 10px !important;
  background: rgba(var(--page-accent-rgb), .08) !important;
  box-shadow: none !important;
}

.card,
.goalHero,
details,
.notice,
.metric,
.mission,
.tap,
.rangeField,
.rewardVaultItem {
  border-radius: 16px !important;
  clip-path: none !important;
}
.card,
.goalHero,
details {
  background: linear-gradient(145deg, rgba(18, 42, 60, .94), rgba(5, 18, 29, .98) 68%) !important;
  border: 1px solid rgba(220, 236, 247, .13) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .28), inset 0 1px 0 rgba(255, 255, 255, .04) !important;
}
.card::after,
.goalHero::after { display: none !important; }
details { border-left: 3px solid rgba(var(--page-accent-rgb), .48) !important; }

.action {
  min-height: 44px;
  border-radius: 12px !important;
  clip-path: none !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 12px !important;
}
input,
textarea,
select {
  border-radius: 12px !important;
  min-height: 44px;
}
textarea { min-height: 92px; }

#v34DailyCommand,
#v29MomentumHUD,
#v29BossPanel,
#rankMaintenancePanel,
#rankAccountabilityPanel {
  display: none !important;
}

.v37Coach {
  position: relative;
  overflow: hidden;
  margin: 14px 0 18px;
  border-color: rgba(231, 189, 105, .42) !important;
  background:
    radial-gradient(circle at 88% 0, rgba(231, 189, 105, .17), transparent 24rem),
    linear-gradient(145deg, rgba(17, 46, 68, .98), rgba(5, 18, 29, .99) 70%) !important;
}
.v37CoachTop,
.v37PanelTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.v37CoachTop h2,
.v37PanelTop h2 { margin: 3px 0 0; }
.v37CoachQuestion {
  margin: 14px 0 8px;
  color: var(--v37-ice);
  font-weight: 900;
  font-size: 14px;
}
.v37ModeGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.v37Mode {
  min-height: 54px;
  padding: 9px;
  color: var(--v37-ice);
  background: rgba(255, 255, 255, .045);
  border: 1px solid rgba(255, 255, 255, .13);
  border-radius: 12px;
  text-align: left;
}
.v37Mode[aria-pressed="true"] {
  color: #07111d;
  background: var(--v37-gold);
  border-color: #ffe6a8;
}
.v37Mode b,
.v37Mode small { display: block; }
.v37Mode small { margin-top: 3px; opacity: .78; }

.v37Capacity {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 9px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 950;
  letter-spacing: .07em;
}
.v37Capacity.red { color: #ff9393; }
.v37Capacity.yellow { color: #ffd479; }
.v37Capacity.green { color: #7be49b; }

.v37MissionGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin-top: 12px;
}
.v37Mission {
  min-height: 104px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-left: 4px solid var(--mission-color, var(--v37-gold));
  border-radius: 13px;
  background: rgba(3, 13, 22, .52);
}
.v37Mission b,
.v37Mission span { display: block; }
.v37Mission b {
  margin-bottom: 6px;
  color: var(--v37-gold);
  font-size: 10px;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.v37Mission span { line-height: 1.45; }
.v37Mission.definition {
  grid-column: 1 / -1;
  min-height: auto;
  --mission-color: #74c4ff;
}

.v37Agenda {
  display: grid;
  gap: 7px;
  margin-top: 10px;
}
.v37AgendaItem {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 9px;
  padding: 9px 10px;
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 11px;
  background: rgba(255, 255, 255, .035);
}
.v37AgendaItem time { color: #9bd8ff; font-weight: 900; font-size: 11px; }
.v37AgendaItem b,
.v37AgendaItem small { display: block; }
.v37AgendaItem small { margin-top: 2px; color: var(--muted); }

.v37SmartLogGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 10px;
}
.v37SmartPreview {
  min-height: 118px;
  padding: 11px;
  border: 1px dashed rgba(116, 196, 255, .32);
  border-radius: 12px;
  background: rgba(4, 14, 24, .55);
}
.v37RouteList { display: grid; gap: 6px; margin-top: 8px; }
.v37Route {
  padding: 7px 8px;
  border-radius: 8px;
  background: rgba(116, 196, 255, .08);
  font-size: 11px;
}

.v37EvidenceGrid,
.v37FinanceGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}
.v37EvidenceItem {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 13px;
  background: rgba(255, 255, 255, .035);
}
.v37EvidenceItem b,
.v37EvidenceItem small { display: block; }
.v37EvidenceItem small { margin-top: 4px; color: var(--muted); }

.v37PolicyText {
  white-space: pre-wrap;
  line-height: 1.55;
  color: #e8f1f8;
}
.v37StatusLine {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.v37Warning {
  padding: 10px 12px;
  border: 1px solid rgba(255, 166, 87, .34);
  border-radius: 12px;
  background: rgba(255, 166, 87, .08);
}
.v37OriginalCommandHidden { display: none !important; }

.v38WeeklyMission {
  margin: 14px 0 18px;
  border-color: rgba(116, 196, 255, .38) !important;
  background:
    radial-gradient(circle at 100% 0, rgba(116, 196, 255, .14), transparent 25rem),
    linear-gradient(145deg, rgba(14, 38, 59, .98), rgba(5, 18, 29, .99) 72%) !important;
}
.v38MissionSafety {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 14px 0;
}
.v38MissionOutput {
  display: grid;
  gap: 7px;
  margin: 12px 0;
}
.v38MissionRow {
  display: grid;
  grid-template-columns: minmax(170px, .72fr) minmax(0, 1.8fr);
  gap: 12px;
  padding: 9px 10px;
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 11px;
  background: rgba(255, 255, 255, .035);
}
.v38MissionRow b {
  color: var(--v37-gold);
  font-size: 10px;
  letter-spacing: .045em;
  text-transform: uppercase;
}
.v38MissionRow span { line-height: 1.45; }
.v38MissionProof {
  display: grid;
  gap: 7px;
  padding: 13px;
  border: 1px solid rgba(82, 212, 126, .38);
  border-radius: 12px;
  background: rgba(82, 212, 126, .08);
}
.v38MissionProof i { color: #d8ffe3; }
.v38MissionCompletion {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, .12);
}
.v38StakeCard {
  border-color: rgba(231, 189, 105, .38) !important;
}
.v38StakeGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}
.v38StakeGrid > div {
  min-height: 92px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .10);
  border-radius: 11px;
  background: rgba(255, 255, 255, .035);
}
.v38StakeGrid .positive { color: #7be49b; }
.v38StakeGrid .negative { color: #ffb0a8; }

@media (max-width: 760px) {
  .v37CoachTop,
  .v37PanelTop,
  .v40RtsHomeTop,
  .v40RtsHero { display: grid; }
  .v37ModeGrid,
  .v37MissionGrid,
  .v37EvidenceGrid,
  .v37FinanceGrid,
  .v37SmartLogGrid,
  .v38MissionSafety,
  .v38StakeGrid,
  .v40RtsSnapshot,
  .v40RtsChecks,
  .v40RtsRewardGrid { grid-template-columns: 1fr; }
  .v40RtsHomeGrid { grid-template-columns: 1fr 1fr; }
  .v40RtsHomeGrid > div:first-child { grid-column: 1 / -1; }
  .v40RtsCount { text-align: left; }
  .v40RtsHeroCount { width: 100%; }
  .v38MissionRow { grid-template-columns: 1fr; gap: 5px; }
  .v37Mission.definition { grid-column: auto; }
  .v37AgendaItem { grid-template-columns: 72px 1fr; }
}

@media (max-width: 580px) {
  .v40RtsTrailGrid,
  .v40RtsHomeGrid { grid-template-columns: 1fr; }
  .v40RtsHomeGrid > div:first-child { grid-column: auto; }
  .v40RtsMilestone { min-height: auto; }
  .v40RtsMilestone p { min-height: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .skipLink { transition: none; }
}
