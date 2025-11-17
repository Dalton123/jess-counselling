# Vercel 308 Redirect Fix - Quick Guide

## Problem Summary

Google Search Console shows "Page with redirect" errors because Vercel is serving **307 (temporary)** redirects instead of **308 (permanent)** redirects for non-www → www domain canonicalization.

**Why this matters:**
- 307 = Temporary → Google keeps indexing the non-www version
- 308 = Permanent → Google switches to indexing the www version
- Google won't validate fixes until redirects are 308

---

## Root Cause

**If you only have the www domain configured in Vercel**, Vercel automatically handles non-www → www redirects using its **default redirect type (307)**.

Your middleware and vercel.json configurations **cannot override** this platform-level redirect.

---

## The Solution

Add the non-www domain explicitly to Vercel and configure it to redirect with 308.

### Step-by-Step Instructions

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains

2. **Click "Add Domain"**

3. **Enter your non-www domain** (e.g., `example.com` without www)

4. **Configure the redirect:**
   - Check the box: "Redirect example.com to www.example.com (Recommended)"
   - Select radio button: **"Redirect to Another Domain"**
   - Choose from dropdown: **"308 Permanent Redirect"**
   - Target domain: `www.example.com` (your www version)

5. **Click "Save"**

6. **Wait a few minutes** for the change to propagate

---

## Verification

Test that the redirects are working with 308:

```bash
# Test HTTPS non-www redirect (should show 308)
curl -sI "https://example.com/" | head -10

# Test full redirect chain (both should show 308)
curl -IL "http://example.com/" | grep -E "(HTTP|Location)"
```

**Expected output:**
```
HTTP/2 308
location: https://www.example.com/
```

**Not this:**
```
HTTP/2 307  ❌ (This is the problem)
```

---

## Google Search Console Validation

Once you confirm 308 redirects are working:

1. Go to **Google Search Console**
2. Navigate to **Pages** → **Page indexing**
3. Find the **"Page with redirect"** issue
4. Click **"Validate Fix"**
5. Wait **1-2 weeks** for Google to re-crawl and validate

---

## Important Notes

### Vercel Domain Configuration

You should have **TWO domains** configured in Vercel:

| Domain | Configuration |
|--------|---------------|
| `example.com` (non-www) | **Redirect to Another Domain** → 308 → www.example.com |
| `www.example.com` (www) | **Connect to an environment** → Production |

### Why Code-Level Fixes Don't Work

If you only have the www domain in Vercel, these configurations **won't help**:
- ❌ `vercel.json` redirects with `"permanent": true`
- ❌ `middleware.ts` with `status: 308`
- ❌ `next.config.ts` redirects

**Why?** Vercel's platform-level redirect happens **before** your application code runs.

**Solution:** Add the non-www domain to Vercel explicitly.

---

## Cloudflare Considerations

If you're using Cloudflare DNS:

- ✅ **SSL/TLS mode** should be set to **"Full"** or **"Full (strict)"** (not "Flexible")
- ✅ This prevents redirect loops and ensures proper HTTPS handling
- ✅ Both domains (www and non-www) should be configured in Cloudflare DNS

---

## SEO Best Practices Checklist

Beyond the Vercel redirect fix, ensure:

- ✅ **Sitemap** contains only www URLs
- ✅ **Canonical tags** point to www version in all pages
- ✅ **robots.txt** references www sitemap URL
- ✅ **No hardcoded non-www URLs** in your codebase
- ✅ **Internal links** use www version

---

## Timeline

- **Immediately after fix:** 308 redirects should show in curl tests
- **1-2 weeks:** Google validates the fix
- **Result:** "Page with redirect" errors cleared, only www URLs indexed

---

## Troubleshooting

### Still showing 307 after adding domain?

1. Double-check the Vercel domain settings dropdown shows **"308 Permanent Redirect"**
2. Try the toggle trick:
   - Change to "Connect to an environment" → Save
   - Wait 2 minutes
   - Change back to "Redirect to Another Domain" → "308 Permanent Redirect" → Save
3. Trigger a redeployment to clear caches

### Error: "A domain cannot redirect to itself"

- Uncheck the automatic redirect checkbox at the top
- Manually configure the redirect options below
- Ensure the target domain is spelled correctly

---

## Summary

**The Problem:**
- Only www domain configured in Vercel
- Vercel serves default 307 redirects for non-www
- Google won't switch to indexing www version

**The Fix:**
- Add non-www domain to Vercel
- Configure it to redirect with 308 to www
- Verify with curl tests
- Submit validation to Google Search Console

**Expected Result:**
- 308 permanent redirects
- Google indexes only www version
- "Page with redirect" errors cleared

---

Last updated: 04/11/2025
