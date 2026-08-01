/* EMY template wrapper for 30-template-customer-feeds.cjs (parts in 30-customer-feeds-template-parts.cjs) */
function emyCustomerFeedsPageTemplate() {
  return (customer_feeds_part_1
    + bottomNavTooltipCss
    + customer_feeds_part_2
    + askBagDoodleCss
    + customerTopbarCss
    + itemDetailModalCss
    + feedCreateFlowCss
    + customer_feeds_part_3
    + customerTopbarCss
    + customer_feeds_part_4
    + customerTopbarMarkup()
    + customer_feeds_part_5
    + itemDetailModalMarkup
    + feedCreateFlowMarkup
    + customer_feeds_part_6
    + emyVideoPlayerRuntimeScript
    + emyMediaStoreRuntimeScript
    + emyMediaEditorRuntimeScript
    + emyFeedCarouselRuntimeScript
    + emyFeedEditSheetRuntimeScript
    + customer_feeds_part_7
    + feedCreateFlowScript
    + customer_feeds_part_8
    + askBagDoodleScript
    + customer_feeds_part_9
    + itemDetailModalScript
    + customer_feeds_part_10).replaceAll("match(/d+/)", "match(/\\\\d+/)");
}
