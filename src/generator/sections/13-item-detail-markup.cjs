/* EMY generator section: 13-item-detail-markup.cjs (source lines 13008-13443) */
const itemDetailModalMarkup = String.raw`
      <div class="item-detail-modal" data-item-detail-modal aria-hidden="true">
        <section class="item-detail-card" role="dialog" aria-modal="true" aria-labelledby="item-detail-title">
          <button class="item-detail-more" type="button" data-item-detail-options aria-label="More options" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6.5" cy="12" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="17.5" cy="12" r="1.8"></circle></svg></button>
          <div class="item-detail-options-menu" data-item-detail-options-menu hidden></div>
          <button class="item-detail-close" type="button" data-item-detail-close aria-label="Close item details"><span class="item-detail-close-label">Back to feed</span><span class="item-detail-close-x" aria-hidden="true">x</span></button>
          <div class="item-detail-layout">
            <div class="item-detail-art" data-item-detail-media aria-label="Item media"></div>
            <div class="item-detail-copy" data-item-detail-scroll>
              <span class="item-detail-kind" data-item-detail-kind>Details</span>
              <h2 id="item-detail-title" data-item-detail-title>Details</h2>
              <p class="item-detail-business" data-item-detail-business hidden></p>
              <p class="item-detail-description" data-item-detail-description></p>
              <div class="item-detail-price" data-item-detail-price hidden></div>
              <div class="item-detail-meta" data-item-detail-meta></div>
              <div class="item-detail-repost-attachment" data-item-detail-repost-attachment hidden></div>
              <div class="item-job-panel" data-item-job-panel hidden>
                <article class="item-job-card">
                  <div class="item-job-card-head" data-item-job-cover-head><span>Job</span><strong data-item-job-title>Help wanted</strong></div>
                  <div class="item-job-card-body">
                    <div class="item-job-owner"><i data-item-job-initial>S</i><span data-item-job-business>Stephane</span></div>
                    <p class="item-job-description" data-item-job-description>This business is hiring.</p>
                    <div class="item-job-grid">
                      <span><b>Location</b><em data-item-job-location>Location to confirm</em></span>
                      <span><b>Workplace</b><em data-item-job-workplace>On-site</em></span>
                      <span><b>Type</b><em data-item-job-employment>Flexible</em></span>
                      <span><b>Experience</b><em data-item-job-experience>Open to applicants</em></span>
                      <span><b>Apply</b><em data-item-job-apply-text>Message this business on EMY</em></span>
                      <span><b>Pay / notes</b><em data-item-job-notes>Details in the post</em></span>
                    </div>
                    <div class="item-job-apply-row">
                      <button type="button" data-item-job-apply>Apply with CV</button>
                      <small data-item-job-applicants>0 applicants</small>
                      <span class="item-job-owner-tools" data-item-job-owner-tools hidden>
                        <button type="button" data-item-job-edit>Edit job</button>
                        <button type="button" data-item-job-delete>Delete job</button>
                      </span>
                    </div>
                  </div>
                </article>
              </div>
              <div class="item-event-panel" data-item-event-panel hidden>
                <article class="item-event-card">
                  <div class="item-event-cover" data-item-event-cover hidden><img data-item-event-cover-image alt="" /></div>
                  <div class="item-event-hero">
                    <span class="item-event-date"><strong data-item-event-day>--</strong><span data-item-event-month>Event</span></span>
                    <span class="item-event-hero-copy">
                      <strong data-item-event-title>Event</strong>
                      <span data-item-event-host>Hosted on EMY</span>
                    </span>
                  </div>
                  <div class="item-event-grid">
                    <span><b>When</b><em data-item-event-when>Time to confirm</em></span>
                    <span><b>Where</b><em data-item-event-where>Location to confirm</em></span>
                    <span><b>Format</b><em data-item-event-format>Event</em></span>
                  </div>
                  <div class="item-event-actions">
                    <button class="item-event-save" type="button" data-item-event-save><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.7L6 21V4.8Z"/></svg>Save event</button>
                    <a class="item-event-chat" href="emy-customer-chat.html?business=business" data-item-event-chat><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5h15v10h-8.3L6 19.5v-4H4.5v-10Z"/><path d="M8 9.2h8M8 12.1h5"/></svg>Message host</a>
                    <a class="item-event-profile" href="emy-business-profile.html" data-item-event-profile><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Z"/><path d="M8 9h8M8 13h5"/></svg>View profile</a>
                  </div>
                </article>
              </div>
              <div class="item-business-panel" data-item-business-panel hidden>
                <div class="item-business-summary">
                  <a class="item-business-avatar" href="emy-business-profile.html" data-item-business-profile-link data-item-business-avatar aria-label="Open business profile"><span data-item-business-avatar-initial>B</span></a>
                  <span class="item-business-copy">
                    <small data-item-business-category>Business profile</small>
                    <strong data-item-business-name>Business</strong>
                    <span data-item-business-address>Location and profile details</span>
                    <span class="presence-link" data-item-business-presence>Online and available</span>
                  </span>
                  <a class="item-business-profile-pill" href="emy-business-profile.html" data-item-business-profile-link>
                    Profile
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </a>
                </div>
                <div class="item-business-facts" data-item-business-facts></div>
                <div class="item-business-library">
                  <strong class="item-business-library-title">Profile activity</strong>
                  <div class="item-business-library-grid" data-item-business-library></div>
                </div>
                <div class="item-business-actions">
                  <a href="emy-business-profile.html" data-item-business-profile-link>View profile</a>
                  <a href="emy-customer-chat.html?business=business" data-item-business-chat>Chat</a>
                  <button class="item-business-repost" type="button" data-item-business-repost aria-label="Repost business"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8l-4 4"/><path d="M3 11V9a2.2 2.2 0 0 1 2.2-2.2H21"/><path d="M7 21.2l-4-4 4-4"/><path d="M21 13v2a2.2 2.2 0 0 1-2.2 2.2H3"/></svg><span><strong data-item-business-repost-count>0</strong><small>Reposts</small></span></button>
                  <button type="button" data-item-business-customer>Add to My Businesses</button>
                </div>
                <p class="item-business-customer-note" data-item-business-customer-note>Get this business in My Businesses and receive updates when they post.</p>
              </div>
              <div class="item-product-panel" data-item-product-panel hidden>
                <p class="item-product-note">EMY connects you with the business selling this product. The product is not sold or checked out through EMY.</p>
                <div class="item-product-seller" data-item-product-seller-card>
                  <a class="item-product-avatar" href="emy-business-profile.html" data-item-product-profile-link data-item-product-avatar aria-label="Open business profile"><span data-item-product-avatar-initial>B</span></a>
                  <span class="item-product-seller-copy">
                    <small>Business profile</small>
                    <strong data-item-product-seller>Business</strong>
                    <span data-item-product-seller-status>Local seller on EMY</span>
                    <span class="presence-link" data-item-product-presence>Online and available</span>
                  </span>
                  <a class="item-product-profile-pill" href="emy-business-profile.html" data-item-product-profile-link>
                    Profile
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </a>
                </div>
                <dl class="item-product-specs" data-item-product-specs></dl>
                <section class="item-product-owner-panel" data-item-product-owner-panel tabindex="-1" hidden>
                  <div class="item-product-owner-head">
                    <span>
                      <small>Owner view</small>
                      <strong>Product activity</strong>
                      <em data-item-product-owner-note>Only you can see this owner view.</em>
                    </span>
                    <button class="item-product-owner-stats" type="button" data-item-product-owner-stats>Open stats</button>
                  </div>
                  <div class="item-product-owner-metrics" data-item-product-owner-metrics></div>
                  <div class="item-product-owner-activity">
                    <div class="item-product-owner-activity-title">
                      <strong>Recent activity</strong>
                      <span data-item-product-owner-activity-total>0 actions</span>
                    </div>
                    <div class="item-product-owner-activity-list" data-item-product-owner-activity></div>
                  </div>
                </section>
                <section class="item-product-section item-product-comments" data-item-product-comments tabindex="-1">
                  <div class="item-product-section-title">
                    <strong>Public comments</strong>
                    <span data-item-product-comment-total>0 comments</span>
                  </div>
                  <p class="item-product-section-note">Visible to people viewing this item. Use Chat for private details with the business.</p>
                  <div class="item-product-comment-list" data-item-product-comment-list></div>
                  <div class="item-product-comment-preview">
                    <span class="item-product-comment-avatar" aria-hidden="true">S</span>
                    <input type="text" data-item-product-comment-input placeholder="Ask about availability or details" aria-label="Comment on this product" />
                    <button type="button" data-item-product-comment-send>Comment</button>
                  </div>
                </section>
                <section class="item-product-section item-product-chat-box" data-item-product-chat-section tabindex="-1">
                  <div class="item-product-section-title">
                    <strong>Chat with the business</strong>
                    <span data-item-product-chat-status>Seller chat preview</span>
                  </div>
                  <div class="item-product-chat-thread" data-item-product-chat-thread></div>
                  <div class="item-product-chat-attach-preview" data-item-product-chat-attach-preview hidden></div>
                  <div class="item-product-chat-compose">
                    <button class="item-product-chat-attach" type="button" data-item-product-chat-attach aria-label="Attach this item to chat" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7.5V16a4 4 0 0 0 8 0V7a2.8 2.8 0 0 0-5.6 0v8.2a1.2 1.2 0 0 0 2.4 0V8.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    <input type="text" data-item-product-chat-input placeholder="Ask the seller about this product" aria-label="Chat message to business" />
                    <button type="button" data-item-product-chat-send>Send</button>
                  </div>
                </section>
                <div class="item-product-connect">
                  <span class="item-product-connect-copy"><small>Contact business</small><strong>Talk to the seller before you decide</strong></span>
                  <div class="item-product-actions">
                    <button class="item-product-chat" type="button" data-item-product-chat><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5h15v10h-8.3L6 19.5v-4H4.5v-10Z" stroke-linejoin="round"/><path d="M8 9.2h8M8 12.1h5" stroke-linecap="round"/></svg>Chat</button>
                    <button class="item-product-customer" type="button" data-item-product-customer><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke-linejoin="round"/><path d="M3.8 19.2c.7-3.1 3-5 6.7-5 1.5 0 2.8.3 3.8.9" stroke-linecap="round"/><path d="M18 10.8v6.4M14.8 14h6.4" stroke-linecap="round"/></svg>Add to My Businesses</button>
                    <a class="item-product-profile" href="emy-business-profile.html" data-item-product-profile-action><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Z" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke-linecap="round"/></svg>View profile</a>
                  </div>
                  <p class="item-product-customer-note" data-item-product-customer-note>Get this business in My Businesses and receive updates when they post.</p>
                  <p class="item-product-feedback" data-item-product-feedback></p>
                </div>
              </div>
              <div class="item-detail-actions">
                <button class="item-detail-save" type="button" data-item-detail-save>Save</button>
                <button class="item-detail-done" type="button" data-item-detail-done>Done</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="clip-viewer-modal" data-clip-viewer-modal aria-hidden="true">
        <button class="clip-viewer-close" type="button" data-clip-viewer-close aria-label="Close clip viewer">x</button>
        <div class="clip-viewer-track" data-clip-viewer-track aria-label="Clip viewer"></div>
      </div>`;

