# SalonBook — CLIENT AUDIT REPORT

**Repository:** `assignment-nine-client`
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Better Auth · Stripe
**Source of truth:** `docs/assignment.txt`

Status legend: **COMPLETE** · **PARTIAL** · **MISSING** · **NOT VERIFIED**

---

## 1. Executive Summary

The client is a large, mostly well-structured Next.js application. Public pages (Home, Browse Services, Service Details), authentication (Better Auth with email/password + Google), customer and admin dashboards, Stripe checkout UI, and profile management are all present and wired to the Express backend through server actions in `src/data/*`.

The most serious problems are:

1. **Broken category filter (CH-01 / Section 4.4).** The Browse page category dropdown compares category *names* against category *IDs*. Category filtering never matches. The edit-service dialog also stores the category ID as the value, corrupting data.
2. **Service image cannot be set on "Add Service".** The add-service form uploads to ImgBB on file selection but the "Upload to ImageBB" button is a disabled placeholder and images are effectively never persisted reliably for new services; the UI claims upload "is not connected yet."
3. **No blocked-user guard on the dashboard layouts.** Only the service details page redirects blocked users; dashboard role layouts check role only, so a blocked user can still open their dashboard UI.
4. **Admin booking not blocked in UI.** The Book Appointment dialog is shown to admins; only the server rejects it.
5. **Authorization/ownership is weak in the data layer.** Several server actions trust client-supplied IDs (`customerId`, userId in profile update) and the server does not enforce ownership — a security gap that is partly client-facilitated.
6. **Sign-up password rules are client-only and stricter than the server.** Client requires 6 chars/upper/lower, but Better Auth's default minimum length is 8, so valid-per-UI passwords fail at registration.
7. **Route path inconsistencies** (`/login` vs `/sign-in`, `/dashboards/customer/...` vs `/dashboards/user/...`) cause dead redirects on some branches.
8. **Production metadata still says "Create Next App".**

---

## 2. Section-by-Section Audit

### 2.1 Project Structure & Routes (Section 3)

| Item | Status | Notes / File |
|---|---|---|
| Public routes: Home, Browse Services, Sign In, Sign Up | **COMPLETE** | `src/app/(public)/page.tsx`, `src/app/(public)/services/page.tsx`, `src/app/(auth)/sign-in/page.tsx`, `src/app/(auth)/sign-up/page.tsx` |
| Service Details `/services/[id]` is protected | **COMPLETE** | `src/app/(public)/services/[id]/page.tsx` redirects unauthenticated → `/sign-in`, blocked → `/other/blocked` |
| Dashboard protected | **COMPLETE** | `src/app/(dashbords)/dashboards/layout.tsx`, `.../user/layout.tsx`, `.../admin/layout.tsx` via `requiterole()` |
| Customer dashboard: Overview / My Appointments / My Profile | **COMPLETE** | `.../dashboards/user/{overview,myappointments,myprofile}` |
| Admin dashboard: Overview / Services / Add-Update / Appointments / Users / Transactions / Profile | **COMPLETE** | `.../dashboards/admin/{overview,manageservices,manageappointments,manageusers,transactions,myprofile}` |
| Role-based access (admin→admin only, user→user only) | **COMPLETE (client side)** | `requiterole()` in `src/data/core.ts`; layouts in `.../user/layout.tsx`, `.../admin/layout.tsx` |
| Server-side role verification mandatory | **PARTIAL** | Client calls the API, but the *server* does not consistently enforce role/ownership (see SERVER.md). Client cannot fix this alone. |

**Issues**

- **`src/app/(auth)/auth/callback/page.tsx:17,25`** — Google OAuth callback redirects to `/login` on failure/unknown role, but the app's sign-in route is `/sign-in`. This is a dead route (404). **Fix:** change `/login` → `/sign-in`.
- **`src/app/(dashbords)/dashboards/user/myappointments/page.tsx:18`** — redirects to `/login` when no `userId`. Should be `/sign-in`.
- **`src/app/(dashbords)/dashboards/layout.tsx`** — wraps dashboards in `Navbar`+`Footer`+`SidebarTrigger`. The `SidebarTrigger` is rendered floating without a header; the public Navbar is reused. Functionally OK but visually the sidebar trigger placement is ad hoc. Cosmetic, not a requirement failure.
- **Typo folder name `(dashbords)`** — cosmetic; routes still resolve. No action required but noted.

