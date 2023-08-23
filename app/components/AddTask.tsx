"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState, FormEventHandler } from "react";
import { createNewTodos } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const AddTask = (props: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createNewTodos({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add Task Here <AiOutlinePlus />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-xl">Add New Task</h3>
          <div>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs my-5"
            />
            <button type="submit" className="btn btn-primary mx-4">
              Add task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
