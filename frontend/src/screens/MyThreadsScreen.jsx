import { Row, Col } from "react-bootstrap";
import { useGetMyThreadsQuery } from "../slices/threadsApiSlice";
import Loader from "../components/Loader.jsx";
import Thread from "../components/Thread";
import Message from "../components/Message";
import "../styling/HomeScreen.css";

const MyThreadsScreen = () => {

  const { data: threads, isLoading, error } = useGetMyThreadsQuery();
  return (
    <>
      <h1>My Threads</h1>

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

export default MyThreadsScreen;
