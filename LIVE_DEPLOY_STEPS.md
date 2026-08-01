# EMY Live Deploy

The real registration flow is wired to Firebase Auth, Cloud Firestore, and Cloudinary.
Confirmation codes are wired through Firebase Cloud Functions, so the code is generated on the backend and sent through a real email/SMS sender.

## Firebase Project

- Project: `my-emy-db032`
- Hosting public folder: `linked-pages/restore-may20`
- Firebase config file: `linked-pages/restore-may20/auth-config.js`
- Account runtime: `linked-pages/restore-may20/emy-account-runtime.js`
- Functions folder: `functions`

## What Is Real Now

- Customer/business signup creates a Firebase Auth user.
- Firebase creates the real account.
- Firebase Functions sends a real 4-digit EMY confirmation code by email.
- The confirmation page verifies the real code with Firebase Functions.
- Optional phone-code fallback is wired through Twilio settings.
- Customer profile photos upload to Cloudinary.
- Business profile photos and covers upload to Cloudinary when the business profile is submitted.
- User, customer profile, business account, business profile, and approval records write to Firestore.
- Customer/search/business pages can sync approved/live business profiles from Firestore and render them through the existing real business UI.

## Deploy

1. Install Firebase CLI if it is not installed.
2. Run `firebase login`.
3. Configure an email sender for confirmation codes. Use SMTP settings from Brevo, MailerSend, Gmail app password, Amazon SES SMTP, or another provider:

```cmd
firebase functions:config:set emy.smtp.host="smtp.example.com" emy.smtp.port="587" emy.smtp.secure="false" emy.smtp.user="your-smtp-user" emy.smtp.pass="your-smtp-password" emy.email.from="EMY <no-reply@my-emy.com>" --project my-emy-db032
```

4. Optional phone-code fallback with Twilio:

```cmd
firebase functions:config:set emy.twilio.account_sid="AC..." emy.twilio.auth_token="your-token" emy.twilio.from="+15551234567" --project my-emy-db032
```

5. From this project folder, run:

```cmd
deploy-emy-live.cmd
```

The script deploys:

- Firebase Hosting
- Firestore security rules
- Firestore indexes
- Firebase Functions for email/phone confirmation codes

## After Deploy

In Firebase Console:

- Authentication -> Sign-in method: enable Email/Password.
- Authentication -> Settings -> Authorized domains: add your live domain.
- Functions: confirm `sendEmailVerificationCode` and `confirmEmailVerificationCode` deployed in `europe-west2`.
- Firestore Database: keep the rules from `firestore.rules`.
- Cloudinary: keep unsigned upload preset `emy_unsigned_upload` active for image/video uploads.

Business profiles stay under review until an admin marks the profile document as `approved`, `active`, `live`, or `public`.
