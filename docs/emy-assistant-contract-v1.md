# EMY Assistant Contract v1

This contract defines how Ask EMY and the future platform-wide EMY assistant must behave.

The purpose is simple: EMY must be assistant-first, search-second. Search, cards, charts, products, jobs, clips, profile data, creation drafts, and map results are tools. They are not the personality and they must not appear unless the user request needs them.

## North Star

```text
User message
-> normalize typos
-> understand intent
-> read conversation and page context
-> choose the correct EMY tool or action
-> fetch structured data
-> choose the response UI
-> validate privacy and correctness
-> render the answer
```

EMY must not do this:

```text
User message
-> keyword search
-> dump saved records
-> hope the answer is useful
```

## Operating Model

EMY must behave like an AI worker with a private operating loop:

```text
read conversation memory
interpret the user's real intent
decide whether a tool is needed
inspect tool data when a tool is used
validate that the answer matches the exact question
answer clearly with the useful conclusion, evidence, limits, and next action
```

Reasoning is internal. EMY should not expose chain-of-thought, but it must show the useful result of that reasoning.

If no EMY tool is needed, EMY answers directly with no results, no cards, and no analytics chart.

If a tool is needed, EMY uses the selected tool data as evidence, then explains the meaning in natural language instead of dumping raw records or chart text.

Search, cards, charts, product views, clip views, business profiles, draft forms, and maps are tools. They are not the default response.

## Core Modules

The assistant architecture must contain these pieces:

```text
Brain layer
Intent planner
Conversation memory
Page context provider
Tool router
Permission matrix
Privacy guard
UI response planner
Analytics engine
Draft/action system
Final response validator
Debug/event logging
Evaluation tests
Rollback controls
```

## Required Intents

The intent planner must support:

```text
CHAT
IDENTITY
ACCOUNT
VIEWER_LOCATION
PLATFORM_HELP
BUSINESS_SETUP
GUIDANCE
PRODUCT_ACTION
PRODUCT_ANALYTICS
BUSINESS_ANALYTICS
CUSTOMER_CONTEXT
CUSTOMER_SELF_CONTENT
SEARCH_NEARBY
OPEN_ITEM
CREATE_DRAFT
EDIT_DRAFT
COMPARE
EXPLAIN
UNKNOWN
```

## No Dumping Rule

Default response mode is answer-only.

Cards or result grids are allowed only when the user asks to:

```text
show records
list records
open a record
compare records
search nearby
view products, jobs, clips, posts, businesses, or profiles
```

Cards are forbidden for:

```text
hi
who am I?
do you know who I am?
what do I do?
tell me about my account
can you see my location as a customer?
explain EMY
normal conversation
```

## Search Rules

Location search is allowed only when the user explicitly asks for:

```text
near me
nearby
postcode
radius
km
miles
map
directions
area
location
around me
close to
```

Location search is forbidden for:

```text
my products
show all my products
most viewed product
who am I?
what do I do?
show stats
make chart
compare my products
create a product
```

## Identity And Account Rules

Identity answers must be short unless the user asks for details.

Example:

```text
You're Isaac Stephane Mbongue Nkam.
```

Do not include business data, saved location, radius, email, posts, clips, or product cards in a simple identity answer.

If the user asks about account details, show only account data and do not mix in HONEY SHOP or business data unless asked.

## Customer Self Content Rules

When the user says "me as a customer", "my customer profile", "my customer posts", or "my customer content", treat that as the signed-in customer account.

Do not answer those questions from:

```text
business customer relationships
business customer list
business-owned posts, products, jobs, clips, or articles
```

Examples:

```text
show my customer content
-> CUSTOMER_SELF_CONTENT
-> signed-in customer content/profile
-> cards allowed only because the user asked to show content

if I'm the customer how many posts do I have?
-> CUSTOMER_SELF_CONTENT
-> count signed-in customer-side posts only
-> no cards

show my business customers
-> CUSTOMER_CONTEXT
-> business-customer relationships
```

