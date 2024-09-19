# Getting Started

An application to view one's transaction history with face ID recognition

## Step 1: Install Dependency

npm i
cd ios && pod install (if needed for ios dependency installation)

## Step 2: Create .env File

Insert APP_EMAL and APP_PASSWORD key with its values

## Step 3: Start the Application

npm run ios / npm run android

# Running through the App

## Authentication Screen

Enter your email address.

If the email exists, you’ll be prompted to use Face ID for easy login.

You have three attempts to use Face ID. If you reach the limit, you’ll need to enter your password.

## Transaction History Screen

You can view your list of transactions here.

Transaction amounts are masked for your security. To see the exact amount, please use Face ID.

You can click on any transaction to view its details.

## Trasaction Details Screen

Here, you can see additional information about the transaction, including the Reference ID.
