"use client";
import Table from "react-bootstrap/Table";
import CreateModal from "@/components/Modal/create.modal";
import EditModal from "@/components/Modal/edit.modal";
import DeleteModal from "@/components/Modal/delete.modal";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
interface IProps {
  blogs: IBlog[];
}

function Home() {
  const [showAddNewModal, setShowAddNewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [idEditBlog, setIdEditBlog] = useState<number>(2);

  const handleClose = () => {
    setShowAddNewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  const handleShowAddNewModal = () => setShowAddNewModal(true);
  const handleShowDeleteModal = (id: number) => {
    setIdEditBlog(id);
    setShowDeleteModal(true);
  };
  const handleShowEditModal = (id: number) => {
    setIdEditBlog(id);
    setShowEditModal(true);
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const url = "http://localhost:8000/blogs";

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <>
      <CreateModal show={showAddNewModal} handleClose={handleClose} />
      <EditModal
        show={showEditModal}
        handleClose={handleClose}
        id={idEditBlog}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleClose}
        id={idEditBlog}
      />
      <div style={{ marginTop: "50px" }}>
        <button className="btn btn-primary" onClick={handleShowAddNewModal}>
          Add new
        </button>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((blog: IBlog) => {
              return (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>
                    <Link href={`/blog/${blog.id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>

                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleShowEditModal(blog.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleShowDeleteModal(blog.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default Home;
