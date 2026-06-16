# Supabase Custom Email Templates

This folder contains custom email templates for Prosvasimi.

## How to set up custom confirmation email in Supabase

1. Go to **Supabase Dashboard** → Your project (`chsfpnxefnddswfsqety`)
2. Navigate to **Authentication** → **Email Templates**
3. Select **Confirm signup** template
4. Replace the content with the HTML from `confirmation.html`
5. Click **Save**

## Template variables

Supabase provides these variables in email templates:
- `{{ .ConfirmationURL }}` - The confirmation link (required)
- `{{ .Data.name }}` - User's name (set during signup)
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - The confirmation token

## Important Notes

1. **Logo URL**: The template references `https://www.prosvasimi.com/images/logo.png` - Make sure this URL is publicly accessible
2. **Site URL**: In Authentication → URL Configuration, set Site URL to `https://www.prosvasimi.com`
3. **Redirect URLs**: Add `https://www.prosvasimi.com/**` to allowed redirect URLs

## Other Email Templates

You can also customize these templates in Supabase:
- **Magic Link** - For passwordless login
- **Change Email Address** - When user changes email
- **Reset Password** - Password reset emails

## Multilingual Support

For multilingual emails, you would need to use Supabase Edge Functions or a custom email provider. The default template is in English but includes the user's name for personalization.
