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
3) You can/should insert your Github and Freshdesk tokens for a more secure/authorized requeting (and more requests of course).
4) *(opt.)* If you have downloaded the whole file (with the PDF) run (or just open CraftDemoNodeJs): 
```bash
cd CraftDemoNodeJS
```
5) Download the packages/node modules using the command : 
```bash
npm i
```
6) You can run the unit tests using :
```bash
npx jest
```
7) You can run the program with : 
```bash
node src/RunApp.js <somebodys_github_username> <your_freshdesk_domain> 
```
- Note that not using proper tokens will result in error, so they need to be valid 
- Note that not using proper SPACING when calling node src/ContactSync.js <somebodys_github_username> <your_freshdesk_domain> can result in errors
- Note that running the node <github_user> <domain> command immediately again will/might result in error because the contact takes time to be created
- Additional information/implementations is given in the PDF file (screenshots of running the program as well).
- The input is only a github username and the domain is just the name of the domain for example : https://<your_freshdesk_domain>.freshdesk.com/a/contacts/filters/all
- In case of help with running the program contact me rdxhada@gmail.com