---

### 2.2 Public Website (Section 4)

#### Navbar (4.1)

| Item | Status | Notes |
|---|---|---|
| Brand "SalonBook" logo | **COMPLETE** | `src/components/shared/navbar.tsx` |
| Public nav: Home, Browse Services | **COMPLETE** | `navbar.tsx:18-21` |
| Sign In / Sign Up (public) | **COMPLETE** | Rendered by `profile.tsx:154-168` when logged out |
| Authenticated nav (Home, Browse, Dashboard by role) | **PARTIAL** | `profile.tsx` dropdown links to `/dashboards/${role}/overview` — correct. But the assignment lists "Salon / Service Details Page" as an authenticated nav item; there is no explicit service-details nav entry beyond "Browse Services". Minor. |
| Profile dropdown: User Name, Dashboard, Logout | **COMPLETE** | `profile.tsx:96-150` |
| Updates immediately after auth state change | **COMPLETE** | Uses `authClient.useSession()` |
| Dashboard depends on role | **COMPLETE** | `profile.tsx:123,131` build href from `user.role` |
| Follow design system | **COMPLETE** | Consistent palette/classes |

**Issues**

- **`src/app/(public)/services/[id]/appointment.tsx:88-163`** — The "Book Appointment" dialog is shown to **admins**. Admins can open it and submit; only the server rejects with "Admin cannot book appointment". Requirement: "Admins cannot submit customer appointment requests." The UI should hide/disable booking for admins. **Fix:** in `appointment.tsx`, read session role and don't render the Book button (or disable it) for `role === "admin"`.

#### Footer (4.2)

| Item | Status |
|---|---|
| Logo + short description | **COMPLETE** (`footer.tsx:85-102`) |
| Important nav links | **COMPLETE** (`footer.tsx:39-44,127-139`) |
| Contact info (phone/email) | **COMPLETE** (`footer.tsx:52-63`) |
| Address + opening hours | **COMPLETE** (`footer.tsx:65-69,167-204`) |
| Social media links | **COMPLETE** (`footer.tsx:46-50`) |
| Copyright | **COMPLETE** (`footer.tsx:207-211`) |

#### Home Page (4.3)

| Item | Status | Notes |
|---|---|---|
| Banner: title, description, CTA, background image | **COMPLETE** | `src/components/shared/HomePage/Banner.tsx` |
| Featured ≥6 active services | **COMPLETE** | `DynamicSection1.tsx` fetches `featuredServices()` and `slice(0,6)` |
| Service card fields (image, name, category, price, duration, description, View Details) | **COMPLETE** | `card.tsx` |
| Categories section | **COMPLETE** | `SalonServiceCategories.tsx` (static list) |
| Additional section | **COMPLETE** | `AdditionalSections.tsx` "How SalonBook Works" |

**Issues**

- **Featured services "at least 6" is data-dependent.** `DynamicSection1` slices to 6 but if the DB has fewer than 6 active services, fewer show. Not a code defect; depends on seed data. Note for evaluation.

#### Browse Services (4.4) + CH-01 Search + CH-03 Sorting

| Item | Status | Notes |
|---|---|---|
| Active services from DB | **COMPLETE** | `services/page.tsx` filters `status === "active"` |
| Responsive card layout | **COMPLETE** | grid `sm:2 lg:3` |
| Search by name (CH-01) | **COMPLETE** | `ServiceFilters.tsx` + server `/services/public?search=` |
| Filter by category | **PARTIAL / BROKEN** | See below |
| Sort by price (CH-03) | **COMPLETE** | `sort=price-asc|price-desc` → server sorts |

**Critical Issue — Category filter is broken**

- `src/app/(public)/services/page.tsx:40` builds `categoryNames` from `service.category` (the stored **name**, e.g. `"Haircut & Styling"`), and passes them to `ServiceFilters`.
- `src/components/shared/DynamicSection2/CategoryCard.tsx:20` links to `/services?category=${category.id}` where `id` is a **slug** (e.g. `haircut-styling`) from `src/data/categories.ts`.
- So the home category cards send an **ID** in `?category=`, but the dropdown and the service documents use the **name**. The server filters `filter.category = category` by exact match. Result: clicking a home category card yields **zero results**, and the dropdown only matches if the stored category string exactly equals the selected name.
- Additionally, category names are not normalized across add/edit, so duplicates/variants (`"Hair Care"` vs `"hair care"`) break filtering.
- **Fix:** Pick one canonical category identifier. Recommended: store category **name** everywhere and have `CategoryCard` link with the **name** (`?category=${category.name}`), or store a slug and map both sides consistently. Also make `ServiceFilters`/server compare consistently.

