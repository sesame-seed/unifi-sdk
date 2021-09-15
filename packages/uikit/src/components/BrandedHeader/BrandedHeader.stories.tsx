import React from "react";
import { storiesOf } from "@storybook/react";
import { BrandedHeader } from ".";

storiesOf("BrandedHeader", module).add("BrandedHeader", () => (
  <>
    <BrandedHeader />
    <h1>BrandedHeader</h1>
  </>
));
