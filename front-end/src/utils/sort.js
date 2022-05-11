/**
 *
 * @param {an array of post objects} posts
 * sorting by a post udpatedAtTime
 */
export function sortPosts(posts) {
  return posts.sort((a, b) => a.created_at - b.created_at);
}
