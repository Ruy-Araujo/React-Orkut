import React, { useState } from "react";
import styled from "styled-components";
import Box from "../Box";
const TOKEN = process.env.NEXT_PUBLIC_API_KEY_READ

export function DepositionPanel(props) {
  return (
    <ContainerBox>
      <h2 className="subTitle">{props.title}</h2>

      <DeposimentBox>
        {props.items.map((i) => (
          <li key={i.id}>
            <div className="wrapper">
              <img src={`https://github.com/${i.creatorSlug}.png`} />
              <div className="content">
                <spam>
                  <strong>{i.creatorSlug}</strong>
                </spam>
                <p>{i.text}</p>
              </div>
            </div>
          </li>
        ))}
      </DeposimentBox>
    </ContainerBox>
  );
}

export function getDepositions() {
  const [depositions, setDepositions] = useState([]);
  
  React.useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
            allDepositions {
              id
              text
              creatorSlug
            }
          }
          `,
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        const convertedElem = resp.data.allDepositions.map((e) => ({
          id: e.id,
          text: e.text,
          title: e.creatorSlug,
          creatorSlug: e.creatorSlug,
          imageUrl: `https://github.com/${e.creatorSlug}.png`,
        }));
        setDepositions(convertedElem);
      });
  }, []);

  return depositions;
}

const DeposimentBox = styled.ul`
  list-style-type: none;
  border-radius: 8px;
  background-color: #d9e6f6;
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
}
  
  li:nth-child(even) {
    background-color: #f1f9fe;
  }

  div.wrapper {
    padding-left: 12px;
    padding-right: 15px;
    margin: 15px 0px 15px;
    display: inline-flex;
   
  }

  div.content {
    margin-left: 20px;
  }

  spam {
    color: #2e7bb4;
  }
  p {
    margin-top: 5px;
    opacity: 0.5;
  }
  img {
    object-fit: cover;
    background-position: center center;
    position: relative;
    width: 92px;
    height: 92px;
    border-radius: 100%;
    align-self: center;

  }
`;

const ContainerBox = styled(Box)`
    height: max-content;
  @media (max-width: 480px) {
    overflow: scroll;
    overflow-x: hide;
    }
`