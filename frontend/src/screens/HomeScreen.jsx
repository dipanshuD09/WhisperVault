import { Row, Col } from "react-bootstrap";
import { useFetchThreadsQuery } from "../slices/threadsApiSlice";
import Loader from "../components/Loader.jsx";
import Thread from "../components/Thread";
import Message from "../components/Message";
import "../styling/HomeScreen.css";

const HomeScreen = () => {

  const { data: threads, isLoading, error } = useFetchThreadsQuery();
  return (
    <>
      <h1>Recent Threads</h1>

       {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            {threads?.map((thread) => (
              <Col key={thread._id} sm={12} md={6} lg={4} xl={3}>
                <Thread thread={thread} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
