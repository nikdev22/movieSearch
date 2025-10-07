# movieSearchApp
# movieSearchApp
Application developed usign Node.js uses an open API to fetch information regarding movies. <strong>Azure pipelines</strong> was used to implement CI/CD.


flowchart TD
  %% --- Overall: Feature -> UAT -> Prod via tag ---
  A[Start: Work item] --> B{Type?}
  B -->|Feature| F0[Branch: feature/* from develop]
  B -->|Hotfix| ZH[See Hotfix Flow ↓]

  subgraph Integration / UAT (maps to develop)
    F0 --> F1[Dev in scratch org / dev sandbox]
    F1 --> F2[PR → develop]
    F2 --> C[CI: lint/PMD + check-only deploy to Integration]
    C -->|Pass| D[Merge to develop]
    C -->|Fail| F1
    D --> E[Auto deploy to Integration/UAT]
    E --> U{UAT sign-off?}
  end

  U -->|Yes| G[PR: develop → master]
  U -->|No| F1

  subgraph Production (maps to master + tags)
    G --> H[Merge to master]
    H --> T[Create annotated tag vX.Y.Z]
    T --> V[CI: Validate against Prod (check-only)]
    V -->|Quick deploy available| P[Quick deploy to Prod]
    V -->|No| Q[Full deploy with tests]
    P --> M[Back-merge master → develop]
    Q --> M
  end

  %% Optional release branch path
  E -. optional .-> R0[Create release/x.y.z from develop for stabilization]
  R0 -. RC tags deploy to Staging .-> R1[When ready: merge release → master, tag vX.Y.Z]