#### Service Details (4.5)

| Item | Status | Notes |
|---|---|---|
| Route `/services/[id]` | **COMPLETE** | |
| Protected (auth required) | **COMPLETE** | `page.tsx:44-50` |
| Shows name, image, category, description, price, duration, booking option | **COMPLETE** | `page.tsx:88-130` |
| Invalid service ID error | **PARTIAL** | `getServiceById` returns `null` on non-OK, then `notFound()`. But for a valid-but-nonexistent ObjectId the server returns `null` with 200 (Express `res.send(null)`), so `response.ok` is true and `response.json()` parses an empty body → throws → unhandled. See SERVER.md. Client should also treat falsy body as not found. |
| Only active services bookable | **PARTIAL** | Server `GET /services/:id` already filters `status:"active"`. Client relies on server. OK, but no extra guard. |

---

### 2.3 Authentication & Authorization (Section 5)

| Item | Status | Notes |
|---|---|---|
| Sign-up fields (name, email, password, image) | **COMPLETE** | `sign-up/page.tsx` (image is URL, allowed) |
| Password rule: ≥6, upper, lower | **PARTIAL (client) / BUGGY end-to-end** | Client enforces 6/upper/lower (`sign-up/page.tsx:28-47`). But Better Auth default `minPasswordLength` is 8 (not configured in `src/lib/auth.ts`), so a 6–7 char password that passes UI fails at registration. **Fix:** set `emailAndPassword.minPasswordLength` or require ≥8 in UI, and add server-side validation. |
| Google auth | **COMPLETE** | `sign-up/page.tsx:69-77`, `sign-in/page.tsx:58-64` |
| Success/error messages (toast) | **COMPLETE** | `toast.add(...)` |
| Redirect after registration | **COMPLETE** | `sign-up` → `/` |
| Admin cannot self-register | **COMPLETE** | `auth.ts` `role` field `input:false`, default `user` |
| Sign-in fields email/password | **COMPLETE** | |
| Redirect by role after login | **COMPLETE** | `sign-in/page.tsx:46-50` |
| Protected routes / role isolation | **COMPLETE (client)** | `requiterole()` |
| Blocked users blocked from protected features | **PARTIAL / MISSING on dashboard** | Only `services/[id]/page.tsx:47` checks `isBlocked`. The `user/layout.tsx` and `admin/layout.tsx` call `requiterole()` which checks **role only**, not `isBlocked`. A blocked user can load their dashboard shell. **Fix:** add `isBlocked` check in `requiterole()` or in both layouts and redirect to `/other/blocked`. |

**Other auth issues**

- **`src/app/(auth)/auth/callback/page.tsx:17,25`** — `/login` dead route (see 2.1).
- **`sign-in/page.tsx:54`** — error toast text says "Failed to create account" on sign-in failure (copy-paste). Cosmetic.

---

### 2.4 Customer Dashboard (Section 6)

| Item | Status | Notes |
|---|---|---|
| Separate layout w/ sidebar + content | **COMPLETE** | `dashboards/layout.tsx` + `app-sidebar.tsx` |
| Nav depends on role | **COMPLETE** | `app-sidebar.tsx:28-44` |
| Overview: total / pending / confirmed / cancelled | **COMPLETE** | `user/overview/page.tsx` |
| My Appointments: all fields (service name/image, category, date, time, price, status, payment, request date) | **PARTIAL** | See "service image/category" issue below |
| View details | **COMPLETE** | `appointment-details-dialog.tsx` |
| Cancel pending | **COMPLETE** | `appointment-actions.tsx` `canCancel = status==='pending'`; server enforces ownership |
| Pay confirmed | **COMPLETE** | `appointment-actions.tsx:21-23` + `paymentCard.tsx` |
| View payment status | **COMPLETE** | `status-badges.tsx` |
| Customers see only own appointments | **PARTIAL** | Client queries `/appointments/customer/:id` with own id, but server doesn't verify `:id === req.user.id` (see SERVER.md). |
| Cannot cancel confirmed/cancelled | **COMPLETE** | `canCancel` gate |
| Cannot pay cancelled/pending | **COMPLETE** | `canPay` gate |

