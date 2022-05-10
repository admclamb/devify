import { useContext } from 'react';

export const ToggleLike = async (post_id) => {
  const { session } = useContext(UserContext);
  console.log(session);
  return;
};
