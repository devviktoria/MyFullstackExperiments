import Image from "next/image";
import styles from "./page.module.css";
import JokeList from "@/components/jokes/JokeList";

export default function Home() {
  return (
    <div>
      <main>
        <JokeList />
      </main>
    </div>
  );
}