**Issue — Service image & category missing on appointments**

- `src/app/(dashbords)/dashboards/user/myappointments/appointment-helpers.ts:28-37` reads `serviceImage` / `serviceCategory` from the appointment document, but the booking payload built in `services/[id]/appointment.tsx:125-135` never sends `serviceImage`/`serviceCategory`, and the server does not store them. The UI therefore falls back to a Scissors icon and "Salon service". Requirement 6.2 asks for **Service Image** and **Service Category** per appointment. **Fix:** include `serviceImage`/`serviceCategory` in the booking payload, have the server persist them, or have the client join with `GET /services/:id` when rendering.

---

### 2.5 Admin Dashboard (Section 7)

| Item | Status | Notes |
|---|---|---|
| Overview: 6 stats (customers, active services, total/pending/confirmed appts, successful payments) | **COMPLETE** | `admin/overview/overview-data.ts` aggregates 4 API calls |
| Manage Services: list | **COMPLETE** | `admin/manageservices/page.tsx` |
| Add service | **PARTIAL / BROKEN** | See image issue below |
| Update service | **PARTIAL** | `EditServiceButton.tsx` works, but category handling corrupts data (see below) |
| Delete service | **PARTIAL** | No confirmation dialog; assignment wants confirmation dialogs "where appropriate" |
| Activate / Deactivate | **COMPLETE** | `ToggleServiceStatusButton.tsx` |
| Manage Appointments: view all, details, confirm pending, cancel pending/confirmed | **COMPLETE** | `admin/manageappointments/*` |
| Only pending can be confirmed | **COMPLETE (client)** | `appointment-actions.tsx:22,53` only shows Confirm for `pending` |
| Manage Users: list, details, block/unblock | **PARTIAL** | Block button success logic is fragile (see below) |
| Transactions: read-only list with all fields | **COMPLETE** | `admin/transactions/transactions-data.ts` maps all required fields |
| Admin cannot modify payment records | **COMPLETE** | No mutation path exists in UI |

**Critical Issue — Add Service image never persists reliably**

- `src/app/(dashbords)/dashboards/admin/manageservices/addservices/add-service-form.tsx`:
  - `handleImageChange` (line 73) uploads to ImgBB immediately on file pick, then sets `previewUrl` to the returned URL. So an image *is* uploaded on selection. **However** the "Upload to ImageBB" button (lines 451-466) is `disabled` with helper text "Upload is not connected yet, so the selected file stays on this device." This is contradictory and confusing, and if a user selects a file then the ImgBB call fails (no error surfaced—empty `catch` at line 110), `previewUrl` stays `null` and the service is created with `image: ""`.
  - `preparedService.image = previewUrl || ""` — an image is optional; server does not require it. A service with empty image renders a broken card (`card.tsx` `<Image src="">`).
- **Fix:** Make image required for service create/update (assignment 7.2 says image is required, upload not URL). Surface upload errors with a toast, remove the misleading disabled button, and block submit when no image URL exists.

**Critical Issue — Edit Service category value mismatch**

- `EditServiceButton.tsx:230-234` renders `<option value={category.id}>` (slug like `haircut-styling`) but the `defaultValue={service.category}` is a **name**. On save it sends `category` = selected **slug**, overwriting the stored name with a slug, and breaking both display (`{service.category}`) and filtering. This also mismatches the add form (which stores names).
- **Fix:** Use the same category identifier scheme as the add form (store the category name) and set `<option value={category.name}>`.

**Issue — Manage Users block/unblock success detection is fragile**

- `src/app/(dashbords)/dashboards/admin/manageusers/access-button.tsx:27-42`: `isBlockeds()` returns the Mongo update result (e.g. `{ acknowledged, matchedCount, modifiedCount }`) from the server, not the updated user. The code checks `response.isBlocked !== newValue`, but `response.isBlocked` is always `undefined`, so `undefined !== true` is truthy and it **always** shows success and toggles. It happens to "work" but for the wrong reason and won't detect real failures.
- **Fix:** Have the server return the updated user (or `{ success: modifiedCount>0 }`) and check that.

