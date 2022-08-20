import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import INFO_PERSON from "./queries";
import App from "./App";

const mocks = [
  {
    request: {
      query: INFO_PERSON,
    },
    result: {
      data: {
        characters: {
          results: [
            {
              name: "John Doe",
              species: "Human",
              gender: "Male",
              image: "http://localhost.com/avatar/1.jpeg",
            },
            {
              name: "Jane Doe",
              species: "Alien",
              gender: "Female",
              image: "http://localhost.com/avatar/2.jpeg",
            },
          ],
        },
      },
    },
  },
];

it("should render correctly", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("John Doe")).toBeInTheDocument();
});
