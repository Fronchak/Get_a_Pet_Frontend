import { useState, useEffect } from 'react';
import Container from "../../components/Container"
import { toast } from 'react-toastify';
import { BASE_URL, requestAuthenticatedRequest } from '../../utils/request';
import Pet from '../../types/Pet';
import PlaceHolderImage from '../../assets/imgs/loading.png';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import UnauthorizedError from '../../errors/UnauthorizedError';

const MyPetsPage = () => {

  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect do my pets');
    const getPets = async() => {
      setIsLoading(true);
      try {
        const response = await requestAuthenticatedRequest({
          url: '/pets/my-pets'
        });
        console.log('pets', response.data);
        setPets(response.data);
        setIsLoading(false);
      }
      catch(e) {
        setIsLoading(false);
        console.error(e);
        if(e instanceof UnauthorizedError) {
            toast.error('You must be login to access this page');
            navigate('/auth/login', {
              state: {
                from : '/user/my-pets'
              }
            });
        }
        else {
          toast.error('Someting went wrong');
        }

      }

    }
    getPets();
  }, [navigate]);

  const cardPlaceholder = () => {
    return (
      <div className="col">
        <div className="card" aria-hidden="true">
          <img src={PlaceHolderImage} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
            <a href="#" className="btn btn-primary disabled placeholder col-6"></a>
          </div>
        </div>

      </div>
    )
  }

  const placeholder = () => {
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
        {cardPlaceholder()}
        {cardPlaceholder()}
        {cardPlaceholder()}
        {cardPlaceholder()}
      </div>
    )
  }

  const content = () => {
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
        {pets.map((pet) => {
          return (
            <div className="col" key={pet.id}>
              <div className="card">
                <img src={`${BASE_URL}/imgs/pets/${pet.images[0]}`} alt={pet.name} className="img-topo" />
                <div className="card-body">
                  <h4 className="card-title">{ pet.name }</h4>
                  <h5 className="card-text">
                    <span className="fw-bold">Status: </span>
                    { pet.available ? (
                      <span className="text-primary">Ainda em adoção</span>
                    ) : (
                      <span className="text-success">Pet adotado</span>
                    ) }
                  </h5>
                  <p className="card-text"><span className="fw-bold">Age: </span>{ pet.age }</p>
                  <Link className="btn btn-primary" to={`/pets/${pet.id}`}>Ver pet</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  }

  return (
    <Container>
      <h1>My Pets</h1>
      <p><Link to="/pets/register">Click aqui</Link> para cadastrar um novo pet</p>
      { isLoading ? placeholder() : (
        pets.length === 0 ? (
          <p>Você ainda não possui nenhum pet cadastrado</p>
        ) : (
          content()
        )
      )}
    </Container>
  );
}

export default MyPetsPage;
