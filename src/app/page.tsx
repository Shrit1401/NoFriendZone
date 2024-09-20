import Header from "@/components/home/header";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <section className="text-center h-[80vh] flex flex-col items-center justify-center heading gap-3">
        <h1>Can You Avoid getting AI Friendzoned?</h1>
        <p className="text-lg font-[900">
          How long can you last without getting friendzoned with an ai?
        </p>

        <a href="/chat">
          <Button size="lg" className="text-white font-bold text-xl">
            Start
          </Button>
        </a>
      </section>
    </div>
  );
};

export default HomePage;
