import { Table, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import { InputForm } from './InputForm';

function MainContent(props) {
    const [films, setFilms] = useState(props.films);
    const [showForm, setShowForm] = useState(false);

    function addFilm(film) {
        setFilms(oldFilms => [...oldFilms, film]);
    }

    function deleteFilm(id) {
        setFilms(films.filter(f => f.id !== id));
    }

    function displayForm() {
        setShowForm(!showForm);
    }

    return (
        <main>
            <h1 className="mb-2" id="filter-title">{props.filter}</h1>
            <FilmTable films={films} filter={props.filter} filters={props.filters} deleteFilm={deleteFilm} />
            <InputForm showForm={showForm} films={films} addFilm={addFilm} displayForm={displayForm} />
            <Button type='button' onClick={() => displayForm()} className="btn btn-lg btn-primary btn-circle btn-sm">{!showForm ? "+" : "x"}</Button>
        </main>
    )
}

function FilmTable(props) {
    let filmsToShow = [];

    switch (props.filter) {
        case props.filters[0]:
            filmsToShow = props.films;
            break;
        case props.filters[1]:
            filmsToShow = props.films.filter(f => f.favorite === true);
            break;
        case props.filters[2]:
            filmsToShow = props.films.filter(f => f.score === 5);
            break;
        case props.filters[3]:
            filmsToShow = props.films.filter(f => f.watchDate >= dayjs().subtract(1, 'month'));
            break;
        case props.filters[4]:
            filmsToShow = props.films.filter(f => f.watchDate === undefined);
            break;
        default:
            break;
    }

    return (
        <Table borderless>
            <tbody>
                {filmsToShow.map((f) => <FilmRow film={f} key={f.id} filter={props.filter} deleteFilm={props.deleteFilm} />)}

            </tbody>
        </Table>
    );
}

function FilmRow(props) {
    return (
        <tr><FilmData film={props.film} deleteFilm={props.deleteFilm} /></tr>
    );
}

function FilmData(props) {

    const [isFav, setIsFav] = useState(props.film.favorite);

    const toggleFav = (f) => {
        setIsFav(!f);
        props.film.favorite = !f; 
    }

    return (
        <>
            <td className="trash-icon col-md-1 col-3"><TrashBin id={props.film.id} deleteFilm={props.deleteFilm} /></td>
            <td className={"movie-title col-md-3 col-3" + (isFav ? " favorite" : "")}>{props.film.title}</td>
            <td className="fav-checkbox col-md-1 col-3"><FavCheckBox film={props.film} isFav={isFav} toggleFav={toggleFav} /></td>
            <td className="watch-date col-md-3 col-3"> {props.film.watchDate ? props.film.watchDate.format("YYYY-MM-DD") : ""} </td>
            <td className="score col-md-3 col-3"> {props.film.watchDate ? <FilmRating film={props.film} /> : ""} </td>
        </>
    );
}

function FavCheckBox(props) {
    return (
        <Form>
            <div key="default-checkbox" className="mb-3 col-md-1 col-3">
                <Form.Check
                    checked={props.isFav}
                    inline="true"
                    type="checkbox"
                    id="default-checkbox"
                    label="Favourite"
                    onChange={() => props.toggleFav(props.isFav)}
                />
            </div>
        </Form>
    );
}

function FilmRating(props) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < props.film.score)
            stars.push(<FullStar key={i} />);
        else
            stars.push(<EmptyStar key={i} />);
    }
    return stars;
}


function EmptyStar() {
    return (
        <svg className="empty-star bi bi-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
    );
}

function FullStar() {
    return (
        <svg className="full-star bi bi-star-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
    );
}

function TrashBin(props) {
    return (
        <svg onClick={() => props.deleteFilm(props.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash trash-bin" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
    );
}


export { MainContent }