import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
//import './LibraryComponents'
import { TopNavbar, SideNavbar } from './Navbars';
import { FilmList } from './MovieTable'
import { Film, FilmLibrary } from './LibraryComponents';
import {useState} from 'react';
import dayjs from 'dayjs';

const fakeLibrary = [
  { id: 1, title: "Pulp Fiction", favourite: true, watchDate: dayjs("2022-03-10"), score: 5 },
  { id: 2, title: "21 Grams", favourite: true, watchDate: dayjs("2022-03-17"), score: 4 },
  { id: 3, title: "Star Wars", favourite: false, watchDate: undefined, score: undefined },
  { id: 4, title: "Matrix", favourite: false, watchDate: undefined, score: undefined },
  { id: 5, title: "Shrek", favourite: false, watchDate: dayjs("2022-03-21"), score: 3 },

]


function App() {

  let [activeFilter, setActiveFilter] = useState("filter-all");

  /*
    Possible active filters:
      - All  --> filter-all
      - Favorites --> filter-favorites
      - Best Rated --> filter-best
      - Seen Last Month --> filter-seen-last-month
      - Unseen --> filter-unseen
  */
  return (
    <>
      <TopNavbar/>
      <Container fluid>
        <Row>
          <SideNavbar activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
          <Col className="col-md-9 col-12 below-nav">
            <FilmList films={fakeLibrary} filter={activeFilter} setActiveFilter={setActiveFilter}/>
          </Col>
        </Row>
        <Button className="btn btn-lg btn-primary btn-circle btn-sm">&#43;</Button>
      </Container>
    </>
  );
}

export default App;
