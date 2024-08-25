# EVENT MASTER

### First step:
- Git clone
```
git clone https://github.com/Erljan/Event-Master.git
```

- Create your own branch by using 
```
git checkout -b <name of your branch>
```

### Installations
- Create your own virtual environment
```bash
# cd to backend
# You can rename .venv
python3 -m venv .venv

# Install gitignore and add the .venv in there
touch .gitignore

# Install the requirements
pip install requirements.txt
```
- Create database
```bash
createdb event_db
```

### Git/Github Command
- Git clone
- git checkout -b <name of new branch>   --> this will be the branch that you will make changes
- git add .  --> After making changes
- git commit -m 'message'
- git push -u origin <name of new branch>  --> Push your branch
- git pull origin main   --> to pull the changes from the main branch
- Make the pull request on Github and merge
- git checkout main
- git pull  --> to pull main after you merged your branch to main
- git branch -D <name of new branch>  -> this will delete the branch you worked on and then create a new one for more changes

### Conflict on merge 
- git pull origin main
- Go to VSCODE and ACCEPT the changes
- git add .
- git commit -m 'message'
- git push
- Go to github and make a pull request and merge
- git checkout main
- git pull
- git branch -D <name of new branch>