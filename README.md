# Expense Management App

Frontend repo can be accessed [here](https://github.com/lee-kimmixq/expense-mgmt-app-frontend)

## Setup

1. Create a `.env` file and include these variables for Sequelize config (password and database is optional - default db name will be "expense_mgmt_development")
   USERNAME="<your_username>"
   PASSWORD="<your_password>"
   DATABASE="<your_db_name>"
2. Install all npm packages `npm i`
3. Run server `npm run watch`
4. Initiate database `npx sequelize db:create` - should create db under correct username
