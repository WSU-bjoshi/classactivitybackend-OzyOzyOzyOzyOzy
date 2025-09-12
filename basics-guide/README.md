## Command Line Git
- status
  - Shows status of the local repository. This status includes:
    - number of local commits that have not been synced with remote (GitHub)
    - list of files in local folder than are NOT being tracked by git
    - list of files in local folder that have changes that need to be committed
  - `git status`
- log
  - Displays a history of recent commits. This log includes:
    - Authors
    - Date of changes
    - Commit messages
  - `git log`
- clone
  - Clones a supplied repository (if you have access)
    - Private repos require a matching key for authentication
  - `git clone [respository link`
- remote
  - Manage a set of tracked repositories. Without options, this command displays currently tracked repositories
  - `git remote`
- add
  - Adds files for staging/tracking
    - Files can be specifically selected by entering the file or folder name
    - All files in a repo can be selected with `*`
  - `git add "file"`
- rm
  - Removes a file from tracking. `rm` can only removes files from paths known to git.
    - To remove a file from the working directory (as in actually delete it) use /bin/rm
    - `git rm` only removes files from git, NOT the actual working directory
  - `git rm [options]`
- commit
  - Stages changes to files that have been added with `git add` to be pushed to the repository
    - Tracks all files that are not in `.gitignore`
    - Requires a small message to explain what was changed
    - Changes are not made to repo until `git push` is used
  - `git commit`
  - **DEMONSTRATE** Your GitHub repo should have a commit history of more than one.  Commit messages should state changes at points in time
- push
  - Pushes commits to the currently entered repo or branch
    - Requires at least one previous commit
  - `git push`
- pull
  - Pulls changes from a remote repository to the local repository
    - Scans for file and path differences within the entered repository
    - Will add or change conflicting files to match the remote repository
  - `git pull`
- branch
  - Manges branches for entered repository
    - Without options, will display all current branches and designate which branch is currently entered
  - **DEMONSTRATE** Your GitHub repo should have more than the `main` branch.  We can switch to the other branch and see content that may not be synced to `main`
  - `git branch [options]`
- checkout
  - Switches current branch or restores working tree files
  - `git checkout [options]`
- fetch
  - Downloads objects and refs from another repository
  - `git fetch "repository_to_fetch"`
- merge
  - Merges changes from a branch to the main branch of a repo
    - Multiple branches can be merged at once
    - Should changes conflict, i.e the same file has modifications from the origin of branch to the merge, the merge cannot be completed until the merge conflicts are resolved
  - **DEMONSTRATE** Your commit history should reflect a point where a merge was made from a different branch. Make sure the commit message contains some indication that the merge happened in the given commit
  - `git merge [options] "branch"`
- init
  - Creates an empty repository or reinitializes an existing one
    - To initiate an existing directory as a git repository, cd into the directory containing the project, then `git init`. After the directory has been initialized `git add *`, `git commit`.
    - The --bare flag initializes a bare repository with no working tree. `git init --bare`
  - `git init [options]`

## git files & folders

- .git folder
  - Contains `objects/`, `refs/`, `HEAD`, `config`, `index`, `logs/`
    - `objects/`: Stores all content of the repo
    - `refs/`: Stores references to commits (branches and tags)
    - `HEAD`: Points to the currently active branch or commit
    - `config`: Config file for the respository. This is where git settings are specified for the relevant repository
    - `index`: Where information pertaining to the next commit is stored. This is where the state of files added with `git add` are stored
    - `logs/`: Stores logs for git operation
- .gitignore
  - Paths input into this file are excluded from tracking
    - As an example, this repo contains a file called `ignoreme.txt`. Since it is added to .gitignore, any changes to that file should not be tracked and therefore the file should not be uploaded to the repo.

## Command line Docker

- ps
  - Lists containers
    - Without a flag, `docker ps` only lists running containers. Use `docker ps -a` to list all containers that exist
  - `docker ps`, `docker ps -a`
- images
  - Manages images
    - Must be used with an option
  - Examples:
```
# add image ubuntu:latest
docker images add ubuntu:latest

# remove image ubuntu:latest
docker images rm ubuntu:latest

# list installed images
docker images ls
```
- run
  - Create and run a new container from a image 
  - Examples:
```
# Create and run a container with a interactive shell
docker run -it [IMAGE]

# Create a container and publish specific port to host
docker run -p containerport:hostport [NAME]

# Create and run a container with a specified name
docker run --name [NAME] [IMAGE]
```
- start
  - Start specified container
  - `docker start myContainer`
- stop
  - Stop specified container
  - `docker stop myContainer`
- exec
  - Alias for `docker container exec`
  - Executes a command in a specified container
  - `docker exec -it veryImportantContainer sh -c "rm -rf /*"` 
- import
  - Imports a container from a container archive
  - `docker import stuff.tar`
- export
  - Exports a container into a compressed archive
  - `docker export veryImportantContainer -o container.tar`
- kill
  - Terminates specified container
  - `docker kill veryImportantContainer`
- rm
  - Removes/deletes a container and its contents
  `docker rm veryImportantContainer
  - include removing a container versus removing an image
  - To remove an image
  - `docker images rm image:name`

## SSH

Provide basic how-to-use guides.  This should be short and sweet so that you can refer to it as a quick guide.

- Setting up SSH authentication to GitHub repositories
  - Generate key pair using `ssh-keygen`
  - Upload private key to github under account settings, SHH & GPG keys
  - Follow github documentation on how to add github as a host (only necessary on Mac)
 
- Setting up SSH authentication and using SSH to connect to an AWS instance
  - On AWS main console, download PEM from SSH Keys section
  - Under EC2 console, assign a elastic IP to your running instance (Assuming you have already made a container, If not, do that).
  - Use the downloaded key in your ssh command to connect to running instance
    `ssh -i AWS.pem [USER]@[AWS Elastic IP]`
- Using the `config` file in the `.ssh` folder
  - To add a host to the ssh config file, the format is as follows:
```
Host [A_Name_For_The_Host]
    HostName [HostIP]
    User [USER]
    Port [PORT]
    IdentityFile [path/to/key/for/ssh]
```
  - Use this as a rough template for easier access to a host. For AWS, you can set this up to only need `ssh AWS3120` for our 3120 instance.

