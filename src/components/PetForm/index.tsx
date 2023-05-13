import { SubmitHandler, useForm } from "react-hook-form";
import PetFormType, { PetFormKeys } from "../../types/PetFormType";
import { useState } from "react";
import RoundedImage from "../RoundedImage";
import { BASE_URL } from "../../utils/request";

type Props = {
  defaultValues?: {
    name: string;
    age: number;
    weight: number;
    color: string;
    images: string[],
  };
  buttonText: string;
  handleSubmitForm: (data: PetFormType) => void
}

const PetForm = ({ defaultValues, buttonText, handleSubmitForm }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<PetFormType>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const [preview, setPreview] = useState<File[]|null>();

  const getInputClassName = (fieldName: PetFormKeys) => {
    return wasSubmit ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  const onSubmit: SubmitHandler<PetFormType> = (data) => {
    handleSubmitForm(data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files) {
      const images = [];
      for(let i = 0; i < files.length; i++) {
        const image = files.item(i);
        if(image) images.push(image);
      }
      setPreview(images);
    }
    else {
      setPreview(null);
    }
  }

  const getPreview = () => {
    if(preview || defaultValues?.images) {
      return (
        <div className="row justify-content-center g-2 row-cols-md-2 row-cols-lg-3" >
          { preview ?
            preview.map((image, index) => (
              <div className="col text-center" key={index}>
                <RoundedImage
                  alt="pet"
                  src={URL.createObjectURL(image)}
                  width={100}
                />
              </div>
            ))
          :
            defaultValues?.images.map((image, index) => (
              <div className="col text-center" key={index}>
                <RoundedImage
                  alt="pet"
                  src={`${BASE_URL}/imgs/pets/${image}`}
                  width={100}
                />
              </div>
            ))
          }
        </div>
      )
    }
  }

  return (
    <div className="container">
      {getPreview() ?? <></>}

    <div className="form-container">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label" htmlFor="images">Images</label>
        <input
          { ...register('images', {
            required: 'Images is required'
          })}
          className={`form-control ${getInputClassName('images')}`}
          type="file"
          multiple
          id="images"
          onChange={handleFileChange}
          name="images"
          placeholder="Upload the images"
        />
        <div className="invalid-feedback">
          { errors.images?.message }
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          { ...register('name', {
            required: 'Name is required',
            pattern: {
              value: /[\S+]/,
              message: 'Name cannot be empty'
            }
          })}
          className={`form-control ${getInputClassName('name')}`}
          type="text"
          id="name"
          name="name"
          placeholder="Type the pet's name"
        />
        <div className="invalid-feedback">
          { errors.name?.message }
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="age">Age</label>
        <input
          { ...register('age', {
            required: 'Age is required',
            min: {
              value: 0,
              message: 'Age cannot be negative'
            }
          })}
          type="number"
          step="1"
          name="age"
          id="age"
          placeholder="Pet's age"
          className={`form-control ${getInputClassName('age')}`}
        />
        <div className="invalid-feedback">
          { errors.age?.message }
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="weight">Weight</label>
        <input
          { ...register('weight', {
            required: 'Weight is required',
            min: {
              value: 0,
              message: 'Weight cannot be nagative'
            }
          })}
          type="number"
          name="weight"
          id="weight"
          placeholder="Pet's weight"
          className={`form-control ${getInputClassName('weight')}`}
        />
        <div className="invalid-feedback">
          { errors.weight?.message }
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="color">Color</label>
        <input
          { ...register('color', {
            required: 'Color is required',
            pattern: {
              value: /[\S+]/,
              message: 'Color cannot be empty'
            }
          })}
          type="text"
          name="color"
          id="color"
          placeholder="Pet's color"
          className={`form-control ${getInputClassName('color')}`}
        />
        <div className="invalid-feedback">
          { errors.color?.message }
        </div>
      </div>
      <div className="mb-3">
        <button
          onClick={() => setWasSubmit(true)}
          type="submit"
          className="my-btn-primary"
        >{buttonText}</button>
      </div>
    </form>
    </div>

    </div>

  );
}

export default PetForm;