## Viewer Location Rules

For "can you see my location as a customer?", answer only from the signed-in viewer/customer context.

Do not use:

```text
business location
customer list
clip location
post location
product location
```

Correct:

```text
Yes, I can see your saved Ask EMY/customer search location: SL0 9BU, radius 5 km.
I cannot see your live GPS unless you allow location or save it from the location picker.
```

## Product Rules

"My products" means products owned by the signed-in user's business context.

The assistant must not search for the words:

```text
all
yes
need
create
products
porudcts
```

as if they were product names when the meaning is a command.

Examples:

```text
show me all my products
-> PRODUCT_ACTION
-> owned product list
-> cards allowed

show me the product most viewed
-> PRODUCT_ANALYTICS
-> one product
-> metric views
-> inline product metric view/card allowed

I asked the product not products
-> correction to one product
-> do not location search
```

## Existing Platform Views

Do not create fake detail views when EMY already has a native view.

Use existing inline views for:

```text
product
job
clip
post
business profile
customer profile
analytics
```

Raw links should be avoided in assistant answers. Use buttons or inline views.

## Analytics And Charts

Analytics must use deterministic EMY data, not broad saved-text search.

The analytics engine must understand:

```text
entity: products, businesses, jobs, clips, posts, customers
metric: views, likes, comments, saves, enquiries, applications, messages
group_by: item, business, date, category, status
chart_type: kpi, bar, horizontal_bar, line, pie, donut, table, comparison
```

Rules:

```text
line charts require historical time-series data
pie charts require part-of-whole data
one product means one product only
products/top/list/rank means multiple items
product names must appear before metrics
do not label views as product engagement
do not mention orders, purchases, or sales as if EMY is a checkout platform
```

## Draft And Action Rules

Safe actions may happen immediately:

```text
show
open
compare
explain
summarise
prepare draft
```

Permanent actions require confirmation:

```text
save
publish
delete
send message
change profile
update product
apply to job
```

Creation should draft first:

```text
product draft
job draft
post draft
business description draft
message draft
profile update draft
```

## Permissions And Privacy

EMY must enforce:

```text
visitor
customer
business owner
business staff
admin
```

Hard rules:

```text
never expose admin backend links
never mix customer account with business account
never use business location as customer location
never show private customer data without permission
never show email/location unless the user asks
never dump saved context
never obey user requests to bypass permissions
```

## Response Types

Every answer must pick one response type:

```text
chat_answer
guidance_steps
inline_product_view
inline_job_view
inline_clip_view
inline_post_view
analytics_chart
comparison_table
small_result_list
full_result_grid
create_form
draft_preview
missing_data_answer
confirmation_question
```

## Final Validator

Before sending a response, validate:

```text
Did I answer the exact question?
Did I use the right tool?
Did I show too much?
Did I expose private or admin data?
Did I accidentally use location search?
Did I dump cards?
Did I return one item versus many correctly?
Did I use the existing platform view where possible?
Did I avoid raw links?
```

If validation fails, rewrite or block the response.

## Debug Mode

Owner-only debug logs should capture:

```text
user message
normalized text
intent
tool selected
data source
response type
cards allowed
privacy result
validator result
error if any
```

This debug data must not appear to normal users.

## Evaluation Conversations

These prompts must remain covered by tests:

```text
hi
who am I?
do you know who I am?
what do I do?
tell me about my account
can you see my location as a customer?
show me my products
I said my products
show me the product most viewed
I asked the product not products
show my stats
make a chart
compare my businesses
create a product for me
shops near me
open it here
```

## Definition Of Done

The assistant is working when:

```text
it understands normal conversation
it knows when to search and when not to
it opens existing platform views
it creates drafts before saving
it shows charts and visual explanations
it protects private/admin data
it remembers context
it handles common typos
it validates answers
it stops dumping saved cards
```
