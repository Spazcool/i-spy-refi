# Basic Git/GitHub Workflow:

### Communication:
1. log in to Github
2. navigate to Trello page
3. move card from "To Do" to "In Progress"
    * optional: send a Slack message

### Set up Local Dev:
4. open terminal
5. cd into project directory, example below:
    ```bash
    cd ~/path/to/i-spy-refi
    ```
6. make sure it's current with what's on GitHub:
    ```bash
    git checkout master
    git pull
    ```
    * you may get errors here if you have:
        * worked on the project locally previously and not pushed your work up to GitHub
        * not setup the GitHub version as your master repository
7. create and navigate to your local branch:
    * swap out {NAME OF YOUR BRANCH} with something short and descriptive, no spaces, examples below:
    ```bash
    git checkout -b {NAME OF YOUR BRANCH} 
    ```
    ```bash
    git checkout -b addHeader 
    ```

### Add your feature/code
8. open your editor and do the code, save your changes

### Push up your code to be scruitinized by your judgemental peers:
9. add changes to staging, back in the terminal:
    * Single file:
      ```bash
      git add {NAME OF FILE YOU WANT TO ADD}
      ```
      ```bash
      git add Header.js
      ```
    * Multiple files:
      ```bash
      git add .
      ```
10. commit the changes, ready to push to GitHub:
    ```bash
    git commit -m '{YOUR MESSAGE OF WHAT YOUVE DONE HERE}'
    ```
    ```bash
    git commit -m 'added the header to main view'
    ```
11. pull in any changes other's may have made to master since you last pulled:
    ```bash
    git pull origin master
    ```
12. push the commit to GitHub as a separate branch, no spaces, example below:
    ```bash
    git push origin {BRANCH NAME HERE}
    ```
    ```bash
    git push origin addHeader
    ```

### Code Review
13. log in to GitHub
14. navigate to your branch
15. create a pull request
16. assign reviewers
    * doesn't hurt to slack them a message
17. code review:
    * a team member should be reading through your code to add an extra pair of eyes, looking out for potential merge conflicts
    * via Zoom, walk through code with reviewer(s)

### Merge to Master 🎉 
18. merge pull request
    * it's now on the master branch

### Communication, again:
19. go to Trello board
19. move card from "In Progress" to "Done"
