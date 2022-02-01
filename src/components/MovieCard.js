function MovieCard(props)  {
    return (
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            </div>
        </div>
    );
}

export default MovieCard