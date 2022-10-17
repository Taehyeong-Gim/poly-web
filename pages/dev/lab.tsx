import Modal from "@components/Modal";
import type { NextPage } from "next";
import { useState } from "react";

const Lab: NextPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <button
        className="w-20 h-[1200px] bg-lime-400"
        onClick={() => {
          setIsOpened(true);
        }}
      ></button>
      <Modal setIsModalOpened={setIsOpened} isModalOpened={isOpened}>
        <div className="flex justify-center m-auto align-middle w-52 h-52 bg-blue-500">
          babo zzz
        </div>
      </Modal>
    </div>
  );
};

export default Lab;
