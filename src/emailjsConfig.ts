/**
 * EmailJS Configuration
 * ─────────────────────────────────────────────────────────────
 * To get these values:
 *  1. Go to https://www.emailjs.com and sign up (free — 200 emails/month)
 *  2. Add an Email Service (Gmail recommended) → copy the Service ID
 *  3. Create an Email Template → copy the Template ID
 *     Use these template variables in your EmailJS template:
 *       {{to_email}}   — guest's email address
 *       {{to_name}}    — guest's name
 *       {{booking_id}} — booking ID
 *       {{room}}       — room type
 *       {{checkin}}    — check-in date
 *       {{checkout}}   — check-out date
 *       {{dates}}      — formatted date range
 *       {{price}}      — price per night
 *  4. Go to Account → copy your Public Key
 * ─────────────────────────────────────────────────────────────
 */

export const EMAILJS_CONFIG = {
  PUBLIC_KEY:   'YOUR_PUBLIC_KEY',     // e.g. 'user_aBcDeFgHiJkLmNoPq'
  SERVICE_ID:   'YOUR_SERVICE_ID',     // e.g. 'service_gmail'
  TEMPLATE_ID:  'YOUR_TEMPLATE_ID',   // e.g. 'template_booking_conf'
};

export const IS_EMAILJS_CONFIGURED =
  EMAILJS_CONFIG.PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY' &&
  EMAILJS_CONFIG.SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
  EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
