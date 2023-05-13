type PetFormType = {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: FileList
}

export type PetFormKeys = keyof PetFormType;

export default PetFormType;
