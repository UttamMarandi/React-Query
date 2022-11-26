import { useQuery } from "react-query";
import axios from "axios";
// Fetch a list of courser for login users
// For that we need the channel id through users
// Then we need to store get to the channels and get the courses
// So 2nd query is dependent on first one

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  // we are getting email as prop

  const result = useQuery(["user", email], () => fetchUserByEmail(email));
  const { data: user } = result;
  const channelId = user?.data.channeId; // We need the channel id to fetch the channel courses

  const channelResults = useQuery(
    ["channel-details", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, // double negation converts the value to boolean
    }
  );

  const { data: channels } = channelResults;
  console.log("channels:", channels);

  return (
    <>
      <div>DependentQueries</div>
    </>
  );
};
