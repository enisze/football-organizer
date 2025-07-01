# Workflow for Creating Optimized GitHub Issues

## 1. Overview & Specification

This document outlines the process for an AI agent to create well-structured, actionable, and optimized GitHub issues. The goal is to produce issues that are clear, concise, and provide all the necessary context for a developer (human or AI) to understand and address the problem or feature request efficiently.

A well-structured issue should:
- Be atomic and focus on a single, specific problem or feature.
- Contain a clear and descriptive title.
- Provide a detailed description of the issue, including context, steps to reproduce (for bugs), or a clear explanation of the desired functionality (for features).
- Include relevant artifacts like code snippets, logs, or screenshots.
- Suggest a potential solution or implementation approach if possible.
- Be properly labeled for easy categorization and prioritization.

## 2. The Process

### Step 1: Research Repository

**Objective:** To gather comprehensive context about the project and the specific area related to the new issue.

Before creating an issue, the agent must thoroughly understand the repository's structure, conventions, and existing code. This prevents duplicate issues and ensures the new issue is relevant and well-informed.

**Actions:**
- **Understand the Project's Purpose:** Read the `README.md` and any other high-level documentation (`CONTRIBUTING.md`, `docs/`, etc.) to grasp the project's goals and conventions.
- **Analyze File Structure:** Use `ls -R` or a similar command to map out the directory structure. Identify key areas like `src`, `tests`, `docs`, and configuration files.
- **Search for Duplicates:** Use `search_file_content` and GitHub's search functionality to look for existing or closed issues that are similar to the one you intend to create. Search for keywords related to the problem or feature.
- **Identify Relevant Code:** Locate the specific files, functions, or components that are related to the issue. Use tools like `glob` and `search_file_content` to find relevant code snippets. For example, if the issue is about a bug in the authentication flow, find the files that handle authentication logic (`src/lib/auth.ts`, `src/app/api/auth/...`).
- **Review Existing Code and Tests:** Read the identified code and any corresponding tests (`*.test.ts`, `*.spec.ts`). This helps understand the current implementation, coding style, and how new changes should be tested.

### Step 2: Research Best Practices

**Objective:** To ensure the proposed solution aligns with modern development standards and project conventions.

**Actions:**
- **Consult External Documentation:** Use `web_fetch` to look up best practices related to the technologies being used (e.g., React, Node.js, Prisma). For example, search for "React state management best practices" or "Prisma schema design tips."
- **Analyze Project Patterns:** Observe how similar features are implemented elsewhere in the repository. Adhere to existing design patterns and architectural choices to maintain consistency.

### Step 3: Present a Plan

**Objective:** To outline a clear and actionable plan for resolving the issue.

The agent must present a plan enclosed in `<plan>` tags. This allows for a clear separation between the analysis and the proposed solution, and gives the user a chance to review and approve the approach before the final issue is drafted.

**Format:**
```xml
<plan>
1.  **File to Modify:** `src/components/ui/Button.tsx`
    - **Change:** Add a new `variant` prop to support a "destructive" style.
2.  **File to Create:** `src/components/ui/Button.stories.tsx`
    - **Content:** Add a new story to showcase the "destructive" variant.
3.  **Verification:** Run `npm run test` and `npm run lint` to ensure changes are safe and consistent.
</plan>
```

### Step 4: Create the GitHub Issue

**Objective:** To generate the final, well-formatted GitHub issue content.

After the plan is confirmed, the agent will generate the complete markdown content for the issue, enclosed in `<github_issue>` tags.

**Presentation is Key:**
The issue should be highly readable and professionally formatted.
- Use markdown effectively (headings, lists, code blocks).
- Use bold and italics to emphasize key points.
- Keep paragraphs concise.

**Format:**
```xml
<github_issue>
**Title:** Bug: User logout does not redirect to homepage

**Body:**

### Description

When a user clicks the logout button, they are not redirected to the homepage as expected. Instead, they remain on the current page, which can be confusing.

### Steps to Reproduce

1.  Log in to the application.
2.  Navigate to any page other than the homepage (e.g., `/settings`).
3.  Click the logout button in the navigation bar.
4.  Observe that the user is logged out, but the page does not change.

### Expected Behavior

After logging out, the user should be immediately redirected to the `/` route.

### Suggested Implementation

The `logout` function in `src/lib/auth.ts` should be updated to include a redirect using `next/navigation`.

'''typescript
// src/lib/auth.ts
import { redirect } from 'next/navigation';

export async function logout() {
  // ... existing logout logic
  redirect('/');
}
'''

### Acceptance Criteria

- [ ] Clicking logout redirects the user to the homepage.
- [ ] The user session is properly terminated.
</github_issue>
```

### Step 5: Add Labels

**Objective:** To categorize the issue for better project management.

**Instructions:**
1.  Use the GitHub API or a tool like `gh` (if available) to create the issue.
2.  Apply relevant labels based on the issue's content. Common labels include:
    - **`bug`**: For defects and unexpected behavior.
    - **`feature`**: For new functionality.
    - **`enhancement`**: For improvements to existing features.
    - **`documentation`**: For changes to docs.
    - **`ui` / `ux`**: For user interface or experience changes.
    - **`good first issue`**: For simple, well-defined tasks.
    - **`help wanted`**: To invite community contributions.