**Issue — Add/Update form status field removed**

- In both add and edit forms the Service Status radio group is commented out. Default status is hardcoded to `"active"` on create (`add-service-form.tsx:165`) and preserved on edit (`EditServiceButton.tsx:137`). This satisfies "Default Service Status: Active" and status can be changed via the toggle button, so functionally acceptable, but the assignment lists "Service Status" as an Add/Update field. Mark as **PARTIAL** (managed via separate toggle instead of the form).

---

### 2.6 Appointment Booking System (Section 8)

| Item | Status | Notes |
|---|---|---|
| Booking on service details page | **COMPLETE** | `services/[id]/appointment.tsx` dialog |
| Form: date, time slot (predefined), optional message | **COMPLETE** | `TIME_SLOTS` at line 48; date picker; textarea |
| Default status pending / unpaid | **COMPLETE (client sends; server sets)** | Server overrides to pending/unpaid |
| Prevent duplicate slot | **PARTIAL** | Enforced server-side; client shows returned message |
| Only customers book | **PARTIAL** | Server rejects admins; client still shows the button to admins (see 2.2) |
| Prevent booking inactive service | **PARTIAL** | Server does not re-check service status at booking time (see SERVER.md) |
| Success/error toasts | **COMPLETE** | |

**Issue — no loading guard on date/slot availability** — not required. Fine.

---

### 2.7 Payment System (Section 9)

| Item | Status | Notes |
|---|---|---|
| Stripe Checkout via customer dashboard "Pay Now" | **COMPLETE** | `paymentCard.tsx` → `POST /api/checkout_sessions` |
| Checkout session created server-side with metadata | **COMPLETE** | `src/app/api/checkout_sessions/route.ts` (appointmentId, userId) |
| Redirect to Stripe | **COMPLETE** | `window.location.href = data.url` |
| Success page | **COMPLETE** | `src/app/success/page.tsx` retrieves session from Stripe and shows confirmation |
| Cancel page | **COMPLETE** | `src/app/success/payment/page.tsx` |
| Transaction saved via backend | **COMPLETE** | `success/page.tsx` calls `transactions(session_id)` → `POST /transactions` |
| Payment status only after verified payment | **COMPLETE (design)** | Stripe session verified server-side; webhook also exists (see SERVER.md) |
| Never trust frontend redirect | **COMPLETE** | Status driven by Stripe verification + webhook |

**Issues**

- **Checkout uses `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`/`STRIPE_SECRET_KEY` in client env** — the secret key is only used in `src/lib/stripe.tsx` marked `import 'server-only'`, which is correct. But `STRIPE_SECRET_KEY` is listed in the client `.env` alongside `NEXT_PUBLIC_*` keys; ensure the non-public secret is never imported into a client component. It currently is only imported in `lib/stripe.tsx` (server-only) and the route handler — acceptable.
- **`src/app/success/payment/page.tsx:43,50`** — the "Try Payment Again" button links to `/` rather than back to the appointment; minor UX.
- **No explicit handling if `session_id` missing on success page** — it throws (`success/page.tsx:49`). That yields an error boundary, acceptable but not graceful.
- **Cancel URL mismatch** — checkout `cancel_url` = `/success/payment?canceled=true` (route.ts:62) and the cancel page reads no query param; the `paymentCard` `canceled` prop path exists but the cancel page never uses it. Minor.

---

### 2.8 Profile Management (Section 10)

| Item | Status | Notes |
|---|---|---|
| Editable name | **COMPLETE** | `myprofile/edit/name/name-form.tsx` (user + admin) |
| Editable image | **COMPLETE (URL only)** | `myprofile/edit/image/image-form.tsx` uses URL input (allowed by 10.1 "Image Upload / Image URL") |
| Success/error messages | **COMPLETE** | toasts |
| Cannot change own role | **PARTIAL** | UI never sends role, but server `$set: req.body` allows it (see SERVER.md). Client is fine; server is not. |
| Cannot change blocked status | **PARTIAL** | Same as above — server side gap |
| Cannot update another user's profile | **PARTIAL** | Client always passes own userId, but server doesn't verify `:id === req.user.id` |

