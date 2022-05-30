import { useEffect, useState } from 'react';
import FeedLoading from '../../components/Feed/FeedLoading';
import { formatAsMonthDay, formatAsMonthDayYear } from '../../utils/formatDate';
import FormatPost from './FormatPost';
import './PostMain.css';
import PostMainComments from './PostMainComments';
const PostMain = ({ post, comments, setComments }) => {
  if (!post) return <FeedLoading />;
  const {
    post_id = null,
    image_url = null,
    created_at = null,
    first_name = null,
    last_name = null,
    hashtags_array = null,
    post_header = null,
    post_body,
  } = post;
  if (!post_id) return <FeedLoading />;
  const hashtags = Array.isArray(hashtags_array)
    ? hashtags_array.join('  ')
    : '';
  return (
    <>
      <article className="post-main-container border">
        <header>
          {image_url && (
            <div className="img-wrapper">
              <img src={image_url} width="100%" />
            </div>
          )}
        </header>
        <div className="post-main-body border-bottom">
          <div className="mt-4">
            <div className="post-card-head d-flex align-items-center mb-3">
              <div className="post-card-pfp"></div>
              <div className="name_date">
                <h5 className="text-sm">
                  {first_name && last_name
                    ? first_name + '   ' + last_name
                    : 'No Name'}
                </h5>
                <p className="text-sm">{formatAsMonthDayYear(created_at)}</p>
              </div>
            </div>
          </div>
          <h2>{post_header}</h2>
          <p>{hashtags}</p>
          <div className="post-main-content mt-4">
            <FormatPost post={post_body} />
          </div>
        </div>
        <PostMainComments
          comments={comments}
          setComments={setComments}
          post_id={post_id}
        />
      </article>
    </>
  );
};
export default PostMain;
