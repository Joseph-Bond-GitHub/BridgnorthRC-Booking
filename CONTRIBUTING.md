# Contributing

The following is a guide on how to structure commits and other contributions to the project. It was created with the help of online sources and AI. It exists mainly for my benefit to ensure consistency across the project and compliance with the industry standards.


This is currently a solo learning project, but these conventions exist so the
commit history stays useful — both as a changelog for anyone browsing the repo,
and as a way for future-me to reconstruct *why* a change was made without
re-reading the diff from scratch.

## Commit message format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

<optional body>

<optional footer>
```

### `type` — required

Describes the *kind* of change. One of:

| Type       | Use for |
|------------|---------|
| `feat`     | A new feature or capability |
| `fix`      | A bug fix |
| `refactor` | Restructuring code with no change in external behavior |
| `docs`     | Documentation only (README, comments-as-docs, this file) |
| `test`     | Adding or fixing tests |
| `style`    | Formatting, whitespace, naming — no logic change |
| `chore`    | Tooling, dependencies, build config, project settings |

If a commit doesn't cleanly fit one type, it's usually a sign the commit is
doing too much — see "Commit size" below.

### `scope` — optional but encouraged

The area of the codebase affected, in parentheses, lowercase. Pick names that
map to the project structure so scopes stay consistent over time:

- `inbox`, `login` — feature areas (`Features/Inbox`, `Features/Login`)
- `mailservice`, `authservice` — service layer (`Services/`)
- `models` — `Models/`
- `views` — shared UI (`Shared/Views/`)

Omit the scope only when a change is genuinely project-wide (e.g. a `chore`
touching build settings, or a `docs` change to the top-level README).

### `summary` — required

- Imperative mood: "add", "fix", "remove" — not "added", "fixes", "removed".
  Test: the summary should complete the sentence "If applied, this commit
  will ___."
- No capital letter needed at the start, no trailing period.
- Keep it under ~50 characters where possible — `git log --oneline` truncates
  longer summaries, and a summary that needs truncating usually means detail
  belongs in the body instead.

### `body` — optional

Use the body when the summary alone doesn't explain *why*. Skip it when the
summary is self-explanatory (e.g. `docs: fix typo in README`).

Good candidates for a body:
- A bug fix where the cause isn't obvious from the fix itself
- A refactor motivated by something not visible in the diff (e.g. "this was
  causing a retain cycle", "preparing for the real-IMAP swap")
- Any decision where you'll want to remember the reasoning later

Wrap body text at roughly 72 characters per line — this is a long-standing
git convention that keeps messages readable in terminal-width tools.

### `footer` — optional

Rarely needed in a solo project, but useful for:
- Referencing an issue: `Refs #12`
- Flagging a breaking change: `BREAKING CHANGE: MailService protocol now
  requires async fetch(_:)`

## Examples

```
feat(inbox): add MessageListViewModel with @Published messages array
```

```
fix(login): correct binding on password SecureField

SecureField was bound to the wrong @State property, so the password
field was silently updating the username instead.
```

```
refactor(mailservice): extract IMAP logic from MailService into SwiftMailService

MailService is now a protocol only. SwiftMailService is the concrete
IMAP-backed implementation, conforming to MailService. This keeps the
door open for a REST-backed implementation later without touching
call sites.
```

```
docs: add architecture tree and requirements to README
```

```
chore: bump minimum deployment target to iOS 17
```

```
test(authservice): add unit tests for token refresh failure paths
```

## Commit size

Aim for one logical change per commit — small enough that `git bisect` (git's
binary-search tool for finding which commit introduced a bug) or `git revert`
on it actually does something useful. This doesn't mean splitting a single
feature into unnecessarily many commits; it means not bundling unrelated
changes (e.g. a UI fix and an unrelated dependency bump) into one.

A reasonable check: if you can't summarize the commit in one `type(scope):`
line without using "and", it's probably two commits.

## Branch naming

If working across branches rather than committing directly to `main`:

```
feature/<short-description>   e.g. feature/inbox-search
fix/<short-description>       e.g. fix/login-crash-on-empty-password
chore/<short-description>     e.g. chore/upgrade-swift-6
```

## Not enforced here

To keep this lightweight for a project of one, the following are
intentionally *not* required:

- Signed-off-by lines
- PR review before merging to `main`
- Squashing commits before merge
- A strict one-file-per-commit rule

If the project ever gains other contributors, this file is the place to
tighten those up.
