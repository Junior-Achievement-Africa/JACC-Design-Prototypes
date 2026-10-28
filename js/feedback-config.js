/* Shared feedback sync for the live Pages review.
 *
 * Option A (recommended for automatic sharing): paste a fine-grained GitHub PAT
 *   https://github.com/settings/personal-access-tokens/new
 *   - Resource owner: Junior-Achievement-Africa
 *   - Repository access: Only JACC-Design-Prototypes
 *   - Permissions: Issues → Read and write (nothing else)
 *   - Expiration: 90 days (rotate after the review)
 *
 * Option B: leave githubToken empty — reviewers tap “Share with team” and submit
 *   a pre-filled GitHub issue (needs a GitHub login). You still see those in Team.
 *
 * Option C (email inbox): set formEndpoint to a Formspree / Web3Forms URL.
 */
window.JACC_FEEDBACK_SYNC = {
  githubToken: '',
  formEndpoint: '',
  label: 'design-feedback',
};
