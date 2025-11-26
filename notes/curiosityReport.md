# Git Hooks
## What are they?
Git hooks are a way to fire off custom scripts when certain important actions occur (e.g. when a commit is made). There are two types of hooks:
1. Client-side hooks
    - Run locally and are triggered by events such as committing and merging.
2. Server-side hooks
    - Run on network operations like receiving a pushed commit.

## General Use Cases
- Ensuring commits are aligned with standards (tests, coding style, etc.)
- Keep ticketing systems updated autonomously.
- Notify people/systems of actions.
- Ensure permissions and policies are upheld throughout the commit -> merge process.

## Types of Hooks
### Client-side
#### Pre-commit
- First hook to run. Runs when you try to make a commit.
- Can do things such as ensure that the commit is in compliance with coding style standards, tests work, etc.
- Ensure that things like `READ.me` are updated within their relevant commits rather than in it's own commit.
- Commit aborts if non-zero return.
#### Prepare-commit-msg
- Lets you edit the default message of a commit.
- Generally best for non-normal commits where the default message is auto-generated such as merged commits, squashed commits, ammended commits, etc.
- An opoortunity to programmactically insert info into the commit message.
#### Commit-msg
- Aborts the commit with non-zero return.
- Allows you to validate the project state or commit message (e.g. that it follows the expected pattern) before it allows the commit to go through.
#### Post-commit
- Runs after the entire commit process is done.
- Generally used for things like notifications.
#### Pre-rebase
- Runs before attempting a rebase, and will abort the rebase with a non-zero return.
- Helpful for things like only allowing non-pushed commits to be rebased.
#### Post-checkout
- Runs after checking out code.
- Useful for setting up your working directory for the newly checked out code (e.g. generating binary files)
#### Pre-push
- Allows you to validate things when a push occurs.
- Aborts the push with a non-zero return.
### Server-side
#### Pre-receive
- Aborts receiving any updated references with a non-zero return.
- Useful for permission checks on chnaged files or ensuring no fast-forward changes.
#### Update
- Same as pre-receive, but it runs once for each branch being updated by the push.
- Non-zero return aborts everything for pre-receive, but it will only fail the corresponding branch for update.
#### Post-receive
- Runs after the entire push process is completed.
- Useful for things like notifying people/systems of the update.

### Others
- There are hooks for an email based workflow.
- Post-merge
- Pre-auto-gc (runs before git's automatic garbage collection)

## Options to implement it
- [Pre-commit](https://pre-commit.com) framework (specifically for pre-commit hooks)
    - Allows you to use hooks created by others.
    - Just requires configuration files
    - Not dependent on GitHub
    - Only runs on changed files by default
- `.git/hooks` files
    - Initialized with each git repository when you run `git init`
    - Completely customizable
    - Can be more complext since you are building it out completely on your own.
- There are several other frameworks, may of which can be found in a list [here](https://githooks.com).

## Cons
- The hooks can become slow if you add too much into the scripts, making the committing/pushing process a pain.
    - This can discourage developers from making small, frequent commits.
- Hooks are easy to bypass locally
- Pre-commit hooks can be annoying when you are rebasing or squashing commits (they run once for each commit).

## Conclusion
Git hooks seem like they can do some super useful things. They seem especially useful when working with ticketing systems as they can notify the systems of any changes. They also seem useful for basic formatting, checking for unwanted/unused code, etc., but they can easily become a pain in the developer experience too. It seems to me that devops teams should think carefully about whether something should be a git hook or a test/PR task.

## Sources
- https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- https://pre-commit.com
- https://cran.r-project.org/web/packages/precommit/vignettes/why-use-hooks.html
- https://www.reddit.com/r/git/comments/16ke0xa/arguments_for_and_against_precommit_hooks/
- https://githooks.com