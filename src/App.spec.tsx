import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import INFO_PERSON from "./queries";
import App from "./App";

const mocks: any = [
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

const renderApolloMocked = ({ mock = mocks }) => (
  <MockedProvider mocks={mock} addTypename={false}>
    <App />
  </MockedProvider>
);

describe("App component", () => {
  it("should render correctly", async () => {
    render(renderApolloMocked({}));

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();

    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute(
      "src",
      "http://localhost.com/avatar/1.jpeg"
    );
    expect(imgs[1]).toHaveAttribute(
      "src",
      "http://localhost.com/avatar/2.jpeg"
    );
  });

  it("should render error message from server", async () => {
    render(
      renderApolloMocked({
        mock: [{ ...mocks[0], error: new Error("A server error occurred") }],
      })
    );

    expect(
      await screen.findByText("A server error occurred")
    ).toBeInTheDocument();
  });
});
