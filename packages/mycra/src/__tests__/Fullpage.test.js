import React from "react";
import { render, waitForElement } from "react-testing-library";
import Fullpage from "src/views/Fullpage.js";

describe("<Fullpage />", () => {
  const sectionOneContent = "Section 1";
  const sectionTwoContent = "Section 2";
  const testId = "test";

  it("renders fullpage sections", async () => {
    const { getByText, getByTestId } = render(
      <div data-testid={testId}>
        <Fullpage
          navigation
          render={({ fullpageApi }) => {
            return (
              <Fullpage.Wrapper>
                <div className="section">{sectionOneContent}</div>
                <div className="section">{sectionTwoContent}</div>
              </Fullpage.Wrapper>
            );
          }}
        />
      </div>
    );

    await waitForElement(() => getByTestId(testId));
    await waitForElement(() => getByText(sectionOneContent));
    await waitForElement(() => getByText(sectionTwoContent));
  });
});