const feedCreateFlowMarkup = String.raw`
      <div class="feed-create-modal feed-create-menu-modal" data-feed-create-menu aria-hidden="true">
        <section class="feed-create-menu" role="dialog" aria-modal="true" aria-labelledby="feed-create-title">
          <header class="feed-create-head">
            <h2 id="feed-create-title">Create</h2>
            <button type="button" data-feed-create-close aria-label="Close create menu">x</button>
          </header>
          <div class="feed-create-options">
            <button class="feed-create-option is-primary" type="button" data-feed-create-choice="post"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19h14M5 19V5h11l3 3v11M9 13.5 16.5 6M14 6h2.5v2.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>Start a post</strong><small>Share an update, question, photo, or video</small></span></button>
            <button class="feed-create-option" type="button" data-feed-create-choice="event"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v4M17 3v4M5 8h14M6.5 5h11A1.5 1.5 0 0 1 19 6.5v12A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-12A1.5 1.5 0 0 1 6.5 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12h2M12 12h2M16 12h.01M8 16h2M12 16h2M16 16h.01" stroke="currentColor" stroke-linecap="round"/></svg></span><span><strong>Create an event</strong><small>Share a local event, plan, or meetup</small></span></button>
            <button class="feed-create-option" type="button" data-feed-create-choice="hiring"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 9h16v9.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V9Zm0 0h16M4 12.5h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>Post a job</strong><small>Share a role, shift, or help wanted notice</small></span></button>
            <button class="feed-create-option" type="button" data-feed-create-choice="article"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h14v14H5V5Zm3 4h8M8 13h8M8 16h5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>Publish an article</strong><small>Write a story, guide, or longer update</small></span></button>
          </div>
        </section>
      </div>
      <div class="feed-create-modal feed-clip-frame-modal" data-feed-clip-frame-sheet aria-hidden="true">
        <section class="feed-clip-frame-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-clip-frame-title">
          <header class="feed-mini-head">
            <h2 id="feed-clip-frame-title">Add clip</h2>
            <button type="button" data-feed-clip-frame-close aria-label="Close clip frame choices">x</button>
          </header>
          <div class="feed-clip-frame-body">
            <p class="feed-clip-frame-intro">Choose the clip frame before uploading or recording.</p>
            <div class="feed-clip-frame-options" role="radiogroup" aria-label="Clip frame">
              <button class="feed-clip-frame-choice is-active" type="button" data-feed-clip-frame-choice="phone" role="radio" aria-checked="true" aria-pressed="true">
                <span class="feed-clip-frame-preview is-phone" aria-hidden="true"><i></i></span>
                <span><strong>Phone view</strong><small>Vertical 9:16 frame for reels-style clips.</small></span>
              </button>
              <button class="feed-clip-frame-choice" type="button" data-feed-clip-frame-choice="original" role="radio" aria-checked="false" aria-pressed="false">
                <span class="feed-clip-frame-preview is-original" aria-hidden="true"><i></i></span>
                <span><strong>Original size</strong><small>Keep the normal camera or uploaded video shape.</small></span>
              </button>
            </div>
            <p class="feed-clip-frame-intro">Choose what kind of clip you are creating.</p>
            <div class="feed-clip-kind-options" role="radiogroup" aria-label="Clip type">
              <button class="feed-clip-kind-choice is-active" type="button" data-feed-clip-kind-choice="business" role="radio" aria-checked="true" aria-pressed="true">
                <strong>Business Clip</strong><small>A normal clip for your business profile and Clips.</small>
              </button>
              <button class="feed-clip-kind-choice" type="button" data-feed-clip-kind-choice="product" role="radio" aria-checked="false" aria-pressed="false">
                <strong>Product Clip</strong><small>Add product name, price, stock, and details.</small>
              </button>
            </div>
          </div>
          <footer class="feed-mini-foot">
            <button type="button" data-feed-clip-frame-cancel>Cancel</button>
            <button class="feed-create-submit" type="button" data-feed-clip-frame-continue>Continue</button>
          </footer>
        </section>
      </div>
      <div class="feed-create-modal feed-post-modal" data-feed-post-sheet aria-hidden="true">
        <section class="feed-post-sheet" role="dialog" aria-modal="true" aria-label="Start a post">
          <header class="feed-post-head">
            <span class="feed-create-brand-mark" data-feed-actor-avatar aria-hidden="true"></span>
            <span><strong data-feed-create-actor>HireNest</strong><small>Post to Feeds</small></span>
            <button type="button" data-feed-post-close aria-label="Close post composer">x</button>
          </header>
          <textarea class="feed-post-text" data-feed-post-text placeholder="What are you sharing today?" aria-label="Post text"></textarea>
          <div class="feed-post-product-fields" data-feed-clip-product-fields hidden>
            <label>Product name<input data-feed-clip-product-name maxlength="80" placeholder="Ex: Garlic bread, steel bottle" /></label>
            <label>Price<span class="feed-product-money-row"><select data-feed-clip-product-currency aria-label="Currency"><option value="GBP" selected>GBP (&pound;)</option><option value="EUR">EUR (&euro;)</option><option value="USD">USD ($)</option></select><input data-feed-clip-product-price type="text" inputmode="decimal" autocomplete="off" maxlength="12" pattern="[0-9]+([.][0-9]{1,2})?" placeholder="0.00" aria-label="Product price amount" /></span></label>
            <label>Availability<select data-feed-clip-product-availability><option value="In stock">In stock</option><option value="Limited stock">Limited stock</option><option value="Made to order">Made to order</option><option value="Available today">Available today</option><option value="Out of stock">Out of stock</option></select></label>
            <label>Category<select data-feed-clip-product-category required><option value="">Choose category</option><option>Food and drink</option><option>Retail</option><option>Beauty and wellness</option><option>Home services</option><option>Technology</option><option>Professional services</option><option>Other</option></select></label>
            <label class="is-wide">Product details<textarea data-feed-clip-product-description maxlength="220" placeholder="What is shown in the clip? Size, colour, pickup, offer, or key detail."></textarea></label>
          </div>
          <div class="feed-post-kind-tabs" role="tablist" aria-label="Choose post type">
            <button class="is-active" type="button" data-feed-post-mode="update" aria-pressed="true">Update</button>
            <button type="button" data-feed-post-mode="question" aria-pressed="false">Question</button>
            <button type="button" data-feed-post-mode="photo" aria-pressed="false">Photo</button>
            <button type="button" data-feed-post-mode="video" aria-pressed="false">Video</button>
          </div>
          <div class="feed-post-tools" aria-label="Post tools">
            <span data-feed-post-help>Write a quick update for Feeds.</span>
          </div>
          <div class="feed-post-media" data-feed-post-media hidden>
            <img data-feed-post-media-image hidden alt="" />
            <video data-feed-post-media-video hidden controls muted playsinline preload="auto"></video>
            <button type="button" data-feed-post-edit-media>Edit media</button>
            <button type="button" data-feed-post-remove-media>Remove media</button>
          </div>
          <input type="file" data-feed-post-photo-file accept="image/*" multiple hidden />
          <input type="file" data-feed-post-clip-file accept="video/*" multiple hidden />
          <footer class="feed-post-foot">
            <button class="feed-create-submit" type="button" data-feed-post-submit disabled>Post</button>
          </footer>
        </section>
      </div>
      <div class="feed-create-modal feed-post-source-modal" data-feed-post-source-sheet aria-hidden="true">
        <section class="feed-post-source-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-post-source-title">
          <header class="feed-post-source-head">
            <span><h2 id="feed-post-source-title" data-feed-post-source-title>Add photo</h2><p data-feed-post-source-help>Choose from gallery, computer, or camera.</p></span>
            <button type="button" data-feed-post-source-close aria-label="Close media source">x</button>
          </header>
          <div class="feed-post-source-options">
            <button type="button" data-feed-post-source="library">
              <span class="feed-post-source-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5h14v14H5V5Zm3 10 3-3 2 2 2-3 3 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9.2h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"/></svg></span>
              <span><strong data-feed-post-source-library-title>Gallery or computer</strong><small data-feed-post-source-library-help>Choose from your phone gallery, laptop, or files.</small></span>
            </button>
            <button type="button" data-feed-post-source="camera">
              <span class="feed-post-source-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M8 8l1.5-2h5L16 8h2.5A2.5 2.5 0 0 1 21 10.5v6A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-6A2.5 2.5 0 0 1 5.5 8H8Z" stroke="currentColor" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3" stroke="currentColor"/></svg></span>
              <span><strong data-feed-post-source-camera-title>Take picture now</strong><small data-feed-post-source-camera-help>Use your camera now if this device allows it.</small></span>
            </button>
          </div>
        </section>
      </div>
      <div class="feed-create-modal feed-post-camera-modal" data-feed-post-camera-sheet aria-hidden="true">
        <section class="feed-post-camera-sheet feed-post-source-sheet" role="dialog" aria-modal="true" aria-label="Camera capture">
          <header class="feed-post-source-head">
            <span><h2 data-feed-post-camera-title>Take picture now</h2><p data-feed-post-camera-copy>Allow camera access, then capture your feed media.</p></span>
            <button type="button" data-feed-post-camera-close aria-label="Close camera">x</button>
          </header>
          <div class="feed-post-camera-frame" data-feed-post-camera-frame>
            <video class="feed-post-camera-preview" data-feed-post-camera-preview autoplay muted playsinline></video>
          </div>
          <label class="feed-post-camera-sound" data-feed-post-camera-sound><input data-feed-post-camera-audio type="checkbox" checked /> Record sound with this video</label>
          <p class="feed-post-camera-timer" data-feed-post-camera-timer>0:00</p>
          <p class="feed-post-camera-status" data-feed-post-camera-status></p>
          <div class="feed-post-camera-actions" data-feed-post-camera-actions>
            <button type="button" data-feed-post-camera-cancel>Cancel</button>
            <button type="button" data-feed-post-camera-capture>Take picture</button>
            <button class="feed-post-camera-stop" type="button" data-feed-post-camera-stop hidden>Stop recording</button>
          </div>
        </section>
      </div>
      <div class="feed-create-modal feed-event-modal" data-feed-event-sheet aria-hidden="true">
        <section class="feed-event-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-event-title">
          <header class="feed-mini-head"><h2 id="feed-event-title">Create an event</h2><button type="button" data-feed-event-close aria-label="Close event form">x</button></header>
          <div class="feed-event-template">
            <div class="feed-event-preview" data-feed-event-preview>
              <img data-feed-event-cover-image hidden alt="" />
              <span class="feed-event-preview-badge" data-feed-event-preview-type>Event</span>
              <strong data-feed-event-preview-title>What is the event?</strong>
              <small data-feed-event-preview-meta>Date, time, and place will appear on the feed card.</small>
            </div>
            <div class="feed-event-cover-tools">
              <button type="button" data-feed-event-cover><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14v11H5v-11Zm3 8 3-3 2 2 2.5-3 3.5 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 9.5h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"/></svg><span>Add cover image</span></button>
              <button type="button" data-feed-event-cover-edit hidden>Edit cover</button>
              <button type="button" data-feed-event-cover-remove hidden>Remove cover</button>
              <input type="file" accept="image/*" data-feed-event-cover-file hidden />
            </div>
            <div class="feed-form-grid feed-event-form">
              <label class="feed-event-title-field">Event name*<input data-feed-event-name maxlength="75" placeholder="Ex: Saturday tasting, open day, pop-up sale" /></label>
              <span class="feed-event-type-pills" role="radiogroup" aria-label="Event type">
                <label><input type="radio" name="feed-event-type" value="In person" data-feed-event-type checked /> In person</label>
                <label><input type="radio" name="feed-event-type" value="Online" data-feed-event-type /> Online</label>
              </span>
              <span class="feed-two-col"><label>Date<input type="date" data-feed-event-start-date /></label><label>Time<input type="time" data-feed-event-start-time /></label></span>
              <label>Place or link<input data-feed-event-link placeholder="Shop address, area, or booking link" /></label>
              <label>Feed intro<textarea data-feed-event-intro maxlength="220" placeholder="Add a short note that appears with the event in Feeds."></textarea></label>
              <label>Details<textarea data-feed-event-description placeholder="What is happening? Who should come? Is there a price or anything to bring?"></textarea></label>
              <p class="feed-event-note">Post event adds this as an event card in Feeds and sends a notification.</p>
            </div>
          </div>
          <footer class="feed-mini-foot"><button class="feed-create-submit" type="button" data-feed-event-next>Post event</button></footer>
        </section>
      </div>
      <div class="feed-create-modal feed-hiring-modal" data-feed-hiring-sheet aria-hidden="true">
        <section class="feed-hiring-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-hiring-title">
          <header class="feed-mini-head"><h2 id="feed-hiring-title">Post a job</h2><button type="button" data-feed-hiring-close aria-label="Close hiring form">x</button></header>
          <div class="feed-hiring-body">
            <div class="feed-form-grid">
              <div class="feed-job-cover-editor" data-feed-job-cover-preview>
                <img data-feed-job-cover-image hidden alt="" />
                <video data-feed-job-cover-video hidden muted playsinline preload="metadata"></video>
                <span>Job</span>
                <strong data-feed-job-cover-title>Job cover</strong>
                <small>Add an optional image or video for this job card.</small>
              </div>
              <div class="feed-job-cover-tools">
                <button type="button" data-feed-job-cover-add><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14v11H5v-11Zm3 8 3-3 2 2 2.5-3 3.5 4"/><path d="M8.5 9.5h.01" stroke-width="2.5"/></svg><span>Add image/video</span></button>
                <button type="button" data-feed-job-cover-edit hidden>Edit media</button>
                <button type="button" data-feed-job-cover-remove hidden>Remove media</button>
                <input type="file" accept="image/*,video/*" data-feed-job-cover-file hidden />
              </div>
              <span class="feed-two-col"><label>Business*<input data-feed-hiring-company placeholder="Business name" /></label><label>Job title*<input data-feed-hiring-title placeholder="Barista, cleaner, assistant..." /></label></span>
              <span class="feed-two-col"><label>Workplace type*<select data-feed-hiring-workplace><option>On-site</option><option>Hybrid</option><option>Remote</option></select></label><label>Job location*<input data-feed-hiring-location placeholder="City or metro area" /></label></span>
              <span class="feed-two-col"><label>Employment type*<select data-feed-hiring-employment><option>Choose one...</option><option>Full-time</option><option>Part-time</option><option>Weekend shift</option><option>Temporary</option></select></label><label>Experience level*<select data-feed-hiring-experience><option>Choose one...</option><option>No experience needed</option><option>Some experience</option><option>Experienced</option></select></label></span>
              <label>Feed intro<textarea data-feed-hiring-intro maxlength="220" placeholder="Add a short note that appears with the job in Feeds."></textarea></label>
              <label>Job description*<textarea data-feed-hiring-description placeholder="Tell people the hours, pay range, daily tasks, and when you need help."></textarea></label>
              <label>Where should people apply?<input data-feed-hiring-apply value="Message this business on EMY" /></label>
              <label>Pay, hours, or extra notes<input data-feed-hiring-notes placeholder="Ex: evenings, weekends, training provided" /></label>
            </div>
            <aside><strong>Make the role easy to understand</strong><p>Mention pay, hours, location, start date, and who they will work with.</p></aside>
          </div>
          <footer class="feed-mini-foot"><button type="button" data-feed-hiring-save>Save a draft</button><button type="button" data-feed-hiring-preview>Preview</button><button class="feed-create-submit" type="button" data-feed-hiring-continue>Post job</button></footer>
        </section>
      </div>
      <div class="feed-create-modal feed-hiring-preview-modal" data-feed-hiring-preview-sheet aria-hidden="true">
        <section class="feed-hiring-preview-sheet feed-hiring-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-hiring-preview-title">
          <header class="feed-mini-head"><h2 id="feed-hiring-preview-title">Job preview</h2><button type="button" data-feed-hiring-preview-close aria-label="Close job preview">x</button></header>
          <div class="feed-hiring-preview-body" data-feed-hiring-preview-card></div>
          <footer class="feed-mini-foot"><button type="button" data-feed-hiring-preview-edit>Edit</button><button class="feed-create-submit" type="button" data-feed-hiring-preview-post>Post job</button></footer>
        </section>
      </div>
      <div class="feed-create-modal feed-job-apply-modal" data-feed-job-apply-sheet aria-hidden="true">
        <section class="feed-job-apply-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-job-apply-title">
          <header class="feed-mini-head"><h2 id="feed-job-apply-title">Apply for this job</h2><button type="button" data-feed-job-apply-close aria-label="Close application form">x</button></header>
          <div class="feed-job-apply-body">
            <div class="feed-job-apply-summary"><small data-feed-job-apply-business>Business</small><strong data-feed-job-apply-job>Job title</strong><span data-feed-job-apply-meta>Location and workplace</span></div>
            <label>Your message<textarea data-feed-job-apply-message placeholder="Say why you are interested, when you can start, and any experience you want to share."></textarea></label>
            <div class="feed-job-apply-methods">
              <button class="feed-job-apply-option" type="button" data-feed-job-apply-file>Attach CV</button>
              <button class="feed-job-apply-option is-active" type="button" data-feed-job-apply-profile aria-pressed="true">Share EMY profile</button>
            </div>
            <input data-feed-job-apply-file-input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" hidden />
            <small class="feed-job-apply-file-name" data-feed-job-apply-file-name>No CV selected yet. You can also paste a link below.</small>
            <label>CV, portfolio, or profile link<input data-feed-job-apply-cv placeholder="Paste a CV link, portfolio, website, or LinkedIn" /></label>
            <label class="feed-job-apply-consent"><input type="checkbox" data-feed-job-apply-consent checked />Share my EMY profile with the business so they can reply about this role.</label>
          </div>
          <footer class="feed-mini-foot"><button type="button" data-feed-job-apply-cancel>Cancel</button><button class="feed-create-submit" type="button" data-feed-job-apply-submit>Send CV application</button></footer>
        </section>
      </div>
      <div class="feed-create-modal feed-job-applicants-modal" data-feed-job-applicants-sheet aria-hidden="true">
        <section class="feed-job-applicants-sheet" role="dialog" aria-modal="true" aria-labelledby="feed-job-applicants-title">
          <header class="feed-mini-head"><h2 id="feed-job-applicants-title" data-feed-job-applicants-title>Job applicants</h2><button type="button" data-feed-job-applicants-close aria-label="Close applicants list">x</button></header>
          <div class="feed-job-applicants-body">
            <div class="feed-job-applicants-summary"><strong data-feed-job-applicants-subtitle>Help wanted</strong><span data-feed-job-applicants-count>0 applicants</span></div>
            <div class="feed-job-applicants-list" data-feed-job-applicants-list></div>
          </div>
          <footer class="feed-mini-foot"><button type="button" data-feed-job-applicants-close>Close</button></footer>
        </section>
      </div>
      <div class="feed-create-modal feed-article-editor-modal" data-feed-article-editor aria-hidden="true">
        <section class="feed-article-editor" role="dialog" aria-modal="true" aria-label="Publish an article">
          <header class="feed-article-top">
            <span class="feed-create-brand-mark" data-feed-actor-avatar aria-hidden="true"></span>
            <span><strong data-feed-article-actor>HireNest</strong><small data-feed-article-status>Article draft</small></span>
            <div class="feed-article-tools" aria-hidden="true"><span>Article</span><span data-feed-article-read-time>1 min read</span></div>
            <button class="feed-create-submit" type="button" data-feed-article-next disabled>Publish article</button>
            <button type="button" data-feed-article-close aria-label="Close article editor">x</button>
          </header>
          <div class="feed-article-workspace">
            <main class="feed-article-canvas">
              <button class="feed-article-cover" type="button" data-feed-article-cover>
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 6.5h14v11H5v-11Zm3 8 3-3 2 2 2.5-3 3.5 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 9.5h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"/></svg>
                </i>
                <strong data-feed-article-cover-title>Add cover</strong>
                <span data-feed-article-cover-help>Photo or video, optional</span>
              </button>
              <input type="file" accept="image/*,video/*" data-feed-article-cover-file hidden />
              <label class="feed-article-field is-title"><span>Title</span><input class="feed-article-title" data-feed-article-title placeholder="Give the article a clear title" aria-label="Article title" /></label>
              <label class="feed-article-field is-body"><span>Article</span><textarea class="feed-article-body" data-feed-article-body placeholder="Write the full article here." aria-label="Article body"></textarea></label>
              <label class="feed-article-field is-share"><span>Feed intro</span><textarea data-feed-article-share placeholder="Add a short note that appears with the article in Feeds." aria-label="Article feed intro"></textarea></label>
            </main>
            <aside class="feed-article-preview-panel" aria-label="Article preview">
              <span class="feed-article-preview-label">Feed preview</span>
              <article class="feed-article-preview-card">
                <div class="feed-article-preview-cover" data-feed-article-preview-cover hidden></div>
                <span class="feed-article-preview-chip">Article</span>
                <strong data-feed-article-preview-title>Untitled article</strong>
                <p data-feed-article-preview-copy>Article preview will appear here.</p>
                <small data-feed-article-preview-meta>1 min read</small>
              </article>
            </aside>
          </div>
        </section>
      </div>
      <div class="feed-create-modal feed-discard-modal" data-feed-discard-sheet aria-hidden="true">
        <section class="feed-discard-dialog" role="alertdialog" aria-modal="true" aria-labelledby="feed-discard-title">
          <header class="feed-mini-head"><h2 id="feed-discard-title">Discard draft</h2><button type="button" data-feed-discard-back aria-label="Keep editing">x</button></header>
          <p>You haven't finished your post yet. Are you sure you want to leave and discard your draft?</p>
          <footer class="feed-mini-foot"><button type="button" data-feed-discard-back>Go back</button><button class="feed-create-submit" type="button" data-feed-discard-confirm>Discard</button></footer>
        </section>
      </div>
`;

const businessFeedCreateFlowMarkup = feedCreateFlowMarkup.replace(
  '            <button class="feed-create-option" type="button" data-feed-create-choice="event">',
  '            <button class="feed-create-option" type="button" data-business-create-extra="product"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 8.5 12 5l5.5 3.5v7L12 19l-5.5-3.5v-7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.8 8.7 12 12l5.2-3.3M12 12v7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>Add Product</strong><small>Add item photos, price, and availability.</small></span></button>\n' +
  '            <button class="feed-create-option" type="button" data-business-create-extra="clip"><span class="feed-create-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14v11H5v-11Z" stroke="currentColor" stroke-linejoin="round"/><path d="m10 9.5 5 2.5-5 2.5v-5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><strong>Add Clip</strong><small>Upload a normal clip or product clip.</small></span></button>\n' +
  '            <button class="feed-create-option" type="button" data-feed-create-choice="event">'
);
