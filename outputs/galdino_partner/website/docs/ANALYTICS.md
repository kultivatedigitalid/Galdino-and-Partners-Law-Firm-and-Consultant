# Consent and analytics

PUBLIC_GTM_ID is empty until supplied. With no valid ID, no analytics script is loaded even if a visitor accepts analytics. Necessary storage contains only consent and short-lived language-switch scroll position.

Cookie preferences: accept analytics, reject optional storage, or manage preferences. Choice is stored locally for 180 days. Withdrawal disables application events, clears accessible _ga/_gid/_gat cookies and reloads the page. The preference dialog is available in the footer. Browser storage failures must not break navigation.

## GTM / GA4 setup

Use basic consent gating: load GTM only after affirmative analytics consent. No pre-consent Google requests. Configure the container to honour analytics consent and prohibit advertising tags.

Disable automatic GA pageviews and enhanced measurement for forms, site search and other features that could collect user input or complete URLs. Send an explicit page_view from the consent event using the supplied sanitised page_location and page_referrer. Override page_location for all GA events with origin + page_path. Never use form variables, page query parameters, search terms, email, phone, message or company names in tags.

Application events: consultation_cta_click, whatsapp_click, service_search, service_view, service_related_click, article_view, article_service_click, contact_form_start, contact_form_submit, contact_form_success, language_switch.

Allowed parameters: language, page_path, allowlisted-format entity_id, integer result_count. Service-search text and contact query values are not sent. A form-submit event is an attempt; success is emitted only on an API success response.

## Required deployed tests

Before consent: no Google/analytics network calls. After rejection: the same. After acceptance with configured container: one initial pageview and correct application events. After withdrawal: no subsequent application events. Inspect actual GA DebugView and network payloads to ensure container configuration does not add PII.

External validation remains pending because no GTM ID/account access has been supplied.
