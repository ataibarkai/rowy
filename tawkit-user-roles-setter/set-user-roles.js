// usage:
// node set-user-roles.js [projectId] [email] [serviceAccountFilePath]
// example:
// node set-user-roles.js markus-copilotkit-rowy markus.ecker@gmail.com ./firebase-service-account2.json

const admin = require("firebase-admin");

// Retrieve arguments from the command line or use default values
const projectId = process.argv[2] || "tawkit-rowy";
const mainAccountEmail = process.argv[3] || "atai@tawkit.app";
const serviceAccountFile = process.argv[4] || "./firebase-service-account.json";

console.log(`Running on ${projectId}`);

// Import the service account key file
const serviceAccount = require(serviceAccountFile);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
});

const auth = admin.auth();

const setClaims = async (email, claims) => {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, claims);
};

// Call the setClaims function with email and roles
setClaims(mainAccountEmail, {
  roles: ["ADMIN"],
});
