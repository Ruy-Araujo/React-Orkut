import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import ProfileSidebar from "../src/components/ProfileSidebar";
import { DepositionPanel, getDepositions } from "../src/components/DeposimentsContainer";
import MenuWrapper from "../src/components/MenuWrapper";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import ProfileRelationsBox from "../src/components/ProfileRelationsBox";
import { getFollowers, getFollowings, getCommunities } from "../src/components/ProfileRelationsBox/dataFunctions";

export default function Home(props) {
  const githubUser = props.githubUser;
  const followers = getFollowers(githubUser);
  const communities = getCommunities();
  const followings = getFollowings(githubUser);
  const depositions = getDepositions();

  // Page Element
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box className="welcome">
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
            <p style={{ opacity: "0.5", fontSize: "14px" }}>
              <strong>Sorte de hoje:</strong>
              <i> É hora de fazer novos amigos.</i>
            </p>
          </Box>

          <MenuWrapper githubUser={githubUser}/>

          <DepositionPanel title="Depoimentos" 
          items={depositions}
          />
        </div>

        <div className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
            type="followers"
          />

          <ProfileRelationsBox
            title="Amigos em Comum"
            items={followings}
            type="followings"
          />

          <ProfileRelationsBox
            title="Minhas Comunidades"
            items={communities}
            type="communities"
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resp) => resp.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
