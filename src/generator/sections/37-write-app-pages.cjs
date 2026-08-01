/* EMY generator section: 37-write-app-pages.cjs (source lines 99416-99462) */
const askEmyAboutHtml = askEmyAboutHowItWorksPageTemplate();
fs.writeFileSync(path.join(outDir, 'about-ask-emy.html'), askEmyAboutHtml, 'utf8');
manifest.push({ page: 'about-ask-emy.html', component: 'StaticAskEmyAbout', bytes: Buffer.byteLength(askEmyAboutHtml) });

const emySigninHtml = emySigninPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-signin.html'), emySigninHtml, 'utf8');
manifest.push({ page: 'emy-signin.html', component: 'StaticEMYSignIn', bytes: Buffer.byteLength(emySigninHtml) });

const emySignupHtml = emySignupPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-signup.html'), emySignupHtml, 'utf8');
manifest.push({ page: 'emy-signup.html', component: 'StaticEMYSignUp', bytes: Buffer.byteLength(emySignupHtml) });

const emyForgotPasswordHtml = emyForgotPasswordPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-forgot-password.html'), emyForgotPasswordHtml, 'utf8');
manifest.push({ page: 'emy-forgot-password.html', component: 'StaticEMYForgotPassword', bytes: Buffer.byteLength(emyForgotPasswordHtml) });

const emyBusinessProfileHtml = emyBusinessProfilePageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-business-profile.html'), emyBusinessProfileHtml, 'utf8');
manifest.push({ page: 'emy-business-profile.html', component: 'StaticEMYBusinessProfile', bytes: Buffer.byteLength(emyBusinessProfileHtml) });

const emyCustomerHomeHtml = writeCustomerHomePages(emyCustomerHomePageTemplate());
manifest.push({ page: 'emy-customer-home.html', component: 'StaticEMYCustomerHomeLocked', bytes: Buffer.byteLength(emyCustomerHomeHtml) });

const emyCustomerSearchHtml = emyCustomerSearchPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-customer-search.html'), emyCustomerSearchHtml, 'utf8');
manifest.push({ page: 'emy-customer-search.html', component: 'StaticEMYCustomerSearch', bytes: Buffer.byteLength(emyCustomerSearchHtml) });

const emyCustomerFeedsHtml = emyCustomerFeedsPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-customer-feeds.html'), emyCustomerFeedsHtml, 'utf8');
manifest.push({ page: 'emy-customer-feeds.html', component: 'StaticEMYCustomerFeeds', bytes: Buffer.byteLength(emyCustomerFeedsHtml) });

const emyCustomerChatHtml = emyCustomerChatPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-customer-chat.html'), emyCustomerChatHtml, 'utf8');
manifest.push({ page: 'emy-customer-chat.html', component: 'StaticEMYCustomerChat', bytes: Buffer.byteLength(emyCustomerChatHtml) });

const emyNotificationSettingsHtml = emyNotificationSettingsPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-notification-settings.html'), emyNotificationSettingsHtml, 'utf8');
manifest.push({ page: 'emy-notification-settings.html', component: 'StaticEMYNotificationSettings', bytes: Buffer.byteLength(emyNotificationSettingsHtml) });

const emyCustomerProfileHtml = emyCustomerProfileRedirectTemplate();
fs.writeFileSync(path.join(outDir, 'emy-customer-profile.html'), emyCustomerProfileHtml, 'utf8');
manifest.push({ page: 'emy-customer-profile.html', component: 'StaticEMYCustomerProfile', bytes: Buffer.byteLength(emyCustomerProfileHtml) });

const emyConfirmationHtml = emyConfirmationPageTemplate();
fs.writeFileSync(path.join(outDir, 'emy-confirmation.html'), emyConfirmationHtml, 'utf8');
manifest.push({ page: 'emy-confirmation.html', component: 'StaticEMYConfirmationCode', bytes: Buffer.byteLength(emyConfirmationHtml) });