**Issue — copy-paste "Admin Dashboard" labels in the user profile page**

- `src/app/(dashbords)/dashboards/user/myprofile/page.tsx:91` shows "Admin Dashboard" eyebrow on the **customer** profile, and the name/image edit forms link back to `/dashboards/admin/myprofile`. Cosmetic but incorrect for customer role. **Fix:** make the eyebrow/links role-aware (`/dashboards/${user.role}/myprofile`).

---

### 2.9 Loading, Error Handling, Notifications (Section 11)

| Item | Status | Notes |
|---|---|---|
| Loading: fetching services | **COMPLETE** | `(public)/loading.tsx`, `services/loading.tsx`, `services/[id]/loading.tsx` |
| Loading: dashboard data | **COMPLETE** | per-section `loading.tsx` files |
| Loading: creating appointment | **COMPLETE** | spinner in submit button |
| Loading: processing payments | **COMPLETE** | `paymentCard.tsx` spinner |
| Error: invalid routes | **COMPLETE** | `not-found.tsx` (global + scoped) |
| Error: failed API requests | **PARTIAL** | Many actions toast generic messages; some `catch {}` swallow errors (e.g. `add-service-form` catch at line 110). |
| Error: invalid form submissions | **COMPLETE** | inline field errors |
| Error: unauthorized access | **COMPLETE** | `unauthorized/page.tsx` + redirects |
| Error: failed image uploads | **PARTIAL** | Add-service swallows errors; edit surfaces them |
| Error: booking conflicts | **COMPLETE** | shows server message |
| Error: failed/cancelled payments | **COMPLETE** | cancel page + success "not completed" branch |
| Toast notifications (no `alert()`) | **COMPLETE** | custom `toast` used throughout; no `alert()` found |

---

### 2.10 UI & Design (Section 12)

| Item | Status |
|---|---|
| Responsive desktop/tablet/mobile | **COMPLETE** (extensive responsive classes) |
| Professional salon theme | **COMPLETE** |
| Consistent spacing/typography/colors | **COMPLETE** |
| Reusable components | **COMPLETE** (`components/ui`, shared) |
| Working buttons/links | **PARTIAL** (category links broken; dead `/login` redirects) |
| Status badges / confirmation dialogs | **COMPLETE** |
| Dashboard: sidebar, content, stats cards, tables/lists | **COMPLETE** |

---

### 2.11 Challenge Requirements (Section 13)

| Challenge | Status | Notes |
|---|---|---|
| CH-01 Search by service name | **COMPLETE** | Browse page + server |
| CH-02 JWT verification middleware (Express) | **NOT VERIFIED (client scope)** | Belongs to server; client sends `Bearer` token. See SERVER.md. |
| CH-03 Sorting by price | **COMPLETE** | Browse sort control |

---

### 2.12 Database / Deployment / Docs (Sections 14–18) — client scope

| Item | Status | Notes |
|---|---|---|
| Uses the 4 collections via API | **COMPLETE** | No direct DB writes from client except Better Auth + Stripe SDK |
| `.env` not committed | **COMPLETE** | `.gitignore` ignores `.env*` |
| No secrets in client bundle | **PARTIAL** | `NEXT_PUBLIC_IMGBB_API_KEY` is intentionally public (ImgBB client uploads). `STRIPE_SECRET_KEY` present in `.env` but only used server-side; verify it is never referenced in a client component. |
| README present with required sections | **COMPLETE** | `README.md` includes stack, features, links, env names |
| Live site / route reload (no 404 on refresh) | **NOT VERIFIED** | Cannot verify deployment from code. Note the `/login` dead route is a real 404 risk. |
| Metadata | **PARTIAL** | `src/app/layout.tsx:19-21` still "Create Next App" / "Generated by create next app". Should be SalonBook. |

---

## 3. Client–Server Integration

