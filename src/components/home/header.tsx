import React from "react";
import Icon from "./icon.png";
import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex justify-between items-center font-bold text-xl px-4">
      <a href="/" className="transform hover:scale-110 transition ease-in-out">
        <Image src={Icon} alt="icon" width={75} height={75} />
      </a>

      <ul className="flex space-x-4 items-center">
        <li>
          <a href="/">
            <Button
              variant="link"
              className="text-black font-bold text-xl"
              size="lg"
            >
              Home
            </Button>
          </a>
        </li>
        <li>
          <a href="/chat">
            <Button className="text-white font-bold text-xl" size="lg">
              Chat
            </Button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
