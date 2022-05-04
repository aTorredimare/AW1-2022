import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Film } from './LibraryComponents';
import dayjs from 'dayjs';

function getLastId(films) {
    return films.map((e) => e.id).reduce((id1, id2) => id1 > id2 ? id1 : id2);
}

function InputForm(props) {
    const [filmTitle, setFilmTitle] = useState("");
    const [filmFavorite, setFilmFavorite] = useState(false);
    const [filmDate, setFilmDate] = useState("");
    const [filmRating, setFilmRating] = useState(0);

    const [errorMsg, setErrorMsg] = useState("");

    const submitFilm = (event) => {
        event.preventDefault();
        //validation
        if (filmTitle === "") {
            setErrorMsg("Error: missing title!");

        }
        else {
            const id = getLastId(props.films) + 1;
            const newFilm = new Film(
                id,
                filmTitle,
                filmFavorite,
                filmDate ? dayjs(filmDate) : undefined,
                filmRating ? filmRating : undefined
            );
            props.addFilm(newFilm);
            props.displayForm(!props.showForm);
            setFilmTitle('');
            setFilmFavorite(false);
            setFilmDate('');
            setFilmRating(0);
        }
    }

    return (props.showForm &&
        <>
            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible /> : false}
            <Form onSubmit={submitFilm}>
                <Form.Group className='mb-3' controlId="formBasicInput">
                    <Form.Label>Film Title</Form.Label>
                    <Form.Control type='text' placeholder='Insert the film title' value={filmTitle} onChange={ev => setFilmTitle(ev.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Check type='checkbox' label='Favorite' value={filmFavorite} onChange={ev => setFilmFavorite(ev.target.checked)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating (optional)</Form.Label>
                    <Form.Control type='number' min='0' max='5' placeholder='Insert your rating for the film' value={filmRating} onChange={ev => setFilmRating(ev.target.value)} />
                    <Form.Label>Watch Date</Form.Label>
                    <Form.Control type='date' placeholder='Insert the date when you watched the film' value={filmDate} onChange={ev => setFilmDate(ev.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Film
                </Button>


            </Form>
        </>
    );

}

export { InputForm }