import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    console.log("Fetching movies...");
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      // Reset arrays at the beginning of each snapshot
      const recommends = [];
      const newDisneys = [];
      const originals = [];
      const trending = [];

      // Use forEach instead of map since we don't need the return value
      snapshot.docs.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() }; // Store the doc data once
        switch (doc.data().type) {
          case "recommend":
            recommends.push(data);
            break;

          case "new":
            newDisneys.push(data);
            break;

          case "original":
            originals.push(data);
            break;

          case "trending":
            trending.push(data);
            break;
          default:
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [userName, dispatch]); // Added 'dispatch' to the dependency array

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/image/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
