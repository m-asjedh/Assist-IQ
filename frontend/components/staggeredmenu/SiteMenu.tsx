"use client";

import StaggeredMenu from "@/components/staggeredmenu/StaggeredMenu";

const menuItems = [
  { label: "Features", ariaLabel: "View features", link: "#features" },
  { label: "Stack", ariaLabel: "Tech stack", link: "#tech-stack" },
  { label: "FAQ", ariaLabel: "Frequently asked questions", link: "#faq" },
];

export default function SiteMenu() {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      logoText="Assist IQ"
      colors={["#022c22", "#064e3b", "#0a0a0a"]}
      accentColor="#34d399"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#34d399"
      items={menuItems}
      displaySocials={false}
      displayItemNumbering
    />
  );
}
