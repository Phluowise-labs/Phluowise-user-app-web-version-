// Auth Functions

async function signUp(fullName, email, phone, password, userType) {
    try {
        const uniqueId = ID.unique();

        // 1. Create Account
        await account.create(uniqueId, email, password, fullName);

        // 2. Create Session
        await account.createEmailPasswordSession(email, password);

        // 3. Create Database Entry
        await databases.createDocument(
            appwriteConfig.DATABASE_ID,
            appwriteConfig.CUSTOMER_TABLE,
            ID.unique(),
            {
                full_name: fullName,
                email: email,
                phone_number: phone,
                user_type: userType,
                uid: uniqueId
            }
        );

        // 4. Create Verification (optional, based on original code)
        // await account.createVerification("https://phluowise-website.pages.dev/verified");

        alert("Account created successfully!");
        window.location.href = 'home.html';

    } catch (error) {
        console.error("Sign Up Error:", error);
        alert("Error creating account: " + error.message);
    }
}

async function signIn(email, password) {
    try {
        // Delete existing session if any (to be safe)
        try {
            await account.deleteSession('current');
        } catch (e) {
            // No active session
        }

        await account.createEmailPasswordSession(email, password);

        // Fetch user data logic can go here if needed to store in local storage
        // const user = await account.get();
        // localStorage.setItem('user', JSON.stringify(user));

        window.location.href = 'home.html';

    } catch (error) {
        console.error("Sign In Error:", error);
        alert("Error signing in: " + error.message);
    }
}

async function signOut() {
    try {
        await account.deleteSession('current');
        window.location.href = 'signin.html';
    } catch (error) {
        console.error("Sign Out Error:", error);
    }
}

async function checkSession() {
    try {
        const user = await account.get();
        // User is logged in
        return user;
    } catch (error) {
        // Not logged in
        return null;
    }
}
