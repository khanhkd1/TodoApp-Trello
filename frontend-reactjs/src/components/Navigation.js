import React from "react";
import { AtlassianIcon, AtlassianLogo } from "@atlaskit/logo";
import Avatar from "@atlaskit/avatar";
import {
  AtlassianNavigation,
  // PrimaryButton,
  ProductHome,
  Profile,
  SignIn,
} from "@atlaskit/atlassian-navigation";

export default function Navigation() {
  const AtlassianProductHome = () => (
    <ProductHome
      siteTitle="Welcome"
      icon={AtlassianIcon}
      logo={AtlassianLogo}
    />
  );

  const onClick = () => {
    console.log("profile click");
  };

  const token = false;

  const DefaultProfile = () => (
    <Profile
      icon={
        <Avatar
          appearance="circle"
          size="small"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
        />
      }
      // onClick={onClick}
      tooltip="Your profile and settings"
    />
  );

  const DefaultSignIn = () => (
    <SignIn href="#" tooltip="Sign in" onClick={onClick} />
  );

  return (
    <AtlassianNavigation
      label="site"
      // primaryItems={[
      //   <PrimaryButton>Your work</PrimaryButton>,
      //   <PrimaryButton>Repositories</PrimaryButton>,
      // ]}
      renderProductHome={AtlassianProductHome}
      renderProfile={token ? DefaultProfile : null}
      renderSignIn={token ? null : DefaultSignIn}
    />
  );
}
