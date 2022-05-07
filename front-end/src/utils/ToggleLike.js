import { useContext } from 'react';

export const ToggleLike = async (post_id) => {
  console.log('in here');
  const { session } = useContext(UserContext);
  console.log(session);
  return;
};
