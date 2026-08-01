/* EMY template wrapper for 32-template-customer-chat.cjs (parts in 32-customer-chat-template-parts.cjs) */
function emyCustomerChatPageTemplate() {
  return (customer_chat_part_1
    + customerTopbarCss
    + customerLocationSheetCss
    + itemDetailModalCss
    + customer_chat_part_2
    + bottomNavTooltipCss
    + customer_chat_part_3
    + askBagDoodleCss
    + customer_chat_part_4
    + customerLocationSheetMarkup
    + itemDetailModalMarkup
    + customer_chat_part_5
    + emyMediaStoreRuntimeScript
    + customer_chat_part_6
    + customerLocationSheetScript
    + customer_chat_part_7
    + askBagDoodleScript
    + customer_chat_part_8
    + itemDetailModalScript
    + customer_chat_part_9);
}
