import { Fragment } from 'react';

const ScenarioShell = ({ scenario, className = '', children }) => (
  <div className={`scenario-visual ${className}`}>
    <div className="scenario-visual-head">
      <p>{scenario.title}</p>
    </div>
    {children}
    <div className="scenario-summary" aria-label={`${scenario.title} 변화 요약`}>
      <div>
        <span>기존</span>
        <strong>{scenario.before}</strong>
      </div>
      <div>
        <span>변경</span>
        <strong>{scenario.change}</strong>
      </div>
      <div>
        <span>결과</span>
        <strong>{scenario.result}</strong>
      </div>
    </div>
  </div>
);

const ScenarioNode = ({ eyebrow, title, detail, className = '', style }) => (
  <div className={`scenario-node ${className}`} style={style}>
    {eyebrow ? <span>{eyebrow}</span> : null}
    <strong>{title}</strong>
    {detail ? <em>{detail}</em> : null}
  </div>
);

const ScenarioArrow = ({ className = '' }) => <span className={`scenario-arrow ${className}`} aria-hidden="true" />;

const ScenarioBadge = ({ children, className = '' }) => (
  <span className={`scenario-badge ${className}`}>{children}</span>
);

const TicketLifecycleVisual = ({ scenario }) => {
  const { steps, badge } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage ticket-lifecycle-visual">
        <div className="ticket-flow">
          {steps.map((step, index) => (
            <div key={step.eyebrow} className="ticket-step-wrap">
              <ScenarioNode
                eyebrow={step.eyebrow}
                title={step.title}
                className="ticket-step"
                style={{ '--i': index }}
              />
            </div>
          ))}
        </div>
        <ScenarioBadge className="ticket-badge">{badge}</ScenarioBadge>
      </div>
    </ScenarioShell>
  );
};

const QueueWindowVisual = ({ scenario }) => {
  const { lanes, delta } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage queue-visual">
        {lanes.map((lane) => (
          <div key={lane.variant} className={`queue-lane ${lane.variant}`}>
            <p>{lane.title}</p>
            <div className="queue-track">
              <ScenarioBadge className="queue-selected">{lane.selected}</ScenarioBadge>
              {Array.from({ length: lane.people }, (_, index) => (
                <span key={index} className="queue-person" style={{ '--i': index }} />
              ))}
              <ScenarioBadge className="queue-gate">{lane.gate}</ScenarioBadge>
            </div>
            <strong>{lane.metric}</strong>
          </div>
        ))}
        <ScenarioBadge className="queue-delta">{delta}</ScenarioBadge>
      </div>
    </ScenarioShell>
  );
};

const CompensationFlowVisual = ({ scenario }) => {
  const { main, success, failure } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage compensation-visual">
        <div className="comp-flow">
          {main.map((node, index) => (
            <Fragment key={node.title}>
              {index > 0 ? <ScenarioArrow /> : null}
              <ScenarioNode {...node} className={`comp-node ${node.className || ''}`} />
            </Fragment>
          ))}
        </div>

        <div className="comp-outcomes">
          <div className="comp-success">
            <ScenarioNode {...success} className="comp-node" />
          </div>
          <div className="comp-failure">
            {failure.map((node, index) => (
              <Fragment key={node.title}>
                {index > 0 ? <ScenarioArrow className="alert" /> : null}
                <ScenarioNode {...node} className={`comp-node ${node.className || ''}`} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </ScenarioShell>
  );
};

const SessionTokenVisual = ({ scenario }) => {
  const { start, tokenLabel, checks, redis, close } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage session-visual">
        <div className="session-start">
          <ScenarioNode {...start} />
        </div>
        <div className="session-token-split" aria-hidden="true">
          <span className="session-token-chip chip-hls">{tokenLabel}</span>
          <span className="session-token-chip chip-stomp">{tokenLabel}</span>
        </div>
        <div className="session-checks">
          {checks.map((check) => (
            <ScenarioNode key={check.eyebrow} {...check} className="session-check" />
          ))}
        </div>
        <ScenarioArrow className="session-arrow" />
        <ScenarioNode {...redis} className="session-redis" />
        <ScenarioArrow className="session-arrow" />
        <ScenarioNode {...close} className="session-close" />
      </div>
    </ScenarioShell>
  );
};

const OrderRolesVisual = ({ scenario }) => {
  const { states } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage order-roles-visual">
        {states.map((state, index) => (
          <div key={state.eyebrow} className="role-state-wrap">
            <ScenarioNode
              {...state}
              className="role-state-node"
              style={{ '--i': index }}
            />
          </div>
        ))}
      </div>
    </ScenarioShell>
  );
};

const GeoDispatchVisual = ({ scenario }) => {
  const { store, riders, badge, label } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage geo-dispatch-visual">
        <div className="dispatch-map">
          <span className="store-dot">{store}</span>
          <span className="geo-ring" />
          {riders.map((rider) => (
            <span key={rider.label} className={`rider-dot rider-${rider.slot} ${rider.status || ''}`}>
              {rider.label}
            </span>
          ))}
          <ScenarioBadge className="dispatch-candidate-label">{badge}</ScenarioBadge>
        </div>
        <ScenarioNode {...label} className="geo-label" />
      </div>
    </ScenarioShell>
  );
};

const DispatchLockVisual = ({ scenario }) => {
  const { requests, lock, result } = scenario.diagram;

  return (
    <ScenarioShell scenario={scenario}>
      <div className="scenario-stage dispatch-lock-visual">
        <div className="lock-requests">
          {requests.map((request, index) => (
            <span
              key={request.rider}
              className={`lock-request ${request.state === 'pass' ? 'lock-pass' : 'lock-reject'}`}
              style={{ '--i': index }}
            >
              <strong>{request.rider}</strong>
              <em>{request.label}</em>
            </span>
          ))}
        </div>
        <ScenarioArrow className="lock-arrow" />
        <div className="lock-core">{lock}</div>
        <ScenarioArrow className="lock-arrow" />
        <div className="lock-result">
          <strong>{result.title}</strong>
          <span>{result.detail}</span>
        </div>
      </div>
    </ScenarioShell>
  );
};

const scenarioComponents = {
  'ticket-lifecycle': TicketLifecycleVisual,
  'queue-window': QueueWindowVisual,
  'compensation-flow': CompensationFlowVisual,
  'session-token': SessionTokenVisual,
  'order-roles': OrderRolesVisual,
  'geo-dispatch': GeoDispatchVisual,
  'dispatch-lock': DispatchLockVisual,
};

export default function ScenarioVisual({ scenario }) {
  const Component = scenarioComponents[scenario.scenario];
  return Component ? <Component scenario={scenario} /> : null;
}
