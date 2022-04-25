import { Table, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

function FilmList(props) {
    return (
        <FilmTable films={props.films} />
    )
}

function FilmTable(props) {
    const [films, setFilms] = useState(props.films);

    return (
        <>
            <h1>All</h1>
            <Table borderless>
                <thead />
                <tbody>
                    {films.map((f) => <FilmRow film={f} key={f.id} />)}

                </tbody>
            </Table>
        </>
    );
}

function FilmRow(props) {
    return (
        <tr><FilmData film={props.film} /></tr>
    );
}

function FilmData(props) {
    const checkbox = <Form>
        <div key="default-checkbox" className="mb-3">
            <Form.Check
                checked={props.film.favourite}
                inline="true"
                type="checkbox"
                id="default-checkbox"
                label="Favourite"
            />
        </div>
    </Form>

    let score = props.film.score ? `${props.film.score}/5` : "";

    return (
        <>
            <td>{props.film.title}</td>
            <td>{checkbox}</td>
            <td> {props.film.watchDate ? props.film.watchDate.format("YYYY-MM-DD") : ""} </td>
            <td>{score}</td>
        </>
    );
}

export { FilmList }