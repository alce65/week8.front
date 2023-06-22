import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "./menu";
import { MenuOptions } from "../../types/menu.options";

describe("Given Menu Componente", () => {
  describe("When it is rendered with one option  ", () => {
    const options: MenuOptions = [{ url: "", label: "Test" }];

    render(
      <Router>
        <Menu options={options}></Menu>
      </Router>
    );
    const elementNav = screen.getByRole("navigation");
    const elementOption = screen.getByText(options[0].label);

    test("Then the option should be in the document", () => {
      expect(elementNav).toBeInTheDocument();
      expect(elementOption).toBeInTheDocument();
    });
  });
});
