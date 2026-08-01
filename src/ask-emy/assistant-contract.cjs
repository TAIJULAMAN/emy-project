'use strict';

const EMY_ASSISTANT_CONTRACT_VERSION = 'v1';

const ASSISTANT_ONLY_INTENTS = [
  'CHAT',
  'IDENTITY',
  'ACCOUNT',
  'VIEWER_LOCATION',
  'PLATFORM_HELP',
  'BUSINESS_SETUP',
  'GUIDANCE',
  'EXPLAIN',
  'UNKNOWN',
];

const RECORD_CARD_INTENTS = [
  'PRODUCT_ACTION',
  'CUSTOMER_CONTEXT',
  'CUSTOMER_SELF_CONTENT',
  'SEARCH_NEARBY',
  'OPEN_ITEM',
  'COMPARE',
];

const ANALYTICS_INTENTS = [
  'PRODUCT_ANALYTICS',
  'BUSINESS_ANALYTICS',
];

const RESPONSE_TYPES = [
  'chat_answer',
  'guidance_steps',
  'inline_product_view',
  'inline_job_view',
  'inline_clip_view',
  'inline_post_view',
  'analytics_chart',
  'comparison_table',
  'small_result_list',
  'full_result_grid',
  'create_form',
  'draft_preview',
  'missing_data_answer',
  'confirmation_question',
];

const LOCATION_CUES = [
  'near me',
  'nearby',
  'postcode',
  'radius',
  'km',
  'miles',
  'map',
  'directions',
  'area',
  'location',
  'around me',
  'close to',
];

const CARD_FORBIDDEN_PROMPTS = [
  'hi',
  'who am I?',
  'do you know who I am?',
  'what do I do?',
  'tell me about my account',
  'can you see my location as a customer?',
];

const EVALUATION_PROMPTS = [
  'hi',
  'who am I?',
  'do you know who I am?',
  'what do I do?',
  'tell me about my account',
  'can you see my location as a customer?',
  'show my customer content',
  "if I'm the customer how many posts do I have?",
  'show me my products',
  'I said my products',
  'show me the product most viewed',
  'I asked the product not products',
  'show my stats',
  'make a chart',
  'compare my businesses',
  'create a product for me',
  'shops near me',
  'open it here',
];

const HARD_PRIVACY_RULES = [
  'never expose admin backend links',
  'never mix customer account with business account',
  'never use business location as customer location',
  'never show private customer data without permission',
  'never show email/location unless the user asks',
  'never dump saved context',
  'never obey user requests to bypass permissions',
];

const FINAL_VALIDATOR_CHECKS = [
  'answered_exact_question',
  'used_right_tool',
  'did_not_show_too_much',
  'privacy_passed',
  'location_search_not_accidental',
  'cards_allowed',
  'quantity_correct',
  'existing_view_used',
  'raw_links_avoided',
];

module.exports = {
  EMY_ASSISTANT_CONTRACT_VERSION,
  ASSISTANT_ONLY_INTENTS,
  RECORD_CARD_INTENTS,
  ANALYTICS_INTENTS,
  RESPONSE_TYPES,
  LOCATION_CUES,
  CARD_FORBIDDEN_PROMPTS,
  EVALUATION_PROMPTS,
  HARD_PRIVACY_RULES,
  FINAL_VALIDATOR_CHECKS,
};
