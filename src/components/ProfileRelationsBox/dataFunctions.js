import React from "react";

// Add dato cms keys in .env.local
const TOKEN = process.env.NEXT_PUBLIC_API_KEY_READ




// Return all github user followers
export function getFollowers(userName) {
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${userName}/followers`)
      .then((serverAnswer) => serverAnswer.json())
      .then((completeAnswer) => {
        const convertedElem = completeAnswer.map((e) => ({
          id: e.id,
          title: e.login,
          imageUrl: e.avatar_url,
        }));
        setFollowers(convertedElem);
      });
  }, []);

  return followers;
}

// Return database followings
export function getFollowings() {
  const [followings, setFollowings] = React.useState([]);

  React.useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
          allFollowings {
            id
            title
            imageUrl
          }
        }
        `,
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        setFollowings(resp.data.allFollowings);
      });
  }, []);

  return followings;
}

// Return Communities

export function getCommunities() {
  const [communities, setCommunities] = React.useState([]);
  
  React.useEffect((_) => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities{
            id
            title
            imageUrl
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((dataRes) => {
        setCommunities(dataRes.data.allCommunities);
      });
  }, []);

  return communities
}
