## Get specific commit without cloning

- Fetching a specific commit without cloning: If you only need to fetch a specific commit without cloning the entire repository, you can use sparse-checkout:

```bash
mkdir <repo-name>
cd <repo-name>
git init
git remote add origin <repository-url>
git fetch origin <commit-hash>
git checkout FETCH_HEAD
```

1. `mkdir <repo-name>`

- This command creates a new directory with the name <repo-name>. This directory will serve as a local repository.
- Example: mkdir your_project

2. `cd <repo-name>`

- This changes the current working directory to the newly created directory.
- Example: cd your_project

3. `git init`

- This initializes a new Git repository in the current directory. This sets up all the necessary Git files and structures needed to begin tracking files and commits in the repository.

4. `git remote add origin <repository-url>`

- This command adds a new remote to your local Git repository. origin is a conventional name used for the primary or original repository. <repository-url> should be replaced with the URL of the Git repository from which you want to fetch data.
- Example: git remote add origin https://github.com/user/repo.git

5. `git fetch origin <commit-hash>`

- This command retrieves the commit specified by <commit-hash> from the remote repository linked as origin. This does not fetch the entire branch or tags, just the specific commit and the history necessary to reach it.
- Example: git fetch origin a1b2c3d4e5f6
 
6. `git checkout FETCH_HEAD`

- After fetching, FETCH_HEAD refers to the last fetched branch or commit from a remote repository. This command checks out the state of the repository at the fetched commit, putting the working directory in that state. You will be in a 'detached HEAD' state at this commit, meaning you're not working on any particular branch. For a more detailed guide on the 'detached HEAD state', including how to get out of it, see this guide on resolving a detached head state.

###### For [more information](https://graphite.dev/guides/git-clone-specific-commit)