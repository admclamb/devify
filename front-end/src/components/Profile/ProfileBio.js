import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readProfile } from '../../utils/api';
import { formatAsMonthDayYear } from '../../utils/formatDate';
import './ProfileBio.css';
const ProfileBio = ({ post_user_id }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [brandColor1, setBrandColor1] = useState('#000000');
  const [brandColor2, setBrandColor2] = useState('#ffffff');
  useEffect(() => {
    const abortController = new AbortController();
    if (post_user_id) {
      readProfile(post_user_id, abortController.signal)
        .then(setProfile)
        .then(() => {
          setBrandColor1(profile.brand_color1);
          setBrandColor2(profile.brand_color2);
        })
        .catch(setError);
    }
    return () => abortController.abort();
  }, [post_user_id]);
  console.log(profile);
  const {
    user_id,
    first_name,
    last_name,
    about_you,
    work,
    brand_color1 = '#000000',
    brand_color2 = '#ffffff',
    created_at,
    skills_languages,
  } = profile;
  const skillsText = Array.isArray(skills_languages)
    ? skills_languages.join(' / ')
    : null;
  return (
    <section className="post-bio border rounded">
      <div
        className="bio-header-color rounded-top"
        style={{ backgroundColor: brandColor1 }}
      >
        {' '}
      </div>
      <div className="ps-3 pb-3 pe-3">
        <header className="mb-3">
          <div className="bio-pfp">
            {first_name ? first_name[0].toUpperCase() : 'P'}
          </div>
          <Link to={'/'}>
            <h4 className="bio-name">{`${first_name} ${last_name}`}</h4>
          </Link>

          <div className="bio-header__button">
            <button className="bio-follow btn btn-primary d-block bio-button">
              Follow
            </button>
          </div>
        </header>
        <main>
          <section className="mb-3">
            <h5>SKILLS</h5>
            <p className="text-sm">{skillsText ? skillsText : ''}</p>
          </section>

          <section className="mb-3">
            <h5>WORK</h5>
            <p>{work}</p>
          </section>
          <section>
            <h5>JOINED</h5>
            <p>{formatAsMonthDayYear(created_at)}</p>
          </section>
        </main>
      </div>
    </section>
  );
};

export default ProfileBio;
