# TeachCE Quiz & Survey App Walkthrough

I have successfully built the custom Survey and Quiz page for Teachce.

## Features Implemented
1.  **Quiz Mode**:
    -   Dynamically generates questions from `teachce_knowledge_base.json`.
    -   Tests knowledge on domains (Report Writing, QME Fundamentals) and Expert styles (Dana vs Sherry).
    -   Score tracking and results screen.
2.  **Survey Mode**:
    -   Course feedback form.
    -   Interactive rating and instructor selection.
    -   Submission simulation with "Thank You" state.
3.  **Design**:
    -   Matches the "Blue/Purple Gradient" aesthetic of the existing portal.
    -   Fully responsive layout.
4.  **User Tracking**:
    -   **Identification Screen**: Requires Name and License Number before access.
    -   **Data Logging**: Submissions include user details (visible in console for now).
    -   **Validation**: Uses `prop-types` to ensure data integrity.

## How to Run
1.  Open text terminal.
2.  Navigate to the project:
    ```bash
    cd /Users/timothysepulvado/Teach/teachce-quiz-web
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`).

## Verification Results
-   **Build Status**: ✅ Passed (`npm run build`).
-   **Assets**: ✅ `teachce_knowledge_base.json` correctly imported and parsed.