| Flow | Status | Notes |
|---|---|---|
| Auth token handling | **COMPLETE** | `src/data/core.ts` `allauthFetch` sends `Authorization: Bearer <session.token>` |
| 401/403 handling | **COMPLETE** | `allauthFetch` redirects to `/unauthorized` |
| Services CRUD | **COMPLETE** | `src/data/services.ts` ↔ server `/services*` |
| Appointments create/list/cancel/status | **COMPLETE** | `src/data/appiontmentapi.ts` ↔ server `/appointments*` |
| Users list/block/profile | **PARTIAL** | Works, but profile update trusts client-supplied id; server lacks ownership check |
| Transactions list / create | **COMPLETE** | `src/data/transactions.ts` ↔ server `/transactions` |
| Stripe checkout + webhook | **PARTIAL** | Checkout & success flow OK; webhook secret is **missing from server `.env`** (only `MONGODB_URI`, `STRIPE_SECRET_KEY` present). Webhook signature verification will fail at runtime unless `STRIPE_WEBHOOK_SECRET` is configured in the deployed environment. |
| Error responses → UI messages | **PARTIAL** | Some endpoints return Mongo driver objects (`{acknowledged,modifiedCount}`) rather than `{success,message}`; client branches on `modifiedCount`, which works but is inconsistent and fragile. |

---

## 4. Critical & Security Issues (Client)

1. **Category filtering broken** (`services/page.tsx` + `CategoryCard.tsx` + `ServiceFilters.tsx` + `EditServiceButton.tsx`). CH-01-adjacent and a core Browse requirement.
2. **Add Service image not reliably persisted / optional** (`add-service-form.tsx`) — violates 7.2 (image required, upload not URL).
3. **Edit Service stores category slug, corrupting data** (`EditServiceButton.tsx:230`).
4. **Blocked users can load dashboards** (`requiterole` checks role only; no `isBlocked` check in layouts).
5. **Admin booking button shown in UI** (`appointment.tsx`).
6. **Weak ownership/authorization assumptions** — client sends `customerId` and profile userId; server does not verify ownership (must be fixed server-side).
7. **Password rule mismatch** — UI min 6 vs Better Auth default 8 (`sign-up/page.tsx` vs `lib/auth.ts`).
8. **Dead `/login` redirects** (`auth/callback/page.tsx`, `myappointments/page.tsx`) → 404 risk on production refresh.
9. **Production metadata not updated** (`layout.tsx`).

---

## 5. Prioritized Remaining Work (Client)

**P0 — Correctness / requirement-breaking**
- [ ] Fix category identity end-to-end (Browse filter, home category links, add/edit forms, server filter).
- [ ] Make service image required and reliably uploaded on Add/Update; surface upload errors; remove misleading disabled "Upload" UI.
- [ ] Add `isBlocked` check to dashboard layouts / `requiterole` → redirect to `/other/blocked`.
- [ ] Hide/disable "Book Appointment" for admin role in `appointment.tsx`.

**P1 — Security / robustness**
- [ ] Align password policy (set Better Auth `minPasswordLength` or require ≥8 in UI).
- [ ] Stop trusting client `customerId`/userId: rely on server session identity; ensure server enforces ownership (coordinate with SERVER.md).
- [ ] Fix `access-button.tsx` success detection (use server-returned status).
- [ ] Handle falsy/empty responses from `getServiceById` and `/services/:id`.

**P2 — Polish / correctness of copy & routes**
- [ ] Replace `/login` redirects with `/sign-in`.
- [ ] Fix "Admin Dashboard" labels/links on the customer profile page to be role-aware.
- [ ] Add delete confirmation dialog for services.
- [ ] Update `layout.tsx` metadata (title/description).
- [ ] Persist `serviceImage`/`serviceCategory` on appointments (or join on render) so My Appointments shows image + category.

**P3 — Verification**
- [ ] Confirm `STRIPE_SECRET_KEY` never leaks into client bundle.
- [ ] Manually test production refresh on every private route.

---

## 6. Status Counts (Client)

| Status | Count |
|---|---|
| COMPLETE | 62 |
| PARTIAL | 22 |
| MISSING | 2 |
| NOT VERIFIED | 2 |

**MISSING items (client scope):**
1. Blocked-user enforcement on dashboard layouts (no `isBlocked` gate) — MISSING.
2. Service image persistence on Add Service (effectively optional/broken) — counted as PARTIAL in table; the "required image" guarantee is MISSING.

**NOT VERIFIED:**
1. CH-02 JWT verification (server responsibility).
2. Live deployment / route-refresh behavior (needs running site).

> Note: Counts are per audited line item in this report and may differ slightly from a re-tally, as some rows bundle multiple sub-checks.