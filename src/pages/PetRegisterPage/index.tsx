import { useNavigate } from "react-router-dom";
import Container from "../../components/Container"
import PetForm from "../../components/PetForm";
import PetFormType from "../../types/PetFormType";
import { toast } from "react-toastify";
import { requestAuthenticatedRequest } from "../../utils/request";

const PetRegisterPage = () => {

  const navigate = useNavigate();


  const handleSubmit = async(data: PetFormType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('age', String(data.age));
    formData.append('weight', String(data.weight));
    formData.append('color', String(data.color));
    for(let i = 0; i < data.images.length; i++) {
      const image = data.images.item(i);
      if(image) {
        formData.append('images', image);
      }
    }
    try {
      await requestAuthenticatedRequest({
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        method: "POST",
        url: '/pets',
        data: formData
      });
      toast.success('Pet register with success');
      navigate('/user/my-pets');
    }
    catch(e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

  return (
    <Container>
      <header className="mb-4 text-center">
        <h1 className="mb-1">Cadastre um novo PET</h1>
        <p>Após isso ele ficará disponível para adoção</p>
      </header>
        <PetForm
          buttonText="Cadastrar PET"
          handleSubmitForm={handleSubmit}
        />
    </Container>
  );
}

export default PetRegisterPage;
