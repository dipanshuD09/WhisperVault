import React from "react";
import { Container } from "@mui/material";
import Loader from "../components/Loader";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Card from "@mui/joy/Card";
import { useGetThreadDetailsQuery } from "../slices/threadsApiSlice";

const ThreadScreen = () => {
  const { id: threadId } = useParams();

  const { data: thread, isLoading, error } = useGetThreadDetailsQuery(threadId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container>
          <Card>
            <h1>{thread.title}</h1>
            <br />
            <Paper variant="elevation">
              <Container>{thread.content}</Container>
            </Paper>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ThreadScreen;
