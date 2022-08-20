import { useQuery } from "@apollo/client";
import styled from "styled-components";

import INFO_PERSON from "./queries";

export const ContainerParent = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled.div`
  margin: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 20%;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const ContainerData = styled.div`
  padding: 2px 16px;
`;

function App() {
  const { loading, error, data } = useQuery(INFO_PERSON);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ContainerParent>
      {data.characters.results.map((person: any, index: number) => (
        <Card key={person.name}>
          <img src={person.image} alt="Avatar" style={{ width: "100%" }} />
          <ContainerData>
            <h4>
              <b>{person.name}</b>
            </h4>
            <p>
              <b>GENDER:</b> {person.gender}
            </p>
            <p>
              <b>SPECIE:</b> {person.species}
            </p>
          </ContainerData>
        </Card>
      ))}
    </ContainerParent>
  );
}

export default App;
