# ionicAppSample
Ionic frontend sample.  
## Project Structure
src/app/        
├── core/                           # Core functionality
│   ├── services/                   # Shared services
│   │   ├── auth.service.ts
│   │   ├── api.service.ts
│   │   ├── base.service.ts         # ✨ NEW: Base service pattern
│   │   ├── ui.service.ts           # ✨ NEW: UI operations
│   │   ├── storage.service.ts      # ✨ NEW: Local storage
│   │   └── index.ts               # ✨ NEW: Barrel exports
│   ├── guards/                     # Route guards
│   └── models/                     # ✨ NEW: Type definitions
│       └── index.ts               # Central model exports
├── shared/                         # Shared components & utilities
│   ├── components/                 # Reusable UI components
│   │   └── menu/                  # Menu component
│   ├── modals/                     # Shared modal dialogs
│   │   └── detail-modal.component.ts
│   ├── pipes/                      # ✨ NEW: Custom pipes
│   │   ├── truncate.pipe.ts
│   │   ├── relative-time.pipe.ts
│   │   ├── safe-html.pipe.ts
│   │   └── index.ts
│   ├── utils/                      # ✨ NEW: Utility functions
│   │   ├── date.utils.ts
│   │   ├── validation.utils.ts
│   │   ├── string.utils.ts
│   │   └── index.ts
│   └── index.ts                   # ✨ NEW: Shared barrel exports
├── features/                       # ✨ NEW: Feature-based organization
│   ├── auth/
│   │   └── login/                 # Login functionality
│   ├── dashboard/
│   │   └── tab1/                  # Home/Dashboard
│   ├── search/
│   │   ├── tab2/                  # Search page
│   │   └── services/              # ✨ NEW: Feature-specific service
│   │       └── search.service.ts
│   ├── notifications/
│   │   └── tab3/                  # Notifications
│   └── profile/
│       └── tab4/                  # Profile page
└── layout/                         # ✨ NEW: Layout components
    └── tabs/                      # Tab navigation