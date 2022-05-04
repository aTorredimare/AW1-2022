import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { TopNavbar, SideNavbar } from './Navbars';
import { FilmList } from './MovieTable'
import { Film, FilmLibrary } from './LibraryComponents';
import {useState} from 'react';
import dayjs from 'dayjs';


let f1 = new Film(1,"Pulp Fiction", true, dayjs("2022-03-10"), 5);
let f2 = new Film(2,"21 Grams", true, dayjs("2022-03-17"), 4);
let f3 = new Film(3, "Star Wars", false);
let f4 = new Film(4, "Matrix", false);
let f5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);

let lib1 =  new FilmLibrary();

lib1.addNewFilm(f1);
lib1.addNewFilm(f2);
lib1.addNewFilm(f3);
lib1.addNewFilm(f4);
lib1.addNewFilm(f5);



// [
//   { id: 1, title: "Pulp Fiction", favourite: true, watchDate: dayjs("2022-03-10"), score: 5 },
//   { id: 2, title: "21 Grams", favourite: true, watchDate: dayjs("2022-03-17"), score: 4 },
//   { id: 3, title: "Star Wars", favourite: false, watchDate: undefined, score: undefined },
//   { id: 4, title: "Matrix", favourite: false, watchDate: undefined, score: undefined },
//   { id: 5, title: "Shrek", favourite: false, watchDate: dayjs("2022-03-21"), score: 3 },

// ]


function App() {

  const filters = ['All', 'Favorites', 'Best Rated', 'Seen Last Month', 'Unseen'];
  const [filter, setFilter] = useState(filters[0]);

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
          <SideNavbar filter={filter} setFilter={setFilter} filters={filters}/>
          <Col className="col-md-9 col-12 below-nav">
            <FilmList films={lib1} filter={filter} filters={filters}/>
          </Col>
        </Row>
        <Button className="btn btn-lg btn-primary btn-circle btn-sm">&#43;</Button>
      </Container>
    </>
  );
}

export default App;
