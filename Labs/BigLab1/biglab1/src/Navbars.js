import { Navbar, Button, Form, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';


function TopNavbar() {
    return (
        <Navbar className="navbar navbar-expand-md navbar-dark bg-primary fixed-top navbar-padding">
            <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#left-sidebar"
                aria-controls="left-sidebar" aria-expanded="false" aria-label="Toggle sidebar">
                <span className="navbar-toggler-icon"></span>
            </Button>

            <Navbar.Brand href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-collection-play" viewBox="0 0 16 16">
                    <path
                        d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z">
                    </path>
                    <path
                        d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z">
                    </path>
                </svg>
                Film Library
            </Navbar.Brand>

            <Form className="form-inline my-2 my-lg-0 mx-auto d-none d-md-block" role="search">
                <Form.Control className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Quick search" />
            </Form>

            <div className="navbar-nav ms-md-auto">
                <Navbar.Brand href="#">
                    <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                        <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                            clipRule="evenodd" />
                    </svg>
                </Navbar.Brand>
            </div>
        </Navbar>
    );

}

function SideNavbar(props) {
    const filterList = [
        { id: "filter-all", text: "All", selected: true },
        { id: "filter-favorites", text: "Favorites", selected: false },
        { id: "filter-best", text: "Best Rated", selected: false },
        { id: "filter-seen-last-month", text: "Seen Last Month", selected: false },
        { id: "filter-unseen", text: "Unseen", selected: false },
    ];


    const handleFilterChange = (event) => {
        //newF = event.target.id;
        //oldF = props.activeFilter;

        for (const f of filterList){
            if(f.id === event.target.id)
                f.selected = true;
            if(f.id === props.activeFilter)
                f.selected = false;
        }
        filterList.forEach(f => console.log(f));
        props.setActiveFilter(event.target.id);
        //console.log(`Old: ${oldF}, New: ${newF}`);
        console.log(props.activeFilter)
    }

    return (
        <Nav className="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
            <div className="list-group list-group-flush">
                {filterList.map(filter => <NavBarElement filter={filter} key={filter.id} handleFilterChange={handleFilterChange}/>)}
            </div>
        </Nav>
    );
}

function NavBarElement(props) {
    if (props.filter.selected)  
        return (<Nav.Item onClick={(event) => props.handleFilterChange(event)} href='#' id={props.filter.id} className="list-group-item list-group-item-action active">{props.filter.text} </Nav.Item>);
    else
        return (<Nav.Item onClick={(event) => props.handleFilterChange(event)} href='#'  id={props.filter.id} className="list-group-item list-group-item-action">{props.filter.text} </Nav.Item>);
}

export { TopNavbar, SideNavbar }