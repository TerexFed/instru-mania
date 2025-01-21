export type Product = {
  website: string;
  productName: string;
  productPrice: string;
  productLink: string;
};

export type Products = Product[]

export type InputProps = {
  type: string;
  isDisabled?: boolean;
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  placeholder: string;
};

export type SearchResultProps = {
  searchInputValue: string;
  results: Products;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<Products>>;
}