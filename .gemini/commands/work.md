# Workflow for Implementing Code from a GitHub Issue

This document outlines the process for a developer or AI agent to implement code changes based on a well-structured GitHub issue, leveraging the information provided within the issue itself.

## 1. Understand the Issue

Begin by thoroughly understanding the problem or feature request as described in the GitHub issue.

-   **Title & Description:** Read the issue title and the detailed description to grasp the core problem, its context, and the desired outcome. Pay attention to any background information or rationale provided.

## 2. Reproduce (for Bugs) or Clarify (for Features)

If the issue is a bug, the next critical step is to reproduce it reliably. For features, ensure a clear understanding of the desired functionality.

-   **Steps to Reproduce:** Follow the provided steps precisely. If the bug cannot be reproduced, or if the steps are unclear, seek clarification from the issue creator. Document any deviations or additional steps needed to reproduce.
-   **Expected vs. Actual Behavior:** Compare the actual behavior observed with the expected behavior described in the issue. This confirms the understanding of the bug.
-   **Feature Clarification:** For new features, ensure all aspects of the desired functionality are clear. If ambiguities exist, ask clarifying questions.

## 3. Plan the Implementation

Based on the understanding of the issue, formulate a detailed implementation plan. The "Suggested Implementation" section of the issue can serve as a starting point.

-   **Suggested Implementation:** Review the suggested implementation. Evaluate its feasibility, adherence to project conventions, and potential impact. If a different approach seems better, document the reasoning.
-   **Identify Affected Files:** Determine which files will need to be modified, created, or deleted. Use tools like `glob` and `search_file_content` to locate relevant code sections.
-   **Review Existing Code:** Examine the existing code in the identified files to understand the current logic, dependencies, and coding style. This ensures new code integrates seamlessly.
-   **Consider Best Practices:** Refer to project-specific best practices (e.g., from `GEMINI.md` in the `commands` folder) and general software engineering principles.
-   **Outline Changes:** Create a step-by-step plan for the code modifications. This might involve:
    *   Adding new functions or components.
    *   Modifying existing logic.
    *   Refactoring code for clarity or performance.
    *   Updating tests or creating new ones.

## 4. Implement the Code

Execute the planned changes, writing clean, maintainable, and idiomatic code.

-   **Adhere to Style Guides:** Follow the project's coding style (e.g., indentation, naming conventions, strict equality) as outlined in `GEMINI.md`.
-   **Write Tests:** For new features, write comprehensive unit and integration tests. For bug fixes, add regression tests to prevent future reoccurrences. Ensure tests cover the acceptance criteria.
-   **Incremental Changes:** Make small, testable changes. Commit frequently with clear, concise messages.

## 5. Verify and Validate

After implementing the code, thoroughly verify that the changes address the issue and do not introduce new problems.

-   **Acceptance Criteria:** Use the acceptance criteria provided in the GitHub issue as a checklist. Ensure all criteria are met.
-   **Run Tests:** Execute all relevant tests (unit, integration, end-to-end) to ensure functionality and prevent regressions. Use the project's test command (e.g., `npm test`).
-   **Linting and Formatting:** Run the project's linting and formatting tools (e.g., `npm run lint`, `npm run format`) to ensure code quality and consistency.
-   **Manual Testing:** Perform manual testing, especially for UI/UX changes, to ensure the user experience is as expected.

## 6. Prepare for Review

Once the changes are verified, prepare them for code review.

-   **Review Changes:** Self-review the code changes, ensuring they are clear, correct, and complete.
-   **Update Documentation:** If necessary, update any relevant documentation (e.g., `README.md`, API docs).
-   **Create Pull Request:** Create a pull request with a clear description, linking back to the original GitHub issue. Include details about the changes made and how they address the issue.