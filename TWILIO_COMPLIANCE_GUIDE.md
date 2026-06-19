# Twilio SMS Compliance Fix — Error 30513

## Summary of Changes

Your IronBench Labs website now has **full SMS opt-in compliance** for Twilio's Error 30513. The issue wasn't your business address — it was your SMS consent workflow and documentation.

---

## What's Been Fixed

### 1. ✅ SMS Opt-In Checkbox on Contact Form
- **Location:** `https://ironbench.org/contact-me.html`
- **Details:** 
  - Unchecked by default (required by Twilio)
  - Clear, prominent SMS consent language
  - User must intentionally check the box
  - Phone number field added to collect phone numbers only when user opts in
  - Separate from account creation terms (not bundled with T&C)

### 2. ✅ SMS Policy Page
- **URL:** `https://ironbench.org/sms-policy.html`
- **Contents:** 
  - How to opt in (with visual example of the checkbox)
  - What messages users will receive
  - Message frequency and costs
  - How to opt out (STOP, HELP, account settings)
  - Privacy & data handling

### 3. ✅ Privacy Policy Page
- **URL:** `https://ironbench.org/privacy.html`
- **Key Section:** Explicitly states "SMS consent and phone numbers are NOT shared with third parties or affiliates for marketing purposes"

### 4. ✅ Terms of Service Page
- **URL:** `https://ironbench.org/terms.html`

---

## What to Submit to Twilio

When you resubmit your Twilio application, use these exact values in each field:

### Proof of Consent (Opt-In) Collected
**Change from:** `https://ironbench.org/`  
**Change to:** `https://ironbench.org/sms-policy.html`

This page shows the exact SMS checkbox and language users see.

---

### Use Case Description
**Replace the current empty/vague description with:**

```
IronBench Labs sends SMS messages to registered users for account notifications, customer support communication, team invitations, RSVP confirmations, and team management alerts.

Users provide their phone number and explicitly opt in before receiving SMS messages. The opt-in checkbox appears on our contact/signup form with clear language describing the types of messages they'll receive. Consent is collected separately from Terms of Service and Privacy Policy acceptance. Messages are transactional only and are not used for marketing.

Users can opt out at any time by replying STOP to any message or updating their account settings.
```

---

### Categories Selected
✅ Account Notifications  
✅ Customer Care

**Do NOT select** Marketing or Promotional — your messages are transactional only.

---

### Sample Messages

**Replace your current sample message** with these three, one at a time (or provide all three):

#### Sample 1: Verification Code (Account Notification)
```
IronBench Labs: Your verification code is 482391. This code expires in 10 minutes.

Reply STOP to opt out.
```

#### Sample 2: Team Invitation (Account Notification)
```
BenchBoard: You have been invited to join Coach Mike's 12U Softball team. View your invite here: https://benchboard.org/join/ABC123

Reply STOP to opt out.
```

#### Sample 3: RSVP Reminder (Customer Care)
```
BenchBoard: Game reminder - You're scheduled to play on Saturday at 10:00 AM. Confirm your attendance: https://benchboard.org/rsvp/XYZ789

Reply STOP to opt out.
```

---

### Opt-In Confirmation Message (Add This)
```
You are subscribed to IronBench Labs SMS notifications. Message frequency varies. Msg & data rates may apply. Reply STOP to cancel or HELP for help.
```

---

### Help Message Sample (Add This)
```
IronBench Labs Support: For assistance visit https://ironbench.org or email learnmore@ironbench.org. Reply STOP to unsubscribe.
```

---

### Privacy Policy URL
**Change from:** (leave empty or remove)  
**Change to:** `https://ironbench.org/privacy.html`

Make sure it explicitly says something like:
> "SMS consent and phone numbers are not shared with third parties or affiliates for marketing purposes."

✅ This is already in the page (see line in privacy.html).

---

### Terms URL
**Change from:** (leave empty or remove)  
**Change to:** `https://ironbench.org/terms.html`

---

## Screenshots to Provide

When Twilio asks for "Proof of Consent," they want visual evidence. You can:

1. **Take a screenshot** of `https://ironbench.org/contact-me.html` showing:
   - The phone number input field
   - The SMS opt-in checkbox (unchecked)
   - The clear SMS language
   - Link to SMS Policy

2. **Include a link** to `https://ironbench.org/sms-policy.html` which documents the full opt-in workflow

3. **Show the checkbox is unchecked by default** — Twilio reviewers verify this matters

---

## Key Points for Twilio Reviewers

When resubmitting, highlight:

1. **Proof URL now shows the actual opt-in workflow** — not just the homepage
2. **Checkbox is unchecked by default** — users must intentionally opt in
3. **SMS consent is separate from ToS/Privacy Policy** — users aren't forced to accept SMS as a condition of using the service
4. **Sample messages match the categories** (Account Notifications + Customer Care)
5. **Privacy policy explicitly protects SMS data** — not shared for marketing
6. **Help & STOP language is included** — users know how to unsubscribe

---

## Testing Your Form

Before you submit to Twilio, test the contact form:

1. Go to `https://ironbench.org/contact-me.html`
2. Fill in name, email, phone number
3. **Verify the SMS checkbox starts unchecked**
4. Check the box and submit
5. You should receive the contact submission via Web3Forms
6. Verify the SMS consent checkbox status is captured in the form data

---

## Common Gotchas (Avoid These)

❌ **Don't:** Combine SMS consent with required account creation terms  
❌ **Don't:** Have the SMS checkbox pre-checked  
❌ **Don't:** Say "we may share/sell SMS data" in privacy language  
❌ **Don't:** Provide the homepage as "Proof of Consent" — Twilio won't accept it  
❌ **Don't:** Use sample messages that don't match your categories  
❌ **Don't:** Forget to include STOP and HELP language in messages  

---

## Submission Checklist

- [ ] Update "Proof of Consent (Opt-In) Collected" to `https://ironbench.org/sms-policy.html`
- [ ] Update "Use Case Description" with the provided text
- [ ] Verify categories are: Account Notifications + Customer Care only
- [ ] Replace sample messages with the provided examples
- [ ] Add Opt-In Confirmation Message
- [ ] Add Help Message Sample
- [ ] Set Privacy Policy URL to `https://ironbench.org/privacy.html`
- [ ] Set Terms URL to `https://ironbench.org/terms.html`
- [ ] Take screenshot of the actual contact form showing the opt-in checkbox
- [ ] Test the form on the live site
- [ ] Verify the checkbox is unchecked by default
- [ ] Resubmit to Twilio with the new evidence

---

## Questions?

If Twilio asks for clarification on any field, use this principle:  
**Show them what users actually see** — not just what you describe. Screenshots of the real checkbox on the real form matter more than descriptions.

Good luck! 🚀
