import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { readUserProfile } from '../../utils/api';
import { formatAsMonthDayYear } from '../../utils/formatDate';
import { UserContext } from '../../utils/UserContext';
import './Profile.css';
import ProfileStats from './ProfileStats';
const Profile = () => {
  const session = useContext(UserContext);
  const { user_id } = session;
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    if (!user_id) return () => abortController.abort();
    console.log(user_id);
    readUserProfile(user_id, abortController.signal)
      .then(setProfile)
      .catch(setError);

    return () => abortController.abort();
  }, [user_id]);
  console.log(profile);
  const {
    first_name,
    last_name,
    about_you,
    created_at,
    skills_languages,
    work,
    avatar = null,
  } = profile;
  return (
    <div className="profile-bg">
      <div className="profile-bg_brand_1"></div>
      <div className="container">
        <div className="row pt-3 ">
          <ErrorAlert error={error} />
          <section className="profile border rounded p-4">
            <div className="profile-pfp">
              <h3>P</h3>
              <img
                src={avatar && avatar}
                width="100%"
                alt="Profile Pic"
                className="profile-pfp__img pfp-img"
              />
            </div>

            <header className="profile-header__actions d-flex">
              <Link to="/settings" className="btn btn-primary ms-auto">
                Edit Profile
              </Link>
            </header>
            <article className="profile-body mt-5">
              <h2>{`${first_name} ${last_name}`}</h2>
              <p>{about_you || 'Bio Not Found'}</p>
              <p className="text-sm">{`Joined on ${formatAsMonthDayYear(
                created_at
              )}`}</p>
            </article>
          </section>
        </div>
        <div className="row">
          <ProfileStats user_id={user_id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
