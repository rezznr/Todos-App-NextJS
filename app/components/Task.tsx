"use client";

import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodos, updateTodos } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateTodos({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTodos = async (id: string) => {
    await deleteTodos(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr className="hover" key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <TbEdit
          onClick={() => setOpenModalEdit(true)}
          className="text-green-500 cursor-pointer"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-xl">Edit Task</h3>
            <div>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Edit here"
                className="input input-bordered input-info w-full max-w-xs my-5"
              />
              <button type="submit" className="btn btn-primary ml-3">
                Update task
              </button>
            </div>
          </form>
        </Modal>

        {/* handle Delete */}
        <RiDeleteBinLine
          onClick={() => setOpenModalDelete(true)}
          className="text-red-500 cursor-pointer"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-xl">Are You Sure Delete this Task?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTodos(task.id)}
              className="btn btn-primary hover:bg-red-500 text-xl"
            >
              YES
            </button>
            <button className="btn btn-primary hover:bg-blue-400 text-xl">
              NO
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
