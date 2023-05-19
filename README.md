# Github-to-Freshdesk-API
A project based on fetching Github user information and making a contact in Freshdesk using REST API
## How to run the program : 
! Note that you need to have Node JS installed (to run the program) [in terminal]
! Note that you need to have Jest installed (for unit testing) [in terminal] 
1) Download the CraftDemoNodeJs file and open it in VS Code
2) Create yourself a .env file with this information : 
```
FRESHDESK_TOKEN=<insert your freshdesk token here>
GITHUB_TOKEN=<insert your github token here>
```
4) You can/should insert your Github and Freshdesk tokens for a more secure/authorized requeting (and more requests of course).
5) If you have downloaded the whole file (with the PDF) run : 
```bash
cd CraftDemoNodeJS
```
7) Download the packages/node modules using the command : 
```bash
npm i
```
7) You can run the unit tests using :
```bash
npx jest
```
8) You can run the program with : 
```bash
node src/index.js <somebodys_github_username> <your_freshdesk_domain> 
```
- Note that not using proper tokens will result in error
- Additional information/implementations is given in the PDF file (screenshots of running the program as well).
- The input is only a github username and the domain is just the name of the domain for example : https://<your_github_domain>.freshdesk.com/a/contacts/filters/all
- In case of help with running the program contact me rdxhada@gmail.com


