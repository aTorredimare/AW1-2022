import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import { TopNavbar, SideNavbar } from './Navbars';
import { MainContent } from './MovieTable'
import { library } from './LibraryComponents';
import {useState} from 'react';


function App() {

  const filters = ['All', 'Favorites', 'Best Rated', 'Seen Last Month', 'Unseen'];
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <TopNavbar/>
      <Container fluid>
        <Row>
          <SideNavbar filter={filter} setFilter={setFilter} filters={filters}/>
          <Col className="col-md-9 col-12 below-nav">
            <MainContent films={library.library} filter={filter} filters={filters}/>
          </Col>  
        </Row>
        
      </Container>
    </>
  );
}

export default App;
