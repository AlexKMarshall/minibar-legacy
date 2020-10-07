import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  queryByRole,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import {
  getSingleDrink as mockGetSingleDrink,
  updateFav as mockUpdateFav,
} from "../../utils/api-client";
import Recipe from "../Recipe";

jest.mock("./../../utils/api-client");

const fakeDrink = {
  method: [
    "Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass",
  ],
  featured: false,
  popular: false,
  _id: "5f2274582e3dcc1012337375",
  externalId: "17222",
  image:
    "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
  name: "A1",
  ingredients: [
    {
      _id: "5f2274582e3dcc1012337376",
      name: "Gin",
      quantity: "1 3/4 shot ",
    },
    {
      _id: "5f2274582e3dcc1012337377",
      name: "Grand Marnier",
      quantity: "1 Shot ",
    },
    {
      _id: "5f2274582e3dcc1012337378",
      name: "Lemon Juice",
      quantity: "1/4 Shot",
    },
    {
      _id: "5f2274582e3dcc1012337379",
      name: "Grenadine",
      quantity: "1/8 Shot",
    },
  ],
  __v: 0,
  isFav: false,
};

xtest("Displays a drink and allows it to be added to favorites", async () => {
  mockGetSingleDrink.mockResolvedValueOnce(fakeDrink);
  render(
    <MemoryRouter initialEntries={[`/recipe/${fakeDrink._id}`]}>
      <Route path="/recipe/:id">
        <Recipe />
      </Route>
    </MemoryRouter>
  );
  const header = await screen.findByText(/a1/i);
  expect(mockGetSingleDrink).toHaveBeenCalledWith("drink", fakeDrink._id);
  expect(mockGetSingleDrink).toHaveBeenCalledTimes(1);
  expect(header).toBeInTheDocument();
  expect(screen.getByRole("img")).toMatchInlineSnapshot(`
    <img
      alt=""
      class="absolute object-cover w-full h-full"
      src="https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"
    />
  `);

  mockUpdateFav.mockResolvedValueOnce({ ...fakeDrink, isFav: true });
  const addFavButton = screen.getByRole("button", { name: /add as favorite/i });
  fireEvent.click(addFavButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole("button", { name: /add as favorite/i })
  );

  expect(mockUpdateFav).toHaveBeenCalledWith({
    action: "add",
    id: fakeDrink._id,
  });
  expect(mockUpdateFav).toHaveBeenCalledTimes(1);

  const removeFavButton = screen.getByRole("button", {
    name: /remove favorite/i,
  });

  mockUpdateFav.mockResolvedValueOnce({ ...fakeDrink, isFav: false });
  fireEvent.click(removeFavButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole("button", { name: /remove favorite/i })
  );

  expect(mockUpdateFav).toHaveBeenCalledWith({
    action: "remove",
    id: fakeDrink._id,
  });
  expect(mockUpdateFav).toHaveBeenCalledTimes(2);
});
